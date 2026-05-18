'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Send,
  Download
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#08090D] border-t border-white/5 px-6 md:px-20 py-10 text-white/70">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-10">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <Link href="/" className="inline-block">
            <img 
              src="/images/homes-by-farouk-website-logo.png" 
              alt="Homes by Farouk" 
              className="h-12 w-auto object-contain brightness-110"
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
            
            {/* Lead Magnet Trigger */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger className="text-center md:text-left hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2 group text-white/50">
                Investment Guide
                <Download className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#0A0B10] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-light tracking-tight text-center">Investment Guide</DialogTitle>
                  <DialogDescription className="text-white/50 text-center">
                    Get our exclusive 2026 Nairobi Real Estate Market Report.
                  </DialogDescription>
                </DialogHeader>
                
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-medium">Guide Sent!</h3>
                    <p className="text-white/60">Your guide has been sent to your email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs uppercase tracking-widest opacity-60">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="farouk@example.com"
                        required
                        className="bg-white/5 border-white/10 focus:border-white/20 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest text-xs h-12">
                      Send Me The Guide
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </nav>
        </div>

        {/* Core Markets & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold">Core Markets</h4>
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <Link href="/properties?neighborhood=westlands" className="hover:text-white transition-colors text-white/50">Westlands</Link>
            <Link href="/properties?neighborhood=peponi-road" className="hover:text-white transition-colors text-white/50">Peponi Road</Link>
            <Link href="/properties?neighborhood=kilimani" className="hover:text-white transition-colors text-white/50 text-nowrap">Kilimani</Link>
            <Link href="/properties?neighborhood=syokimau" className="hover:text-white transition-colors text-white/50">Syokimau</Link>
          </nav>
          
          <div className="pt-2 flex gap-6 justify-center md:justify-start">
            <Link href="#" className="text-white/20 hover:text-white transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-white/20 hover:text-white transition-colors">
              <LinkedinIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-white/20 hover:text-white transition-colors">
              <TikTokIcon className="w-5 h-5" />
            </Link>
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

function LinkedinIcon({ className }: { className?: string }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
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
