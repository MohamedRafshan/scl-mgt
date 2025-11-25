"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        console.log("Already logged in, redirecting...");
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("email", session.user.email)
          .single();

        const role = profile?.role || "student";
        const target =
          role === "admin"
            ? "/admin"
            : role === "teacher"
            ? "/teacher"
            : "/student";
        window.location.href = target;
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("=== Login Form Submit ===");
    console.log("Email:", email);
    console.log("Redirect param:", redirectTo);
    console.log("========================");

    try {
      const result = await signIn(email, password);

      console.log("=== Login Success ===");
      console.log("User:", result.user?.email);
      console.log("Session:", !!result.session);
      console.log("Role:", result.userData?.role);

      // Wait for cookies to be set
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Verify session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session in browser:", !!session);
      console.log("====================");

      if (!session) {
        throw new Error("Session not persisted. Please try again.");
      }

      // Determine target based on redirect or role
      const role = (result.userData?.role as string) || "student";
      let target = "/";

      if (redirectTo && role === "admin" && redirectTo.startsWith("/admin")) {
        // Honor redirect if user is admin and trying to access admin path
        target = redirectTo;
      } else {
        // Otherwise redirect based on role
        target =
          role === "admin"
            ? "/admin"
            : role === "teacher"
            ? "/teacher"
            : "/student";
      }

      console.log("Final redirect target:", target);

      // Hard redirect
      window.location.href = target;
    } catch (err: any) {
      console.error("=== Login Error ===", err);
      setError(err.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
