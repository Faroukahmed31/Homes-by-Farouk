import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { EditorialBio } from "@/components/about/EditorialBio";
import { ValueGrid } from "@/components/about/ValueGrid";
import { CTASection } from "@/components/about/CTASection";

export const metadata: Metadata = {
  title: "About Us | Homes by Farouk",
  description: "Learn about Farouk's passion, modern market expertise, and dedication to helping clients make smart financial decisions in Nairobi's real estate market.",
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
