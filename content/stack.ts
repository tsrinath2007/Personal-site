export interface StackRow {
  category: string;
  chips?: string[];
  paragraph?: string;
}

export const stackData: StackRow[] = [
  {
    category: "Languages",
    chips: ["TypeScript", "JavaScript", "Python", "C++", "C", "Java", "SQL", "HTML/CSS"]
  },
  {
    category: "Frameworks",
    chips: ["Next.js", "React", "Node.js", "FastAPI", "WebSockets", "Streamlit", "Framer Motion", "Tailwind CSS"]
  },
  {
    category: "AI and systems",
    chips: ["GraphRAG", "TigerGraph", "RAG systems", "ElevenLabs STT", "Groq", "Tesseract.js and WASM", "Model Context Protocol"]
  },
  {
    category: "Tools",
    chips: ["Vercel", "Render", "Mapbox GL JS", "Git and GitHub", "Docker", "Polygon Amoy", "PostgreSQL", "IndexedDB"]
  },
  {
    category: "How I work",
    paragraph: "I prototype fast with AI coding tools and ship under hackathon deadlines. I am learning machine learning and AI, with a growing interest in building AI applications."
  }
];
