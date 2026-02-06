
import React from 'react';
import { Reservation } from '../types';

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  return (
    <div className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Decorative Gold Border */}
      <div className="absolute inset-x-0 top-0 h-1 gold-gradient"></div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-black tracking-tighter text-amber-900 opacity-30 uppercase">Conf ID</span>
            <span className="text-[11px] font-black text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
              {reservation.id}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-bold uppercase text-emerald-600 flex items-center gap-1 justify-end">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              Confirmed
            </span>
          </div>
        </div>

        <h4 className="text-xs font-bold text-stone-800 mb-3 truncate pr-2">
          {reservation.name}
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">Schedule</p>
            <p className="text-[10px] text-stone-600 font-medium">
              {reservation.date}<br/>
              <span className="text-stone-900 font-bold">{reservation.time}</span>
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">Party Size</p>
            <p className="text-[10px] text-amber-800 font-black">
              {reservation.partySize} {reservation.partySize === 1 ? 'Guest' : 'Guests'}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-amber-200 rounded-full"></div>
          <p className="text-[9px] text-stone-400 italic truncate">
            {reservation.email}
          </p>
        </div>
      </div>

      {/* Subtle Bottom Pattern */}
      <div className="h-0.5 w-full bg-stone-50 group-hover:bg-amber-100 transition-colors"></div>
    </div>
  );
};

export default ReservationCard;
