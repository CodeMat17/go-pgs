import StaffDetail from "@/components/staff/StaffDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrative Team | GO University Postgraduate School",
  description:
    "Meet the distinguished administrative team shaping postgraduate education at Godfrey Okoye University.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/administrative-team",
  },
};


export default function AdministrativeTeamPage() {
  return <StaffDetail />;
}
