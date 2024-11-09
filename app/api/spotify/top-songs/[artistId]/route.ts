import { SpotifyTrack, SpotifyTrackObject } from "@/types/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const artistId = (await params).artistId;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  try {
    // Fetch the Spotify token from our own API route
    const tokenResponse = await fetch(`${baseUrl}/api/spotify/token`);
    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch token: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    const token = tokenData.access_token;

    // Fetch the artist's top songs using the token and artistId
    const topSongsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!topSongsResponse.ok) {
      throw new Error(
        `Failed to fetch top songs: ${topSongsResponse.statusText}`
      );
    }

    const topSongs: SpotifyTrackObject<SpotifyTrack[]> =
      await topSongsResponse.json();
    return NextResponse.json(topSongs);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch artist data", errorMessage },
      { status: 500 }
    );
  }
}
