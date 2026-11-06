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

  it('filters properties by location', () => {
    render(<PropertyList initialProperties={properties} />);
    const locationSelect = screen.getByDisplayValue(/Any Location/i);
    
    fireEvent.change(locationSelect, { target: { value: 'westlands' } });
    
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBe(2);
    expect(screen.getByText(/Brookside One Residency/i)).toBeInTheDocument();
    expect(screen.getByText(/The Westlands Pinnacle/i)).toBeInTheDocument();

    // Test brookside filter
    fireEvent.change(locationSelect, { target: { value: 'brookside' } });
    const brooksideCards = screen.getAllByRole('heading', { level: 3 });
    expect(brooksideCards.length).toBe(1);
    expect(screen.getByText(/Brookside One Residency/i)).toBeInTheDocument();
  });

  it('filters properties when toggling between Apartments and Villas', () => {
    render(<PropertyList initialProperties={properties} />);

    // Click "Apartments" tab
    const apartmentsTab = screen.getByRole('tab', { name: /apartments/i });
    fireEvent.click(apartmentsTab);

    // 3 Apartments: Brookside One Residency, The Westlands Pinnacle, Muthaiga Grand Residences
    const apartmentCards = screen.getAllByRole('heading', { level: 3 });
    expect(apartmentCards.length).toBe(3);
    expect(screen.getByText(/Brookside One Residency/i)).toBeInTheDocument();
    expect(screen.getByText(/The Westlands Pinnacle/i)).toBeInTheDocument();
    expect(screen.getByText(/Muthaiga Grand Residences/i)).toBeInTheDocument();

    // Click "Villas" tab
    const villasTab = screen.getByRole('tab', { name: /villas/i });
    fireEvent.click(villasTab);

    // 2 Villas: Karen Enclave Estates, The Kilimani Sky Villas
    const villaCards = screen.getAllByRole('heading', { level: 3 });
    expect(villaCards.length).toBe(2);
    expect(screen.getByText(/Karen Enclave Estates/i)).toBeInTheDocument();
    expect(screen.getByText(/The Kilimani Sky Villas/i)).toBeInTheDocument();

    // Click "All Properties" tab
    const allTab = screen.getByRole('tab', { name: /all properties/i });
    fireEvent.click(allTab);

    const allCards = screen.getAllByRole('heading', { level: 3 });
    expect(allCards.length).toBe(5);
  });
});
