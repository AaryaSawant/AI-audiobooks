
export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
}

// This would be fetched from an API in a real application
export const getPodcasts = (): Podcast[] => {
  return [
    {
      id: "ai-unit-1",
      title: "AI Unit 1",
      description: "Introduction to Artificial Intelligence and foundational concepts",
      audioUrl: "https://example.com/ai-unit-1.mp3" // Replace with actual URL when provided
    },
    {
      id: "ai-unit-2",
      title: "AI Unit 2",
      description: "Machine Learning algorithms and approaches",
      audioUrl: "https://example.com/ai-unit-2.mp3" // Replace with actual URL when provided
    },
    {
      id: "ai-unit-3",
      title: "AI Unit 3",
      description: "Neural Networks and Deep Learning fundamentals",
      audioUrl: "https://example.com/ai-unit-3.mp3" // Replace with actual URL when provided
    },
    {
      id: "ai-unit-4",
      title: "AI Unit 4",
      description: "Computer Vision and Natural Language Processing",
      audioUrl: "https://example.com/ai-unit-4.mp3" // Replace with actual URL when provided
    },
    {
      id: "ai-unit-5",
      title: "AI Unit 5",
      description: "Ethics in AI and future implications",
      audioUrl: "https://example.com/ai-unit-5.mp3" // Replace with actual URL when provided
    }
  ];
};
