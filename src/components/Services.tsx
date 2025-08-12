import React from 'react';
import { Home, Layers, Search } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Roof Leakage Repair",
      description: (
        <>
          We diagnose the root cause and fix only what's needed, ensuring your home stays dry and protected in heavy rain. <strong>WRITTEN WARRANTY INCLUDED.</strong>
        </>
      )
    },
    {
      icon: Layers,
      title: "Roof Waterproofing",
      description: (
        <>
          We help you prevent future leaks with professional waterproofing using high-quality materials so you <strong>DON'T NEED REPAIR AGAIN</strong> and again.
        </>
      )
    },
    {
      icon: Search,
      title: "Free Site Inspection for Leaks",
      description: (
        <>
          Not sure where the leak is? We will <strong>INSPECT YOUR ROOF FOR FREE</strong>, explain the issue clearly, and provide a personalized, quotation.
        </>
      )
    }
  ];

  return (
    <section id="services" className="py-9 md:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide professional solutions for all your roof leakage problems
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-red-600" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {typeof service.description === 'string' ? service.description : service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;