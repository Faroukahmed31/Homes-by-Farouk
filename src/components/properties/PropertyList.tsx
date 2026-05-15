'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { properties } from '@/data/properties';
import { Search } from 'lucide-react';

export function PropertyList() {
  const searchParams = useSearchParams();
  
  const [filter, setFilter] = useState({
    status: 'All',
    search: '',
    location: 'any',
    purpose: 'buy'
  });

  // Initialize filters from URL parameters
  useEffect(() => {
    const statusParam = searchParams.get('status');
    const locationParam = searchParams.get('location');
    const purposeParam = searchParams.get('purpose');
    
    setFilter(prev => ({
      ...prev,
      status: statusParam === 'ready' ? 'Ready' : statusParam === 'off-plan' ? 'Off-Plan' : 'All',
      location: locationParam || 'any',
      purpose: (purposeParam as 'buy' | 'rent') || 'buy'
    }));
  }, [searchParams]);

  // Sync purpose and status: Rent always shows Ready units
  useEffect(() => {
    if (filter.purpose === 'rent') {
      setFilter(prev => ({ ...prev, status: 'Ready' }));
    }
  }, [filter.purpose]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      // Status Match
      const matchStatus = filter.status === 'All' || p.status === filter.status;
      
      // Search Match
      const matchSearch = p.title.toLowerCase().includes(filter.search.toLowerCase()) || 
                          p.location.toLowerCase().includes(filter.search.toLowerCase());
      
      // Location Match
      const matchLocation = filter.location === 'any' || 
                            p.location.toLowerCase().includes(filter.location.toLowerCase());

      // Purpose Match
      const matchPurpose = p.purpose === filter.purpose;
      
      return matchStatus && matchSearch && matchLocation && matchPurpose;
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
            value={filter.purpose}
            onChange={(e) => setFilter({...filter, purpose: e.target.value as 'buy' | 'rent'})}
          >
            <option className="bg-[#131313]" value="buy">For Sale</option>
            <option className="bg-[#131313]" value="rent">To Rent</option>
          </select>

          <select 
            className="bg-transparent border-0 border-b border-primary/30 text-white py-2 focus:ring-0 cursor-pointer font-sans"
            value={filter.status}
            onChange={(e) => setFilter({...filter, status: e.target.value})}
          >
            <option className="bg-[#131313]" value="All">All Status</option>
            <option className="bg-[#131313]" value="Ready">Ready to Move In</option>
            <option className="bg-[#131313]" value="Off-Plan">Off-Plan</option>
          </select>
          
          <select 
            className="bg-transparent border-0 border-b border-primary/30 text-white py-2 focus:ring-0 cursor-pointer font-sans"
            value={filter.location}
            onChange={(e) => setFilter({...filter, location: e.target.value})}
          >
            <option className="bg-[#131313]" value="any">Any Location</option>
            <option className="bg-[#131313]" value="westlands">Westlands</option>
            <option className="bg-[#131313]" value="kilimani">Kilimani</option>
            <option className="bg-[#131313]" value="karen">Karen</option>
            <option className="bg-[#131313]" value="muthaiga">Muthaiga</option>
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
