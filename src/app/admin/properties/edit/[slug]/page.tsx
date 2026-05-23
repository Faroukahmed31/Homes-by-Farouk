import React from 'react';
import { notFound } from 'next/navigation';
import { getPropertyBySlug } from '@/lib/properties';
import { Navbar } from '@/components/layout/Navbar';
import { AdminPropertyForm } from '@/components/admin/AdminPropertyForm';

interface EditPropertyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-32 flex justify-center">
        <AdminPropertyForm property={property} />
      </div>
    </main>
  );
}
