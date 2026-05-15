'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-dark backdrop-blur-2xl border-b border-primary/20 flex justify-between items-center px-6 md:px-20 py-6">
      <Link href="/" className="flex items-center">
        <img 
          src="/images/homes-by-farouk-website-logo.png" 
          alt="Homes by Farouk" 
          className="h-12 md:h-15 w-auto object-contain"
        />
      </Link>
      <nav className="hidden md:flex gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "text-sm transition-all duration-300 hover:opacity-80 hover:text-primary",
                isActive 
                  ? "text-primary border-b border-primary font-bold" 
                  : "text-foreground/60"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      <Link href="/contact" className="hidden md:inline-flex red-button px-8 py-4 items-center justify-center text-xs font-bold">
        Enquire Now
      </Link>
      {/* Mobile Menu Icon */}
      <button className="md:hidden text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </header>
  );
}
