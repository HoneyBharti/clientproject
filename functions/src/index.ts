
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import OAuthClient = require("intuit-oauth");
import crypto from "crypto";
import cors = require("cors");
import axios from "axios";

const corsHandler = cors({ origin: true });

admin.initializeApp();

const firestore = admin.firestore();

// Function to safely get config
const getQuickbooksConfig = () => {
    const config = functions.config().quickbooks;
    if (config && config.client_id && config.client_secret && config.verifier_token) {
        return {
            clientId: config.client_id,
            clientSecret: config.client_secret,
            verifierToken: config.verifier_token,
        };
    }
    // Fallback for local development using .env files
    if (process.env.QB_CLIENT_ID && process.env.QB_CLIENT_SECRET && process.env.QB_VERIFIER_TOKEN) {
        return {
            clientId: process.env.QB_CLIENT_ID,
            clientSecret: process.env.QB_CLIENT_SECRET,
            verifierToken: process.env.QB_VERIFIER_TOKEN,
        }
    }
    console.error("QuickBooks credentials not set in Firebase environment configuration or .env file.");
    return null;
}

const quickbooksConfig = getQuickbooksConfig();


const oauthClient = new OAuthClient({
  clientId: quickbooksConfig?.clientId || '',
  clientSecret: quickbooksConfig?.clientSecret || '',
  environment: "sandbox", // Use 'sandbox' or 'production'
  redirectUri: "https://studio-8784786518-2e560.web.app/quickbooksCallback",
  logging: true,
});

/**
 * Initiates the QuickBooks OAuth 2.0 flow.
 */
export const quickbooksAuth = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, () => {
        const userId = req.query.userId;
        if (!userId) {
            res.status(400).send("User ID is required.");
            return;
        }

        const authUri = oauthClient.authorizeUri({
            scope: [OAuthClient.scopes.Accounting],
            state: userId as string,
        });

        res.redirect(authUri);
    });
});

/**
 * Handles the callback from QuickBooks after user authorization.
 */
export const quickbooksCallback = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            const authResponse = await oauthClient.createToken(req.url);
            const token = authResponse.getJson();
            const userId = authResponse.token.state;

            if (!userId) {
                throw new Error("User ID not found in state from QuickBooks callback.");
            }
            
            const realmId = req.query.realmId;
            if (!realmId) {
                throw new Error("Realm ID (Company ID) not found in QuickBooks callback.");
            }

            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            await connectionRef.set({
                id: userId,
                accessToken: token.access_token,
                refreshToken: token.refresh_token,
                realmId: realmId,
                connectedAt: new Date().toISOString(),
                status: "active",
            });

            res.redirect("/?page=settings&qb_status=success");

        } catch (e: any) {
            console.error("Error during QuickBooks OAuth callback:", e);
            res.redirect(`/?page=settings&qb_status=error&error_message=${e.message}`);
        }
    });
});


/**
 * Handles webhook events from QuickBooks.
 */
export const quickbooksWebhook = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const signature = req.headers['intuit-signature'];
        const verifierToken = quickbooksConfig?.verifierToken;
        
        if (!verifierToken) {
            console.error("Webhook verifier token not configured.");
            res.status(500).send("Internal Server Error: Verifier not configured.");
            return;
        }

        if (!signature) {
            console.error("Webhook received without intuit-signature header.");
            res.status(401).send("Unauthorized: Missing signature.");
            return;
        }
        
        const hash = crypto.createHmac('sha256', verifierToken).update(JSON.stringify(req.body)).digest('base64');

        if (hash !== signature) {
            console.error("Webhook signature validation failed.");
            res.status(401).send("Unauthorized: Invalid signature.");
            return;
        }

        console.log("QuickBooks Webhook event received and validated:", JSON.stringify(req.body, null, 2));

        const { eventNotifications } = req.body;

        if (eventNotifications && eventNotifications.length > 0) {
            for (const notification of eventNotifications) {
                const realmId = notification.realmId;

                // Find the user associated with this realmId
                const connectionsSnap = await firestore.collectionGroup('connections').where('realmId', '==', realmId).get();


                if (connectionsSnap.empty) {
                    console.warn(`No user found for realmId: ${realmId}`);
                    continue;
                }
                const userId = connectionsSnap.docs[0].ref.parent.parent?.id;
                 if (!userId) {
                    console.warn(`Could not determine userId for realmId: ${realmId}`);
                    continue;
                }


                for (const event of notification.dataChangeEvent.entities) {
                    if (event.name === 'Bill' && (event.operation === 'Create' || event.operation === 'Update')) {
                         try {
                            const billId = event.id;
                            const billRef = firestore.doc(`users/${userId}/bills/${billId}`);
                            // In a real app, you'd fetch the full Bill object from QB API
                            // For now, we'll save the event data as a placeholder
                            await billRef.set({
                                ...event,
                                syncedAt: new Date().toISOString(),
                                realmId: realmId,
                            }, { merge: true });
                            console.log(`Bill ${billId} saved for user ${userId}.`);
                        } catch(dbError) {
                            console.error(`Failed to save bill for user ${userId}:`, dbError);
                        }
                    }
                }
            }
        }

        res.status(200).send("OK");
    });
});


/**
 * Creates a bill in QuickBooks.
 */
export const createQuickBooksBill = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const userId = req.body.userId;
        const billData = req.body.bill;

        if (!userId || !billData) {
            res.status(400).send('User ID and bill data are required.');
            return;
        }

        try {
            // 1. Get user's QB credentials from Firestore
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;

            // 2. Refresh token if necessary (intuit-oauth client handles this)
            oauthClient.setToken({
                access_token: accessToken,
                refresh_token: refreshToken,
                token_type: 'bearer',
                expires_in: 3600,
                x_refresh_token_expires_in: 8726400,
                realmId: realmId,
            });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ 
                    accessToken: newAccessToken.access_token,
                    refreshToken: newAccessToken.refresh_token,
                });
                 oauthClient.setToken(newAccessToken);
            }

            // 3. Make API call to QuickBooks
            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/bill`;
            
            const response = await axios.post(url, billData, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            // 4. Send back success response
            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error creating QuickBooks bill:', e.response ? e.response.data : e);
            res.status(500).send({
                message: 'Failed to create bill in QuickBooks.',
                error: e.response ? e.response.data : e.message
            });
        }
    });
});


/**
 * Deletes a bill in QuickBooks.
 */
export const deleteQuickBooksBill = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const { userId, bill } = req.body;

        if (!userId || !bill || !bill.Id || !bill.SyncToken) {
            res.status(400).send('User ID, bill ID, and bill SyncToken are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;

            oauthClient.setToken({
                access_token: accessToken,
                refresh_token: refreshToken,
                token_type: 'bearer',
                realmId: realmId,
            });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ 
                    accessToken: newAccessToken.access_token,
                    refreshToken: newAccessToken.refresh_token,
                });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/bill?operation=delete`;
            
            const deletePayload = {
                SyncToken: bill.SyncToken,
                Id: bill.Id
            };

            const response = await axios.post(url, deletePayload, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            // Optional: Delete the bill from your own Firestore as well
            const billRef = firestore.doc(`users/${userId}/bills/${bill.Id}`);
            await billRef.delete();


            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error deleting QuickBooks bill:', e.response ? e.response.data : e);
            res.status(500).send({
                message: 'Failed to delete bill in QuickBooks.',
                error: e.response ? e.response.data : e.message
            });
        }
    });
});

/**
 * Queries for bills in QuickBooks.
 */
export const getQuickBooksBills = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const { userId, query } = req.query;

        if (!userId) {
            res.status(400).send('User ID is required.');
            return;
        }
        
        if (!query) {
            res.status(400).send('A query is required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;

            oauthClient.setToken({
                access_token: accessToken,
                refresh_token: refreshToken,
                token_type: 'bearer',
                realmId: realmId,
            });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ 
                    accessToken: newAccessToken.access_token,
                    refreshToken: newAccessToken.refresh_token,
                });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/query`;
            
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json'
                },
                params: {
                    query: query
                }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error querying QuickBooks bills:', e.response ? e.response.data : e);
            res.status(500).send({
                message: 'Failed to query bills from QuickBooks.',
                error: e.response ? e.response.data : e.message
            });
        }
    });
});

/**
 * Updates a bill in QuickBooks.
 */
export const updateQuickBooksBill = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const { userId, bill } = req.body;

        if (!userId || !bill || !bill.Id || !bill.SyncToken) {
            res.status(400).send('User ID and full bill object (including Id and SyncToken) are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;

            oauthClient.setToken({
                access_token: accessToken,
                refresh_token: refreshToken,
                token_type: 'bearer',
                realmId: realmId,
            });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ 
                    accessToken: newAccessToken.access_token,
                    refreshToken: newAccessToken.refresh_token,
                });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/bill`;
            
            const response = await axios.post(url, bill, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error updating QuickBooks bill:', e.response ? e.response.data : e);
            res.status(500).send({
                message: 'Failed to update bill in QuickBooks.',
                error: e.response ? e.response.data : e.message
            });
        }
    });
});


/**
 * Fetches company info from QuickBooks.
 */
export const getQuickBooksCompanyInfo = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const { userId } = req.query;

        if (!userId) {
            res.status(400).send('User ID is required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;

            oauthClient.setToken({
                access_token: accessToken,
                refresh_token: refreshToken,
                token_type: 'bearer',
                realmId: realmId,
            });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ 
                    accessToken: newAccessToken.access_token,
                    refreshToken: newAccessToken.refresh_token,
                });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/companyinfo/${realmId}`;
            
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json'
                }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error fetching QuickBooks company info:', e.response ? e.response.data : e);
            res.status(500).send({
                message: 'Failed to fetch company info from QuickBooks.',
                error: e.response ? e.response.data : e.message
            });
        }
    });
});


/**
 * Creates a customer in QuickBooks.
 */
export const createQuickBooksCustomer = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const { userId, customer } = req.body;

        if (!userId || !customer) {
            res.status(400).send('User ID and customer data are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;

            oauthClient.setToken({
                access_token: accessToken,
                refresh_token: refreshToken,
                token_type: 'bearer',
                realmId: realmId,
            });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ accessToken: newAccessToken.access_token, refreshToken: newAccessToken.refresh_token });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/customer`;
            
            const response = await axios.post(url, customer, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error creating QuickBooks customer:', e.response ? e.response.data : e);
            res.status(500).send({ message: 'Failed to create customer in QuickBooks.', error: e.response ? e.response.data : e.message });
        }
    });
});

/**
 * Queries for customers in QuickBooks.
 */
export const getQuickBooksCustomers = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const { userId, query } = req.query;

        if (!userId || !query) {
            res.status(400).send('User ID and query are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;
             oauthClient.setToken({ access_token: accessToken, refresh_token: refreshToken, token_type: 'bearer', realmId: realmId });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ accessToken: newAccessToken.access_token, refreshToken: newAccessToken.refresh_token });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/query`;
            
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${oauthClient.getToken().access_token}`, 'Accept': 'application/json' },
                params: { query: query }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error querying QuickBooks customers:', e.response ? e.response.data : e);
            res.status(500).send({ message: 'Failed to query customers from QuickBooks.', error: e.response ? e.response.data : e.message });
        }
    });
});

/**
 * Updates a customer in QuickBooks.
 */
export const updateQuickBooksCustomer = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const { userId, customer } = req.body;

        if (!userId || !customer || !customer.Id || !customer.SyncToken) {
            res.status(400).send('User ID and full customer object (including Id and SyncToken) are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;
            oauthClient.setToken({ access_token: accessToken, refresh_token: refreshToken, token_type: 'bearer', realmId: realmId });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ accessToken: newAccessToken.access_token, refreshToken: newAccessToken.refresh_token });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/customer`;
            
            const response = await axios.post(url, customer, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error updating QuickBooks customer:', e.response ? e.response.data : e);
            res.status(500).send({ message: 'Failed to update customer in QuickBooks.', error: e.response ? e.response.data : e.message });
        }
    });
});

/**
 * Deletes a customer in QuickBooks. (Sets to inactive)
 */
export const deleteQuickBooksCustomer = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const { userId, customer } = req.body;

        if (!userId || !customer || !customer.Id || !customer.SyncToken) {
            res.status(400).send('User ID, customer ID, and SyncToken are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }
             const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;
            oauthClient.setToken({ access_token: accessToken, refresh_token: refreshToken, token_type: 'bearer', realmId: realmId });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ accessToken: newAccessToken.access_token, refreshToken: newAccessToken.refresh_token });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/customer?operation=delete`;
            
            const deletePayload = {
                Id: customer.Id,
                SyncToken: customer.SyncToken,
                Active: false
            };

            const response = await axios.post(url, deletePayload, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error deactivating QuickBooks customer:', e.response ? e.response.data : e);
            res.status(500).send({ message: 'Failed to deactivate customer in QuickBooks.', error: e.response ? e.response.data : e.message });
        }
    });
});


/**
 * Creates an account in QuickBooks.
 */
export const createQuickBooksAccount = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const { userId, account } = req.body;

        if (!userId || !account) {
            res.status(400).send('User ID and account data are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;
            oauthClient.setToken({ access_token: accessToken, refresh_token: refreshToken, token_type: 'bearer', realmId: realmId });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ accessToken: newAccessToken.access_token, refreshToken: newAccessToken.refresh_token });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/account`;
            
            const response = await axios.post(url, account, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error creating QuickBooks account:', e.response ? e.response.data : e);
            res.status(500).send({ message: 'Failed to create account in QuickBooks.', error: e.response ? e.response.data : e.message });
        }
    });
});

/**
 * Queries for accounts in QuickBooks.
 */
export const getQuickBooksAccounts = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const { userId, query } = req.query;

        if (!userId || !query) {
            res.status(400).send('User ID and query are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;
            oauthClient.setToken({ access_token: accessToken, refresh_token: refreshToken, token_type: 'bearer', realmId: realmId });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ accessToken: newAccessToken.access_token, refreshToken: newAccessToken.refresh_token });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/query`;
            
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${oauthClient.getToken().access_token}`, 'Accept': 'application/json' },
                params: { query: query }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error querying QuickBooks accounts:', e.response ? e.response.data : e);
            res.status(500).send({ message: 'Failed to query accounts from QuickBooks.', error: e.response ? e.response.data : e.message });
        }
    });
});

/**
 * Updates an account in QuickBooks.
 */
export const updateQuickBooksAccount = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const { userId, account } = req.body;

        if (!userId || !account || !account.Id || !account.SyncToken) {
            res.status(400).send('User ID and full account object (including Id and SyncToken) are required.');
            return;
        }

        try {
            const connectionRef = firestore.doc(`users/${userId}/connections/quickbooks`);
            const connectionSnap = await connectionRef.get();

            if (!connectionSnap.exists) {
                res.status(404).send('QuickBooks connection not found for this user.');
                return;
            }

            const { accessToken, refreshToken, realmId } = connectionSnap.data() as any;
            oauthClient.setToken({ access_token: accessToken, refresh_token: refreshToken, token_type: 'bearer', realmId: realmId });

            if (oauthClient.isAccessTokenValid()) {
                 const refreshedToken = await oauthClient.refresh();
                 const newAccessToken = refreshedToken.getJson();
                 await connectionRef.update({ accessToken: newAccessToken.access_token, refreshToken: newAccessToken.refresh_token });
                 oauthClient.setToken(newAccessToken);
            }

            const url = `${oauthClient.environment === 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production}v3/company/${realmId}/account`;
            
            const response = await axios.post(url, account, {
                headers: {
                    'Authorization': `Bearer ${oauthClient.getToken().access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            res.status(200).send(response.data);

        } catch (e: any) {
            console.error('Error updating QuickBooks account:', e.response ? e.response.data : e);
            res.status(500).send({ message: 'Failed to update account in QuickBooks.', error: e.response ? e.response.data : e.message });
        }
    });
});
    