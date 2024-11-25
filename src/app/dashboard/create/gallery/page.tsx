"use client";

import BackButton from "@/components/Gallery/BackButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateGallery() {
  const [title, settitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    


    if (!title.trim()) {
      toast.error("Gallery name cannot be empty")
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to create gallery try again");
      }

      const result = await response.json();

      if (result.status) {
        toast.success(result.message || "Gallery created successfully")
        router.replace("/dashboard");
      }
    } catch (err) {
      toast.error( err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-2 px-4 md:p-9">
      {/* back buttton  */}
      <div className="my-4 md:my-0">
        <BackButton href="/dashboard"/>
      </div>
      {/* create gallery form  */}

      <form onSubmit={handleCreateGallery} className=" md:my-10 md:ml-9">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-semibold tracking-wider my-2"
          >
            Gallery Name:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="mt-1  rounded-xl w-full md:w-96 px-3 py-2 border border-gray-300 text-black focus:outline-none focus:border-[#305041] focus:z-10 sm:text-lg"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>

        <p className="text-sm md:text-[14px] mt-1 font-medium">
          This name will be visible to others when you share the gallery link
        </p>

        <div className="w-full flex justify-center md:mt-6 mt-20">
          <button
            type="submit"
            className="px-12 py-2 md:px-10 md:py-2 rounded-[20px] text-[15px] md:text-[20px] text-white bg-[#305041] transition duration-300 hover:bg-[#426d57] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Gallery"}
          </button>
        </div>
      </form>
    </div>
  );
}
