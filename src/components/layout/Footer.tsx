import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black/40 border-t border-primary/10 px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-heading text-xl text-primary uppercase font-semibold">
          Homes by Farouk
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest font-bold">
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Investment Guide</Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Nairobi Offices</Link>
        </div>
        
        <div className="text-muted-foreground text-[10px] text-center md:text-right">
          © 2026 Homes by Farouk. Architectural Excellence in Nairobi.
        </div>
      </div>
    </footer>
  );
}
