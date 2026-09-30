import React from 'react';
import { Image } from 'lucide-react';

interface ImagePlaceholderProps {
  text: string;
  className?: string;
  aspectRatio?: string;
  theme?: 'orion' | 'tech' | 'design';
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  text,
  className = '',
  aspectRatio = 'aspect-video',
  theme = 'tech',
}) => {
  // Gradients for themes
  const gradients = {
    orion: 'linear-gradient(135deg, #F31614 0%, #1F1D77 100%)',
    tech: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    design: 'linear-gradient(135deg, #4f46e5 0%, #c084fc 100%)',
  };

  const selectedGradient = gradients[theme] || gradients.tech;

  return (
    <div
      className={`relative w-full rounded-lg overflow-hidden flex flex-col items-center justify-center border border-dashed border-gray-600/35 p-6 text-center select-none group transition-all duration-300 ${aspectRatio} ${className}`}
      style={{
        background: selectedGradient,
        minHeight: '180px',
      }}
    >
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="z-10 flex flex-col items-center gap-3">
        <div className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/20 text-white transform group-hover:scale-110 transition-transform duration-300">
          <Image size={24} className="opacity-90" />
        </div>
        <div className="text-white">
          <p className="font-semibold text-sm tracking-wide opacity-90">{text}</p>
          <p className="text-xs opacity-60 mt-1 font-mono">Format: JPG/PNG/WebP</p>
        </div>
      </div>
    </div>
  );
};
