"use client";

import BackButton from "@/components/Gallery/BackButton";
import UploadModal from "@/components/Gallery/UploadModal";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../DeleteComfirmationModal";
import ImageModal from "../ImageModal";

type FileData = { link: string; fileId: number };

type PublicGalleryData = {
  title: string;
  linkActive: boolean;
  galleryId: string;
  files: FileData[];
};

export default function PublicGalleryIdComponent({
  publicGalleryData: initialGalleryData,
}: {
  publicGalleryData: PublicGalleryData;
}) {
  const [galleryData, setGalleryData] =
    useState<PublicGalleryData>(initialGalleryData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<FileData | null>(null);

  const handleImageClick = (file: FileData) => {
    setSelectedImage(file);
    setIsImageModalOpen(true);
  };


  

  const handleFilesUploaded = (uploadedFiles: FileData[]) => {
    setGalleryData((prevData) => {
      // Filter out files that already exist in the current gallery data
      const newFiles = uploadedFiles.filter(
        (uploadedFile) =>
          !prevData.files.some((existingFile) => existingFile.fileId === uploadedFile.fileId)
      );

  
      return {
        ...prevData,
        files: [...prevData.files, ...newFiles],
      };
    });
  
    setIsUploadModalOpen(false); 
  };
  


  const openDeleteModal = (fileId: number) => {
    setFileToDelete(fileId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDelete !== null) handleDelete(fileToDelete);
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleDelete = async (fileId: number) => {
    try {
      const response = await fetch(`/api/image/delete/${fileId}`, {
        method: "DELETE",
        cache: "no-cache",
      });

      if (response.ok) {
        setGalleryData((prevData) => ({
          ...prevData,
          files: prevData.files.filter((file) => file.fileId !== fileId),
        }));
        toast.success("Image deleted successfully.");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to delete image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("An error occurred while deleting the image.");
    }
  };

  return (
    <div className="w-full p-2 px-4 md:p-9 h-full">
      {/* back buttton  */}
      <div className="my-4 md:my-0">
        <BackButton href="/dashboard" />
      </div>

      {/* Gallery Title  */}
      <div className="w-full flex flex-col items-center mt-5 md:mt-0">
        <p className=" text-center font-medium text-3xl md:text-5xl">
          {galleryData.title}
        </p>
      </div>

      {/* Upload Button  */}
      <div className="grid justify-end items-center  sticky  top-[29rem] md:top-[27.5rem] right-5 z-10">
        <button
          onClick={handleUploadClick}
          className=" px-6  md:px-12 py-2 rounded-[15px] text-[15px] md:text-[20px] text-white bg-[#305041] hover:bg-[#426d57]"
        >
          Upload Image
        </button>
      </div>

      {isUploadModalOpen && (
        <UploadModal
          isModalOpen={isUploadModalOpen}
          setIsModalOpen={setIsUploadModalOpen}
          id={galleryData.galleryId}
          url="/api/public/gallery"
          onFilesUploaded={handleFilesUploaded}
        />
      )}

      {/* Files or Images */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-7 ">
        {galleryData.files.length > 0 ? (
          galleryData.files
            .slice()
            .reverse()
            .map((file, index) => (
              <div
                key={file.fileId}
                className="relative md:max-w-xs md:overflow-hidden md:bg-cover md:bg-no-repeat"
              >
                <Image
                  src={file.link}
                  alt="Gallery image"
                  width={300}
                  height={300}
                  onLoad={() =>
                    index === galleryData.files.length - 1 && setLoading(false)
                  }
                  className="rounded-md cursor-pointer md:max-w-xs transition duration-300 md:ease-in-out hover:scale-110"
                  onClick={() => handleImageClick(file)}
                />
              </div>
            ))
        ) : (
          <p className="text-center text-lg text-gray-500">
            Click on the upload button to upload your image
          </p>
        )}
        {loading && galleryData.files.length > 0 && (
          <p className="text-center text-xl text-gray-500">Loading images...</p>
        )}
      </div>

      {/* Image Modal */}
      {isImageModalOpen && selectedImage && (
        <ImageModal
          isOpen={isImageModalOpen}
          selectedImage={selectedImage}
          onClose={() => setIsImageModalOpen(false)}
          onDelete={openDeleteModal}
          showIsDeleteButton={false}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        value="image"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        fallBackUrl={`/dashboard/gallery/${galleryData.galleryId}`}
      />
    </div>
  );
}
