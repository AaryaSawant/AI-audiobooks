
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Waveform from './Waveform';

interface AudioPlayerProps {
  src: string;
  title: string;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  src, 
  title, 
  isPlaying, 
  setIsPlaying,
  audioRef
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    
    // Set initial volume
    audio.volume = volume;
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioRef, volume]);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleTimeChange = (newValue: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue[0];
      setCurrentTime(newValue[0]);
    }
  };
  
  const handleVolumeChange = (newValue: number[]) => {
    const volumeValue = newValue[0];
    setVolume(volumeValue);
    
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
      if (volumeValue === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-card rounded-xl p-4 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="w-20">
              <Slider
                defaultValue={[0.7]}
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="h-1"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6">
          <button
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-podcast-subtle"
            onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; }}
          >
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-podcast-accent hover:bg-podcast-accent/90 text-white transition-colors flex items-center justify-center"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          
          <button
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-podcast-subtle"
            onClick={() => { if (audioRef.current) audioRef.current.currentTime = duration; }}
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-podcast-subtle">{formatTime(currentTime)}</span>
          <div className="flex-1 relative">
            <Slider
              defaultValue={[0]}
              value={[currentTime]}
              max={duration || 1}
              step={0.1}
              onValueChange={handleTimeChange}
              className="h-1"
            />
            <div className="absolute -top-4 left-0 right-0">
              <Waveform isPlaying={isPlaying} />
            </div>
          </div>
          <span className="text-xs text-podcast-subtle">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
