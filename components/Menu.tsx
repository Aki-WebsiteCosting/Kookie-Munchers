import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface MenuProps {
  products: Product[];
  inventory: Record<string, number>;
  onAddToCart: (product: Product) => void;
}

export const Menu: React.FC<MenuProps> = ({ products, inventory, onAddToCart }) => {
  return (
    <section id="menu-section" className="py-20 px-4 md:px-8 bg-white rounded-t-[3rem] -mt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-cute text-5xl text-stone-800 mb-4">Fresh from the Oven</h2>
          <p className="text-stone-600 text-xl max-w-2xl mx-auto">
            Handcrafted daily using premium ingredients. Order now before they're all gone!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group bg-orange-50 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-orange-100 flex flex-col">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 shadow-md bg-white">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="font-bold text-stone-800">₱{product.price}</span>
                </div>
                {inventory[product.id] < 10 && (
                  <div className="absolute bottom-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    Only {inventory[product.id]} left!
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <h3 className="font-cute text-3xl text-stone-800 mb-2">{product.name}</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-orange-200/50">
                <div className="text-sm font-medium text-stone-500">
                  Daily Stock: {inventory[product.id]}
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={inventory[product.id] <= 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                    inventory[product.id] > 0
                      ? 'bg-stone-800 text-white hover:bg-stone-700 shadow-lg hover:shadow-xl'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {inventory[product.id] > 0 ? (
                    <>
                      <Plus size={18} /> Add to Cart
                    </>
                  ) : (
                    'Sold Out'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};