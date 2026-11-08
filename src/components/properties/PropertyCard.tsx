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

  // Format price helper
  const formatCompactPrice = (priceKES: number) => {
    // For KES (Ksh)
    let primary = '';
    if (priceKES >= 1000000) {
      const m = priceKES / 1000000;
      primary = `Ksh ${m % 1 === 0 ? m : m.toFixed(1)}M`;
    } else {
      primary = `Ksh ${priceKES.toLocaleString()}`;
    }

    // For USD
    const usdVal = Math.round(priceKES / 129.57);
    let secondary = '';
    if (usdVal >= 1000000) {
      const m = usdVal / 1000000;
      secondary = `USD ${m % 1 === 0 ? m : m.toFixed(1)}M`;
    } else if (usdVal >= 1000) {
      const k = usdVal / 1000;
      secondary = `USD ${k % 1 === 0 ? k : k.toFixed(1)}K`;
    } else {
      secondary = `USD ${usdVal.toLocaleString()}`;
    }

    return { primary, secondary };
  };

  const formatRentPrice = (priceKES: number) => {
    const primary = `Ksh ${priceKES.toLocaleString()} / month`;
    const usdVal = Math.round(priceKES / 129.57);
    const secondary = `USD ${usdVal.toLocaleString()} / month`;
    return { primary, secondary };
  };

  const propertyTypeLabel = property.propertyType === 'APARTMENT' ? 'apartment' : property.propertyType === 'VILLA' ? 'villa' : 'property';
  const listingLabel = property.listingType === 'RENT' ? 'for rent' : 'for sale';
  const locationLabel = property.location || 'Nairobi';
  const propertyAltText = `Luxury ${propertyTypeLabel} ${listingLabel} in ${locationLabel}, Nairobi - ${property.title}`;
  
  return (
    <Link 
      href={`/properties/${property.slug}`}
      className="relative group h-[500px] overflow-hidden gold-border block" 
      data-testid="property-card"
    >
      <img 
        alt={propertyAltText} 
        src={property.heroImage} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Badges Container */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex flex-wrap items-center gap-x-2 gap-y-2.5 z-10 pointer-events-none">
        {property.propertyType && (
          <span className="h-7 px-3 inline-flex items-center justify-center backdrop-blur-md text-[10px] uppercase tracking-widest font-bold border bg-[#0A1015]/85 text-white/90 border-white/20 shadow-sm whitespace-nowrap shrink-0">
            {property.propertyType === 'APARTMENT' ? 'Apartment' : 'Villa'}
          </span>
        )}
        {(property.listingType === 'SALE' || property.listingType === 'BOTH') && (
          <span className="h-7 px-3 inline-flex items-center justify-center backdrop-blur-md text-[10px] uppercase tracking-widest font-bold border bg-primary/80 text-primary-foreground border-primary shadow-sm whitespace-nowrap shrink-0">
            For Sale
          </span>
        )}
        {(property.listingType === 'RENT' || property.listingType === 'BOTH') && (
          <span className="h-7 px-3 inline-flex items-center justify-center backdrop-blur-md text-[10px] uppercase tracking-widest font-bold border bg-[#0A1015]/85 text-white border-white/20 shadow-sm whitespace-nowrap shrink-0">
            For Rent
          </span>
        )}
        <span className={`h-7 px-3 inline-flex items-center justify-center backdrop-blur-md text-[10px] uppercase tracking-widest font-bold border shadow-sm whitespace-nowrap shrink-0 ml-auto ${
          isOffPlan 
            ? 'bg-primary/80 text-primary-foreground border-primary' 
            : 'bg-[#2E8B57]/80 text-white border-[#2E8B57]'
        }`}>
          {property.status}
        </span>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 w-full glass-panel p-6 gold-border-bottom border-t border-white/10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-2xl font-heading text-white mb-2">{property.title}</h3>
        <p className="text-sm text-white mb-4">{property.location}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${
              property.listingType === 'BOTH' ? 'text-white' : 'text-white/60'
            }`}>
              {property.listingType === 'BOTH' ? 'Buy & Rent' : property.listingType === 'RENT' ? 'Rent Price' : 'Sale Price'}
            </p>
            {property.listingType === 'BOTH' ? (
              <div className="flex flex-col gap-0.5">
                <div className="flex items-baseline gap-2 font-bold">
                  <span className="text-lg text-primary">{formatCompactPrice(property.salePrice || 0).primary}</span>
                  <span className="text-xs text-white font-sans">{formatCompactPrice(property.salePrice || 0).secondary}</span>
                </div>
                <div className="flex items-baseline gap-2 font-medium">
                  <span className="text-xs text-white">{formatRentPrice(property.rentPrice || 0).primary}</span>
                  <span className="text-[10px] text-white/70 font-sans">{formatRentPrice(property.rentPrice || 0).secondary}</span>
                </div>
              </div>
            ) : property.listingType === 'RENT' ? (
              <div className="flex items-baseline gap-2 font-bold">
                <span className="text-lg text-primary">{formatRentPrice(property.rentPrice || 0).primary}</span>
                <span className="text-xs text-white font-sans">{formatRentPrice(property.rentPrice || 0).secondary}</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2 font-bold">
                <span className="text-lg text-primary">{formatCompactPrice(property.salePrice || 0).primary}</span>
                <span className="text-xs text-white font-sans">{formatCompactPrice(property.salePrice || 0).secondary}</span>
              </div>
            )}
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
