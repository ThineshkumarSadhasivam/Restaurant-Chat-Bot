
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// The tool definitions remain as constants
const checkAvailabilityTool: FunctionDeclaration = {
  name: 'check_availability',
  parameters: {
    type: Type.OBJECT,
    description: 'Check if a table is available for a specific time and party size.',
    properties: {
      date: { type: Type.STRING, description: 'The date for the reservation (YYYY-MM-DD).' },
      time: { type: Type.STRING, description: 'The desired time (HH:MM).' },
      party_size: { type: Type.NUMBER, description: 'Number of guests.' },
    },
    required: ['date', 'time', 'party_size'],
  },
};

const createReservationTool: FunctionDeclaration = {
  name: 'create_reservation',
  parameters: {
    type: Type.OBJECT,
    description: 'Finalize the booking after all details are collected.',
    properties: {
      name: { type: Type.STRING, description: 'Customer full name.' },
      date: { type: Type.STRING, description: 'Reservation date.' },
      time: { type: Type.STRING, description: 'Reservation time.' },
      party_size: { type: Type.NUMBER, description: 'Number of guests.' },
      email: { type: Type.STRING, description: 'Customer email address.' },
    },
    required: ['name', 'date', 'time', 'party_size', 'email'],
  },
};

export const createChatSession = () => {
  // Fix: Initialize GoogleGenAI exclusively with process.env.API_KEY as a named parameter
  // Do not use fallbacks or define process.env elsewhere.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      tools: [{ functionDeclarations: [checkAvailabilityTool, createReservationTool] }],
    },
  });
};
