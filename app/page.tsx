import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  // Curated top states for SEO
  const topStates = [
    { name: "Uttar Pradesh", slug: "uttar-pradesh" },
    { name: "West Bengal", slug: "west-bengal" },
    { name: "Tamil Nadu", slug: "tamil-nadu" },
    { name: "Karnataka", slug: "karnataka" },
    { name: "Maharashtra", slug: "maharashtra" },
  ];

  // Curated top banks for SEO
  const topBanks = [
    { bank: "State Bank of India", bank_slug: "state-bank-of-india", branch_count: 22000 },
    { bank: "HDFC Bank", bank_slug: "hdfc-bank", branch_count: 6300 },
    { bank: "ICICI Bank", bank_slug: "icici-bank", branch_count: 5200 },
    { bank: "Canara Bank", bank_slug: "canara-bank", branch_count: 9500 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Find Any Indian Pincode or Bank IFSC Code</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
            Search 160,000+ pincodes, 154,000+ localities, and 170,000+ bank branches across India
          </p>

          {/* Centered Search Box */}
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <SearchBox variant="hero" />
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">160K+</div>
              <div className="stat-label">Pincodes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">154K+</div>
              <div className="stat-label">Localities</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">170K+</div>
              <div className="stat-label">Bank Branches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Pincodes by State Section */}
      <section className="container" style={{ marginTop: '48px' }}>
        <h2>Browse Pincodes by State</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
          Find pincodes across India's largest states. Access detailed postal information for major cities and districts including Delhi, Mumbai, Bengaluru, Chennai, and Kolkata. Each state page provides comprehensive pincode listings organized by district.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {topStates.map((state) => (
            <Link
              key={state.slug}
              href={`/state/${state.slug}`}
              className="card"
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{state.name}</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0, color: 'var(--muted)' }}>
                View all pincodes
              </p>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/state" className="btn">
            View All States →
          </Link>
        </div>
      </section>

      {/* Popular Banks Section */}
      <section className="container" style={{ marginTop: '48px' }}>
        <h2>Find Bank IFSC Codes</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
          Search IFSC codes for India's leading banks. Get branch details, MICR codes, and addresses for SBI, HDFC, ICICI, and other major banks. Essential for NEFT, RTGS, and IMPS transactions.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {topBanks.map((bank) => (
            <Link
              key={bank.bank_slug}
              href={`/bank/${bank.bank_slug}`}
              className="card"
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{bank.bank}</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0, color: 'var(--muted)' }}>
                {bank.branch_count.toLocaleString()} branches
              </p>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/bank" className="btn">
            View All Banks →
          </Link>
        </div>
      </section>

      {/* What is a Pincode Section */}
      <section className="container" style={{ marginTop: '64px', marginBottom: '64px' }}>
        <div className="glass">
          <h2>What is a Pincode?</h2>
          <p>
            A <strong>Pincode</strong> (Postal Index Number) is a 6-digit code used by India Post to identify specific post offices and delivery areas across India.
            Introduced in 1972, the pincode system helps streamline mail sorting and delivery.
          </p>
          <p>
            The first digit represents the region, the second digit represents the sub-region, and the third digit represents the sorting district.
            The last three digits represent the specific post office.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>IFSC Code</strong> (Indian Financial System Code) is an 11-character alphanumeric code used to identify bank branches for electronic fund transfers.
            It's essential for NEFT, RTGS, and IMPS transactions.
          </p>
        </div>
      </section>
    </div>
  );
}
