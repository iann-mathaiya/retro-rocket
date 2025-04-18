import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const googleAI = createGoogleGenerativeAI({
    apiKey: import.meta.env.GOOGLE_GEMINI_API_KEY,
});