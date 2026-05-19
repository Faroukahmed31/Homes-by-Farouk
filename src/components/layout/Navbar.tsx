'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp Configuration
  const WHATSAPP_NUMBER = "254721599075";
  const WHATSAPP_MESSAGE = "Hi Farouk, I am on your website and I'd love to discuss my property goals in Nairobi with you. Are you available for a quick chat?";
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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
            src="/images/homes-by-farouk-circle-logo.png" 
            alt="Homes by Farouk" 
            className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
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
                  "text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-80 hover:text-primary",
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

        <a 
          href={WHATSAPP_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:inline-flex red-button px-8 py-4 items-center justify-center text-xs font-bold tracking-[0.2em] uppercase"
        >
          ENQUIRE NOW
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={cn(
        "absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-primary/20 transition-all duration-300 ease-in-out overflow-hidden md:hidden",
        isOpen ? "max-h-[400px] opacity-100 py-8" : "max-h-0 opacity-0 py-0"
      )}>
        <div className="flex flex-col items-center gap-6 px-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-heading tracking-[0.2em] uppercase transition-all duration-300",
                  isActive ? "text-primary font-bold" : "text-foreground/60"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full red-button py-4 text-center text-xs font-bold tracking-[0.2em]"
          >
            ENQUIRE NOW
          </a>
        </div>
      </div>
    </header>
  );
}
