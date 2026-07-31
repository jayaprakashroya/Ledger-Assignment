'use client';

import { Pause, Play, Plus } from 'lucide-react';

type AlbumCardProps = {
  album: any;
  onAdd?: () => void;
  actionLabel?: string;
  disabled?: boolean;
};

import { useEffect, useState } from 'react';
import { usePlayerStore, type Track } from '../lib/playerStore';

export default function AlbumCard({ album, onAdd, actionLabel = 'Add to Library', disabled }: AlbumCardProps) {
  const { currentTrack, isPlaying, playTrack, pauseTrack, togglePlay } = usePlayerStore();
  const [localIsPlaying, setLocalIsPlaying] = useState(false);

  const isCurrentTrack = currentTrack?.id === String(album.apple_catalog_id || album.id);

  const handlePlayAlbum = () => {
    if (!album.preview_url) return;

    const track: Track = {
      id: String(album.apple_catalog_id || album.id || Date.now()),
      title: album.title,
      artist: album.artist_name,
      artwork_url: album.artwork_url,
      preview_url: album.preview_url,
    };

    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  useEffect(() => {
    if (isCurrentTrack) {
      setLocalIsPlaying(isPlaying);
    } else {
      setLocalIsPlaying(false);
    }
  }, [isCurrentTrack, isPlaying]);

  return (
    <div className="card space-y-4">
      <div className="relative">
        <img src={album.artwork_url || '/placeholder.png'} alt={album.title} className="h-64 w-full rounded-3xl object-cover" />
        {album.preview_url && (
          <button
            onClick={handlePlayAlbum}
            className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/0 transition-all hover:bg-black/40"
          >
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${isCurrentTrack && isPlaying ? 'bg-green-500' : 'bg-green-500/80 hover:bg-green-500'}`}>
              {isCurrentTrack && localIsPlaying ? (
                <Pause size={32} fill="currentColor" />
              ) : (
                <Play size={32} fill="currentColor" className="ml-1" />
              )}
            </div>
          </button>
        )}
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">{album.genre || 'Unknown genre'}</p>
          <h3 className="text-xl font-semibold text-white">{album.title}</h3>
          <p className="text-sm text-slate-400">{album.artist_name}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>{album.release_date ? new Date(album.release_date).getFullYear() : 'Unknown year'}</span>
          <span>{album.track_count ? `${album.track_count} tracks` : 'No tracks'}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {album.preview_url && (
          <button
            type="button"
            onClick={handlePlayAlbum}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isCurrentTrack && localIsPlaying
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            {isCurrentTrack && localIsPlaying ? (
              <>
                <Pause size={16} />
                Pause
              </>
            ) : (
              <>
                <Play size={16} className="ml-0.5" />
                Play preview
              </>
            )}
          </button>
        )}

        {onAdd && (
          <button
            type="button"
            disabled={disabled}
            onClick={onAdd}
            className="ml-auto flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={16} />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
