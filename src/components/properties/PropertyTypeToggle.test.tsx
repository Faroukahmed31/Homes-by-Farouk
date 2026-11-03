import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PropertyTypeToggle } from './PropertyTypeToggle';

describe('PropertyTypeToggle', () => {
  it('renders all options with counts', () => {
    const handleChange = vi.fn();
    render(
      <PropertyTypeToggle
        value="ALL"
        onChange={handleChange}
        counts={{ ALL: 5, APARTMENT: 3, VILLA: 2 }}
        showAllOption={true}
      />
    );

    expect(screen.getByRole('tab', { name: /all properties/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /apartments/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /villas/i })).toBeInTheDocument();

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('indicates active state with aria-selected', () => {
    const handleChange = vi.fn();
    render(
      <PropertyTypeToggle
        value="APARTMENT"
        onChange={handleChange}
      />
    );

    const apartmentTab = screen.getByRole('tab', { name: /apartments/i });
    const villaTab = screen.getByRole('tab', { name: /villas/i });

    expect(apartmentTab).toHaveAttribute('aria-selected', 'true');
    expect(villaTab).toHaveAttribute('aria-selected', 'false');
  });

  it('triggers onChange callback when clicking an option', () => {
    const handleChange = vi.fn();
    render(
      <PropertyTypeToggle
        value="ALL"
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByRole('tab', { name: /villas/i }));
    expect(handleChange).toHaveBeenCalledWith('VILLA');

    fireEvent.click(screen.getByRole('tab', { name: /apartments/i }));
    expect(handleChange).toHaveBeenCalledWith('APARTMENT');
  });

  it('renders only Apartments and Villas when showAllOption is false', () => {
    const handleChange = vi.fn();
    render(
      <PropertyTypeToggle
        value="APARTMENT"
        onChange={handleChange}
        showAllOption={false}
      />
    );

    expect(screen.queryByRole('tab', { name: /all properties/i })).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /apartments/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /villas/i })).toBeInTheDocument();
  });
});
