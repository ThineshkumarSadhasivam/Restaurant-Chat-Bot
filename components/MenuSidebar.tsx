
import React from 'react';
import { COMPRESSED_MENU_JSON } from '../constants';

const MenuSidebar: React.FC = () => {
  const menuData = JSON.parse(COMPRESSED_MENU_JSON);
  
  // Group menu by category
  const categories = ['Appetizers', 'Main Courses', 'Desserts'];
  
  return (
    <div className="space-y-10">
      {categories.map(category => {
        const items = menuData.filter((item: any) => 
          item.c === category || (category === 'Appetizers' && item.c === 'App')
        );
        
        if (items.length === 0) return null;

        return (
          <div key={category} className="animate-in fade-in slide-in-from-left-4 duration-700">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700 mb-6 flex items-center gap-4">
              <span className="whitespace-nowrap">{category}</span>
              <div className="h-[1px] w-full bg-gradient-to-r from-amber-200 to-transparent"></div>
            </h3>
            
            <div className="space-y-8">
              {items.map((item: any) => (
                <div key={item.id} className="group cursor-default relative pl-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {item.n}
                    </span>
                    <span className="text-[10px] font-black text-amber-900">₹{item.p * 100}</span>
                  </div>
                  <p className="text-[10px] text-stone-500 leading-relaxed mb-3 pr-4">
                    {item.d}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.t.map((tag: string) => (
                      <span key={tag} className={`text-[7px] uppercase font-black px-2 py-0.5 rounded-full border tracking-tighter ${
                        tag === 'v' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        tag === 'hot' ? 'bg-red-50 text-red-700 border-red-100' :
                        tag === 'gf' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-amber-50 text-amber-800 border-amber-100'
                      }`}>
                        {tag === 'v' ? 'Vegetarian' : tag === 'gf' ? 'Gluten Free' : tag === 'sea' ? 'Seafood' : 'Signature'}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-12 p-5 rounded-2xl bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <p className="text-[9px] font-bold text-amber-400 uppercase tracking-[0.2em] mb-2">Heritage Note</p>
        <p className="text-[10px] text-stone-300 leading-relaxed italic opacity-80">
          "Each spice is sourced from its ancestral home, ensuring the soul of India is in every bite."
        </p>
      </div>
    </div>
  );
};

export default MenuSidebar;
