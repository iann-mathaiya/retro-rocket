import { z } from "astro:schema";
import { generateText } from "ai";
import { googleAI } from "../lib/ai";
import { defineAction } from "astro:actions";

export const support = {
    createTicket: defineAction({
        accept: 'form',
        input: z.object({
            "support-prompt": z.string()
        }),
        handler: async (input) => {
            const supportPrompt = input["support-prompt"];

            try {
                const response = await generateText({
                    model: googleAI("gemini-2.0-flash"),
                    prompt: supportPrompt
                });

                console.log(response)

                return { success: true, output: response.text };

            } catch (error) {
                console.error('Error creating support ticket:', error);
                return { success: false, message: "Failed to create support ticket" };
            }
        }
    })
};