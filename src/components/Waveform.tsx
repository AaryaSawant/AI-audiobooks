
import React from 'react';

interface WaveformProps {
  isPlaying: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ isPlaying }) => {
  // Generate bars with varying heights for waveform effect
  const bars = Array.from({ length: 40 }, (_, i) => {
    // Create a more interesting pattern with multiple sine waves
    const height = Math.sin((i / 20) * Math.PI) * 0.5 + 
                  Math.sin((i / 10) * Math.PI) * 0.3 + 
                  Math.sin((i / 5) * Math.PI) * 0.2;
    
    const adjustedHeight = 20 + Math.abs(height) * 40;
    
    return {
      height: `${adjustedHeight}%`,
      delay: `${i * 0.03}s`
    };
  });

  return (
    <div className="flex items-end h-8 gap-[1px]">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="wave-bar h-full"
          style={{
            height: bar.height,
            '--delay': bar.delay,
            '--speed': isPlaying ? '0.8s' : '0s',
            opacity: isPlaying ? 1 : 0.4,
            backgroundColor: isPlaying ? 'var(--podcast-accent-color, #8B5CF6)' : 'var(--podcast-subtle-color, #9CA3AF)',
          } as React.CSSProperties}
        ></div>
      ))}
    </div>
  );
};

export default Waveform;
