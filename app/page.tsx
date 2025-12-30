import Link from "next/link";
import { getStates, getPopularNeighborhoods, getTopBanks } from "@/lib/db";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const allStates = getStates();
  const topStates = allStates.slice(0, 6);
  const popularLocalities = getPopularNeighborhoods(12);
  const topBanks = getTopBanks(10);

  // Popular pincodes from major cities
  const popularPincodes = [
    { pincode: "110001", city: "New Delhi", state: "Delhi" },
    { pincode: "400001", city: "Mumbai", state: "Maharashtra" },
    { pincode: "560001", city: "Bengaluru", state: "Karnataka" },
    { pincode: "600001", city: "Chennai", state: "Tamil Nadu" },
    { pincode: "700001", city: "Kolkata", state: "West Bengal" },
    { pincode: "500001", city: "Hyderabad", state: "Telangana" },
    { pincode: "380001", city: "Ahmedabad", state: "Gujarat" },
    { pincode: "411001", city: "Pune", state: "Maharashtra" },
    { pincode: "302001", city: "Jaipur", state: "Rajasthan" },
    { pincode: "226001", city: "Lucknow", state: "Uttar Pradesh" },
    { pincode: "160001", city: "Chandigarh", state: "Chandigarh" },
    { pincode: "695001", city: "Thiruvananthapuram", state: "Kerala" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Find Any Indian Pincode or Bank IFSC Code</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Search 160,000+ pincodes, 154,000+ localities, and 170,000+ bank branches across India
          </p>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <SearchBox variant="hero" />
          </div>
        </div>
      </section>

      {/* Popular Pincodes Section */}
      <section id="popular-pincodes" className="container" style={{ marginTop: '48px' }}>
        <h2>Popular Pincodes</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
          Quick access to pincodes from India's major cities including Delhi, Mumbai, Bengaluru, Chennai, Kolkata, and Hyderabad. Find postal codes for metropolitan areas and their surrounding districts.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {popularPincodes.map((item) => (
            <Link
              key={item.pincode}
              href={`/pincode/${item.pincode}`}
              className="card"
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.pincode}</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '2px', fontWeight: 500 }}>{item.city}</p>
              <p style={{ fontSize: '0.85rem', marginBottom: 0, color: 'var(--muted)' }}>{item.state}</p>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/state" className="btn">
            View All Pincodes →
          </Link>
        </div>
      </section>

      {/* Popular Localities Section */}
      <section id="popular-localities" className="container" style={{ marginTop: '48px' }}>
        <h2>Popular Localities</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
          Explore well-known neighborhoods and areas across Indian cities. Each locality page provides detailed pincode information, nearby post offices, and local bank branches for your convenience.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {popularLocalities.map((locality) => (
            <Link
              key={locality.slug}
              href={`/area/${locality.slug}`}
              className="card"
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{locality.name}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: 0, color: 'var(--muted)' }}>Pincode: {locality.pincode}</p>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/state" className="btn">
            View All Localities →
          </Link>
        </div>
      </section>

      {/* Popular Banks Section */}
      <section id="popular-banks" className="container" style={{ marginTop: '48px' }}>
        <h2>Popular Banks</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
          Search IFSC codes for India's leading banks. Get branch details, MICR codes, and addresses for SBI, HDFC, ICICI, and other major banks. Essential for NEFT, RTGS, and IMPS transactions.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {topBanks.map((bank) => (
            <Link
              key={bank.bank_slug}
              href={`/bank/${bank.bank_slug}`}
              className="card"
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{bank.bank}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: 0, color: 'var(--muted)' }}>
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

      {/* Browse Pincodes by State Section */}
      <section id="browse-states" className="container" style={{ marginTop: '48px' }}>
        <h2>Browse Pincodes by State</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
          Find pincodes across India's states and union territories. Access detailed postal information organized by district, with comprehensive listings for all major cities and rural areas.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {topStates.map((state) => (
            <Link
              key={state.slug}
              href={`/state/${state.slug}`}
              className="card"
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{state.name}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: 0, color: 'var(--muted)' }}>
                View all districts & pincodes
              </p>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/state" className="btn btn-primary">
            View All States →
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
