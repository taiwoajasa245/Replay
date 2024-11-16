import Galleries from "@/components/Gallery/GalleryPage";
import { fetchGalleries } from "@/utils/GalleryAction";

type Gallery = {
  title: string;
  fileCount: string;
  galleryId: number;
};

type GalleriesResponse = {
  data: Gallery[];
};

export default async function Dashboard() {
  let getGalleries;
  let errorMessage = "";

  try {
    const result = await fetchGalleries();
    if (result === null) {
      throw new Error("Failed to load galleries");
    }
    getGalleries = result as GalleriesResponse;
  } catch (error) {
    console.error("Error fetching galleries:", error);
    errorMessage =
      "Sorry, we couldn't load the galleries at this time. Check your internet and try again.";
  }

  return (
    <div>
      {errorMessage ? (
        <p className="text-red-500 text-center">{errorMessage}</p>
      ) : (
        <Galleries galleries={getGalleries?.data || []} />
      )}
    </div>
  );
}

