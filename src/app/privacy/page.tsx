import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, BarChart3 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Homes by Farouk',
  description: 'Learn how Homes by Farouk protects your information and confidentiality when exploring our luxury property portfolio.',
};

const privacySections = [
  {
    index: '01',
    title: 'Information We Collect',
    icon: Eye,
    content:
      'We only collect information you voluntarily provide, such as your name, email address, and phone number when inquiring about a property or requesting a viewing.',
  },
  {
    index: '02',
    title: 'How We Use Your Information',
    icon: Lock,
    content:
      'Your details are strictly used to provide you with requested property information, floor plans, pricing schedules, and exclusive off-plan investment opportunities via direct communication.',
  },
  {
    index: '03',
    title: 'Data Protection',
    icon: Shield,
    content:
      'We maintain strict confidentiality. Your personal information is never sold, traded, or rented to third parties.',
  },
  {
    index: '04',
    title: 'Analytics',
    icon: BarChart3,
    content:
      "We may use basic, anonymized website analytics to improve our portfolio's user experience and showcase the most relevant properties.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A1015] text-neutral-200 flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#0A1015]">
      <Navbar />

      <div className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 px-6 sm:px-8 lg:px-12 flex-1">
        {/* Subtle Ambient Radial Glow */}
        <div 
          aria-hidden="true" 
          className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[420px] bg-gradient-to-b from-[#D4AF37]/5 via-[#D4AF37]/[0.02] to-transparent blur-3xl pointer-events-none" 
        />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Top Back to Home Link */}
          <div className="mb-10 sm:mb-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] hover:text-[#F5D77F] transition-all duration-300 group font-sans font-semibold"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-[#D4AF37]" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Header */}
          <header className="mb-14 sm:mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/80 font-bold mb-3 block">
              Confidentiality &amp; Protocols
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#C5A880] mb-6 font-heading">
              Privacy Policy
            </h1>
            <div className="h-px w-20 bg-gradient-to-r from-[#D4AF37] to-transparent mb-8" />
            <p className="text-base sm:text-lg text-neutral-300/90 font-light leading-relaxed sm:leading-loose font-sans">
              At Homes by Farouk, your privacy and security are our highest priorities. This policy outlines how we handle your information when you interact with our digital portfolio.
            </p>
          </header>

          {/* Privacy Policy Sections */}
          <div className="space-y-10 sm:space-y-14">
            {privacySections.map((section) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.index}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-white/[0.03]"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D4AF37] font-semibold">
                        {section.index}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]/80 group-hover:border-[#D4AF37]/50 group-hover:text-[#F5D77F] transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[#F2CA50]">
                        {section.title}
                      </h2>
                      <p className="text-sm sm:text-base text-neutral-300/80 font-light leading-relaxed sm:leading-loose">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Bottom Navigation & Advisory Note */}
          <footer className="mt-16 sm:mt-24 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] hover:text-[#F5D77F] transition-all duration-300 group font-semibold"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
            <p className="text-[11px] uppercase tracking-widest text-neutral-500 font-mono">
              Last Updated: November 2026
            </p>
          </footer>
        </div>
      </div>

      <Footer />
    </main>
  );
}

