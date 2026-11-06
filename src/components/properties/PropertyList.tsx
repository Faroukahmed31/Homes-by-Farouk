'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertyTypeToggle } from '@/components/properties/PropertyTypeToggle';
import { LuxuryPagination } from '@/components/ui/LuxuryPagination';
import { Property, PropertyFilterType } from '@/types/property';
import { Search } from 'lucide-react';

interface PropertyListProps {
  initialProperties: Property[];
}

export function PropertyList({ initialProperties }: PropertyListProps) {
  const searchParams = useSearchParams();
  const [propertiesList, setPropertiesList] = useState<Property[]>(initialProperties);
  
  const [filter, setFilter] = useState({
    status: 'All',
    search: '',
    location: 'any',
    purpose: 'all' as 'all' | 'buy' | 'rent',
    propertyType: 'ALL' as PropertyFilterType,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync state if initialProperties changes on the server
  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      setPropertiesList(initialProperties);
    }
  }, [initialProperties]);

  // Initialize filters from URL parameters
  useEffect(() => {
    const statusParam = searchParams.get('status');
    const locationParam = searchParams.get('location') || searchParams.get('neighborhood');
    const purposeParam = searchParams.get('purpose');
    const typeParam = searchParams.get('type') || searchParams.get('propertyType');
    
    let parsedType: PropertyFilterType = 'ALL';
    if (typeParam) {
      const lower = typeParam.toLowerCase();
      if (lower.startsWith('apartment')) parsedType = 'APARTMENT';
      else if (lower.startsWith('villa')) parsedType = 'VILLA';
    }

    setFilter(prev => ({
      ...prev,
      status: statusParam === 'ready' ? 'Ready' : statusParam === 'off-plan' ? 'Off-Plan' : 'All',
      location: locationParam ? locationParam.toLowerCase() : 'any',
      purpose: (purposeParam as 'all' | 'buy' | 'rent') || 'all',
      propertyType: parsedType,
    }));
  }, [searchParams]);

  // Sync purpose and status: Rent always shows Ready units
  useEffect(() => {
    if (filter.purpose === 'rent') {
      setFilter(prev => ({ ...prev, status: 'Ready' }));
    }
  }, [filter.purpose]);

  // Dynamic counts for each property type based on search/status/location
  const typeCounts = useMemo(() => {
    const baseMatches = propertiesList.filter(p => {
      const matchStatus = filter.status === 'All' || p.status === filter.status;
      const matchSearch = p.title.toLowerCase().includes(filter.search.toLowerCase()) || 
                          p.location.toLowerCase().includes(filter.search.toLowerCase());
      const matchLocation = filter.location === 'any' || 
                            p.location.toLowerCase().includes(filter.location.toLowerCase());
      const matchPurpose = filter.purpose === 'all'
        ? true
        : filter.purpose === 'buy'
          ? (p.listingType === 'SALE' || p.listingType === 'BOTH')
          : (p.listingType === 'RENT' || p.listingType === 'BOTH');
      return matchStatus && matchSearch && matchLocation && matchPurpose;
    });

    return {
      ALL: baseMatches.length,
      APARTMENT: baseMatches.filter(p => p.propertyType === 'APARTMENT').length,
      VILLA: baseMatches.filter(p => p.propertyType === 'VILLA').length,
    };
  }, [filter.search, filter.location, filter.purpose, filter.status, propertiesList]);

  const filteredProperties = useMemo(() => {
    return propertiesList.filter(p => {
      // Property Type Match
      const matchType = filter.propertyType === 'ALL' || p.propertyType === filter.propertyType;

      // Status Match
      const matchStatus = filter.status === 'All' || p.status === filter.status;
      
      // Search Match
      const matchSearch = p.title.toLowerCase().includes(filter.search.toLowerCase()) || 
                          p.location.toLowerCase().includes(filter.search.toLowerCase());
      
      // Location Match
      const matchLocation = filter.location === 'any' || 
                            p.location.toLowerCase().includes(filter.location.toLowerCase()) ||
                            p.title.toLowerCase().includes(filter.location.toLowerCase());

      // Purpose Match
      const matchPurpose = filter.purpose === 'all'
        ? true
        : filter.purpose === 'buy'
          ? (p.listingType === 'SALE' || p.listingType === 'BOTH')
          : (p.listingType === 'RENT' || p.listingType === 'BOTH');
      
      return matchType && matchStatus && matchSearch && matchLocation && matchPurpose;
    });
  }, [filter, propertiesList]);

  // Reset pagination to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / itemsPerPage));

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  return (
    <div className="w-full">
      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 glass-panel p-6 gold-border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-transparent border-0 border-b border-primary/30 text-white placeholder:text-muted-foreground focus:ring-0 focus:border-primary transition-colors font-sans"
            placeholder="Search by name or location..."
            value={filter.search}
            onChange={(e) => setFilter({...filter, search: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-2/3">
          <select 
            className="bg-transparent border-0 border-b border-primary/30 text-white py-2 focus:ring-0 cursor-pointer font-sans w-full"
            value={filter.purpose}
            onChange={(e) => setFilter({...filter, purpose: e.target.value as 'all' | 'buy' | 'rent'})}
          >
            <option className="bg-[#131313]" value="all">All Purposes</option>
            <option className="bg-[#131313]" value="buy">For Sale</option>
            <option className="bg-[#131313]" value="rent">To Rent</option>
          </select>

          <select 
            className="bg-transparent border-0 border-b border-primary/30 text-white py-2 focus:ring-0 cursor-pointer font-sans w-full"
            value={filter.status}
            onChange={(e) => setFilter({...filter, status: e.target.value})}
          >
            <option className="bg-[#131313]" value="All">All Status</option>
            <option className="bg-[#131313]" value="Ready">Ready to Move In</option>
            <option className="bg-[#131313]" value="Off-Plan">Off-Plan</option>
          </select>
          
          <select 
            className="bg-transparent border-0 border-b border-primary/30 text-white py-2 focus:ring-0 cursor-pointer font-sans w-full"
            value={filter.location}
            onChange={(e) => setFilter({...filter, location: e.target.value})}
          >
            <option className="bg-[#131313]" value="any">Any Location</option>
            <option className="bg-[#131313]" value="westlands">Westlands</option>
            <option className="bg-[#131313]" value="kileleshwa">Kileleshwa</option>
            <option className="bg-[#131313]" value="kilimani">Kilimani</option>
            <option className="bg-[#131313]" value="syokimau">Syokimau</option>
            <option className="bg-[#131313]" value="riverside">Riverside</option>
            <option className="bg-[#131313]" value="brookside">Brookside</option>
          </select>
        </div>
      </div>

      {/* Pill Toggle Switch: Apartments vs Villas (Above Property Grid) */}
      <div className="mb-8">
        <PropertyTypeToggle
          value={filter.propertyType}
          onChange={(newType) => setFilter(prev => ({ ...prev, propertyType: newType }))}
          counts={typeCounts}
          showAllOption={true}
        />
      </div>

      {/* Results Grid with Smooth Transitions */}
      {filteredProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 transition-all duration-300">
            {paginatedProperties.map((property) => (
              <div key={property.slug} className="transition-opacity duration-300">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* Luxury Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <LuxuryPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 glass-panel gold-border">
          <h3 className="text-xl text-primary font-heading mb-2">No matching properties found</h3>
          <p className="text-muted-foreground text-sm font-sans">
            Try switching property types or adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
}

