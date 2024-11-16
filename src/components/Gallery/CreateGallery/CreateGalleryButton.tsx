import { addGallery } from "@/utils/GalleryAction";
import React, { useState } from "react";

type GalleryDataProps = {
  galleryData: string;
};

export default function CreateGalleryButton({ galleryData }: GalleryDataProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await addGallery(galleryData);
      if (response) {
        setSuccess(true); 
      }
    } catch (error) {
      console.error(error); 
      setError("Failed to create gallery. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCreateGallery}
        className="px-12 py-2 md:px-10 md:py-2 rounded-[20px] text-[15px] md:text-[20px] text-white bg-[#305041] transition duration-300 hover:bg-[#426d57]"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Gallery"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Gallery created successfully!</p>}
    </div>
  );
}
