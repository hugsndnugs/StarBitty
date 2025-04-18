import { NextResponse } from 'next/server';
import { getManufacturers } from '@/lib/api/uexcorp';

export async function GET() {
  try {
    const manufacturers = await getManufacturers();
    return NextResponse.json(manufacturers);
  } catch (error) {
    console.error('Error in manufacturers API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch manufacturers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Note: This is just a mock endpoint for future use
  try {
    const data = await request.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
} 