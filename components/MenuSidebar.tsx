
import React from 'react';
import { COMPRESSED_MENU_JSON } from '../constants';

const MenuSidebar: React.FC = () => {
  const menuData = JSON.parse(COMPRESSED_MENU_JSON);
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 mb-6 flex items-center gap-3">
          The Royal Menu
          <div className="h-[1px] flex-1 bg-amber-100"></div>
        </h3>
        
        <div className="space-y-6">
          {menuData.map((item: any) => (
            <div key={item.id} className="group cursor-default relative">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-tight">
                  {item.n}
                </span>
                <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">₹{item.p * 100}</span>
              </div>
              <p className="text-[10px] text-stone-400 italic leading-relaxed mb-2">
                {item.d}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border border-stone-200 text-stone-400">
                  {item.c === 'App' ? 'Appetizer' : item.c}
                </span>
                {item.t.map((tag: string) => (
                  <span key={tag} className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                    tag === 'v' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                    tag === 'hot' ? 'bg-red-50 text-red-700 border-red-100' :
                    'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {tag === 'v' ? 'Veg' : tag === 'gf' ? 'Gluten Free' : tag === 'sea' ? 'Seafood' : 'Chef Choice'}
                  </span>
                ))}
              </div>
              
              {/* Subtle underline on hover */}
              <div className="absolute -left-2 top-0 bottom-0 w-[2px] bg-amber-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
        <p className="text-[9px] font-bold text-amber-800 uppercase tracking-widest mb-1 text-center">Dietary Notice</p>
        <p className="text-[9px] text-amber-600/80 text-center leading-relaxed">
          Please inform our concierge about any specific allergies during the booking process.
        </p>
      </div>
    </div>
  );
};

export default MenuSidebar;
