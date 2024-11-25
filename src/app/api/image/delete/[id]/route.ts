import { deleteImage } from "@/utils/GalleryAction";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Image ID is required." }, { status: 400 });
    }

    const result = await deleteImage(id); 

    if (result) {
      return NextResponse.json({ message: "Image deleted successfully." });
    } else {
      return NextResponse.json({ error: "Failed to delete image." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
