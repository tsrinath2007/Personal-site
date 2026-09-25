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
    status: "Live",
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
    liveUrl: "https://faraway-railway.vercel.app/",
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
    liveUrl: "https://huggingface.co/spaces/tsrinath/Scaler-Round-2",
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

export const HACKATHONS = [
  {
    event: "Samsung Solve for Tomorrow",
    project: "Life Support ENV",
    outcome: "Top 10 Finalist (Round 2)",
    date: "Jun 2026"
  },
  {
    event: "Zuup Hackathon",
    project: "PULSE RAIL",
    outcome: "Railway Track Health Monitor Prototype",
    date: "May 2026"
  },
  {
    event: "Scaler OpenEnv Hackathon",
    project: "AstroCopilot",
    outcome: "Top 1000 // Round 1 Qualifier (AI Living for India)",
    date: "Apr 2026"
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


