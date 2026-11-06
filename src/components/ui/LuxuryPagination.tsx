'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface LuxuryPaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages?: number;
  /** Callback fired when a page is clicked */
  onPageChange?: (page: number) => void;
  /** Optional function to generate href for Next.js Link */
  getPageHref?: (page: number) => string;
  /** Optional container CSS class */
  className?: string;
  /** Label for previous button */
  previousLabel?: string;
  /** Label for next button */
  nextLabel?: string;
}

export function LuxuryPagination({
  currentPage = 1,
  totalPages = 4,
  onPageChange,
  getPageHref,
  className = '',
  previousLabel = 'Previous',
  nextLabel = 'Next',
}: LuxuryPaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate page array (handles up to 7 items with ellipsis if large, or direct 1..N)
  const getPages = (): (number | 'ellipsis-start' | 'ellipsis-end')[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = [1];

    if (currentPage > 3) {
      pages.push('ellipsis-start');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis-end');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    if (page === currentPage) {
      e.preventDefault();
      return;
    }
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    if (!hasPrev) {
      e.preventDefault();
      return;
    }
    if (onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    if (!hasNext) {
      e.preventDefault();
      return;
    }
    if (onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={`inline-flex flex-wrap items-center justify-center gap-2 p-2.5 sm:p-3 rounded-none bg-[#0A1015] border border-[#D4AF37]/30 shadow-[0_12px_35px_rgba(0,0,0,0.85)] ring-1 ring-white/5 backdrop-blur-xl ${className}`}
    >
      {/* Previous Button */}
      {getPageHref && hasPrev ? (
        <Link
          href={getPageHref(currentPage - 1)}
          onClick={handlePrevClick}
          aria-label="Go to previous page"
          className="group relative h-10 px-4 sm:px-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-[#D4AF37] border border-[#D4AF37]/35 bg-transparent transition-all duration-300 ease-out hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F2CA50] hover:shadow-[0_0_18px_rgba(212,175,55,0.3)] active:scale-95 cursor-pointer"
        >
          <ChevronLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          <span className="hidden xs:inline sm:inline">{previousLabel}</span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={handlePrevClick}
          disabled={!hasPrev}
          aria-label="Go to previous page"
          className={`group relative h-10 px-4 sm:px-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 ease-out border ${
            hasPrev
              ? 'border-[#D4AF37]/35 text-[#D4AF37] bg-transparent hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F2CA50] hover:shadow-[0_0_18px_rgba(212,175,55,0.3)] active:scale-95 cursor-pointer'
              : 'border-[#D4AF37]/15 text-[#D4AF37]/30 bg-transparent cursor-not-allowed pointer-events-none'
          }`}
        >
          <ChevronLeft
            size={14}
            className={`transition-transform duration-300 ${hasPrev ? 'group-hover:-translate-x-0.5' : ''}`}
          />
          <span className="hidden xs:inline sm:inline">{previousLabel}</span>
        </button>
      )}

      {/* Numbered Page Links */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {pages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="w-8 h-10 inline-flex items-center justify-center text-xs font-sans tracking-widest text-[#D4AF37]/40 select-none"
              >
                •••
              </span>
            );
          }

          const isActive = page === currentPage;

          const activeClasses =
            'bg-gradient-to-b from-[#F7D870] via-[#D4AF37] to-[#B38F24] text-[#0A1015] font-bold border border-[#F2CA50] shadow-[0_0_20px_rgba(212,175,55,0.45)] ring-1 ring-[#F2CA50]/50';

          const inactiveClasses =
            'border border-[#D4AF37]/35 text-[#D4AF37]/90 bg-transparent hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F2CA50] hover:shadow-[0_0_16px_rgba(212,175,55,0.25)] active:scale-95 cursor-pointer';

          if (getPageHref) {
            return (
              <Link
                key={page}
                href={getPageHref(page)}
                onClick={(e) => handlePageClick(page, e)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${page}`}
                className={`relative w-10 h-10 inline-flex items-center justify-center text-xs font-medium font-sans tracking-wider transition-all duration-300 ease-out ${
                  isActive ? activeClasses : inactiveClasses
                }`}
              >
                {page}
              </Link>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={(e) => handlePageClick(page, e)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Page ${page}`}
              className={`relative w-10 h-10 inline-flex items-center justify-center text-xs font-medium font-sans tracking-wider transition-all duration-300 ease-out ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {getPageHref && hasNext ? (
        <Link
          href={getPageHref(currentPage + 1)}
          onClick={handleNextClick}
          aria-label="Go to next page"
          className="group relative h-10 px-4 sm:px-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-[#D4AF37] border border-[#D4AF37]/35 bg-transparent transition-all duration-300 ease-out hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F2CA50] hover:shadow-[0_0_18px_rgba(212,175,55,0.3)] active:scale-95 cursor-pointer"
        >
          <span className="hidden xs:inline sm:inline">{nextLabel}</span>
          <ChevronRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleNextClick}
          disabled={!hasNext}
          aria-label="Go to next page"
          className={`group relative h-10 px-4 sm:px-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 ease-out border ${
            hasNext
              ? 'border-[#D4AF37]/35 text-[#D4AF37] bg-transparent hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F2CA50] hover:shadow-[0_0_18px_rgba(212,175,55,0.3)] active:scale-95 cursor-pointer'
              : 'border-[#D4AF37]/15 text-[#D4AF37]/30 bg-transparent cursor-not-allowed pointer-events-none'
          }`}
        >
          <span className="hidden xs:inline sm:inline">{nextLabel}</span>
          <ChevronRight
            size={14}
            className={`transition-transform duration-300 ${hasNext ? 'group-hover:translate-x-0.5' : ''}`}
          />
        </button>
      )}
    </nav>
  );
}

