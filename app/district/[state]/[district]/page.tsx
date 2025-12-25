import { getPincodesByDistrict } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PincodeTable from "@/components/PincodeTable";

export async function generateMetadata({ params }: { params: Promise<{ state: string, district: string }> }): Promise<Metadata> {
    const { state, district } = await params;
    const stateDisplayName = state.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const districtDisplayName = district.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return {
        title: `Pincodes in ${districtDisplayName}, ${stateDisplayName} | PinFinder`,
        description: `Browse all pincodes and post offices in ${districtDisplayName} district of ${stateDisplayName}. Get accurate postal information for the region.`,
    };
}

export default async function DistrictPage({ params }: { params: Promise<{ state: string, district: string }> }) {
    const { state, district } = await params;
    const pincodes = getPincodesByDistrict(state, district);

    if (pincodes.length === 0) {
        notFound();
    }

    const stateDisplayName = state.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const districtDisplayName = district.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="container fade-in page-content-tight">
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/state">States</Link>
                <span>/</span>
                <Link href={`/state/${state}`}>{stateDisplayName}</Link>
                <span>/</span>
                <span>{districtDisplayName}</span>
            </nav>

            <div style={{ marginBottom: '40px' }}>
                <h1>Pincodes in {districtDisplayName}, {stateDisplayName}</h1>
                <p style={{ color: '#64748b' }}>
                    Found {pincodes.length} unique pincodes in {districtDisplayName} district
                </p>
            </div>

            <PincodeTable pincodes={pincodes} />

            <div className="glass" style={{ padding: '30px', marginTop: '60px' }}>
                <h3 style={{ marginBottom: '10px' }}>Postal Network in {districtDisplayName}</h3>
                <p>This district is part of the {stateDisplayName} postal circle. The network of post offices here includes Head Offices, Sub-Offices, and Branch Offices, providing everything from local mail delivery to international speed post and financial services like the Post Office Savings Bank.</p>
            </div>
        </div>
    );
}
