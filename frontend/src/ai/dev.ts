import { config } from 'dotenv';
config();

import '@/ai/flows/startup-from-prompt.ts';
import '@/ai/flows/answer-legal-questions.ts';
import '@/ai/flows/fetch-quickbooks-data.ts';
