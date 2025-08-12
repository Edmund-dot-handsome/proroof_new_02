import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WarningSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('inspection');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-red-600 to-red-700">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Warning Text */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            A small leak now could cost{' '}
            <span className="text-yellow-300">RM20,000</span>{' '}
            if bigger damage.
          </h2>

          {/* CTA Button */}
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-red-600 font-bold text-xl py-6 px-10 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl"
          >
            Get Your Free Roof Inspection Now
          </button>

          {/* Supporting Text */}
          <p className="text-red-100 text-lg mt-6 max-w-2xl mx-auto">
            Don't wait until it's too late. Early detection saves thousands in repair costs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WarningSection;