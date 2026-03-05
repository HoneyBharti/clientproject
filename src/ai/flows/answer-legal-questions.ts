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
  system: `You are a helpful AI assistant that answers basic legal questions.  You are not a substitute for a lawyer and cannot provide legal advice.
If the user's question requires specific knowledge of legal precedence, use the getLegalPrecedence tool to retrieve it.
Incorporate the knowledge into your answer. Always end with the disclaimer that you are not providing legal advice and the user should consult a lawyer.`,
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
