import { z } from "astro:schema";
import { generateText } from "ai";
import { defineAction } from "astro:actions";
import { google } from "@ai-sdk/google";
import { googleAI } from "../lib/ai";

export const support = {
    createTicket: defineAction({
        accept: 'form',
        input: z.object({
            "support-prompt": z.string()
        }),
        handler: async (input) => {
            const supportPrompt = input["support-prompt"];

            console.log(supportPrompt);

            try {
                const response = await generateText({
                    model: googleAI("gemini-2.0-flash"),
                    prompt: supportPrompt
                });

                console.log(response);
            } catch (error) {
                console.error('Error creating support ticket:', error);
                return { success: false, message: "Failed to create support ticket" };
            }
        }
    })
};