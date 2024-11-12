import Galleries from "@/components/Gallery/GalleryPage";
import { fetchGalleries } from "@/utils/fetchGallery";

export default async function Dashboard() {
  let getGalleries;
  let errorMessage = "";

  try {
    getGalleries = await fetchGalleries();
    if (!getGalleries || !getGalleries.data) {
      throw new Error("Failed to load galleries");
    }
  } catch (error) {
    console.error("Error fetching galleries:", error);
    errorMessage = "Sorry, we couldn't load the galleries at this time. Please try again later.";
  }

  return (
    <div>
      {errorMessage ? (
        <p className="text-red-500 text-center">{errorMessage}</p>
      ) : (
        <Galleries galleries={getGalleries.data} />
      )}
    </div>
  );
}
