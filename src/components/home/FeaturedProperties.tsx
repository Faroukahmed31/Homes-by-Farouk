'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PropertyCard } from '../properties/PropertyCard';
import { Property } from '@/types/property';

interface FeaturedPropertiesProps {
  initialProperties: Property[];
}

export function FeaturedProperties({ initialProperties }: FeaturedPropertiesProps) {
  const [propertiesList, setPropertiesList] = useState<Property[]>(initialProperties);

  // Sync state if initialProperties changes on the server
  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      setPropertiesList(initialProperties);
    }
  }, [initialProperties]);

  const featured = propertiesList.slice(0, 4);
  
  return (
    <section className="px-6 md:px-20 max-w-7xl mx-auto mb-32" id="properties">
      <div className="flex justify-between items-end mb-12 gold-border-bottom pb-4">
        <h2 className="text-3xl md:text-4xl text-foreground">Featured Properties</h2>
        <Link href="/properties" className="text-xs uppercase tracking-widest font-bold text-primary hover:text-white transition-colors">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featured.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </div>
    </section>
  );
}
