import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const geminiApiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY ||
  '';
const rawModel = process.env.GEMINI_MODEL || 'googleai/gemini-2.5-flash';
const geminiModel = rawModel.includes('/') ? rawModel : `googleai/${rawModel}`;

if (!geminiApiKey) {
  console.warn('GEMINI_API_KEY (or GOOGLE_API_KEY) is not set. AI responses will fail until it is configured.');
}

export const ai = genkit({
  plugins: [geminiApiKey ? googleAI({ apiKey: geminiApiKey }) : googleAI()],
  model: geminiModel,
});
