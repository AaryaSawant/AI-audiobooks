
import React from 'react';
import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-podcast-dark-bg/80 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="relative">
          <BookOpen size={28} className="text-podcast-accent" />
          <div className="absolute -inset-1 bg-podcast-accent/20 rounded-full blur-md -z-10"></div>
        </div>
        <h1 className="text-xl md:text-2xl font-bold">
          <span className="text-gradient">AudioScape</span>
          <span className="text-podcast-subtle ml-1">Revision Hub</span>
        </h1>
      </div>
      <nav>
        <ul className="flex gap-6">
          <li><a href="#" className="text-podcast-subtle hover:text-podcast-highlight transition-colors">Home</a></li>
          <li><a href="#" className="text-podcast-subtle hover:text-podcast-highlight transition-colors">About</a></li>
          <li><a href="#" className="text-podcast-subtle hover:text-podcast-highlight transition-colors">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
