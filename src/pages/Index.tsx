import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AudioPlayer from '@/components/AudioPlayer';
import AudioVisualizer from '@/components/AudioVisualizer';
import PodcastCard from '@/components/PodcastCard';
import { getPodcasts, Podcast } from '@/services/podcastService';

const Index = () => {
  const [podcasts] = useState<Podcast[]>(getPodcasts);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePodcastSelect = (podcast: Podcast) => {
    // If selecting the same podcast that's already playing, just toggle play/pause
    if (selectedPodcast?.id === podcast.id) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch(error => console.error("Error playing audio:", error));
          setIsPlaying(true);
        }
      }
      return;
    }
    
    // Otherwise, select the new podcast
    setSelectedPodcast(podcast);
    setIsPlaying(false);
    
    // We'll start playing after the audio element loads the new source
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
        setIsPlaying(true);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-podcast-dark-bg flex flex-col">
      <Header />
      <audio 
        ref={audioRef} 
        src={selectedPodcast?.audioUrl} 
        onEnded={() => setIsPlaying(false)} 
        hidden
      />
      
      <main className="flex-1">
        <Hero />
        
        <div className="container px-4 mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold mb-4">AI Lecture Podcasts</h2>
              <div className="space-y-3">
                {podcasts.map((podcast) => (
                  <PodcastCard
                    key={podcast.id}
                    title={podcast.title}
                    description={podcast.description}
                    isActive={selectedPodcast?.id === podcast.id}
                    onClick={() => handlePodcastSelect(podcast)}
                  />
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="h-[300px] mb-6 glass-card rounded-xl overflow-hidden">
                <AudioVisualizer isPlaying={isPlaying} audioElement={audioRef.current} />
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
