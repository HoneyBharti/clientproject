'use server';

/**
 * @fileOverview Simulates fetching bookkeeping data from the QuickBooks API.
 *
 * - fetchQuickBooksData - A function that returns mock bookkeeping data.
 * - QuickBooksDataOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TransactionSchema = z.object({
  id: z.string().describe('Unique identifier for the transaction.'),
  date: z.string().describe('Date of the transaction.'),
  desc: z.string().describe('Description of the transaction.'),
  cat: z.string().describe('Category of the transaction.'),
  amount: z.number().describe('Amount of the transaction.'),
  status: z.string().describe('Status of the transaction (e.g., Cleared, Pending).'),
});

const InvoiceSchema = z.object({
  id: z.string().describe('Unique identifier for the invoice.'),
  client: z.string().describe('Name of the client.'),
  date: z.string().describe('Date of the invoice.'),
  due: z.string().describe('Due date of the invoice.'),
  amount: z.number().describe('Amount of the invoice.'),
  status: z.string().describe('Status of the invoice (e.g., Paid, Overdue, Sent, Draft).'),
});

const QuickBooksDataOutputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('A list of recent transactions.'),
  invoices: z.array(InvoiceSchema).describe('A list of recent invoices.'),
});
export type QuickBooksDataOutput = z.infer<typeof QuickBooksDataOutputSchema>;

const fetchQuickBooksDataPrompt = ai.definePrompt({
  name: 'fetchQuickBooksDataPrompt',
  output: { schema: QuickBooksDataOutputSchema },
  prompt: `You are a data generation assistant. 
  
  Generate a realistic but mock dataset for a small business's bookkeeping records, as if it were fetched from the QuickBooks API.
  
  Please provide:
  - A list of 6 recent transactions with varied descriptions, categories, and amounts (both positive for income and negative for expenses).
  - A list of 4 recent invoices with different clients and statuses (Paid, Overdue, Sent, Draft).
  
  Ensure the data format strictly follows the provided JSON schema.`,
});

const fetchQuickBooksDataFlow = ai.defineFlow(
  {
    name: 'fetchQuickBooksDataFlow',
    outputSchema: QuickBooksDataOutputSchema,
  },
  async () => {
    const { output } = await fetchQuickBooksDataPrompt();
    return output!;
  }
);

export async function fetchQuickBooksData(): Promise<QuickBooksDataOutput> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return fetchQuickBooksDataFlow();
}
