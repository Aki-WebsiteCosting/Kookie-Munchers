import React from 'react';

export const Gallery: React.FC = () => {
  // Updated list with reliable, high-quality Unsplash images
  const images = [
    'https://images.unsplash.com/photo-1499636138143-bd630f5cf446?auto=format&fit=crop&q=80&w=400', // Chocolate Chip Cookies
    'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=80&w=400', // Pink Cupcake
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', // Stack of Cookies
    'https://images.unsplash.com/photo-1563729768-6af7c46d6614?auto=format&fit=crop&q=80&w=400', // Cupcake Tray
    'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=80&w=400', // Soft Cookies
    'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=400', // Dark Chocolate Treats
  ];

  return (
    <section className="bg-orange-50 py-12 overflow-hidden relative z-10 border-b border-orange-100/50">
      <div className="max-w-[100vw] overflow-hidden">
        <div className="flex w-max animate-scroll hover:pause-on-hover">
          {/* First set of images */}
          <div className="flex gap-6 px-3">
            {images.map((src, index) => (
              <div 
                key={`a-${index}`} 
                className="w-64 h-64 rounded-2xl overflow-hidden shadow-md flex-shrink-0 transform transition-transform hover:scale-105"
              >
                <img 
                  src={src} 
                  alt="Kookie Munchers Treat" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Duplicate set for infinite scroll illusion */}
          <div className="flex gap-6 px-3">
            {images.map((src, index) => (
              <div 
                key={`b-${index}`} 
                className="w-64 h-64 rounded-2xl overflow-hidden shadow-md flex-shrink-0 transform transition-transform hover:scale-105"
              >
                <img 
                  src={src} 
                  alt="Kookie Munchers Treat" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Triplicate set for wider screens */}
          <div className="flex gap-6 px-3">
            {images.map((src, index) => (
              <div 
                key={`c-${index}`} 
                className="w-64 h-64 rounded-2xl overflow-hidden shadow-md flex-shrink-0 transform transition-transform hover:scale-105"
              >
                <img 
                  src={src} 
                  alt="Kookie Munchers Treat" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};