import { SpotifyAlbumsResponse } from "@/types/spotify";

export default async function FetchAlbums(
  artistId: string,
  include_groups: string[] = ["album", "single"]
) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/spotify/album/${artistId}`;

  const params = new URLSearchParams();

  if (include_groups) {
    params.append("include_groups", include_groups.join(","));
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch albums: ${response.statusText}`);
  }

  const data: SpotifyAlbumsResponse = await response.json();

  return data;
}
