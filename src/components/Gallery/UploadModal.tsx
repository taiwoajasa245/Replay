"use client"; 

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

interface UploadModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

// TODO clean up code

export default function UploadModal({ setIsModalOpen, id }: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      router.replace(`/dashboard/gallery/${id}`);
      setFiles([]); // Clear the selected files
      setIsModalOpen(false); // Close the modal after successful upload
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
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
          {/* upload image */}
          <button onClick={handleCloseModal} className=" mb-5 ">
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
            className="p-10 px-36 border-2 border-dashed w-full rounded-lg  hover:border-[#305041] hover:bg-slate-50"
          >
            <div className="w-full flex justify-center items-center">
              <Image
                src="/upload-to-cloud-icon.svg"
                alt="upload to cloud icon"
                width={100}
                height={100}
                className="md:w-16 "
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
            <p className=" text-base w-full text-nowrap ">
              Drag and Drop files
            </p>

            <p className=" text-center font-semibold my-2">or</p>

            <p className="text-center mb-2 "> select a file </p>

            <div className="w-full flex justify-center items-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-10 py-1 md:px-10 md:py-1 rounded-[10px] font-medium text-[15px] md:text-[20px] text-white bg-[#305041] transition duration-300 hover:bg-[#426d57]"
              >
                Browse
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Selected Files:</h4>
              <ul className="list-disc pl-5 overflow-auto scrollbar-hide h-16">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="w-full flex mt-3 justify-end items-center">
            <button
              disabled={loading}
              onClick={() => {
                handleUpload();
              }}
              className="px-6 py-2 rounded-[20px] text-[15px] text-white bg-[#305041] transition duration-300 hover:bg-[#426d57]"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
