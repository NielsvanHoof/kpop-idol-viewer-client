"use client";

import { useAudioStore } from "@/state/audio";
import { Button, Input } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    FaPause,
    FaPlay,
    FaVolumeDown,
    FaVolumeMute,
    FaVolumeUp,
} from "react-icons/fa";

export default function GlobalAudioController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [previousVolume, setPreviousVolume] = useState(1); // Track the previous volume for mute/unmute

  // Zustand state and actions
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    setIsPlaying,
    setProgress,
    setDuration,
    setVolume,
  } = useAudioStore();

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, [setDuration]);

  const updateProgress = useCallback(() => {
    if (audioRef.current && audioRef.current.duration) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  }, [setProgress]);

  useEffect(() => {
    const audioElement = audioRef.current;

    // When `currentSong` changes, load the new song and set up event listeners
    if (audioElement && currentSong) {
      audioElement.src = currentSong.preview_url;
      setProgress(0); // Reset progress
      setDuration(0); // Reset duration
      audioElement.load(); // Load the audio file
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioElement.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [
    currentSong,
    handleLoadedMetadata,
    updateProgress,
    setProgress,
    setDuration,
  ]);

  // Control play/pause based on `isPlaying`
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sync `volume` changes with `audioRef` volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setPreviousVolume(newVolume); // Update previous volume when setting a new one
  };

  // Toggle mute/unmute when clicking the volume icon
  const toggleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume); // Unmute and restore previous volume
    } else {
      setPreviousVolume(volume); // Save current volume before muting
      setVolume(0); // Mute
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <FaVolumeMute />;
    if (volume > 0 && volume <= 0.3) return <FaVolumeDown />;
    if (volume > 0.3 && volume <= 0.7) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentSong) return null;

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-0 right-0 bg-gradient-to-r from-purple-700 to-purple-500 p-4 rounded-xl shadow-lg text-white flex items-center justify-between max-w-7xl mx-auto space-x-4"
        >
          <div className="flex items-center space-x-4">
            <Image
              src={currentSong.album.images[0].url}
              alt={currentSong.name}
              width={50}
              height={50}
              className="rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold">{currentSong.name}</h3>
              <p className="text-sm text-gray-200">
                {currentSong.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-purple-100"
          >
            {isPlaying ? (
              <FaPause className="text-purple-700 w-5 h-5" />
            ) : (
              <FaPlay className="text-purple-700 w-5 h-5" />
            )}
          </Button>

          <div className="flex-1">
            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-300">
                {formatTime((progress / 100) * duration)}
              </span>
              <Input
                type="range"
                min="0"
                max="100"
                value={isNaN(progress) ? 0 : progress}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setProgress(value);
                  if (audioRef.current) {
                    audioRef.current.currentTime =
                      (value / 100) * audioRef.current.duration;
                  }
                }}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <span className="text-xs text-gray-300">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="hover:text-gray-300">
              {getVolumeIcon()}
            </button>
            <Input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-300 rounded-lg cursor-pointer accent-purple-600"
            />
          </div>

          <audio ref={audioRef} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
