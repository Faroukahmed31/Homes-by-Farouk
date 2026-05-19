import '@testing-library/jest-dom';
import { vi } from 'vitest';

const mockSearchParams = {
  get: (key: string) => {
    if (key === 'status') return 'All';
    if (key === 'location') return 'any';
    if (key === 'purpose') return 'buy';
    return null;
  },
  toString: () => '',
};

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => mockSearchParams,
}));

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn();
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
