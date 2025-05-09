export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration?: string;
  category?: string;
}

// Podcast data with local audio files
export const getPodcasts = (): Podcast[] => {
  return [
    {
      id: "ai-unit-1",
      title: "AI Unit 1",
      description: "AI Unit 1 Lecture",
      audioUrl: "/audio/ai-unit-1.mp3",
      category: "AI Fundamentals"
    },
    {
      id: "ai-unit-2",
      title: "AI Unit 2",
      description: "AI Unit 2 Lecture",
      audioUrl: "/audio/ai-unit-2.mp3",
      category: "Machine Learning"
    },
    {
      id: "ai-unit-3",
      title: "AI Unit 3",
      description: "AI Unit 3 Lecture",
      audioUrl: "/audio/ai-unit-3.mp3",
      category: "Deep Learning"
    },
    {
      id: "ai-unit-4",
      title: "AI Unit 4",
      description: "AI Unit 4 Lecture",
      audioUrl: "/audio/ai-unit-4.mp3",
      category: "Applied AI"
    },
    {
      id: "ai-unit-5",
      title: "AI Unit 5",
      description: "AI Unit 5 Lecture",
      audioUrl: "/audio/ai-unit-5.mp3",
      category: "AI Ethics"
    }
  ];
};
