import GalleryIdComponent from "@/components/Gallery/GalleryById";
import { fetchGalleryData } from "@/utils/GalleryAction";
import React from "react";

export default async function GalleryIdPage({ params }: { params: { id: string } }) {
  let getGalleries;
  let errorMessage = "";

  try {
    getGalleries = await fetchGalleryData(params.id);
    if (!getGalleries || !getGalleries.data) {
      throw new Error("Failed to load galleries");
    }
  } catch (error) {
    console.error("Error fetching galleries:", error);
    errorMessage =
      "Sorry, we couldn't load the galleries at this time. check you internet and try again later.";
  }

  return (
    <div>
      {errorMessage ? (
        <p className="text-red-500 text-center">{errorMessage}</p>
      ) : (
        <GalleryIdComponent id={params.id}  galleryData={getGalleries.data} />
      )}
    </div>
  );
}
