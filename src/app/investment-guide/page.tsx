import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight,
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  Building2, 
  Compass, 
  KeyRound, 
  FileCheck2,
  CalendarCheck2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '2026 Prime Real Estate Investment Guide | Homes by Farouk',
  description: "Exclusive insights, ROI projections, and strategic acquisition frameworks for Nairobi's most prestigious postcodes.",
};

const acquisitionSteps = [
  {
    step: '01',
    title: 'Consultation & Selection',
    description: 'Matching your investment goals to the exact right unit and floor plan.',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Reservation',
    description: 'Securing the unit with the initial booking fee.',
    icon: CalendarCheck2,
  },
  {
    step: '03',
    title: 'Legal & SPA',
    description: 'Executing the Sale and Purchase Agreement with full legal diligence.',
    icon: FileCheck2,
  },
  {
    step: '04',
    title: 'Handover',
    description: 'Receiving the keys, title, and transitioning into asset management.',
    icon: KeyRound,
  },
];

export default function InvestmentGuidePage() {
  return (
    <main className="min-h-screen bg-[#0A1015] text-neutral-200 flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#0A1015]">
      <Navbar />

      <div className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 px-6 sm:px-8 lg:px-12 flex-1">
        {/* Subtle Ambient Radial Glow */}
        <div 
          aria-hidden="true" 
          className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[520px] bg-gradient-to-b from-[#D4AF37]/8 via-[#D4AF37]/[0.02] to-transparent blur-3xl pointer-events-none" 
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Sleek Back to Home Button */}
          <div className="mb-12 sm:mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#D4AF37] hover:text-[#F5D77F] transition-all duration-300 group font-sans font-semibold py-2 px-3 -ml-3 rounded-lg hover:bg-[#D4AF37]/5"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-[#D4AF37]" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Section 1: Page Header */}
          <header className="mb-20 sm:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#F5D77F] font-bold">
                Executive Intelligence Briefing
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#C5A880] mb-8 font-heading leading-[1.15]">
              2026 Prime Real Estate Investment Guide
            </h1>

            <div className="h-px w-24 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent mb-8" />

            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300/90 font-light leading-relaxed font-sans max-w-3xl">
              Exclusive insights, ROI projections, and strategic acquisition frameworks for Nairobi&apos;s most prestigious postcodes.
            </p>
          </header>

          {/* Editorial Content Sections */}
          <div className="space-y-16 sm:space-y-24">
            
            {/* Section 2: The Prime Market Overview */}
            <section className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-12 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/30">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-semibold">
                  01 / Geographic Focus
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F2CA50] mb-6 font-heading">
                The Diplomatic Blue Zone &amp; High-Yield Nodes
              </h2>
              <p className="text-base sm:text-lg text-neutral-300/85 font-light leading-relaxed sm:leading-loose">
                Prime nodes like Riverside and Runda perpetually hold their value due to elite security and proximity to the UN, international embassies, and premier schools. For investors seeking aggressive, high-occupancy returns, strategically located units in Kilimani offer lucrative short-term, premium Airbnb models.
              </p>
            </section>

            {/* Section 3: ROI & Yield Projections */}
            <section className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-12 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/30">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-semibold">
                  02 / Wealth Growth
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F2CA50] mb-6 font-heading">
                Maximizing Capital &amp; Cash Flow
              </h2>
              <p className="text-base sm:text-lg text-neutral-300/85 font-light leading-relaxed sm:leading-loose mb-8">
                Secure exceptional capital appreciation, typically yielding 15-25% value growth from off-plan launch to handover in prime Nairobi. Investors can balance their portfolio with the steady, predictable income of long-term diplomatic leases or capitalize on the aggressive, high-yield returns of short-term furnished rentals.
              </p>

              {/* Data highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                <div className="rounded-xl bg-[#0D1217] border border-white/[0.05] p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-light text-white font-heading">15% – 25%</span>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Capital Appreciation from Off-Plan to Handover</p>
                  </div>
                </div>
                <div className="rounded-xl bg-[#0D1217] border border-white/[0.05] p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-light text-white font-heading">Dual Return Model</span>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Diplomatic Leases or High-Occupancy Airbnb</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: The Off-Plan Advantage */}
            <section className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-12 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/30">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-semibold">
                  03 / Capital Protection
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F2CA50] mb-6 font-heading">
                Strategic Entry Points
              </h2>
              <p className="text-base sm:text-lg text-neutral-300/85 font-light leading-relaxed sm:leading-loose">
                Capitalize on highly favorable entry prices. Secure a prestigious Riverside address at Cheval starting from just KES 8.3M. Enjoy flexible, staggered payment plans—typically requiring a booking fee and a 20% deposit, with the balance comfortably spread across the construction period to protect your cash flow.
              </p>
            </section>

            {/* Section 5: Expert Insight Highlight (Standout luxury blockquote card) */}
            <section className="relative overflow-hidden rounded-2xl bg-[#11161A] border-l-4 border-l-[#D4AF37] border-y border-r border-white/[0.06] p-8 sm:p-12 shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-1">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                      Expert Insight
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal text-white font-heading tracking-tight">
                    The Obstruction Rule: Future-Proofing Your Value
                  </h3>
                  <blockquote className="text-base sm:text-lg text-neutral-200/90 italic font-light leading-relaxed sm:leading-loose pt-2">
                    &ldquo;In prime real estate, natural light and unobstructed sightlines dictate premium pricing. Protect your asset&apos;s long-term value and liquidity by avoiding future structural obstruction. Always prioritize road-facing units or select plots adjacent to fully mature, established developments. Guaranteeing your view ensures perpetual tenant demand and maximized capital retention.&rdquo;
                  </blockquote>
                </div>
              </div>
            </section>

            {/* Section 6: The Acquisition Process */}
            <section className="space-y-8">
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-semibold block mb-3">
                  04 / Roadmap
                </span>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F2CA50] font-heading">
                  Seamless Acquisition in 4 Steps
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {acquisitionSteps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.step}
                      className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-mono text-[#D4AF37] font-bold">
                          {item.step}
                        </span>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 group-hover:border-[#D4AF37]/50 group-hover:text-[#F5D77F] transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 7: End-to-End Asset Management */}
            <section className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-12 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/30">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-semibold">
                  05 / Full Lifecycle
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F2CA50] mb-6 font-heading">
                Beyond the Sale
              </h2>
              <p className="text-base sm:text-lg text-neutral-300/85 font-light leading-relaxed sm:leading-loose">
                Homes by Farouk handles the entire lifecycle of your asset. We do not just secure the unit—we source elite tenants, negotiate premium leases, and oversee the setup of your short-term rental business post-handover to ensure day-one profitability.
              </p>
            </section>

            {/* Action Card: Call to Advisory */}
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#141B22] to-[#0A1015] p-8 sm:p-12 text-center relative overflow-hidden">
              <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 font-heading">
                Ready to Structure Your Acquisition?
              </h3>
              <p className="text-neutral-300 font-light max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                Connect directly with our private office for off-market inventory, verified unit projections, and personalized portfolio consulting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/properties"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D77F] transition-colors"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold text-xs uppercase tracking-widest transition-colors"
                >
                  <span>Private Consultation</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom Navigation */}
          <footer className="mt-16 sm:mt-24 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] hover:text-[#F5D77F] transition-all duration-300 group font-semibold"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
            <p className="text-[11px] uppercase tracking-widest text-neutral-500 font-mono">
              Homes by Farouk • Prime Investment Advisory
            </p>
          </footer>
        </div>
      </div>

      <Footer />
    </main>
  );
}

