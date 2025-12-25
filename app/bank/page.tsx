import { getUniqueBanks } from "@/lib/db";
import Link from "next/link";
import { Metadata } from "next";
import SearchBox from "@/components/SearchBox";

export const metadata: Metadata = {
    title: "Find Bank IFSC Codes - 170,000+ Branches Across India | PinFinder",
    description: "Search IFSC codes for all major banks in India. Find branch details, addresses, and MICR codes for SBI, HDFC, ICICI, and 150+ other banks.",
};

export default function BankListPage() {
    const allBanks = getUniqueBanks();
    const totalBranches = allBanks.reduce((sum, bank) => sum + bank.branch_count, 0);

    // Top popular banks (manually curated based on common usage)
    const topBankNames = [
        "State Bank of India",
        "HDFC Bank",
        "ICICI Bank",
        "Axis Bank",
        "Bank of Baroda",
        "Punjab National Bank",
        "Canara Bank",
        "Union Bank of India",
        "Bank of India",
        "IDBI Bank",
        "Kotak Mahindra Bank",
        "IndusInd Bank"
    ];

    const topBanks = topBankNames
        .map(name => allBanks.find(b => b.bank_name === name))
        .filter(Boolean) as typeof allBanks;

    return (
        <div className="fade-in">
            <section className="search-hero" style={{ padding: '60px 0' }}>
                <div className="container">
                    <h1>Find Bank IFSC Codes</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Search across 170,000+ bank branches in India</p>
                    <SearchBox />
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '16px' }}>
                        Try searching by IFSC code (e.g., SBIN0000001) or bank name
                    </p>
                </div>
            </section>

            <div className="container page-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h2>Popular Banks</h2>
                        <p style={{ margin: 0, color: '#64748b' }}>Quick access to major banks in India</p>
                    </div>
                    <Link href="/bank/all" className="btn" style={{ background: 'var(--primary)', color: 'white' }}>
                        View All {allBanks.length} Banks →
                    </Link>
                </div>

                <div className="grid">
                    {topBanks.map((bank) => (
                        <Link
                            key={bank.slug}
                            href={`/bank/${bank.slug}`}
                            className="card glass"
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div>
                                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{bank.bank_name}</h3>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{bank.branch_count.toLocaleString()} Branches</p>
                            </div>
                            <span style={{ fontSize: '1.2rem', opacity: 0.3 }}>→</span>
                        </Link>
                    ))}
                </div>

                <section className="glass" style={{ padding: '40px', marginTop: '60px', marginBottom: '60px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '30px' }}>Complete Banking Directory</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '30px' }}>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>{allBanks.length}+</div>
                            <div style={{ color: '#64748b' }}>Banks</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>{Math.floor(totalBranches / 1000)}K+</div>
                            <div style={{ color: '#64748b' }}>Branches</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>All</div>
                            <div style={{ color: '#64748b' }}>States Covered</div>
                        </div>
                    </div>
                    <p style={{ marginBottom: '20px' }}>
                        Looking for a specific bank? Browse our complete directory of all banks operating in India.
                    </p>
                    <Link href="/bank/all" className="btn btn-primary">
                        Browse All Banks
                    </Link>
                </section>
            </div>
        </div>
    );
}
