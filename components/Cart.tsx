import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    // We use visibility: hidden/visible to ensure it doesn't block clicks when closed
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-6 bg-rose-50 flex items-center justify-between border-b border-rose-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-rose-500" />
            <h2 className="font-cute text-2xl text-stone-800">Your Goodies</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-rose-100 rounded-full text-stone-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <ShoppingBag size={64} className="text-stone-300" />
              <p className="text-xl font-medium text-stone-500">Your cart is empty</p>
              <p className="text-sm text-stone-400">Time to fill it with sweetness!</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-rose-100 text-rose-600 rounded-full font-bold hover:bg-rose-200 transition-colors"
              >
                Go to Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 rounded-xl object-cover bg-white shadow-sm"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-800">{item.name}</h3>
                    <p className="text-rose-500 font-bold">₱{item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm text-stone-500 font-medium">
                      Subtotal: ₱{item.price * item.quantity}
                    </span>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-100 rounded-full transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-stone-100 space-y-4">
            <div className="flex items-center justify-between text-xl font-bold text-stone-800">
              <span>Total</span>
              <span>₱{total}</span>
            </div>
            <button
              onClick={() => {
                onCheckout();
                onClose();
              }}
              className="w-full py-4 bg-stone-800 text-white rounded-full font-bold hover:bg-stone-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              Proceed to Checkout
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};