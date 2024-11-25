import GalleryIdComponent from "@/components/Gallery/GalleryById";
import { fetchGalleryData } from "@/utils/GalleryAction";
import React, { Suspense } from "react";
import Loading from "@/components/Gallery/Loading";

type GalleryData = {
  title: string;
  fileCount: number;
  galleryLink: string;
  galleryId: number;
  files: { link: string; fileId: number }[];
};

// Server component to fetch gallery data
async function GalleryDataFetcher({ id }: { id: string }) {
  let getGalleries: unknown;
  let errorMessage = "";

  try {
    getGalleries = await fetchGalleryData(id);
    if (!getGalleries || !(getGalleries as { data: GalleryData }).data) {
      throw new Error("Failed to load galleries");
    }
  } catch (error) {
    console.error("Error fetching galleries:", error);
    errorMessage =
      "Sorry, we couldn't load the galleries at this time. check your internet and try again later.";
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">{errorMessage}</p>
      </div>
    );
  }

  return (
    <GalleryIdComponent
      id={id}
      galleryData={(getGalleries as { data: GalleryData }).data}
    />
  );
}

export default function GalleryIdPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <GalleryDataFetcher id={params.id} />
    </Suspense>
  );
}
