"use client";
import { useState } from "react";
import Link from "next/link";

export type AuthFormProps = {
  title: string;
  submitLabel: string;
  loading?: boolean;
  error?: string | null;
  onSubmit: (payload: { email: string; password: string }) => Promise<void> | void;
  alternateLink: { href: string; label: string };
  alternateText?: string;
};

export default function AuthForm({
  title,
  submitLabel,
  loading,
  error,
  onSubmit,
  alternateLink,
  alternateText,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ email, password });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 font-sans text-zinc-100">
      <div className="w-full max-w-md p-6 bg-zinc-950 border border-purple-800 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4 tracking-tight">{title}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-zinc-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border px-3 py-2 bg-zinc-900 text-zinc-100 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-zinc-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 bg-zinc-900 text-zinc-100 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
              minLength={6}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={!!loading}
            className="w-full px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white transition-colors disabled:opacity-70"
          >
            {loading ? `${submitLabel}...` : submitLabel}
          </button>
        </form>
        <p className="mt-4 text-sm text-zinc-300">
          {alternateText ? `${alternateText} ` : null}
          <Link
            className="underline text-purple-300 hover:text-purple-200"
            href={alternateLink.href}
          >
            {alternateLink.label}
          </Link>
        </p>
      </div>
    </main>
  );
}
