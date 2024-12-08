"use client";

import BackButton from "@/components/Gallery/BackButton";
import DeleteConfirmationModal from "@/components/Gallery/DeleteComfirmationModal";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

type GalleryDetailsType = {
  title: string;
  linkActive: boolean;
  galleryId: number;
  qrCode: string;
};

type UpdateGalleryCompProps = {
  id: string;
  galleryDetailsData: GalleryDetailsType;
};

export default function UpdateGalleryComponent({
  id,
  galleryDetailsData,
}: UpdateGalleryCompProps) {
  const [title, settitle] = useState("");
  const [linkActive, setLinkActive] = useState(false);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState<number | null>(null);

  const confirmDelete = () => {
    if (galleryToDelete !== null) return handleDelete(galleryToDelete);
  };

  const openDeleteModal = (galleryId: number) => {
    setGalleryToDelete(galleryId);
    setIsDeleteModalOpen(true);
  };

  async function handleDownloadQR() {
    try {
      // Fetch the QR code image as a Blob
      const response = await fetch(galleryDetailsData.qrCode);
      if (!response.ok) {
        throw new Error("Failed to download the QR code");
      }
  
      const blob = await response.blob();
  
      // Use `file-saver` to trigger the download
      saveAs(blob, "gallery-qr-code.replay.png"); 
    } catch (error) {
      console.error("Error downloading the QR code:", error);
      alert("Failed to download the QR code. Please try again.");
    }
  }

  const handleDelete = async (galleryId: number) => {
    try {
      const response = await fetch(`/api/gallery/${galleryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Gallery deleted successfully.");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to delete gallery.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("An error occurred while deleting the gallery.");
    }
  };

  const handleUpdateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim()) {
      toast.error("Gallery name cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, linkActive }),
      });

      if (!response.ok) {
        throw new Error("Failed to update gallery. Please try again.");
      }

      const result = await response.json();

      if (result.status) {
        toast.success(result.message || "Gallery updated successfully");
        // router.replace(`/dashboard/gallery/${params.id}`);
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-2 px-4 md:p-9">
      {/* back button  */}
      <div>
        <BackButton href={`/dashboard/gallery/${id}`} />
      </div>

      {/* edit galler form  */}
      <form onSubmit={handleUpdateGallery} className=" my-10 ">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-semibold tracking-wider my-2"
          >
            Change Gallery Name:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder={galleryDetailsData.title}
            required
            className="mt-1  rounded-xl w-full md:w-96 px-3 py-2 border border-gray-300 text-black focus:outline-none focus:border-[#305041] focus:z-10 sm:text-lg"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <p className="text-sm md:text-[14px] mt-1 font-medium">
          This name will be visible to others when you share the gallery link
        </p>

        {/* gallery link  */}

        <div className="mt-10">
          <div>
            <label className="block text-lg font-semibold tracking-wider my-4">
              Gallery Link:
            </label>
            <div className="flex gap-4 items-center ">
              <label className="tracking-widest flex items-center font-medium cursor-pointer">
                <input
                  type="radio"
                  name="linkActive"
                  value="true"
                  checked={linkActive === true}
                  onChange={() => setLinkActive(true)}
                  className="mr-2 w-4 h-4 rounded-full appearance-none border border-black checked:bg-[#305041] cursor-pointer  checked:border-black"
                />
                Enable
              </label>
              <label className="flex items-center font-medium tracking-widest cursor-pointer">
                <input
                  type="radio"
                  name="linkActive"
                  value="false"
                  checked={linkActive === false}
                  onChange={() => setLinkActive(false)}
                  className="mr-2 w-4 h-4 rounded-full appearance-none border border-black checked:bg-[#305041] cursor-pointer checked:border-black"
                />
                Disable
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center md:mt-6 mt-20">
          <button
            type="submit"
            className="px-12 py-2 md:px-20 md:py-1 rounded-[20px] text-[15px] md:text-[20px] text-white bg-[#305041] transition duration-300 hover:bg-[#426d57] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {/* Gallery QR-code  */}
      <div className="mt-8">
        <h1 className="block text-lg font-semibold tracking-wider my-2">
          QR Code
        </h1>

        <div>
          <Image
            src={galleryDetailsData.qrCode}
            alt="Gallery QR code"
            width={100}
            height={100}
            className=""
          />
        </div>

        <div className=" flex items-center gap-10">
          <button
            onClick={handleDownloadQR}
            className="px-5 py-1 border border-black rounded-lg font-medium text-lg tracking-wider cursor-pointer hover:bg-black hover:text-white transition-all "
          >
            Download
          </button>
        </div>
      </div>

      {/* delete gallery section  */}
      <div className="mt-8">
        <h1 className="block text-lg font-semibold tracking-wider my-2">
          Delete Gallery
        </h1>

        <div className=" flex items-center gap-10">
          <button
            onClick={() => openDeleteModal(Number(id))}
            className="px-5 py-1 border border-red-500 rounded-lg font-medium text-lg tracking-wider cursor-pointer hover:bg-red-500 hover:text-white transition-all "
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        value="gallery"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        fallBackUrl="/dashboard"
      />
    </div>
  );
}
