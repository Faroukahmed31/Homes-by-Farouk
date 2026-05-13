'use client';

import React from 'react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Luxury modern mansion in Nairobi at twilight" 
          className="w-full h-full object-cover object-center opacity-40" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1A20gry4591OFiz-oL2FmfTaPeka39SyUnuucLPRLTIuKgKM_9JUUS98Y3ctWlnAWruvVAXbpxiitdzHadnD7uH6kRLL_EyEtZ4kGWNhPTDIJtI2qBF4x1-ppdjgeaqhzqmQX9FeiYNzA2rGIu97eraCH050ZKK3I5LNEDC-sEIzYsR-qefXS00pPH5l5vONnSEsoEl7CVudPf3zklZS4iayxVvjqR1NI1BR1Jm_NTCOIgN6Cp2cSBMQ4dtPwGHvjREO20yJgGngU"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 max-w-[1000px] mx-auto text-center px-6 md:px-0">
        <h1 className="text-4xl md:text-7xl font-heading text-primary mb-8 leading-tight">
          Find Your Dream Home in Nairobi.
        </h1>
        <Link href="#properties" className="inline-flex red-button px-10 py-5 items-center justify-center tracking-widest mt-8 text-sm font-bold">
          View Featured Properties
        </Link>
      </div>
    </section>
  );
}
