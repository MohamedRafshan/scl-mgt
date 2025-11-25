"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import DashboardHeader from "@/components/admin/dashboard-header";
import Sidebar from "@/components/admin/sidebar";
import { useRouter } from "next/navigation";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log("=== Admin Layout Auth Check ===");
      console.log("Session exists:", !!session);
      console.log("User:", session?.user?.email);
      console.log("Error:", error);
      console.log("===============================");

      if (!session) {
        console.warn("No session found, redirecting to login");
        router.push("/login");
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, !!session);
      if (event === "SIGNED_OUT") {
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  console.log("Admin layout rendering");
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex pt-16">
        <Sidebar
          items={adminNavItems}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-4 md:p-8 w-full">{children}</main>
      </div>
    </div>
  );
}
