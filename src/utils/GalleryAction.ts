import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
// import { boolean, string } from "zod";

const API_URL = process.env.API_BASE_URL;

// Validate API_URL
if (!API_URL) {
  throw new Error("API_BASE_URL environment variable is not set.");
}

type Gallery = {
  title: string;
  fileCount: string;
  galleryId: number;
};


type FetchGalleryResponse = {
  data: {
    title: string;
    fileCount: number;
    galleryLink: string;
    galleryId: number;
    files: { link: string; fileId: number }[];
  };
};

type GalleriesResponse = {
  data: Gallery[];
};

type Stats = {
  totalGalleries: number; 
  totalFiles: number; 
};

type StatsResponse = {
data: Stats;
};

type User = { 
  photo: string;
  firstName: string,
  lastName: string;
  email: string; 
}

type UserResponse = { 
  data: User; 
}



type ChangePasswordResponse = {
  status: string,
  message: string,
  data: string
}

type GalleryDetailsResponse = { 
  
    title: string,
    linkActive: boolean,
    galleryId: number,
    qrCode: string
}

type PublicGalleryDataResponse = { 
  title: string;
  linkActive: boolean,
  galleryId: string;
  files: { link: string; fileId: number }[];
}


// Utility function to get the session token
async function getSessionToken(): Promise<string> {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session?.user?.token) {
    throw new Error("Session or token not found. Please log in again.");
  }

  return session.user.token;
}

// Utility function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const responseData = await response.json();
    const errorMessage = responseData?.message || "An error occurred. Please try again.";
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}

// Common fetch utility with authorization
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getSessionToken();

  const response = await fetch(`${API_URL}/api/v1/replay/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache", 
  });

  return await handleApiResponse<T>(response);
}


// fetch utility function without authorization
async function fetchWithOutAuth<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  
  const response = await fetch(`${API_URL}/api/v1/replay/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
    },
    cache: "no-cache", 
  });

  return await handleApiResponse<T>(response);
}
  


// Fetch galleries
export async function fetchGalleries(): Promise<GalleriesResponse | null> {
  try {
    return await fetchWithAuth<GalleriesResponse>("gallery");
  } catch (error) {
    handleError(error, "fetching galleries");
    return null;
  }
}

// Fetch a single gallery by ID
export async function fetchGalleryData(id: string): Promise<FetchGalleryResponse | null> {
  try {
    return await fetchWithAuth<FetchGalleryResponse>(`gallery/${id}`);
  } catch (error) {
    handleError(error, "fetching gallery data");
    return null;
  }
}

// GET gallery details by ID
export async function fetchGalleryDetails(id: string): Promise<GalleryDetailsResponse | null> {
  try {
    return await fetchWithAuth<GalleryDetailsResponse>(`gallery/details/${id}`);
  } catch (error) {
    handleError(error, "fetching gallery details data");
    return null;
  }
}

// Get public Gallery data
export async function fetchPublicGalleryData(uid: string): Promise<PublicGalleryDataResponse | null> {
  try {
    return await fetchWithOutAuth<PublicGalleryDataResponse>(`public/gallery/${uid}`);
  } catch (error) {
    handleError(error, "fetching public gallery details data");
    return null;
  }
}

// POST or UPLOAD public files 
export async function uploadPublicImage(
  id: string,
  imageData: FormData
): Promise<{ status: string } | null> {
  try {
    return await fetchWithOutAuth<{ status: string }>(`public/upload/${id}`, {
      method: "POST",
      body: imageData,
    });
  } catch (error) {
    handleError(error, "uploading public image");
    return null;
  }
}


// Add a new gallery
export async function addGallery(galleryData:  string ): Promise<Gallery | null> {
  try {
    return await fetchWithAuth<Gallery>("gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(galleryData),
    });
  } catch (error) {
    handleError(error, "adding gallery");
    return null;
  }
}


// Edit gallery by Id
export async function editGallery(id: string , galleryData: { title: string, linkActive: boolean }): Promise<Gallery | null> {
  try {
    return await fetchWithAuth<Gallery>(`gallery/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(galleryData),
    });
  } catch (error) {
    handleError(error, "adding gallery");
    return null;
  }
}


// Delete Gallery by ID
export async function deleteGallery(id: string): Promise<{ message: string } | null> {
  try {
    return await fetchWithAuth<{ message: string }>(`gallery/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    handleError(error, "deleting gallery");
    return null;
  }
}


// Upload an image to a gallery
export async function uploadImage(
  id: string,
  imageData: FormData
): Promise<{ status: string } | null> {
  try {
    return await fetchWithAuth<{ status: string }>(`file/upload/${id}`, {
      method: "POST",
      body: imageData,
    });
  } catch (error) {
    handleError(error, "uploading image");
    return null;
  }
}

// Delete an image by ID
export async function deleteImage(id: string): Promise<{ message: string } | null> {
  try {
    return await fetchWithAuth<{ message: string }>(`file/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    handleError(error, "deleting image");
    return null;
  }
}

// fetch Stats 
export async function fetchStats(): Promise<StatsResponse | null> {
  try {
    return await fetchWithAuth<StatsResponse>("stats");
  } catch (error) {
    handleError(error, "fetching Stats");
    return null;
  }
}

export async function fetchUserDetails(): Promise<UserResponse | null> {
  try {
    return await fetchWithAuth<UserResponse>("user");
  } catch (error) {
    handleError(error, "fetching User Details");
    return null;
  }
}

// edit user details 
export async function editUserDetails(
  userData: FormData
): Promise<{ status: string } | null> {
  try {
    return await fetchWithAuth<{ status: string }>('user', {
      method: "PATCH",
      body: userData,
    });
  } catch (error) {
    handleError(error, "uploading user data ");
    return null;
  }
}

// change user password 
export async function changeUserPassword(
  userData: { oldPassword: string, newPassword: string}
): Promise<ChangePasswordResponse | string> {
  try {
    return await fetchWithAuth<ChangePasswordResponse>('user/change-password', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (error: unknown) {
    handleError(error, "changing user password ");
    return error instanceof Error ? error.message : "Old password is incorrect";
  }
}



// Error handling utility
function handleError(error: unknown, action: string) {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred.";
  console.error(`${action.charAt(0).toUpperCase() + action.slice(1)} error: ${errorMessage}`);
}
