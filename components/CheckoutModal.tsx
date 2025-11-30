import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSubmitOrder: (formData: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, onSubmitOrder }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    contactNumber: '',
    deliveryMethod: 'pickup',
    address: '',
    notes: ''
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOrder(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-cute text-3xl text-stone-800">Complete Your Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          {/* Order Summary */}
          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-rose-400 rounded-full inline-block"></span>
              Order Summary
            </h3>
            <div className="space-y-2 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-stone-600">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-medium">₱{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-orange-200 pt-3 flex justify-between font-bold text-lg text-stone-800">
              <span>Total to Pay</span>
              <span>₱{total}</span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-stone-800 text-lg">Your Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500 ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                  placeholder="Cookie Monster"
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500 ml-1">Contact Number</label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                  placeholder="0912 345 6789"
                  value={formData.contactNumber}
                  onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-stone-500 ml-1">Email Address</label>
              <input
                required
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                placeholder="ilovecookies@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Delivery Method */}
          <div className="space-y-4">
            <h3 className="font-bold text-stone-800 text-lg">How should we get this to you?</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                formData.deliveryMethod === 'pickup' 
                  ? 'border-rose-400 bg-rose-50 text-rose-800' 
                  : 'border-stone-100 bg-white text-stone-500 hover:border-stone-200'
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={e => setFormData({...formData, deliveryMethod: e.target.value})}
                  className="hidden"
                />
                <span className="font-bold">Store Pickup</span>
                <span className="text-xs text-center opacity-80">96 Kaliraya St. Tatalon, QC</span>
              </label>

              <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                formData.deliveryMethod === 'delivery' 
                  ? 'border-rose-400 bg-rose-50 text-rose-800' 
                  : 'border-stone-100 bg-white text-stone-500 hover:border-stone-200'
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  value="delivery"
                  checked={formData.deliveryMethod === 'delivery'}
                  onChange={e => setFormData({...formData, deliveryMethod: e.target.value})}
                  className="hidden"
                />
                <span className="font-bold">Delivery</span>
                <span className="text-xs text-center opacity-80">Metro Manila Only</span>
              </label>
            </div>

            {formData.deliveryMethod === 'delivery' && (
              <div className="space-y-1 animate-in slide-in-from-top-2">
                <label className="text-sm font-medium text-stone-500 ml-1">Delivery Address</label>
                <textarea
                  required
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all h-24 resize-none"
                  placeholder="House No., Street, Barangay, City..."
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-stone-800 text-white rounded-xl font-bold text-lg hover:bg-stone-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Check size={20} /> Place Order
          </button>
        </form>
      </div>
    </div>
  );
};