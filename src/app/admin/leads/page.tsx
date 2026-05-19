import React from 'react';
import { getLeads } from '@/lib/leads';
import { Navbar } from '@/components/layout/Navbar';
import { AdminNav } from '@/components/admin/AdminNav';
import { MapPin } from 'lucide-react';
import { properties } from '@/data/properties';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leads = await getLeads();
  const sortedLeads = [...leads].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary block mb-2">Backoffice</span>
            <h1 className="text-4xl md:text-5xl font-heading">Lead Dashboard</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Leads</p>
            <p className="text-3xl font-bold text-primary">{leads.length}</p>
          </div>
        </div>

        <AdminNav />

        <div className="gold-border overflow-hidden bg-[#1c1b1b]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/5">
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Date</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Name</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Contact</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Client Location</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Request / Route</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-muted-foreground italic">
                      No leads generated yet.
                    </td>
                  </tr>
                ) : (
                  sortedLeads.map((lead) => {
                    // Match property info if inquiry
                    const isPropertyInquiry = lead.guideType.startsWith('inquiry-');
                    const propertySlug = isPropertyInquiry ? lead.guideType.replace('inquiry-', '') : null;
                    const matchedProperty = propertySlug ? properties.find(p => p.slug === propertySlug) : null;

                    // Build maps origin & destination
                    const origin = lead.clientLat && lead.clientLon
                      ? `${lead.clientLat},${lead.clientLon}`
                      : lead.clientCity 
                        ? `${lead.clientCity}, ${lead.clientCountry || ''}` 
                        : '';
                    
                    const destination = matchedProperty 
                      ? `${matchedProperty.title}, ${matchedProperty.location}`
                      : 'Nairobi, Kenya';

                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;

                    return (
                      <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-6 text-sm text-muted-foreground whitespace-nowrap">
                          {new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-6 font-bold">{lead.name}</td>
                        <td className="p-6 text-sm">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${lead.email}`} className="text-primary underline decoration-primary/30 hover:text-primary-light transition-colors">{lead.email}</a>
                            {lead.phone ? (
                              <a href={`tel:${lead.phone}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">{lead.phone}</a>
                            ) : (
                              <span className="text-white/20 text-xs">-</span>
                            )}
                          </div>
                        </td>
                        <td className="p-6 text-sm">
                          {lead.clientCity ? (
                            <div className="flex flex-col">
                              <span className="font-bold">{lead.clientCity}</span>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{lead.clientCountry}</span>
                              {lead.clientLat && (
                                <span className="text-[9px] text-primary/50 font-mono">
                                  GPS: {lead.clientLat.toFixed(4)}, {lead.clientLon?.toFixed(4)}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-white/20 italic text-xs">Unknown IP</span>
                          )}
                        </td>
                        <td className="p-6">
                          <div className="flex flex-col gap-2">
                            <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest w-fit">
                              {lead.guideType.replace(/-/g, ' ')}
                            </span>
                            {lead.message && (
                              <p className="text-xs text-muted-foreground max-w-xs line-clamp-1 italic">
                                &ldquo;{lead.message}&rdquo;
                              </p>
                            )}
                            {matchedProperty && (
                              <a 
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-primary hover:text-white transition-colors w-fit mt-1"
                              >
                                <MapPin size={12} />
                                View Route (Directions)
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
