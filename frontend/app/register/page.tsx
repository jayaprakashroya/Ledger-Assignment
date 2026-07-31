'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { authApi } from '../../lib/api';
import { useAuthStore } from '../../lib/store';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setLoading(true);

    try {
      const apiResponse = await authApi.register({ email, password });
      const payload = apiResponse?.data ?? apiResponse ?? {};
      const token = payload.token ?? payload.accessToken ?? payload.access_token;
      const emailResp = payload.email ?? payload.user_email;
      const userId = payload.user_id ?? payload.userId ?? payload.user_id_str;

      if (!token) {
        console.error('register response invalid', apiResponse);
        setFormError('Registration failed: invalid response from server');
        toast.error('Registration failed: invalid response from server');
        return;
      }

      setAuth(String(token), String(emailResp ?? email), String(userId ?? ''));
      toast.success('Account created successfully');
      router.push('/search');
    } catch (error: any) {
      const msg = error?.response?.data?.message
        || error?.response?.data?.error
        || error?.message
        || 'Registration failed. Is the backend running? Start it with `cd backend && ./mvnw spring-boot:run`.';
      setFormError(msg);
      toast.error(msg);
      console.error('register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 text-white">
      <div className="container grid gap-6 lg:grid-cols-[1.3fr_0.8fr]">
        <section className="card">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Start your library</p>
          <h1 className="mt-4 text-4xl font-semibold">Create your account.</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Register to save albums from the iTunes catalog and explore analytics across your library.</p>
        </section>
        <section className="card p-8">
          <h2 className="text-2xl font-semibold">Register</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {formError && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
                {formError}
              </div>
            )}
            <label className="block space-y-2">
              <span className="label">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="block space-y-2">
              <span className="label">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </label>
            <button type="submit" className="button w-full" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <p className="mt-5 text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-300 hover:text-cyan-200">
              Sign in.
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
