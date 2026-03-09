'use server';

/**
 * @fileOverview Summarizes initial legal requirements based on a business idea prompt.
 *
 * - startupFromPrompt - A function that takes a business idea prompt and returns a summary of initial legal requirements.
 * - StartupFromPromptInput - The input type for the startupFromPrompt function.
 * - StartupFromPromptOutput - The return type for the startupFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StartupFromPromptInputSchema = z.object({
  prompt: z
    .string()
    .describe('A high-level prompt describing the business idea.'),
});
export type StartupFromPromptInput = z.infer<typeof StartupFromPromptInputSchema>;

const StartupFromPromptOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the initial legal requirements for the business idea, including state of formation.'
    ),
});
export type StartupFromPromptOutput = z.infer<typeof StartupFromPromptOutputSchema>;

export async function startupFromPrompt(input: StartupFromPromptInput): Promise<StartupFromPromptOutput> {
  return startupFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'startupFromPromptPrompt',
  input: {schema: StartupFromPromptInputSchema},
  output: {schema: StartupFromPromptOutputSchema},
  prompt: `You are a legal expert specializing in startups.

You will use this information to provide a summary of the initial legal requirements for the business idea, including but not limited to things like state of formation. Do not provide legal advice.

Business idea: {{{prompt}}}`,
});

const startupFromPromptFlow = ai.defineFlow(
  {
    name: 'startupFromPromptFlow',
    inputSchema: StartupFromPromptInputSchema,
    outputSchema: StartupFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
