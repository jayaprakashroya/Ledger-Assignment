'use client';

export const dynamic = 'force-dynamic';

import { Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import NavBar from '../../components/NavBar';
import RatingStars from '../../components/RatingStars';
import { libraryApi } from '../../lib/api';
import { useAuthStore } from '../../lib/store';

export default function LibraryPage() {
  const token = useAuthStore((state) => state.token);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftRating, setDraftRating] = useState(4);
  const [draftNotes, setDraftNotes] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');

  useEffect(() => {
    if (!token) return;
    loadLibrary();
  }, [token]);

  const loadLibrary = async () => {
    setLoading(true);
    try {
      const response = await libraryApi.getLibrary();
      setItems(response || []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not load library');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setDraftRating(item.user_rating || 4);
    setDraftNotes(item.user_notes || '');
  };

  const handleSave = async (id: string) => {
    try {
      await libraryApi.updateItem(id, {
        apple_catalog_id: items.find((item) => item.id === id)?.apple_catalog_id,
        title: items.find((item) => item.id === id)?.title,
        artist_name: items.find((item) => item.id === id)?.artist_name,
        genre: items.find((item) => item.id === id)?.genre,
        release_date: items.find((item) => item.id === id)?.release_date,
        track_count: items.find((item) => item.id === id)?.track_count,
        artwork_url: items.find((item) => item.id === id)?.artwork_url,
        collection_price: items.find((item) => item.id === id)?.collection_price,
        user_rating: draftRating,
        user_notes: draftNotes,
      });
      toast.success('Updated successfully');
      setEditingId(null);
      await loadLibrary();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Remove this album from your library?');
    if (!confirmed) return;
    try {
      await libraryApi.deleteItem(id);
      toast.success('Removed from library');
      await loadLibrary();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Delete failed');
    }
  };

  const genres = useMemo(() => {
    return ['All', ...Array.from(new Set(items.map((item) => item.genre || 'Unknown')))].sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (genreFilter !== 'All' && (item.genre || 'Unknown') !== genreFilter) {
        return false;
      }
      if (ratingFilter !== 'All' && String(item.user_rating || 'Unrated') !== ratingFilter) {
        return false;
      }
      return true;
    });
  }, [genreFilter, ratingFilter, items]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="container py-10">
          <div className="mb-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Your library</p>
                <h1 className="mt-3 text-4xl font-semibold">Saved albums.</h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <select className="input max-w-[180px]" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                <select className="input max-w-[180px]" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                  <option value="All">All ratings</option>
                  <option value="Unrated">Unrated</option>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={String(rating)}>{rating} stars</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="card h-72" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="card grid min-h-[320px] place-items-center text-center">
              <div>
                <p className="text-2xl font-semibold">Your library is empty.</p>
                <p className="mt-3 text-slate-400">Save albums from the search page to build your collection.</p>
                <a href="/search" className="button mt-6 inline-flex">
                  Go search
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="card space-y-4">
                  <img src={item.artwork_url || '/placeholder.png'} alt={item.title} className="h-64 w-full rounded-3xl object-cover" />
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">{item.genre || 'Unknown genre'}</p>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-slate-400">{item.artist_name}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{item.release_date ? new Date(item.release_date).getFullYear() : 'Unknown'}</span>
                      <span>{item.track_count ? `${item.track_count} tracks` : 'No tracks'}</span>
                    </div>
                    <div className="space-y-3">
                      {editingId === item.id ? (
                        <div className="space-y-3">
                          <div>
                            <p className="label mb-2">Rating</p>
                            <RatingStars value={draftRating} onChange={setDraftRating} />
                          </div>
                          <div>
                            <p className="label mb-2">Notes</p>
                            <textarea
                              className="input h-28"
                              value={draftNotes}
                              onChange={(e) => setDraftNotes(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button type="button" onClick={() => handleSave(item.id)} className="button">
                              Save
                            </button>
                            <button type="button" onClick={() => setEditingId(null)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Rating</p>
                              <p className="text-lg font-semibold text-white">{item.user_rating ?? 'Unrated'}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Notes</p>
                              <p className="text-sm text-slate-300">{item.user_notes || 'No notes yet'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => handleEdit(item)} className="button flex-1">
                              Edit
                            </button>
                            <button type="button" onClick={() => handleDelete(item.id)} className="inline-flex h-12 items-center justify-center rounded-full bg-rose-500 px-4 text-sm font-semibold text-white transition hover:bg-rose-400">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }
