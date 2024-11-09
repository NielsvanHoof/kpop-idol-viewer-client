import { SpotifyTrack, SpotifyTrackObject } from "@/types/spotify";

export default async function fetchTopSongs(artistId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/spotify/top-songs/${artistId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch top songs: ${response.statusText}`);
  }

  const data: SpotifyTrackObject<SpotifyTrack[]> = await response.json();
  return data;
}
