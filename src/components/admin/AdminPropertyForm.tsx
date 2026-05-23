'use client';

import React, { useState, useEffect } from 'react';
import { addPropertyAction } from '@/app/actions/properties';
import { Plus, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Property } from '@/types/property';

interface UnitInput {
  type: string;
  size: string;
  price: string;
  status: 'Available' | 'Reserved' | 'Sold';
}

interface AmenityInput {
  title: string;
  description: string;
  iconName: string;
}

export function AdminPropertyForm({ property }: { property?: Property }) {
  const [title, setTitle] = useState(property?.title || '');
  const [slug, setSlug] = useState(property?.slug || '');
  const [isPending, setIsPending] = useState(false);
  
  // Dynamic lists
  const [units, setUnits] = useState<UnitInput[]>(
    property?.units.map(u => ({
      type: u.type,
      size: String(u.size),
      price: u.price || '',
      status: u.status
    })) || [
      { type: '3 Bed Duplex', size: '280', price: '35000000', status: 'Available' }
    ]
  );
  
  const [amenities, setAmenities] = useState<AmenityInput[]>(
    property?.amenities || [
      { title: 'Infinity Pool', description: 'Heated rooftop pool', iconName: 'Waves' },
      { title: 'Fitness Gym', description: 'State-of-the-art wellness facility', iconName: 'Dumbbell' }
    ]
  );

  // Auto-generate slug from title
  useEffect(() => {
    if (property) return;
    const formattedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove special characters
      .replace(/[\s_-]+/g, '-') // swap spaces/underscores with dashes
      .replace(/^-+|-+$/g, ''); // trim dashes
    setSlug(formattedSlug);
  }, [title, property]);

  const addUnit = () => {
    setUnits([...units, { type: '', size: '', price: '', status: 'Available' }]);
  };

  const removeUnit = (index: number) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const updateUnit = (index: number, field: keyof UnitInput, value: string) => {
    const updated = [...units];
    updated[index] = { ...updated[index], [field]: value };
    setUnits(updated);
  };

  const addAmenity = () => {
    setAmenities([...amenities, { title: '', description: '', iconName: 'Waves' }]);
  };

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const updateAmenity = (index: number, field: keyof AmenityInput, value: string) => {
    const updated = [...amenities];
    updated[index] = { ...updated[index], [field]: value };
    setAmenities(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData();
      
      // Copy all non-file fields
      const originalFormData = new FormData(form);
      originalFormData.forEach((value, key) => {
        if (key === 'heroImageFile' || key === 'mapImageFile' || key === 'galleryImageFiles') {
          return;
        }
        formData.append(key, value);
      });

      // Append file fields only if they have actual files selected
      const heroImageFileInput = form.querySelector('input[name="heroImageFile"]') as HTMLInputElement;
      if (heroImageFileInput && heroImageFileInput.files && heroImageFileInput.files.length > 0) {
        formData.append('heroImageFile', heroImageFileInput.files[0]);
      }

      const mapImageFileInput = form.querySelector('input[name="mapImageFile"]') as HTMLInputElement;
      if (mapImageFileInput && mapImageFileInput.files && mapImageFileInput.files.length > 0) {
        formData.append('mapImageFile', mapImageFileInput.files[0]);
      }

      const galleryImageFileInput = form.querySelector('input[name="galleryImageFiles"]') as HTMLInputElement;
      if (galleryImageFileInput && galleryImageFileInput.files) {
        for (let i = 0; i < galleryImageFileInput.files.length; i++) {
          formData.append('galleryImageFiles', galleryImageFileInput.files[i]);
        }
      }
      
      // Inject processed JSON arrays
      const formattedUnits = units.map(u => ({
        type: u.type,
        size: Number(u.size) || 0,
        price: u.price || '',
        status: u.status
      }));
      formData.set('units', JSON.stringify(formattedUnits));
      formData.set('amenities', JSON.stringify(amenities));

      await addPropertyAction(formData);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Something went wrong');
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-12 max-w-4xl bg-[#1c1b1b] p-8 md:p-12 gold-border">
      
      <div className="flex items-center gap-4 border-b border-primary/20 pb-6 mb-6">
        <Link href="/admin/properties" className="text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-heading">{property ? 'Edit Premium Property' : 'Add Premium Property'}</h2>
          <p className="text-xs text-muted-foreground">{property ? 'Modify the listing details to update in the Neon database.' : 'Fill out the listing details to publish to the Neon database.'}</p>
        </div>
      </div>

      {/* Grid: Essential Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Property Title</label>
          <input 
            type="text" 
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
            placeholder="e.g. Westlands Pinnacle"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">URL Slug {property ? '(Read Only)' : '(Auto-generated)'}</label>
          <input 
            type="text" 
            name="slug"
            required
            readOnly={!!property}
            value={slug}
            onChange={(e) => !property && setSlug(e.target.value)}
            className={`w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors font-mono text-xs text-muted-foreground ${property ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder="slug-value"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Location Neighborhood</label>
          <input 
            type="text" 
            name="location"
            required
            defaultValue={property?.location}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
            placeholder="e.g. Westlands, Nairobi"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Starting Price (KES)</label>
          <input 
            type="number" 
            name="startingPrice"
            required
            defaultValue={property?.startingPrice}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
            placeholder="e.g. 35000000"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Listing Purpose</label>
          <select 
            name="purpose"
            required
            defaultValue={property?.purpose}
            className="w-full bg-[#131313] border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
          >
            <option value="buy">For Sale (Buy)</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Status Type</label>
          <select 
            name="status"
            required
            defaultValue={property?.status}
            className="w-full bg-[#131313] border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
          >
            <option value="Off-Plan">Off-Plan</option>
            <option value="Ready">Ready</option>
            <option value="Rental">Rental</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Bedrooms Range/Count</label>
          <input 
            type="text" 
            name="bedrooms"
            required
            defaultValue={property?.bedrooms}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
            placeholder="e.g. 3 - 4 or 3"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Bathrooms Range/Count</label>
          <input 
            type="text" 
            name="bathrooms"
            required
            defaultValue={property?.bathrooms}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
            placeholder="e.g. 3.5 - 4.5 or 4"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Square Meters Range</label>
          <input 
            type="text" 
            name="squareMeters"
            required
            defaultValue={property?.squareMeters}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
            placeholder="e.g. 250 - 380"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Completion / Timeline Date</label>
          <input 
            type="text" 
            name="completionDate"
            required
            defaultValue={property?.completionDate}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
            placeholder="e.g. Q4 2026 or Ready"
          />
        </div>
      </div>

      {/* Narrative Section */}
      <div>
        <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Short Summary Description</label>
        <input 
          type="text" 
          name="description"
          required
          defaultValue={property?.description}
          className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors"
          placeholder="Brief one-liner marketing description..."
        />
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Long Narrative Description (One paragraph per line)</label>
        <textarea 
          name="longDescription"
          required
          rows={4}
          defaultValue={property?.longDescription.join('\n')}
          className="w-full bg-[#131313] border border-primary/30 p-3 focus:border-primary outline-none transition-colors resize-y text-sm"
          placeholder="First detailed paragraph describing design.&#10;Second paragraph describing space/location."
        />
      </div>

      {/* Media Assets & Map Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-primary/10 pt-8">
        <div className="space-y-3">
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary">Hero Header Image</label>
          <div className="bg-[#131313] p-4 border border-white/5 space-y-3">
            <div>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest block mb-1">Upload from computer:</span>
              <input 
                type="file" 
                name="heroImageFile"
                accept="image/*"
                className="block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-primary/40 file:bg-transparent file:text-primary file:text-xs file:font-bold hover:file:bg-primary hover:file:text-black file:transition-all cursor-pointer outline-none"
              />
            </div>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-[9px] text-muted-foreground uppercase tracking-widest">Or URL</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>
            <div>
              <input 
                type="text" 
                name="heroImage"
                defaultValue={property?.heroImage}
                className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors text-xs font-mono text-foreground"
                placeholder="https://example.com/hero.jpg"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary">Map Layout Image (Optional)</label>
          <div className="bg-[#131313] p-4 border border-white/5 space-y-3">
            <div>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest block mb-1">Upload from computer:</span>
              <input 
                type="file" 
                name="mapImageFile"
                accept="image/*"
                className="block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-primary/40 file:bg-transparent file:text-primary file:text-xs file:font-bold hover:file:bg-primary hover:file:text-black file:transition-all cursor-pointer outline-none"
              />
            </div>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-[9px] text-muted-foreground uppercase tracking-widest">Or URL</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>
            <div>
              <input 
                type="text" 
                name="mapImage"
                defaultValue={property?.mapImage}
                className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors text-xs font-mono text-foreground"
                placeholder="https://example.com/map.jpg"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Google Maps Location / Query (Optional)</label>
          <input 
            type="text" 
            name="mapLink"
            defaultValue={property?.mapLink}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors text-xs"
            placeholder="e.g. Westlands Road, Nairobi or -1.2612, 36.8012"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Google Maps Share / Place URL / Embed Iframe (Optional)</label>
          <input 
            type="text" 
            name="mapEmbedUrl"
            defaultValue={property?.mapEmbedUrl}
            className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none transition-colors text-xs"
            placeholder="Paste share link, place URL (google.com/maps/place/...), or <iframe> code"
          />
        </div>
      </div>

      <div className="border-t border-primary/10 pt-8 space-y-3">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-primary">Gallery Slide Images</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#131313] p-4 border border-white/5">
          <div className="space-y-2">
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest block">Upload files from computer:</span>
            <input 
              type="file" 
              name="galleryImageFiles"
              accept="image/*"
              multiple
              className="block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-primary/40 file:bg-transparent file:text-primary file:text-xs file:font-bold hover:file:bg-primary hover:file:text-black file:transition-all cursor-pointer outline-none"
            />
            <span className="text-[9px] text-muted-foreground/60 italic block">You can select multiple files at once.</span>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest block">Or enter URLs (One URL per line):</span>
            <textarea 
              name="galleryImages"
              rows={3}
              defaultValue={property?.galleryImages.join('\n')}
              className="w-full bg-transparent border border-white/10 p-3 focus:border-primary outline-none transition-colors resize-y text-xs font-mono text-foreground"
              placeholder="https://example.com/slide1.jpg&#10;https://example.com/slide2.jpg"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Unit Options Builder */}
      <div className="border-t border-primary/10 pt-8">
        <div className="flex justify-between items-center mb-4">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary">Available Unit Types</label>
          <button 
            type="button" 
            onClick={addUnit}
            className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold border border-primary/45 px-3 py-1.5 hover:bg-primary/10 transition-colors"
          >
            <Plus size={10} /> Add Unit Option
          </button>
        </div>
        
        <div className="space-y-4">
          {units.map((unit, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end bg-[#131313] p-4 border border-white/5">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">Unit Type/Label</span>
                <input 
                  type="text" 
                  value={unit.type}
                  required
                  onChange={(e) => updateUnit(index, 'type', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-1 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="3 Bed Penthouse"
                />
              </div>
              
              <div>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">Size (Sqm)</span>
                <input 
                  type="number" 
                  value={unit.size}
                  required
                  onChange={(e) => updateUnit(index, 'size', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-1 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="280"
                />
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">Price (KES or Text)</span>
                <input 
                  type="text" 
                  value={unit.price}
                  onChange={(e) => updateUnit(index, 'price', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-1 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="e.g. 35000000 or Contact"
                />
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">Status</span>
                <select 
                  value={unit.status}
                  onChange={(e) => updateUnit(index, 'status', e.target.value as any)}
                  className="w-full bg-[#1c1b1b] border-b border-white/20 py-1 text-sm focus:border-primary outline-none transition-colors"
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => removeUnit(index)}
                  disabled={units.length === 1}
                  className="p-2 text-muted-foreground hover:text-red-400 transition-colors disabled:opacity-30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Amenities Builder */}
      <div className="border-t border-primary/10 pt-8">
        <div className="flex justify-between items-center mb-4">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary">Lifestyle Amenities</label>
          <button 
            type="button" 
            onClick={addAmenity}
            className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold border border-primary/45 px-3 py-1.5 hover:bg-primary/10 transition-colors"
          >
            <Plus size={10} /> Add Amenity
          </button>
        </div>

        <div className="space-y-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-[#131313] p-4 border border-white/5">
              <div className="sm:col-span-1">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">Amenity Title</span>
                <input 
                  type="text" 
                  value={amenity.title}
                  required
                  onChange={(e) => updateAmenity(index, 'title', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-1 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="Sky Lounge"
                />
              </div>

              <div className="sm:col-span-2">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">Description</span>
                <input 
                  type="text" 
                  value={amenity.description}
                  required
                  onChange={(e) => updateAmenity(index, 'description', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-1 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="Description details..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 block">Icon Style</span>
                    <select 
                      value={amenity.iconName}
                      onChange={(e) => updateAmenity(index, 'iconName', e.target.value)}
                      className="w-full bg-[#1c1b1b] border-b border-white/20 py-1 text-sm focus:border-primary outline-none transition-colors"
                    >
                      <option value="Waves">Waves (Pool)</option>
                      <option value="Dumbbell">Dumbbell (Gym)</option>
                      <option value="ShieldCheck">ShieldCheck (Security)</option>
                      <option value="Coffee">Coffee (Cafe / Lounge)</option>
                      <option value="Trees">Trees (Garden / Greenery)</option>
                      <option value="Sparkles">Sparkles (Luxury Feature)</option>
                      <option value="Activity">Activity (Tennis / Sports Court)</option>
                      <option value="Flame">Flame (BBQ Area / Fire Pit)</option>
                      <option value="Presentation">Presentation (Conference Room)</option>
                      <option value="Droplet">Droplet (Borehole / Water Supply)</option>
                      <option value="Zap">Zap (Backup Generator / Power)</option>
                      <option value="Baby">Baby (Children Play Area)</option>
                      <option value="Utensils">Utensils (Restaurant / Dining)</option>
                      <option value="Thermometer">Thermometer (Sauna / Steam Room)</option>
                      <option value="Bath">Bath (Sauna / Spa)</option>
                      <option value="Car">Car (Parking / Garages)</option>
                      <option value="Gamepad2">Gamepad2 (Gaming Lounge)</option>
                      <option value="ConciergeBell">ConciergeBell (Arrival Concierge)</option>
                    </select>
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => removeAmenity(index)}
                    disabled={amenities.length === 1}
                    className="p-2 mt-4 text-muted-foreground hover:text-red-400 transition-colors disabled:opacity-30"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Highlights Bullet points */}
      <div className="border-t border-primary/10 pt-8">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Location Highlights (One highlight per line)</label>
        <textarea 
          name="locationFeatures"
          required
          rows={3}
          defaultValue={property?.locationFeatures.join('\n')}
          className="w-full bg-[#131313] border border-primary/30 p-3 focus:border-primary outline-none transition-colors resize-y text-sm"
          placeholder="Near high-end shopping malls&#10;5 minutes from embassies&#10;Controlled diplomatic residential zone"
        />
      </div>

      {/* Submit Button */}
      <div className="border-t border-primary/20 pt-8 flex justify-end">
        <button 
          type="submit" 
          disabled={isPending}
          className="red-button py-4 px-12 font-bold text-sm tracking-widest flex items-center gap-3 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              {property ? 'UPDATING...' : 'PUBLISHING...'}
            </>
          ) : (
            property ? 'UPDATE PROPERTY' : 'PUBLISH PROPERTY'
          )}
        </button>
      </div>

    </form>
  );
}
