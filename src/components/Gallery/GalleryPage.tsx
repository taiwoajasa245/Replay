"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GalleryCard from "./GalleryCard";
import { useEffect } from "react";

type Gallery = {
  title: string;
  fileCount: string;
  galleryId: number;
};

type GalleriesProps = {
  galleries: Gallery[];
};

export default function Galleries({ galleries }: GalleriesProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // i had no choice
  // useEffect(() => {
  //   router.refresh();
  // }, []);

  useEffect(() => {
    if (galleries.length > 0) {
      router.refresh();
    }
  }, [router, galleries.length]);
  


  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="flex flex-col h-full animate-fade-down duration-75">
      {galleries.length > 0 ? (
        galleries
          .slice()
          .reverse()
          .map((gallery) => (
            <div
              key={gallery.galleryId}
              onClick={() =>
                router.push(`/dashboard/gallery/${gallery.galleryId}`)
              }
            >
              <GalleryCard title={gallery.title} file={gallery.fileCount} />
            </div>
          ))
      ) : (
        <p className="flex flex-col items-center justify-center h-full min-h-screen bg-white">
          You have not created any Gallery
        </p>
      )}
    </div>
  );
}
