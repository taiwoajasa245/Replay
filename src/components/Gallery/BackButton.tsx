import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BackButton() {
  return (
    <div>
      <Link
        href="/dashboard"
        className="border flex items-center w-24 rounded-xl justify-center hover:bg-slate-200 cursor-pointer hover:border-[#305041]"
      >
        <Image
          src="/arrow-left.svg"
          alt="arrow back"
          width={50}
          height={50}
          className=" w-8 md:w-9"
        />
        <p className="ml-2 font-medium"> Back </p>
      </Link>
    </div>
  );
}
