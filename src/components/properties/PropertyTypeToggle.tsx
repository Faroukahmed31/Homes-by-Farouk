'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, LayoutGrid } from 'lucide-react';
import { PropertyFilterType } from '@/types/property';

export interface PropertyTypeToggleProps {
  value: PropertyFilterType;
  onChange: (value: PropertyFilterType) => void;
  counts?: Partial<Record<PropertyFilterType, number>>;
  className?: string;
  showAllOption?: boolean;
}

interface OptionConfig {
  id: PropertyFilterType;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

export function PropertyTypeToggle({
  value,
  onChange,
  counts,
  className = '',
  showAllOption = true,
}: PropertyTypeToggleProps) {
  const options: OptionConfig[] = [
    ...(showAllOption
      ? [
          {
            id: 'ALL' as PropertyFilterType,
            label: 'All Properties',
            icon: LayoutGrid,
          },
        ]
      : []),
    {
      id: 'APARTMENT' as PropertyFilterType,
      label: 'Apartments',
      icon: Building2,
    },
    {
      id: 'VILLA' as PropertyFilterType,
      label: 'Villas',
      icon: Home,
    },
  ];

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Label / Subtitle */}
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-white/70">
          Residence Collection
        </span>
      </div>

      {/* Pill Toggle Switch */}
      <div
        role="tablist"
        aria-label="Filter by property type"
        className="relative inline-flex p-1.5 rounded-full bg-[#0A1015]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ring-1 ring-white/5"
      >
        {options.map((option) => {
          const isActive = value === option.id;
          const count = counts?.[option.id];
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(option.id)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive ? 'text-[#0A1015]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* High-end Metallic Gold Sliding Indicator */}
              {isActive && (
                <motion.div
                  layoutId="propertyTypeIndicator"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F2CA50] to-[#C59B27] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}

              {/* Content sits above sliding background */}
              <span className="relative z-10 flex items-center gap-2 font-medium">
                <Icon size={14} className={isActive ? 'text-[#0A1015]' : 'text-gray-400'} />
                <span>{option.label}</span>
                {typeof count === 'number' && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                      isActive
                        ? 'bg-black/20 text-[#0A1015]'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
