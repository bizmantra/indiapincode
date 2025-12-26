"use client";
import { useState } from 'react';

export default function CopyButton({
    code,
    label = "Pincode",
    variant = "primary"
}: {
    code: string;
    label?: string;
    variant?: "primary" | "ghost" | "icon"
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (variant === "icon") {
        return (
            <button
                onClick={handleCopy}
                style={{
                    background: copied ? '#dcfce7' : 'var(--accent)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    width: '36px',
                    height: '36px'
                }}
                title={`Copy ${label}`}
            >
                {copied ? '✅' : '📋'}
            </button>
        );
    }

    if (variant === "ghost") {
        return (
            <button
                onClick={handleCopy}
                className="btn"
                style={{
                    background: copied ? '#dcfce7' : 'rgba(37, 99, 235, 0.05)',
                    color: copied ? '#166534' : 'var(--primary)',
                    border: '1px solid rgba(37, 99, 235, 0.1)',
                    padding: '8px 16px',
                    fontSize: '0.85rem'
                }}
            >
                {copied ? 'Copied!' : `Copy ${label}`}
            </button>
        );
    }

    return (
        <button className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }} onClick={handleCopy}>
            {copied ? '✅ Copied!' : `Copy ${label}`}
        </button>
    );
}
