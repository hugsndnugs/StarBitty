import { Manufacturer, Ship } from '@/lib/models/ships';

const API_BASE_URL = 'https://api.uexcorp.space/2.0';
const API_TOKEN = process.env.UEXCORP_API_TOKEN || '';

// Helper for making authenticated API requests to UEX API
async function fetchFromUEX(endpoint: string, params: Record<string, string> = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    }
  });
  
  if (!response.ok) {
    throw new Error(`UEX API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.status !== 'ok') {
    throw new Error(`UEX API returned error: ${data.message || 'Unknown error'}`);
  }
  
  return data.data;
}

// Get vehicle manufacturers
export async function getManufacturers(): Promise<Manufacturer[]> {
  try {
    if (!API_TOKEN) {
      console.warn('No UEX API token found, using mock data');
      return getMockManufacturers();
    }
    
    const companies = await fetchFromUEX('companies', { 
      is_vehicle_manufacturer: '1' 
    });
    
    // Transform the API response to match our Manufacturer interface
    return companies.map((company: any) => ({
      id: company.id,
      name: company.name,
      code: company.nickname || '',
      description: company.industry || '',
      logo_url: `/images/manufacturers/${company.nickname?.toLowerCase() || 'generic'}.png`,
      website_url: company.wiki || ''
    }));
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    return getMockManufacturers();
  }
}

// Get all ships or ships by manufacturer
export async function getShips(manufacturerId?: number): Promise<Ship[]> {
  try {
    if (!API_TOKEN) {
      console.warn('No UEX API token found, using mock data');
      return getMockShips(manufacturerId);
    }
    
    // Note: The UEX API doesn't have a direct "ships" endpoint like this
    // This is a placeholder for when it's available or for using another API
    // For now, we'll use mock data
    return getMockShips(manufacturerId);
    
    // When the API supports this, we would do something like:
    // const ships = await fetchFromUEX('vehicles', { 
    //   type: 'ship',
    //   manufacturer_id: manufacturerId ? manufacturerId.toString() : undefined
    // });
    
    // return ships.map((ship: any) => ({
    //   id: ship.id,
    //   name: ship.name,
    //   ...
    // }));
  } catch (error) {
    console.error('Error fetching ships:', error);
    return getMockShips(manufacturerId);
  }
}

// Get a specific ship by ID
export async function getShipById(id: number): Promise<Ship | null> {
  try {
    if (!API_TOKEN) {
      console.warn('No UEX API token found, using mock data');
      return getMockShipById(id);
    }
    
    // Note: The UEX API doesn't have a direct ship by ID endpoint like this
    // This is a placeholder for when it's available or for using another API
    return getMockShipById(id);
    
    // When the API supports this, we would do something like:
    // const ship = await fetchFromUEX(`vehicles/${id}`);
    // return {
    //   id: ship.id,
    //   name: ship.name,
    //   ...
    // };
  } catch (error) {
    console.error(`Error fetching ship with ID ${id}:`, error);
    return getMockShipById(id);
  }
}

// Fallback to mock data if API fails or no token is available
function getMockManufacturers(): Manufacturer[] {
  return [
    {
      id: 1,
      name: 'Roberts Space Industries',
      code: 'RSI',
      description: 'Founded in 2038, Roberts Space Industries is a multinational corporation that designs, manufactures, and sells aerospace vehicles and spacefaring craft.',
      logo_url: '/images/manufacturers/rsi.png'
    },
    {
      id: 2,
      name: 'Consolidated Outland',
      code: 'CNOU',
      description: 'Founded by maverick trillionaire Silas Koerner, Consolidated Outland is a relative newcomer to the ship manufacturing industry.',
      logo_url: '/images/manufacturers/cnou.png'
    },
    {
      id: 3,
      name: 'Aegis Dynamics',
      code: 'AEGS',
      description: 'Aegis Dynamics was founded in 2525 to construct military vessels and has since evolved to offer civilian variants of its ships.',
      logo_url: '/images/manufacturers/aegis.png'
    },
    {
      id: 4,
      name: 'Origin Jumpworks',
      code: 'ORIG',
      description: 'Origin Jumpworks GmbH specializes in luxury spacecraft and has become the galaxy\'s premier manufacturer of luxury vehicles.',
      logo_url: '/images/manufacturers/origin.png'
    },
    {
      id: 5,
      name: 'Anvil Aerospace',
      code: 'ANVL',
      description: 'Anvil Aerospace was founded in 2772 to create military-grade equipment for the UEE Navy.',
      logo_url: '/images/manufacturers/anvil.png'
    }
  ];
}

// Mock ships data
function getMockShips(manufacturerId?: number): Ship[] {
  const allShips: Ship[] = [
    {
      id: 1,
      name: 'Aurora MR',
      manufacturer_id: 1,
      size: 'Small',
      type: 'Starter',
      focus: 'Multipurpose',
      crew_min: 1,
      crew_max: 1,
      cargo_capacity: 3,
      mass: 25125,
      length: 18,
      beam: 8,
      height: 4,
      production_status: 'flight_ready',
      description: 'The Aurora MR is a well-rounded starter ship with a bit of everything.',
      price: 25,
      in_game_price: 184300,
      image_url: '/images/ships/aurora-mr.jpg'
    },
    {
      id: 2,
      name: 'Mustang Alpha',
      manufacturer_id: 2,
      size: 'Small',
      type: 'Starter',
      focus: 'Light Fighter',
      crew_min: 1,
      crew_max: 1,
      cargo_capacity: 4,
      mass: 18050,
      length: 21.5,
      beam: 21,
      height: 7,
      production_status: 'flight_ready',
      description: 'A solid starter ship with a focus on combat capabilities.',
      price: 30,
      in_game_price: 234600,
      image_url: '/images/ships/mustang-alpha.jpg'
    },
    {
      id: 3,
      name: 'Carrack',
      manufacturer_id: 3,
      size: 'Large',
      type: 'Exploration',
      focus: 'Expedition',
      crew_min: 4,
      crew_max: 6,
      cargo_capacity: 456,
      mass: 4397000,
      length: 126.5,
      beam: 76.5,
      height: 30,
      production_status: 'flight_ready',
      description: 'A self-sustaining exploration vessel designed for long-term voyages.',
      price: 600,
      in_game_price: 26657500,
      image_url: '/images/ships/carrack.jpg'
    },
    {
      id: 4,
      name: 'Avenger Titan',
      manufacturer_id: 3,
      size: 'Small',
      type: 'Light Freight',
      focus: 'Multipurpose',
      crew_min: 1,
      crew_max: 1,
      cargo_capacity: 8,
      mass: 50000,
      length: 22.5,
      beam: 16,
      height: 5.5,
      production_status: 'flight_ready',
      description: 'A versatile ship that can handle combat, cargo, and more.',
      price: 55,
      in_game_price: 785700,
      image_url: '/images/ships/avenger-titan.jpg'
    },
    {
      id: 5,
      name: 'Constellation Andromeda',
      manufacturer_id: 4,
      size: 'Medium',
      type: 'Multi-crew',
      focus: 'Multipurpose',
      crew_min: 3,
      crew_max: 5,
      cargo_capacity: 96,
      mass: 419000,
      length: 61,
      beam: 26,
      height: 14,
      production_status: 'flight_ready',
      description: 'A versatile multi-crew ship for exploration, combat, and cargo.',
      price: 225,
      in_game_price: 3548000,
      image_url: '/images/ships/constellation-andromeda.jpg'
    },
    {
      id: 6,
      name: 'Gladius',
      manufacturer_id: 3,
      size: 'Small',
      type: 'Light Fighter',
      focus: 'Combat',
      crew_min: 1,
      crew_max: 1,
      cargo_capacity: 0,
      mass: 18500,
      length: 20,
      beam: 17,
      height: 6,
      production_status: 'flight_ready',
      description: 'A light combat fighter built for speed and maneuverability.',
      price: 90,
      in_game_price: 1169900,
      image_url: '/images/ships/gladius.jpg'
    },
    {
      id: 7,
      name: 'Cutlass Black',
      manufacturer_id: 5,
      size: 'Medium',
      type: 'Medium Freight',
      focus: 'Multipurpose',
      crew_min: 1,
      crew_max: 2,
      cargo_capacity: 46,
      mass: 218000,
      length: 29,
      beam: 26.5,
      height: 10,
      production_status: 'flight_ready',
      description: 'A multi-role spacecraft built for flexibility.',
      price: 100,
      in_game_price: 1385300,
      image_url: '/images/ships/cutlass-black.jpg'
    }
  ];
  
  if (manufacturerId) {
    return allShips.filter(ship => ship.manufacturer_id === manufacturerId);
  }
  
  return allShips;
}

// Get a specific mock ship by ID
function getMockShipById(id: number): Ship | null {
  const ships = getMockShips();
  return ships.find(ship => ship.id === id) || null;
} 