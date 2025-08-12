import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Facebook, Zap } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="text-2xl md:text-3xl font-bold mb-1">
      {count}{suffix}
    </div>
  );
};

const StatsBar = () => {
  const stats = [
    {
      icon: Calendar,
      number: 25,
      suffix: '+',
      label: 'Years Experience'
    },
    {
      icon: Users,
      number: 1000,
      suffix: '+',
      label: 'Past Customers'
    },
    {
      icon: Facebook,
      number: 4500,
      suffix: '++',
      label: 'Facebook Followers'
    },
    {
      icon: Zap,
      number: 0,
      suffix: '',
      label: 'Response'
    }
  ];

  return (
    <section className="py-9 md:py-12 lg:py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="flex justify-center mb-3">
                <stat.icon className="w-8 h-8" />
              </div>
              {stat.label === 'Response' ? (
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  Fast
                </div>
              ) : (
                <AnimatedCounter 
                  end={stat.number} 
                  suffix={stat.suffix}
                />
              )}
              <div className="text-sm md:text-base text-red-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;