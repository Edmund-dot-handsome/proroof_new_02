import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const testimonials = [
    {
      name: "Ahmad Rahman",
      location: "Shah Alam",
      rating: 5,
      text: "PROROOF fixed our valley leak perfectly. Very professional team and they cleaned up everything after the work. Highly recommended!",
      service: "Roof Leak Repair"
    },
    {
      name: "Siti Natijah",
      location: "Puchong",
      rating: 5,
      text: "Fast response and honest pricing. They explained everything clearly before starting work. Our ceiling stains are completely gone now.",
      service: "Roof Leak Repair"
    },
    {
      name: "David Lim",
      location: "Petaling Jaya",
      rating: 5,
      text: "Excellent workmanship on our ridge cap replacement. The team was punctual and the warranty gives us peace of mind.",
      service: "Roof Leak Repair"
    }
  ];

  return (
    <section id="reviews" className="py-9 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Google Reviews
          </h2>
        </div>

        {/* Customer Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-red-600 mr-3" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
                <div className="text-xs text-red-600 font-medium mt-1">{testimonial.service}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;