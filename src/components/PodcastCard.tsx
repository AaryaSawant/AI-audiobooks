
import React from 'react';
import { Podcast } from 'lucide-react';

interface PodcastCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  isActive: boolean;
  onClick: () => void;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  title,
  description,
  imageSrc,
  isActive,
  onClick
}) => {
  return (
    <div 
      className={`glass-card rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        isActive ? 'border-podcast-accent ring-1 ring-podcast-accent/20' : 'hover:border-white/10'
      }`}
      onClick={onClick}
    >
      <div className="flex gap-4 items-center">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-podcast-accent/20 flex items-center justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Podcast 
              size={24} 
              className={`${isActive ? 'text-podcast-accent' : 'text-podcast-subtle'}`} 
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className={`font-medium ${isActive ? 'text-podcast-highlight' : 'text-podcast-text'}`}>
            {title}
          </h3>
          <p className="text-sm text-podcast-subtle line-clamp-2">{description}</p>
        </div>
        {isActive && (
          <div className="w-2 h-2 rounded-full bg-podcast-accent animate-pulse-soft"></div>
        )}
      </div>
    </div>
  );
};

export default PodcastCard;
