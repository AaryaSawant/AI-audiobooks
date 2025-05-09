
export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration?: string;
  category?: string;
}

// Function to convert Google Drive view links to direct download links
const convertGoogleDriveLink = (viewLink: string): string => {
  // Extract file ID from the Google Drive URL
  const fileIdMatch = viewLink.match(/\/d\/(.+?)\/view/);
  if (fileIdMatch && fileIdMatch[1]) {
    // Use a more reliable format for audio playback
    return `https://docs.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  }
  return viewLink;
};

// Podcast data with Google Drive links and updated durations
export const getPodcasts = (): Podcast[] => {
  return [
    {
      id: "ai-unit-1",
      title: "AI Unit 1",
      description: "Introduction to Artificial Intelligence and foundational concepts",
      audioUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1B-yn8tYw9pzobCjwcp02ddB07Kolusgy/view?usp=drive_link"),
      duration: "24:15",
      category: "AI Fundamentals"
    },
    {
      id: "ai-unit-2",
      title: "AI Unit 2",
      description: "Machine Learning algorithms and approaches",
      audioUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1HmcHYEjnJhUFwEXG6932ECO0IqJB9jpT/view?usp=drive_link"),
      duration: "21:38",
      category: "Machine Learning"
    },
    {
      id: "ai-unit-3",
      title: "AI Unit 3",
      description: "Neural Networks and Deep Learning fundamentals",
      audioUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1mbdgI0rHio7iWsoxwHGn3ZSXdPoo73e_/view?usp=drive_link"),
      duration: "28:50",
      category: "Deep Learning"
    },
    {
      id: "ai-unit-4",
      title: "AI Unit 4",
      description: "Computer Vision and Natural Language Processing",
      audioUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1E6CVrXOwSSwsmwcCHWpAWlID1t5PCflD/view?usp=drive_link"),
      duration: "25:22",
      category: "Applied AI"
    },
    {
      id: "ai-unit-5",
      title: "AI Unit 5",
      description: "Ethics in AI and future implications",
      audioUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1bS_pUijuYTgXV8LOf7juSXVD_8BCc5B0/view?usp=drive_link"),
      duration: "22:45",
      category: "AI Ethics"
    }
  ];
};
