import React from 'react';
import { MapPin } from 'lucide-react';

const RecentWork = () => {
  const recentProjects = [
    {
      id: 1,
      image: '/bestwork/01.jpg',
      caption: '',
      location: 'Residential at Shah Alam',
      alt: 'Valley flashing repair work in Shah Alam'
    },
    {
      id: 2,
      image: '/bestwork/02.jpg',
      caption: '',
      location: 'Residential at Teluk Pulai , Klang',
      alt: 'Ridge cap replacement in Puchong'
    },
    {
      id: 3,
      image: '/bestwork/03.jpg',
      caption: '',
      location: 'Residential at Ampang , Selangor',
      alt: 'Gutter repair in Petaling Jaya'
    },
    {
      id: 4,
      image: '/bestwork/04.jpg',
      caption: '',
      location: 'Residential at Subang Jaya , Selangor',
      alt: 'Chimney flashing repair in Subang Jaya'
    },
    {
      id: 5,
      image: '/bestwork/05.jpg',
      caption: '',
      location: 'Residential at Sri Kembangan',
      alt: 'Pipe penetration sealing in Kajang'
    },
    {
      id: 6,
      image: '/bestwork/06.jpg',
      caption: '',
      location: 'Residential at Kapar , Selangor',
      alt: 'Wall flashing installation in Ampang'
    }
  ];

  return (
    <section className="py-9 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Recent Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Latest roof leak repairs completed across KL & Selangor
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {recentProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-64 md:h-80 object-cover"
                />
                {/* PROROOF Watermark */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-bold">
                  <img 
                    src="/ProRoof-logo-transparent.png" 
                    alt="PROROOF" 
                    className="w-8 h-5 object-contain"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.caption}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWork;