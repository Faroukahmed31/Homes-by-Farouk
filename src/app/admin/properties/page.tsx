import React from 'react';
import { getPropertiesFromNeon } from '@/lib/properties';
import { Navbar } from '@/components/layout/Navbar';
import { AdminNav } from '@/components/admin/AdminNav';
import { AdminPropertiesTable } from '@/components/admin/AdminPropertiesTable';

export const dynamic = 'force-dynamic';

export default async function AdminPropertiesPage() {
  const properties = await getPropertiesFromNeon();

  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary block mb-2">Backoffice</span>
            <h1 className="text-4xl md:text-5xl font-heading">Manage Properties</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Properties in DB</p>
            <p className="text-3xl font-bold text-primary">{properties.length}</p>
          </div>
        </div>

        <AdminNav />

        <AdminPropertiesTable initialProperties={properties} />
      </div>
    </main>
  );
}
