export interface ProjectItem {
  id: string;
  kick: string;
  title: string;
  description: string;
  facts: string[];
  chips: string[];
  links: {
    label: string;
    url: string;
  }[];
}

export const projects: ProjectItem[] = [
  {
    id: "gofocusgen",
    kick: "Live · May 2026 to present · self-founded",
    title: "GoFocusGen",
    description: "A study companion where every session is a flight on a domestic Indian route. The session length sets the path.",
    facts: [
      "Interactive route visualization",
      "Coin and streak economy",
      "AI study plan generator and Google sign-in",
      "Real-time multiplayer Co-Pilots Lounge"
    ],
    chips: ["Next.js", "Mapbox GL JS", "Framer Motion", "Google OAuth", "Web Audio API", "Vercel"],
    links: [
      { label: "Live site", url: "https://gofocusgen.vercel.app/" },
      { label: "Source", url: "https://github.com/tsrinath2007/FlightEdu" }
    ]
  },
  {
    id: "bujji",
    kick: "Live · 2026 to present · new venture",
    title: "Bujji",
    description: "Instead of cramming, students explain a concept to Bujji by voice or chat. Bujji builds a concept graph as they talk and points out the links they are missing.",
    facts: [
      "Concept knowledge graph that grows as you explain",
      "Real-time misconception diagnosis",
      "Voice sessions",
      "Public beta waitlist and survey dashboard"
    ],
    chips: ["Next.js", "Active recall", "Feynman technique", "Knowledge graphs", "Vercel"],
    links: [
      { label: "Live site", url: "https://heybujji.vercel.app/" },
      { label: "Source", url: "https://github.com/tsrinath2007/bujji" }
    ]
  }
];
