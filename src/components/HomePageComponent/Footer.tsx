import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex items-center w-full h-16  bg-[#305041] mt-auto">
      {/* Logo */}
      <div className="flex-shrink-0 ml-5  md:ml-24">
        <Link href="/">
          <Image
            src="/white-LOGO.svg"
            alt="Replay Logo"
            width={90}
            height={90}
            priority
            className=" w-14 md:w-20"
          />
        </Link>
      </div>

      {/* Vertical Line */}
      <div className="h-8 md:h-10 w-px bg-white font-bold mx-4"></div>

      {/* Copyright */}
      <div>
        <p className="text-white text-sm font-semibold tracking-widest md:text-lg">©2024</p>
      </div>
    </footer>
  );
}
