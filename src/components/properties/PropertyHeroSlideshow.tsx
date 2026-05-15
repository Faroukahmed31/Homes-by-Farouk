'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';

interface PropertyHeroSlideshowProps {
  property: Property;
}

export function PropertyHeroSlideshow({ property }: PropertyHeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [property.heroImage, ...property.galleryImages];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[85vh] overflow-hidden border-b border-primary/20 bg-black">
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
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20"></div>
      
      {/* Content Area */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-20 pb-16 md:pb-24 pointer-events-none">
        <div className="max-w-4xl space-y-6 pointer-events-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-8xl font-heading text-primary leading-none"
          >
            {property.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-8 text-white/90 font-sans text-lg md:text-xl"
          >
            <div className="flex items-center gap-3">
              <MapPin className="size-6 text-primary" />
              <span className="tracking-wide">{property.location}</span>
            </div>
            
            <div className="flex items-center gap-3 border-l border-white/20 pl-8">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Starting From</span>
              <span className="text-2xl font-bold font-heading">KES {property.startingPrice.toLocaleString()}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation & Indicators */}
      <div className="absolute bottom-8 right-6 md:right-20 flex flex-col items-end gap-6">
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-black/40 backdrop-blur-2xl border border-white/10 text-[10px] uppercase tracking-[0.4em] font-bold text-white flex items-center gap-4">
            <span className="text-primary">{String(currentIndex + 1).padStart(2, '0')}</span>
            <div className="w-12 h-px bg-white/20"></div>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="size-14 rounded-none border border-white/10 bg-black/40 hover:bg-primary hover:text-primary-foreground backdrop-blur-md transition-all"
            >
              <ChevronLeft className="size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="size-14 rounded-none border border-white/10 bg-black/40 hover:bg-primary hover:text-primary-foreground backdrop-blur-md transition-all"
            >
              <ChevronRight className="size-6" />
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
