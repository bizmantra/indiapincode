"use client";

export default function CopyButton({ code, label = "Pincode" }: { code: string; label?: string }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        alert(`${label} copied to clipboard!`);
    };

    return (
        <button className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }} onClick={handleCopy}>
            Copy {label}
        </button>
    );
}
