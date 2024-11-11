// app/api/spotify/artist/[artistId]/route.ts
import { SpotifyAlbumsResponse } from "@/types/spotify";
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

    // Fetch the artist data using the token
    const artistResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!artistResponse.ok) {
      throw new Error(
        `Failed to fetch artist album data: ${artistResponse.statusText}`
      );
    }

    const artistData: SpotifyAlbumsResponse = await artistResponse.json();
    return NextResponse.json(artistData);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch artist album data", errorMessage },
      { status: 500 }
    );
  }
}
