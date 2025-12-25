"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBoxProps {
    variant?: "hero" | "header";
}

export default function SearchBox({ variant = "hero" }: SearchBoxProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const trimmedQuery = query.trim();

        // Check if it's a 6-digit pincode
        if (trimmedQuery.length === 6 && /^\d+$/.test(trimmedQuery)) {
            router.push(`/pincode/${trimmedQuery}`);
        }
        // Check if it's an 11-character IFSC code (4 letters + 7 alphanumeric)
        else if (trimmedQuery.length === 11 && /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(trimmedQuery)) {
            router.push(`/ifsc/${trimmedQuery.toUpperCase()}`);
        }
        // Otherwise, go to general search
        else {
            router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        }
    };

    const isHeader = variant === "header";

    return (
        <form onSubmit={handleSearch} className={isHeader ? "search-container-header" : "search-container"}>
            <input
                type="text"
                className={isHeader ? "search-input-header" : "search-input"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isHeader ? "Search Pincode or IFSC..." : "Enter Pincode, IFSC, or Area (e.g. 560001, SBIN0000001)..."}
            />
        </form>
    );
}
