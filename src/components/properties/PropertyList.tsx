'use client';

import React, { useState, useMemo } from 'react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { properties } from '@/lib/data';
import { Search } from 'lucide-react';

export function PropertyList() {
  const [filter, setFilter] = useState({
    status: 'All',
    category: 'All',
    search: ''
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchStatus = filter.status === 'All' || p.status.includes(filter.status);
      const matchCategory = filter.category === 'All' || p.category === filter.category;
      const matchSearch = p.title.toLowerCase().includes(filter.search.toLowerCase()) || 
                          p.location.toLowerCase().includes(filter.search.toLowerCase());
      return matchStatus && matchCategory && matchSearch;
    });
  }, [filter]);

  return (
    <div className="w-full">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 glass-panel p-6 gold-border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-transparent border-0 border-b border-primary/30 text-white placeholder:text-muted-foreground focus:ring-0 focus:border-primary transition-colors"
            placeholder="Search by name or location..."
            value={filter.search}
            onChange={(e) => setFilter({...filter, search: e.target.value})}
          />
        </div>
        
        <div className="flex gap-4">
          <select 
            className="bg-transparent border-0 border-b border-primary/30 text-white py-2 focus:ring-0 cursor-pointer"
            value={filter.status}
            onChange={(e) => setFilter({...filter, status: e.target.value})}
          >
            <option className="bg-[#131313]" value="All">All Status</option>
            <option className="bg-[#131313]" value="Ready">Ready to Move In</option>
            <option className="bg-[#131313]" value="Off-Plan">Off-Plan</option>
          </select>
          
          <select 
            className="bg-transparent border-0 border-b border-primary/30 text-white py-2 focus:ring-0 cursor-pointer"
            value={filter.category}
            onChange={(e) => setFilter({...filter, category: e.target.value})}
          >
            <option className="bg-[#131313]" value="All">All Types</option>
            <option className="bg-[#131313]" value="Apartment">Apartment</option>
            <option className="bg-[#131313]" value="Villa">Villa</option>
            <option className="bg-[#131313]" value="Penthouse">Penthouse</option>
            <option className="bg-[#131313]" value="Commercial">Commercial</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel gold-border">
          <h3 className="text-xl text-primary font-heading mb-2">No matching properties found</h3>
          <p className="text-muted-foreground text-sm">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
