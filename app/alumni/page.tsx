import AlumniDetail from "@/components/alumni/AlumniDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postgraduate Alumni Network",
  description: "Join our global network of successful postgraduate alumni",
  keywords: ["postgraduate alumni stories", "alumni association"],
  openGraph: {
    title: "GO Uni Postgraduate Alumni Community",
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default function AlumniPage() {
  return <AlumniDetail />;
}
