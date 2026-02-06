
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Appetizers' | 'Mains' | 'Desserts' | 'Drinks';
  tags: string[];
}

export interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  partySize: number;
  email: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
}

export interface TableAvailability {
  time: string;
  available: boolean;
  maxParty: number;
}
