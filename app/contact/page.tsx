
import ContactDetails from "@/components/contact/ContactDetails";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Postgraduate Admissions Office",
  description: "Get in touch with our postgraduate admissions team",
  keywords: ["postgraduate school contact", "admissions office"],
  openGraph: {
    title: "Contact GO University Postgraduate School",
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default function ContactPage() {

  return (
  <ContactDetails />
  );
}
