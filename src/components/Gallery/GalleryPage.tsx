'use client'

import { useSession } from "next-auth/react"
import GalleryCard from "./GalleryCard";

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

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {galleries.length > 0 ? (
        galleries.map((gallery) => (
          <p key={gallery.galleryId}> <GalleryCard title={gallery.title} file={gallery.fileCount} /> </p>
        ))
      ) : (
        <p className="flex flex-col items-center justify-center h-full min-h-screen bg-white">You have not created any Gallery</p>
      )}

      
    </div>
  );
}
