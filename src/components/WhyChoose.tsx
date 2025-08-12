import React from 'react';
import { 
  Eye, 
  Award, 
  Shield, 
  DollarSign, 
  HeadphonesIcon, 
  Sparkles, 
  Camera, 
  Clock 
} from 'lucide-react';

const WhyChoose = () => {
  const reasons = [
    {
      icon: Eye,
      title: 'FREE site inspection & personalized quotation',
      description: 'Before any work begins'
    },
    {
      icon: Award,
      title: '25+ years experience & 1,000+ leaks fixed',
      description: 'Proven track record of success'
    },
    {
      icon: Shield,
      title: 'Up to 5-year written warranty',
      description: 'Stated clearly on your invoice'
    },
    {
      icon: DollarSign,
      title: 'Affordable pricing that follows market rates',
      description: 'Fair and transparent pricing'
    },
    {
      icon: HeadphonesIcon,
      title: 'Real after-sales service',
      description: 'We support you even after the job'
    },
    {
      icon: Sparkles,
      title: 'We respect property cleanliness',
      description: 'Clean site area before we leave'
    },
    {
      icon: Camera,
      title: 'Progress updates during work',
      description: 'Photos and videos of our progress'
    },
    {
      icon: Clock,
      title: 'Fast replies; no middlemen/outsourcing',
      description: 'Direct communication with our team'
    }
  ];

  return (
    <section className="py-9 md:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose PROROOF
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            What makes us the trusted choice for roof leak repair in KL & Selangor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <reason.icon className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-center text-sm">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-xs text-center">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;