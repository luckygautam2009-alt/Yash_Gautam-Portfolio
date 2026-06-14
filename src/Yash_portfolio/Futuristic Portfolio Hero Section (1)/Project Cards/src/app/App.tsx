import { motion } from "motion/react";
import bgImage from "../imports/WhatsApp_Image_2026-06-06_at_22.07.20.jpeg";
import { FloatingOrbs } from "./components/FloatingOrbs";
import { WallCard, type Project } from "./components/WallCard";

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

export default function App() {
  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Background: pastel orb gradient image ── */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Soft luminous tint over the photo */}
      <div
        className="fixed inset-0"
        style={{
          background:
            "linear-gradient(135deg,rgba(255,218,240,0.30) 0%,rgba(195,218,255,0.22) 40%,rgba(215,200,255,0.28) 70%,rgba(255,232,195,0.22) 100%)",
        }}
      />

      {/* Extra animated orbs on top */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingOrbs />
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
          className="text-center pt-14 pb-6 px-6"
        >
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
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

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
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
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
        </motion.header>

        {/* ── The Wall ── */}
        <main className="flex-1 px-4 sm:px-8 pb-20 pt-6">
          <div className="relative max-w-6xl mx-auto">

            {/* Cork-board backing panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(160deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.12) 100%)",
                border: "1.5px solid rgba(255,255,255,0.55)",
                backdropFilter: "blur(8px)",
                boxShadow:
                  "inset 0 2px 40px rgba(255,255,255,0.35), 0 12px 48px rgba(0,0,0,0.07)",
              }}
            />

            {/* Card grid */}
            <div
              className="relative grid gap-x-7 gap-y-12 p-6 sm:p-10 pt-12"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              }}
            >
              {PROJECTS.map((project, i) => (
                <WallCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="text-center pb-8"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "rgba(80,50,160,0.50)",
            letterSpacing: "0.14em",
          }}
        >
          CRAFTED WITH CURIOSITY · POWERED BY AI
        </footer>
      </div>
    </div>
  );
}
