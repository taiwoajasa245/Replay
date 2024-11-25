import { deleteGallery, editGallery } from "@/utils/GalleryAction";
import { NextResponse } from "next/server";



export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Gallery ID is required" },
      { status: 400 }
    );
  }

  try {
    const { title, linkActive } = await req.json();

    if (!title || typeof linkActive !== "boolean") {
      return NextResponse.json(
        { message: "Title and linkActive are required." },
        { status: 400 }
      );
    }

    const updatedGallery = await editGallery(id, { title, linkActive });

    if (!updatedGallery) {
      return NextResponse.json(
        { message: "Failed to update the gallery" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedGallery);
  } catch (error) {
    console.error("Error updating gallery:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Gallery ID is required." }, { status: 400 });
    }

    const result = await deleteGallery(id); 

    if (result) {
      return NextResponse.json({ message: "Gallery deleted successfully." });
    } else {
      return NextResponse.json({ error: "Failed to delete Gallery." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

