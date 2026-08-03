"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { LoginCard } from "@/components/LoginCard";
import { InputField } from "@/components/InputField";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("superadmin@frp.local");
  const [password, setPassword] = useState("superadmin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/auth/authenticate", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginCard>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to continue to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={login} className="space-y-5">
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            icon={<Mail size={20} />}
            required
          />

          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock size={20} />}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[42px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white font-semibold rounded-[12px] h-[52px] hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </LoginCard>
    </AuthLayout>
  );
}
