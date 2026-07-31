'use client';

import { Music, Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import NavBar from '../../components/NavBar';
import ProtectedRoute from '../../components/ProtectedRoute';
import { searchApi } from '../../lib/api';
import { usePlayerStore, type Track } from '../../lib/playerStore';

export default function MusicPage() {
  const [query, setQuery] = useState('coldplay');
  const [term, setTerm] = useState('coldplay');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const { currentTrack, playTrack, setQueue } = usePlayerStore();

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
        const response = await searchApi.searchSongs(term);
        setResults(response || []);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Search failed.');
      } finally {
        setSearching(false);
      }
    };

    load();
  }, [term]);

  const handlePlaySong = (song: any) => {
    const track: Track = {
      id: song.trackId || song.collectionId || Date.now().toString(),
      title: song.trackName || song.collectionName || 'Unknown',
      artist: song.artistName || 'Unknown Artist',
      artwork_url: song.artworkUrl100 || song.artworkUrl600 || '/placeholder.png',
      preview_url: song.previewUrl,
      trackTimeMillis: song.trackTimeMillis,
    };

    if (!track.preview_url) {
      toast.error('Preview not available for this track');
      return;
    }

    playTrack(track);

    // Also add to queue
    const queue: Track[] = results
      .filter((r) => r.previewUrl)
      .map((r) => ({
        id: r.trackId || r.collectionId || Date.now().toString(),
        title: r.trackName || r.collectionName || 'Unknown',
        artist: r.artistName || 'Unknown Artist',
        artwork_url: r.artworkUrl100 || r.artworkUrl600 || '/placeholder.png',
        preview_url: r.previewUrl,
        trackTimeMillis: r.trackTimeMillis,
      }));

    setQueue(queue);
  };

  const resultCount = useMemo(() => results.length, [results]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white pb-24">
        <NavBar />
        <main className="container py-10">
          <div className="mb-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">🎵 Music Player</p>
                <h1 className="mt-3 text-4xl font-semibold">Search and play songs</h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="input w-full min-w-[280px] flex-1"
                  placeholder="Search for songs or artists..."
                />
                <button type="button" onClick={() => setTerm(query || 'coldplay')} className="button">
                  Search
                </button>
              </div>
            </div>
            <p className="mt-4 text-slate-400">{resultCount} results found for "{term}".</p>
          </div>

          {searching ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-20 rounded-lg bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-12 text-center">
              <Music size={48} className="mx-auto mb-4 text-slate-500" />
              <p className="text-slate-400">No songs found. Try a different search query.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((song, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 rounded-lg border p-3 transition-all cursor-pointer ${
                    currentTrack?.id === (song.trackId || song.collectionId)
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-white/10 bg-slate-900/50 hover:border-white/20 hover:bg-slate-900/80'
                  }`}
                  onClick={() => handlePlaySong(song)}
                >
                  {/* Artwork */}
                  <img
                    src={song.artworkUrl100 || song.artworkUrl600 || '/placeholder.png'}
                    alt={song.trackName || 'Song'}
                    className="h-16 w-16 rounded object-cover"
                  />

                  {/* Song Info */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="truncate font-semibold text-white">{song.trackName || song.collectionName || 'Unknown'}</p>
                    <p className="truncate text-sm text-slate-400">{song.artistName || 'Unknown Artist'}</p>
                    {song.collectionName && song.trackName && (
                      <p className="truncate text-xs text-slate-500">{song.collectionName}</p>
                    )}
                  </div>

                  {/* Duration */}
                  {song.trackTimeMillis && (
                    <p className="text-sm text-slate-400">
                      {Math.floor(song.trackTimeMillis / 60000)}:
                      {String(Math.floor((song.trackTimeMillis % 60000) / 1000)).padStart(2, '0')}
                    </p>
                  )}

                  {/* Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaySong(song);
                    }}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                    title="Play"
                  >
                    <Play size={20} fill="currentColor" className="ml-0.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
