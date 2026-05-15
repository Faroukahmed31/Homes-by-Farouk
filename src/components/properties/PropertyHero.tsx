import React from 'react';
import { MapPin } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyHeroProps {
  property: Property;
}

export function PropertyHero({ property }: PropertyHeroProps) {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] border-b border-primary/20 overflow-hidden">
      <img 
        src={property.heroImage} 
        alt={property.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 px-6 md:px-20 pb-12 w-full">
        <h1 className="text-4xl md:text-7xl font-heading text-primary mb-4 leading-tight">
          {property.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-foreground/80 font-sans text-lg">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-primary" />
            <span>{property.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Starting From</span>
            <span className="text-primary font-bold">KES {property.startingPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
