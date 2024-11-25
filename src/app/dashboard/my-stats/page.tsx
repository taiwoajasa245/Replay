import StatsComponentPage from "@/components/Gallery/StatsComponent/StatsComponentPage";
import { fetchStats } from "@/utils/GalleryAction";
import Loading from "@/components/Gallery/Loading";
import React from "react";


export default async function MyStatsPage() {
  let getStats;
  let errorMessage = "";

  try {
    const result = await fetchStats();

    if (result === null) {
      throw new Error("Failed to load stats");
    }
    getStats = result.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    errorMessage =
      "Sorry, we couldn't load the stats at this time. Check your internet and try again.";
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">{errorMessage}</p>
      </div>
    );
  }

  if (!getStats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">No statistics available</p>
      </div>
    );
  }

  // Wrap the stats component in React.Suspense to show a loading state during the rendering process
  return (
    <React.Suspense fallback={<Loading />}>
      <StatsComponentPage stats={getStats} />
    </React.Suspense>
  );
}
