import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer - PinFinder India",
    description: "Important disclaimer about the use of pincode and IFSC code data on PinFinder India.",
};

export default function DisclaimerPage() {
    return (
        <div className="container fade-in page-content">
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span>Disclaimer</span>
            </nav>

            <h1>Disclaimer</h1>

            <section style={{ marginBottom: '40px' }}>
                <h2>Information Accuracy</h2>
                <p>
                    PinFinder India provides pincode, IFSC code, and related postal/banking information for informational purposes only.
                    While we strive to maintain accurate and up-to-date information by programmatically updating our database with official sources,
                    we cannot guarantee 100% accuracy or completeness of the data.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Not an Official Government Website</h2>
                <p>
                    <strong>PinFinder India is NOT affiliated with, endorsed by, or connected to:</strong>
                </p>
                <ul style={{ marginLeft: '20px', lineHeight: 1.8 }}>
                    <li>India Post (Department of Posts, Government of India)</li>
                    <li>Reserve Bank of India (RBI)</li>
                    <li>Any banking institution or financial regulator</li>
                    <li>Any government agency or department</li>
                </ul>
                <p>
                    We are an independent, third-party information service. For official information, please visit:
                </p>
                <ul style={{ marginLeft: '20px', lineHeight: 1.8 }}>
                    <li><strong>India Post:</strong> <a href="https://www.indiapost.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>www.indiapost.gov.in</a></li>
                    <li><strong>Reserve Bank of India:</strong> <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>www.rbi.org.in</a></li>
                </ul>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Use at Your Own Risk</h2>
                <p>
                    The information provided on this website is for general informational purposes only. Users should:
                </p>
                <ul style={{ marginLeft: '20px', lineHeight: 1.8 }}>
                    <li>Verify critical information with official sources before making important decisions</li>
                    <li>Not rely solely on this website for financial transactions or legal matters</li>
                    <li>Contact the relevant post office or bank directly for confirmation</li>
                </ul>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>No Liability</h2>
                <p>
                    PinFinder India and its operators shall not be held liable for any errors, omissions, or inaccuracies in the information provided,
                    or for any actions taken based on this information. We are not responsible for:
                </p>
                <ul style={{ marginLeft: '20px', lineHeight: 1.8 }}>
                    <li>Incorrect pincode or IFSC code information</li>
                    <li>Outdated data due to changes in postal or banking systems</li>
                    <li>Any financial loss or inconvenience caused by using this information</li>
                    <li>Third-party content or external links</li>
                </ul>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Data Sources</h2>
                <p>
                    Our data is compiled from publicly available sources and is updated periodically. However, postal codes, bank branches,
                    and IFSC codes may change over time. We recommend verifying information with official sources for critical use cases.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Changes to Disclaimer</h2>
                <p>
                    We reserve the right to modify this disclaimer at any time. Continued use of the website after changes constitutes
                    acceptance of the updated disclaimer.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    <strong>Last Updated:</strong> December 2024
                </p>
            </section>
        </div>
    );
}
