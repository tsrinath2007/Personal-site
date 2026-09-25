export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'Live' | 'Prototype' | 'Hackathon Build';
  event?: string;
  award?: string;
  date: string;
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "astro-copilot",
    title: "AstroCopilot",
    tagline: "AI mission copilot for spacecraft ECLSS telemetry monitoring",
    description: "An intelligent life-support telemetry monitoring copilot built to predict spacecraft ECLSS failures before alarms trigger, framed around ISRO's Gaganyaan program. Implements a PPO reinforcement-learning agent for autonomous adjustments and a fine-tuned Qwen2.5 model for structured anomaly explanations.",
    techStack: ["Qwen2.5", "PPO RL", "ISRO Gaganyaan ECLSS", "FastAPI", "WebSockets", "Next.js"],
    githubUrl: "https://github.com/tsrinath2007/Life-Support-ENV",
    status: "Hackathon Build",
    event: "Scaler OpenEnv Hackathon",
    award: "Top 1000 // Round 1 Qualifier (AI Living for India)",
    date: "Apr 2026",
    highlights: [
      "Built an AI copilot monitoring spacecraft ECLSS telemetry (oxygen, CO2, pressure, power) before alarms trigger",
      "Implemented a PPO reinforcement-learning agent and fine-tuned Qwen2.5 model for structured anomaly explanations",
      "Streamed live telemetry via WebSockets with sub-250ms latency; modeled 12 spacecraft parameters"
    ]
  },
  {
    id: "go-focus-gen",
    title: "GoFocusGen",
    tagline: "Gamified study-productivity platform mapping session durations to real flight paths",
    description: "A self-founded gamified productivity companion where study sessions are visual domestic flights across India. Features an interactive route visualization, coin/streak gamification economy, AI-powered study plan generator, Google OAuth, and real-time multiplayer 'Co-Pilots Lounge'.",
    techStack: ["Next.js", "Mapbox GL JS", "Framer Motion", "Google OAuth", "Web Audio API", "Vercel"],
    liveUrl: "https://gofocusgen.vercel.app/",
    githubUrl: "https://github.com/tsrinath2007/FlightEdu",
    status: "Live",
    event: "STARTUP // SELF-FOUNDED",
    date: "May 2026 – Present",
    highlights: [
      "Built interactive flight route visualization mapping study sessions to domestic Indian flight paths",
      "Shipped coin/streak economy, AI-powered study plan generator, Google OAuth, and multiplayer Co-Pilots Lounge",
      "Owned end-to-end product UI/UX (dark/gold aesthetic), Vercel deployment, and GTM indexing & social launch"
    ]
  },
  {
    id: "pulse-rail",
    title: "PULSE RAIL",
    tagline: "Railway track vibration health monitor using WPT edge-processing",
    description: "A physical edge-computing prototype monitoring structural track stability. Uses axle box accelerometers to measure track impact vibrations and on-node Wavelet Packet Transform (WPT) to isolate anomaly signatures in real-time, integrating into India's Kavach anti-collision network protocols.",
    techStack: ["C++", "Python", "Wavelet Packet Transform", "Raspberry Pi", "Kavach API", "React"],
    githubUrl: "https://github.com/tsrinath2007/FarAway",
    status: "Prototype",
    award: "Hackathon Build",
    event: "Zuup Hackathon",
    date: "May 2026 – Present",
    highlights: [
      "Built edge-computing prototype using accelerometers and on-node WPT to detect rail vibration anomalies in real time",
      "Constructed simulation dashboard displaying track decay hotspots and stress heatmaps",
      "Simulated packet relay payloads for India's Kavach anti-collision beacon interfaces"
    ]
  },
  {
    id: "life-support-env",
    title: "Life Support ENV",
    tagline: "ECLSS habitat simulation sandbox with fine-tuned LLM recovery",
    description: "A simulated sandbox environment mimicking life-support loop parameters. Combines a PPO RL model with a Qwen2.5-1.5B model adapted using a custom LoRA adapter on 1,200+ pages of NASA life-support reports to optimize oxygen scrubbers and water reclamation loops during failures.",
    techStack: ["PPO RL", "Qwen2.5-1.5B", "LoRA", "Python", "Gradio", "HuggingFace Spaces"],
    githubUrl: "https://github.com/tsrinath2007/Scaler-Round-2",
    status: "Hackathon Build",
    event: "Samsung Solve for Tomorrow",
    award: "Top 10 Finalist (Round 2)",
    date: "Jun 2026",
    highlights: [
      "Fine-tuned Qwen2.5-1.5B with custom LoRA adapter on 1,200+ pages of NASA life-support reports",
      "Simulated system failures (leaks, blockages, filter decay) and trained a PPO RL model to recover optimal ranges",
      "Hosted public Gradio app on HuggingFace Spaces with live Python simulator back-end"
    ]
  },
  {
    id: "parallax",
    title: "Parallax",
    tagline: "On-device visual PII detection & redaction Chrome extension",
    description: "Chrome Extension (Manifest V3) for on-device visual PII detection and redaction before screenshots reach cloud AI, built for Smart India Hackathon 2026 (SIH26171 — ISRO's on-device visual perception problem statement). Built with a 6-person team, leading feasibility and viability.",
    techStack: ["Tesseract.js", "WebAssembly", "Regex Matching", "80% OCR Gate", "IndexedDB", "Manifest V3"],
    status: "Hackathon Build",
    event: "Smart India Hackathon 2026",
    award: "SIH26171 (ISRO) · Team of 6 (Feasibility Lead)",
    date: "2026",
    highlights: [
      "Intercepts screenshots on-device via Manifest V3 before visual data reaches cloud AI",
      "Client-side visual OCR via Tesseract.js & WebAssembly paired with regex pattern detection",
      "Enforces strict 80% OCR confidence fail-safe gate with local IndexedDB persistence"
    ]
  },
  {
    id: "resume-ranker",
    title: "resume_ranker",
    tagline: "Hybrid semantic resume ranking engine & JD bias auditor",
    description: "Solo build for the Nexora Hackathon at MIT Bengaluru — a Python & Streamlit resume ranking pipeline using hybrid semantic and keyword matching without external LLM API dependencies, with a JD bias checker and candidate comparison tool under an 'InternLoom' branded UI.",
    techStack: ["Python", "Streamlit", "Semantic Matching", "Keyword Matching", "Bias Detection", "InternLoom UI"],
    status: "Hackathon Build",
    event: "Nexora Hackathon (MIT Bengaluru)",
    award: "Solo Build · InternLoom UI",
    date: "2026",
    highlights: [
      "Constructed hybrid semantic + keyword matching pipeline operating 100% offline with zero LLM APIs",
      "Built automated Job Description (JD) bias auditing and side-by-side candidate comparison matrix",
      "Packaged in an interactive Python & Streamlit dashboard under custom 'InternLoom' branding"
    ]
  }
];

export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "C", "TypeScript", "JavaScript", "SQL", "HTML/CSS"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["Next.js", "React", "FastAPI", "WebSockets", "Framer Motion", "Node.js", "Express"]
  },
  {
    category: "AI / ML & Systems",
    items: ["PPO (RL)", "Qwen 2.5", "LoRA Fine-tuning", "PyTorch", "HuggingFace", "Gradio"]
  },
  {
    category: "Tools & Deployment",
    items: ["Mapbox GL JS", "Vercel", "Docker", "Git/GitHub", "HuggingFace Spaces", "PostgreSQL", "Google OAuth"]
  }
];

export const APPROACH_DETAILS = {
  approach: "AI-assisted / vibe coding — rapid prototyping and shipping with AI coding tools",
  currentlyLearning: "Machine Learning & AI, with a growing interest in building AI applications"
};

export interface HackathonItem {
  event: string;
  project: string;
  projectId: string;
  outcome: string;
  date: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const HACKATHONS: HackathonItem[] = [
  {
    event: "Samsung Solve for Tomorrow",
    project: "Life Support ENV",
    projectId: "life-support-env",
    outcome: "Top 10 Finalist (Round 2)",
    date: "Jun 2026",
    githubUrl: "https://github.com/tsrinath2007/Scaler-Round-2"
  },
  {
    event: "Zuup Hackathon",
    project: "PULSE RAIL",
    projectId: "pulse-rail",
    outcome: "Railway Track Health Monitor Prototype",
    date: "May 2026",
    githubUrl: "https://github.com/tsrinath2007/FarAway"
  },
  {
    event: "Scaler OpenEnv Hackathon",
    project: "AstroCopilot",
    projectId: "astro-copilot",
    outcome: "Top 1000 // Round 1 Qualifier (AI Living for India)",
    date: "Apr 2026",
    githubUrl: "https://github.com/tsrinath2007/Life-Support-ENV"
  },
  {
    event: "Smart India Hackathon 2026",
    project: "Parallax",
    projectId: "parallax",
    outcome: "SIH26171 (ISRO) · Team of 6 (Feasibility Lead)",
    date: "2026"
  },
  {
    event: "Nexora Hackathon (MIT Bengaluru)",
    project: "resume_ranker",
    projectId: "resume-ranker",
    outcome: "Solo Build · InternLoom UI",
    date: "2026"
  }
];

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  score: string;
  location: string;
}

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    institution: "Manipal Academy of Higher Education (MAHE)",
    degree: "B.Tech, Computer Science",
    duration: "2025 – 2029",
    score: "CGPA: 7.25",
    location: "Bengaluru, India"
  },
  {
    institution: "Turito",
    degree: "Senior Secondary (XII)",
    duration: "2023 – 2025",
    score: "93%",
    location: "Hyderabad, India"
  },
  {
    institution: "The Athena School",
    degree: "Secondary (X)",
    duration: "2021 – 2023",
    score: "75%",
    location: "Kurnool, India"
  }
];

export interface HackerHouseTask {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  status: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const HACKER_HOUSE_GOA = {
  title: "Hacker House Goa 2026",
  badge: "COMPETITIVE 10-TEAM SELECTION",
  liveUrl: "https://hhgoa.vercel.app/",
  teamNote: "Team of 3 // Built with Antigravity + Groq free tier",
  blurb: "A high-intensity, competitive 10-team selection engineering sprint in Goa with multiple specialized task submissions spanning voice-enabled RAG pipelines, biometric blockchain identity anchoring, and agentic graph fraud investigations.",
  tasks: [
    {
      id: "hh-voice-rag",
      title: "Task 2 — Voice RAG Pipeline",
      tagline: "Voice-enabled RAG targeting sub-200ms latency on Vercel",
      description: "Voice-enabled RAG system using ElevenLabs STT, multi-strategy chunking, and the ai4bharat/MSMARCO-XI dataset, targeting sub-200ms latency, deployed on Vercel. Included comprehensive UI redesign work.",
      techStack: ["ElevenLabs", "RAG", "Vercel"],
      status: "Live",
      liveUrl: "https://hhgoa.vercel.app/",
      highlights: [
        "Voice-enabled RAG pipeline with ElevenLabs STT and multi-strategy chunking",
        "Benchmarked retrieval over ai4bharat/MSMARCO-XI dataset targeting sub-200ms latency",
        "Shipped responsive UI redesign deployed directly to Vercel"
      ]
    },
    {
      id: "hh-face-blockchain",
      title: "Task 3 — Face Detection + Blockchain CLI",
      tagline: "Reverse image search with Polygon Amoy state anchoring",
      description: "Face detection and reverse image search extraction pipeline with cryptographic blockchain state anchoring on the Polygon Amoy testnet.",
      techStack: ["Face Detection", "Reverse Image Search", "Polygon"],
      status: "Sprint Submission",
      highlights: [
        "Face detection & reverse image search visual feature extraction pipeline",
        "Cryptographic proof state anchoring on Polygon Amoy testnet",
        "Command-line interface (CLI) for automated biometric integrity verification"
      ]
    },
    {
      id: "hh-tigergraph-fraud",
      title: "TigerGraph Agentic Fraud Investigation",
      tagline: "Autonomous GraphRAG agent on 590k-transaction IEEE-CIS dataset",
      description: "Built an autonomous investigative agent on a 590k-transaction IEEE-CIS/Vesta-derived dataset (5,565 closed cases, 20-case benchmark pack) using TigerGraph + MCP + GraphRAG, producing structured JSON verdicts per case.",
      techStack: ["TigerGraph", "MCP", "GraphRAG", "Groq (llama-3.3-70b)"],
      status: "Sprint Submission",
      highlights: [
        "Investigated 5,565 closed fraud cases on 590k IEEE-CIS/Vesta transaction graph",
        "Evaluated on a 20-case benchmark suite using TigerGraph + Model Context Protocol (MCP)",
        "GraphRAG pipeline producing deterministic JSON decision verdicts powered by Groq (llama-3.3-70b)"
      ]
    }
  ] as HackerHouseTask[]
};



