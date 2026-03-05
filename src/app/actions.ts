
'use server';

import { answerLegalQuestions } from '@/ai/flows/answer-legal-questions';
import { z } from 'zod';

const AnswerSchema = z.object({
  question: z.string().min(1, { message: 'Question cannot be empty.' }),
});

export type ChatState = {
  messages: {
    role: 'user' | 'assistant';
    content: string;
    id: string;
  }[];
  error?: string;
  loading: boolean;
};

export async function askQuestion(
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  const validatedFields = AnswerSchema.safeParse({
    question: formData.get('question'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: validatedFields.error.flatten().fieldErrors.question?.[0],
      loading: false,
    };
  }
  
  const userMessage = { role: 'user' as const, content: validatedFields.data.question, id: crypto.randomUUID() };
  const newState = {
      ...prevState,
      messages: [...prevState.messages, userMessage],
      error: undefined,
      loading: true,
  };

  try {
    const response = await answerLegalQuestions({ question: validatedFields.data.question });
    const assistantMessage = { role: 'assistant' as const, content: response.answer, id: crypto.randomUUID() };
    return {
      ...newState,
      messages: [...newState.messages, assistantMessage],
      loading: false,
    };
  } catch (error) {
    console.error(error);
    const errorMessage = { role: 'assistant' as const, content: "Sorry, I couldn't get an answer. Please try again.", id: crypto.randomUUID() };
    return {
      ...newState,
      messages: [...newState.messages, errorMessage],
      error: "An unexpected error occurred.",
      loading: false,
    };
  }
}

const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  question: z.string().min(1, 'Question cannot be empty.'),
});

export type ContactFormState = {
    message: string;
    error?: string;
};

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    const validatedFields = ContactFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            ...prevState,
            error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
            message: "Validation failed."
        }
    }

    console.log("Form submitted:", validatedFields.data);

    // Here you would typically send an email, save to a database, etc.
    // For now, we'll just log it and return a success message.

    return {
        ...prevState,
        message: "Thank you for your message! We will get back to you shortly.",
        error: undefined,
    }
}
