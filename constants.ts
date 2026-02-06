
import { MenuItem, TableAvailability } from './types';

// Compressed Menu Data for Gemini (Indian Fine Dining)
export const COMPRESSED_MENU_JSON = JSON.stringify([
  { id: 'a1', n: 'Saffron Malai Kofta', p: 18, c: 'Appetizers', d: 'Hand-rolled paneer nestled in a silky saffron cream', t: ['v', 'gf'] },
  { id: 'm1', n: 'Tandoori Lamb Chops', p: 42, c: 'Main Courses', d: 'Premium Australian lamb marinated for 24 hour signature spice blend', t: ['hot'] },
  { id: 'm2', n: 'Goan Prawn Curry', p: 36, c: 'Main Courses', d: 'Wild-caught prawns simmered with kokum and fresh coconut milk', t: ['sea'] },
  { id: 'd1', n: 'Pistachio Gulab Jamun', p: 14, c: 'Desserts', d: 'Reduced milk dumplings, Iranian saffron syrup', t: ['v'] }
]);

export const RESTAURANT_METADATA = {
  name: "The Maharaja's Palace",
  cuisine: "Fine Dining North & South Indian Fusion",
  location: "Heritage Square, New Delhi",
  hours: "11:00 AM - 11:30 PM Daily"
};

export const INITIAL_AVAILABILITY: TableAvailability[] = [
  { time: '18:00', available: true, maxParty: 4 },
  { time: '18:30', available: true, maxParty: 2 },
  { time: '19:00', available: false, maxParty: 6 },
  { time: '19:30', available: true, maxParty: 4 },
  { time: '20:00', available: true, maxParty: 8 },
  { time: '20:30', available: false, maxParty: 4 },
  { time: '21:00', available: true, maxParty: 4 },
];

export const SYSTEM_PROMPT = `
You are the Royal Concierge for ${RESTAURANT_METADATA.name}. 
Your personality: Dignified, warm, and highly sophisticated. Use terms like "Namaste", "Excellency", "Certainly", and "It would be my pleasure".

CONVERSATION RULES:
1. NO RAW MARKDOWN: Do not use '*' for bullets or '-' for lists. Instead, use full sentences or the symbol '◆' for emphasis.
2. BOLDING: Use **bold** only for names of dishes or confirmation IDs.
3. STRUCTURE: Present information in clear, spacious paragraphs.
4. MENU: When describing food, be evocative and poetic. 

DATA CONTEXT:
- Menu: ${COMPRESSED_MENU_JSON}
- Hours: ${RESTAURANT_METADATA.hours}
- Location: ${RESTAURANT_METADATA.location}

CAPABILITIES:
1. CHECK AVAILABILITY: Use 'check_availability' tool before promising a slot.
2. MAKE RESERVATION: Use 'create_reservation' once name, date, time, party size, and email are collected.

Atithi Devo Bhava – The Guest is God.
`;
