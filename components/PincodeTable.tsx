"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Pincode {
    pincode: string | number;
    office_count: number;
}

interface PincodeTableProps {
    pincodes: Pincode[];
}

export default function PincodeTable({ pincodes }: PincodeTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"pincode" | "offices">("pincode");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const filteredAndSortedPincodes = useMemo(() => {
        // Filter pincodes
        let result = pincodes.filter(pin => {
            if (!pin || !pin.pincode) return false;
            if (!searchQuery) return true;
            return String(pin.pincode).includes(searchQuery);
        });

        // Sort pincodes
        result.sort((a, b) => {
            if (sortBy === "pincode") {
                return sortOrder === "asc"
                    ? String(a.pincode).localeCompare(String(b.pincode))
                    : String(b.pincode).localeCompare(String(a.pincode));
            } else {
                const countA = a.office_count || 0;
                const countB = b.office_count || 0;
                return sortOrder === "asc"
                    ? countA - countB
                    : countB - countA;
            }
        });

        return result;
    }, [pincodes, searchQuery, sortBy, sortOrder]);

    const handleSort = (column: "pincode" | "offices") => {
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
                    placeholder="Search pincodes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ maxWidth: '500px' }}
                />
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '12px' }}>
                    Showing {filteredAndSortedPincodes.length} of {pincodes.length} pincodes
                </p>
            </div>

            <div className="bank-table-container">
                <table className="bank-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("pincode")} style={{ cursor: 'pointer' }}>
                                Pincode {sortBy === "pincode" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("offices")} style={{ cursor: 'pointer', textAlign: 'right' }}>
                                Post Offices {sortBy === "offices" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedPincodes.map((pin, index) => (
                            <tr key={`${index}-${pin.pincode}`}>
                                <td style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary)', letterSpacing: '1px' }}>
                                    {pin.pincode}
                                </td>
                                <td style={{ textAlign: 'right', color: '#64748b' }}>
                                    {pin.office_count}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link
                                        href={`/pincode/${pin.pincode}`}
                                        className="btn"
                                        style={{
                                            padding: '8px 16px',
                                            fontSize: '0.85rem',
                                            background: 'var(--accent)',
                                            color: 'var(--primary)',
                                            border: '1px solid var(--border)'
                                        }}
                                    >
                                        View Details →
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
