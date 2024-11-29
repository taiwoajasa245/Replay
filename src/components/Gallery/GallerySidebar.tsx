"use client";

import Link from "next/link";
import React, { useState } from "react";
import CreateGalleryButton from "./CreateGallaryButton";
import { useSidebar } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation";

export default function GallerySidebar() {
  const { showSidebar, toggleSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState("my-galleries");
  const pathname = usePathname();

  // Function to handle tab click
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // activeTab = pathname.includes("my-stats")
  //   ? "my-stats"
  //   : pathname.includes("account-settings")
  //   ? "settings"
  //   : "my-galleries";

  setActiveTab(pathname.includes("my-stats") ? "my-stats" : (pathname.includes("account-settings") ? "settings" : "my-galleries"));

    
  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`min-w-60 h-full border border-r-[#6E9981] bg-white fixed left-0 z-10
          transform transition-transform duration-300 ease-in-out
          ${
            showSidebar
              ? "animate-fade-right animate-duration-[150ms] animate-normal"
              : "-translate-x-full"
          }
          md:translate-x-0 md:block
        `}
      >
        <div className="flex h-full flex-col gap-80 lg:gap-60">
          <nav className="p-4 text-[20px] font-semibold text-gray-400">
            {/* My Galleries Tab */}
            <Link href="/dashboard">
              <div
                className={`block p-2 rounded   cursor-pointer ${
                  activeTab === "my-galleries"
                    ? "bg-[#C3D7CA] text-black"
                    : "hover:bg-[#C3D7CA] hover:text-black"
                }`}
                onClick={() => handleTabClick("my-galleries")}
              >
                My Galleries
              </div>
            </Link>
            {/* My Stats Tab */}
            <Link href="/dashboard/my-stats">
              <div
                className={`block p-2 rounded  my-2 cursor-pointer ${
                  activeTab === "my-stats"
                    ? "bg-[#C3D7CA] text-black"
                    : "hover:bg-[#C3D7CA] hover:text-black"
                }`}
                onClick={() => handleTabClick("my-stats")}
              >
                My Stats
              </div>
            </Link>
            {/* Settings Tab */}
            <Link href="/dashboard/account-settings">
              <div
                className={`block p-2 rounded cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-[#C3D7CA] text-black"
                    : "hover:bg-[#C3D7CA] hover:text-black"
                }`}
                onClick={() => handleTabClick("settings")}
              >
                Settings
              </div>
            </Link>
          </nav>
          <div>
            <CreateGalleryButton
              text="Create Gallery"
              onClose={toggleSidebar}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
