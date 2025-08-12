import React from 'react';
import { ArrowRight } from 'lucide-react';

const Gallery = () => {
  const projects = [
    { 
      id: 1, 
      beforeImage: '/beforeafter/work01b.webp', 
      afterImage: '/beforeafter/work01a.webp',
      afterCaption: 'Valley leak sealed & water-tested • 1 day'
    },
    { 
      id: 2, 
      beforeImage: '/beforeafter/work02b.webp', 
      afterImage: '/beforeafter/work02a.webp',
      afterCaption: 'Ridge cap replaced & waterproofed • 2 days'
    },
    { 
      id: 3, 
      beforeImage: '/beforeafter/work03b.webp', 
      afterImage: '/beforeafter/work03a.webp',
      afterCaption: 'Gutter repaired & realigned • 1 day'
    },
    { 
      id: 4, 
      beforeImage: '/beforeafter/work04b.webp', 
      afterImage: '/beforeafter/work04a.webp',
      afterCaption: 'Flashing sealed & tested • 1 day'
    }
  ];

  return (
    <section id="before-after" className="py-16 bg-gray-50" style={{ scrollMarginTop: '96px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Before & After Work</h2>
          <p className="text-lg text-gray-600">See the transformation of our roof leak repair projects</p>
        </div>

        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.id} className="ba-pair">
              {/* Before Image */}
              <figure className="before">
                <div className="card">
                  <img
                    src={project.beforeImage}
                    alt={`Before – Project ${String(project.id).padStart(2, '0')}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="label before-badge">BEFORE</div>
                </div>
              </figure>

              {/* Arrow */}
              <div className="arrow">
                <span>
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </span>
              </div>

              {/* After Image */}
              <figure className="after">
                <div className="card">
                  <img
                    src={project.afterImage}
                    alt={`After – Project ${String(project.id).padStart(2, '0')}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="label after-badge">AFTER</div>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;