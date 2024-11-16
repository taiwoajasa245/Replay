import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_URL = process.env.API_BASE_URL;


// TODO: clean up code 

async function getSessionToken(): Promise<string> {
  const session = await getServerSession(authOptions) as Session;

  if (!session?.user?.token) {
    throw new Error("Session or token not found. Please log in again.");
  }

  return session.user.token;
}

async function handleApiResponse(response: Response): Promise<JSON> {
  if (!response.ok) {
    const responseData = await response.json();
    const errorMessage = responseData?.message || "Request failed. Please try again.";
    throw new Error( errorMessage);
    // console.log("api message: ", errorMessage);
  }
  return response.json();
}

export async function fetchGalleries(): Promise<unknown | null> {
  try {
    const token = await getSessionToken();

    const response = await fetch(`${API_URL}/api/v1/replay/gallery`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'   
    });

    return await handleApiResponse(response);

  } catch (error) {
    handleError(error, "fetching galleries");
    return null;
  }
}

// fetch galleris by id 


export async function fetchGalleryData(id: string): Promise<unknown | null> {
  try {
    const token = await getSessionToken();

    const response = await fetch(`${API_URL}/api/v1/replay/gallery/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'   
    });

    return await handleApiResponse(response);

  } catch (error) {
    handleError(error, "fetching galleries");
    return null;
  }
}


export async function addGallery(galleryData: string): Promise<unknown | null> {
  try {
    const token = await getSessionToken();


    const response = await fetch(`${API_URL}/api/v1/replay/gallery`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(galleryData),
    });

    return await handleApiResponse(response);

  } catch (error) {
    handleError(error, "adding gallery");
    return null;
  }
}


export async function uploadImage(id: string, imageData: FormData): Promise<unknown | null> {
  try {
    const token = await getSessionToken();

    const response = await fetch(`${API_URL}/api/v1/replay/file/upload/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imageData, 
    });

    return await handleApiResponse(response);
  } catch (error) {
    handleError(error, "uploading imaga");
    return null;
  }
}


export async function deleteImage(id: string): Promise<unknown | null> {
  try {
    const token = await getSessionToken();

    console.log("image id:", id);

    const response = await fetch(`${API_URL}/api/v1/replay/file/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    handleError(error, "uploading imaga");
    return null;
  }
}


function handleError(error: unknown, action: string) {
  if (error instanceof Error) {
    console.error(`${action.charAt(0).toUpperCase() + action.slice(1)} error: ${error.message}`);
  } else {
    console.error(`Unknown error occurred while ${action}: `, error);
  }
}






// async function fetchWithAuth(endpoint: string): Promise<any | null> {
//   try {
//     const token = await getSessionToken();

//     const response = await fetch(`${API_URL}/api/v1/replay/${endpoint}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       cache: "no-store",
//     });

//     return await handleApiResponse(response);
//   } catch (error) {
//     handleError(error, `fetching data from ${endpoint}`);
//     return null;
//   }
// }

// export async function fetchGalleries(): Promise<any | null> {
//   return fetchWithAuth("gallery");
// }

// export async function fetchGalleryData(id: string): Promise<any | null> {
//   return fetchWithAuth(`gallery/${id}`);
// }
