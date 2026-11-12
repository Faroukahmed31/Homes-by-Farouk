import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import PropertyPage, { generateMetadata } from './page';
import { Property } from '@/types/property';

const mockProperty: Property = {
  slug: 'azure-heights',
  title: 'Azure Heights Residences',
  location: 'Riverside, Nairobi',
  description: 'A luxurious off-plan residential development located in Riverside, offering panoramic views of the arboretum, state-of-the-art amenities, and bespoke finishes crafted for discerning global investors and homeowners alike.',
  longDescription: ['Detailed description line 1', 'Detailed description line 2'],
  bedrooms: '3 - 4',
  bathrooms: '3.5',
  squareMeters: '220 - 310',
  completionDate: 'Q4 2026',
  status: 'Off-Plan',
  purpose: 'buy',
  startingPrice: 38000000,
  propertyType: 'APARTMENT',
  listingType: 'SALE',
  salePrice: 38000000,
  rentPrice: null,
  heroImage: 'https://images.unsplash.com/photo-azure-heights.jpg',
  galleryImages: ['https://images.unsplash.com/photo-gallery-1.jpg'],
  units: [{ type: '3 Bed', size: 220, status: 'Available', price: '38000000' }],
  amenities: [{ title: 'Infinity Pool', description: 'Heated pool', iconName: 'Waves' }],
  locationFeatures: ['5 mins to Embassy'],
  mapImage: '',
};

vi.mock('@/lib/properties', () => ({
  getPropertyBySlug: vi.fn(async (slug: string) => {
    if (slug === 'azure-heights') return mockProperty;
    if (slug === 'short-desc') {
      return {
        ...mockProperty,
        slug: 'short-desc',
        title: 'Short Desc Villa',
        propertyType: 'VILLA',
        bedrooms: '4',
        description: 'Short luxury description under 150 chars.',
      };
    }
    return null;
  }),
  getPropertiesFromNeon: vi.fn(async () => [mockProperty]),
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

// Mock heavy subcomponents
vi.mock('@/components/layout/Navbar', () => ({
  Navbar: () => <nav data-testid="navbar" />,
}));
vi.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer" />,
}));
vi.mock('@/components/properties/PropertyHeroSlideshow', () => ({
  PropertyHeroSlideshow: () => <div data-testid="slideshow" />,
}));
vi.mock('@/components/properties/PropertyStats', () => ({
  PropertyStats: () => <div data-testid="stats" />,
}));
vi.mock('@/components/properties/PropertyDetails', () => ({
  PropertyDetails: () => <div data-testid="details" />,
}));
vi.mock('@/components/properties/InquiryForm', () => ({
  InquiryForm: () => <div data-testid="inquiry-form" />,
}));

describe('Dynamic Property Page - SEO & Metadata', () => {
  describe('generateMetadata', () => {
    it('sets dynamic page title to "[name] | Homes by Farouk"', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'azure-heights' }),
      });

      expect(metadata.title).toBe('Azure Heights Residences | Homes by Farouk');
    });

    it('truncates project description to 150 characters for meta description', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'azure-heights' }),
      });

      expect(metadata.description).toBe(mockProperty.description.slice(0, 150));
      expect(metadata.description?.length).toBeLessThanOrEqual(150);
    });

    it('retains full description when length is under 150 characters', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'short-desc' }),
      });

      expect(metadata.title).toBe('Short Desc Villa | Homes by Farouk');
      expect(metadata.description).toBe('Short luxury description under 150 chars.');
    });

    it('handles not found slug with fallback metadata', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'non-existent' }),
      });

      expect(metadata.title).toBe('Property Not Found | Homes by Farouk');
    });
  });

  describe('PropertyPage JSON-LD Structured Data Schema', () => {
    it('injects <script type="application/ld+json"> containing valid Apartment schema for apartments', async () => {
      const pageJsx = await PropertyPage({
        params: Promise.resolve({ slug: 'azure-heights' }),
      });

      const { container } = render(pageJsx);
      const scriptTag = container.querySelector('script[type="application/ld+json"]');
      expect(scriptTag).not.toBeNull();

      const schema = JSON.parse(scriptTag!.innerHTML);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Apartment');
      expect(schema.name).toBe(mockProperty.title);
      expect(schema.image).toBe(mockProperty.heroImage);
      expect(schema.description).toBe(mockProperty.description);
      expect(schema.numberOfBedrooms).toEqual({
        '@type': 'QuantitativeValue',
        value: mockProperty.bedrooms,
      });
      expect(schema.floorSize).toEqual({
        '@type': 'QuantitativeValue',
        value: mockProperty.squareMeters,
        unitCode: 'MTK',
      });
    });

    it('injects SingleFamilyResidence schema with integer numberOfBedrooms for villas/houses', async () => {
      const pageJsx = await PropertyPage({
        params: Promise.resolve({ slug: 'short-desc' }),
      });

      const { container } = render(pageJsx);
      const scriptTag = container.querySelector('script[type="application/ld+json"]');
      expect(scriptTag).not.toBeNull();

      const schema = JSON.parse(scriptTag!.innerHTML);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('SingleFamilyResidence');
      expect(schema.numberOfBedrooms).toBe(4);
      expect(schema.floorSize).toEqual({
        '@type': 'QuantitativeValue',
        value: mockProperty.squareMeters,
        unitCode: 'MTK',
      });
    });
  });

  describe('PropertyPage GEO Optimizations (AI Summary, FAQ Section, and FAQPage Schema)', () => {
    it('renders the AI Summary block with exact dynamic sentence', async () => {
      const pageJsx = await PropertyPage({
        params: Promise.resolve({ slug: 'azure-heights' }),
      });

      const { getByText } = render(pageJsx);
      expect(
        getByText(
          `${mockProperty.title} is a premium real estate listing in Nairobi featuring ${mockProperty.bedrooms} bedrooms and ${mockProperty.squareMeters} of living space.`
        )
      ).toBeInTheDocument();
    });

    it('renders the Frequently Asked Questions H2 section with 3 dynamic Q&A blocks', async () => {
      const pageJsx = await PropertyPage({
        params: Promise.resolve({ slug: 'azure-heights' }),
      });

      const { getByRole, getByText } = render(pageJsx);
      const faqHeading = getByRole('heading', { level: 2, name: 'Frequently Asked Questions' });
      expect(faqHeading).toBeInTheDocument();

      expect(getByText(`How many bedrooms does ${mockProperty.title} have?`)).toBeInTheDocument();
      expect(getByText(`It features ${mockProperty.bedrooms} bedrooms.`)).toBeInTheDocument();

      expect(getByText(`What is the size of ${mockProperty.title}?`)).toBeInTheDocument();
      expect(getByText(`The property offers ${mockProperty.squareMeters} of living space.`)).toBeInTheDocument();

      expect(getByText(`Where is ${mockProperty.title} located?`)).toBeInTheDocument();
    });

    it('injects a second <script type="application/ld+json"> with FAQPage schema without altering primary schema', async () => {
      const pageJsx = await PropertyPage({
        params: Promise.resolve({ slug: 'azure-heights' }),
      });

      const { container } = render(pageJsx);
      const scriptTags = container.querySelectorAll('script[type="application/ld+json"]');
      expect(scriptTags.length).toBe(2);

      const primarySchema = JSON.parse(scriptTags[0].innerHTML);
      expect(primarySchema['@type']).toBe('Apartment');

      const faqSchema = JSON.parse(scriptTags[1].innerHTML);
      expect(faqSchema['@context']).toBe('https://schema.org');
      expect(faqSchema['@type']).toBe('FAQPage');
      expect(faqSchema.mainEntity).toHaveLength(3);
      expect(faqSchema.mainEntity[0]).toEqual({
        '@type': 'Question',
        name: `How many bedrooms does ${mockProperty.title} have?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `It features ${mockProperty.bedrooms} bedrooms.`,
        },
      });
      expect(faqSchema.mainEntity[1]).toEqual({
        '@type': 'Question',
        name: `What is the size of ${mockProperty.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The property offers ${mockProperty.squareMeters} of living space.`,
        },
      });
    });
  });
});

