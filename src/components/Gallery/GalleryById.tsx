"use client";

import BackButton from "@/components/Gallery/BackButton";
import UploadModal from "@/components/Gallery/UploadModal";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteComfirmationModal";
import Link from "next/link";
import ImageModal from "./ImageModal";

type FileData = { link: string; fileId: number };

type GalleryData = {
  title: string;
  fileCount: number;
  galleryLink: string;
  galleryId: number;
  files: FileData[];
};

export default function GalleryIdComponent({
  id,
  galleryData: initialGalleryData,
}: {
  id: string;
  galleryData: GalleryData;
}) {
  const [galleryData, setGalleryData] =
    useState<GalleryData>(initialGalleryData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<FileData | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(galleryData.galleryLink);
      toast.success("Link Copied!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy link.");
    }
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
        fileCount: prevData.fileCount + newFiles.length,
      };
    });
  
    setIsUploadModalOpen(false); 
  };
  

  const handleImageClick = (file: FileData) => {
    setSelectedImage(file);
    setIsImageModalOpen(true);
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
          fileCount: prevData.fileCount - 1,
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
      <div className="w-full flex flex-col items-center mt-5 md:mt-0">
        <p className=" text-center font-medium text-3xl md:text-5xl">
          {galleryData.title}
        </p>
        <div className="flex items-center justify-center gap-3 my-3 md:my-5">
          <p className="text-xl text-gray-500">
            {galleryData.fileCount} Images
          </p>

          {/* manage button */}

          <Link
            href={`/dashboard/gallery/update/${galleryData.galleryId}`}
            className="flex items-center justify-center gap-2 border rounded-3xl px-3 py-1 cursor-pointer hover:bg-slate-200"
          >
            <Image
              src="/manage-icon.svg"
              alt="Manage button "
              width={20}
              height={20}
              className="w-2.5 md:w-4"
            />
            <p className="text-sm">Manage</p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center my-5">
        {/* gallery link  */}
        <div className="bg-[#F5EEE5] overflow-x-auto scrollbar-hide py-2 px-3 md:py-3 md:px-6 rounded-s-3xl">
          <p className="text-[15px] text-nowrap md:text-2xl ">
            {galleryData.galleryLink}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1 md:gap-2 bg-[#305041] py-2 px-3 md:py-3 md:px-6 rounded-e-3xl hover:bg-[#41725b]"
        >
          <p className=" text-[15px] text-nowrap md:text-2xl text-white font-bold">
            COPY
          </p>
          <Image
            src="/copy-icon.svg"
            alt="Copy"
            width={20}
            height={20}
            className=" w-3 md:w-4"
          />
        </button>
      </div>
      
      {/* Upload Button  */}
      <div className="grid justify-end items-center  sticky  top-[29rem] md:top-[27.5rem] right-5 z-10">
        <button
          onClick={handleUploadClick}
          className=" px-6 md:px-12 py-2 rounded-[15px] text-[15px] md:text-[20px] text-white bg-[#305041] hover:bg-[#426d57]"
        >
          Upload Image
        </button>
      </div>


      {isUploadModalOpen && (
        <UploadModal
          isModalOpen={isUploadModalOpen}
          setIsModalOpen={setIsUploadModalOpen}
          id={id}
          url="/api/file/upload"
          onFilesUploaded={handleFilesUploaded}
        />
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4  gap-3 mt-7 ">
        {galleryData.files.length > 0 ? (
          galleryData.files
            .slice()
            .reverse()
            .map((file, index) => (
              <div key={file.fileId} className="relative  md:max-w-xs md:overflow-hidden md:bg-cover md:bg-no-repeat">
                <Image
                  src={file.link}
                  alt="Gallery image"
                  width={300}
                  height={200}
                  onLoad={() =>
                    index === galleryData.files.length - 1 && setLoading(false)
                  }
                  className="rounded-md cursor-pointer md:max-w-xs transition duration-300 md:ease-in-out md:hover:scale-110"
                  onClick={() => handleImageClick(file)}
                />

                {/* delete image icon
                <button
                  onClick={() => openDeleteModal(file.fileId)}
                  className="absolute cursor-pointer bottom-2 right-2 md:right-5 bg-white  p-2  rounded-full  shadow-lg hover:bg-slate-100"
                >
                  <Image
                    src="/delete-icon.svg"
                    alt="delet button"
                    width={100}
                    height={100}
                    className="w-3"
                  />
                </button> */}
              </div>
            ))
        ) : (
          <p className=" text-center text-lg text-gray-500">
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
          showIsDeleteButton={true}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        value="image"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        fallBackUrl={`/dashboard/gallery/${id}`}
      />
    </div>
  );
}
