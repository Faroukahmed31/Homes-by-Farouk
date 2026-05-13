'use client';

import React, { useState } from 'react';
import { captureLead } from '@/app/actions/leads';

export function LeadMagnetSplit() {
  const [loading, setLoading] = useState<'local' | 'foreign' | null>(null);
  const [success, setSuccess] = useState<'local' | 'foreign' | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: 'local' | 'foreign') => {
    e.preventDefault();
    setLoading(type);
    
    const formData = new FormData(e.currentTarget);
    formData.append('guideType', type);
    
    await captureLead(formData);
    
    setLoading(null);
    setSuccess(type);
  };

  return (
    <section className="max-w-7xl mx-auto mb-32 px-6 md:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-primary/20">
        {/* Side A - Local Buyer */}
        <div className="bg-[#1c1b1b] p-12 lg:p-20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary block mb-6">Free Download</span>
            <h2 className="text-3xl md:text-4xl text-white mb-8 pr-12">
              The Nairobi Real Estate Playbook: 5 Costly Mistakes.
            </h2>
            
            {success === 'local' ? (
              <div className="p-8 gold-border glass-panel animate-in fade-in zoom-in duration-500">
                <h3 className="text-xl font-heading text-primary mb-2">Check Your Email!</h3>
                <p className="text-sm text-muted-foreground mb-6">We've sent the playbook to your inbox. It's time to avoid those costly mistakes.</p>
                <a 
                  href="/assets/Homes_by_Farouk_Local_Buyer_Playbook.pdf" 
                  download 
                  className="inline-block red-button px-6 py-3 text-[10px] font-bold"
                >
                  Download Directly
                </a>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-12">
                  Protect your capital. Learn the crucial pitfalls investors make in the current Nairobi market before making your next move.
                </p>
                <form onSubmit={(e) => handleSubmit(e, 'local')} className="space-y-6">
                  <input 
                    name="name"
                    required
                    className="w-full pb-2 bg-transparent border-0 border-b border-primary/50 text-white placeholder:text-muted-foreground focus:ring-0 focus:border-primary transition-colors" 
                    placeholder="Full Name" 
                    type="text" 
                  />
                  <input 
                    name="email"
                    required
                    className="w-full pb-2 bg-transparent border-0 border-b border-primary/50 text-white placeholder:text-muted-foreground focus:ring-0 focus:border-primary transition-colors" 
                    placeholder="Email Address" 
                    type="email" 
                  />
                  <button 
                    disabled={!!loading}
                    className="w-full red-button py-4 mt-4 text-xs font-bold disabled:opacity-50" 
                    type="submit"
                  >
                    {loading === 'local' ? 'Sending...' : 'Get The Playbook'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
        
        {/* Side B - Foreign Investor */}
        <div className="glass-panel p-12 lg:p-20 border-l border-primary/20">
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary block mb-6">Investor Brief</span>
            <h2 className="text-3xl md:text-4xl text-white mb-8 pr-12">
              The Complete Guide to Investing in Nairobi Real Estate.
            </h2>
            
            {success === 'foreign' ? (
              <div className="p-8 gold-border glass-panel animate-in fade-in zoom-in duration-500">
                <h3 className="text-xl font-heading text-primary mb-2">Guide is on its way!</h3>
                <p className="text-sm text-muted-foreground mb-6">Your comprehensive investment guide is being delivered to your inbox right now.</p>
                <a 
                  href="/assets/Homes_by_Farouk_Foreign_Investor_Guide.pdf" 
                  download 
                  className="inline-block red-button px-6 py-3 text-[10px] font-bold"
                >
                  Download Directly
                </a>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-12">
                  Identify high-yield zones, understand payment structures, and secure premium off-plan assets with confidence.
                </p>
                <form onSubmit={(e) => handleSubmit(e, 'foreign')} className="space-y-6">
                  <input 
                    name="name"
                    required
                    className="w-full pb-2 bg-transparent border-0 border-b border-primary/50 text-white placeholder:text-muted-foreground focus:ring-0 focus:border-primary transition-colors" 
                    placeholder="Full Name" 
                    type="text" 
                  />
                  <input 
                    name="email"
                    required
                    className="w-full pb-2 bg-transparent border-0 border-b border-primary/50 text-white placeholder:text-muted-foreground focus:ring-0 focus:border-primary transition-colors" 
                    placeholder="Email Address" 
                    type="email" 
                  />
                  <button 
                    disabled={!!loading}
                    className="w-full red-button py-4 mt-4 text-xs font-bold disabled:opacity-50" 
                    type="submit"
                  >
                    {loading === 'foreign' ? 'Sending...' : 'Download Guide'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
