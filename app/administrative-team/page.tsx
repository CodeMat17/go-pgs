import StaffDetail from "@/components/staff/StaffDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrative Team | GO University School of Postgraduate Studies",
  description:
    "Meet our distinguished administrative team at Godfrey Okoye University School of Postgraduate Studies. Leading experts shaping the future of postgraduate education.",
  keywords:
    "GO University, Godfrey Okoye University, postgraduate studies, administrative team, higher education, Nigeria university",
  openGraph: {
    title: "Administrative Team | GO University School of Postgraduate Studies",
    description:
      "Meet our distinguished administrative team at Godfrey Okoye University School of Postgraduate Studies. Leading experts shaping the future of postgraduate education.",
    url: "https://pg.gouni.edu.ng/administrative-team",
    siteName: "GO University School of Postgraduate Studies",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University Administrative Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Administrative Team | GO University School of Postgraduate Studies",
    description:
      "Meet our distinguished administrative team at Godfrey Okoye University School of Postgraduate Studies.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/administrative-team",
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
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
};


export default function AdministrativeTeamPage() {
  return <StaffDetail />;
}
