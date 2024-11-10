import React, { ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replay | Gallary ",
  description: "create memories with Replay ",
  icons: {
    icon: "/Logo.svg",
  },
};


// Define a type for the layout's children
type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          My Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard">
            <div className="block p-2 hover:bg-gray-700 rounded">Home</div>
          </Link>
          <Link href="/dashboard/settings">
            <div className="block p-2 hover:bg-gray-700 rounded">Settings</div>
          </Link>
          {/* Add more nav items as needed */}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-gray-900 text-white p-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">Dashboard</div>
            <div>
              <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">
                Profile
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
}
