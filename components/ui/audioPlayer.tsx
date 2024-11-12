"use client";

import { useAudioStore } from "@/state/audio";
import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
    FaPause,
    FaPlay,
    FaVolumeDown,
    FaVolumeMute,
    FaVolumeUp,
} from "react-icons/fa";

export default function GlobalAudioController() {
  const audioRef = useRef<HTMLAudioElement>(null);

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

  // Metadata loaded event to set duration
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, [setDuration]);

  // Progress update event
  const updateProgress = useCallback(() => {
    if (audioRef.current && audioRef.current.duration) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  }, [setProgress]);

  useEffect(() => {
    const audioElement = audioRef.current;

    // Load metadata and attach event listeners when `currentSong` changes
    if (audioElement && currentSong) {
      audioElement.src = currentSong.preview_url;
      setProgress(0); // Reset progress
      setDuration(0); // Reset duration
      audioElement.load();
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

  // Play or pause the audio when `isPlaying` changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.error("Play error:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
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
    <div className="fixed bottom-0 left-0 right-0 bg-purple-700 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Image
          src={currentSong.album.images[0].url}
          alt={currentSong.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded"
        />
        <div>
          <h3 className="font-semibold">{currentSong.name}</h3>
          <p className="text-sm text-gray-200">
            {currentSong.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>

      {/* Play/Pause Button */}
      <Button
        onClick={() => setIsPlaying(!isPlaying)}
        className="text-white mx-4"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </Button>

      {/* Progress Bar */}
      <div className="flex items-center space-x-2">
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
          className="w-24 md:w-32 h-1 bg-gray-300 rounded-lg cursor-pointer"
        />
        <span className="text-xs text-gray-300">
          {formatTime((progress / 100) * duration)} / {formatTime(duration)}
        </span>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        {getVolumeIcon()}
        <Input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-gray-300 rounded-lg cursor-pointer"
        />
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
