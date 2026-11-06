import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LuxuryPagination } from './LuxuryPagination';

describe('LuxuryPagination', () => {
  it('renders Previous, numbered links 1 to 4, and Next buttons', () => {
    render(<LuxuryPagination currentPage={1} totalPages={4} />);

    expect(screen.getByRole('navigation', { name: /pagination navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 4' })).toBeInTheDocument();
  });

  it('marks active page with aria-current="page" and solid gold style', () => {
    render(<LuxuryPagination currentPage={2} totalPages={4} />);

    const page2 = screen.getByRole('button', { name: 'Page 2' });
    const page1 = screen.getByRole('button', { name: 'Page 1' });

    expect(page2).toHaveAttribute('aria-current', 'page');
    expect(page2.className).toContain('bg-gradient-to-b');
    expect(page2.className).toContain('text-[#0A1015]');

    expect(page1).not.toHaveAttribute('aria-current');
    expect(page1.className).toContain('border-[#D4AF37]');
  });

  it('disables Previous button on first page and enables Next', () => {
    render(<LuxuryPagination currentPage={1} totalPages={4} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('disables Next button on last page and enables Previous', () => {
    render(<LuxuryPagination currentPage={4} totalPages={4} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('fires onPageChange callback when clicking numbered page and navigation buttons', () => {
    const handlePageChange = vi.fn();
    render(<LuxuryPagination currentPage={2} totalPages={4} onPageChange={handlePageChange} />);

    // Click page 3
    fireEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    expect(handlePageChange).toHaveBeenCalledWith(3);

    // Click Next (should go to 3)
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(handlePageChange).toHaveBeenCalledWith(3);

    // Click Previous (should go to 1)
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it('renders anchor tags when getPageHref is provided', () => {
    render(
      <LuxuryPagination
        currentPage={2}
        totalPages={4}
        getPageHref={(page) => `/properties?page=${page}`}
      />
    );

    const prevLink = screen.getByRole('link', { name: /previous/i });
    const nextLink = screen.getByRole('link', { name: /next/i });
    const page1Link = screen.getByRole('link', { name: 'Page 1' });

    expect(prevLink).toHaveAttribute('href', '/properties?page=1');
    expect(nextLink).toHaveAttribute('href', '/properties?page=3');
    expect(page1Link).toHaveAttribute('href', '/properties?page=1');
  });
});

