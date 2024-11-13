import { getServerSession } from "next-auth/next";
import type { Session  } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_URL = process.env.API_BASE_URL;

export async function fetchGalleries(): Promise<Session | null > {
  try {
    const session = await getServerSession(authOptions) as Session;

    if (!session || !session?.user?.token) {
      throw new Error("Session or token not found. Please log in again.");
    }

    

    const response = await fetch(`${API_URL}/api/v1/replay/gallery`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      const errorMessage = responseData?.message || "Failed to fetch galleries. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Session or token not found")) {
        console.error("Authentication error: ", error.message);
      } else if (error.message.includes("Failed to fetch galleries")) {
        console.error("API error: ", error.message);
      } else {
        console.error("Unexpected error: ", error.message);
      }
    } else {
      console.error("Network or unknown error: ", error);
    }

    return null;

  }
}
