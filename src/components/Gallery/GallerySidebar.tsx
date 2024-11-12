import Link from "next/link";
import React from "react";
import CreateGalleryButton from "./CreateGallaryButton";
import { useSidebar } from "@/contexts/SidebarContext";

export default function GallerySidebar() {
  const {showSidebar} = useSidebar(); 


  return (
    <div >
      {/* Sidebar */}
      <aside  
  className={`min-w-60 h-full border border-r-[#6E9981] bg-white fixed left-0 z-10
    transform transition-transform duration-300 ease-in-out
    ${showSidebar ? 'animate-fade-right animate-duration-[150ms] animate-normal' : '-translate-x-full'}
    md:translate-x-0 md:block
  `}
  
  >
        <div className="flex h-full flex-col gap-80 lg:gap-60 ">
          <nav className="p-4 text-[20px] font-semibold text-gray-400">
            <Link href="/dashboard">
              <div className="block p-2 hover:bg-[#C3D7CA] hover:text-black  rounded cursor-pointer   text-black bg-[#C3D7CA] ">
                My Gallaries
              </div>
            </Link>
            <Link href="/dashboard">
              <div className="block p-2 hover:bg-[#C3D7CA]  hover:text-black rounded cursor-pointer">
                My Stats
              </div>
            </Link>
            <Link href="/dashboard">
              <div className="block p-2 hover:bg-[#C3D7CA]  hover:text-black rounded cursor-pointer">
                Settings
              </div>
            </Link>
          </nav>
          <div>
            <CreateGalleryButton text="Create Gallery" />
          </div>
        </div>
      </aside>
    </div>
  );
}
