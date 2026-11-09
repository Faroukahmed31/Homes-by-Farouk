import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://homesbyfarouk.co.ke"),
  title: {
    default: "Homes by Farouk | Prime Real Estate in Nairobi",
    template: "%s | Homes by Farouk",
  },
  description:
    "Discover prime real estate in Nairobi with Homes by Farouk. Specializing in luxury off-plan developments, high-yield apartments, and exclusive houses across Westlands, Kilimani, Kileleshwa, and Riverside for discerning investors and homebuyers.",
  keywords: [
    "Nairobi real estate",
    "Nairobi Real Estate Consultant",
    "luxury apartments Nairobi",
    "off-plan developments Nairobi",
    "houses for sale Nairobi",
    "Westlands apartments",
    "Kilimani luxury apartments",
    "Kileleshwa real estate",
    "Riverside Nairobi property",
    "Brookside apartments Nairobi",
    "property investment Nairobi",
    "Kenya real estate investment",
    "Homes by Farouk",
    "Farouk Ahmed",
  ],
  authors: [{ name: "Farouk Ahmed", url: "https://homesbyfarouk.co.ke" }],
  creator: "Farouk Ahmed",
  publisher: "Homes by Farouk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://homesbyfarouk.co.ke",
    siteName: "Homes by Farouk",
    title: "Homes by Farouk | Prime Real Estate in Nairobi",
    description:
      "Premier Nairobi Real Estate Consultant specializing in high-yield off-plan developments, luxury apartments, and prestigious residential acquisitions in Westlands, Kilimani, Kileleshwa, and Riverside.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Homes by Farouk | Prime Real Estate in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homes by Farouk | Prime Real Estate in Nairobi",
    description:
      "Prime luxury residences, high-yield off-plan developments, and expert real estate advisory across Nairobi postcodes.",
    images: ["/og-image.jpg"],
    creator: "@homesbyfarouk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
