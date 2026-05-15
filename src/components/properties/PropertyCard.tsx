'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const isOffPlan = property.status.includes('Off-Plan');
  
  return (
    <Link 
      href={`/properties/${property.slug}`}
      className="relative group h-[500px] overflow-hidden gold-border block" 
      data-testid="property-card"
    >
      <img 
        alt={property.title} 
        src={property.heroImage} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Badge */}
      <div className={`absolute top-6 right-6 backdrop-blur-md text-xs font-bold px-4 py-2 border ${
        isOffPlan 
          ? 'bg-primary/80 text-primary-foreground border-primary' 
          : 'bg-[#2E8B57]/80 text-white border-[#2E8B57]'
      }`}>
        {property.status}
      </div>
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 w-full glass-panel p-6 gold-border-bottom border-t border-white/10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-2xl font-heading text-white mb-2">{property.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{property.location}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">Starting From</p>
            <p className="text-lg text-primary font-bold">
              KES {property.startingPrice.toLocaleString()}
            </p>
          </div>
          
          <div className="text-primary hover:text-white transition-colors flex items-center gap-2 group/btn cursor-pointer">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity">
              View Details
            </span>
            <ArrowRight size={32} strokeWidth={1} />
          </div>
        </div>
      </div>
    </Link>
  );
}
