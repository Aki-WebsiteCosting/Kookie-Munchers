import React, { useState, useEffect } from 'react';
import { ShoppingBag, Lock, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { Gallery } from './components/Gallery';
import { CheckoutModal } from './components/CheckoutModal';
import { Reviews } from './components/Reviews';
import { AdminDashboard } from './components/AdminDashboard';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Toast } from './components/Toast';
import { Product, CartItem, Order, Inventory } from './types';

// Initial Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Chocolate Cookie',
    price: 15,
    image: 'https://i.postimg.cc/ZqdD1pWH/Chocolate-Cookie.jpg',
    description: 'Rich, gooey, and packed with premium dark chocolate chunks. A classic favorite!'
  },
  {
    id: 'p2',
    name: 'Vanilla Cupcake',
    price: 20,
    image: 'https://i.postimg.cc/ryQgZQf3/Vanilla-Cupcake.jpg',
    description: 'Fluffy vanilla sponge topped with our signature buttercream swirl.'
  }
];

const INITIAL_INVENTORY: Inventory = {
  'p1': 50,
  'p2': 30
};

export default function App() {
  // State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<Inventory>(INITIAL_INVENTORY);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('kookie_orders');
    const savedInventory = localStorage.getItem('kookie_inventory');
    
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedInventory) setInventory(JSON.parse(savedInventory));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('kookie_orders', JSON.stringify(orders));
    localStorage.setItem('kookie_inventory', JSON.stringify(inventory));
  }, [orders, inventory]);

  // Handlers
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleScrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const handleSubmitOrder = (formData: any) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      timestamp: new Date().toISOString(),
      status: 'completed',
      ...formData
    };

    // Update Inventory
    const newInventory = { ...inventory };
    cart.forEach(item => {
      newInventory[item.id] = Math.max(0, newInventory[item.id] - item.quantity);
    });

    setInventory(newInventory);
    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);

    // Show custom toast instead of alert
    showToast(`Thank you ${formData.customerName}! Your order has been placed.`);

    // Prepare Email (optional delay to let them see the toast)
    setTimeout(() => {
      const itemsList = cart.map(i => `${i.quantity}x ${i.name}`).join('%0D%0A');
      const emailBody = `New Order from ${formData.customerName}!%0D%0A%0D%0AItems:%0D%0A${itemsList}%0D%0A%0D%0ATotal: ₱${newOrder.total}%0D%0ADelivery Method: ${formData.deliveryMethod}%0D%0AAddress: ${formData.address || 'N/A'}`;
      window.location.href = `mailto:KookieMunchers@gmail.com?subject=New Order #${newOrder.id}&body=${emailBody}`;
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍪</span>
              <span className="font-cute text-2xl text-stone-800">Kookie Munchers</span>
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-600 hover:bg-rose-50 rounded-full transition-colors"
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Hero onScrollToMenu={handleScrollToMenu} />
        <Gallery />
        <About />
        <Menu 
          products={INITIAL_PRODUCTS} 
          inventory={inventory}
          onAddToCart={handleAddToCart}
        />
        <FAQ />
        <Reviews />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-rose-50 pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="font-cute text-3xl text-rose-300">Kookie Munchers</h3>
            <p className="text-stone-400 leading-relaxed">
              Baking the world a better place, one cookie at a time. Homemade in Quezon City with 100% love.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-rose-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-rose-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xl text-rose-200">Contact Us</h4>
            <ul className="space-y-3 text-stone-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-rose-400" />
                96 Kaliraya St. Tatalon, Quezon City
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-rose-400" />
                0927 494 1329
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-rose-400" />
                KookieMunchers@gmail.com
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xl text-rose-200">Opening Hours</h4>
            <div className="space-y-2 text-stone-400">
              <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p>Sat: 9:00 AM - 4:00 PM</p>
              <p className="text-rose-400 font-medium">Sun: Closed for baking!</p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            © 2024 Kookie Munchers. All rights reserved.
          </p>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-2 text-xs text-stone-700 hover:text-stone-500 transition-colors"
          >
            <Lock size={12} /> Admin Access
          </button>
        </div>
      </footer>

      {/* Modals */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
      />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onSubmitOrder={handleSubmitOrder}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        inventory={inventory}
        products={INITIAL_PRODUCTS}
      />

      <Toast 
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}