"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface District {
    name: string;
    slug: string;
    pincode_count?: number;
}

interface DistrictTableProps {
    districts: District[];
    stateName: string;
    stateSlug: string;
}

export default function DistrictTable({ districts, stateName, stateSlug }: DistrictTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "pincodes">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const filteredAndSortedDistricts = useMemo(() => {
        // Filter districts
        let result = districts.filter(district => {
            if (!district || !district.name) return false;
            if (!searchQuery) return true;
            return district.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // Sort districts
        result.sort((a, b) => {
            if (sortBy === "name") {
                const nameA = a.name || "";
                const nameB = b.name || "";
                return sortOrder === "asc"
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            } else {
                const countA = a.pincode_count || 0;
                const countB = b.pincode_count || 0;
                return sortOrder === "asc"
                    ? countA - countB
                    : countB - countA;
            }
        });

        return result;
    }, [districts, searchQuery, sortBy, sortOrder]);

    const handleSort = (column: "name" | "pincodes") => {
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
                    placeholder="Search districts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ maxWidth: '500px' }}
                />
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '12px' }}>
                    Showing {filteredAndSortedDistricts.length} of {districts.length} districts
                </p>
            </div>

            <div className="bank-table-container">
                <table className="bank-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("name")} style={{ cursor: 'pointer' }}>
                                District {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            {districts.some(d => d.pincode_count) && (
                                <th onClick={() => handleSort("pincodes")} style={{ cursor: 'pointer', textAlign: 'right' }}>
                                    Pincodes {sortBy === "pincodes" && (sortOrder === "asc" ? "↑" : "↓")}
                                </th>
                            )}
                            <th style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedDistricts.map((district, index) => (
                            <tr key={`${index}-${district.slug}`}>
                                <td style={{ fontWeight: 500 }}>{district.name}</td>
                                {districts.some(d => d.pincode_count) && (
                                    <td style={{ textAlign: 'right', color: '#64748b' }}>
                                        {district.pincode_count?.toLocaleString() || '-'}
                                    </td>
                                )}
                                <td style={{ textAlign: 'right' }}>
                                    <Link
                                        href={`/district/${stateSlug}/${district.slug}`}
                                        className="btn"
                                        style={{
                                            padding: '8px 16px',
                                            fontSize: '0.85rem',
                                            background: 'var(--accent)',
                                            color: 'var(--primary)',
                                            border: '1px solid var(--border)'
                                        }}
                                    >
                                        View Pincodes →
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
