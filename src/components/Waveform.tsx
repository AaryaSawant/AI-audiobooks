
import React from 'react';

interface WaveformProps {
  isPlaying: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ isPlaying }) => {
  // Generate bars with varying heights for waveform effect
  const bars = Array.from({ length: 20 }, (_, i) => {
    const height = Math.sin((i / 20) * Math.PI) * 100;
    const adjustedHeight = 30 + height * 0.5;
    
    return {
      height: `${adjustedHeight}%`,
      delay: `${i * 0.05}s`
    };
  });

  return (
    <div className="flex items-end h-10 gap-[2px]">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="wave-bar h-full"
          style={{
            height: bar.height,
            '--delay': bar.delay,
            '--speed': isPlaying ? '0.6s' : '0s',
            opacity: isPlaying ? 1 : 0.4,
          } as React.CSSProperties}
        ></div>
      ))}
    </div>
  );
};

export default Waveform;
