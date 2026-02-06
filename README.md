# 🏰 The Maharaja's Palace: Royal AI Concierge

An elite digital experience for **The Maharaja's Palace**, blending traditional Indian hospitality (*Atithi Devo Bhava*) with cutting-edge Generative AI. This application features a sophisticated chatbot that acts as a Royal Maître D', managing fine-dining reservations and menu inquiries.

---

## ✨ Key Features

- **🧠 Intelligent Concierge**: Powered by Google Gemini 2.0 Flash, providing human-like reasoning for complex booking flows and menu questions.
- **📅 Real-Time Availability Feeding**: A unique "Staff Mode" that allows the restaurant team to toggle table availability. These changes are dynamically injected into the AI's system context.
- **📜 Compressed Knowledge Engine**: The entire menu and operational metadata are compressed into highly efficient JSON structures to maximize model performance and accuracy.
- **🏺 Luxury Aesthetic**: A high-fidelity UI featuring:
  - **Playfair Display** typography for a regal feel.
  - **Gold Gradients & Indian Patterns** for authentic cultural immersion.
  - **Responsive Sidebar** for "Royal Registry" (reservation tracking) and "Royal Menu" browsing.
- **💾 LocalStorage Persistence**: All bookings and availability states are preserved across browser refreshes using local synchronization.
- **🛠️ Tool Calling Architecture**: Uses structured Function Calling to ensure the AI only confirms bookings when all required parameters (Name, Email, Party Size, Time) are valid.

---

## 🛠️ Technical Stack

- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Google Gemini API (@google/genai)](https://ai.google.dev/)
- **Model**: `gemini-3-flash-preview` (Optimized for speed and complex tool use)
- **Icons**: Custom SVG iconography

---

## 🚀 Architecture Highlights

### 1. Dynamic Context Injection
Unlike standard chatbots with static instructions, this concierge receives a "Live Feed" of current palace records in its `systemInstruction` on every session initialization:
```typescript
const systemPrompt = `TODAY'S DATE: ${currentDate}. LIVE AVAILABILITY: ${JSON.stringify(availability)}...`;
```

### 2. Structured Function Calling
The application implements two critical tools:
- `check_availability(date, time, party_size)`: Validates the React state before the AI makes promises to the guest.
- `create_reservation(name, email, ...)`: Commits the guest data to the persistent local storage and triggers visual UI updates.

### 3. State Management & Persistence
The `App.tsx` serves as the orchestrator, managing:
- **`reservations`**: Persisted to `localStorage` as the "Royal Registry".
- **`availability`**: Reactive state that can be manually overridden in "Staff Mode".

---

## 📖 How to Use

### For Guests
1. **Inquire**: Ask about the menu (e.g., "What seafood do you have?") or hours.
2. **Book**: State your desire to dine (e.g., "I'd like a table for 4 tonight at 7:30 PM").
3. **Confirm**: Provide your name and email when prompted. Your "Royal Entry Pass" will appear in the right sidebar instantly.

### For Staff
1. **Enter Staff Mode**: Click the **"Edit Slots"** button in the left sidebar.
2. **Toggle Slots**: Click on any time slot to mark it as "Sold Out" or "Available".
3. **AI Sync**: The Concierge immediately becomes aware of these changes and will refuse bookings for sold-out times.

---

## 🔑 Environment Requirements

The application requires a valid **Google Gemini API Key** provided via the environment.
- **Variable**: `process.env.API_KEY`

---

*“Atithi Devo Bhava – The Guest is God.”*
Developed with precision by the Palace Engineering Team.