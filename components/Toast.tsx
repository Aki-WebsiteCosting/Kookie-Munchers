import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-stone-800 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 min-w-[300px]">
        <div className="bg-green-500 rounded-full p-1">
          <CheckCircle size={16} className="text-white" />
        </div>
        <p className="font-medium text-sm flex-1">{message}</p>
        <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};