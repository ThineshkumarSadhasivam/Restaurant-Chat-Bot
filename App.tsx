
import React, { useState, useRef, useEffect } from 'react';
import { Message, Reservation, TableAvailability } from './types';
import { INITIAL_AVAILABILITY, RESTAURANT_METADATA } from './constants';
import { createChatSession } from './services/geminiService';
import MessageBubble from './components/MessageBubble';
import MenuSidebar from './components/MenuSidebar';
import ReservationCard from './components/ReservationCard';

const STORAGE_KEYS = {
  RESERVATIONS: 'maharaja_reservations',
  AVAILABILITY: 'maharaja_availability'
};

const App: React.FC = () => {
  // Persistence Layer
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    return saved ? JSON.parse(saved) : [];
  });

  const [availability, setAvailability] = useState<TableAvailability[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AVAILABILITY);
    return saved ? JSON.parse(saved) : INITIAL_AVAILABILITY;
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AVAILABILITY, JSON.stringify(availability));
  }, [availability]);

  useEffect(() => {
    chatRef.current = createChatSession();
    const initialGreeting: Message = {
      id: 'init',
      role: 'model',
      content: `Namaste. Welcome to ${RESTAURANT_METADATA.name}. I am your Royal Concierge. It would be my distinct pleasure to assist you with a reservation or introduce you to our signature culinary creations today. How may I serve you?`,
      timestamp: new Date()
    };
    setMessages([initialGreeting]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const clearData = () => {
    if (window.confirm("Are you sure you wish to clear the Royal Registry? This will remove all bookings.")) {
      setReservations([]);
      setAvailability(INITIAL_AVAILABILITY);
      localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
      localStorage.removeItem(STORAGE_KEYS.AVAILABILITY);
    }
  };

  const handleToolCall = async (fn: any) => {
    if (fn.name === 'check_availability') {
      const { time, party_size } = fn.args;
      const found = availability.find(a => a.time === time);
      if (!found) return JSON.stringify({ status: 'error', message: 'No slots at that specific time.' });
      if (!found.available) return JSON.stringify({ status: 'unavailable', message: 'That time slot is currently fully booked.' });
      if (party_size > found.maxParty) return JSON.stringify({ status: 'rejected', message: `We can only accommodate up to ${found.maxParty} guests at that time.` });
      return JSON.stringify({ status: 'available', message: 'The table is available for your party!' });
    }

    if (fn.name === 'create_reservation') {
      const newRes: Reservation = {
        id: 'RES-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        ...fn.args,
        status: 'confirmed'
      };
      setReservations(prev => [newRes, ...prev]);
      setAvailability(prev => prev.map(a => a.time === fn.args.time ? { ...a, available: false } : a));
      return JSON.stringify({ status: 'success', confirmation_id: newRes.id });
    }
    return "Function not found";
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: input });
      
      if (response.functionCalls) {
        const results = [];
        for (const fc of response.functionCalls) {
          const result = await handleToolCall(fc);
          results.push({ id: fc.id, name: fc.name, response: { result } });
        }
        const finalResponse = await chatRef.current.sendMessage({
          message: "The requested details have been processed: " + JSON.stringify(results)
        });
        const botMsg: Message = {
          id: Date.now().toString() + '-bot',
          role: 'model',
          content: finalResponse.text || "It is done, Excellency.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        const botMsg: Message = {
          id: Date.now().toString() + '-bot',
          role: 'model',
          content: response.text || "I apologize, I could not process that request.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: 'err-' + Date.now(),
        role: 'model',
        content: "I apologize, Excellency, but I encountered a moment of hesitation. Could you please repeat that for me?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-0 md:p-8">
      <div className="w-full max-w-7xl h-screen md:h-[90vh] flex overflow-hidden md:rounded-3xl shadow-2xl bg-white border border-stone-200">
        
        {/* Left Sidebar - Menu */}
        <aside className="hidden lg:flex w-80 flex-col border-r border-stone-100 p-8 bg-stone-50/50">
          <div className="mb-8">
            <h1 className="royal-title text-2xl text-amber-900 mb-1 leading-none">The Maharaja</h1>
            <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-bold">Grand Palace</p>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <MenuSidebar />
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200/50">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4 flex justify-between items-center">
              Today's Slots
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {availability.map((a) => (
                <div key={a.time} className={`px-1 py-1.5 rounded-md text-[9px] font-bold text-center border transition-all ${a.available ? 'border-emerald-100 text-emerald-700 bg-emerald-50' : 'border-stone-200 text-stone-300 bg-stone-100 line-through'}`}>
                  {a.time}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Conversation Area */}
        <main className="flex-1 flex flex-col relative bg-white">
          <header className="px-6 md:px-8 py-5 border-b border-stone-100 flex items-center justify-between glass sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full gold-gradient p-[2px] shadow-lg">
                <div className="w-full h-full rounded-full bg-amber-900 flex items-center justify-center text-white text-xs font-bold">
                  RC
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-800">Royal Concierge</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Live Service</span>
                </div>
              </div>
            </div>
            <button 
              onClick={clearData}
              className="p-2 text-stone-300 hover:text-amber-800 transition-colors"
              title="Reset records"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </header>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide space-y-6 bg-pattern"
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-duration:1s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <footer className="p-6 md:p-8 bg-white border-t border-stone-100">
            <form onSubmit={handleSubmit} className="relative group max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Inquire about a table or the menu..."
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-5 pl-8 pr-16 text-sm focus:ring-4 focus:ring-amber-900/5 focus:border-amber-900/20 transition-all outline-none text-stone-800 shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-amber-900 text-white rounded-xl hover:bg-stone-900 transition-all disabled:opacity-20 shadow-lg shadow-amber-900/10 active:scale-95 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
            <p className="text-center mt-4 text-[9px] uppercase tracking-widest text-stone-400 font-medium">
              Atithi Devo Bhava • Traditional Indian Hospitality
            </p>
          </footer>
        </main>

        {/* Right Sidebar - Bookings */}
        <aside className="hidden xl:flex w-80 flex-col border-l border-stone-100 p-8 bg-stone-50/30">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Royal Registry</h3>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
              {reservations.length} Booked
            </span>
          </div>
          
          <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide pb-8">
            {reservations.length === 0 ? (
              <div className="text-center py-20 px-4 border-2 border-dashed border-stone-200 rounded-3xl">
                <div className="w-12 h-12 border-2 border-stone-200 rounded-full mx-auto flex items-center justify-center mb-4 text-stone-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Awaiting Your Selection</p>
              </div>
            ) : (
              reservations.map((res) => (
                <ReservationCard key={res.id} reservation={res} />
              ))
            )}
          </div>
          
          <div className="mt-auto bg-stone-900 p-6 rounded-2xl text-white shadow-xl shadow-stone-900/20">
            <h4 className="royal-title text-lg mb-2 text-amber-200">The Palace Rule</h4>
            <p className="text-[10px] leading-relaxed opacity-60 italic">
              "We ensure every dish is a journey through India's rich heritage. Your table awaits."
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default App;
