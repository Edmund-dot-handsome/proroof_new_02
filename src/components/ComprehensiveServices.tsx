import React from 'react';

const ComprehensiveServices = () => {
  const services = [
    "Cement Roof Tiles Repair & Replacement",
    "Shingles Roof Repair & Replacement", 
    "Clay Tiles Roof Repair & Replacement",
    "Standing Seam Roof Repair & Replacement",
    "ASA Synthetic Roof Repair & Replacement",
    "Aluminium Composite Panel Roof (ACP) Repair & Replacement",
    "Metal Deck Roof Repair & Replacement",
    "Car Porch Roof Repair & Replacement",
    "Roof Leakage Repair",
    "Roof Leak Waterproofing",
    "Roof Waterproofing",
    "Skylight Roof Waterproofing",
    "Wall Seepage and Re-coating of Roofs",
    "Roof Leak Repair / Leaky Roof Repair",
    "Re-Roofing Service",
    "Waterproofing of Aluminium Composite Panel Roofs",
    "Commercial Roofing",
    "Replacement & Waterproofing of Roof Drain Gutter",
    "Gutter Repair Service",
    "Roof Tile Replacement",
    "No More Ugly Stains Or Rotting Ceilings"
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Roofing & Waterproofing Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From repairs to new installations, we've got every roof type covered.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12">
            {services.map((service, index) => (
              <div key={index} className="flex items-start mb-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                <span className="text-gray-900 leading-relaxed font-normal">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="flex justify-center">
            <a
              href="https://wa.me/60178897151?text=I%20am%20interested%20in%20Free%20Inspection%20/%20Roof%20Leaking%20Repair.%0Ahttps%3A%2F%2Fproroof.my%2F%0A%0AName%3A%0AProblem%3A%0ABest%20Time%20for%20Inspection%20%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-colors duration-200"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveServices;