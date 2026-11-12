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

  // Truncate the project description to 150 characters for the meta description
  const metaDescription = property.description
    ? property.description.length > 150
      ? property.description.slice(0, 150)
      : property.description
    : '';

  return {
    title: `${property.title} | Homes by Farouk`,
    description: metaDescription,
    alternates: {
      canonical: `/properties/${slug}`,
    },
    openGraph: {
      title: `${property.title} | Homes by Farouk`,
      description: metaDescription,
      url: `https://homesbyfarouk.co.ke/properties/${slug}`,
      images: property.heroImage ? [{ url: property.heroImage, alt: `${property.title} | Homes by Farouk` }] : [],
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

  // Determine primary schema type (Apartment or SingleFamilyResidence for houses/villas)
  const isHouse = property.propertyType === 'VILLA' || String(property.propertyType).toUpperCase() === 'HOUSE';
  const primaryType = isHouse ? 'SingleFamilyResidence' : 'Apartment';

  // Format numberOfBedrooms as an integer or QuantitativeValue
  const isSingleInteger = /^\d+$/.test(property.bedrooms?.trim() || '');
  const numberOfBedrooms = isSingleInteger
    ? parseInt(property.bedrooms, 10)
    : {
        '@type': 'QuantitativeValue',
        value: property.bedrooms,
      };

  // JSON-LD Schema mapped directly to database fields
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': primaryType,
    name: property.title,
    image: property.heroImage,
    description: property.description,
    numberOfBedrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.squareMeters,
      unitCode: 'MTK',
    },
  };
  const jsonLd = schemaData;

  // Dynamic GEO FAQ items and FAQPage JSON-LD Schema
  const faqs = [
    {
      question: `How many bedrooms does ${property.title} have?`,
      answer: `It features ${property.bedrooms} bedrooms.`,
    },
    {
      question: `What is the size of ${property.title}?`,
      answer: `The property offers ${property.squareMeters} of living space.`,
    },
    {
      question: `Where is ${property.title} located?`,
      answer: `${property.title} is located in ${property.location || 'Nairobi'}.${property.description ? ` ${property.description}` : ''}`,
    },
  ];

  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <CurrencyProvider>
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
          <Navbar />
          
          <main className="pt-24 max-w-[1440px] mx-auto">
            {/* AI Summary Block */}
            <section
              aria-label="Property Overview"
              className="px-6 md:px-20 py-5 border-b border-primary/15 bg-primary/[0.03]"
            >
              <p className="text-sm md:text-base font-sans text-foreground/80 leading-relaxed max-w-4xl">
                {`${property.title} is a premium real estate listing in Nairobi featuring ${property.bedrooms} bedrooms and ${property.squareMeters} of living space.`}
              </p>
            </section>

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

            {/* Dynamic FAQ Section */}
            <section className="px-6 md:px-20 pb-20 pt-8 border-t border-primary/15">
              <h2 className="text-3xl font-heading text-primary mb-10 border-b border-primary/20 pb-4 inline-block">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-primary/20 bg-primary/5 p-6 space-y-3"
                  >
                    <h3 className="text-lg font-heading text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-sm font-sans text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </CurrencyProvider>
    </>
  );
}

