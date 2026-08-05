import { motion } from "motion/react";
import { ExternalLink, Github, FolderGit2, Code2, Cpu } from "lucide-react";
import bgImage from "../../imports/WhatsApp_Image_2026-06-06_at_22.07.20.jpeg";
import { WallCard } from "./WallCard";

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  sourceUrl?: string;
  accent: string;
  accentLight: string;
  icon: string;
  pinColor: string;
  screenshot?: string;
}


const PROJECTS: Project[] = [
  {
    id: "kisanmind",
    name: "KisanMind",
    category: "AgriTech · AI",
    description:
      "Smart Farm OS leveraging AI for crop health monitoring, soil analysis, and real-time yield prediction to empower every farmer.",
    techStack: ["Python", "TensorFlow", "FastAPI", "React", "IoT", "PostgreSQL"],
    liveUrl: "https://kisanmind-smartfarmos.onrender.com",
    sourceUrl: "https://github.com/luckygautam2009-alt/KisanMind-SmartFarmOS.git",
    accent: "#34d399",
    accentLight: "#6ee7b7",
    icon: "🌾",
    pinColor: "#10b981",
    screenshot: "/projects/kisanmind.png",
  },
  {
    id: "smart-inventory",
    name: "Smart Inventory System",
    category: "ML · Automation",
    description:
      "AI-driven inventory platform with real-time tracking, demand forecasting, and automated restocking alerts to eliminate waste.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Chart.js", "ML"],
    liveUrl: "https://cute-crumble-c0ad91.netlify.app/",
    sourceUrl: "https://github.com/luckygautam2009-alt/smart-inventory-system.git",
    accent: "#a78bfa",
    accentLight: "#c4b5fd",
    icon: "📦",
    pinColor: "#7c3aed",
    screenshot: "/projects/smart-inventory.png",
  },
  {
    id: "weather-anchor",
    name: "Weather Anchor",
    category: "Frontend · APIs",
    description:
      "Cinematic weather dashboard with hyper-local forecasts, dynamic sky animations, and seamless multi-location management.",
    techStack: ["React", "OpenWeather API", "CSS Animations", "Geolocation"],
    liveUrl: "https://deluxe-frangipane-f12ce7.netlify.app/",
    accent: "#60a5fa",
    accentLight: "#93c5fd",
    icon: "🌤️",
    pinColor: "#3b82f6",
    screenshot: "/projects/weather-anchor.png",
  },
  {
    id: "offroad-segmentation",
    name: "Offroad Segmentation",
    category: "Computer Vision · DL",
    description:
      "Deep learning semantic segmentation for autonomous navigation on unstructured off-road terrain at pixel-level accuracy.",
    techStack: ["Python", "PyTorch", "OpenCV", "U-Net", "CUDA", "NumPy"],
    sourceUrl: "https://github.com/luckygautam2009-alt/Offroad-Segmentation.git",
    accent: "#f9a8d4",
    accentLight: "#fbcfe8",
    icon: "🛣️",
    pinColor: "#ec4899",
    screenshot: "/projects/offroad-segmentation.png",
  },
  {
    id: "ai-disaster",
    name: "AI Disaster Agent",
    category: "AI · Emergency Response",
    description:
      "Multi-modal AI agent processing satellite imagery and sensor feeds to coordinate rapid disaster response and resource allocation.",
    techStack: ["Python", "LangChain", "GPT-4", "Satellite API", "FastAPI", "Redis"],
    sourceUrl: "https://github.com/luckygautam2009-alt/disaster-response-ai.git",
    accent: "#fbbf24",
    accentLight: "#fde68a",
    icon: "🚨",
    pinColor: "#f59e0b",
    screenshot: "/projects/ai-disaster.png",
  },
];

export function ProjectCardsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "transparent", minHeight: "100vh" }}
    >
      {/* Background photo under soft tint */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Soft gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(247,239,230,0.45) 0%, rgba(243,230,216,0.35) 40%, rgba(238,222,204,0.45) 70%, rgba(244,232,220,0.35) 100%)",
        }}
      />

      {/* ── Premium floating gradient orbs (background depth) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orb 1 — warm amber, top-left */}
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            top: "-8%",
            left: "-6%",
            background: "radial-gradient(circle, rgba(212,163,115,0.14) 0%, transparent 68%)",
            filter: "blur(48px)",
            animation: "orbFloat 18s ease-in-out infinite",
          }}
        />
        {/* Orb 2 — soft violet, top-right */}
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            top: "5%",
            right: "-4%",
            background: "radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 68%)",
            filter: "blur(52px)",
            animation: "orbFloat 22s ease-in-out infinite reverse",
          }}
        />
        {/* Orb 3 — mint green, bottom-center */}
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            bottom: "0%",
            left: "35%",
            background: "radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 68%)",
            filter: "blur(44px)",
            animation: "orbFloat 26s ease-in-out infinite",
            animationDelay: "-8s",
          }}
        />
        {/* Orb 4 — warm glow, bottom-right */}
        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            bottom: "5%",
            right: "5%",
            background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 68%)",
            filter: "blur(40px)",
            animation: "orbFloat 20s ease-in-out infinite",
            animationDelay: "-4s",
          }}
        />
      </div>

      {/* ── Subtle floating icons ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          style={{ position: "absolute", top: "12%", left: "8%", color: "#8b5a2b", opacity: 0.03 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <FolderGit2 size={140} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: "absolute", top: "35%", right: "10%", color: "#8b5a2b", opacity: 0.03 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code2 size={150} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: "absolute", bottom: "15%", left: "10%", color: "#8b5a2b", opacity: 0.03 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu size={130} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: "absolute", bottom: "8%", right: "15%", color: "#8b5a2b", opacity: 0.025 }}
          animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <ExternalLink size={120} strokeWidth={0.9} />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-8 pt-20 pb-24">

        {/* Header badge */}
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1.5px solid rgba(139,90,43,0.28)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 2px 20px rgba(139,90,43,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              color: "#8b5a2b",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            📌 &nbsp;Innovation Wall
          </span>
        </motion.span>

        {/* Section title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 800,
            color: "#2d1f10",
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            textShadow: "0 2px 32px rgba(255,255,255,0.7)",
            marginBottom: "0.6rem",
          }}
        >
          My Projects
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            color: "rgba(110,90,71,0.85)",
            marginBottom: "3rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          Hover any card to explore details
        </motion.p>

        {/* Cork-board Backing Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full max-w-6xl"
        >
          <div
            className="relative rounded-3xl p-7 sm:p-12 pt-14"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 60%, rgba(255,255,255,0.20) 100%)",
              border: "1.5px solid rgba(255,255,255,0.62)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow:
                "inset 0 2px 48px rgba(255,255,255,0.38), 0 16px 64px rgba(0,0,0,0.06), 0 4px 16px rgba(139,90,43,0.06)",
            }}
          >
            {/* Top glass sheen line */}
            <div
              className="absolute top-0 left-8 right-8 h-px rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)" }}
            />

            {/* Cards Grid */}
            <div
              className="grid gap-x-8 gap-y-14"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))" }}
            >
              {PROJECTS.map((project, i) => (
                <WallCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
