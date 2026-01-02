import { getPincodeDetail, getNearbyPincodes, getBanksByPincode, getNeighborhoodsByPincode } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { Metadata } from "next";
import JsonLd, { generateFAQSchema, generateBreadcrumbSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
    const { code } = await params;
    const data = getPincodeDetail(code);
    if (!data || !data.summary) return { title: 'Pincode Not Found' };

    return {
        title: `${code} Pin Code - ${data.summary.district}, ${data.summary.state} | IndiaPincode`,
        description: `Find details for Pin Code ${code}. Located in ${data.summary.district}, ${data.summary.state}. Includes ${data.summary.office_count} post offices and nearby bank branches.`,
    };
}

export default async function PincodePage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const data = getPincodeDetail(code);

    if (!data || !data.summary) {
        notFound();
    }

    const { summary, offices } = data;
    const nearbyPins = getNearbyPincodes(summary.district, String(code));
    const banks = getBanksByPincode(String(code));
    const localities = getNeighborhoodsByPincode(String(code));

    const domain = "https://indiapincode.org";
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", item: `${domain}/` },
        { name: "Pincodes", item: `${domain}/state` },
        { name: `Pincode ${code}`, item: `${domain}/pincode/${code}` }
    ]);

    const faqs = [
        {
            question: `Which district is ${code} in?`,
            answer: `Pincode ${code} is located in ${summary.district}, ${summary.state}.`
        },
        {
            question: `How many post offices are in ${code}?`,
            answer: `There are ${summary.office_count} post offices under this pincode, including ${offices[0].officename}.`
        },
        {
            question: `Is ${code} a delivery pincode?`,
            answer: `Yes, pincode ${code} has delivery offices like ${offices.find(o => o.deliverystatus === 'Delivery')?.officename || offices[0].officename}.`
        }
    ];
    const faqSchema = generateFAQSchema(faqs);

    return (
        <div className="container fade-in" style={{ paddingTop: '40px' }}>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={faqSchema} />

            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/state">Pincodes</Link>
                <span>/</span>
                <span>Pincode {code}</span>
            </nav>

            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
                    <h1 className="pincode-heading">{code}</h1>
                    <CopyButton code={code} label="Pincode" variant="icon" />
                </div>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
                    {summary.district}, {summary.state}
                </p>
            </div>

            <div className="grid main-grid">
                <div>
                    <section className="glass" style={{ padding: '30px', marginBottom: '40px' }}>
                        <h2>About Pincode {code}</h2>
                        <p>
                            Looking for <strong>{code} Pin Code</strong>? It belongs to the <strong>{summary.district}</strong> district of <strong>{summary.state}</strong>.
                            This pincode serves a total of <strong>{summary.office_count} post offices</strong> across the {summary.taluk ? `${summary.taluk} taluk` : 'region'}.
                        </p>
                        <p>
                            The {code} postal code is used for all types of deliveries including Speed Post, Registered Post, and standard Courier services in the {summary.district} area.
                            It is part of the {offices[0].circlename} postal circle.
                        </p>
                    </section>

                    {/* New Pincode Breakdown Section */}
                    <section className="glass" style={{ padding: '30px', marginBottom: '40px', background: 'var(--accent)' }}>
                        <h2>Postal Breakdown for {code}</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                            {String(code).split('').map((digit, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div className="pincode-digit-box">
                                        {digit}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', marginTop: '8px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                                        {i === 0 ? 'Region' : i === 1 ? 'Sub' : i === 2 ? 'Dist' : 'Office'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.9rem', textAlign: 'center', marginTop: '20px', color: '#475569' }}>
                            The first 3 digits represent the sorting district, while the last 3 identify the specific post office.
                        </p>
                    </section>

                    <section style={{ marginBottom: '60px' }}>
                        <h2>Post Offices in {code}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {offices.map((office, idx) => (
                                <div key={idx} className="glass" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{office.officename}</h3>
                                        <p style={{ fontSize: '0.85rem', marginBottom: 0, color: '#64748b' }}>
                                            {office.officetype} | {office.deliverystatus}
                                        </p>
                                    </div>
                                    <div style={{ padding: '8px 16px', borderRadius: '8px', background: office.deliverystatus === 'Delivery' ? '#dcfce7' : '#f1f5f9', color: office.deliverystatus === 'Delivery' ? '#166534' : '#475569', fontSize: '0.8rem', fontWeight: 600 }}>
                                        {office.deliverystatus}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '60px' }}>
                        <h2>Frequently Asked Questions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {faqs.map((faq, i) => (
                                <div key={i} className="glass" style={{ padding: '20px' }}>
                                    <h4 style={{ marginBottom: '8px' }}>{faq.question}</h4>
                                    <p style={{ marginBottom: 0, fontSize: '0.95rem' }}>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>


                    {localities.length > 0 && (
                        <section style={{ marginBottom: '60px' }}>
                            <h2>Localities & Areas in {code}</h2>
                            <p style={{ color: '#64748b', marginBottom: '20px' }}>
                                Found {localities.length} localities in this pincode
                            </p>
                            <div className="bank-table-container">
                                <table className="bank-table">
                                    <thead>
                                        <tr>
                                            <th>Locality / Area</th>
                                            <th style={{ textAlign: 'right' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {localities.map((locality, index) => (
                                            <tr key={`${index}-${locality.slug}`}>
                                                <td style={{ fontWeight: 500 }}>{locality.name}</td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <Link
                                                        href={`/area/${locality.slug}`}
                                                        className="btn"
                                                        style={{
                                                            padding: '8px 16px',
                                                            fontSize: '0.85rem',
                                                            background: 'var(--accent)',
                                                            color: 'var(--primary)',
                                                            border: '1px solid var(--border)'
                                                        }}
                                                    >
                                                        View Details →
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                    <section style={{ marginBottom: '60px' }}>
                        <h2>Banks near {code}</h2>
                        {banks.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                {banks.map((bank, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/ifsc/${bank.ifsc}`}
                                        className="glass"
                                        style={{ padding: '20px', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.2s' }}
                                    >
                                        <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--primary)' }}>{bank.bank}</h3>
                                        <p style={{ fontSize: '0.85rem', marginBottom: '4px' }}><strong>Branch:</strong> {bank.branch}</p>
                                        <p style={{ fontSize: '0.85rem', marginBottom: '4px' }}><strong>IFSC:</strong> {bank.ifsc}</p>
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 0 }}>{bank.address}</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p>No major bank branches found exactly in this pincode area. Check nearby areas for more results.</p>
                        )}
                    </section>
                </div>

                <div>
                    <div className="glass" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Quick Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Pincode</span>
                                <span style={{ fontWeight: 600 }}>{code}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>District</span>
                                <span style={{ fontWeight: 600 }}>{summary.district}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>State</span>
                                <span style={{ fontWeight: 600 }}>{summary.state}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Offices</span>
                                <span style={{ fontWeight: 600 }}>{summary.office_count}</span>
                            </div>
                        </div>

                        <CopyButton code={code} />
                    </div>

                    {nearbyPins.length > 0 && (
                        <div className="glass" style={{ padding: '24px', marginTop: '24px' }}>
                            <h3 style={{ marginBottom: '16px' }}>Nearby Pincodes</h3>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {nearbyPins.map((pin) => (
                                    <Link
                                        key={pin.pincode}
                                        href={`/pincode/${pin.pincode}`}
                                        style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', transition: 'all 0.2s' }}
                                        className="hover-accent"
                                    >
                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{pin.pincode}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{pin.district}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
