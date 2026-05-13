import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { SearchBar } from '@/components/home/SearchBar';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { LeadMagnetSplit } from '@/components/home/LeadMagnetSplit';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedProperties />
      <LeadMagnetSplit />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
