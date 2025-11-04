'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

export default function Header({ onLogout }: { onLogout?: () => void }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reduxAuthed = useAppSelector((s) => !!s.auth.token);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const authed = mounted
    ? reduxAuthed || (typeof window !== 'undefined' && !!localStorage.getItem('token'))
    : false;
  const handleLogout = () => {
    if (onLogout) return onLogout();
    dispatch(logout());
    router.replace('/login');
  };
  return (
    <div className="w-full bg-zinc-950/70 border-b border-purple-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold tracking-tight text-zinc-100">Kanban</Link>
        <div className="flex gap-3 text-sm">
          {authed ? (
            <>
              <Link
                href="/"
                className="px-3 py-1 rounded border border-purple-700 text-zinc-200 hover:bg-purple-900/50 transition-colors"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 rounded border border-purple-700 text-zinc-200 hover:bg-purple-900/50 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
