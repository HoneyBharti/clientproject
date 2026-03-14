# YourLegal Platform - Complete Architecture & Flow Documentation

## 1. System Architecture Overview

The **YourLegal** platform is a comprehensive B2B SaaS application designed to help founders and business owners manage their company formations, accounting, taxes, and compliance.

*   **Frontend:** React-based UI (Next.js) with Tailwind CSS. State management is handled through custom hooks (`useAdminData.ts`).
*   **Backend:** Node.js/Express REST API.
*   **Database:** MongoDB via Mongoose ODM.
*   **Authentication:** Secure JWT-based auth with bcrypt password hashing and persistent sessions stored in MongoDB.
*   **Key Integrations:**
    *   **Stripe:** Processing payments, subscriptions, and webhooks.
    *   **QuickBooks:** OAuth 2.0 integration for real-time bookkeeping, invoicing, and financial reporting (P&L, Balance Sheet).
    *   **Zoho:** Lead tracking and CRM integration.
    *   **reCAPTCHA Enterprise:** Bot protection on authentication and sensitive endpoints.

---

## 2. User Flow (Client Portal)

The User Flow is designed to be a self-serve dashboard where clients can track their business health, upload documents, and manage their finances.

### 2.1. Onboarding & Authentication
*   **Action:** The user registers, selects a service plan (Micro, Vitals, Elite), and completes payment via Stripe Checkout.
*   **Data Flow:** Stripe fires a webhook (`POST /api/payment/webhook`) to the backend, which automatically creates the user account, maps the Stripe Customer ID, and triggers the `onboardingAPI` to initialize the company formation process (`POST /api/onboarding/admin/:id/create-formation`).

### 2.2. Dashboard & AI Assistant
*   **Action:** The user logs in and lands on the central dashboard. They can chat with the "YourLegal AI Assistant".
*   **Data Flow:** The dashboard aggregates tasks (e.g., "Connect QuickBooks", "Upload Pending Documents") and fetches financial snapshots. The AI assistant helps answer legal and tax questions in real-time.

### 2.3. Company Formation & Legal
*   **Action:** The user views their corporate information (Entity Name, Formation State, EIN).
*   **Data Flow:** The frontend polls `GET /api/formations/me`. As the Admin works on the backend, the user's progress tracker visually advances through stages: `Pending` → `Processing` → `Documents Required` → `Filed` → `Approved` → `Completed`.

### 2.4. Document Management
*   **Action:** The user uploads required ID proofs or legal forms. They also download official documents (e.g., Certificates of Good Standing).
*   **Data Flow:** 
    *   *Upload:* Hits `POST /api/documents/me/upload-client` (files are converted to Base64 and stored/processed).
    *   *Download:* Users can securely fetch Admin-uploaded files via `GET /api/documents/:documentId/download`.

### 2.5. Bookkeeping & Finance (QuickBooks)
*   **Action:** The user clicks "Connect to QuickBooks".
*   **Data Flow:** 
    1.  Frontend hits `GET /api/quickbooks/auth-url`.
    2.  User authorizes via Intuit.
    3.  Backend stores OAuth tokens securely.
*   **Functionality:** Once linked, the user can:
    *   View real-time **Transactions** and **Bank Feed Status**.
    *   Generate **P&L, Balance Sheet, and Cash Flow** reports directly in the portal.
    *   Create and send **Invoices** to their clients (`POST /api/quickbooks/proxy` with `url: "invoice"`).

### 2.6. Taxes, Filings & Compliance
*   **Action:** The user tracks upcoming tax deadlines and compliance events (e.g., Annual Reports).
*   **Data Flow:** The system pulls from `GET /api/compliance/events/me` and `GET /api/tax-filings/me`. The UI highlights deadlines with a traffic-light system (Green = Clear, Amber = Due Soon, Red = Overdue).

---

## 3. Admin Flow (Backend Management)

The Admin Flow provides YourLegal staff with a command center to manage users, process formations, resolve tickets, and oversee system health. 

### 3.1. Dashboard & Global Metrics
*   **Action:** Admin logs in and views global stats.
*   **Data Flow:** `GET /api/admin/stats` populates active users, revenue metrics, and system alerts. `useAdminData` hook manages loading states seamlessly.

### 3.2. User Management & Compliance
*   **Action:** Admin reviews user accounts, flags compliance risks, or deactivates accounts.
*   **Data Flow:** Admin fetches all users (`GET /api/admin/users`) and compliance overviews (`GET /api/compliance/overview`). Admin can see exactly which users are "Awaiting Docs" or at "Compliance Risk".

### 3.3. Formation Processing
*   **Action:** Admin manages a user's LLC or C-Corp formation.
*   **Data Flow:** Admin pulls records (`GET /api/formations`). When Admin files the paperwork with the state, they call `PUT /api/formations/:id` with `status: 'filed'`. 
*   **UI Reflection:** This triggers an immediate real-time update on the specific User's dashboard, moving their visual progress tracker to "Filed with Government". Admin can also update the EIN (`PATCH /api/company/:id/ein`).

### 3.4. Document Verification & Exchange
*   **Action:** Admin verifies documents uploaded by the user and provides official state documents.
*   **Data Flow:** Admin views a specific user's docs (`GET /api/documents/admin/user/:userId`). Admin can update the status of a user's document (`PATCH /api/documents/admin/:documentId/status`) to "Verified" or "Rejected". Admin uploads Official State Documents (`POST /api/documents/admin/user/:userId/upload-official`), which immediately populate in the User's "Official Documents" tab.

### 3.5. Order Management & Payments
*   **Action:** Admin oversees purchased add-ons (e.g., Trademarks, S-Corp Elections, ITIN applications).
*   **Data Flow:** Subscriptions and payments are managed via Stripe webhooks. Admins can view all payments (`GET /api/payment/all`) and update the fulfillment status of orders (`PUT /api/orders/:id`).

### 3.6. Support Tickets & Communication
*   **Action:** Admin resolves client questions or tax inquiries.
*   **Data Flow:** Admin fetches tickets (`GET /api/tickets`), adds a reply (`POST /api/tickets/:id/messages`), and updates priority/status (`PUT /api/tickets/:id`). Admins can also mark replies as `isInternal` for staff-only visibility. Furthermore, Admins can send direct emails (`POST /api/emails/send`) utilizing SendGrid/AWS SES integrations.

### 3.7. Content & System Management
*   **Action:** Admin manages blog posts and global settings.
*   **Data Flow:** Admin interacts with CMS API (`POST/PUT/DELETE /api/blogs`) and dynamically adjusts platform features (`POST /api/settings`).

### 3.8. Activity Logs (Audit Trail)
*   **Action:** Admin tracks who did what.
*   **Data Flow:** Every major action in the platform (auth, doc upload, setting change) logs an event to `ActivityLog`. Admin can view this via `GET /api/activity-logs`, ensuring enterprise-grade security and accountability.

---

## 4. How Data Synchronizes (Backend ↔ UI)

1.  **State Management:** The frontend relies heavily on a unified React Custom Hook (`useAdminData.ts`). It initializes state arrays (`activityLogs`, `blogs`, `formations`, `orders`, `tickets`) and provides `loadX()` and CRUD functions.
2.  **Authentication Context:** `credentials: 'include'` is passed on all `fetch` requests, ensuring the user's encrypted session cookie automatically validates against the Node.js JWT middleware.
3.  **Cross-role Reflection:** 
    *   *Example 1:* User uploads a file. `POST /api/documents/me/upload-client`. Backend marks document `source` as `client_uploads`. Admin refreshes their document table, sees the new file.
    *   *Example 2:* Admin pushes a Stripe Checkout for a Trademark. Once paid, Stripe hits the webhook, Backend creates an `Order`. User's UI refreshes `ordersAPI.getMy()` and shows the Trademark order in "In Progress" status.
    *   *Example 3:* Admin receives Zoho Lead data via `GET /api/zoho/leads`, reviews it, and triggers `onboardingAPI.createFormation()`. This provisions the User account and prepares their dashboard for their first login.

---

## 5. Security & Stability Implementations
*   **Passwords & Auth:** Encrypted with bcryptjs (12 salt rounds).
*   **Tokens:** Secure JWT tokens with 7-day cookie expiry (HttpOnly).
*   **Route Protection:** Express middleware actively guards Admin APIs against standard users. Next.js server-side features prevent unauthorized UI access.
*   **Anti-Bot:** ReCAPTCHA Enterprise integrated into authentication and critical state-changing actions.
