import { getStates, getPopularNeighborhoods, getTopBanks } from "@/lib/db";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const allStates = getStates();
  const topStates = allStates.slice(0, 6); // Reduced from 10 to 6
  const popularLocalities = getPopularNeighborhoods(12);
  const topBanks = getTopBanks(10);

  return (
    <div className="fade-in">
      <section className="search-hero">
        <div className="container">
          <h1>Find Pincodes & IFSC Codes in India</h1>
          <p>Search over 160,000+ pincodes, 154,000+ localities, and 170,000+ bank branches instantly.</p>

          <SearchBox />
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="container" style={{ marginTop: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>160K+</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Pincodes</div>
          </div>
          <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>154K+</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Localities</div>
          </div>
          <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>170K+</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Bank Branches</div>
          </div>
        </div>
      </section>

      {/* Popular Localities */}
      <section className="container" style={{ marginTop: '60px' }}>
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

      {/* Popular Banks */}
      <section className="container" style={{ marginTop: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ marginBottom: 0 }}>Popular Banks</h2>
          <Link href="/bank/all" className="btn" style={{ background: 'var(--accent)', color: 'var(--primary)', border: '1px solid var(--border)' }}>View All Banks →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {topBanks.map((bank) => (
            <Link
              key={bank.bank_slug}
              href={`/bank/${bank.bank_slug}`}
              className="card glass"
              style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: 0 }}>{bank.bank}</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{bank.branch_count.toLocaleString()} branches</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by State */}
      <section className="container" style={{ marginTop: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ marginBottom: 0 }}>Browse by State</h2>
          <Link href="/state" className="btn" style={{ background: 'var(--accent)', color: 'var(--primary)', border: '1px solid var(--border)' }}>View All States →</Link>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', margin: 0 }}>
          {topStates.map((state) => (
            <Link
              key={state.slug}
              href={`/state/${state.slug}`}
              className="card glass"
            >
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{state.name}</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>View All Districts & Pincodes</p>
            </Link>
          ))}
        </div>
      </section>

      {/* What is a Pincode */}
      <section className="container" style={{ marginTop: '60px', padding: '60px', borderRadius: '24px', background: 'var(--accent)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem' }}>What is a Pincode?</h2>
            <p>A Postal Index Number (PIN) or Pincode is a 6-digit code in the Indian postal system used by India Post. Introduced in 1972, it helps in efficient mail sorting and delivery by narrowing down the destination to a specific delivery post office.</p>
            <ul style={{ listStyle: 'none', marginTop: '20px' }}>
              <li style={{ marginBottom: '10px' }}>✅ <strong>1st Digit:</strong> Region</li>
              <li style={{ marginBottom: '10px' }}>✅ <strong>2nd Digit:</strong> Sub-region</li>
              <li style={{ marginBottom: '10px' }}>✅ <strong>3rd Digit:</strong> Sorting District</li>
              <li style={{ marginBottom: '10px' }}>✅ <strong>Last 3 Digits:</strong> Specific Post Office</li>
            </ul>
          </div>
          <div className="glass" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary)', opacity: 0.1 }}>560001</div>
            <p style={{ fontStyle: 'italic' }}>Example for Bangalore G.P.O</p>
          </div>
        </div>
      </section>
    </div>
  );
}
