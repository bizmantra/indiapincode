import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - PinFinder India",
    description: "Privacy policy for PinFinder India - how we collect and use data.",
};

export default function PrivacyPage() {
    return (
        <div className="container fade-in page-content">
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span>Privacy Policy</span>
            </nav>

            <h1>Privacy Policy</h1>

            <section style={{ marginBottom: '40px' }}>
                <h2>Information We Collect</h2>
                <p>
                    PinFinder India is a publicly accessible information service. We do not require user registration or collect personal information.
                </p>
                <h3 style={{ fontSize: '1.1rem', marginTop: '20px' }}>Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect:</p>
                <ul style={{ marginLeft: '20px', lineHeight: 1.8 }}>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address (anonymized)</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website</li>
                </ul>
                <p>This information is collected through standard web analytics tools and is used solely to improve our service.</p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>How We Use Information</h2>
                <p>We use the automatically collected information to:</p>
                <ul style={{ marginLeft: '20px', lineHeight: 1.8 }}>
                    <li>Understand how users interact with our website</li>
                    <li>Improve website performance and user experience</li>
                    <li>Identify and fix technical issues</li>
                    <li>Analyze traffic patterns and popular searches</li>
                </ul>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Cookies</h2>
                <p>
                    We may use cookies and similar tracking technologies to enhance your browsing experience.
                    Cookies are small text files stored on your device. You can control cookie settings through your browser preferences.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Third-Party Services</h2>
                <p>
                    We may use third-party analytics services (such as Google Analytics) to help us understand website usage.
                    These services may collect information about your use of our website and other websites.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Data Security</h2>
                <p>
                    We implement reasonable security measures to protect the information we collect. However, no method of transmission
                    over the internet is 100% secure.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Children's Privacy</h2>
                <p>
                    Our website is not directed to children under 13. We do not knowingly collect information from children.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Changes to Privacy Policy</h2>
                <p>
                    We may update this privacy policy from time to time. Continued use of the website after changes constitutes
                    acceptance of the updated policy.
                </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Contact</h2>
                <p>
                    If you have questions about this privacy policy, please contact us through the information provided on our website.
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
