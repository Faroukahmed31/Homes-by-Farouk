'use client';

import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { Property } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { captureLead } from '@/app/actions/leads';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isOffPlan = property.status.includes('Off-Plan');

  const handleGatedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('guideType', `pricing-${property.id}`);
    await captureLead(formData);
    setLoading(false);
    setSuccess(true);
  };
  
  return (
    <div className="relative group h-[500px] overflow-hidden gold-border" data-testid="property-card">
      <img 
        alt={property.title} 
        src={property.imageUrl} 
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
      <div className="absolute bottom-0 w-full glass-panel p-6 gold-border-bottom border-t border-white/10">
        <h3 className="text-2xl font-heading text-white mb-2">{property.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{property.location}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">Starting From</p>
            <p className="text-lg text-primary font-bold">
              KES {property.price.toLocaleString()}
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger>
              <div className="text-primary hover:text-white transition-colors flex items-center gap-2 group/btn cursor-pointer">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity">
                  {isOffPlan ? 'Get Pricing' : 'View Details'}
                </span>
                <ArrowRight size={32} strokeWidth={1} />
              </div>
            </DialogTrigger>
            <DialogContent className="bg-[#131313] border-primary/20 text-white sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-primary">
                  {isOffPlan ? 'Unlock Payment Plan' : 'Property Details'}
                </DialogTitle>
              </DialogHeader>
              
              {success ? (
                <div className="py-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
                    <ArrowRight size={24} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Details Sent!</h4>
                  <p className="text-sm text-muted-foreground">The full breakdown and brochures for {property.title} have been sent to your email.</p>
                </div>
              ) : (
                <div className="py-6">
                  <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 mb-6">
                    <Lock className="text-primary" size={20} />
                    <p className="text-xs text-muted-foreground">Enter your details to receive the full brochure and flexible payment options.</p>
                  </div>
                  <form onSubmit={handleGatedSubmit} className="space-y-4">
                    <input 
                      name="name"
                      required
                      placeholder="Full Name" 
                      className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
                    />
                    <input 
                      name="email"
                      required
                      type="email"
                      placeholder="Email Address" 
                      className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
                    />
                    <button 
                      disabled={loading}
                      className="w-full red-button py-4 mt-4 disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Access Now'}
                    </button>
                  </form>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
