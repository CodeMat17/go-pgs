
import ContactDetails from "@/components/contact/ContactDetails";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Postgraduate Admissions Office",
  description: "Get in touch with our postgraduate admissions team",
  keywords: ["postgraduate school contact", "admissions office"],
  openGraph: {
    title: "Contact GO University Postgraduate School",
    description: "Get in touch with our postgraduate admissions team",
    images: [
      {
        url: "/contact/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University Postgraduate Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact GO University Postgraduate School",
    description: "Get in touch with our postgraduate admissions team",
    images: ["https://pg.gouni.edu.ng/contact/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/contact",
  },
};

export default function ContactPage() {

  return (
  <ContactDetails />
  );
}
