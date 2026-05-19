import React from 'react';
import { getPropertiesFromNeon } from '@/lib/properties';
import { Navbar } from '@/components/layout/Navbar';
import { AdminNav } from '@/components/admin/AdminNav';
import { DeletePropertyButton } from '@/components/admin/DeletePropertyButton';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

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

        <div className="gold-border overflow-hidden bg-[#1c1b1b]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/5">
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Property</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Location</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Price (KES)</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Status</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Purpose</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-20 text-center text-muted-foreground italic">
                      No properties found in database. Click "Add New Property" to create one.
                    </td>
                  </tr>
                ) : (
                  properties.map((property) => (
                    <tr key={property.slug} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          {property.heroImage && (
                            <img 
                              src={property.heroImage} 
                              alt={property.title} 
                              className="w-16 h-10 object-cover border border-white/10"
                            />
                          )}
                          <div>
                            <p className="font-bold text-sm">{property.title}</p>
                            <p className="text-xs text-muted-foreground font-mono">{property.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm text-muted-foreground">{property.location}</td>
                      <td className="p-6 font-mono text-sm text-primary">
                        {property.startingPrice.toLocaleString()}
                      </td>
                      <td className="p-6">
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded-sm ${
                          property.status === 'Ready' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/25' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="p-6 text-xs uppercase font-bold tracking-widest">
                        {property.purpose}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end items-center gap-3">
                          <Link 
                            href={`/properties/${property.slug}`}
                            target="_blank"
                            className="p-2 text-muted-foreground hover:text-white transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          
                          <DeletePropertyButton slug={property.slug} title={property.title} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
