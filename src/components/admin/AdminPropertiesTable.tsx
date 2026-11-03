'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Property, PropertyFilterType } from '@/types/property';
import { DeletePropertyButton } from '@/components/admin/DeletePropertyButton';
import { Search, X, Pencil, ExternalLink, Filter, Building2, Home } from 'lucide-react';

interface AdminPropertiesTableProps {
  initialProperties: Property[];
}

export function AdminPropertiesTable({ initialProperties }: AdminPropertiesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PropertyFilterType>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedListingType, setSelectedListingType] = useState<string>('ALL');

  // Filter properties in real time
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      // 1. Text Search across Title, Location, and Slug
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        property.title.toLowerCase().includes(q) ||
        property.location.toLowerCase().includes(q) ||
        property.slug.toLowerCase().includes(q);

      // 2. Category Filter (Apartment vs Villa)
      const matchCategory =
        selectedCategory === 'ALL' || property.propertyType === selectedCategory;

      // 3. Status Filter (Ready vs Off-Plan)
      const matchStatus =
        selectedStatus === 'ALL' || property.status === selectedStatus;

      // 4. Listing Type Filter (SALE, RENT, BOTH)
      const matchListingType =
        selectedListingType === 'ALL' || property.listingType === selectedListingType;

      return matchSearch && matchCategory && matchStatus && matchListingType;
    });
  }, [initialProperties, searchQuery, selectedCategory, selectedStatus, selectedListingType]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    selectedListingType !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedListingType('ALL');
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="bg-[#1c1b1b] p-4 sm:p-6 gold-border flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, location, or slug..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#131313] border border-primary/25 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm font-sans transition-colors rounded-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Property Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as PropertyFilterType)}
            className="bg-[#131313] border border-primary/25 text-white text-xs py-2.5 px-3 focus:outline-none focus:border-primary cursor-pointer uppercase font-semibold tracking-wider"
          >
            <option value="ALL">All Categories</option>
            <option value="APARTMENT">Apartments</option>
            <option value="VILLA">Villas</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#131313] border border-primary/25 text-white text-xs py-2.5 px-3 focus:outline-none focus:border-primary cursor-pointer uppercase font-semibold tracking-wider"
          >
            <option value="ALL">All Statuses</option>
            <option value="Ready">Ready</option>
            <option value="Off-Plan">Off-Plan</option>
          </select>

          {/* Listing Type */}
          <select
            value={selectedListingType}
            onChange={(e) => setSelectedListingType(e.target.value)}
            className="bg-[#131313] border border-primary/25 text-white text-xs py-2.5 px-3 focus:outline-none focus:border-primary cursor-pointer uppercase font-semibold tracking-wider"
          >
            <option value="ALL">All Listings</option>
            <option value="SALE">For Sale</option>
            <option value="RENT">For Rent</option>
            <option value="BOTH">Sale & Rent</option>
          </select>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-primary hover:text-white uppercase font-bold tracking-widest px-3 py-2 border border-primary/40 hover:border-white transition-colors flex items-center gap-1.5"
            >
              <X size={14} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Result Metrics */}
      <div className="flex justify-between items-center px-1 text-xs text-muted-foreground">
        <div>
          Showing <span className="text-primary font-bold">{filteredProperties.length}</span> of{' '}
          <span className="text-white font-medium">{initialProperties.length}</span> properties
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase font-bold tracking-wider">
              Filtered
            </span>
          )}
        </div>
      </div>

      {/* Properties Table */}
      <div className="gold-border overflow-hidden bg-[#1c1b1b]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary/20 bg-primary/5">
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Property</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Location</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Category</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Price (KES)</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary">Listing Type</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-primary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-16 text-center text-muted-foreground">
                    <div className="max-w-md mx-auto space-y-3">
                      <p className="text-base text-white font-heading">No matching properties found</p>
                      <p className="text-xs text-muted-foreground font-sans">
                        {hasActiveFilters
                          ? 'Try adjusting your search query or clearing active filters.'
                          : 'No properties currently exist in the database.'}
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={resetFilters}
                          className="mt-2 text-xs uppercase tracking-widest font-bold px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all inline-block"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr
                    key={property.slug}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {/* Property info & thumbnail */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        {property.heroImage ? (
                          <img
                            src={property.heroImage}
                            alt={property.title}
                            className="w-16 h-10 object-cover border border-white/10 shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-10 bg-black/40 border border-white/10 flex items-center justify-center text-[10px] text-muted-foreground shrink-0">
                            No Img
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-sm text-white">{property.title}</p>
                          <p className="text-xs text-muted-foreground font-mono">{property.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="p-6 text-sm text-muted-foreground">{property.location}</td>

                    {/* Property Category Badge */}
                    <td className="p-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider border border-white/15 bg-white/5 text-gray-300">
                        {property.propertyType === 'VILLA' ? (
                          <>
                            <Home size={12} className="text-primary" />
                            Villa
                          </>
                        ) : (
                          <>
                            <Building2 size={12} className="text-primary" />
                            Apartment
                          </>
                        )}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-6 font-mono text-xs text-primary space-y-1">
                      {property.listingType === 'SALE' && (
                        <div>Sale: {property.salePrice ? property.salePrice.toLocaleString() : (property.startingPrice || 0).toLocaleString()}</div>
                      )}
                      {property.listingType === 'RENT' && (
                        <div>Rent: {property.rentPrice ? property.rentPrice.toLocaleString() : (property.startingPrice || 0).toLocaleString()}/mo</div>
                      )}
                      {property.listingType === 'BOTH' && (
                        <>
                          <div>Sale: {property.salePrice ? property.salePrice.toLocaleString() : (property.startingPrice || 0).toLocaleString()}</div>
                          <div className="text-muted-foreground text-[10px]">
                            Rent: {property.rentPrice ? property.rentPrice.toLocaleString() : '-'}/mo
                          </div>
                        </>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-6">
                      <span
                        className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded-sm ${
                          property.status === 'Ready'
                            ? 'bg-green-500/10 text-green-400 border-green-500/25'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>

                    {/* Listing Type */}
                    <td className="p-6 text-xs uppercase font-bold tracking-widest text-white/80">
                      {property.listingType}
                    </td>

                    {/* Actions */}
                    <td className="p-6 text-right">
                      <div className="flex justify-end items-center gap-3">
                        <Link
                          href={`/admin/properties/edit/${property.slug}`}
                          className="p-2 text-muted-foreground hover:text-white transition-colors"
                          title="Edit Property"
                        >
                          <Pencil size={16} />
                        </Link>

                        <Link
                          href={`/properties/${property.slug}`}
                          target="_blank"
                          className="p-2 text-muted-foreground hover:text-white transition-colors"
                          title="View Public Page"
                        >
                          <ExternalLink size={16} />
                        </Link>

                        <DeletePropertyButton slug={property.slug} title={property.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
