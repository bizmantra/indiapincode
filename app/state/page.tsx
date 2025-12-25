import { getStates } from "@/lib/db";
import Link from "next/link";
import { Metadata } from "next";
import StateTable from "@/components/StateTable";

export const metadata: Metadata = {
    title: "Browse Post Offices by State - India Pincode Directory | PinFinder",
    description: "Find pincodes and post offices across India by browsing through states and districts. Covering 160,000+ postal codes.",
};

export default function StatesListingPage() {
    const states = getStates();

    return (
        <div className="container fade-in page-content-tight">
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span>States</span>
            </nav>

            <section style={{ marginBottom: '60px' }}>
                <div style={{ marginBottom: '30px' }}>
                    <h1>Browse Post Offices by State</h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Select a state to find districts and pincodes.</p>
                </div>

                <StateTable states={states} />
            </section>
        </div>
    );
}
