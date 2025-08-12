import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProblemSigns = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const signs = [
    {
      title: 'Roof leak repair work',
      image: '/work/01.jpg',
      alt: 'Roof repair work – 1'
    },
    {
      title: 'Waterproofing application',
      image: '/work/02.jpg',
      alt: 'Roof repair work – 2'
    },
    {
      title: 'Tile replacement work',
      image: '/work/03.jpg',
      alt: 'Roof repair work – 3'
    },
    {
      title: 'Flashing repair',
      image: '/work/04.jpg',
      alt: 'Roof repair work – 4'
    },
    {
      title: 'Gutter maintenance',
      image: '/work/05.jpg',
      alt: 'Roof repair work – 5'
    },
    {
      title: 'Ridge cap installation',
      image: '/work/06.jpg',
      alt: 'Roof repair work – 6'
    },
    {
      title: 'Valley repair work',
      image: '/work/07.jpg',
      alt: 'Roof repair work – 7'
    },
    {
      title: 'Membrane installation',
      image: '/work/08.jpg',
      alt: 'Roof repair work – 8'
    },
    {
      title: 'Sealant application',
      image: '/work/09.jpg',
      alt: 'Roof repair work – 9'
    },
    {
      title: 'Complete roof restoration',
      image: '/work/10.jpg',
      alt: 'Roof repair work – 10'
    },
    {
      title: 'Complete roof restoration',
      image: '/work/11.jpg',
      alt: 'Roof repair work – 11'
    },
    {
      title: 'Complete roof restoration',
      image: '/work/12.jpg',
      alt: 'Roof repair work – 12'
    }
  ];

  const totalSlides = signs.length;

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.scrollWidth / totalSlides;
      scrollRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % totalSlides;
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    scrollToSlide(prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const slideWidth = scrollRef.current.scrollWidth / totalSlides;
        const currentIndex = Math.round(scrollRef.current.scrollLeft / slideWidth);
        setCurrentSlide(currentIndex);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [totalSlides]);

  return (
    <section className="py-9 md:py-12 lg:py-16 bg-red-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Signs You Need Roof Leak Repair
          </h2>
          <p className="text-lg md:text-xl text-red-100 max-w-3xl mx-auto">
            Drips from the ceiling and stains on the wall are classic leak signs. Especially when rainy days.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows - Now visible on all devices */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Carousel Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 md:gap-6 pb-4 px-12 md:px-16"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {signs.map((sign, index) => (
              <div
                key={index}
                className="flex-none w-full md:w-1/2 lg:w-1/3 snap-start"
              >
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-red-100">
                  <div className="bg-gray-200 relative">
                    <img
                      src={sign.image}
                      alt={sign.alt}
                      className="w-full h-80 object-cover object-center"
                      loading="lazy"
                    />
                    {/* Watermark */}
                    <div className="absolute bottom-3 left-3">
                      <img
                        src="/no background.png"
                        alt="PROROOF watermark"
                        className="w-24 h-auto opacity-60"
                        style={{ maxWidth: '120px', minWidth: '90px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots - Now 10 dots */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {signs.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? 'bg-white'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSigns;