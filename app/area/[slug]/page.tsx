import { getNeighborhoodDetail, getPincodeDetail, getBanksByPincode } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const area = getNeighborhoodDetail(slug);
    if (!area) return { title: 'Area Not Found' };

    return {
        title: `${area.name} Pincode, ${area.district} - Postal Code & Details | PinFinder`,
        description: `Find the official pincode for ${area.name} in ${area.district}, ${area.state}. Get detailed delivery information and post office details for ${area.name}.`,
    };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const area = getNeighborhoodDetail(slug);

    if (!area) {
        notFound();
    }

    const pincodeData = getPincodeDetail(area.pincode);
    const banks = getBanksByPincode(area.pincode);

    return (
        <div className="container fade-in" style={{ paddingTop: '40px' }}>
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span>{area.name} Pincode</span>
            </nav>

            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{area.name} Pin Code</h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700 }}>{area.pincode}</p>
                <p style={{ color: '#64748b' }}>{area.district}, {area.state}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div>
                    <section className="glass" style={{ padding: '30px', marginBottom: '40px' }}>
                        <h2>About {area.name}</h2>
                        <p>{area.description}</p>
                        <p style={{ marginTop: '16px' }}>
                            The registered pincode for <strong>{area.name}</strong> is <strong>{area.pincode}</strong>.
                            This locality falls under the <strong>{pincodeData.summary.taluk}</strong> taluk and is served by the
                            <strong> {pincodeData.offices[0].officename}</strong> post office.
                        </p>
                        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#64748b' }}>
                            <strong>Note:</strong> S.O = Sub Office, H.O = Head Office, B.O = Branch Office
                        </p>
                    </section>

                    <section style={{ marginBottom: '60px' }}>
                        <h2>Postal Services in {area.name}</h2>
                        <div className="glass" style={{ padding: '24px' }}>
                            <p>Since {area.name} uses the {area.pincode} pincode, residents have access to the following services at the local post office:</p>
                            <ul style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <li>✅ Speed Post</li>
                                <li>✅ Registered Post</li>
                                <li>✅ Money Order</li>
                                <li>✅ Savings Account</li>
                                <li>✅ Philately</li>
                                <li>✅ Aadhaar Services</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div>
                    <div className="glass" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Address Breakdown</h3>
                        <div style={{ padding: '20px', background: 'var(--accent)', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                            [Recipient Name]<br />
                            [House No, Street]<br />
                            <strong>{area.name}</strong><br />
                            {area.district}, {area.state}<br />
                            <strong>{area.pincode}</strong>
                        </div>
                        <CopyButton code={area.pincode} />
                    </div>

                    <div style={{ marginTop: '24px' }}>
                        <Link href={`/pincode/${area.pincode}`} className="btn" style={{ width: '100%', textAlign: 'center', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
                            View Full {area.pincode} Details
                        </Link>
                    </div>
                </div>
            </div>

            <section style={{ marginBottom: '60px' }}>
                <h2>Banks near {area.name} ({area.pincode})</h2>
                {banks.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                        {banks.map((bank, idx) => (
                            <div key={idx} className="glass" style={{ padding: '20px' }}>
                                <Link href={`/bank/${bank.bank_slug}`} style={{ textDecoration: 'none' }}>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--primary)' }}>{bank.bank}</h3>
                                </Link>
                                <p style={{ fontSize: '0.85rem', marginBottom: '4px' }}><strong>Branch:</strong> {bank.branch}</p>
                                <p style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                                    <strong>IFSC:</strong>
                                    <Link href={`/ifsc/${bank.ifsc}`} style={{ marginLeft: '8px', color: 'var(--primary)', textDecoration: 'none' }}>
                                        {bank.ifsc}
                                    </Link>
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 0 }}>{bank.address}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No major bank branches found exactly in this locality's pincode area.</p>
                )}
            </section>
        </div>
    );
}
