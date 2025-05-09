import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AudioPlayer from '@/components/AudioPlayer';
import PodcastCard from '@/components/PodcastCard';
import { getPodcasts, Podcast } from '@/services/podcastService';
import Waveform from '@/components/Waveform';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [podcasts] = useState<Podcast[]>(getPodcasts);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Pre-load the audio element when a podcast is selected
  useEffect(() => {
    if (selectedPodcast && audioRef.current) {
      // Reset the audio element
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      
      // Add error handling for audio loading
      const handleError = (e: any) => {
        console.error("Audio loading error:", e);
        toast.error("Failed to load audio file. Please try again.");
        setIsPlaying(false);
      };

      audioRef.current.addEventListener('error', handleError);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [selectedPodcast]);

  const handlePodcastSelect = (podcast: Podcast) => {
    // If selecting the same podcast that's already playing, just toggle play/pause
    if (selectedPodcast?.id === podcast.id) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(error => {
              console.error("Error playing audio:", error);
              toast.error("Could not play this podcast. Please try again later.");
            });
        }
      }
      return;
    }
    
    // Otherwise, select the new podcast
    setSelectedPodcast(podcast);
    setIsPlaying(false);
    
    // Give the audio element time to update with the new source
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error("Error playing audio:", error);
            toast.error("Could not play this podcast. Please try again later.");
          });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-podcast-dark-bg flex flex-col">
      <Header />
      <audio 
        ref={audioRef} 
        src={selectedPodcast?.audioUrl} 
        onEnded={() => setIsPlaying(false)}
        preload="auto"
        hidden
      />
      
      <main className="flex-1">
        <Hero />
        
        <div className="container px-4 mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">AI Lecture Podcasts</h2>
                <span className="text-xs text-podcast-subtle bg-podcast-card-bg px-2 py-1 rounded-full">{podcasts.length} episodes</span>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                {podcasts.map((podcast) => (
                  <PodcastCard
                    key={podcast.id}
                    title={podcast.title}
                    description={podcast.description}
                    duration={podcast.duration}
                    category={podcast.category}
                    isActive={selectedPodcast?.id === podcast.id}
                    onClick={() => handlePodcastSelect(podcast)}
                  />
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="glass-card rounded-xl p-8 mb-6 bg-gradient-to-br from-podcast-card-bg via-podcast-card-bg to-podcast-accent/5">
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-2xl font-bold mb-3">
                    <span className="text-gradient">Audio Revision Hub</span>
                  </h2>
                  <p className="text-podcast-subtle mb-6 max-w-md">
                    Listen to concise summaries of your AI lecture notes to aid with revision and learning.
                  </p>
                  <div className="w-full max-w-md h-12 bg-podcast-card-bg/50 rounded-lg overflow-hidden flex items-center justify-center">
                    {isPlaying ? (
                      <div className="w-3/4">
                        <Waveform isPlaying={isPlaying} />
                      </div>
                    ) : (
                      <p className="text-podcast-subtle">Select a podcast to start listening</p>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedPodcast ? (
                <AudioPlayer
                  src={selectedPodcast.audioUrl}
                  title={selectedPodcast.title}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  audioRef={audioRef}
                />
              ) : (
                <div className="glass-card rounded-xl p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">Select a podcast to start</h3>
                  <p className="text-podcast-subtle">
                    Choose one of the AI lecture summaries from the list to begin listening
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-4 border-t border-white/5">
        <div className="container mx-auto">
          <p className="text-center text-podcast-subtle">
            &copy; {new Date().getFullYear()} AudioScape Revision Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
