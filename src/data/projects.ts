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
    description: "An intelligent life-support telemetry monitoring engine. Implements a Proximal Policy Optimization (PPO) reinforcement learning agent for autonomous adjustments and a fine-tuned Qwen2.5 model to handle safety anomalies — engineered like a Stark-tech spider suit life-support interface operating under extreme pressure.",
    techStack: ["Qwen2.5-1.5B", "PPO RL", "FastAPI", "WebSockets", "Recharts", "Next.js"],
    githubUrl: "https://github.com/tsrinath2007/Life-Support-ENV",
    status: "Live",
    event: "Samsung Solve for Tomorrow 2025 (AI Living for India)",
    award: "Round 1 Qualifier // Top 1000",
    date: "Jan 2025",
    highlights: [
      "Streamed live telemetry streams using high-speed WebSockets",
      "Achieved sub-250ms latency for LLM anomaly resolution advice using streaming token output",
      "Modeled 12 spacecraft parameters including pO2, pCO2, cabin pressure, and water loop status"
    ]
  },
  {
    id: "go-focus-gen",
    title: "GoFocusGen",
    tagline: "Gamified aviation-inspired study app mapping session durations to real flight paths",
    description: "A flight-path gamified focus engine where study sessions are visual flights. Syncs countdown timers with domestic aviation durations (e.g. Mumbai to Delhi = 2 hours) with interactive flight paths, elevation charts, and ambient audio loops — reminiscent of charting web-slinging routes across Queens skyscrapers.",
    techStack: ["Next.js", "Mapbox GL JS", "Tailwind CSS", "Framer Motion", "Vercel"],
    liveUrl: "https://gofocusgen.vercel.app/",
    githubUrl: "https://github.com/tsrinath2007/FlightEdu",
    status: "Live",
    event: "STARTUP // SELF-FOUNDED",
    award: "Startup",
    date: "Nov 2024",
    highlights: [
      "Integrated Mapbox GL JS for real-time path calculations and flight visual overlays",
      "Built custom web audio engines synthesizing ambient cabin, white noise, and high-altitude winds",
      "Created dynamic boarding pass generator to share study sessions and flight stats"
    ]
  },
  {
    id: "pulse-rail",
    title: "PULSE RAIL",
    tagline: "Railway track vibration health monitor using WPT edge-processing",
    description: "A physical edge-computing prototype monitoring structural track stability. Uses accelerometers to capture rail impact vibrations and a Wavelet Packet Transform (WPT) on-node to isolate anomaly signatures — linking to anti-collision protocols to act as a localized, real-world 'Spider-Sense' for moving train cars.",
    techStack: ["C++", "Python", "Wavelet Packet Transform", "Raspberry Pi", "Kavach API", "React"],
    liveUrl: "https://faraway-railway.vercel.app/",
    githubUrl: "https://github.com/tsrinath2007/FarAway",
    status: "Prototype",
    award: "Hackathon Build",
    event: "Zuup Hackathon",
    date: "Oct 2024",
    highlights: [
      "Decomposed accelerometer sensor inputs in real-time on edge Raspberry Pi processors",
      "Constructed a simulation dashboard displaying track decay hot-spots and real-time rail stress heatmaps",
      "Simulated packet relay payloads for India's Kavach anti-collision beacon interfaces"
    ]
  },
  {
    id: "life-support-env",
    title: "Life Support ENV",
    tagline: "Fine-tuned ECLSS habitat simulation sandbox",
    description: "A simulated sandbox environment mimicking life-support loop parameters. Combines a PPO model with a Qwen2.5 model fine-tuned on historic NASA Apollo and ISS logs to optimize oxygen loops and water scrubbers — essential for emergency simulation when suit oxygen systems fail at high altitudes.",
    techStack: ["PPO RL", "Qwen LoRA", "Python", "Gradio", "HuggingFace Spaces", "FastAPI"],
    liveUrl: "https://huggingface.co/spaces/tsrinath/Scaler-Round-2",
    githubUrl: "https://github.com/tsrinath2007/Scaler-Round-2",
    status: "Hackathon Build",
    event: "Scaler OpenEnv Hackathon Round 2",
    award: "Top 10 Team",
    date: "Sep 2024",
    highlights: [
      "Fine-tuned Qwen2.5-1.5B with a custom LoRA adapter on 1,200 pages of NASA life support reports",
      "Simulated system failures (leaks, blockages, filter decay) and trained RL models to recover optimal ranges",
      "Hosted public Gradio interface on HuggingFace Spaces with live Python simulator back-end"
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
    items: ["TypeScript", "JavaScript", "Python", "Go", "C++", "HTML/CSS", "SQL"]
  },
  {
    category: "Frameworks & Webs",
    items: ["Next.js", "React", "FastAPI", "WebSockets", "Express", "Node.js", "Electron"]
  },
  {
    category: "Web-Slinging AI Stack",
    items: ["PPO (RL)", "Qwen 2.5", "LoRA Fine-tuning", "PyTorch", "HuggingFace Transformers", "Gradio"]
  },
  {
    category: "Gadgets & Clouds",
    items: ["Vercel", "Mapbox GL JS", "HuggingFace Spaces", "Docker", "Git/GitHub", "Recharts", "PostgreSQL"]
  }
];

export const HACKATHONS = [
  {
    event: "Samsung Solve for Tomorrow 2025",
    project: "AstroCopilot",
    outcome: "Top 1000 // Round 1 Qualifier (AI Living for India)",
    date: "Jan 2025"
  },
  {
    event: "Manipal Aero-Hack 2024",
    project: "GoFocusGen",
    outcome: "1st Place Winner (Aviation Innovation)",
    date: "Nov 2024"
  },
  {
    event: "Scaler OpenEnv Hackathon",
    project: "Life Support ENV",
    outcome: "Top 10 Finalist (Round 2)",
    date: "Sep 2024"
  }
];

