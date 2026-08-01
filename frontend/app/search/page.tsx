'use client';

export const dynamic = 'force-dynamic';
export const revalidate = false;

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import AlbumCard from '../../components/AlbumCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import NavBar from '../../components/NavBar';
import { libraryApi, searchApi } from '../../lib/api';
import { useAuthStore } from '../../lib/store';

export default function SearchPage() {
  const token = useAuthStore((state) => state.token);
  const [query, setQuery] = useState('coldplay');
  const [term, setTerm] = useState('coldplay');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerm(query.trim() || 'coldplay');
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const load = async () => {
      setSearching(true);
      try {
        const response = await searchApi.search(term);
        setResults(response || []);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Search failed.');
      } finally {
        setSearching(false);
      }
    };

    load();
  }, [term]);

  const handleAdd = async (album: any) => {
    if (!token) {
      toast.error('Please sign in to save albums.');
      return;
    }

    setLoading(true);
    try {
      await libraryApi.addItem({
        apple_catalog_id: album.apple_catalog_id,
        title: album.title,
        artist_name: album.artist_name,
        genre: album.genre,
        release_date: album.release_date,
        track_count: album.track_count,
        artwork_url: album.artwork_url,
        collection_price: album.price,
        user_rating: 4,
        user_notes: 'Added from search',
      });
      toast.success('Saved to library');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not save item');
    } finally {
      setLoading(false);
    }
  };

  const resultCount = useMemo(() => results.length, [results]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar />
      <main className="container py-10">
        <div className="mb-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Search albums</p>
              <h1 className="mt-3 text-4xl font-semibold">Find albums from the iTunes catalog.</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input w-full min-w-[280px] flex-1"
                placeholder="Search for artists or albums"
              />
              <button type="button" onClick={() => setTerm(query || 'coldplay')} className="button">
                Search
              </button>
            </div>
          </div>
          <p className="mt-4 text-slate-400">{resultCount} results found for "{term}".</p>
        </div>

        {searching ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="card text-center">
            <p className="text-xl font-semibold">No albums found.</p>
            <p className="mt-2 text-slate-400">Try another search term or check your spelling.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((item) => (
              <AlbumCard key={item.apple_catalog_id} album={item} onAdd={() => handleAdd(item)} disabled={loading} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
