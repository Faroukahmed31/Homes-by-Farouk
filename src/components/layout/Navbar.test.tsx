import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders the brand name logo alt text', () => {
    render(<Navbar />);
    expect(screen.getByAltText(/Homes by Farouk/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Properties/i).length).toBeGreaterThan(0);
  });

  it('renders the Enquire Now CTA', () => {
    render(<Navbar />);
    expect(screen.getAllByText(/Enquire Now/i).length).toBeGreaterThan(0);
  });
});
