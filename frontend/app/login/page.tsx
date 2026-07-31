'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { authApi } from '../../lib/api';
import { useAuthStore } from '../../lib/store';

export default function LoginPage() {
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
      const apiResponse = await authApi.login({ email, password });
      // Support multiple possible response shapes (mock vs real backend)
      // Examples:
      // - { data: { token, email, user_id } }
      // - { token, email, user_id }
      const payload = apiResponse?.data ?? apiResponse ?? {};
      // tolerate snake_case and camelCase
      const token = payload.token ?? payload.accessToken ?? payload.access_token;
      const emailResp = payload.email ?? payload.user_email;
      const userId = payload.user_id ?? payload.userId ?? payload.user_id_str;

      if (!token) {
        const raw = JSON.stringify(apiResponse);
        const msg = `Login did not return a token. Response: ${raw}`;
        console.error(msg);
        setFormError('Login failed: invalid response from server');
        toast.error('Login failed: invalid response from server');
        return;
      }

      // Save auth and navigate
      setAuth(String(token), String(emailResp ?? email), String(userId ?? ''));
      console.debug('login response:', apiResponse);
      toast.success('Logged in successfully');
      router.push('/search');
    } catch (error: any) {
      const msg = error?.response?.data?.message
        || error?.response?.data?.error
        || error?.message
        || 'Login failed. Is the backend running? Start it with `cd backend && ./mvnw spring-boot:run`.';
      setFormError(msg);
      toast.error(msg);
      console.error('login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async () => {
    setFormError(null);
    setLoading(true);
    const demoEmail = 'demo@example.com';
    const demoPassword = 'password123';
    setEmail(demoEmail);
    setPassword(demoPassword);
    try {
      const apiResponse = await authApi.login({ email: demoEmail, password: demoPassword });
      const payload = apiResponse?.data ?? apiResponse ?? {};
      const token = payload.token ?? payload.accessToken ?? payload.access_token;
      const emailResp = payload.email ?? payload.user_email;
      const userId = payload.user_id ?? payload.userId ?? payload.user_id_str;
      if (!token) {
        setFormError('Demo login failed: invalid response from server');
        toast.error('Demo login failed');
        return;
      }
      setAuth(String(token), String(emailResp ?? demoEmail), String(userId ?? ''));
      toast.success('Signed in as demo user');
      router.push('/search');
    } catch (error: any) {
      const msg = error?.response?.data?.message || error?.message || 'Demo login failed';
      setFormError(msg);
      toast.error(msg);
      console.error('demo login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 text-white">
      <div className="container grid gap-6 lg:grid-cols-[1.3fr_0.8fr]">
        <section className="card">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Welcome back</p>
          <h1 className="mt-4 text-4xl font-semibold">Sign in to your library.</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Continue building your music collection, then manage and explore your albums with analytics.</p>
        </section>
        <section className="card p-8">
          <h2 className="text-2xl font-semibold">Login</h2>
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
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
            <button
              type="button"
              onClick={demoLogin}
              className="mt-3 w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium hover:bg-cyan-500"
              disabled={loading}
            >
              Use demo account
            </button>
          </form>
          <p className="mt-5 text-sm text-slate-400">
            New here?{' '}
            <Link href="/register" className="text-cyan-300 hover:text-cyan-200">
              Create an account.
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
