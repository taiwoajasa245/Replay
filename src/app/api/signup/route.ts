import { NextResponse } from 'next/server'
const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/api/v1/replay/auth/signup`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();

    
    if (!data.status) {
      return NextResponse.json({ message: data.message || 'Email in use' }, {status: 400});
    }

    return NextResponse.json({ message: data.message || 'Signup successful', data }, { status: 200 });

  } catch (error) {
    console.error('Signup error:', error);

    // Check if the error contains a message and send it in response
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during signup';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
