import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "How long do the cookies last?",
      a: "Our cookies are best enjoyed within 3-5 days if kept in an airtight container. But honestly, they usually disappear within minutes!"
    },
    {
      q: "Do you deliver outside Quezon City?",
      a: "Currently, we only offer delivery within Metro Manila via Lalamove or Grab. Shipping fees are calculated upon confirmation."
    },
    {
      q: "Do you have gluten-free options?",
      a: "Not yet! We are currently experimenting with gluten-free recipes in our kitchen. Stay tuned!"
    },
    {
      q: "Can I pre-order for parties?",
      a: "Absolutely! For bulk orders (2 dozen or more), please message us at least 2 days in advance so we can prepare."
    }
  ];

  return (
    <section className="py-20 px-4 bg-orange-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-cute text-4xl text-stone-800 mb-2">Frequently Asked Questions</h2>
          <p className="text-stone-600">Curious minds want to know!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-stone-800 text-lg mb-2 flex items-start gap-2">
                <HelpCircle size={20} className="text-rose-400 mt-1 shrink-0" />
                {item.q}
              </h3>
              <p className="text-stone-600 ml-7">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};