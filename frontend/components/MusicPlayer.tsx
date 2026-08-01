'use client';

import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../lib/playerStore';

export default function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playNext,
    playPrevious,
    setCurrentTime,
    setDuration,
    setVolume,
    pauseTrack,
    togglePlay,
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showVolume, setShowVolume] = useState(false);

  // Handle audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.preview_url) return;

    audio.src = currentTrack.preview_url;
    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch((e) => console.error('Playback error:', e));
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [currentTrack, isPlaying, volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    playNext();
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-slate-900/95 backdrop-blur-md">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="container mx-auto px-4 py-4">
        {/* Progress Bar */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-slate-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="flex-1 cursor-pointer rounded-full"
            style={{
              background: `linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) ${
                duration ? (currentTime / duration) * 100 : 0
              }%, rgb(30, 41, 59) ${duration ? (currentTime / duration) * 100 : 0}%, rgb(30, 41, 59) 100%)`,
            }}
          />
          <span className="text-xs text-slate-400">{formatTime(duration)}</span>
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex flex-1 items-center gap-3 overflow-hidden">
            {currentTrack.artwork_url && (
              <img
                src={currentTrack.artwork_url}
                alt={currentTrack.title}
                className="h-14 w-14 rounded object-cover"
              />
            )}
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-white">{currentTrack.title}</p>
              <p className="truncate text-xs text-slate-400">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={playPrevious}
              className="rounded-full p-2 hover:bg-white/10 transition-colors"
              title="Previous"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>

            <button
              onClick={playNext}
              className="rounded-full p-2 hover:bg-white/10 transition-colors"
              title="Next"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowVolume(!showVolume)}
                className="rounded-full p-2 hover:bg-white/10 transition-colors"
              >
                {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              {showVolume && (
                <div className="absolute bottom-full right-0 mb-2 flex flex-col items-center gap-2 rounded-lg bg-slate-800 p-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-24 w-2 rotate-180 cursor-pointer rounded-full"
                    style={{
                      background: `linear-gradient(to top, rgb(34, 197, 94) 0%, rgb(34, 197, 94) ${
                        volume * 100
                      }%, rgb(30, 41, 59) ${volume * 100}%, rgb(30, 41, 59) 100%)`,
                    } as React.CSSProperties}
                    // @ts-ignore - orient is a valid HTML input attribute for styling
                  />
                  <span className="text-xs text-slate-400">{Math.round(volume * 100)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
