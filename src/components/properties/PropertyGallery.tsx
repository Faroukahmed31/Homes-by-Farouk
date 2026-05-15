'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyGalleryProps {
  images: string[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="px-6 md:px-20 py-12 border-b border-primary/20 bg-[#0A0A0A]">
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-primary/20 group">
        {/* Main Image Slideshow */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="size-12 md:size-16 rounded-full bg-black/20 hover:bg-primary hover:text-primary-foreground backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
          >
            <ChevronLeft className="size-6 md:size-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="size-12 md:size-16 rounded-full bg-black/20 hover:bg-primary hover:text-primary-foreground backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          >
            <ChevronRight className="size-6 md:size-8" />
          </Button>
        </div>

        {/* Counter & Status */}
        <div className="absolute bottom-8 right-8 flex items-center gap-4">
          <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold text-white">
            <span className="text-primary">{currentIndex + 1}</span> / {images.length}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white hover:text-primary"
          >
            <Maximize2 className="size-4" />
          </Button>
        </div>
      </div>

      {/* Thumbnails Bar */}
      <div className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative min-w-[120px] md:min-w-[200px] aspect-video border transition-all duration-500 overflow-hidden ${
              currentIndex === index ? 'border-primary ring-1 ring-primary' : 'border-white/10 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
            }`}
          >
            <img src={src} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
            {currentIndex === index && (
              <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
