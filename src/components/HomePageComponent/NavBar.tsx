"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import AnimatedMenu from "./AnimatedMenu";
import Link from "next/link";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white bg-opacity-70 backdrop-blur-md shadow-md z-50"
          : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-5 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/nav-logo-icon.svg"
              alt="Replay Logo"
              width={90}
              height={90}
              priority
              className="md:w-28"
            />
          </Link>
        </div>

       
        <div className="hidden md:flex flex-grow justify-end">
          <ul className="space-x-10 mr-10 flex items-center">
            <li>
              <Link
                href="/"
                className="text-2xl hover:text-gray-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-2xl hover:text-gray-600 transition-colors"
              >
                About
              </Link>
            </li>
          
          </ul>
        </div>

        {/* Sign In Button */}
        <div className="hidden md:flex">
          <Link
            href="/login"
            className="px-8 py-2 rounded-[16px] text-[15px] font-semibold md:text-[19px] text-white bg-[#305041] cursor-pointer hover:border-[#305041] border border-[#305041]  hover:border transition hover:bg-white hover:text-black"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <AnimatedMenu />
        </div>
      </div>
    </nav>
  );
}
