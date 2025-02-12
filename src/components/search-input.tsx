import { navigate } from "astro:transitions/client";
import { useState } from "react";


export default function SearchInput() {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && query.trim()) {
            e.preventDefault();

            const encodedQuery = encodeURIComponent(query.trim());
            navigate(`/search?q=${encodedQuery}`);
        }
    }

    return (
        <form action="" className="w-full max-w-md">
            <input type="text" placeholder="Search products..." value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="px-2.5 py-1.5 w-full text-sm bg-gray-200 border border-gray-300 rounded-lg outline outline-transparent focus:outline-gray-600" />
        </form>
    );
}
