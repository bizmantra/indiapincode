"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SearchBoxProps {
    variant?: "hero" | "header";
}

interface Suggestion {
    content_id: string;
    type: "pincode" | "bank" | "area";
    title: string;
    subtitle: string;
    slug: string;
}

export default function SearchBox({ variant = "hero" }: SearchBoxProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch suggestions with debounce
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    setSuggestions(data);
                    setShowSuggestions(true);
                    setSelectedIndex(-1);
                } catch (error) {
                    console.error("Failed to fetch suggestions:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        // If a suggestion is selected, use its path
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            navigateToSuggestion(suggestions[selectedIndex]);
            return;
        }

        // Check if it's a 6-digit pincode
        if (trimmedQuery.length === 6 && /^\d+$/.test(trimmedQuery)) {
            router.push(`/pincode/${trimmedQuery}`);
        }
        // Check if it's an 11-character IFSC code
        else if (trimmedQuery.length === 11 && /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(trimmedQuery)) {
            router.push(`/ifsc/${trimmedQuery.toUpperCase()}`);
        }
        // Otherwise, go to general search
        else {
            router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        }
        setShowSuggestions(false);
    };

    const navigateToSuggestion = (suggestion: Suggestion) => {
        const path = suggestion.type === 'pincode' ? `/pincode/${suggestion.slug}` :
            suggestion.type === 'bank' ? `/ifsc/${suggestion.slug}` :
                `/area/${suggestion.slug}`;
        router.push(path);
        setQuery(suggestion.title);
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            navigateToSuggestion(suggestions[selectedIndex]);
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    const isHeader = variant === "header";

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: isHeader ? '400px' : '600px' }}>
            <form onSubmit={handleSearch} className={isHeader ? "search-container-header" : "search-container"}>
                <input
                    ref={inputRef}
                    type="text"
                    className={isHeader ? "search-input-header" : "search-input"}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                    placeholder={isHeader ? "Search Pincode or IFSC..." : "Enter Pincode, IFSC, or Area (e.g. 560001, SBIN0000001)..."}
                    autoComplete="off"
                />
                {isLoading && (
                    <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
                        <div className="loader-small"></div>
                    </div>
                )}
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="glass"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        marginTop: '8px',
                        overflow: 'hidden',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={`${suggestion.type}-${suggestion.content_id}`}
                            onClick={() => navigateToSuggestion(suggestion)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            style={{
                                padding: '12px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: selectedIndex === index ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                transition: 'all 0.1s ease',
                                borderBottom: index < suggestions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>
                                {suggestion.type === 'pincode' ? '📍' : suggestion.type === 'bank' ? '🏢' : '📮'}
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>{suggestion.title}</span>
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{suggestion.subtitle}</span>
                            </div>
                        </div>
                    ))}
                    <div
                        onClick={() => handleSearch()}
                        style={{
                            padding: '10px 16px',
                            textAlign: 'center',
                            fontSize: '0.85rem',
                            color: 'var(--primary)',
                            fontWeight: 500,
                            borderTop: '1px solid rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            background: selectedIndex === suggestions.length ? 'rgba(37, 99, 235, 0.05)' : 'rgba(37, 99, 235, 0.02)'
                        }}
                    >
                        See all results for "{query}"
                    </div>
                </div>
            )}
        </div>
    );
}
