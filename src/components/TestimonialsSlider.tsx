import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleAutoplay = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(handleAutoplay);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      
      {/* Decorative quotes graphic floating behind */}
      <div className="absolute -top-10 -left-6 text-[#112240] select-none pointer-events-none opacity-20">
        <Quote className="w-24 h-24 rotate-180" />
      </div>

      {/* Slider View container */}
      <div className="relative overflow-hidden rounded-3xl bg-[#112240]/25 backdrop-blur-md border border-white/5 p-8 sm:p-12 min-h-[300px] flex items-center">
        
        {/* Testimonials layout loop with absolute transition positioning */}
        {testimonials.map((t, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={t.id}
              className={`transition-all duration-700 ease-in-out flex flex-col md:flex-row gap-6 items-center ${
                isActive ? 'opacity-100 scale-100 relative w-full' : 'opacity-0 scale-95 absolute h-0 w-full overflow-hidden'
              }`}
            >
              
              {/* Left Profile Avatar Sphere */}
              <div className="shrink-0 relative">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${t.avatarGradient} flex items-center justify-center text-white text-2xl font-bold font-display shadow-lg border border-white/10 select-none`}>
                  {t.author.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#00d4ff] text-[#0a0f1e] p-1.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                
                {/* Visual Stars */}
                <div className="flex justify-center md:justify-start gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.stars ? 'text-[#00d4ff] fill-[#00d4ff]' : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote Paragraph */}
                <p className="text-base sm:text-lg italic font-sans text-white/95 leading-relaxed">
                  "{t.quote}"
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="text-sm sm:text-base font-display font-extrabold text-white">
                    {t.author}
                  </h4>
                  <p className="text-xs text-[#8892b0] font-mono">
                    {t.role}
                  </p>
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Manual Button controls */}
      <div className="flex justify-between items-center mt-6">
        {/* Navigation Dot indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? 'w-8 bg-[#00d4ff]' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Previous/Next Arrows */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-[#112240]/40 border border-white/5 text-[#8892b0] hover:text-[#00d4ff] hover:bg-[#112240] active:scale-90 transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-[#112240]/40 border border-white/5 text-[#8892b0] hover:text-[#00d4ff] hover:bg-[#112240] active:scale-90 transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}
