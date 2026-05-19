import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PropertyList } from '@/components/properties/PropertyList';
import { getPropertiesFromNeon } from '@/lib/properties';

export const metadata = {
  title: 'Luxury Property Listings in Nairobi | Homes by Farouk',
  description: 'Browse our curated selection of premium apartments, villas, and off-plan investments in Nairobi\'s most prestigious neighborhoods.',
};

export default async function PropertiesPage() {
  // Query listings instantly from Neon on the server side
  const properties = await getPropertiesFromNeon();

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <header className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-4">Curated Collection</span>
          <h1 className="text-4xl md:text-6xl font-heading text-white leading-tight">
            Nairobi Luxury Listings
          </h1>
        </header>
        
        <React.Suspense fallback={<div className="text-white">Loading properties...</div>}>
          <PropertyList initialProperties={properties} />
        </React.Suspense>
      </div>

      <Footer />
    </main>
  );
}
