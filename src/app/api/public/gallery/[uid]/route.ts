import { uploadPublicImage } from "@/utils/GalleryAction";
import { NextResponse } from "next/server";

interface Params {
  params: {
    uid: string;
  };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { uid } = params;

    if (!uid) {
      return NextResponse.json(
        { error: "Public Gallery UID is required." },
        { status: 400 }
      );
    }


    const formData = await request.formData();

    const result = await uploadPublicImage(uid, formData);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in upload proxy route:", error);
    return NextResponse.json({ error: "Failed to upload public image." }, { status: 500 });
  }
}
