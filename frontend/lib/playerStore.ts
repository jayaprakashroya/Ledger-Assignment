import { create } from 'zustand';

export type Track = {
  id: string;
  title: string;
  artist: string;
  artwork_url?: string;
  preview_url?: string;
  trackTimeMillis?: number;
};

type PlayerStore = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Track[];
  queueIndex: number;

  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (track: Track) => void;
  setQueue: (tracks: Track[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayer: () => void;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  queue: [],
  queueIndex: 0,

  playTrack: (track: Track) => {
    set({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      queueIndex: get().queue.findIndex((t) => t.id === track.id),
    });
  },

  pauseTrack: () => {
    set({ isPlaying: false });
  },

  togglePlay: () => {
    set((state) => ({
      isPlaying: !state.isPlaying,
    }));
  },

  setCurrentTime: (time: number) => {
    set({ currentTime: time });
  },

  setDuration: (duration: number) => {
    set({ duration });
  },

  setVolume: (volume: number) => {
    set({ volume });
  },

  addToQueue: (track: Track) => {
    set((state) => ({
      queue: [...state.queue, track],
    }));
  },

  setQueue: (tracks: Track[]) => {
    set({
      queue: tracks,
      queueIndex: 0,
    });
  },

  playNext: () => {
    const state = get();
    const nextIndex = state.queueIndex + 1;
    if (nextIndex < state.queue.length) {
      const nextTrack = state.queue[nextIndex];
      set({
        currentTrack: nextTrack,
        isPlaying: true,
        currentTime: 0,
        queueIndex: nextIndex,
      });
    } else {
      set({
        currentTrack: null,
        isPlaying: false,
      });
    }
  },

  playPrevious: () => {
    const state = get();
    if (state.currentTime > 3) {
      set({ currentTime: 0 });
    } else if (state.queueIndex > 0) {
      const prevIndex = state.queueIndex - 1;
      const prevTrack = state.queue[prevIndex];
      set({
        currentTrack: prevTrack,
        isPlaying: true,
        currentTime: 0,
        queueIndex: prevIndex,
      });
    }
  },

  clearPlayer: () => {
    set({
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      queue: [],
      queueIndex: 0,
    });
  },
}));
