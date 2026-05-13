import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PropertyList } from './PropertyList';

describe('PropertyList', () => {
  it('renders all initial properties', () => {
    render(<PropertyList />);
    // Initial data has 4 properties
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBe(4);
  });

  it('filters properties by search term', () => {
    render(<PropertyList />);
    const searchInput = screen.getByPlaceholderText(/Search by name or location/i);
    
    fireEvent.change(searchInput, { target: { value: 'Karen' } });
    
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBe(1);
    expect(screen.getByText(/Karen Enclave Estates/i)).toBeInTheDocument();
  });

  it('filters properties by status', () => {
    render(<PropertyList />);
    const statusSelect = screen.getByDisplayValue(/All Status/i);
    
    fireEvent.change(statusSelect, { target: { value: 'Off-Plan' } });
    
    const cards = screen.getAllByRole('heading', { level: 3 });
    // Initial data has 2 off-plan properties
    expect(cards.length).toBe(2);
  });
});
