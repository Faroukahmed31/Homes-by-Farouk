import React from 'react';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Waves, Dumbbell, Coffee, ShieldCheck, MapPin } from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
}

const iconMap: Record<string, any> = {
  Waves,
  Dumbbell,
  Coffee,
  ShieldCheck,
};

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="flex flex-col gap-20">
      {/* Description */}
      <section>
        <h2 className="text-3xl font-heading text-primary mb-8 border-b border-primary/20 pb-4 inline-block">
          The Monograph
        </h2>
        <div className="space-y-6 text-foreground/70 font-sans leading-relaxed text-lg max-w-2xl">
          {property.longDescription.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Prime Location */}
      <section>
        <h2 className="text-3xl font-heading text-primary mb-8 border-b border-primary/20 pb-4 inline-block">
          Prime Location
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {property.locationFeatures.map((feature, i) => (
            <li key={i} className="flex items-center gap-4 text-foreground/80 font-sans">
              <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(242,202,80,0.5)]"></span>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Available Units */}
      <section>
        <h2 className="text-3xl font-heading text-primary mb-8 border-b border-primary/20 pb-4 inline-block">
          Available Units
        </h2>
        <div className="border border-primary/20 bg-primary/5 backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-3 bg-primary/10 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
            <div>Unit Type</div>
            <div>Size (SqM)</div>
            <div className="text-right">Status</div>
          </div>
          {property.units.map((unit, i) => (
            <div key={i} className="grid grid-cols-3 px-6 py-5 border-t border-primary/10 font-sans text-sm hover:bg-primary/5 transition-colors group">
              <div className="text-foreground group-hover:text-primary transition-colors">{unit.type}</div>
              <div className="text-foreground/60">{unit.size}</div>
              <div className="text-right">
                <Badge variant="outline" className={`${
                  unit.status === 'Available' ? 'border-primary text-primary' : 'border-foreground/20 text-foreground/40'
                } rounded-none uppercase text-[10px] tracking-widest`}>
                  {unit.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle Amenities */}
      <section>
        <h2 className="text-3xl font-heading text-primary mb-8 border-b border-primary/20 pb-4 inline-block">
          Lifestyle Amenities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {property.amenities.map((amenity, i) => {
            const Icon = iconMap[amenity.iconName] || Waves;
            return (
              <div key={i} className="p-8 border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all duration-500 group">
                <Icon className="size-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-heading text-foreground mb-3">{amenity.title}</h3>
                <p className="text-sm text-foreground/60 font-sans leading-relaxed">{amenity.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Location Map */}
      <section>
        <h2 className="text-3xl font-heading text-primary mb-8 border-b border-primary/20 pb-4 inline-block">
          Location
        </h2>
        <div className="w-full h-[400px] border border-primary/20 relative overflow-hidden bg-primary/5">
          <iframe
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(95%)' 
            }}
            title={`${property.title} location map`}
            loading="lazy"
            allowFullScreen
            src={property.mapEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(property.mapLink || (property.title + ', ' + property.location))}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          />
        </div>
      </section>
    </div>
  );
}
