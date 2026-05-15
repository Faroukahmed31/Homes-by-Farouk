'use client';

import React, { useState, useMemo } from 'react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { properties } from '@/data/properties';
import { Search } from 'lucide-react';

export function PropertyList() {
  const [filter, setFilter] = useState({
    status: 'All',
    search: ''
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchStatus = filter.status === 'All' || p.status === filter.status;
      const matchSearch = p.title.toLowerCase().includes(filter.search.toLowerCase()) || 
                          p.location.toLowerCase().includes(filter.search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [filter]);

  return (
    <div className="w-full">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 glass-panel p-6 gold-border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-transparent border-0 border-b border-primary/30 text-white placeholder:text-muted-foreground focus:ring-0 focus:border-primary transition-colors font-sans"
            placeholder="Search by name or location..."
            value={filter.search}
            onChange={(e) => setFilter({...filter, search: e.target.value})}
          />
        </div>
        
        <div className="flex gap-4">
          <select 
            className="bg-transparent border-0 border-b border-primary/30 text-white py-2 focus:ring-0 cursor-pointer font-sans"
            value={filter.status}
            onChange={(e) => setFilter({...filter, status: e.target.value})}
          >
            <option className="bg-[#131313]" value="All">All Status</option>
            <option className="bg-[#131313]" value="Ready">Ready to Move In</option>
            <option className="bg-[#131313]" value="Off-Plan">Off-Plan</option>
            <option className="bg-[#131313]" value="Rental">Rentals</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel gold-border">
          <h3 className="text-xl text-primary font-heading mb-2">No matching properties found</h3>
          <p className="text-muted-foreground text-sm font-sans">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
