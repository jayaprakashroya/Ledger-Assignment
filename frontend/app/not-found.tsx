import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center shadow-soft">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-slate-300">The page you are looking for does not exist.</p>
        <Link href="/search" className="mt-6 inline-flex rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
          Go back home
        </Link>
      </div>
    </main>
  );
}
