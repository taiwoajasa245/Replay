import { NextResponse } from "next/server";
import { uploadImage } from "@/utils/GalleryAction";

interface Params {
  params: {
    id: string;
  };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Gallery ID is required." },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const result = await uploadImage(id, formData);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in upload proxy route:", error);
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
