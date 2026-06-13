import React, { useRef, useState } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: string;
}

export default function TiltCard({ children, className = '', id }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const bounding = card.getBoundingClientRect();
    const width = bounding.width;
    const height = bounding.height;

    // Mouse coordinates relative to the card's top-left
    const mouseX = e.clientX - bounding.left;
    const mouseY = e.clientY - bounding.top;

    // Calculate rotation (-10deg to 10deg) based on mouse displacement
    const rotateY = ((mouseX / width) - 0.5) * 20; // max 10deg left/right
    const rotateX = (((mouseY / height) - 0.5) * -20); // max 10deg up/down (inverted for natural tilt)

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset smoothly back to zero angles
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      className={`transition-all duration-300 cubic-bezier(0.25, 0.46, 0.45, 0.94) preserve-3d cursor-pointer ${className} ${
        isHovered ? 'shadow-[0_15px_40px_rgba(0,212,255,0.18)] border-[rgba(0,212,255,0.45)]' : 'border-transparent'
      }`}
      style={{
        transform: transformStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full w-full" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}
