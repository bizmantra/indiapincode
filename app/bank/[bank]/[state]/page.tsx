import { getDistrictsByBankState, getUniqueBanks } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ bank: string, state: string }> }): Promise<Metadata> {
    const { bank: bankSlug, state: stateSlug } = await params;
    const banks = getUniqueBanks();
    const bank = banks.find(b => b.slug === bankSlug);
    const stateName = stateSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (!bank) return { title: 'Bank Not Found' };

    return {
        title: `${bank.bank_name} IFSC Codes in ${stateName} - Browse by District | PinFinder`,
        description: `Find IFSC codes for ${bank.bank_name} in various districts of ${stateName}. Browse branches and contact details.`,
    };
}

export default async function BankDistrictPage({ params }: { params: Promise<{ bank: string, state: string }> }) {
    const { bank: bankSlug, state: stateSlug } = await params;
    const districts = getDistrictsByBankState(bankSlug, stateSlug);

    if (districts.length === 0) {
        notFound();
    }

    const banks = getUniqueBanks();
    const bank = banks.find(b => b.slug === bankSlug);
    const bankName = bank?.bank_name || bankSlug.toUpperCase();
    const stateName = districts[0].name; // Using full name from DB

    return (
        <div className="container fade-in" style={{ paddingTop: '40px' }}>
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/bank">Banks</Link>
                <span>/</span>
                <Link href={`/bank/${bankSlug}`}>{bankName}</Link>
                <span>/</span>
                <span>{stateName}</span>
            </nav>

            <section style={{ marginBottom: '60px' }}>
                <h1>{bankName} Districts in {stateName}</h1>
                <p>Select a district to find branch offices and IFSC information.</p>

                <div className="grid">
                    {districts.map((dist) => (
                        <Link
                            key={dist.slug}
                            href={`/bank/${bankSlug}/${stateSlug}/${dist.slug}`}
                            className="card glass"
                        >
                            <h3 style={{ fontSize: '1.1rem' }}>{dist.name}</h3>
                            <p style={{ fontSize: '0.8rem', marginBottom: 0 }}>View All Branches</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
