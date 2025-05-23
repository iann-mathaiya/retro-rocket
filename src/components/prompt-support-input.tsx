import { actions } from "astro:actions";
import { useState, type FormEvent } from "react";
// import { useChat } from '@ai-sdk/react';

export default function PromptSupportInput() {
    const [supportPrompt, setSupportPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [AiOutput, setAiOutput] = useState("");
    // const { messages, input, handleInputChange, handleSubmit } = useChat({});


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append("support-prompt", supportPrompt);

        const { data, error } = await actions.support.createTicket(formData);

        if (!data?.success) {
            console.error('Failed to retrieve session:', error);
            return;
        }

        setSupportPrompt("");
        setAiOutput(data.output ?? "");
        setIsLoading(false);
    }

    return (
        <div className="sm:mt-8 w-full max-w-2xl fixed bottom-0 sm:relative">
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-0 bg-gray-300/50 border border-gray-400/40 focus-within:border-gray-400 rounded-2xl backdrop-blur-xl">
                <textarea
                    rows={10}
                    name="support-prompt"
                    value={supportPrompt}
                    placeholder="Ask anything..."
                    onChange={(e) => setSupportPrompt(e.target.value)}
                    className="px-3 py-2 min-h-32 w-full text-sm outline outline-none resize-none field-sizing-content"
                />

                <button type="submit" disabled={isLoading} className="w-fit absolute bottom-2 max-md:left-2 sm:right-2 p-2 text-sm text-white bg-gray-950 hover:bg-orange-600 hover:cursor-pointer rounded-full">
                    {isLoading ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 animate-spin" aria-hidden>
                            <title>Loading Spinner Icon</title>
                            <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
                            <title>Arrow Up Icon</title>
                            <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z">
                            </path>
                        </svg>
                    }
                </button>
            </form>

            <p className="mt-4 px-4 text-sm text-gray-800">{AiOutput}</p>
        </div>
    );
}
