import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

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

function ActionButton({
  href,
  variant,
  ariaLabel,
  children,
}: {
  href: string;
  variant: "primary" | "ghost";
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      whileHover={{ scale: 1.07, y: -2 }}
      whileTap={{ scale: 0.93 }}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full no-underline"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.01em",
        ...(variant === "primary"
          ? {
              background: "rgba(255,255,255,0.72)",
              border: "1.5px solid rgba(255,255,255,0.9)",
              color: "#1a0e3d",
              boxShadow:
                "0 2px 14px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
            }
          : {
              background: "rgba(255,255,255,0.35)",
              border: "1.5px solid rgba(255,255,255,0.6)",
              color: "#2d1a6e",
              boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
              backdropFilter: "blur(8px)",
            }),
      }}
    >
      {children}
    </motion.a>
  );
}

export function WallCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  // Slight random tilt per card — pinned-to-wall feel
  const TILTS = [-1.8, 1.4, -0.9, 2.1, -1.3];
  const baseTilt = TILTS[index % TILTS.length];

  return (
    <div className="relative" style={{ perspective: "900px" }}>

      {/* ── Push-pin ── */}
      <motion.div
        className="absolute left-1/2 z-30 flex flex-col items-center"
        style={{ transform: "translateX(-50%)", top: -14 }}
        animate={hovered ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Pin head */}
        <div
          className="rounded-full"
          style={{
            width: 20,
            height: 20,
            background: `radial-gradient(circle at 35% 30%, ${project.accentLight}, ${project.pinColor})`,
            border: "2px solid rgba(255,255,255,0.75)",
            boxShadow: `${project.pinColor}99 0px 3px 10px, rgba(0,0,0,0.25) 0px 1px 4px`,
          }}
        />
        {/* Pin shaft */}
        <div
          style={{
            width: 2.5,
            height: 12,
            background: "linear-gradient(180deg,rgba(0,0,0,0.3),rgba(0,0,0,0.1))",
            borderRadius: 2,
          }}
        />
      </motion.div>

      {/* ── Card shell — presses into the wall on hover ── */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ opacity: 0, y: 36, rotate: baseTilt }}
        animate={{
          opacity: 1,
          y: hovered ? 7 : 0,
          rotate: baseTilt,
          scale: hovered ? 0.968 : 1,
          rotateX: hovered ? 4 : 0,
          boxShadow: hovered
            ? "0 28px 60px rgba(0,0,0,0.40), 0 14px 30px rgba(0,0,0,0.30), 0 4px 8px rgba(0,0,0,0.20)"
            : "0 6px 20px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.07)",
        }}
        transition={{
          opacity: { duration: 0.55, delay: index * 0.1 },
          y: { duration: 0.38, ease: [0.23, 1, 0.32, 1] },
          scale: { duration: 0.38, ease: [0.23, 1, 0.32, 1] },
          rotateX: { duration: 0.38, ease: [0.23, 1, 0.32, 1] },
          boxShadow: { duration: 0.38, ease: [0.23, 1, 0.32, 1] },
          rotate: { duration: 0.55, delay: index * 0.1 },
        }}
        className="relative rounded-2xl overflow-hidden cursor-default"
        style={{
          background: "rgba(255,255,255,0.30)",
          border: "1.5px solid rgba(255,255,255,0.70)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow",
        }}
      >
        {/* Accent top stripe */}
        <motion.div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${project.accent}, ${project.accentLight}, ${project.accent})`,
            backgroundSize: "200% 100%",
          }}
          animate={
            hovered
              ? { backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }
              : { backgroundPosition: "0% 0%" }
          }
          transition={{ duration: 2, repeat: hovered ? Infinity : 0, ease: "linear" }}
        />

        {/* ── Inner content — floats OUT on hover ── */}
        <motion.div
          className="p-5 pt-4"
          animate={
            hovered
              ? { y: -12, scale: 1.04 }
              : { y: 0, scale: 1 }
          }
          transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Row: icon + category badge */}
          <div className="flex items-center justify-between mb-3">
            <motion.span
              className="text-3xl leading-none"
              animate={
                hovered
                  ? { scale: 1.25, y: -5, rotate: -5, filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.22))" }
                  : { scale: 1, y: 0, rotate: 0, filter: "drop-shadow(0px 0px 0px transparent)" }
              }
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              {project.icon}
            </motion.span>

            <motion.span
              animate={hovered ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.57rem",
                fontWeight: 500,
                color: "#2d1a6e",
                background: `${project.accent}30`,
                border: `1px solid ${project.accent}60`,
                letterSpacing: "0.05em",
              }}
            >
              {project.category}
            </motion.span>
          </div>

          {/* Project title */}
          <motion.h3
            animate={hovered ? { y: -3 } : { y: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mb-2"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "#1a0e3d",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            {project.name}
          </motion.h3>

          {/* Description */}
          <motion.p
            animate={hovered ? { opacity: 1, y: -2 } : { opacity: 0.65, y: 0 }}
            transition={{ duration: 0.3, delay: hovered ? 0.05 : 0 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.75rem",
              color: "#3b2870",
              lineHeight: 1.7,
              marginBottom: "0.85rem",
            }}
          >
            {project.description}
          </motion.p>

          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech, ti) => (
              <motion.span
                key={tech}
                animate={
                  hovered
                    ? { y: -3 - ti * 0.4, opacity: 1, scale: 1.04 }
                    : { y: 0, opacity: 0.75, scale: 1 }
                }
                transition={{ duration: 0.28, delay: hovered ? ti * 0.03 : 0 }}
                className="px-2 py-0.5 rounded-md"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: "#4a3890",
                  background: "rgba(255,255,255,0.58)",
                  border: "1px solid rgba(255,255,255,0.78)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  letterSpacing: "0.03em",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-2"
            animate={hovered ? { y: -4, opacity: 1 } : { y: 0, opacity: 0.88 }}
            transition={{ duration: 0.3, delay: hovered ? 0.07 : 0 }}
          >
            {project.liveUrl && (
              <ActionButton href={project.liveUrl} variant="primary" ariaLabel={`View live site for ${project.name}`}>
                <ExternalLink size={11} strokeWidth={2.5} />
                View Project
              </ActionButton>
            )}
            {project.sourceUrl && (
              <ActionButton href={project.sourceUrl} variant="ghost" ariaLabel={`View source code for ${project.name}`}>
                <Github size={11} strokeWidth={2.5} />
                Source Code
              </ActionButton>
            )}
          </motion.div>
        </motion.div>

        {/* Hover glass sheen sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0 }}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 50%,rgba(255,255,255,0.10) 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
