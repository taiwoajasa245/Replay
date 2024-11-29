import React from "react";
import Image from "next/image";

type DeveloperProps = {
  avaterImage: string;
  name: string;
  technology: string;
  gmail: string;
  socialLinks: {
    email: string;
    instagram: string;
    twitter: string;
  };
};

export default function DeveloperCard({
  avaterImage,
  name,
  technology,
  gmail,
  socialLinks,
}: DeveloperProps) {
  return (
    <div>
      <div>
        <div>
          <Image
            src={avaterImage}
            alt="Avatar Image"
            width={100}
            height={100}
            className="w-60 md:w-96 rounded-lg "
          />
        </div>

        {/* Name */}
        <h1 className="inter-font text-lg md:text-xl font-medium mt-2">{name}</h1>

        {/* Technology */}
        <p className="inter-font text-sm mt-1">{technology}</p>

        {/* Gmail */}
        <p className="inter-font text-xs mt-1">{gmail}</p>

        {/* Socials */}
        <div className="flex items-center gap-3 mt-2">
          {/* Email */}
          <a href={`mailto:${socialLinks.email}`} target="_blank" rel="noopener noreferrer">
            <Image
              src="/mail-icon.svg"
              alt="Mail Icon"
              width={20}
              height={20}
              className="w-4 cursor-pointer hover:scale-110 transition-transform"
            />
          </a>

          {/* Instagram */}
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <Image
              src="/instagram-icon.svg"
              alt="Instagram Icon"
              width={20}
              height={20}
              className="w-4 cursor-pointer hover:scale-110 transition-transform"
            />
          </a>

          {/* Twitter */}
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <Image
              src="/twitter(X)-icon.svg"
              alt="Twitter Icon"
              width={20}
              height={20}
              className="w-4 cursor-pointer hover:scale-110 transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
