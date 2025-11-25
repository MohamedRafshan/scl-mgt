"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function DashboardHeader({
  onMenuClick,
  sidebarOpen,
}: DashboardHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 md:p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <h1 className="text-base md:text-xl lg:text-2xl font-semibold text-gray-800 truncate">
            School Management System
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 whitespace-nowrap"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
