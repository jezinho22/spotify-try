import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function getData() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "User not found" });
  }

  // Get the OAuth access token for the user
  const provider = 'oauth_spotify';

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );

  // slight error in the sample code - it is .data[0].token, not just [0].token
  const accessToken = clerkResponse.data[0].token;

  // Fetch the user data from the Notion API
  // This endpoint fetches a list of users
  // https://developers.notion.com/reference/get-users
  const url = "https://api.spotify.com/v1/me/top/tracks";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  });

  // Handle the response from the Notion API
  const notionData = await response.json();

  return notionData;
}