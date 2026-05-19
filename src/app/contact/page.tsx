import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/shared/ContactForm';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Contact Us | Homes by Farouk',
  description: "Get in touch with Nairobi's premier real estate advisory team for exclusive investment opportunities.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/254721599075?text=${encodeURIComponent("Hi Farouk, I'd like to get in touch regarding a real estate investment.")}`;

  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            
            {/* Left Column: Branding & Info */}
            <div className="flex flex-col gap-12 lg:sticky lg:top-32">
              <div className="flex flex-col gap-6">
                <h1 className="text-5xl md:text-7xl font-heading text-primary leading-[1.1]">
                  Let&apos;s Discuss Your Next Investment.
                </h1>
                <p className="text-lg md:text-xl text-foreground/60 max-w-md font-sans">
                  Our advisory team is ready to guide you through Nairobi&apos;s most exclusive real estate opportunities.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {/* Phone */}
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold">Phone</span>
                    <a href="tel:+254721599075" className="text-lg text-foreground hover:text-primary transition-colors font-sans">
                      +254 721 599 075
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold">Email</span>
                    <a href="mailto:faroukahmed3121@gmail.com" className="text-lg text-foreground hover:text-primary transition-colors font-sans">
                      faroukahmed3121@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold">Location</span>
                    <span className="text-lg text-foreground font-sans">Nairobi, Kenya</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-primary text-primary text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Message on WhatsApp
                </a>
                <a 
                  href="#inquiry-form"
                  className="text-foreground text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary flex items-center gap-2 border-b border-transparent hover:border-primary transition-all duration-300 pb-1"
                >
                  Schedule a Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
