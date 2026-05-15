"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/data/about";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTASection() {
  const { cta } = aboutData;

  return (
    <section className="py-16 md:py-24 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-background">
      {/* Abstract Background Detail */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-heading text-4xl md:text-5xl text-foreground mb-12 max-w-3xl relative z-10"
      >
        {cta.headline}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10"
      >
        <a 
          href={`https://wa.me/254721599075?text=${encodeURIComponent("Hi Farouk, I was on your website and I'd like to discuss building my property portfolio. When are you free for a quick chat?")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-[#C41E3A] hover:bg-[#A01830] text-white font-bold tracking-[0.2em] px-12 py-8 h-auto transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl rounded-none uppercase"
          )}
        >
          {cta.buttonLabel}
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 font-label text-[10px] tracking-[0.4em] text-white uppercase"
      >
        {cta.subtext}
      </motion.div>
    </section>
  );
}
