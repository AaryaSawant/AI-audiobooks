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
      audioUrl: "/audio/Unit 1.wav",
      category: "AI Fundamentals"
    },
    {
      id: "ai-unit-2",
      title: "AI Unit 2",
      description: "AI Unit 2 Lecture",
      audioUrl: "/audio/Unit 2.wav",
      category: "Machine Learning"
    },
    {
      id: "ai-unit-3",
      title: "AI Unit 3",
      description: "AI Unit 3 Lecture",
      audioUrl: "/audio/Unit 3.wav",
      category: "Deep Learning"
    },
    {
      id: "ai-unit-4",
      title: "AI Unit 4",
      description: "AI Unit 4 Lecture",
      audioUrl: "/audio/Unit 4.wav",
      category: "Applied AI"
    },
    {
      id: "ai-unit-5",
      title: "AI Unit 5",
      description: "AI Unit 5 Lecture",
      audioUrl: "/audio/Unit 5.wav",
      category: "AI Ethics"
    }
  ];
};
