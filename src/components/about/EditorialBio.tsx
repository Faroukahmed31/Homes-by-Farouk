"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { aboutData } from "@/data/about";
import { ArrowRight } from "lucide-react";

export function EditorialBio() {
  const { narrative } = aboutData;

  return (
    <section className="px-6 md:px-20 py-16 md:py-24 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Pull Quote: Spanning 8 columns */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="col-span-12 md:col-span-8 mb-12"
        >
          <blockquote className="font-heading text-3xl md:text-5xl text-foreground leading-tight italic">
            "We don't just find properties; we secure your{" "}
            <span className="text-primary border-b border-primary/40 pb-1">
              financial future
            </span>{" "}
            through surgical precision in real estate selection."
          </blockquote>
        </motion.div>

        {/* Empty column for asymmetry on desktop */}
        <div className="hidden md:block col-span-1"></div>

        {/* Body Text: Column 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-12 md:col-span-5 mb-8 md:mb-12"
        >
          <p className="font-sans text-lg md:text-xl text-on-surface-variant mb-6 leading-relaxed">
            {narrative.paragraphs[0]}
          </p>
          <p className="font-sans text-base text-white leading-relaxed">
            {narrative.paragraphs[1]}
          </p>
        </motion.div>

        {/* Body Text: Column 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="col-span-12 md:col-span-5"
        >
          <p className="font-sans text-base text-white mb-8 leading-relaxed">
            {narrative.paragraphs[2]}
          </p>
          
          <Link 
            href="/properties"
            className="pt-8 border-t border-primary/20 flex items-center gap-4 group cursor-pointer w-fit"
          >
            <span className="font-label tracking-[0.2em] text-[12px] font-bold text-primary">
              {narrative.ctaLabel}
            </span>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
