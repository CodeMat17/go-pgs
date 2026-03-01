import ContactDetails from "@/components/contact/ContactDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | GO University Postgraduate School",
  description:
    "Reach out to the GO University Postgraduate School admissions, research, and student support teams. We are here to help you every step of the way.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/contact",
  },
};

export default function ContactPage() {
  return <ContactDetails />;
}
