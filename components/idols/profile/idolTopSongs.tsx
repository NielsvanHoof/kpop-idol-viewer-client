"use client";

import Error from "@/app/_error";
import fetchTopSongs from "@/queries/spotify/fetchTopSongs";
import { useAudioStore } from "@/state/audio";
import { Idol } from "@/types/models";
import { SpotifyTrack } from "@/types/spotify";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { CiMusicNote1 } from "react-icons/ci";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function IdolTopSongs({ idol }: { idol: Idol }) {
  const { currentSong, isPlaying, setCurrentSong, setIsPlaying } =
    useAudioStore();

  const handlePlayPause = (song: SpotifyTrack) => {
    if (currentSong?.id === song.id) {
      // If the song is already playing, toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // Set the new song and start playing
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const {
    data: topSongs,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["top-songs", idol.spotify_id],
    queryFn: () => fetchTopSongs(idol.spotify_id),
    enabled: !!idol.spotify_id,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="flex items-center bg-white rounded-lg p-4 animate-pulse shadow-md space-x-4 border border-gray-200"
          >
            <div className="w-16 h-16 rounded-md bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <Error message="Failed to fetch top songs" onRetry={refetch} />;
  }

  // Placeholder if there are no top songs
  if (!topSongs?.tracks?.length) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <CiMusicNote1 className="h-16 w-16 text-purple-300 mb-4" />
        <h3 className="text-2xl font-semibold text-purple-700">
          No Top Songs Available
        </h3>
        <p className="text-gray-600 mt-2">
          It seems this idol doesn’t have any top songs available right now.
          Check back later for updates!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4 max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {topSongs?.tracks.map((song) => (
        <motion.div
          key={song.id}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.1 }}
          variants={itemVariants}
          className="flex items-center bg-gradient-to-r from-white to-purple-50 rounded-lg p-4 shadow-lg hover:shadow-xl transition space-x-4 border border-gray-200"
        >
          {/* Album Cover */}
          <div className="relative w-16 h-16 overflow-hidden rounded-lg shadow-inner">
            <Image
              src={song.album.images[0].url}
              width={64}
              height={64}
              alt={song.name}
              className="object-cover"
            />
          </div>

          {/* Song Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{song.name}</h3>
            <p className="text-sm text-gray-500">
              {song.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p className="text-xs text-gray-400">
              Album: {song.album.name} · Released: {song.album.release_date}
            </p>
          </div>

          {/* Play/Pause Button */}
          <Button
            onClick={() => handlePlayPause(song)}
            className="text-purple-600 hover:text-purple-800 transition"
          >
            {currentSong?.id === song.id && isPlaying ? "Pause" : "Play"}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
