export type PropertyStatus = 'Ready' | 'Off-Plan' | 'Rental';

export interface UnitType {
  type: string;
  size: number;
  status: 'Available' | 'Reserved' | 'Sold';
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
  startingPrice: number;
  heroImage: string;
  galleryImages: string[];
  units: UnitType[];
  amenities: Amenity[];
  locationFeatures: string[];
  mapImage: string;
}
