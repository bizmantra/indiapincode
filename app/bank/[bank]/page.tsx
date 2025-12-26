import { getStatesByBank, getUniqueBanks } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ bank: string }> }): Promise<Metadata> {
    const { bank: bankSlug } = await params;
    const banks = getUniqueBanks();
    const bank = banks.find(b => b.slug === bankSlug);

    if (!bank) return { title: 'Bank Not Found' };

    return {
        title: `${bank.bank_name} IFSC Codes - Browse by State | IndiaPincode`,
        description: `Find IFSC codes for ${bank.bank_name} branches across all states in India. Browse ${bank.branch_count} branches.`,
    };
}

export default async function BankStatePage({ params }: { params: Promise<{ bank: string }> }) {
    const { bank: bankSlug } = await params;
    const states = getStatesByBank(bankSlug);

    if (states.length === 0) {
        notFound();
    }

    const banks = getUniqueBanks();
    const bank = banks.find(b => b.slug === bankSlug);
    const bankName = bank?.bank_name || bankSlug.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="container fade-in" style={{ paddingTop: '40px' }}>
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/bank">Banks</Link>
                <span>/</span>
                <span>{bankName}</span>
            </nav>

            <section style={{ marginBottom: '60px' }}>
                <h1>{bankName} States</h1>
                <p>Select a state to find {bankName} branches and IFSC codes.</p>

                <div className="grid">
                    {states.map((state) => (
                        <Link
                            key={state.slug}
                            href={`/bank/${bankSlug}/${state.slug}`}
                            className="card glass"
                        >
                            <h3 style={{ fontSize: '1.1rem' }}>{state.name}</h3>
                            <p style={{ fontSize: '0.8rem', marginBottom: 0 }}>View Regions</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
