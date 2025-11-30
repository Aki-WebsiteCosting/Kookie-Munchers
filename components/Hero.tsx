import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center p-6 overflow-hidden bg-gradient-to-b from-rose-100 via-orange-50 to-orange-50 z-10">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-20 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="relative z-20 max-w-4xl mx-auto space-y-6">
        <div className="animate-fade-in-down">
          <span className="inline-block py-1 px-3 rounded-full bg-rose-200 text-rose-800 text-sm font-bold tracking-wider mb-4 shadow-sm">
            EST. 2024
          </span>
          <h1 className="font-cute text-6xl md:text-8xl lg:text-9xl text-stone-900 mb-2 drop-shadow-sm leading-tight">
            Kookie Munchers
          </h1>
          <p className="font-cute text-2xl md:text-4xl text-stone-800 mt-2 opacity-90">
            Freshly Baked Happiness
          </p>
        </div>

        <p className="text-lg md:text-2xl text-stone-700 max-w-2xl mx-auto leading-relaxed font-medium">
          Homemade with love, butter, and a sprinkle of magic. 
          The sweetest way to start your day! 🍪✨
        </p>

        <div className="pt-8">
          <button 
            onClick={onScrollToMenu}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-rose-400 font-body rounded-full hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-200 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            See the Menu
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};