import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyBySlug, getPropertiesFromNeon } from '@/lib/properties';
import { PropertyHeroSlideshow } from '@/components/properties/PropertyHeroSlideshow';
import { PropertyStats } from '@/components/properties/PropertyStats';
import { PropertyDetails } from '@/components/properties/PropertyDetails';
import { InquiryForm } from '@/components/properties/InquiryForm';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CurrencyProvider } from '@/context/CurrencyContext';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params dynamically using listings in Neon
export async function generateStaticParams() {
  const properties = await getPropertiesFromNeon();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found | Homes by Farouk',
      description: 'The requested Nairobi luxury property could not be found.',
    };
  }

  const type = property.propertyType === 'APARTMENT' ? 'Apartment' : property.propertyType === 'VILLA' ? 'Villa' : 'Property';
  const action = property.listingType === 'RENT' ? 'for Rent' : 'for Sale';
  const location = property.location || 'Nairobi';

  return {
    title: `${property.title} | Luxury ${type} ${action} in ${location}, Nairobi`,
    description: property.description || `Explore ${property.title}, an exclusive ${type.toLowerCase()} ${action.toLowerCase()} in ${location}, Nairobi. View floor plans, pricing schedules, and amenities with Homes by Farouk.`,
    alternates: {
      canonical: `/properties/${slug}`,
    },
    openGraph: {
      title: `${property.title} | Luxury ${type} in ${location}, Nairobi`,
      description: property.description || `Luxury ${type} in ${location}, Nairobi.`,
      url: `https://homesbyfarouk.co.ke/properties/${slug}`,
      images: property.heroImage ? [{ url: property.heroImage, alt: `${property.title} in ${location}, Nairobi` }] : [],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  
  // Instant serverless Neon query
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        
        <main className="pt-24 max-w-[1440px] mx-auto">
          <PropertyHeroSlideshow property={property} />
          <PropertyStats property={property} />

          <div className="px-6 md:px-20 py-20 flex flex-col lg:flex-row gap-20">
            {/* Left Column: Details */}
            <div className="w-full lg:w-[65%]">
              <PropertyDetails property={property} />
            </div>

            {/* Right Column: Sticky Form */}
            <div className="w-full lg:w-[35%]">
              <InquiryForm property={property} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </CurrencyProvider>
  );
}

