import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PropertyList } from './PropertyList';
import { properties } from '@/data/properties';

describe('PropertyList', () => {
  it('renders all initial properties', () => {
    render(<PropertyList initialProperties={properties} />);
    // Initial data has 5 properties
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBe(5);
  });

  it('filters properties by search term', () => {
    render(<PropertyList initialProperties={properties} />);
    const searchInput = screen.getByPlaceholderText(/Search by name or location/i);
    
    fireEvent.change(searchInput, { target: { value: 'Karen' } });
    
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBe(1);
    expect(screen.getByText(/Karen Enclave Estates/i)).toBeInTheDocument();
  });

  it('filters properties by status', () => {
    render(<PropertyList initialProperties={properties} />);
    const statusSelect = screen.getByDisplayValue(/All Status/i);
    
    fireEvent.change(statusSelect, { target: { value: 'Off-Plan' } });
    
    const cards = screen.getAllByRole('heading', { level: 3 });
    // Dataset has 3 off-plan properties (Brookside, Karen, Muthaiga)
    expect(cards.length).toBe(3);
  });
});
