import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { EditorialBio } from "@/components/about/EditorialBio";
import { ValueGrid } from "@/components/about/ValueGrid";
import { CTASection } from "@/components/about/CTASection";

export const metadata: Metadata = {
  title: "About Farouk Ahmed | Nairobi Real Estate Consultant & Advisor",
  description: "Learn about Farouk Ahmed's modern real estate consultancy, deep Nairobi market expertise, and dedicated advisory for prime residential and off-plan investments.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Navbar />
      <AboutHero />
      <EditorialBio />
      <ValueGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
