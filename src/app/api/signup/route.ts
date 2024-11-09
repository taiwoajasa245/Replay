import { fetchFromAPI } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetchFromAPI("/api/v1/replay/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Signup error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
    return NextResponse.json({ message: 'An unexpected error occurred during signup' }, { status: 500 })
  }
}