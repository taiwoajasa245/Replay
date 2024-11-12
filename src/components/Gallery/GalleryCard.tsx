import Image from "next/image";
import React from "react";

type GalleryCardProps = {
  title: string;
  file: string;
};

export default function GalleryCard({ title, file }: GalleryCardProps) {
  return (
    <div className="py-5 md:border-b border-b-[#6E9981] w-full ">
      <div className=" flex items-center">
        {/* upload icon */}
        <div className="mx-5">
          <Image
            src="./upload-icon.svg"
            alt="Gallery card image"
            width={35}
            height={35}
            className="w-[40px]"
          />
        </div>

        <div className="md:flex">
          {/* gallery name */}
          <div className="md:mr-10">
            <p className="text-[20px] md:text-[20px] font-medium "> {title} </p>
          </div>

          {/* files  */}
          <div>
            <p className="flex items-center text-lg "><span className="hidden md:flex">-</span>{file}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
