import { getBranchesByBankDistrict, getUniqueBanks } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ bank: string, state: string, district: string }> }): Promise<Metadata> {
    const { bank: bankSlug, district: districtSlug } = await params;
    const banks = getUniqueBanks();
    const bank = banks.find(b => b.slug === bankSlug);
    const districtName = districtSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (!bank) return { title: 'Bank Not Found' };

    return {
        title: `${bank.bank_name} Branches in ${districtName} - IFSC & Branch Find | IndiaPincode`,
        description: `Complete list of ${bank.bank_name} branches in ${districtName}. Find IFSC codes, MICR codes, and branch addresses.`,
    };
}

export default async function BankBranchPage({ params }: { params: Promise<{ bank: string, state: string, district: string }> }) {
    const { bank: bankSlug, state: stateSlug, district: districtSlug } = await params;
    const branches = getBranchesByBankDistrict(bankSlug, stateSlug, districtSlug);

    if (branches.length === 0) {
        notFound();
    }

    const banks = getUniqueBanks();
    const bank = banks.find(b => b.slug === bankSlug);
    const bankName = bank?.bank_name || bankSlug.toUpperCase();
    const districtName = districtSlug.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="container fade-in" style={{ paddingTop: '40px' }}>
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/bank">Banks</Link>
                <span>/</span>
                <Link href={`/bank/${bankSlug}`}>{bankName}</Link>
                <span>/</span>
                <Link href={`/bank/${bankSlug}/${stateSlug}`}>Region</Link>
                <span>/</span>
                <span>{districtName}</span>
            </nav>

            <section style={{ marginBottom: '60px' }}>
                <h1>{bankName} Branches in {districtName}</h1>
                <p>Found {branches.length} branches. Click on an IFSC code to view full details.</p>

                <div className="grid">
                    {branches.map((branch) => (
                        <Link
                            key={branch.ifsc}
                            href={`/ifsc/${branch.ifsc}`}
                            className="card glass"
                        >
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{branch.name}</h3>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px' }}>{branch.ifsc}</div>
                            <p style={{ fontSize: '0.8rem', marginTop: '8px', marginBottom: 0 }}>View Full Branch Details</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
