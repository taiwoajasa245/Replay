"use client";

import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Gallery/Loading";
import GallerySidebar from "@/components/Gallery/GallerySidebar";
import GalleryNavbar from "@/components/Gallery/GalleryNavbar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";

// Define a type for the layout's children
type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardContent({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const { showSidebar } = useSidebar();
  

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col animate-fade animate-duration-[1000ms] animate-alternate">
      <GalleryNavbar
        name={session?.user?.name as string}
        image={session?.user?.image as string}
      />

      {/* Main content area */}
      <div className="flex-1 md:ml-60 overflow-y-auto scroll-smooth scrollbar-hide h-full ">
        {/* Sidebar */}
        <div className={`${showSidebar ? "block" : "hidden"} md:block`}>
          <GallerySidebar />
        </div>

        {/* Page content */}
        <main  className="flex-grow  scrollbar-hide min-h-screen bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
