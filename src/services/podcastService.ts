
export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration?: string; // Optional duration field
  category?: string; // Optional category field
}

// Replace these with your actual Google Drive links
export const getPodcasts = (): Podcast[] => {
  return [
    {
      id: "ai-unit-1",
      title: "AI Unit 1",
      description: "Introduction to Artificial Intelligence and foundational concepts",
      audioUrl: "https://example.com/ai-unit-1.mp3", // Replace with your Google Drive link
      duration: "14:32",
      category: "AI Fundamentals"
    },
    {
      id: "ai-unit-2",
      title: "AI Unit 2",
      description: "Machine Learning algorithms and approaches",
      audioUrl: "https://example.com/ai-unit-2.mp3", // Replace with your Google Drive link
      duration: "16:45",
      category: "Machine Learning"
    },
    {
      id: "ai-unit-3",
      title: "AI Unit 3",
      description: "Neural Networks and Deep Learning fundamentals",
      audioUrl: "https://example.com/ai-unit-3.mp3", // Replace with your Google Drive link
      duration: "18:20",
      category: "Deep Learning"
    },
    {
      id: "ai-unit-4",
      title: "AI Unit 4",
      description: "Computer Vision and Natural Language Processing",
      audioUrl: "https://example.com/ai-unit-4.mp3", // Replace with your Google Drive link
      duration: "15:10",
      category: "Applied AI"
    },
    {
      id: "ai-unit-5",
      title: "AI Unit 5",
      description: "Ethics in AI and future implications",
      audioUrl: "https://example.com/ai-unit-5.mp3", // Replace with your Google Drive link
      duration: "12:55",
      category: "AI Ethics"
    }
  ];
};
