import React from 'react';
import { getLeads } from '@/lib/leads';
import { Navbar } from '@/components/layout/Navbar';

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

        <div className="gold-border overflow-hidden bg-[#1c1b1b]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/5">
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Date</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Name</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Email</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Request</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-muted-foreground italic">
                      No leads generated yet.
                    </td>
                  </tr>
                ) : (
                  sortedLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-6 text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-6 font-bold">{lead.name}</td>
                      <td className="p-6 text-primary">{lead.email}</td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest">
                          {lead.guideType.replace(/-/g, ' ')}
                        </span>
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
