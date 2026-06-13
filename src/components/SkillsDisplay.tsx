import { useEffect, useRef, useState } from 'react';
import { Skill } from '../types';

interface SkillsDisplayProps {
  skills: Skill[];
}

export default function SkillsDisplay({ skills }: SkillsDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1500; // Animation duration in ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const nextValues: { [key: string]: number } = {};
      skills.forEach((skill) => {
        nextValues[skill.id] = Math.round(skill.value * progress);
      });

      setAnimatedValues(nextValues);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, skills]);

  const techSkills = skills.filter((s) => s.category === 'technical');
  const profSkills = skills.filter((s) => s.category === 'professional');

  // SVG parameters for the Donut Chart
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.3

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      
      {/* Left Column: Technical Skills */}
      <div className="space-y-6">
        <h3 className="text-xl font-display font-semibold text-[#00d4ff] mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
          Technical Expertise
        </h3>
        <div className="space-y-5">
          {techSkills.map((skill) => {
            const currentVal = animatedValues[skill.id] || 0;
            return (
              <div key={skill.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-white font-mono">{skill.name}</span>
                  <span className="text-[#00d4ff] font-semibold">{currentVal}%</span>
                </div>
                {/* Custom Gradient Progress Bar */}
                <div className="w-full h-3 bg-[#112240] rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] transition-all duration-100 ease-out rounded-full shadow-[0_0_10px_rgba(0,212,255,0.4)]"
                    style={{
                      width: `${currentVal}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Professional Skills */}
      <div>
        <h3 className="text-xl font-display font-semibold text-[#7c3aed] mb-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-ping" />
          Professional Characteristics
        </h3>
        
        {/* SVG Circular Donut Chart Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          {profSkills.map((skill) => {
            const currentVal = animatedValues[skill.id] || 0;
            const strokeDashoffset = circumference - (currentVal / 100) * circumference;

            return (
              <div key={skill.id} className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl glass-card transition-all">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* SVG Donut Circle */}
                  <svg className="w-24 h-24 -rotate-90">
                    {/* Background Circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      className="stroke-[#112240] fill-none"
                      strokeWidth="6"
                    />
                    {/* Glowing Filled Ring */}
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      className="stroke-[url(#circularGlow)] fill-none transition-all duration-100 ease-out"
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                    {/* SVG Gradient Definition */}
                    <defs>
                      <linearGradient id="circularGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Centered Value */}
                  <span className="absolute text-sm font-semibold text-white font-mono">
                    {currentVal}%
                  </span>
                </div>
                <span className="text-xs font-medium text-[#8892b0] tracking-wide uppercase">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
