"use client";

import Link from "next/link";
import { useState } from "react";

export default function SchoolNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl">Excellence School</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="#news" className="hover:text-blue-200 transition">
              News
            </Link>
            <Link href="#academics" className="hover:text-blue-200 transition">
              Academics
            </Link>
            <Link href="#teachers" className="hover:text-blue-200 transition">
              Teachers
            </Link>
            <Link href="#contact" className="hover:text-blue-200 transition">
              Contact
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="#home" className="hover:text-blue-200 transition">
                Home
              </Link>
              <Link href="#news" className="hover:text-blue-200 transition">
                News
              </Link>
              <Link
                href="#academics"
                className="hover:text-blue-200 transition"
              >
                Academics
              </Link>
              <Link href="#teachers" className="hover:text-blue-200 transition">
                Teachers
              </Link>
              <Link href="#contact" className="hover:text-blue-200 transition">
                Contact
              </Link>
              <Link
                href="/login"
                className="bg-white text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition text-center"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
