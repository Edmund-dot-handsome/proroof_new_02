import React from 'react';
import { Phone, MessageCircle, Shield, Eye, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 lg:pt-24">
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        controls={false}
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/ProRoof-logo-transparent.png"
        style={{ objectFit: 'cover' }}
      >
        <source src="/public/hero.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white py-7 md:py-9 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-[36px] md:text-6xl lg:text-7xl font-bold mb-2 md:mb-3 leading-tight">
            #1 Choice for Roof Repair in{' '}
            <span className="text-red-400">KL & Selangor</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-xl lg:text-2xl mb-3 md:mb-4 text-gray-200">
            Trusted workmanship with 5-year leak-free warranty.
          </p>

          {/* Promise Chips */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-2 border border-white/20">
              <Eye className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm md:text-sm font-medium">Free on-site inspection</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-2 border border-white/20">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm md:text-sm font-medium">Written warranty on invoice</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-2 border border-white/20">
              <FileText className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm md:text-sm font-medium">Problem of leakage clearly explained before work</span>
            </div>
          </div>

          {/* Phone Number Display */}
          <div className="mb-6">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              017-889 7151
            </div>
            <p className="text-gray-300">Call us now for immediate assistance <span className="text-gray-400">or</span></p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
            <a
              href="#inspection"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 md:px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg mx-auto"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Book Your Free Inspection Now
            </a>
          </div>

          {/* Reply Time Text */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">Typical replies within 2 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;