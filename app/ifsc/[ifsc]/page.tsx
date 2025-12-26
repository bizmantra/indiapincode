import { getBankByIFSC, getPincodeDetail } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CopyButton from "@/components/CopyButton";
import JsonLd, { generateFAQSchema, generateBreadcrumbSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ ifsc: string }> }): Promise<Metadata> {
    const { ifsc } = await params;
    const bank = getBankByIFSC(ifsc);
    if (!bank) return { title: 'IFSC Not Found' };

    return {
        title: `${bank.ifsc} IFSC Code - ${bank.bank}, ${bank.branch} Branch | IndiaPincode`,
        description: `Get IFSC code ${bank.ifsc}, MICR code, branch address, and contact details for ${bank.bank} ${bank.branch} branch in ${bank.district}, ${bank.state}.`,
    };
}

export default async function IFSCDetailPage({ params }: { params: Promise<{ ifsc: string }> }) {
    const { ifsc } = await params;
    const bank = getBankByIFSC(ifsc);

    if (!bank) {
        notFound();
    }

    const domain = "https://indiapincode.org";
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", item: `${domain}/` },
        { name: "Banks", item: `${domain}/bank` },
        { name: bank.bank, item: `${domain}/bank/${bank.bank_slug}` },
        { name: `${bank.ifsc} IFSC`, item: `${domain}/ifsc/${bank.ifsc}` }
    ]);

    const faqs = [
        {
            question: `What is the IFSC code for ${bank.bank} ${bank.branch}?`,
            answer: `The IFSC code for ${bank.bank} ${bank.branch} is ${bank.ifsc}. This code is used for online fund transfers like NEFT, RTGS, and IMPS.`
        },
        {
            question: `Where is the ${bank.bank} ${bank.branch} branch located?`,
            answer: `The branch is located at: ${bank.address}. It serves the ${bank.district} district in ${bank.state}.`
        },
        {
            question: `What is the branch code for ${bank.ifsc}?`,
            answer: `The branch code is the last six characters of the IFSC code, which in this case is ${bank.ifsc.slice(-6)}.`
        }
    ];
    const faqSchema = generateFAQSchema(faqs);

    // Cross-link to pincode if available
    const pincodeData = bank.pincode ? getPincodeDetail(bank.pincode) : null;

    return (
        <div className="container fade-in" style={{ paddingTop: '40px' }}>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={faqSchema} />

            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/bank">Banks</Link>
                <span>/</span>
                <Link href={`/bank/${bank.bank_slug}`}>{bank.bank}</Link>
                <span>/</span>
                <span>{bank.ifsc}</span>
            </nav>

            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
                    <h1 style={{ fontSize: '3.5rem', margin: 0 }}>{bank.ifsc}</h1>
                    <CopyButton code={bank.ifsc} label="IFSC Code" variant="icon" />
                </div>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
                    {bank.bank}, {bank.branch} Branch
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div>
                    <section className="glass" style={{ padding: '30px', marginBottom: '40px' }}>
                        <h2>Branch Details</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '16px', fontSize: '1.1rem' }}>
                            <div style={{ fontWeight: 600 }}>Bank</div>
                            <div>{bank.bank}</div>

                            <div style={{ fontWeight: 600 }}>Branch</div>
                            <div>{bank.branch}</div>

                            <div style={{ fontWeight: 600 }}>IFSC Code</div>
                            <div style={{ color: 'var(--primary)', fontWeight: 700 }}>{bank.ifsc}</div>

                            <div style={{ fontWeight: 600 }}>Branch Code</div>
                            <div>
                                {bank.ifsc.slice(-6)}
                                <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '8px', fontWeight: 400 }}>
                                    (Last 6 characters of IFSC)
                                </span>
                            </div>

                            {bank.micr && (
                                <>
                                    <div style={{ fontWeight: 600 }}>MICR Code</div>
                                    <div>{Math.floor(bank.micr)}</div>
                                </>
                            )}

                            <div style={{ fontWeight: 600 }}>Address</div>
                            <div>{bank.address}</div>

                            {bank.contact && (
                                <>
                                    <div style={{ fontWeight: 600 }}>Contact</div>
                                    <div>{Math.floor(bank.contact)}</div>
                                </>
                            )}
                        </div>
                    </section>

                    <section className="glass" style={{ padding: '30px', marginBottom: '40px', background: 'var(--accent)' }}>
                        <h2>About this Branch</h2>
                        <p>
                            The {bank.bank} {bank.branch} branch is located in the {bank.district} district of {bank.state}.
                            It provides essential banking services including NEFT, RTGS, and IMPS money transfers.
                            The unique IFSC code <strong>{bank.ifsc}</strong> is used for online transactions and fund transfers across India.
                        </p>
                        {pincodeData && (
                            <p style={{ marginTop: '16px' }}>
                                This branch serves the <strong>{bank.pincode}</strong> pincode area. You can find more details about this area's postal services here:
                                <Link href={`/pincode/${bank.pincode}`} style={{ marginLeft: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                                    View Pincode {bank.pincode}
                                </Link>
                            </p>
                        )}
                    </section>

                    <section style={{ marginBottom: '60px' }}>
                        <h2>Banking FAQs</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {faqs.map((faq, i) => (
                                <div key={i} className="glass" style={{ padding: '20px' }}>
                                    <h4 style={{ marginBottom: '8px' }}>{faq.question}</h4>
                                    <p style={{ marginBottom: 0, fontSize: '0.95rem' }}>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="glass" style={{ padding: '30px', marginBottom: '40px' }}>
                        <h2>How to use {bank.bank} IFSC Code?</h2>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                            You can use the IFSC code <strong>{bank.ifsc}</strong> for various electronic fund transfers:
                        </p>
                        <ul style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <li style={{ fontSize: '0.9rem' }}>✅ <strong>NEFT:</strong> National Electronic Funds Transfer</li>
                            <li style={{ fontSize: '0.9rem' }}>✅ <strong>RTGS:</strong> Real Time Gross Settlement</li>
                            <li style={{ fontSize: '0.9rem' }}>✅ <strong>IMPS:</strong> Immediate Payment Service</li>
                            <li style={{ fontSize: '0.9rem' }}>✅ <strong>UPI:</strong> Unified Payments Interface</li>
                        </ul>
                    </section>
                </div>

                <div>
                    <div className="glass" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Quick Copy</h3>
                        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Copy the IFSC code for your bank transfer.</p>

                        <div style={{ margin: '20px 0', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px' }}>{bank.ifsc}</div>
                        </div>

                        <CopyButton code={bank.ifsc} label="IFSC Code" />
                    </div>
                </div>
            </div>
        </div>
    );
}
