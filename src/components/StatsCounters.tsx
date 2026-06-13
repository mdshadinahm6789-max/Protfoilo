import React, { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Stat } from '../types';

interface StatsCountersProps {
  stats: Stat[];
}

export default function StatsCounters({ stats }: StatsCountersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

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

    const duration = 2000; // Animation length in ms
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Simple ease-out exponential
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts: { [key: string]: number } = {};
      stats.forEach((stat) => {
        nextCounts[stat.id] = Math.floor(stat.value * easeProgress);
      });

      setCounts(nextCounts);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, stats]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-[#0d1b2a] via-[#112240] to-[#0d1b2a] px-6 py-8 md:py-12 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative linear line highlight */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />

      {stats.map((stat) => {
        // Dynamically resolution of Lucide Icons
        let IconElement = LucideIcons.HelpCircle as React.ComponentType<any>;
        if (stat.iconName === 'Workflow') IconElement = LucideIcons.Workflow;
        else if (stat.iconName === 'Smile') IconElement = LucideIcons.Smile;
        else if (stat.iconName === 'Edit2') IconElement = LucideIcons.Edit2;
        else if (stat.iconName === 'Coffee') IconElement = LucideIcons.Coffee;

        const currentCount = counts[stat.id] || 0;

        return (
          <div key={stat.id} className="flex flex-col items-center justify-center text-center space-y-2 group">
            <div className="p-3 bg-[#0a0f1e]/80 rounded-xl border border-white/5 text-[#00d4ff] group-hover:scale-110 group-hover:border-[#00d4ff]/30 transition-transform duration-300">
              <IconElement className="w-6 h-6 stroke-[1.5]" />
            </div>
            
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight flex items-baseline justify-center">
              <span>{currentCount}</span>
              <span className="text-[#00d4ff] ml-[2px]">{stat.suffix}</span>
            </div>
            
            <div className="text-xs sm:text-sm font-medium tracking-wider text-[#8892b0] uppercase font-sans">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
