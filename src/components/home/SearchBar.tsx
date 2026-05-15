'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchBar() {
  const router = useRouter();
  const [purpose, setPurpose] = useState('buy');
  const [status, setStatus] = useState('all');
  const [location, setLocation] = useState('any');

  // Automatically set status to 'ready' when purpose is 'rent'
  useEffect(() => {
    if (purpose === 'rent') {
      setStatus('ready');
    }
  }, [purpose]);

  const handleSearch = () => {
    // Navigate to properties page with query params
    const params = new URLSearchParams();
    if (purpose !== 'all') params.append('purpose', purpose);
    if (status !== 'all') params.append('status', status);
    if (location !== 'any') params.append('location', location);
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-24 px-6 md:px-20 max-w-[1200px] mx-auto mb-32">
      <div className="glass-panel gold-border p-8 flex flex-col md:flex-row gap-6 items-end">
        <div className="w-full md:w-1/4 flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Purpose</label>
          <Select value={purpose} onValueChange={setPurpose}>
            <SelectTrigger className="w-full border-0 border-b border-primary/50 rounded-none bg-transparent px-0 text-lg h-auto py-2 focus:ring-0">
              <SelectValue placeholder="Purpose" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/20">
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4 flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Property Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full border-0 border-b border-primary/50 rounded-none bg-transparent px-0 text-lg h-auto py-2 focus:ring-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/20">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="off-plan">Off-Plan</SelectItem>
              <SelectItem value="ready">Ready to Move In</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4 flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Location</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full border-0 border-b border-primary/50 rounded-none bg-transparent px-0 text-lg h-auto py-2 focus:ring-0">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/20">
              <SelectItem value="any">Any Location</SelectItem>
              <SelectItem value="westlands">Westlands</SelectItem>
              <SelectItem value="kilimani">Kilimani</SelectItem>
              <SelectItem value="karen">Karen</SelectItem>
              <SelectItem value="muthaiga">Muthaiga</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4">
          <button 
            onClick={handleSearch}
            className="w-full red-button py-4 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Search size={18} /> Search
          </button>
        </div>
      </div>
    </section>
  );
}
