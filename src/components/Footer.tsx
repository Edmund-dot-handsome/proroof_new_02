import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <img 
            src="/ProRoof-logo-transparent.png" 
            alt="PROROOF Logo" 
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} PROROOF. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center md:text-right max-w-md">
            Privacy Note: Photos and videos you share are used only for diagnosis and quotation purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;