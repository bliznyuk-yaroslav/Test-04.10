'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, type Task } from '../lib/api';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    total: number;
    todo: number;
    in_progress: number;
    done: number;
  } | null>(null);

  useEffect(() => {
    try {
      const t = localStorage.getItem('token');
      const a = !!t;
      setAuthed(a);
      if (a) {
        try {
          const e = localStorage.getItem('email');
          if (e) setEmail(e);
        } catch {}
        setLoading(true);
        api
          .getTasks()
          .then((tasks: Task[]) => {
            const total = tasks.length;
            const todo = tasks.filter((t) => t.status === 'todo').length;
            const in_progress = tasks.filter((t) => t.status === 'in_progress').length;
            const done = tasks.filter((t) => t.status === 'done').length;
            setStats({ total, todo, in_progress, done });
          })
          .finally(() => setLoading(false));
      }
    } catch {}
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 font-sans text-zinc-100">
      <div className="max-w-2xl w-full p-8 bg-zinc-950 border border-purple-800 rounded-lg shadow">
        <h1 className="text-3xl font-semibold mb-3 tracking-tight">Welcome to Kanban</h1>
        {!authed ? (
          <>
            <p className="text-zinc-300 mb-6">
              Керуйте задачами у статусах: <span className="text-purple-300">todo</span>,{' '}
              <span className="text-purple-300">in&nbsp;progress</span>,{' '}
              <span className="text-purple-300">done</span>.
            </p>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded border border-purple-700 text-zinc-200 hover:bg-purple-900/50 transition-colors"
              >
                Register
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-zinc-300 mb-1">
              Привіт{email ? ` ${email}` : ''}, ви увійшли в систему.
            </p>
            <p className="text-zinc-300 mb-4">Ось ваші статистики задач:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="rounded-md border border-purple-800 bg-zinc-900/70 p-4 text-center">
                <div className="text-xs text-zinc-300">Total</div>
                <div className="text-2xl font-semibold">{stats?.total ?? (loading ? '…' : 0)}</div>
              </div>
              <div className="rounded-md border border-purple-800 bg-zinc-900/70 p-4 text-center">
                <div className="text-xs text-zinc-300">To do</div>
                <div className="text-2xl font-semibold text-purple-200">
                  {stats?.todo ?? (loading ? '…' : 0)}
                </div>
              </div>
              <div className="rounded-md border border-purple-800 bg-zinc-900/70 p-4 text-center">
                <div className="text-xs text-zinc-300">In progress</div>
                <div className="text-2xl font-semibold text-purple-200">
                  {stats?.in_progress ?? (loading ? '…' : 0)}
                </div>
              </div>
              <div className="rounded-md border border-purple-800 bg-zinc-900/70 p-4 text-center">
                <div className="text-xs text-zinc-300">Done</div>
                <div className="text-2xl font-semibold text-purple-200">
                  {stats?.done ?? (loading ? '…' : 0)}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/kanban"
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Open Kanban
              </Link>
              <button
                onClick={() => {
                  dispatch(logout());
                  router.replace('/login');
                }}
                className="px-4 py-2 rounded border border-purple-700 text-zinc-200 hover:bg-purple-900/50 transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
