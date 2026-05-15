"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/data/about";

export function ValueGrid() {
  const { pillars } = aboutData;

  return (
    <section className="bg-surface-container-lowest py-16 md:py-24 px-6 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-label tracking-[0.2em] text-[12px] font-bold text-on-surface-variant mb-10"
        >
          OUR PILLARS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`gold-border p-8 md:p-10 hover:bg-surface-container transition-colors duration-500 group ${
                index === 1 ? "md:mt-12" : ""
              }`}
            >
              <div className="mb-6 overflow-hidden h-48 bg-surface-container-low">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale opacity-60 group-hover:opacity-100"
                  src={pillar.image}
                  alt={pillar.title}
                />
              </div>
              <h3 className="font-heading text-3xl text-primary mb-4">
                {pillar.title}
              </h3>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
