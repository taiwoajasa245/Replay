import GalleryIdComponent from "@/components/Gallery/GalleryById";
import { fetchGalleryData } from "@/utils/GalleryAction";
import React from "react";

type GalleryData = {
  title: string;
  fileCount: number;
  galleryLink: string;
  galleryId: number;
  files: { link: string; fileId: number }[];
};

export default async function GalleryIdPage({ params }: { params: { id: string } }) {
  let getGalleries: unknown; // Use `unknown` instead of `any`
  let errorMessage = "";

  try {
    getGalleries = await fetchGalleryData(params.id);
    if (!getGalleries || !(getGalleries as { data: GalleryData }).data) {
      throw new Error("Failed to load galleries");
    }
  } catch (error) {
    console.error("Error fetching galleries:", error);
    errorMessage =
      "Sorry, we couldn't load the galleries at this time. check your internet and try again later.";
  }

  return (
    <div>
      {errorMessage ? (
        <p className="text-red-500 text-center">{errorMessage}</p>
      ) : (
        <GalleryIdComponent
          id={params.id}
          galleryData={(getGalleries as { data: GalleryData }).data}
        />
      )}
    </div>
  );
}
