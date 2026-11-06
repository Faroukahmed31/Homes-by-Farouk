import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#08090D] border-t border-white/5 px-6 md:px-20 py-10 text-white/70">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-10">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <Link href="/" className="inline-block">
            <img 
              src="/images/homes-by-farouk-circle-logo.png" 
              alt="Homes by Farouk" 
              className="h-12 w-12 rounded-full object-cover border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 brightness-110"
            />
          </Link>
          <p className="text-[11px] uppercase tracking-widest leading-relaxed max-w-[200px] text-white/30">
            Modern Expertise. <br />Future-Proof Investments.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold">Navigation</h4>
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <Link href="/properties" className="hover:text-white transition-colors text-white/50">Properties</Link>
            <Link href="/about" className="hover:text-white transition-colors text-white/50">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors text-white/50">Contact Us</Link>
            <Link href="/investment-guide" className="hover:text-white transition-colors text-white/50">Investment Guide</Link>
          </nav>
        </div>

        {/* Core Markets & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold">Core Markets</h4>
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <Link href="/properties?location=westlands" className="hover:text-white transition-colors text-white/50">Westlands</Link>
            <Link href="/properties?location=kileleshwa" className="hover:text-white transition-colors text-white/50">Kileleshwa</Link>
            <Link href="/properties?location=kilimani" className="hover:text-white transition-colors text-white/50 text-nowrap">Kilimani</Link>
            <Link href="/properties?location=syokimau" className="hover:text-white transition-colors text-white/50">Syokimau</Link>
          </nav>
          
          <div className="pt-2 flex gap-6 justify-center md:justify-start">
            <a 
              href="https://www.instagram.com/homesbyfarouk/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://www.tiktok.com/@homesbyfarouk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/40 hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a 
              href={`https://wa.me/254721599075?text=${encodeURIComponent("Hi Farouk, I am on your website and I'd like to discuss property investment opportunities in Nairobi.")}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/40 hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[11px] uppercase tracking-widest font-medium text-white/30">
          © 2026 Homes by Farouk. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link href="/privacy" className="text-[11px] uppercase tracking-widest font-medium text-white/30 hover:text-white/50 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-[11px] uppercase tracking-widest font-medium text-white/30 hover:text-white/50 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
