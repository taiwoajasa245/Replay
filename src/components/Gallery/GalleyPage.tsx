'use client'

import { useSession, signOut } from "next-auth/react"


interface DashboardData {
  stats: { users: number; posts: number }
}

export default function DashboardPage({ dashboardData }: { dashboardData: DashboardData }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
      return (
        <div className="flex justify-center items-center h-screen">Loading</div>
      );
    }
  
    if (!session) {
      return <div>Access Denied</div>;
    }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-white">
      {y}
    </div>
  )
}