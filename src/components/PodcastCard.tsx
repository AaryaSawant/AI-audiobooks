
import React from 'react';
import { BookAudio, Play } from 'lucide-react';

interface PodcastCardProps {
  title: string;
  description: string;
  duration?: string;
  category?: string;
  imageSrc?: string;
  isActive: boolean;
  onClick: () => void;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  title,
  description,
  duration,
  category,
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
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-podcast-accent/20 flex items-center justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <BookAudio 
              size={24} 
              className={`${isActive ? 'text-podcast-accent' : 'text-podcast-subtle'}`} 
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className={`font-medium ${isActive ? 'text-podcast-highlight' : 'text-podcast-text'}`}>
              {title}
            </h3>
            {isActive && (
              <div className="rounded-full bg-podcast-accent text-white px-2 py-0.5 text-xs flex items-center gap-1">
                <Play size={10} className="fill-white" />
                <span>Playing</span>
              </div>
            )}
          </div>
          <p className="text-sm text-podcast-subtle line-clamp-2 mb-1">{description}</p>
          <div className="flex justify-between items-center mt-2 text-xs text-podcast-subtle">
            {category && <span className="bg-podcast-card-bg/80 px-2 py-0.5 rounded">{category}</span>}
            {duration && <span>{duration}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
