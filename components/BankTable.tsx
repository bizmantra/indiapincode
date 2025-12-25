"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Bank {
    bank_name: string;
    slug: string;
    branch_count: number;
}

interface BankTableProps {
    banks: Bank[];
}

export default function BankTable({ banks }: BankTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "branches">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const filteredAndSortedBanks = useMemo(() => {
        console.log('Total banks:', banks.length);

        // Filter banks - exclude banks with empty/null names
        let result = banks.filter(bank => {
            if (!bank || !bank.bank_name || bank.bank_name.trim() === '') return false;
            if (!searchQuery) return true; // If no search, include all valid banks
            return bank.bank_name.toLowerCase().includes(searchQuery.toLowerCase());
        });

        console.log('After filter:', result.length, 'Search query:', searchQuery);

        // Sort banks
        result.sort((a, b) => {
            if (sortBy === "name") {
                const nameA = (a.bank_name || "").trim();
                const nameB = (b.bank_name || "").trim();
                return sortOrder === "asc"
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            } else {
                const countA = a.branch_count || 0;
                const countB = b.branch_count || 0;
                return sortOrder === "asc"
                    ? countA - countB
                    : countB - countA;
            }
        });

        console.log('After sort:', result.length, 'Sort by:', sortBy, 'Order:', sortOrder);
        console.log('First 3 banks:', result.slice(0, 3).map(b => ({ name: b.bank_name, count: b.branch_count })));

        return result;
    }, [banks, searchQuery, sortBy, sortOrder]);

    const handleSort = (column: "name" | "branches") => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search banks by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ maxWidth: '500px' }}
                />
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '12px' }}>
                    Showing {filteredAndSortedBanks.length} of {banks.length} banks
                </p>
            </div>

            <div className="bank-table-container">
                <table className="bank-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("name")} style={{ cursor: 'pointer' }}>
                                Bank Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("branches")} style={{ cursor: 'pointer', textAlign: 'right' }}>
                                Branches {sortBy === "branches" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedBanks.map((bank, index) => (
                            <tr key={`${index}-${bank.slug || bank.bank_name}`}>
                                <td style={{ fontWeight: 500 }}>{bank.bank_name}</td>
                                <td style={{ textAlign: 'right', color: '#64748b' }}>
                                    {bank.branch_count.toLocaleString()}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link
                                        href={`/bank/${bank.slug}`}
                                        className="btn"
                                        style={{
                                            padding: '8px 16px',
                                            fontSize: '0.85rem',
                                            background: 'var(--accent)',
                                            color: 'var(--primary)',
                                            border: '1px solid var(--border)'
                                        }}
                                    >
                                        View Branches →
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
