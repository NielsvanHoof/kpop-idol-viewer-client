import { SpotifyArtist } from "@/types/spotify";

export default async function fetchArtist(artistId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/spotify/artist/${artistId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch artist data: ${response.statusText}`);
  }

  const data: SpotifyArtist = await response.json();
  return data;
}
