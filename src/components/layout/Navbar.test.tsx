import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />);
    expect(screen.getByText(/Homes by Farouk/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Properties/i)).toBeInTheDocument();
  });

  it('renders the Enquire Now CTA', () => {
    render(<Navbar />);
    expect(screen.getByText(/Enquire Now/i)).toBeInTheDocument();
  });
});
