import React from 'react';
import { Download, Package, Users, DollarSign, X } from 'lucide-react';
import { Order, Inventory } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  inventory: Inventory;
  products: any[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, orders, inventory, products }) => {
  if (!isOpen) return null;

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const downloadCSV = () => {
    const headers = ['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Delivery Type'];
    const rows = orders.map(order => [
      order.id,
      order.customerName,
      order.items.map(i => `${i.quantity}x ${i.name}`).join('; '),
      order.total,
      order.status,
      new Date(order.timestamp).toLocaleDateString(),
      order.deliveryMethod
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "kookie_munchers_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-stone-900/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 bg-stone-800 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-rose-500 p-2 rounded-lg">
              <Package size={24} />
            </div>
            <div>
              <h2 className="font-bold text-xl">Admin Dashboard</h2>
              <p className="text-stone-400 text-sm">Manage orders & inventory</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-stone-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Users size={24} />
                </div>
                <span className="text-green-500 text-sm font-bold flex items-center bg-green-50 px-2 py-1 rounded-full">
                  Live
                </span>
              </div>
              <h3 className="text-stone-500 text-sm font-medium">Total Orders</h3>
              <p className="text-3xl font-bold text-stone-800">{orders.length}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <DollarSign size={24} />
                </div>
              </div>
              <h3 className="text-stone-500 text-sm font-medium">Total Revenue</h3>
              <p className="text-3xl font-bold text-stone-800">₱{totalRevenue}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Package size={24} />
                </div>
              </div>
              <h3 className="text-stone-500 text-sm font-medium">Low Stock Alerts</h3>
              <div className="space-y-1 mt-2">
                {products.map(p => (
                  <div key={p.id} className="flex justify-between text-sm">
                    <span className="text-stone-600">{p.name}</span>
                    <span className={`font-bold ${inventory[p.id] < 10 ? 'text-rose-500' : 'text-stone-800'}`}>
                      {inventory[p.id]} remaining
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h3 className="font-bold text-stone-800 text-lg">Recent Orders</h3>
              <button 
                onClick={downloadCSV}
                className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors font-medium text-sm"
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 text-sm">
                  <tr>
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Items</th>
                    <th className="p-4 font-medium">Total</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-stone-400">
                        No orders yet
                      </td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-4 font-mono text-xs text-stone-400">#{order.id.slice(0,8)}</td>
                        <td className="p-4">
                          <div className="font-bold text-stone-800">{order.customerName}</div>
                          <div className="text-xs text-stone-500">{order.email}</div>
                        </td>
                        <td className="p-4 text-sm text-stone-600">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </td>
                        <td className="p-4 font-bold text-stone-800">₱{order.total}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            Completed
                          </span>
                        </td>
                        <td className="p-4 text-sm text-stone-500">
                          {new Date(order.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};