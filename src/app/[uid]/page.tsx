
import React, { Suspense } from "react";
import Loading from "@/components/Gallery/Loading";
import { fetchPublicGalleryData } from "@/utils/GalleryAction";
import PublicGalleryIdComponent from "@/components/Gallery/PublicComponent/PublicGalleryComponent";

type PublicGalleryData = {
  title: string;
  linkActive: boolean;
  galleryId: string;
  files: { link: string; fileId: number }[];
};

// Server component to fetch gallery data
async function PublicGalleryDataFetcher({ uid }: { uid: string }) {
  let getPublicGalleries: unknown;
  let errorMessage = "";

  

  try {
    getPublicGalleries = await fetchPublicGalleryData(uid);
    if (
      !getPublicGalleries ||
      !(getPublicGalleries as { data: PublicGalleryData }).data
    ) {
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
    <PublicGalleryIdComponent
      publicGalleryData={
        (getPublicGalleries as { data: PublicGalleryData }).data
      }
    />
  );
}

export default function UniquePublicGallery({
  params,
}: {
  params: { uid: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <PublicGalleryDataFetcher uid={params.uid} />
    </Suspense>
  );
}
