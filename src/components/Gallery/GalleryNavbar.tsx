"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { signOut, useSession } from "next-auth/react";

type GalleryNavbarProps = {
  name: string;
  image: string;
};

export default function GalleryNavbar({ name, image }: GalleryNavbarProps) {
  const { showSidebar, toggleSidebar } = useSidebar();
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session, status } = useSession();

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <header className="p-4 pt-10 border-b border-b-[#6E9981] flex items-center w-full ">


      {/* Sidebar toggle button for mobile */}
      <button
        aria-label={showSidebar ? "Close menu" : "Open menu"}
        onClick={toggleSidebar}
        className="block md:hidden focus:outline-none mr-4"
      >
        <div
          className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
            showSidebar ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-black mt-1.5 transition-opacity duration-300 ${
            showSidebar ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-black mt-1.5 transition-transform duration-300 ${
            showSidebar ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></div>
      </button>

      {/* Logo and Navbar content */}
      <div className="flex justify-between items-center w-full">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/nav-logo-icon.svg"
              alt="Replay Logo"
              width={100}
              height={100}
              priority
              className="w-24 md:w-28"
            />
          </Link>
        </div>

        {/* Profile dropdown */}
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 cursor-pointer relative"
        >
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full border-2 border-[#6E9981] shadow-sm w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-jump-in"
              src={image}
              alt="user image"
              width={100}
              height={100}
            />
            <p className="hidden sm:block font-semibold truncate max-w-[100px] md:max-w-none">
              {name}
            </p>
            <Image
              src="/arrowdown.svg"
              alt="arrow down icon"
              width={12}
              height={12}
              className={`transition-transform duration-300 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute right-0 top-20 z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 md:right-10">
            <div className="py-1">
              <Link href="/account-settings" passHref>
                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Account settings
                </p>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
