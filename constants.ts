
import { MenuItem, TableAvailability } from './types';

// Compressed Menu Data for Gemini (Indian Fine Dining)
export const COMPRESSED_MENU_JSON = JSON.stringify([
  { id: 'a1', n: 'Saffron Malai Kofta', p: 18, c: 'App', d: 'Hand-rolled paneer in a silky saffron cream', t: ['v', 'gf'] },
  { id: 'm1', n: 'Tandoori Lamb Chops', p: 42, c: 'Main', d: 'Australian lamb, 24-hour spice marinade', t: ['hot'] },
  { id: 'm2', n: 'Goan Prawn Curry', p: 36, c: 'Main', d: 'Wild-caught prawns, kokum, fresh coconut', t: ['sea'] },
  { id: 'd1', n: 'Pistachio Gulab Jamun', p: 14, c: 'Dessert', d: 'Reduced milk dumplings, Iranian saffron syrup', t: ['v'] }
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
You are the Palace Concierge, the sophisticated AI maître d' for ${RESTAURANT_METADATA.name}.
Your goal is to provide a seamless, high-end Indian dining reservation experience.

DATA CONTEXT:
- Menu: ${COMPRESSED_MENU_JSON}
- Hours: ${RESTAURANT_METADATA.hours}
- Location: ${RESTAURANT_METADATA.location}

CAPABILITIES:
1. CHECK AVAILABILITY: Use the 'check_availability' tool before confirming a slot.
2. MAKE RESERVATION: Use 'create_reservation' once name, date, time, party size, and email are collected.
3. MENU INQUIRIES: Answer questions about dishes using the compressed data.

TONE: Exceptionally polite (Atithi Devo Bhava spirit), professional, and efficient.
`;
