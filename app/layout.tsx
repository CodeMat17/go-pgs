import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Godfrey Okoye University Postgraduate School",
    template: "%s | GO Uni Postgrad",
  },
  description:
    "Advance your career with accredited postgraduate programs (Masters, PhD, PGD) at Godfrey Okoye University, Enugu. Leader in research-driven education, professional development, and academic excellence in Nigeria.",
  keywords: [
    "Postgraduate programs Enugu",
    "Masters degree Nigeria",
    "PhD programs Southeast Nigeria",
    "PGD courses",
    "Graduate studies",
    "Research universities Nigeria",
    "Academic excellence Africa",
    "Professional development courses",
    "Postgraduate admission requirements",
    "University ranking Nigeria",
    "Godfrey Okoye University",
    "GOUNI",
  ],
  openGraph: {
    title: "Godfrey Okoye Postgraduate School - Elevate Your Academic Journey",
    description:
      "Join Nigeria's leading postgraduate institution offering cutting-edge programs in Business, Technology, Education, and Social Sciences. Accredited degrees with industry-focused curriculum.",
    url: "https://pg.gouni.edu.ng",
    siteName: "GO University Postgraduate School",
    images: [
      {
        url: "https://pg.gouni.edu.ng/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University PGS",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Godfrey Okoye University Postgraduate Programs",
    description:
      "NUC-accredited postgraduate degrees with modern facilities and expert faculty. Apply now.",
    images: ["https://pg.gouni.edu.ng/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [
    {
      name: "Godfrey Okoye University",
      url: "https://www.gouni.edu.ng",
    },
  ],
  // manifest: "/site.webmanifest",
  metadataBase: new URL("https://pg.gouni.edu.ng"),
  alternates: {
    canonical: "/",
    languages: {
      "en-NG": "/en-NG",
    },
  },
  category: "education",
  verification: {
    google: "1JdJykuzZ8V4A8B0QyhPz7d6U1BZ5uwqpsldRCIadAU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <ConvexClientProvider>
            <Nav />
            {children}
            <Footer />
            <Toaster />
            {/* <ChatWidget /> */}
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
