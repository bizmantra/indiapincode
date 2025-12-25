'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBox from './SearchBox';

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header>
            <div className="container" style={{ padding: '10px 0' }}>
                {/* Desktop Header */}
                <div className="header-desktop">
                    <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none', flexShrink: 0 }}>
                        PinFinder
                    </Link>
                    <div style={{ flex: 1, maxWidth: '500px' }}>
                        <SearchBox variant="header" />
                    </div>
                    <nav style={{ display: 'flex', gap: '25px', flexShrink: 0 }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: 500 }}>Home</Link>
                        <Link href="/state" style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: 500 }}>Post Offices</Link>
                        <Link href="/bank" style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: 500 }}>Banks</Link>
                    </nav>
                </div>

                {/* Mobile Header */}
                <div className="header-mobile">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Link href="/" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none' }}>
                            PinFinder
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                padding: '5px 10px',
                                color: 'var(--foreground)'
                            }}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <SearchBox variant="header" />
                    </div>

                    {isMenuOpen && (
                        <nav style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            paddingTop: '10px',
                            borderTop: '1px solid var(--border)'
                        }}>
                            <Link
                                href="/"
                                style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: 500, padding: '8px 0' }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/state"
                                style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: 500, padding: '8px 0' }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Post Offices
                            </Link>
                            <Link
                                href="/bank"
                                style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: 500, padding: '8px 0' }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Banks
                            </Link>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}
