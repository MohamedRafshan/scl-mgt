"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id?: string;
  email?: string;
  full_name?: string;
  role?: string;
  [key: string]: unknown;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        // Get session from Supabase
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log("=== Admin Dashboard Auth Check ===");
        console.log("Session:", !!session);
        console.log("User:", session?.user?.email);
        console.log("Error:", error);
        console.log("==================================");

        if (!session || !session.user) {
          console.log("No session - redirecting to login");
          router.push("/login");
          return;
        }

        // Get user profile
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("email", session.user.email)
          .single();

        console.log("Profile:", profile);

        if (!profile) {
          console.log("No profile found");
          router.push("/login");
          return;
        }

        if (profile.role !== "admin") {
          console.log("Not admin - redirecting to", profile.role);
          router.push(`/${profile.role}`);
          return;
        }

        setUser(profile);
      } catch (error) {
        console.error("Error checking user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-3 md:p-4 lg:p-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 lg:mb-6">
        Admin Dashboard
      </h1>
      <div className="mb-3 md:mb-4 p-3 md:p-4 bg-blue-50 rounded-lg">
        <p className="text-xs md:text-sm text-gray-600">
          Welcome,{" "}
          <span className="font-semibold">{user.full_name || user.email}</span>
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium">
            Total Students
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
            0
          </p>
        </div>
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium">
            Total Teachers
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
            0
          </p>
        </div>
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium">
            Classes
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
            0
          </p>
        </div>
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium">
            Active News
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
            0
          </p>
        </div>
      </div>
    </div>
  );
}
