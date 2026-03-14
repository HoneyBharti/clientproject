'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering basic legal questions.
 *
 * It includes:
 * - answerLegalQuestions: A function to answer legal questions.
 * - AnswerLegalQuestionsInput: The input type for the function.
 * - AnswerLegalQuestionsOutput: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const YOURLEGAL_KB = `
YourLegal Knowledge Base (from project code):
Supported countries: USA, UK, UAE, Singapore, India, Australia, Netherlands, Saudi Arabia.

USA plans (USD):
- Micro: 499 first year. Includes Company Formation (LLC/C-Corp), Registered Agent Service, Portal Access & Document Storage.
- Vitals: 199 per month billed annually at 2,388. Includes all Micro + IRS business tax filings (Form 1120/1065), State Annual Report Filing, Automated Bookkeeping & Analytics.
- Elite: 299 per month billed annually at 3,588. Includes all Vitals + Dedicated Human Bookkeeper, Priority Legal Support, Quarterly Financial Reviews.
USA state fees (passed through without markup):
- Wyoming LLC: initial 100, annual 60, processing 1-3 business days.
- Delaware LLC: initial 160, annual 300, processing 2-4 business days.
- Wyoming C-Corp: initial 100, annual 60, processing 1-3 business days.
- Delaware C-Corp: initial 160, annual 175, processing 2-4 business days.

India plans (INR/year):
- Startup: 24,999. Includes Pvt. Ltd. Incorporation (MCA), DSC & DIN for 2 Directors, PAN & TAN Allotment, GST Registration, Commencement Certificate (20A).
- Compliance: 49,999. Includes everything in Startup + Monthly Bookkeeping, Monthly GST Returns, Quarterly TDS Returns, Annual MCA Compliance (AOC-4/MGT-7).
- Growth: 99,999. Includes everything in Compliance + Audit Liaison & Coordination, Annual Income Tax Return, Virtual CFO (Strategic Reviews), FEMA/RBI Compliance (FDI).

UK plans (GBP/year):
- Formation: 499. Companies House Registration, Registered Office Address (London), Director Service Address, Bank Account Support.
- Compliance: 999. All Formation features + Confirmation Statement Filing, Statutory Register Maintenance, HMRC Corporation Tax Registration.
- All-in-One: 2,499. All Compliance features + Monthly Bookkeeping (MTD), Quarterly VAT Returns, Annual Accounts & CT600 Filing.

Netherlands plans (EUR/year):
- Formation: 999. Notarial Deed of Incorporation, KVK Registration, UBO Register Filing, Bank Account Assistance.
- Compliance: 1,999. All Formation features + Registered Office Address, Annual KVK Filings, Corporate Tax Registration.
- All-in-One: 3,999. All Compliance features + Monthly Bookkeeping, Quarterly BTW (VAT) Returns, Annual Corporate Income Tax Return (VPB).

Singapore plans (prices shown with $ in UI, billed annually):
- Formation: 999. ACRA Name Reservation, Company Incorporation, Nominee Director Service, Bank Account Assistance.
- Compliance: 1,999. All Formation features + Registered Office Address, Corporate Secretary Service, Annual Return Filing (ACRA).
- All-in-One: 3,499. All Compliance features + Unaudited Financial Statements, GST Registration & Filing, Annual Tax Filing (IRAS).

UAE/Dubai plans (prices shown with $ in UI, billed annually):
- Formation: 1,999. License & Registration, Establishment Card, Bank Account Assistance.
- Compliance: 2,999. All Formation features + Trade License Renewal, VAT & Corporate Tax Registration, Annual Compliance Management.
- All-in-One: 4,999. All Compliance features + Monthly Bookkeeping, Quarterly VAT Filing, Annual Corporate Tax Filing.
UAE fee estimator is shown in AED for government/renewal costs.

Australia plans (prices shown with $ in UI, billed annually):
- Formation: 999. ASIC Company Registration, ABN/TFN/GST Registration, Nominee Director Service, Registered Office Address.
- Compliance: 2,499. All Formation features + Annual ASIC Company Statement, ASIC Registered Agent Service, Annual Solvency Resolution.
- All-in-One: 4,999. All Compliance features + Monthly Bookkeeping, BAS Lodgement, Annual Company Tax Return (ATO).

Saudi Arabia plans (prices shown with $ in UI, billed annually):
- Formation: 4,999. MISA License Application, Commercial Registration (CR), Articles of Association (AoA), Bank Account Assistance.
- Compliance: 7,999. All Formation features + MISA & CR Renewals, GOSI & ZATCA Registration, Nitaqat Advisory.
- All-in-One: 12,999. All Compliance features + Monthly Bookkeeping, Quarterly VAT Filing, Annual Zakat/Tax Filing.
Saudi fee estimator is shown in SAR for government/renewal costs.

Core service categories (USA): Company Formation, Annual Compliance, Tax Compliance, Bookkeeping, Accounting, Virtual CFO, Payroll, Cross-Border Accounting.

Add-on services (available in all supported countries; prices shown in USD in code):
- Trademark Registration: 499
- S-Corp Election (Form 2553): 149
- Certificate of Good Standing: 99
- Foreign Qualification: 249
- Articles of Amendment: 199
- ITIN Application: 300

Policies:
- 30-day money-back guarantee on YourLegal service fees.
- State filing fees and third-party fees are non-refundable once submitted/paid.
- Refunds are processed to the original payment method within 5-10 business days; request via contactus@yourlegal.in.
- Registered Agent service is included in formation plans (first year).
- You can upgrade from Micro to Vitals or Elite from the dashboard.
- Peace-of-mind guarantee: accurate state and IRS filings; if YourLegal makes an error, it covers the costs.
`;

const AnswerLegalQuestionsInputSchema = z.object({
  question: z.string().describe('The legal question to be answered.'),
});
export type AnswerLegalQuestionsInput = z.infer<typeof AnswerLegalQuestionsInputSchema>;

const AnswerLegalQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the legal question.'),
});
export type AnswerLegalQuestionsOutput = z.infer<typeof AnswerLegalQuestionsOutputSchema>;


const getLegalPrecedence = ai.defineTool({
  name: 'getLegalPrecedence',
  description: 'Returns the legal precedence for a given legal question.',
  inputSchema: z.object({
    question: z.string().describe('The legal question to find precedence for.'),
  }),
  outputSchema: z.string().describe('The legal precedence for the given question.'),
}, async (input) => {
  // TODO: Implement the actual retrieval of legal precedence.
  // This is a placeholder implementation.
  return `This is a placeholder for legal precedence related to: ${input.question}.  Consult a qualified legal expert for actual legal advice.`;
});

const answerLegalQuestionsPrompt = ai.definePrompt({
  name: 'answerLegalQuestionsPrompt',
  input: {schema: AnswerLegalQuestionsInputSchema},
  output: {schema: AnswerLegalQuestionsOutputSchema},
  tools: [getLegalPrecedence],
  system: `You are the YourLegal AI assistant for the YourLegal platform. Answer only questions related to the YourLegal project, product, and workflows.
You can help with topics like: onboarding, company formation, EIN application, initial compliance, formation progress, documents, admin vs. user flows, Company & Legal page, Taxes & Filings, subscriptions/payments, notifications, support, and QuickBooks integration.
If a question is not about the YourLegal platform or asks for general legal advice, respond briefly that you can only help with the YourLegal platform and ask the user to rephrase with platform context. Do not provide legal advice.
Do not use tools for legal precedence; this assistant does not have access to real legal databases. End every response with a short disclaimer that you are not providing legal advice and the user should consult a lawyer.

${YOURLEGAL_KB}`,
  prompt: `Question: {{{question}}}`, // removed the conditional logic here since the tool will handle if legal precedence is needed.
});

const answerLegalQuestionsFlow = ai.defineFlow(
  {
    name: 'answerLegalQuestionsFlow',
    inputSchema: AnswerLegalQuestionsInputSchema,
    outputSchema: AnswerLegalQuestionsOutputSchema,
  },
  async input => {
    const {output} = await answerLegalQuestionsPrompt(input);
    return output!;
  }
);

export async function answerLegalQuestions(input: AnswerLegalQuestionsInput): Promise<AnswerLegalQuestionsOutput> {
  return answerLegalQuestionsFlow(input);
}
