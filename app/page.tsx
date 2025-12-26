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
    { pincode: "560001", city: "Bangalore", state: "Karnataka" },
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
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
            Find Any Indian Pincode, Locality or Bank IFSC Code
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center', color: '#64748b' }}>
            Search 160,000+ pincodes, 154,000+ localities, and 170,000+ bank branches across India
          </p>
          <SearchBox variant="hero" />

          {/* Quick Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginTop: '30px',
            flexWrap: 'wrap',
            fontSize: '0.9rem',
            maxWidth: '100%',
            padding: '0 10px'
          }}>
            <a href="#popular-pincodes" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' }}>
              📍 Popular Pincodes
            </a>
            <span style={{ color: '#cbd5e1', display: 'none' }} className="nav-separator">|</span>
            <a href="#popular-localities" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' }}>
              📮 Popular Localities
            </a>
            <span style={{ color: '#cbd5e1', display: 'none' }} className="nav-separator">|</span>
            <a href="#popular-banks" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' }}>
              🏢 Popular Banks
            </a>
            <span style={{ color: '#cbd5e1', display: 'none' }} className="nav-separator">|</span>
            <a href="#browse-states" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' }}>
              🗺️ Browse by State
            </a>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat-card glass">
              <div className="stat-number">160K+</div>
              <div className="stat-label">Pincodes</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-number">154K+</div>
              <div className="stat-label">Localities</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-number">170K+</div>
              <div className="stat-label">Bank Branches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Pincodes Section */}
      <section id="popular-pincodes" className="container" style={{ marginTop: '60px' }}>
        <h2 style={{ marginBottom: '30px' }}>Popular Pincodes</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', margin: 0 }}>
          {popularPincodes.map((item) => (
            <Link
              key={item.pincode}
              href={`/pincode/${item.pincode}`}
              className="card glass"
              style={{ padding: '20px' }}
            >
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px' }}>{item.pincode}</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '4px', fontWeight: 500 }}>{item.city}</p>
              <p style={{ fontSize: '0.85rem', marginBottom: 0, color: '#64748b' }}>{item.state}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Localities Section */}
      <section id="popular-localities" className="container" style={{ marginTop: '60px' }}>
        <h2 style={{ marginBottom: '30px' }}>Popular Localities</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', margin: 0 }}>
          {popularLocalities.map((locality) => (
            <Link
              key={locality.slug}
              href={`/area/${locality.slug}`}
              className="card glass"
              style={{ padding: '20px' }}
            >
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '8px' }}>{locality.name}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: 0, color: '#64748b' }}>Pincode: {locality.pincode}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Banks Section */}
      <section id="popular-banks" className="container" style={{ marginTop: '60px' }}>
        <h2 style={{ marginBottom: '30px' }}>Popular Banks</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', margin: 0 }}>
          {topBanks.map((bank) => (
            <Link
              key={bank.bank_slug}
              href={`/bank/${bank.bank_slug}`}
              className="card glass"
              style={{ padding: '20px' }}
            >
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '8px' }}>{bank.bank}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: 0, color: '#64748b' }}>
                {bank.branch_count.toLocaleString()} branches
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse Pincodes by State Section */}
      <section id="browse-states" className="container" style={{ marginTop: '60px' }}>
        <h2 style={{ marginBottom: '30px' }}>Browse Pincodes by State</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', margin: 0 }}>
          {topStates.map((state) => (
            <Link
              key={state.slug}
              href={`/state/${state.slug}`}
              className="card glass"
              style={{ padding: '20px' }}
            >
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '8px' }}>{state.name}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: 0, color: '#64748b' }}>
                View all districts & pincodes
              </p>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link href="/state" className="btn btn-primary" style={{ padding: '12px 32px' }}>
            View All States →
          </Link>
        </div>
      </section>

      {/* What is a Pincode Section */}
      <section className="container" style={{ marginTop: '80px', marginBottom: '60px' }}>
        <div className="glass" style={{ padding: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>What is a Pincode?</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', marginBottom: '16px' }}>
            A <strong>Pincode</strong> (Postal Index Number) is a 6-digit code used by India Post to identify specific post offices and delivery areas across India.
            Introduced in 1972, the pincode system helps streamline mail sorting and delivery.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', marginBottom: '16px' }}>
            The first digit represents the region, the second digit represents the sub-region, and the third digit represents the sorting district.
            The last three digits represent the specific post office.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', marginBottom: 0 }}>
            <strong>IFSC Code</strong> (Indian Financial System Code) is an 11-character alphanumeric code used to identify bank branches for electronic fund transfers.
            It's essential for NEFT, RTGS, and IMPS transactions.
          </p>
        </div>
      </section>
    </div>
  );
}
