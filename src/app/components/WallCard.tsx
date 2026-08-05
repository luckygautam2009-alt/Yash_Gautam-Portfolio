import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  screenshot?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY BADGE
// ─────────────────────────────────────────────────────────────────────────────
function getCategoryNeon(category: string): { bg: string; text: string } {
  const lower = category.toLowerCase();
  if (lower.includes("ai") || lower.includes("ml"))
    return { bg: "rgba(251,191,36,0.22)", text: "#fbbf24" };
  if (lower.includes("web") || lower.includes("frontend") || lower.includes("api"))
    return { bg: "rgba(96,165,250,0.22)", text: "#60a5fa" };
  if (lower.includes("vision") || lower.includes("dl"))
    return { bg: "rgba(249,168,212,0.22)", text: "#f9a8d4" };
  if (lower.includes("agri"))
    return { bg: "rgba(52,211,153,0.22)", text: "#34d399" };
  if (lower.includes("emergency") || lower.includes("disaster"))
    return { bg: "rgba(251,191,36,0.22)", text: "#fbbf24" };
  return { bg: "rgba(167,139,250,0.22)", text: "#a78bfa" };
}

// ─────────────────────────────────────────────────────────────────────────────
// WALL CARD
// ─────────────────────────────────────────────────────────────────────────────
export function WallCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.1];
  const baseTilt = TILTS[index % TILTS.length];
  const neon = getCategoryNeon(project.category);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setTiltX((-dy / (rect.height / 2)) * 5);
    setTiltY((dx / (rect.width / 2)) * 5);
  }, []);

  const onMouseLeave = useCallback(() => {
    setTiltX(0);
    setTiltY(0);
  }, []);

  return (
    <div className="relative" style={{ perspective: "1000px" }}>

      {/* ── Push-pin with pulsing glow ── */}
      <div
        className="absolute left-1/2 z-30 flex flex-col items-center"
        style={{ transform: "translateX(-50%)", top: -16 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 28,
            height: 28,
            top: -4,
            left: -4,
            background: "transparent",
            border: `2px solid ${project.pinColor}`,
            opacity: 0,
          }}
          animate={
            hovered
              ? { scale: [1, 1.8, 2.4], opacity: [0.7, 0.3, 0] }
              : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 0.85, repeat: hovered ? Infinity : 0, ease: "easeOut" }}
        />

        {/* Pin head */}
        <motion.div
          className="rounded-full relative z-10"
          animate={hovered ? { scale: 1.25, y: -4 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{
            width: 20,
            height: 20,
            background: `radial-gradient(circle at 35% 30%, ${project.accentLight}, ${project.pinColor})`,
            border: "2.5px solid rgba(255,255,255,0.85)",
            boxShadow: hovered
              ? `0 0 16px 4px ${project.pinColor}88, 0 4px 12px rgba(0,0,0,0.30)`
              : `${project.pinColor}77 0px 3px 10px, rgba(0,0,0,0.22) 0px 1px 4px`,
            transition: "box-shadow 0.4s ease",
          }}
        />
        {/* Pin stem */}
        <div
          style={{
            width: 2.5,
            height: 14,
            background: "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.08))",
            borderRadius: 2,
            marginTop: -1,
          }}
        />
      </div>

      {/* ── Ambient glow behind card ── */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${project.accent}35 0%, transparent 68%)`,
          filter: "blur(24px)",
          transform: "translateY(12px) scale(1.06)",
        }}
      />

      {/* ── Card shell ── */}
      <motion.div
        ref={cardRef}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => { setHovered(false); onMouseLeave(); }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0, y: 50, rotate: baseTilt }}
        whileInView={{ opacity: 1, y: 0, rotate: baseTilt }}
        viewport={{ once: true, margin: "-5%" }}
        animate={{
          y: hovered ? -12 : 0,
          scale: hovered ? 1.03 : 1,
          rotateX: hovered ? tiltX : 0,
          rotateY: hovered ? tiltY : 0,
          rotate: baseTilt,
          boxShadow: hovered
            ? `0 28px 60px rgba(0,0,0,0.28), 0 8px 20px rgba(0,0,0,0.18), 0 0 0 2px ${project.accent}66`
            : "0 8px 28px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.07)",
        }}
        transition={{
          opacity: { duration: 0.55, delay: index * 0.10 },
          y: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
          scale: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
          rotateX: { duration: 0.15, ease: "linear" },
          rotateY: { duration: 0.15, ease: "linear" },
          rotate: { duration: 0.6, delay: index * 0.10 },
          boxShadow: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
        }}
        className="relative rounded-2xl overflow-hidden cursor-default"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow",
          border: hovered
            ? `1.5px solid ${project.accent}55`
            : "1.5px solid rgba(255,255,255,0.72)",
          transition: "border-color 0.4s ease",
        }}
      >
        {/* ── Screenshot area (top ~60% of card) ── */}
        <div
          className="relative overflow-hidden"
          style={{ height: 190, background: "#0d0d1a" }}
        >
          {/* Screenshot image */}
          {project.screenshot ? (
            <motion.img
              src={project.screenshot}
              alt={project.name}
              animate={{
                scale: hovered ? 1.08 : 1.0,
                filter: hovered ? "brightness(0.35) saturate(0.8)" : "brightness(0.92) saturate(1)",
              }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          ) : (
            /* Fallback gradient when no screenshot */
            <motion.div
              animate={{
                opacity: hovered ? 0.55 : 0.85,
              }}
              transition={{ duration: 0.45 }}
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(145deg, ${project.accent}22 0%, ${project.pinColor}15 50%, rgba(15,10,30,0.95) 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "3.5rem", opacity: 0.4 }}>{project.icon}</span>
            </motion.div>
          )}

          {/* ── Hover overlay — dark gradient from bottom ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              background: `linear-gradient(to top, rgba(8,5,20,0.97) 0%, rgba(8,5,20,0.75) 45%, rgba(8,5,20,0.25) 100%)`,
            }}
          />

          {/* ── Always-visible top gradient (for category badge readability) ── */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: 64,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
            }}
          />

          {/* ── Category badge (top-left corner, always visible) ── */}
          <div className="absolute top-3 left-3 z-20">
            <span
              className="px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.52rem",
                fontWeight: 700,
                color: neon.text,
                background: neon.bg,
                border: `1px solid ${neon.text}44`,
                letterSpacing: "0.06em",
                backdropFilter: "blur(10px)",
                textTransform: "uppercase",
              }}
            >
              {project.category}
            </span>
          </div>

          {/* ── Emoji icon (top-right, always visible) ── */}
          <motion.div
            className="absolute top-3 right-3 z-20"
            animate={hovered
              ? { scale: 1.3, y: -3, rotate: -8, filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.4))" }
              : { scale: 1, y: 0, rotate: 0, filter: "none" }
            }
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          >
            <span style={{ fontSize: "1.55rem" }}>{project.icon}</span>
          </motion.div>

          {/* ── Hover reveal: title + description inside screenshot area ── */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="overlay-content"
                className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
              >
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.2,
                    marginBottom: "0.35rem",
                    textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                  }}
                >
                  {project.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.70rem",
                    color: "rgba(220,210,255,0.85)",
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {project.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Accent shimmer line at bottom of screenshot ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
              height: 2,
              background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
              transformOrigin: "center",
            }}
          />
        </div>

        {/* ── Bottom panel (always visible) ── */}
        <div
          style={{
            background: "rgba(255,255,255,0.30)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            padding: "12px 14px 14px",
            borderTop: "1px solid rgba(255,255,255,0.50)",
          }}
        >
          {/* Project title (visible when NOT hovered) */}
          <AnimatePresence mode="wait">
            {!hovered ? (
              <motion.h3
                key="title-static"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: "#1a0e3d",
                  lineHeight: 1.2,
                  marginBottom: "10px",
                  letterSpacing: "-0.02em",
                }}
              >
                {project.name}
              </motion.h3>
            ) : (
              <motion.div
                key="title-hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ marginBottom: "10px", height: "1.14rem" }}
              />
            )}
          </AnimatePresence>

          {/* Tech-stack chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techStack.slice(0, 5).map((tech, ti) => (
              <motion.span
                key={tech}
                animate={
                  hovered
                    ? { y: -2 - ti * 0.3, opacity: 1, fontWeight: 700 }
                    : { y: 0, opacity: 0.75, fontWeight: 500 }
                }
                transition={{ duration: 0.26, delay: hovered ? ti * 0.03 : 0 }}
                className="px-2 py-0.5 rounded-full"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.52rem",
                  color: "#4a3890",
                  background: "rgba(255,255,255,0.68)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  letterSpacing: "0.04em",
                  transition: "font-weight 0.2s ease",
                  display: "inline-block",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-1.5"
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 0 }}
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.93 }}
                className="inline-flex items-center gap-1.5 no-underline"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: 100,
                  background: hovered
                    ? `linear-gradient(135deg, ${project.accent}30 0%, rgba(255,255,255,0.9) 100%)`
                    : "rgba(255,255,255,0.88)",
                  border: `1.5px solid ${hovered ? project.accent + "80" : "rgba(255,255,255,0.95)"}`,
                  color: "#1a0e3d",
                  boxShadow: hovered
                    ? `0 4px 16px ${project.accent}44`
                    : "0 2px 10px rgba(0,0,0,0.10)",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
              >
                <ExternalLink size={10} strokeWidth={2.5} />
                View Project
              </motion.a>
            )}
            {project.sourceUrl && (
              <motion.a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.93 }}
                className="inline-flex items-center gap-1.5 no-underline"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.42)",
                  border: "1.5px solid rgba(255,255,255,0.68)",
                  color: "#2d1a6e",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Github size={10} strokeWidth={2.5} />
                Source Code
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Top glass sheen line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
