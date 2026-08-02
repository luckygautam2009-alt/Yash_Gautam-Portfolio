import { useState } from "react";
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
  },
];

export function ProjectCardsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "transparent",
        minHeight: "100vh",
      }}
    >
      {/* Background photo under soft tint */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
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
            "linear-gradient(135deg, rgba(247,239,230,0.4) 0%, rgba(243,230,216,0.3) 40%, rgba(238,222,204,0.4) 70%, rgba(244,232,220,0.3) 100%)",
        }}
      />

      {/* ── Decorative Homepage-Style Floating Background Icons ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          style={{ position: 'absolute', top: '12%', left: '8%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          <FolderGit2 size={140} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: '35%', right: '10%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Code2 size={150} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', bottom: '15%', left: '10%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Cpu size={130} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', bottom: '8%', right: '15%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ExternalLink size={120} strokeWidth={0.9} />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-8 pt-14 pb-20">
        {/* Header */}
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.65)",
            border: "1.5px solid rgba(139,90,43,0.25)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 2px 18px rgba(139,90,43,0.08)",
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

        <motion.h2
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#2d1f10",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            textShadow: "0 2px 28px rgba(255,255,255,0.65)",
          }}
        >
          My Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            color: "#6e5a47",
            marginTop: "0.5rem",
            fontWeight: 500,
          }}
        >
          Hover any card to reveal details
        </motion.p>

        {/* ── Cork-board Backing Panel ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full max-w-6xl mt-10"
        >
          <div
            className="relative rounded-3xl p-6 sm:p-10 pt-12"
            style={{
              background:
                "linear-gradient(160deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.12) 100%)",
              border: "1.5px solid rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)",
              boxShadow:
                "inset 0 2px 40px rgba(255,255,255,0.35), 0 12px 48px rgba(0,0,0,0.07)",
            }}
          >
            {/* Cards Grid */}
            <div
              className="grid gap-x-7 gap-y-12"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              }}
            >
              {PROJECTS.map((project, i) => (
                <WallCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "rgba(80,50,160,0.50)",
            letterSpacing: "0.14em",
          }}
        >
          CRAFTED WITH CURIOSITY · POWERED BY AI
        </motion.footer>
      </div>
    </section>
  );
}

