import { getUniqueBanks } from "@/lib/db";
import Link from "next/link";
import { Metadata } from "next";
import BankTable from "@/components/BankTable";

export const metadata: Metadata = {
    title: "All Banks in India - Complete Directory | IndiaPincode",
    description: "Browse the complete directory of all banks operating in India. Find IFSC codes, branch counts, and details for 150+ banks.",
};

export default function AllBanksPage() {
    const banks = getUniqueBanks();

    return (
        <div className="container fade-in" style={{ paddingTop: '40px' }}>
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/bank">Banks</Link>
                <span>/</span>
                <span>All Banks</span>
            </nav>

            <div style={{ marginBottom: '40px' }}>
                <h1>All Banks in India</h1>
                <p style={{ color: '#64748b' }}>
                    Complete directory of {banks.length} banks operating across India
                </p>
            </div>

            <BankTable banks={banks} />
        </div>
    );
}
