"use client";

import Image from "next/image";
// import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

interface UploadModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

// TODO clean up code

export default function UploadModal({
  setIsModalOpen,
  id,
}: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const MAX_FILE_SIZE_MB = 10;

  const handleToast = (text: string) => {
    toast.success(text);
  };

  const validateFiles = (files: FileList | File[]) => {
    const validFiles: File[] = [];
    const imageMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    Array.from(files).forEach((file) => {
      if (!imageMimeTypes.includes(file.type)) {
        setError(`${file.name} is not a supported image type.`);
      } else if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`${file.name} exceeds the 10MB file size limit.`);
      } else {
        validFiles.push(file);
      }
    });

    return validFiles;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Clear previous errors
    if (e.target.files) {
      const validFiles = validateFiles(e.target.files);
      setFiles(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null); // Clear previous errors
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(e.dataTransfer.files);
      setFiles(validFiles);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (files.length === 0) {
      setError("No files selected for upload.");
      setLoading(false);
      return;
    }

    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("photo", file));

      // Make a POST request to  Next.js API route
      const response = await fetch(`/api/file/upload/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(
          responseData?.message || "Failed to upload files. Please try again."
        );
        return;
      }

      const data = await response.json();

      handleToast(data.message || "Upload Successfull");

      setFiles([]);

      setIsModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during file upload:", error);
      setError("An error occurred while uploading files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-[90%] sm:w-full sm:max-w-lg lg:max-w-md">
          <button onClick={handleCloseModal} className="mb-5">
            <Image
              src="/cancel-button.svg"
              alt="upload to cloud icon"
              width={100}
              height={100}
              className="w-4 cursor-pointer"
            />
          </button>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="p-6 sm:p-8 border-2 border-dashed w-full rounded-lg hover:border-[#305041] hover:bg-slate-50"
          >
            <div className="w-full flex justify-center items-center mb-4">
              <Image
                src="/upload-to-cloud-icon.svg"
                alt="upload to cloud icon"
                width={80}
                height={80}
                className="w-12 sm:w-16"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />

            <p className="text-sm md:text-base text-center">
              Drag and Drop files
            </p>
            <p className="text-center font-semibold my-2 text-sm md:text-base">
              or
            </p>
            <p className="text-center text-sm md:text-base mb-4">
              Select a file
            </p>

            <div className="w-full flex justify-center items-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-2 rounded-lg font-medium text-sm md:text-base text-white bg-[#305041] transition duration-300 hover:bg-[#426d57]"
              >
                Browse
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center mt-4 text-sm md:text-base">
              {error}
            </p>
          )}

          {files.length > 0 && (
            <div className="mt-4 max-h-24 overflow-auto scrollbar-hide ">
              <h4 className="font-semibold text-sm md:text-base">
                Selected Files:
              </h4>
              <ul className="list-disc pl-5 text-sm  md:text-base">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="w-full flex justify-end mt-4">
            <button
              disabled={loading}
              onClick={handleUpload}
              className="px-4 py-2 rounded-lg text-sm md:text-base text-white bg-[#305041] transition duration-300 hover:bg-[#426d57]"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
