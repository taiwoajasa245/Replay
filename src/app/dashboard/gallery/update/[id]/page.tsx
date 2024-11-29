import React, { Suspense } from "react";
import Loading from "@/components/Gallery/Loading";
import UpdateGalleryComponent from "@/components/Gallery/UpdateGalleryComponent";
import { fetchGalleryDetails } from "@/utils/GalleryAction";

type GalleryDetailsType = {
  title: string;
  linkActive: boolean;
  galleryId: number;
  qrCode: string;
};

// Server component to fetch gallery data
async function GalleryDetailsFetcher({ id }: { id: string }) {
  let getGalleriesDetails: unknown;
  let errorMessage = "";

  try {
    getGalleriesDetails = await fetchGalleryDetails(id);
    if (!getGalleriesDetails || !(getGalleriesDetails as { data: GalleryDetailsType }).data) {
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
    <UpdateGalleryComponent
      id={id}
      galleryDetailsData={(getGalleriesDetails as { data: GalleryDetailsType }).data}
    />
  );
}

export default function UpdateGalleryPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <GalleryDetailsFetcher id={params.id} />
    </Suspense>
  );
}
