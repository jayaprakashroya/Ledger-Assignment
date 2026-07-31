'use client';

import Link from 'next/link';
import { useAuthStore } from '../lib/store';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  const { token, email, clearAuth } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="container flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/search" className="text-xl font-semibold text-white">
          Music Catalog
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-2 md:flex">
            <Link href="/search" className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800/80">
              Search
            </Link>
            <Link href="/music" className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800/80">
              🎵 Music
            </Link>
            <Link href="/library" className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800/80">
              Library
            </Link>
          </nav>
          <ThemeToggle />
          {token ? (
            <button onClick={clearAuth} className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-red-400">
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
