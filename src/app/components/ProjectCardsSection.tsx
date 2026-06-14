import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
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

const FLOATING_SPHERES = [
  { id: 0, size: 340, left: "-4%",  top: "-6%",   color: "radial-gradient(circle at 32% 30%, #a8d8f0, #7cb9e8, #5a9fd4)", dur: 16, dx: 20, dy: 30 },
  { id: 1, size: 300, left: "72%",  top: "-8%",   color: "radial-gradient(circle at 36% 28%, #d8c8f4, #b0a0e8, #9078d0)", dur: 20, dx: 24, dy: 26 },
  { id: 2, size: 260, left: "-5%",  top: "55%",   color: "radial-gradient(circle at 32% 30%, #f0c4b8, #e8a898, #e89080)", dur: 14, dx: 18, dy: 34 },
  { id: 3, size: 220, left: "78%",  top: "60%",   color: "radial-gradient(circle at 36% 32%, #c8daf4, #90b8e4, #6c98d0)", dur: 22, dx: 22, dy: 28 },
  { id: 4, size: 180, left: "40%",  top: "-10%",  color: "radial-gradient(circle at 32% 30%, #f4d0b4, #e0b08c, #c89068)", dur: 13, dx: 14, dy: 22 },
  { id: 5, size: 150, left: "85%",  top: "30%",   color: "radial-gradient(circle at 36% 34%, #f4c0d0, #e098b0, #ce7090)", dur: 18, dx: 16, dy: 20 },
  { id: 6, size: 120, left: "20%",  top: "80%",   color: "radial-gradient(circle at 32% 30%, #c4dcf4, #96c0e8, #78a8d8)", dur: 15, dx: 12, dy: 18 },
  { id: 7, size: 100, left: "58%",  top: "82%",   color: "radial-gradient(circle at 36% 32%, #ecc4d4, #dca0b8, #c880a0)", dur: 17, dx: 10, dy: 16 },
];

export function ProjectCardsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #d4e8f5 0%, #e8d8f0 25%, #f5d8e8 50%, #f8e8d8 75%, #f0e8d4 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Background photo under soft tint */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
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
            "linear-gradient(135deg, rgba(255,218,240,0.18) 0%, rgba(195,218,255,0.12) 40%, rgba(215,200,255,0.16) 70%, rgba(255,232,195,0.12) 100%)",
        }}
      />

      {/* ── Prominent 3D Floating Spheres ── */}
      {FLOATING_SPHERES.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            left: s.left,
            top: s.top,
            background: s.color,
            opacity: 0.75,
            filter: "blur(0.8px)",
            boxShadow:
              "inset -15px -15px 40px rgba(255,255,255,0.35), inset 8px 8px 30px rgba(255,255,255,0.5), 0 16px 50px rgba(0,0,0,0.08)",
          }}
          animate={{
            x: [0, s.dx * 0.6, -s.dx * 0.4, s.dx, 0],
            y: [0, -s.dy * 0.5, -s.dy * 0.9, -s.dy * 0.3, 0],
            scale: [1, 1.04, 0.97, 1.02, 1],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.55, 0.8, 1],
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-8 pt-14 pb-20">
        {/* Header */}
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.52)",
            border: "1.5px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 2px 18px rgba(0,0,0,0.07)",
          }}
        >
          <span
            style={{
              fontSize: "0.68rem",
              color: "#5b21b6",
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
            color: "#1a0e3d",
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
            fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
            color: "#4c3a8a",
            marginTop: "0.5rem",
            opacity: 0.75,
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

