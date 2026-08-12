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
    description: "An intelligent space habitat cockpit assistant built for real-time monitoring of Environmental Control and Life Support System (ECLSS) telemetry. Implements a Proximal Policy Optimization (PPO) reinforcement learning agent for autonomous habitat adjustments and a fine-tuned Qwen2.5-1.5B model to generate natural language resolution logs during safety emergencies.",
    techStack: ["Qwen2.5-1.5B", "PPO RL", "FastAPI", "WebSockets", "Recharts", "Next.js"],
    liveUrl: "https://astro-copilot.vercel.app",
    githubUrl: "https://github.com/srinath/astro-copilot",
    status: "Live",
    event: "Samsung Solve for Tomorrow 2025 (AI Living for India)",
    award: "National Finalist",
    date: "Jan 2025",
    highlights: [
      "Streamed live telemetry streams using high-speed WebSockets",
      "Achieved sub-250ms latency for LLM anomaly resolution advice using streaming token output",
      "Modeled 12 spacecraft habitat parameters including pO2, pCO2, cabin pressure, and water loop status"
    ]
  },
  {
    id: "go-focus-gen",
    title: "GoFocusGen (FocusFlight)",
    tagline: "Gamified aviation-inspired study app mapping session durations to real flight paths",
    description: "A gamified productivity companion where study sessions are visual flights across India. Users select actual domestic aviation routes, and the countdown timer syncs with real flight times (e.g. Mumbai to Delhi = 2 hours). Displays an interactive map showing flight progression, elevation charts, and active aircraft noise generators for immersive focus.",
    techStack: ["Next.js", "Mapbox GL JS", "Tailwind CSS", "Framer Motion", "Vercel"],
    liveUrl: "https://focusflight.vercel.app",
    githubUrl: "https://github.com/srinath/gofocusgen",
    status: "Hackathon Build",
    event: "Manipal Aero-Hack 2024",
    award: "1st Place Winner",
    date: "Nov 2024",
    highlights: [
      "Integrated Mapbox GL JS for real-time path calculations and flight visual overlays",
      "Built custom web audio engines synthesizing ambient cabin, white noise, and high-altitude winds",
      "Created dynamic boarding pass generator to share study sessions and flight stats"
    ]
  },
  {
    id: "loop",
    title: "Loop",
    tagline: "AI desktop workflow miner passively suggesting keyboard/mouse macros",
    description: "A low-overhead desktop application that runs in the background to log user interaction sequences. Employs a local Python-based prefix tree pattern mining algorithm to detect highly repetitive keystroke and click chains, proposing automated scripting and workflow macros to save active development hours.",
    techStack: ["Electron", "React", "TypeScript", "Python", "Node.js Compiler"],
    githubUrl: "https://github.com/srinath/loop-workflow-miner",
    status: "Hackathon Build",
    event: "Hackverse 2.0",
    award: "Top 5 Hack",
    date: "Dec 2024",
    highlights: [
      "Captured user activities using native low-level OS hooks, filtering out sensitive input fields",
      "Implemented localized FP-growth algorithm in Python, running under a 15MB memory footprint",
      "Auto-generated bash and AutoHotKey scripting code blocks for recognized workflow loops"
    ]
  },
  {
    id: "pulse-rail",
    title: "PULSE RAIL",
    tagline: "Railway track vibration health monitor using WPT edge-processing",
    description: "A specialized physical-computing prototype monitoring structural track stability. Uses axle box accelerometers to measure track impact vibrations. Decomposes high-frequency signals using a localized Wavelet Packet Transform (WPT) on-node to isolate anomaly signatures, linking to Kavach 4G-LTE anti-collision network protocols.",
    techStack: ["C++", "Python", "Wavelet Packet Transform", "Raspberry Pi", "Kavach API", "React"],
    githubUrl: "https://github.com/srinath/pulse-rail",
    status: "Prototype",
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
    description: "A simulated sandbox workspace mimicking life-support loop parameters. Combines a Proximal Policy Optimization (PPO) model with a Qwen2.5-1.5B model adapted using LoRA parameters (trained on historic NASA Apollo and ISS failure manuals) to optimize oxygen loop scrubbers and water reclamation systems.",
    techStack: ["PPO RL", "Qwen LoRA", "Python", "Gradio", "HuggingFace Spaces", "FastAPI"],
    liveUrl: "https://huggingface.co/spaces/srinath/life-support-env",
    githubUrl: "https://github.com/srinath/life-support-env",
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
    category: "Frameworks & Libraries",
    items: ["Next.js", "React", "FastAPI", "WebSockets", "Express", "Node.js", "Electron"]
  },
  {
    category: "AI / ML Stack",
    items: ["PPO (RL)", "Qwen 2.5", "LoRA Fine-tuning", "PyTorch", "HuggingFace Transformers", "Gradio"]
  },
  {
    category: "Tools & Clouds",
    items: ["Vercel", "Mapbox GL JS", "HuggingFace Spaces", "Docker", "Git/GitHub", "Recharts", "PostgreSQL"]
  }
];

export const HACKATHONS = [
  {
    event: "Samsung Solve for Tomorrow 2025",
    project: "AstroCopilot",
    outcome: "National Finalist (AI Living for India)",
    date: "Jan 2025"
  },
  {
    event: "Hackverse 2.0",
    project: "Loop Workflow Miner",
    outcome: "Top 5 Hack Winner",
    date: "Dec 2024"
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
