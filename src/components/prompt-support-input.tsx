import { actions } from "astro:actions";


export default function PromptSupportInput() {
    return (
        <div className="sm:mt-8 w-full max-w-2xl fixed bottom-0 sm:relative p-4">
            <form action={actions.support.createTicket} className="flex flex-col gap-0 bg-gray-300/50 border border-gray-400/40 rounded-2xl backdrop-blur-xl">
                <textarea rows={4} name="support-prompt" placeholder="Ask anything..." className="px-3 py-2 min-h-16 w-full text-sm outline outline-none resize-none field-sizing-content" />
                <div className="flex sm:justify-end p-1.5">
                    <button type="submit" className="p-2 text-sm text-white bg-gray-950 hover:bg-orange-600 hover:cursor-pointer rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <title>Arrow Up Icon</title>
                            <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z">
                            </path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
