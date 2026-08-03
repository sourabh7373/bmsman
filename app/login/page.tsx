"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Sparkles } from "lucide-react";
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4">
      {/* Background glowing ambient elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/20 dark:border-slate-800 shadow-2xl shadow-indigo-500/15 p-8 sm:p-10 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 mb-4">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <Sparkles size={14} className="text-indigo-500" /> Enterprise SaaS Workspace
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-sm rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm">
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
                className="absolute right-4 top-[42px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-2xl h-14 hover:opacity-95 transition-all duration-300 disabled:opacity-50 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.99]"
            >
              {loading ? "Authenticating..." : "Sign In to Workspace"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
