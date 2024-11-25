import { editUserDetails } from "@/utils/GalleryAction";
import { NextResponse } from "next/server";


export async function PATCH(request: Request,) {
  try {

    const formData = await request.formData();

    const result = await editUserDetails(formData);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in upload proxy route:", error);
    return NextResponse.json({ error: "Failed to edit details." }, { status: 500 });
  }
}
