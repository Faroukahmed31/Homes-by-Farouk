import { notFound } from 'next/navigation';
import { properties } from '@/data/properties';
import { PropertyHeroSlideshow } from '@/components/properties/PropertyHeroSlideshow';
import { PropertyStats } from '@/components/properties/PropertyStats';
import { PropertyDetails } from '@/components/properties/PropertyDetails';
import { InquiryForm } from '@/components/properties/InquiryForm';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return (
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
  );
}
