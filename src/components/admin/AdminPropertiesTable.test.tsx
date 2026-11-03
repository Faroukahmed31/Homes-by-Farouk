import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AdminPropertiesTable } from './AdminPropertiesTable';
import { Property } from '@/types/property';

const mockProperties: Property[] = [
  {
    slug: 'brookside-residency',
    title: 'Brookside Residency',
    location: 'Westlands, Nairobi',
    description: 'Luxury apartments in Westlands',
    longDescription: [],
    bedrooms: '3',
    bathrooms: '3',
    squareMeters: '250',
    completionDate: '2025',
    status: 'Off-Plan',
    purpose: 'buy',
    startingPrice: 35000000,
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    salePrice: 35000000,
    rentPrice: null,
    heroImage: '/images/brookside.jpg',
    galleryImages: [],
    units: [],
    amenities: [],
    locationFeatures: [],
    mapImage: ''
  },
  {
    slug: 'karen-villa',
    title: 'Karen Enclave Villa',
    location: 'Karen, Nairobi',
    description: 'Exclusive villa in Karen',
    longDescription: [],
    bedrooms: '5',
    bathrooms: '5',
    squareMeters: '500',
    completionDate: 'Ready',
    status: 'Ready',
    purpose: 'buy',
    startingPrice: 85000000,
    propertyType: 'VILLA',
    listingType: 'SALE',
    salePrice: 85000000,
    rentPrice: null,
    heroImage: '/images/karen.jpg',
    galleryImages: [],
    units: [],
    amenities: [],
    locationFeatures: [],
    mapImage: ''
  }
];

describe('AdminPropertiesTable', () => {
  it('renders all initial properties in the table', () => {
    render(<AdminPropertiesTable initialProperties={mockProperties} />);
    expect(screen.getByText('Brookside Residency')).toBeInTheDocument();
    expect(screen.getByText('Karen Enclave Villa')).toBeInTheDocument();
    expect(screen.getByText(/Showing/)).toHaveTextContent('Showing 2 of 2 properties');
  });

  it('filters properties in real time by title search', () => {
    render(<AdminPropertiesTable initialProperties={mockProperties} />);
    const searchInput = screen.getByPlaceholderText(/Search by title, location, or slug/i);

    fireEvent.change(searchInput, { target: { value: 'Karen' } });

    expect(screen.queryByText('Brookside Residency')).not.toBeInTheDocument();
    expect(screen.getByText('Karen Enclave Villa')).toBeInTheDocument();
    expect(screen.getByText(/Showing/)).toHaveTextContent('Showing 1 of 2 properties');
  });

  it('filters properties by slug search', () => {
    render(<AdminPropertiesTable initialProperties={mockProperties} />);
    const searchInput = screen.getByPlaceholderText(/Search by title, location, or slug/i);

    fireEvent.change(searchInput, { target: { value: 'brookside-residency' } });

    expect(screen.getByText('Brookside Residency')).toBeInTheDocument();
    expect(screen.queryByText('Karen Enclave Villa')).not.toBeInTheDocument();
  });

  it('filters properties by category dropdown', () => {
    render(<AdminPropertiesTable initialProperties={mockProperties} />);
    const categorySelect = screen.getByDisplayValue('All Categories');

    fireEvent.change(categorySelect, { target: { value: 'VILLA' } });

    expect(screen.queryByText('Brookside Residency')).not.toBeInTheDocument();
    expect(screen.getByText('Karen Enclave Villa')).toBeInTheDocument();
  });

  it('displays empty state and resets filters properly', () => {
    render(<AdminPropertiesTable initialProperties={mockProperties} />);
    const searchInput = screen.getByPlaceholderText(/Search by title, location, or slug/i);

    fireEvent.change(searchInput, { target: { value: 'Nonexistent Place' } });

    expect(screen.getByText(/No matching properties found/i)).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /Clear All Filters/i });
    fireEvent.click(resetButton);

    expect(screen.getByText('Brookside Residency')).toBeInTheDocument();
    expect(screen.getByText('Karen Enclave Villa')).toBeInTheDocument();
  });
});
