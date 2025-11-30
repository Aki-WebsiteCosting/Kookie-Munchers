import React from 'react';
import { Heart, Sparkles, ChefHat } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-rose-100 rounded-full blur-xl opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-100 rounded-full blur-xl opacity-60"></div>
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800" 
              alt="Baking with love" 
              className="relative rounded-[2rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          
          <div className="space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-800 text-sm font-bold tracking-wider">
              OUR STORY
            </span>
            <h2 className="font-cute text-5xl text-stone-800">Baking the World a Better Place</h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              Kookie Munchers started in a small home kitchen in Quezon City with a simple dream: to create the perfect chocolate cookie. 
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              We believe that the secret ingredient really is love (and a lot of premium butter!). Every batch is mixed, rolled, and baked fresh every single morning. No preservatives, just pure happiness.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-rose-50 rounded-2xl">
                <Heart className="mx-auto text-rose-500 mb-2" />
                <span className="font-bold text-stone-700 text-sm">Made with Love</span>
              </div>
              <div className="text-center p-4 bg-rose-50 rounded-2xl">
                <ChefHat className="mx-auto text-rose-500 mb-2" />
                <span className="font-bold text-stone-700 text-sm">Fresh Daily</span>
              </div>
              <div className="text-center p-4 bg-rose-50 rounded-2xl">
                <Sparkles className="mx-auto text-rose-500 mb-2" />
                <span className="font-bold text-stone-700 text-sm">Premium Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};