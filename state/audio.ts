// audioStore.ts
import { SpotifyTrack } from "@/types/spotify";
import { create } from "zustand";

interface AudioState {
  currentSong: SpotifyTrack | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  setCurrentSong: (song: SpotifyTrack) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  currentSong: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  duration: 0,

  setCurrentSong: (song) =>
    set({ currentSong: song, progress: 0, duration: 0 }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
}));
