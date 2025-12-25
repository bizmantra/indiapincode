'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

type State = {
    name: string;
    slug: string;
    district_count?: number;
    pincode_count?: number;
};

type SortField = 'name' | 'district_count' | 'pincode_count';
type SortOrder = 'asc' | 'desc';

export default function StateTable({ states }: { states: State[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const filteredAndSortedStates = useMemo(() => {
        let filtered = states.filter(state =>
            state.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        filtered.sort((a, b) => {
            let aVal: string | number = a[sortField] || '';
            let bVal: string | number = b[sortField] || '';

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = (bVal as string).toLowerCase();
            }

            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [states, searchQuery, sortField, sortOrder]);

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return ' ⇅';
        return sortOrder === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search states..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '12px 20px',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
                    }}
                />
            </div>

            <div className="bank-table-container">
                <table className="bank-table">
                    <thead>
                        <tr>
                            <th
                                onClick={() => handleSort('name')}
                                style={{ cursor: 'pointer', userSelect: 'none' }}
                            >
                                State Name{getSortIcon('name')}
                            </th>
                            <th style={{ width: '200px', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedStates.map((state) => (
                            <tr key={state.slug}>
                                <td>
                                    <strong>{state.name}</strong>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link
                                        href={`/state/${state.slug}`}
                                        className="btn btn-primary"
                                        style={{
                                            padding: '8px 16px',
                                            fontSize: '0.9rem',
                                            textDecoration: 'none',
                                            display: 'inline-block'
                                        }}
                                    >
                                        View Districts →
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#64748b' }}>
                Showing {filteredAndSortedStates.length} of {states.length} states
            </div>
        </div>
    );
}
