
import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioElement?: HTMLAudioElement | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, audioElement }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    
    const setupAnalyser = () => {
      if (!audioElement) return;
      
      audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioElement);
      const analyser = audioContext.createAnalyser();
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
    };
    
    const teardownAnalyser = () => {
      if (audioContext) {
        if (audioContext.state !== 'closed') {
          audioContext.close();
        }
      }
    };
    
    if (audioElement && !analyserRef.current) {
      setupAnalyser();
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      teardownAnalyser();
    };
  }, [audioElement]);
  
  useEffect(() => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match the display size
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    
    const draw = () => {
      if (!ctx || !isPlaying) return;
      
      animationRef.current = requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 3D effect parameters
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      const barCount = 120;
      const barWidth = Math.PI * 2 / barCount;
      
      for (let i = 0; i < barCount; i++) {
        // Map dataArray index to the number of bars
        const dataIndex = Math.floor(i / barCount * dataArray.length);
        const barHeight = dataArray[dataIndex] * 0.5 + 10;
        
        const angle = i * barWidth;
        
        const innerRadius = radius - barHeight / 2;
        const outerRadius = radius + barHeight / 2;
        
        const innerX = centerX + Math.cos(angle) * innerRadius;
        const innerY = centerY + Math.sin(angle) * innerRadius;
        const outerX = centerX + Math.cos(angle) * outerRadius;
        const outerY = centerY + Math.sin(angle) * outerRadius;
        
        // Create gradient for the bar
        const gradient = ctx.createLinearGradient(innerX, innerY, outerX, outerY);
        gradient.addColorStop(0, `rgba(138, 92, 246, ${dataArray[dataIndex] / 255})`);
        gradient.addColorStop(1, `rgba(196, 181, 253, ${dataArray[dataIndex] / 255 * 0.7})`);
        
        ctx.beginPath();
        
        // Calculate points for the bar with some width
        const angle2 = (i + 1) * barWidth;
        const innerX2 = centerX + Math.cos(angle2) * innerRadius;
        const innerY2 = centerY + Math.sin(angle2) * innerRadius;
        const outerX2 = centerX + Math.cos(angle2) * outerRadius;
        const outerY2 = centerY + Math.sin(angle2) * outerRadius;
        
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.lineTo(outerX2, outerY2);
        ctx.lineTo(innerX2, innerY2);
        ctx.closePath();
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };
    
    if (isPlaying) {
      draw();
    }
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);
  
  return (
    <div className="relative w-full h-full min-h-[300px]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0"
        style={{ opacity: isPlaying ? 1 : 0.3, transition: 'opacity 0.5s' }}
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-podcast-subtle">Play a podcast to see visualization</p>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
