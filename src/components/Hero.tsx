
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-10 md:py-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-10 w-40 h-40 bg-podcast-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-60 h-60 bg-podcast-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Audio</span> Lecture Notes
            <br />
            <span className="text-gradient">Simplified</span>
          </h1>
          
          <p className="text-podcast-subtle text-lg mb-8 max-w-xl mx-auto">
            Optimize your study time with concise audio summaries of complex AI topics.
            Perfect for revision on-the-go.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-podcast-highlight font-medium">5 AI Topics</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-podcast-highlight font-medium">Audio Summaries</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-podcast-highlight font-medium">Interactive 3D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
