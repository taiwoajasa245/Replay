'use client'; 

import React, { useState } from "react";
import Image from "next/image";
import { saveAs } from "file-saver";

type ImageModalProps = {
  isOpen: boolean;
  selectedImage: { link: string; fileId: number } | null;
  onClose: () => void;
  onDelete: (fileId: number) => void;
};



export default function ImageModal({
  isOpen,
  selectedImage,
  onClose,
  onDelete,
}: ImageModalProps) {
    const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  if (!isOpen || !selectedImage) return null;



  const downloadWithProgress = async (url: string, fileName: string) => {
    setDownloadProgress(0);
    try {
      const response = await fetch(url);
      const contentLength = response.headers.get("content-length");

      if (!response.body || !contentLength) {
        throw new Error("Unable to fetch file or determine file size");
      }

      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          chunks.push(value);
          loaded += value.length;
          setDownloadProgress((loaded / total) * 100);
        }
      }

      const blob = new Blob(chunks);
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadProgress(null);
    }
  };


  const handleDelete = () => { 
    onDelete(selectedImage.fileId); 
    onClose(); 
  }

  return (
    <div
      className="fixed  inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className=" p-4  max-w-4xl mx-auto overflow-auto scrollbar-hide  max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to close modal
      >
        {/* Top Buttons */}
        <div className="flex justify-end items-center gap-3 mb-4">
          {/* Delete Button */}
          <button onClick={handleDelete}>
            <Image
              src="/delete-image-icon.svg"
              alt="Delete button"
              width={20}
              height={20}
              className="w-4 md:w-5"
            />
          </button>

          {/* Download Button */}
          <button
            onClick={() =>
              downloadWithProgress(selectedImage.link, `image-${selectedImage.fileId}.png`)
            }
            className="flex items-center gap-2"
          >
            <Image
              src="/download_button.svg"
              alt="Download button"
              width={20}
              height={20}
              className="w-4 md:w-5"
            />
          </button>
        </div>

          {/* Progress Bar */}
          {downloadProgress !== null && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        )}

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src={selectedImage.link}
            alt="Full view"
            width={800}
            height={600}
            className="max-w-full max-h-[80vh] object-contain rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
