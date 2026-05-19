import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { SearchBar } from '@/components/home/SearchBar';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { LeadMagnetSplit } from '@/components/home/LeadMagnetSplit';
import { Footer } from '@/components/layout/Footer';
import { getPropertiesFromNeon } from '@/lib/properties';

export default async function Home() {
  // Pre-fetch properties dynamically from Neon on the server side
  const properties = await getPropertiesFromNeon();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedProperties initialProperties={properties} />
      <LeadMagnetSplit />
      <Footer />
    </main>
  );
}
