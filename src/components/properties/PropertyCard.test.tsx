import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PropertyCard } from './PropertyCard';
import { Property } from '@/lib/data';

const mockProperty: Property = {
  id: 'test-id',
  title: 'Test Villa',
  location: 'Test Location',
  price: 10000000,
  status: 'Ready to Move In',
  type: 'Buy',
  category: 'Villa',
  imageUrl: 'https://example.com/image.jpg',
  description: 'Test description'
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
    expect(screen.getByText(/Ready to Move In/i)).toBeInTheDocument();
  });
});
