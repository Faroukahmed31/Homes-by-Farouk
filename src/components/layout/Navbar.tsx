'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-dark backdrop-blur-2xl border-b border-primary/20 px-6 md:px-20 py-6">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <img 
            src="/images/homes-by-farouk-website-logo.png" 
            alt="Homes by Farouk" 
            className="h-12 md:h-15 w-auto object-contain"
          />
        </Link>
        
        {/* Desktop Navigation */}
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

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-brand-dark transition-all duration-500 ease-in-out z-40 flex flex-col items-center justify-center gap-8 md:hidden",
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-2xl font-heading tracking-widest transition-all duration-300",
                isActive ? "text-primary font-bold" : "text-foreground/60"
              )}
            >
              {link.name}
            </Link>
          );
        })}
        <Link 
          href="/contact" 
          onClick={() => setIsOpen(false)}
          className="red-button px-12 py-5 mt-4 text-sm font-bold tracking-[0.2em]"
        >
          ENQUIRE NOW
        </Link>
      </div>
    </header>
  );
}
