import { useAtom } from "jotai";
import { useState } from "react";
import { searchQueryAtom } from "../lib/store";
import { navigate } from "astro:transitions/client";


export default function SearchInput({ pathname }: { pathname: string; }) {
    const [query, setQuery] = useAtom(searchQueryAtom);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && query.trim()) {
            e.preventDefault();

            const encodedQuery = encodeURIComponent(query.trim());
            navigate(`/search?q=${encodedQuery}`);
        }
    }

    function clearSearchQuery() {
        setQuery('');
        if (pathname === '/search') {
            navigate('/');
        }
    }

    return (
        <form className="w-full max-w-md relative">
            <input type="text" placeholder="Search products..." value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="px-2.5 py-1.5 w-full text-sm bg-gray-200 focus:bg-orange-600/5 border border-gray-300 focus:border-orange-300 rounded-lg focus:outline-[2.5px] focus:outline-orange-500/20" />

            {query &&
                <button type="button" onClick={clearSearchQuery} className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                        <title>Close Icons</title>
                        <path fill="currentColor" d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z" />
                    </svg>
                </button>
            }
        </form>
    );
}
