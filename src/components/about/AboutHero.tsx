"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/data/about";

export function AboutHero() {
  const { hero } = aboutData;

  return (
    <section className="min-h-[60vh] md:min-h-[80vh] flex flex-col md:flex-row items-center w-full overflow-hidden bg-background pt-24">
      {/* Left: Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full md:w-5/12 h-[40vh] md:h-[60vh] relative overflow-hidden"
      >
        <img
          alt="The Visionary Architect of Homes by Farouk"
          className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
          src={hero.image}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent"></div>
      </motion.div>

      {/* Right: Headline */}
      <div className="w-full md:w-7/12 flex flex-col justify-center px-6 md:px-20 py-12 md:py-0">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-label tracking-[0.2em] text-[12px] font-bold text-primary mb-6 block"
        >
          {hero.established}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-heading text-4xl md:text-7xl text-primary mb-8 leading-[1.1]"
        >
          {hero.title.split('.')[0]}.<br />
          <span className="italic font-normal">{hero.subtitle.split(' ')[0]}</span><br />
          {hero.subtitle.split(' ').slice(1).join(' ')}
        </motion.h1>

        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-24 h-px bg-primary/30 origin-left"
        ></motion.div>
      </div>
    </section>
  );
}
