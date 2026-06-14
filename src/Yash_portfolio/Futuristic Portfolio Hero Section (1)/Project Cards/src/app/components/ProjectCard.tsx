import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, X } from "lucide-react";
import { GlassButton } from "./GlassButton";

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  sourceUrl?: string;
  color: string;
  glowColor: string;
  icon: string;
}

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export function ProjectCard({ project, isExpanded, onToggle, style, className }: ProjectCardProps) {
  return (
    <div className={`relative ${className ?? ""}`} style={style}>
      {/* Node orb */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex flex-col items-center gap-2 cursor-pointer group outline-none"
        style={{ background: "none", border: "none", padding: 0 }}
        aria-label={`Toggle ${project.name}`}
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 64, height: 64,
            border: `1.5px solid ${project.glowColor}`,
            opacity: 0.4,
          }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Orb */}
        <motion.span
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 56, height: 56,
            background: `radial-gradient(circle at 35% 35%, ${project.color}66, ${project.color}22)`,
            border: `2px solid ${project.color}88`,
            boxShadow: isExpanded
              ? `0 0 24px ${project.glowColor}99, 0 0 48px ${project.glowColor}44`
              : `0 0 12px ${project.glowColor}55`,
            fontSize: "1.5rem",
          }}
          animate={{ boxShadow: isExpanded
            ? `0 0 24px ${project.glowColor}99, 0 0 48px ${project.glowColor}44`
            : `0 0 12px ${project.glowColor}55, 0 0 0px ${project.glowColor}00`
          }}
        >
          {project.icon}
        </motion.span>
        {/* Label */}
        <span
          className="text-center max-w-[120px] leading-tight"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.62rem",
            fontWeight: 600,
            color: project.color,
            letterSpacing: "0.08em",
            textShadow: `0 0 8px ${project.glowColor}`,
            textTransform: "uppercase",
          }}
        >
          {project.name}
        </span>
      </motion.button>

      {/* Expanded card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="absolute z-50"
            style={{
              top: "calc(100% + 12px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: 280,
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8, 10, 28, 0.92)",
                border: `1px solid ${project.color}44`,
                boxShadow: `0 24px 64px rgba(0,0,0,0.7), 0 0 32px ${project.glowColor}22`,
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Top color bar */}
              <div
                className="h-0.5 w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
              />

              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className="mb-0.5"
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: project.color,
                        letterSpacing: "0.05em",
                        textShadow: `0 0 12px ${project.glowColor}`,
                        lineHeight: 1.3,
                      }}
                    >
                      {project.name}
                    </h3>
                    <span
                      className="inline-block px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.6rem",
                        fontWeight: 500,
                        color: project.color,
                        background: `${project.color}18`,
                        border: `1px solid ${project.color}33`,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <button
                    onClick={onToggle}
                    className="rounded-full p-1 transition-colors"
                    style={{ color: "#8892b0", background: "rgba(255,255,255,0.05)" }}
                    aria-label="Close"
                  >
                    <X size={12} />
                  </button>
                </div>

                {/* Description */}
                <p
                  className="mb-3 leading-relaxed"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.75rem",
                    color: "#a8b2d0",
                    lineHeight: 1.65,
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.58rem",
                        color: "#8892b0",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                  {project.liveUrl && (
                    <GlassButton href={project.liveUrl} variant="primary" icon={<ExternalLink size={12} />}>
                      View Project
                    </GlassButton>
                  )}
                  {project.sourceUrl && (
                    <GlassButton href={project.sourceUrl} variant="secondary" icon={<Github size={12} />}>
                      Source Code
                    </GlassButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export type { Project };
