'use client';

import React, { useState } from 'react';
import { captureLead } from '@/app/actions/leads';
import { CheckCircle2 } from 'lucide-react';

export function LeadMagnetSplit() {
  const [loading, setLoading] = useState<'local' | 'foreign' | null>(null);
  const [success, setSuccess] = useState<'local' | 'foreign' | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: 'local' | 'foreign') => {
    e.preventDefault();
    setLoading(type);
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    formData.append('guideType', type);

    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';

    const isLocal = type === 'local';
    const guideName = isLocal
      ? 'The Nairobi Real Estate Playbook: 5 Costly Mistakes'
      : 'The Complete Guide to Investing in Nairobi Real Estate';

    // 1. Submit lead details to Web3Forms for instant email notification
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '747a34d5-97f6-4e99-b08d-04626f7699b5',
          name,
          email,
          subject: `New Lead: ${name} requested ${guideName}`,
          from_name: 'Homes by Farouk Leads',
          guide_requested: guideName,
          message: `${name} (${email}) requested "${guideName}". Automated email dispatched.`,
        }),
      });
    } catch (web3Err) {
      console.warn('Web3Forms dispatch warning:', web3Err);
    }

    // 2. Persist lead in PostgreSQL database and trigger background notification via Resend
    try {
      await captureLead(formData);
    } catch (captureErr) {
      console.warn('Lead capture warning:', captureErr);
    }

    // Clear form fields
    formElement.reset();
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
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <h3 className="text-xl font-heading text-primary">Check Your Email!</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Thank you! The 2026 Investment Guide has been sent to your email.
                </p>
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
                    {loading === 'local' ? 'Sending Guide...' : 'Get The Playbook'}
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
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <h3 className="text-xl font-heading text-primary">Guide is on its way!</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Thank you! The 2026 Investment Guide has been sent to your email.
                </p>
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
                    {loading === 'foreign' ? 'Sending Guide...' : 'Download Guide'}
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
