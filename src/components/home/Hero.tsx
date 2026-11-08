'use client';

import React from 'react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Premier Nairobi Real Estate Consultant - Luxury apartments and houses in Nairobi" 
          className="w-full h-full object-cover object-center opacity-40" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1A20gry4591OFiz-oL2FmfTaPeka39SyUnuucLPRLTIuKgKM_9JUUS98Y3ctWlnAWruvVAXbpxiitdzHadnD7uH6kRLL_EyEtZ4kGWNhPTDIJtI2qBF4x1-ppdjgeaqhzqmQX9FeiYNzA2rGIu97eraCH050ZKK3I5LNEDC-sEIzYsR-qefXS00pPH5l5vONnSEsoEl7CVudPf3zklZS4iayxVvjqR1NI1BR1Jm_NTCOIgN6Cp2cSBMQ4dtPwGHvjREO20yJgGngU"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-brand-dark/60"></div>
      </div>
      
      <div className="relative z-10 max-w-[1050px] mx-auto text-center px-6 md:px-0">
        <span className="inline-block text-[11px] md:text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 border border-primary/30 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
          Premier Nairobi Real Estate Consultant
        </span>
        <h1 className="text-4xl md:text-7xl font-heading text-primary mb-6 leading-tight">
          Nairobi Real Estate Consultant: Find Your Dream Home in Nairobi.
        </h1>
        <p className="text-base md:text-xl text-neutral-300 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
          Specializing in prime off-plan developments, luxury apartments, and exclusive houses across Westlands, Kilimani, Kileleshwa, and Riverside.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/properties" className="inline-flex red-button px-10 py-5 items-center justify-center tracking-widest text-sm font-bold">
            View Featured Properties
          </Link>
          <Link href="/investment-guide" className="inline-flex border border-primary/40 hover:border-primary text-white hover:text-primary px-8 py-5 items-center justify-center tracking-widest text-xs uppercase font-bold transition-colors">
            Investment Guide
          </Link>
        </div>
      </div>
    </section>
  );
}
