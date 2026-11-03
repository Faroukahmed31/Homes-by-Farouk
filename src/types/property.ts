export type PropertyStatus = 'Ready' | 'Off-Plan' | 'Rental';

export type PropertyType = 'APARTMENT' | 'VILLA';
export type PropertyFilterType = 'ALL' | PropertyType;

export interface UnitType {
  type: string;
  size: number;
  status: 'Available' | 'Reserved' | 'Sold';
  price?: string;
  rentPrice?: string;
}

export interface Amenity {
  title: string;
  description: string;
  iconName: string;
}

export interface Property {
  slug: string;
  title: string;
  location: string;
  description: string;
  longDescription: string[];
  bedrooms: string;
  bathrooms: string;
  squareMeters: string;
  completionDate: string;
  status: PropertyStatus;
  purpose?: 'buy' | 'rent';
  startingPrice?: number;
  propertyType: PropertyType;
  listingType: 'SALE' | 'RENT' | 'BOTH';
  salePrice?: number | null;
  rentPrice?: number | null;
  heroImage: string;
  galleryImages: string[];
  units: UnitType[];
  amenities: Amenity[];
  locationFeatures: string[];
  mapImage: string;
  mapLink?: string;
  mapEmbedUrl?: string;
}
