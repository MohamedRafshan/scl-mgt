import Link from "next/link";
import SchoolNavbar from "@/components/school-navbar";
import SchoolHero from "@/components/school-hero";
import SchoolNews from "@/components/school-news";
import SchoolAcademics from "@/components/school-academics";
import SchoolTeachers from "@/components/school-teachers";
import SchoolContact from "@/components/school-contact";
import SchoolFooter from "@/components/school-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SchoolNavbar />
      <SchoolHero />
      <SchoolNews />
      <SchoolAcademics />
      <SchoolTeachers />
      <SchoolContact />
      <SchoolFooter />
    </div>
  );
}
