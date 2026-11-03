'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/context/CurrencyContext';

interface PropertyHeroSlideshowProps {
  property: Property;
}

export function PropertyHeroSlideshow({ property }: PropertyHeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [property.heroImage, ...property.galleryImages];
  const { currency, setCurrency, formatPrice } = useCurrency();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[75vh] lg:h-[85vh] overflow-hidden border-b border-primary/20 bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${property.title} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="w-full h-full object-cover brightness-50"
          />
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20"></div>
      
      {/* Content Area */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-20 py-10 sm:py-12 md:py-20 pb-28 sm:pb-32 md:pb-24 pointer-events-none">
        <div className="max-w-4xl space-y-4 sm:space-y-6 pointer-events-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading text-primary leading-tight md:leading-none"
          >
            {property.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 sm:gap-8 text-white/90 font-sans text-base sm:text-lg md:text-xl"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <MapPin className="size-5 sm:size-6 text-primary shrink-0" />
              <span className="tracking-wide text-white">{property.location}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 sm:border-l sm:border-white/20 sm:pl-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/80 mb-0.5 sm:mb-1">Starting From</span>
                <span className="text-xl sm:text-2xl font-bold font-heading text-white">{formatPrice(property.startingPrice || 0)}</span>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="ml-2 sm:ml-4 bg-black/65 border border-primary/50 text-primary rounded-none py-1.5 sm:py-2 px-2.5 sm:px-3.5 font-sans text-[11px] sm:text-xs tracking-widest uppercase font-bold focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer hover:bg-black/85 transition-all select-none"
              >
                <option className="bg-[#12141a]" value="KES">KES</option>
                <option className="bg-[#12141a]" value="USD">USD ($)</option>
                <option className="bg-[#12141a]" value="GBP">GBP (£)</option>
                <option className="bg-[#12141a]" value="EUR">EUR (€)</option>
                <option className="bg-[#12141a]" value="AUD">AUD (A$)</option>
                <option className="bg-[#12141a]" value="CNY">CNY (¥)</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation & Indicators */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-20 z-20 flex flex-col items-end gap-4 sm:gap-6">
        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black/40 backdrop-blur-2xl border border-white/10 text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-white flex items-center gap-3 sm:gap-4">
            <span className="text-primary">{String(currentIndex + 1).padStart(2, '0')}</span>
            <div className="w-8 sm:w-12 h-px bg-white/20"></div>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="size-11 sm:size-14 rounded-none border border-white/10 bg-black/40 hover:bg-primary hover:text-primary-foreground backdrop-blur-md transition-all cursor-pointer"
            >
              <ChevronLeft className="size-5 sm:size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="size-11 sm:size-14 rounded-none border border-white/10 bg-black/40 hover:bg-primary hover:text-primary-foreground backdrop-blur-md transition-all cursor-pointer"
            >
              <ChevronRight className="size-5 sm:size-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          key={currentIndex}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 8, ease: "linear" }}
          className="h-full bg-primary"
        />
      </div>
    </section>
  );
}
