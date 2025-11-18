import DashboardHeader from "@/components/dashboard-header";
import Sidebar from "@/components/sidebar";

const adminNavItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Website", href: "/admin/website" },
  { label: "Students", href: "/admin/students" },
  { label: "Teachers", href: "/admin/teachers" },
  { label: "News", href: "/admin/news" },
  { label: "Grades", href: "/admin/grades" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Admin layout rendering");
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <Sidebar items={adminNavItems} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
