import { changeUserPassword } from "@/utils/GalleryAction";
import { NextResponse } from "next/server";

export async function PATCH(request: Request,) {
    try {
  
      const body = await request.json();
  
      const result = await changeUserPassword(body) as { status: string };

      
      if (!result || !result.status) {
        return NextResponse.json(
          { error: result || 'Failed to change password' },
          { status: 500 }
        );
      }
  
      return NextResponse.json(result);
    } catch (error) {
      console.error("Error in upload proxy route:", error);
      return NextResponse.json({ error: "Failed to change password." }, { status: 500 });
    }
  }
  