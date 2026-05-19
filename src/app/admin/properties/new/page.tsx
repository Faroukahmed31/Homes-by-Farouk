import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { AdminPropertyForm } from '@/components/admin/AdminPropertyForm';

export const dynamic = 'force-dynamic';

export default function NewPropertyPage() {
  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-32 flex justify-center">
        <AdminPropertyForm />
      </div>
    </main>
  );
}
