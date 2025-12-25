import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MobileHeader from "@/components/MobileHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PinFinder India - 160,000+ Pincodes, 154,000+ Localities & Bank IFSC Codes",
  description: "Quickly find any pincode, locality, or bank IFSC in India. Search 160,000+ post offices, 154,000+ localities, and 170,000+ bank branches.",
  openGraph: {
    title: "PinFinder India - Find Any Pincode or IFSC Code",
    description: "Search 160,000+ pincodes, 154,000+ localities, and 170,000+ bank branches across India.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PinFinder India",
    description: "Search 160,000+ pincodes, 154,000+ localities, and 170,000+ bank branches.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileHeader />
        <main>{children}</main>
        <footer>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
              <div>
                <h3 style={{ marginBottom: '1rem' }}>PinFinder</h3>
                <p>The fastest and most reliable pincode & IFSC lookup tool in India. Programmatically updated with the latest India Post and RBI data.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <h4 style={{ marginBottom: '0.8rem' }}>Quick Links</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.9rem', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}><Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link href="/state" style={{ textDecoration: 'none', color: 'inherit' }}>Browse States</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link href="/bank" style={{ textDecoration: 'none', color: 'inherit' }}>Browse Banks</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.8rem' }}>Legal</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.9rem', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}><Link href="/disclaimer" style={{ textDecoration: 'none', color: 'inherit' }}>Disclaimer</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
              © {new Date().getFullYear()} PinFinder India. Latest data for 2025. Not affiliated with India Post or RBI.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
