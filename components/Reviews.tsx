import React from 'react';
import { Star } from 'lucide-react';

export const Reviews: React.FC = () => {
  const reviews = [
    {
      name: "Sarah M.",
      text: "The chocolate cookies are absolutely divine! Soft, chewy, and loaded with chocolate. Best in QC!",
      stars: 5,
      date: "2 days ago"
    },
    {
      name: "Miguel R.",
      text: "Ordered vanilla cupcakes for my sister's birthday. They were a hit! Not too sweet, just perfect.",
      stars: 5,
      date: "1 week ago"
    },
    {
      name: "Patricia L.",
      text: "Love the packaging and the taste. Definitely my new go-to for sweet cravings.",
      stars: 5,
      date: "3 weeks ago"
    }
  ];

  return (
    <section className="py-20 px-4 bg-rose-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-cute text-4xl text-stone-800 mb-2">Cookie Love</h2>
          <p className="text-stone-600">What our munchers are saying</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(review.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-stone-600 mb-6 italic">"{review.text}"</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-stone-800">{review.name}</span>
                <span className="text-stone-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};