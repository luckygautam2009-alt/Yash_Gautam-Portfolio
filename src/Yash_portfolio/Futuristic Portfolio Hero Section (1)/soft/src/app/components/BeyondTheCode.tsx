import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import bgImage from "../../imports/WhatsApp_Image_2026-06-06_at_22.07.20.jpeg";

const PERSONALITY_NODES = [
  {
    id: 0, icon: "🧩", title: "Problem Solver",
    desc: "Enjoys breaking down complex challenges into simple, practical solutions.",
    angle: 0, colorKey: "cyan" as const,
  },
  {
    id: 1, icon: "🚀", title: "Fast Learner",
    desc: "Continuously explores new technologies, frameworks, and emerging AI tools.",
    angle: 45, colorKey: "purple" as const,
  },
  {
    id: 2, icon: "🤝", title: "Team Collaborator",
    desc: "Believes great products are built through communication, teamwork, and shared vision.",
    angle: 90, colorKey: "cyan" as const,
  },
  {
    id: 3, icon: "⚡", title: "Hackathon Performer",
    desc: "Thrives under pressure and enjoys turning ideas into working solutions within limited time.",
    angle: 135, colorKey: "red" as const,
  },
  {
    id: 4, icon: "🌱", title: "Growth Mindset",
    desc: "Focused on continuous improvement, learning, and experimentation.",
    angle: 180, colorKey: "cyan" as const,
  },
  {
    id: 5, icon: "🎤", title: "Community Ambassador",
    desc: "Actively contributes to developer communities and helps connect people through technology.",
    angle: 225, colorKey: "purple" as const,
  },
  {
    id: 6, icon: "🧠", title: "Critical Thinker",
    desc: "Approaches problems analytically while balancing creativity and practicality.",
    angle: 270, colorKey: "purple" as const,
  },
  {
    id: 7, icon: "💡", title: "Innovation Driven",
    desc: "Passionate about building products that solve meaningful real-world problems.",
    angle: 315, colorKey: "red" as const,
  },
];

type ColorKey = "cyan" | "purple" | "red";

const COLORS: Record<ColorKey, { glowBox: string; border: string; text: string; lineColor: string; bg: string }> = {
  cyan: {
    glowBox: "0 0 24px rgba(0,212,255,0.55), 0 0 48px rgba(0,212,255,0.2)",
    border: "rgba(0,212,255,0.4)",
    text: "#00d4ff",
    lineColor: "rgba(0,212,255,0.55)",
    bg: "rgba(0,212,255,0.07)",
  },
  purple: {
    glowBox: "0 0 24px rgba(168,85,247,0.55), 0 0 48px rgba(168,85,247,0.2)",
    border: "rgba(168,85,247,0.4)",
    text: "#a855f7",
    lineColor: "rgba(168,85,247,0.55)",
    bg: "rgba(168,85,247,0.07)",
  },
  red: {
    glowBox: "0 0 24px rgba(239,68,68,0.45), 0 0 48px rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.4)",
    text: "#ef4444",
    lineColor: "rgba(239,68,68,0.5)",
    bg: "rgba(239,68,68,0.07)",
  },
};

const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: (i * 37.3 + 7) % 100,
  top: (i * 53.1 + 13) % 100,
  size: ((i * 7) % 3) + 1.2,
  duration: ((i * 3.7) % 8) + 6,
  delay: (i * 0.9) % 7,
  opacity: ((i * 11) % 40) / 100 + 0.08,
  colorType: i % 3,
}));

const SPHERES = [
  { left: 12, top: 18, size: 130, dur: 22, delay: 0 },
  { left: 82, top: 12, size: 90, dur: 28, delay: 6 },
  { left: 8,  top: 68, size: 70, dur: 19, delay: 11 },
  { left: 78, top: 72, size: 110, dur: 24, delay: 3 },
  { left: 48, top: 88, size: 80, dur: 16, delay: 8 },
];

export function BeyondTheCode() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [phase, setPhase] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [size, setSize] = useState({ w: 1200, h: 720 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 650);
    const t2 = setTimeout(() => setPhase(3), 1300);
    const t3 = setTimeout(() => setPhase(4), 2700);
    const t4 = setTimeout(() => setPhase(5), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [inView]);

  useEffect(() => {
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: width, h: height });
    });
    if (constellationRef.current) ro.observe(constellationRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cx = size.w * 0.5;
  const cy = size.h * 0.5;

  const nodePositions = useMemo(() => {
    const rx = size.w * 0.35;
    const ry = size.h * 0.32;
    return PERSONALITY_NODES.map(n => {
      const rad = (n.angle * Math.PI) / 180;
      return {
        ...n,
        x: cx + rx * Math.cos(rad),
        y: cy + ry * Math.sin(rad),
      };
    });
  }, [size, cx, cy]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        paddingTop: "90px",
        paddingBottom: "80px",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay over background image */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(145deg, rgba(6,6,15,0.88) 0%, rgba(12,12,30,0.82) 35%, rgba(8,8,21,0.86) 65%, rgba(10,5,24,0.88) 100%)",
      }} />

      {/* Ambient mesh blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "5%", left: "15%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.045) 0%, transparent 65%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "10%",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 65%)",
          filter: "blur(70px)",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 900, height: 700, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,212,255,0.025) 0%, rgba(168,85,247,0.018) 40%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "5%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239,68,68,0.025) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </div>

      {/* Floating glass spheres */}
      {SPHERES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.07), rgba(255,255,255,0.01) 60%, transparent)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            animation: `btcFloatSphere ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Floating particles */}
      {phase >= 5 && PARTICLES.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.colorType === 0 ? "rgba(0,212,255,0.8)" : p.colorType === 1 ? "rgba(168,85,247,0.8)" : "rgba(255,255,255,0.6)",
            opacity: p.opacity,
            animation: `btcFloatParticle ${p.duration}s ${p.delay}s ease-in-out infinite`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "56px", position: "relative", zIndex: 10, padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "7px 22px", borderRadius: "100px",
            border: "1px solid rgba(0,212,255,0.22)",
            background: "rgba(0,212,255,0.05)",
            backdropFilter: "blur(12px)",
            marginBottom: "28px",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#00d4ff",
              boxShadow: "0 0 8px #00d4ff, 0 0 16px rgba(0,212,255,0.5)",
              animation: "btcPulse 2s ease-in-out infinite",
            }} />
            <span style={{
              color: "#00d4ff", fontSize: "11px",
              letterSpacing: "3.5px", textTransform: "uppercase",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontWeight: 500,
            }}>
              PERSONALITY CONSTELLATION
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "18px",
            lineHeight: 1.05,
            fontFamily: "Inter, 'Helvetica Neue', system-ui, sans-serif",
          }}>
            BEYOND THE{" "}
            <span style={{
              background: "linear-gradient(100deg, #00d4ff 0%, #a855f7 60%, #ef4444 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              CODE
            </span>
          </h2>

          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            lineHeight: 1.75,
            maxWidth: "480px",
            margin: "0 auto",
            fontFamily: "Inter, system-ui, sans-serif",
          }}>
            More than a developer.{" "}
            <span style={{ color: "rgba(255,255,255,0.72)" }}>
              A builder, learner, collaborator,<br />and problem solver.
            </span>
          </p>
        </motion.div>
      </div>

      {/* ── Desktop constellation ── */}
      {!isMobile && (
        <div
          ref={constellationRef}
          style={{
            position: "relative",
            width: "100%",
            height: "min(78vh, 820px)",
            maxWidth: "1440px",
            margin: "0 auto",
            zIndex: 5,
          }}
        >
          {/* SVG layer — lines */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, overflow: "visible" }}
            viewBox={`0 0 ${size.w} ${size.h}`}
          >
            <defs>
              {nodePositions.map(node => {
                const c = COLORS[node.colorKey];
                return (
                  <linearGradient
                    key={`lg-${node.id}`}
                    id={`btcLineGrad-${node.id}`}
                    x1={cx} y1={cy}
                    x2={node.x} y2={node.y}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="rgba(0,212,255,0.7)" />
                    <stop offset="100%" stopColor={c.lineColor} />
                  </linearGradient>
                );
              })}
              <filter id="btcGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="btcGlowFilterStrong" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {phase >= 2 && nodePositions.map((node, i) => {
              const isHov = hovered === node.id;
              const isDim = hovered !== null && !isHov;
              const c = COLORS[node.colorKey];
              const lineLen = Math.hypot(node.x - cx, node.y - cy);

              return (
                <g key={`line-${node.id}`}>
                  {/* Shadow line */}
                  <line
                    x1={cx} y1={cy} x2={node.x} y2={node.y}
                    stroke={c.lineColor}
                    strokeWidth={isHov ? 3 : 1}
                    strokeOpacity={isHov ? 0.25 : 0}
                    filter="url(#btcGlowFilterStrong)"
                    strokeDasharray={lineLen}
                    strokeDashoffset={lineLen}
                    style={{ animation: `btcDrawLine 0.75s ${0.08 + i * 0.09}s ease-out forwards` }}
                  />
                  {/* Main line */}
                  <line
                    x1={cx} y1={cy} x2={node.x} y2={node.y}
                    stroke={isHov ? c.lineColor : `url(#btcLineGrad-${node.id})`}
                    strokeWidth={isHov ? 1.8 : 1}
                    strokeOpacity={isHov ? 0.95 : isDim ? 0.06 : 0.32}
                    filter={isHov ? "url(#btcGlowFilter)" : undefined}
                    strokeDasharray={lineLen}
                    strokeDashoffset={lineLen}
                    style={{
                      transition: "stroke-opacity 0.35s ease, stroke-width 0.35s ease",
                      animation: `btcDrawLine 0.75s ${0.08 + i * 0.09}s ease-out forwards`,
                    }}
                  />
                  {/* Moving dot on line */}
                  {isHov && (
                    <circle r="3" fill={c.text} filter="url(#btcGlowFilter)" opacity="0.9">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={`M ${cx},${cy} L ${node.x},${node.y}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Connection dot markers */}
            {phase >= 3 && nodePositions.map(node => {
              const isHov = hovered === node.id;
              const isDim = hovered !== null && !isHov;
              const c = COLORS[node.colorKey];
              return (
                <circle
                  key={`dot-${node.id}`}
                  cx={node.x} cy={node.y} r={isHov ? 5 : 3.5}
                  fill={c.text}
                  opacity={isDim ? 0.12 : 0.75}
                  filter={isHov ? "url(#btcGlowFilter)" : undefined}
                  style={{ transition: "opacity 0.35s, r 0.3s" }}
                />
              );
            })}
          </svg>

          {/* Center core */}
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, type: "spring", stiffness: 90, damping: 12 }}
              style={{
                position: "absolute",
                left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 15,
              }}
            >
              {/* Outer atmospheric rings */}
              <div style={{
                position: "absolute", inset: -50, borderRadius: "50%",
                border: "1px solid rgba(0,212,255,0.07)",
                animation: "btcCoreRingBreath 5s 1.5s ease-in-out infinite",
              }} />
              <div style={{
                position: "absolute", inset: -30, borderRadius: "50%",
                border: "1px solid rgba(168,85,247,0.1)",
                animation: "btcCoreRingBreath 5s 0.8s ease-in-out infinite",
              }} />

              {/* Core sphere */}
              <div style={{
                width: 170, height: 170, borderRadius: "50%",
                background: "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.13) 0%, rgba(0,212,255,0.06) 40%, rgba(168,85,247,0.08) 70%, transparent 100%)",
                border: "1px solid rgba(0,212,255,0.28)",
                backdropFilter: "blur(30px) saturate(180%)",
                boxShadow: "0 0 50px rgba(0,212,255,0.22), 0 0 100px rgba(168,85,247,0.12), inset 0 0 35px rgba(0,212,255,0.06)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                animation: "btcCoreBreath 4.5s ease-in-out infinite",
                position: "relative", overflow: "hidden",
                cursor: "default",
              }}>
                {/* Inner glass ring */}
                <div style={{
                  position: "absolute", inset: 14, borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.07)",
                }} />
                {/* Specular highlight */}
                <div style={{
                  position: "absolute", top: 18, left: 28,
                  width: 40, height: 20, borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  filter: "blur(6px)",
                  transform: "rotate(-20deg)",
                }} />

                <div style={{
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "15px",
                  letterSpacing: "2px",
                  textAlign: "center",
                  lineHeight: 1.25,
                  textShadow: "0 0 24px rgba(0,212,255,0.9)",
                  fontFamily: "Inter, 'Helvetica Neue', system-ui, sans-serif",
                  position: "relative", zIndex: 1,
                }}>
                  YASH<br />GAUTAM
                </div>
                <div style={{
                  width: 28, height: 1.5,
                  background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
                  margin: "9px 0 5px",
                  position: "relative", zIndex: 1,
                }} />
                <div style={{
                  color: "rgba(0,212,255,0.75)",
                  fontSize: "9px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono', monospace",
                  position: "relative", zIndex: 1,
                }}>
                  Developer
                </div>
              </div>
            </motion.div>
          )}

          {/* Personality nodes */}
          {nodePositions.map((node, i) => {
            const c = COLORS[node.colorKey];
            const isHov = hovered === node.id;
            const isDim = hovered !== null && !isHov;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  phase < 3
                    ? { opacity: 0, scale: 0 }
                    : { opacity: isDim ? 0.22 : 1, scale: 1 }
                }
                transition={{
                  scale: { type: "spring", stiffness: 130, damping: 14, delay: phase >= 3 ? i * 0.1 : 0 },
                  opacity: { duration: 0.3 },
                }}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  transform: "translate(-50%, -50%)",
                  zIndex: isHov ? 25 : 10,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  minWidth: isHov ? 230 : 136,
                  maxWidth: isHov ? 250 : 136,
                  background: isHov
                    ? `linear-gradient(135deg, rgba(255,255,255,0.1), ${c.bg})`
                    : "linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
                  border: `1px solid ${isHov ? c.border : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "18px",
                  padding: isHov ? "22px 20px" : "16px 14px",
                  backdropFilter: "blur(24px) saturate(150%)",
                  boxShadow: isHov
                    ? `${c.glowBox}, 0 24px 48px rgba(0,0,0,0.5)`
                    : "0 8px 24px rgba(0,0,0,0.35)",
                  transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Top accent bar on hover */}
                  {isHov && (
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${c.text}, transparent)`,
                    }} />
                  )}
                  {/* Specular highlight */}
                  <div style={{
                    position: "absolute", top: 8, left: 14,
                    width: 32, height: 12, borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    filter: "blur(4px)",
                  }} />

                  <div style={{
                    fontSize: isHov ? "2.1rem" : "1.6rem",
                    marginBottom: isHov ? "10px" : "6px",
                    transition: "font-size 0.3s",
                    lineHeight: 1,
                  }}>
                    {node.icon}
                  </div>
                  <div style={{
                    color: isHov ? c.text : "rgba(255,255,255,0.9)",
                    fontWeight: 700,
                    fontSize: isHov ? "0.86rem" : "0.8rem",
                    letterSpacing: "0.4px",
                    fontFamily: "Inter, system-ui, sans-serif",
                    transition: "color 0.3s, font-size 0.3s",
                    lineHeight: 1.3,
                  }}>
                    {node.title}
                  </div>

                  {isHov && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      style={{
                        color: "rgba(255,255,255,0.58)",
                        fontSize: "0.75rem",
                        lineHeight: 1.6,
                        marginTop: "10px",
                        paddingTop: "10px",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        textAlign: "left",
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      {node.desc}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Mobile grid ── */}
      {isMobile && (
        <div style={{ padding: "0 20px", maxWidth: "640px", margin: "0 auto" }}>
          {/* Mobile center badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            <div style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              padding: "24px 40px",
              borderRadius: "20px",
              background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.08), rgba(0,212,255,0.04))",
              border: "1px solid rgba(0,212,255,0.25)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(0,212,255,0.15), 0 0 80px rgba(168,85,247,0.08)",
            }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "2px", textShadow: "0 0 20px rgba(0,212,255,0.7)" }}>
                YASH GAUTAM
              </div>
              <div style={{ width: 40, height: 1.5, background: "linear-gradient(90deg, transparent, #00d4ff, transparent)", margin: "10px 0 6px" }} />
              <div style={{ color: "rgba(0,212,255,0.7)", fontSize: "10px", letterSpacing: "3px", fontFamily: "monospace" }}>DEVELOPER</div>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {PERSONALITY_NODES.map((node, i) => {
              const c = COLORS[node.colorKey];
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.055), ${c.bg})`,
                    border: `1px solid ${c.border}`,
                    borderRadius: "16px",
                    padding: "18px 14px",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: "1.7rem", marginBottom: "8px" }}>{node.icon}</div>
                  <div style={{ color: c.text, fontWeight: 700, fontSize: "0.82rem", marginBottom: "6px", fontFamily: "Inter, system-ui, sans-serif" }}>
                    {node.title}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.73rem", lineHeight: 1.55, fontFamily: "Inter, system-ui, sans-serif" }}>
                    {node.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginTop: "64px", position: "relative", zIndex: 10, padding: "0 24px" }}
      >
        <div style={{
          display: "inline-block",
          padding: "18px 36px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(10px)",
        }}>
          <p style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.92rem",
            fontStyle: "italic",
            letterSpacing: "0.3px",
            margin: 0,
            lineHeight: 1.65,
            fontFamily: "Inter, system-ui, sans-serif",
          }}>
            "Not just building projects —{" "}
            <span style={{ color: "rgba(255,255,255,0.55)" }}>
              genuinely passionate about technology,<br />growth, and solving meaningful problems.
            </span>
            "
          </p>
        </div>
      </motion.div>

      {/* Global keyframes */}
      <style>{`
        @keyframes btcFloatSphere {
          from { transform: translateY(0px) scale(1) rotate(0deg); }
          to   { transform: translateY(-22px) scale(1.04) rotate(4deg); }
        }
        @keyframes btcFloatParticle {
          0%   { transform: translateY(0px) translateX(0px); }
          30%  { transform: translateY(-18px) translateX(9px); }
          60%  { transform: translateY(12px) translateX(-6px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes btcCoreBreath {
          0%, 100% { box-shadow: 0 0 50px rgba(0,212,255,0.22), 0 0 100px rgba(168,85,247,0.12), inset 0 0 35px rgba(0,212,255,0.06); }
          50%       { box-shadow: 0 0 70px rgba(0,212,255,0.32), 0 0 130px rgba(168,85,247,0.18), inset 0 0 50px rgba(0,212,255,0.1); }
        }
        @keyframes btcCoreRingBreath {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.04); }
        }
        @keyframes btcPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #00d4ff, 0 0 16px rgba(0,212,255,0.5); }
          50%       { opacity: 0.6; box-shadow: 0 0 4px #00d4ff, 0 0 8px rgba(0,212,255,0.3); }
        }
        @keyframes btcDrawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
