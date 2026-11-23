export interface HackathonSubItem {
  title: string;
  description: string;
  links?: {
    label: string;
    url: string;
  }[];
}

export interface HackathonArticle {
  id: string;
  kick: string;
  title: string;
  description?: string;
  subItems?: HackathonSubItem[];
  chips?: string[];
  links?: {
    label: string;
    url: string;
  }[];
  relatedBlogSlug?: string;
  relatedBlogTitle?: string;
}

export const hackathons: HackathonArticle[] = [
  {
    id: "hacker-house-goa",
    kick: "Hacker House Goa 2026 · 10-team selection · team of 3",
    title: "Three sprint tasks",
    subItems: [
      {
        title: "Voice RAG Dashboard",
        description: "Voice retrieval with ElevenLabs speech-to-text and multi-strategy chunking over ai4bharat/MSMARCO-XI. Built to target sub-200ms latency, deployed on Vercel, with a full UI redesign.",
        links: [
          { label: "Live", url: "https://goat-task2.vercel.app/" },
          { label: "Source", url: "https://github.com/tsrinath2007/Task-2" }
        ]
      },
      {
        title: "Face detection and blockchain CLI",
        description: "Face detection and reverse image search, with cryptographic state anchoring on the Polygon Amoy testnet. Runs from the command line.",
        links: [
          { label: "Source", url: "https://github.com/tsrinath2007/task-3" }
        ]
      },
      {
        title: "SENTINEL",
        description: "An autonomous fraud investigation agent over a 590k-transaction IEEE-CIS graph. It works through 5,565 closed cases and a 20-case benchmark with TigerGraph, MCP and GraphRAG, and returns a JSON verdict per case.",
        links: [
          { label: "Live", url: "https://task-4-nvan.onrender.com/" },
          { label: "Source", url: "https://github.com/tsrinath2007/Task-4" }
        ]
      }
    ]
  },
  {
    id: "parallax",
    kick: "Smart India Hackathon 2026 · SIH26171, ISRO · team of 6 · feasibility lead",
    title: "Parallax",
    description: "A Manifest V3 Chrome extension that finds and redacts personal information in screenshots on the device, before anything reaches a cloud AI. OCR runs client-side with Tesseract.js and WebAssembly, and an 80% confidence gate fails safe.",
    chips: ["Manifest V3", "Tesseract.js", "WebAssembly", "IndexedDB"]
  },
  {
    id: "resume-ranker",
    kick: "Nexora Hackathon, MIT Bengaluru · solo build",
    title: "resume_ranker",
    description: "A resume ranking pipeline that mixes semantic and keyword matching and runs fully offline with no LLM APIs. It includes a job description bias checker and a side-by-side candidate comparison.",
    chips: ["Python", "Streamlit", "Semantic matching", "Bias detection"]
  },
  {
    id: "scaler-openenv",
    kick: "Scaler OpenEnv Hackathon · Round 2 Finalist",
    title: "Scaler OpenEnv",
    description: "An AI-driven telemetry monitoring and life-support simulation sandbox with reinforcement learning and automated failure recovery.",
    chips: ["Python", "FastAPI", "Simulation", "RL", "LoRA"]
  },
  {
    id: "pulse-rail",
    kick: "Zuup Hackathon · May 2026",
    title: "PULSE RAIL",
    description: "A railway track health monitor. Axle box accelerometers pick up impact vibration, and a Wavelet Packet Transform on the edge node isolates anomaly signatures in real time. A simulated payload relays to India's Kavach anti-collision interfaces.",
    chips: ["C++", "Python", "Wavelet Packet Transform", "Raspberry Pi", "React"],
    links: [
      { label: "Source", url: "https://github.com/tsrinath2007/FarAway" }
    ]
  }
];
