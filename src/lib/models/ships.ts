export interface Ship {
  id: number;
  name: string;
  manufacturer_id: number;
  size: string;
  type: string;
  focus: string;
  crew_min: number;
  crew_max: number;
  cargo_capacity?: number;
  mass?: number;
  length?: number;
  beam?: number;
  height?: number;
  production_status: 'flight_ready' | 'in_development' | 'concept';
  description?: string;
  price?: number;
  pledge_cost?: number;
  in_game_price?: number;
  wiki_url?: string;
  image_url?: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  code: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
}

export interface ShipComponent {
  id: number;
  name: string;
  type: 'weapon' | 'shield' | 'power' | 'cooler' | 'quantum_drive' | 'missile' | 'other';
  manufacturer_id: number;
  manufacturer_name?: string;
  size: number;
  grade: string; // 1-4 for civilian, military, etc.
  class?: string;
  description?: string;
  stats: {
    [key: string]: number | string; // Different component types have different stats
  };
  price?: number;
}

export interface ShipLoadout {
  ship_id: number;
  components: {
    [slot: string]: ShipComponent;
  };
  weapons: {
    [hardpoint: string]: ShipComponent;
  };
} 