import { getDistrictsByState } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DistrictTable from "@/components/DistrictTable";

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
    const { state } = await params;
    const displayName = state.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
        title: `Pincodes in ${displayName} - Browse All Districts | IndiaPincode`,
        description: `Complete list of pincodes and post offices in ${displayName}. Browse by district to find postal codes across the state.`,
    };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
    const { state } = await params;
    const districts = getDistrictsByState(state);

    if (districts.length === 0) {
        notFound();
    }

    // Capitalize state name for display
    const displayName = state.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="container fade-in page-content-tight">
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/state">States</Link>
                <span>/</span>
                <span>{displayName}</span>
            </nav>

            <div style={{ marginBottom: '40px' }}>
                <h1>Pincodes in {displayName}</h1>
                <p style={{ color: '#64748b' }}>
                    Browse {districts.length} districts in {displayName} to find pincodes and post offices
                </p>
            </div>

            <DistrictTable
                districts={districts}
                stateName={displayName}
                stateSlug={state}
            />

            <section className="glass" style={{ padding: '40px', marginTop: '60px' }}>
                <h2>About {displayName} Postal Circle</h2>
                <p>The {displayName} postal circle is one of the key administrative divisions of India Post. It manages mail distribution across {districts.length} districts. Each district is further divided into postal divisions and subdivisions to ensure that even the most remote villages have access to essential communication and financial services.</p>
            </section>
        </div>
    );
}
