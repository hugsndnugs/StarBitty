import { NextResponse } from 'next/server';
import { getShips, getShipById } from '@/lib/api/uexcorp';

export async function GET(request: Request) {
  try {
    // Check if there's a manufacturer ID parameter
    const url = new URL(request.url);
    const manufacturerId = url.searchParams.get('manufacturer_id');
    const shipId = url.searchParams.get('id');
    
    if (shipId) {
      // Get a specific ship by ID
      const ship = await getShipById(parseInt(shipId, 10));
      
      if (!ship) {
        return NextResponse.json(
          { error: 'Ship not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(ship);
    }
    
    // Get all ships or ships by manufacturer
    const ships = await getShips(
      manufacturerId ? parseInt(manufacturerId, 10) : undefined
    );
    
    return NextResponse.json(ships);
  } catch (error) {
    console.error('Error in ships API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ships' },
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