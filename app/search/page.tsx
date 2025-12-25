import { searchEverything, searchIFSC } from "@/lib/db";
import Link from "next/link";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;
    const results = searchEverything(q || "");
    const ifscResults = searchIFSC(q || "");

    const hasResults = results.pincodes.length > 0 || results.neighborhoods.length > 0 || results.offices.length > 0 || ifscResults.length > 0;

    return (
        <div className="container fade-in" style={{ paddingTop: '40px' }}>
            <h1>Search Results for "{q}"</h1>

            {!hasResults && (
                <div style={{ padding: '60px', textAlign: 'center' }}>
                    <p>No results found for your search. Please try searching by 6-digit Pincode, 11-character IFSC code, or Area name.</p>
                    <Link href="/" className="btn btn-primary">Back to Home</Link>
                </div>
            )}

            {ifscResults.length > 0 && (
                <section style={{ marginBottom: '40px' }}>
                    <h2>Bank Branches & IFSC Codes</h2>
                    <div className="grid">
                        {ifscResults.map((bank: any) => (
                            <Link key={bank.ifsc} href={`/ifsc/${bank.ifsc}`} className="card glass">
                                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', marginBottom: '8px' }}>{bank.ifsc}</div>
                                <span style={{ fontSize: '1rem', fontWeight: 600 }}>{bank.bank}</span>
                                <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{bank.branch}</p>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{bank.district}, {bank.state}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {results.pincodes.length > 0 && (
                <section style={{ marginBottom: '40px' }}>
                    <h2>Pincodes</h2>
                    <div className="grid">
                        {results.pincodes.map((pin: any) => (
                            <Link key={pin.pincode} href={`/pincode/${pin.pincode}`} className="card glass">
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{pin.pincode}</span>
                                <p style={{ margin: 0 }}>{pin.district}, {pin.state}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {results.neighborhoods.length > 0 && (
                <section style={{ marginBottom: '40px' }}>
                    <h2>Areas & Localities</h2>
                    <div className="grid">
                        {results.neighborhoods.map((area: any) => (
                            <Link key={area.slug} href={`/area/${area.slug}`} className="card glass">
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{area.name}</span>
                                <p style={{ margin: 0 }}>Pincode: <strong>{area.pincode}</strong></p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {results.offices.length > 0 && (
                <section style={{ marginBottom: '40px' }}>
                    <h2>Post Offices</h2>
                    <div className="grid">
                        {results.offices.map((office: any, idx: number) => (
                            <Link key={idx} href={`/pincode/${office.pincode}`} className="card glass">
                                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{office.officename}</span>
                                <p style={{ margin: 0 }}>{office.districtname} - {office.pincode}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
