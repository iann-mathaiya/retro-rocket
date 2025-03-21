import { z } from "astro:schema";
import { defineAction } from "astro:actions";

export const support = {
    createTicket: defineAction({
        accept: 'form',
        input: z.object({
            "support-prompt": z.string()
        }),
        handler: async (input) => {
            const supportPrompt = input["support-prompt"]

            console.log(supportPrompt)
        }
    })
}