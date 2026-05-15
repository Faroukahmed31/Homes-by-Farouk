import React from 'react';
import { Bed, Bath, Square, Calendar } from 'lucide-react';
import { Property } from '@/types/property';
import { Separator } from '@/components/ui/separator';

interface PropertyStatsProps {
  property: Property;
}

export function PropertyStats({ property }: PropertyStatsProps) {
  const stats = [
    { label: 'Bedrooms', value: property.bedrooms, icon: Bed },
    { label: 'Bathrooms', value: property.bathrooms, icon: Bath },
    { label: 'Square Meters', value: property.squareMeters, icon: Square },
    { label: 'Completion', value: property.completionDate, icon: Calendar },
  ];

  return (
    <section className="px-6 md:px-20 py-10 border-b border-primary/20 flex flex-wrap gap-8 items-center justify-between md:justify-start">
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full border border-primary/20 flex items-center justify-center text-primary bg-primary/5">
              <stat.icon className="size-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-sans font-bold">
                {stat.label}
              </p>
              <p className="text-xl font-heading text-foreground">
                {stat.value}
              </p>
            </div>
          </div>
          {index < stats.length - 1 && (
            <Separator orientation="vertical" className="hidden md:block h-12 bg-primary/20" />
          )}
        </React.Fragment>
      ))}
    </section>
  );
}
