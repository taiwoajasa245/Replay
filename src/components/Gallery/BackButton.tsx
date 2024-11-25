import Image from "next/image";
import Link from "next/link";
import React from "react";

type BackBtnProps = { 
  href: string; 
}

export default function BackButton( {href}: BackBtnProps ) {
  return (
    <div>
      <Link
        href={href}
        className="border flex items-center w-24 rounded-xl justify-center hover:bg-slate-100 cursor-pointer "
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
