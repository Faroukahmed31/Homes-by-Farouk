import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders search labels', () => {
    render(<SearchBar />);
    expect(screen.getByText(/Purpose/i)).toBeInTheDocument();
    expect(screen.getByText(/Property Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
  });

  it('renders the search button', () => {
    render(<SearchBar />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
