'use client';

import { useEffect } from 'react';
import { Toaster } from 'sonner';
import MusicPlayer from '../components/MusicPlayer';
import { useAuthStore } from '../lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((state) => state.hydrateFromStorage);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      {children}
      <MusicPlayer />
      <Toaster position="top-right" richColors />
    </>
  );
}
