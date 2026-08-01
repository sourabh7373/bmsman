"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("superadmin");
  const [password, setPassword] = useState("superadmin123");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/authenticate", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      router.push("/dashboard");
    } catch (error) {
      alert("Invalid Username or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card border border-border shadow-sm rounded-xl p-8 w-[400px]">
        <h1 className="text-2xl font-bold text-center text-foreground mb-2">BMSMan</h1>
        <p className="text-muted text-center mb-8">Login to your account</p>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <input
              className="border border-border rounded-lg px-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              className="border border-border rounded-lg px-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-medium rounded-lg py-3 hover:bg-primary/90 transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
