import { NextResponse } from 'next/server';
import { addGallery } from '@/utils/GalleryAction';

export async function POST(request: Request) {
  try {
    const body = await request.json();


    const result = await addGallery(body);

    if (!result || !result.status) {
      return NextResponse.json(
        { error: 'Failed to create gallery due to API error' },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating gallery:", error);

    if (error instanceof TypeError) {
      return NextResponse.json(
        { error: 'Network error: Unable to reach the server. Please check your connection and try again.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
