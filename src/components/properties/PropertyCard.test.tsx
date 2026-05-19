import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PropertyCard } from './PropertyCard';
import { Property } from '@/types/property';

const mockProperty: Property = {
  slug: 'test-villa',
  title: 'Test Villa',
  location: 'Test Location',
  description: 'Test description',
  longDescription: ['Test description paragraphs'],
  bedrooms: '3',
  bathrooms: '3',
  squareMeters: '250',
  completionDate: 'Ready',
  status: 'Ready',
  purpose: 'buy',
  startingPrice: 10000000,
  heroImage: 'https://example.com/image.jpg',
  galleryImages: [],
  units: [],
  amenities: [],
  locationFeatures: [],
  mapImage: ''
};

describe('PropertyCard', () => {
  it('renders property title and location', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/Test Villa/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
  });

  it('formats the price with KES and commas', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/KES 10,000,000/i)).toBeInTheDocument();
  });

  it('shows the correct status badge', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/Ready/i)).toBeInTheDocument();
  });
});
