"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id?: string;
  email?: string;
  full_name?: string;
  role?: string;
  // add other known fields here as optional properties
  [key: string]: unknown;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        type AuthModule = {
          getCurrentUser?: () => Promise<User | null>;
          default?: () => Promise<User | null>;
        };

        const authModule = (await import(
          "@/lib/auth"
        )) as unknown as AuthModule;
        const currentUser = await (authModule.getCurrentUser
          ? authModule.getCurrentUser()
          : authModule.default
          ? authModule.default()
          : Promise.resolve(null));

        console.log("Current user in admin:", currentUser);

        if (!currentUser) {
          router.push("/teacher");
          return;
        }

        if (currentUser.role !== "admin") {
          router.push(`/${currentUser.role}`);
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Error checking user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    // checkUser();
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Welcome,{" "}
          <span className="font-semibold">{user.full_name || user.email}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Teachers</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Classes</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active News</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
