import React from 'react';
import { Phone, Search, Wrench, Sparkles, Shield, ArrowDown, ArrowRight } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: 1,
      icon: Phone,
      title: 'Contact Us',
      description: 'Free inspection for homeowners at KL & Selangor',
      color: 'bg-red-100 text-red-600',
      story: 'Call or WhatsApp to get connected with your local roofing experts.'
    },
    {
      number: 2,
icon: Search,
title: 'Free Inspection Performed',
description: '',
color: 'bg-green-100 text-green-600',
story: (
  <>
    Team ProRoof will perform a complete inspection for your home. We will clearly explain the issues and the problems. <strong>IT IS FREE.</strong>
  </>
)
    },
    {
      number: 3,
      icon: Shield,
      title: 'Invoice Issued + Written Warranty',
      description: '',
      color: 'bg-red-100 text-red-600',
      story: 'We give you a clear, line-item invoice and put the workmanship warranty in writing (up to 5 years).'
    },
    {
      number: 4,
      icon: Wrench,
      title: 'Professional Repair',
      description: '',
      color: 'bg-red-100 text-red-600',
      story: 'Our skilled team arrives with quality materials and completes the repair work with professional craftsmanship.'
    },
    {
      number: 5,
      icon: Sparkles,
      title: 'Clean Up',
      description: '',
      color: 'bg-green-100 text-green-600',
      story: 'We will clean up your area after project is done.'
    },
    {
      number: 6,
      icon: Shield,
      title: 'Installation Complete + Site Test',
      description: '',
      color: 'bg-red-100 text-red-600',
      story: 'Once the work is complete, we will conduct a full test and provide you with a  report, so you not worry about leakage anymore.'
    }
  ];

  return (
    <section id="process" className="py-9 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Roof Repair Journey
          </h2>

        </div>

        <div className="max-w-5xl mx-auto">
          {/* Desktop Flow Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-8 mb-12">
              {/* First Row - Steps 1, 2, 3 */}
              {steps.slice(0, 3).map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="flex items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.color} mr-4 flex-shrink-0`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-gray-400 flex-shrink-0">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 min-h-[3rem] flex items-center">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {step.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {step.story}
                    </p>
                  </div>
                  
                  {/* Arrow to next step */}
                  {index < 2 && (
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-red-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Connecting Arrow Down */}
            <div className="flex justify-center mb-12">
              <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                <ArrowDown className="w-6 h-6 text-red-400" />
              </div>
            </div>

            {/* Second Row - Steps 4, 5, 6 */}
            <div className="grid grid-cols-3 gap-8">
              {steps.slice(3, 6).map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="flex items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.color} mr-4 flex-shrink-0`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-gray-400 flex-shrink-0">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 min-h-[3rem] flex items-center">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {step.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {step.story}
                    </p>
                  </div>
                  
                  {/* Arrow to next step */}
                  {index < 2 && (
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-red-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Flow */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.color} mr-4`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-400">
                      Step {step.number}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {step.description}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {step.story}
                  </p>
                </div>
                
                {/* Connecting arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-4">
                    <ArrowDown className="w-6 h-6 text-red-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              We Provide Full Written Warranty For Our Service
            </h3>
            <p className="text-gray-600 mb-6">
             Contact us today to get your free inspection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+60178897151"
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Call 017-889 7151
              </a>
              <a
                href="https://wa.me/60178897151?text=I%20am%20interested%20in%20Free%20Inspection%20/%20Roof%20Leaking%20Repair.%0Ahttps%3A%2F%2Fproroof.my%2F%0A%0AName%3A%0AProblem%3A%0ABest%20Time%20for%20Inspection%20%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;