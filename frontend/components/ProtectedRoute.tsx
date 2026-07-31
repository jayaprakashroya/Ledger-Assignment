'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !token) {
      router.replace('/login');
    }
  }, [router, token, hydrated]);

  if (!hydrated) {
    return (
      <div className="min-h-[calc(100vh-96px)] grid place-items-center px-6 text-center text-white">
        <p className="text-lg">Loading session…</p>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
