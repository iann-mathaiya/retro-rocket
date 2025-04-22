import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, type LanguageModel } from "ai";

export const googleAI = createGoogleGenerativeAI({
    apiKey: import.meta.env.GOOGLE_GEMINI_API_KEY,
});

export async function askWillo(prompt: string, model: LanguageModel) {
    const { text } = await generateText({ prompt, model });

    return text;
}