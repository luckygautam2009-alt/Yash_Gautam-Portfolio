import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import bgImage from "../../imports/WhatsApp_Image_2026-06-06_at_22.07.20-1.jpeg";

const NODES = [
  {
    id: 0,
    emoji: "🧩",
    label: "Problem Solver",
    desc: "Enjoys breaking down complex challenges into simple, practical solutions.",
    color: "#0ea5e9",
    border: "rgba(14,165,233,0.5)",
    angle: -90,
  },
  {
    id: 1,
    emoji: "🚀",
    label: "Fast Learner",
    desc: "Continuously explores new technologies, frameworks, and emerging AI tools.",
    color: "#7c3aed",
    border: "rgba(124,58,237,0.5)",
    angle: -45,
  },
  {
    id: 2,
    emoji: "🤝",
    label: "Team Collaborator",
    desc: "Believes great products are built through communication, teamwork, and shared vision.",
    color: "#0ea5e9",
    border: "rgba(14,165,233,0.5)",
    angle: 0,
  },
  {
    id: 3,
    emoji: "⚡",
    label: "Hackathon Performer",
    desc: "Thrives under pressure and enjoys turning ideas into working solutions within limited time.",
    color: "#e11d48",
    border: "rgba(225,29,72,0.5)",
    angle: 45,
  },
  {
    id: 4,
    emoji: "🌱",
    label: "Growth Mindset",
    desc: "Focused on continuous improvement, learning, and experimentation.",
    color: "#7c3aed",
    border: "rgba(124,58,237,0.5)",
    angle: 90,
  },
  {
    id: 5,
    emoji: "🎤",
    label: "Community Ambassador",
    desc: "Actively contributes to developer communities and helps connect people through technology.",
    color: "#0ea5e9",
    border: "rgba(14,165,233,0.5)",
    angle: 135,
  },
  {
    id: 6,
    emoji: "🧠",
    label: "Critical Thinker",
    desc: "Approaches problems analytically while balancing creativity and practicality.",
    color: "#e11d48",
    border: "rgba(225,29,72,0.5)",
    angle: 180,
  },
  {
    id: 7,
    emoji: "💡",
    label: "Innovation Driven",
    desc: "Passionate about building products that solve meaningful real-world problems.",
    color: "#7c3aed",
    border: "rgba(124,58,237,0.5)",
    angle: -135,
  },
];

const RADIUS_PERCENT = 36;

function getNodePos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + RADIUS_PERCENT * Math.cos(rad),
    y: 50 + RADIUS_PERCENT * Math.sin(rad),
  };
}

function Particle({ delay }: { delay: number }) {
  const colors = ["#0ea5e9", "#7c3aed", "#e11d48", "rgba(100,100,200,0.7)"];
  const left = `${Math.random() * 100}%`;
  const top = `${Math.random() * 100}%`;
  const size = `${2 + Math.random() * 3}px`;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const dur = `${7 + Math.random() * 8}s`;

  return (
    <span
      className="btc-particle"
      style={{
        position: "absolute",
        left,
        top,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        animationDelay: `${delay}s`,
        animationDuration: dur,
        opacity: 0.55,
      }}
    />
  );
}

export function BeyondTheCode() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [nodesVisible, setNodesVisible] = useState<boolean[]>(Array(8).fill(false));
  const [coreVisible, setCoreVisible] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);

  const particles = useRef(
    Array.from({ length: 24 }, (_, i) => ({ id: i, delay: i * 0.35 }))
  );
  const nodePositions = NODES.map((n) => getNodePos(n.angle));

  useEffect(() => {
    if (!isInView) return;
    setCoreVisible(true);

    const t1 = setTimeout(() => {
      let prog = 0;
      const iv = setInterval(() => {
        prog = Math.min(prog + 0.022, 1);
        setLineProgress(prog);
        if (prog >= 1) clearInterval(iv);
      }, 22);
      return () => clearInterval(iv);
    }, 500);

    const t2 = setTimeout(() => {
      NODES.forEach((_, i) => {
        setTimeout(() => {
          setNodesVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * 180);
      });
    }, 900);

    const t3 = setTimeout(() => setParticlesActive(true), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Background — full bleed, no dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Very light frosted white veil for readability — keeps colors vivid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.12)",
        }}
      />

      {/* Ambient particles */}
      <AnimatePresence>
        {particlesActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {particles.current.map((p) => (
              <Particle key={p.id} delay={p.delay} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: -28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          paddingTop: "68px",
          paddingBottom: "16px",
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.25 }}
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 700,
            color: "#0ea5e9",
            textTransform: "uppercase",
            letterSpacing: "0.32em",
            marginBottom: "12px",
          }}
        >
          Personality Constellation
        </motion.span>

        <h2
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 900,
            color: "#0f172a",
            margin: "0 0 14px",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
          }}
        >
          BEYOND THE CODE
        </h2>

        <p
          style={{
            fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
            color: "#334155",
            maxWidth: "420px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          More than a developer.
          <br />
          <span style={{ color: "#7c3aed", fontWeight: 600 }}>
            A builder, learner, collaborator, and problem solver.
          </span>
        </p>
      </motion.div>

      {/* ── Constellation canvas ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1040px",
          margin: "0 auto",
          aspectRatio: "1 / 0.9",
          minHeight: "580px",
        }}
      >
        {/* SVG lines */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            {NODES.map((node, i) => (
              <linearGradient
                key={`lg-${i}`}
                id={`lg-${i}`}
                gradientUnits="userSpaceOnUse"
                x1="50" y1="50"
                x2={nodePositions[i].x}
                y2={nodePositions[i].y}
              >
                <stop offset="0%" stopColor={node.color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={node.color} stopOpacity="0.75" />
              </linearGradient>
            ))}
          </defs>

          {NODES.map((node, i) => {
            const pos = nodePositions[i];
            const dx = pos.x - 50;
            const dy = pos.y - 50;
            const len = Math.sqrt(dx * dx + dy * dy);
            const drawn = len * lineProgress;
            const isHov = hoveredNode === i;

            return (
              <line
                key={i}
                x1="50" y1="50"
                x2={pos.x} y2={pos.y}
                stroke={`url(#lg-${i})`}
                strokeWidth={isHov ? "0.7" : "0.35"}
                strokeDasharray={`${drawn} ${len}`}
                opacity={
                  hoveredNode === null ? 0.8
                  : isHov ? 1
                  : 0.25
                }
                style={{ transition: "opacity 0.35s, stroke-width 0.3s" }}
              />
            );
          })}
        </svg>

        {/* Center core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={coreVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 30,
          }}
        >
          <div
            className="btc-core-pulse"
            style={{
              width: "clamp(120px, 13vw, 158px)",
              height: "clamp(120px, 13vw, 158px)",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "2px solid rgba(14,165,233,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "14px",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                color: "#0ea5e9",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                marginBottom: "5px",
              }}
            >
              Core Identity
            </div>
            <div
              style={{
                fontSize: "clamp(13px, 1.4vw, 16px)",
                fontWeight: 900,
                color: "#0f172a",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              YASH
              <br />
              GAUTAM
            </div>
            <div
              style={{
                marginTop: "7px",
                width: "30px",
                height: "2px",
                borderRadius: "2px",
                background: "linear-gradient(90deg, #0ea5e9, #7c3aed)",
              }}
            />
          </div>
        </motion.div>

        {/* Personality nodes */}
        {NODES.map((node, i) => {
          const pos = nodePositions[i];
          const isHov = hoveredNode === i;
          const dimmed = hoveredNode !== null && !isHov;

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.35 }}
              animate={
                nodesVisible[i]
                  ? { opacity: dimmed ? 0.45 : 1, scale: isHov ? 1.06 : 1 }
                  : { opacity: 0, scale: 0.35 }
              }
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.38, ease: [0.34, 1.56, 0.64, 1] },
              }}
              onHoverStart={() => setHoveredNode(i)}
              onHoverEnd={() => setHoveredNode(null)}
              style={{
                position: "absolute",
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%,-50%)",
                zIndex: 20,
                cursor: "pointer",
              }}
            >
              <div
                className="btc-node-float"
                style={{ animationDelay: `${i * 0.45}s` }}
              >
                <div
                  style={{
                    borderRadius: isHov ? "18px" : "50%",
                    background: isHov
                      ? "rgba(255,255,255,0.88)"
                      : "rgba(255,255,255,0.52)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: `2px solid ${isHov ? node.color : "rgba(255,255,255,0.7)"}`,
                    boxShadow: isHov
                      ? `0 4px 28px ${node.border}, 0 8px 40px rgba(0,0,0,0.08)`
                      : `0 2px 12px rgba(0,0,0,0.07)`,
                    padding: isHov ? "16px 18px" : "0",
                    width: isHov
                      ? "clamp(148px,15vw,180px)"
                      : "clamp(86px,9.5vw,114px)",
                    minHeight: isHov ? "unset" : "clamp(86px,9.5vw,114px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  <span
                    style={{
                      fontSize: isHov ? "24px" : "clamp(20px,2.4vw,28px)",
                      display: "block",
                      marginBottom: isHov ? "8px" : "4px",
                      transition: "font-size 0.3s",
                    }}
                  >
                    {node.emoji}
                  </span>

                  <div
                    style={{
                      fontSize: isHov ? "11.5px" : "clamp(8px,0.88vw,10.5px)",
                      fontWeight: 800,
                      color: isHov ? node.color : "#1e293b",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      lineHeight: 1.25,
                      transition: "all 0.3s",
                    }}
                  >
                    {node.label}
                  </div>

                  <AnimatePresence>
                    {isHov && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden", width: "100%" }}
                      >
                        <div
                          style={{
                            margin: "8px auto",
                            width: "28px",
                            height: "1.5px",
                            borderRadius: "2px",
                            background: `linear-gradient(90deg, ${node.color}, transparent)`,
                          }}
                        />
                        <p
                          style={{
                            fontSize: "10.5px",
                            color: "#334155",
                            lineHeight: 1.6,
                            margin: 0,
                            fontWeight: 500,
                          }}
                        >
                          {node.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={particlesActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          paddingBottom: "68px",
          paddingTop: "4px",
        }}
      >
        <p
          style={{
            fontSize: "clamp(0.8rem, 1.2vw, 0.92rem)",
            color: "#475569",
            letterSpacing: "0.07em",
            fontStyle: "italic",
          }}
        >
          "Not just building projects — building a future worth being part of."
        </p>
        <div
          style={{
            margin: "18px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? "32px" : "6px",
                height: "3px",
                borderRadius: "3px",
                background:
                  i === 1
                    ? "linear-gradient(90deg, #0ea5e9, #7c3aed)"
                    : "rgba(100,100,150,0.3)",
              }}
            />
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes btcFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes btcParticleFloat {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.4; }
          100% { transform: translateY(-70px) scale(0.5); opacity: 0; }
        }
        @keyframes btcCorePulse {
          0%, 100% { box-shadow: 0 0 28px rgba(14,165,233,0.2), 0 0 60px rgba(124,58,237,0.1); }
          50%       { box-shadow: 0 0 44px rgba(14,165,233,0.35), 0 0 90px rgba(124,58,237,0.2); }
        }
        .btc-node-float { animation: btcFloat 5s ease-in-out infinite; }
        .btc-particle   { animation: btcParticleFloat linear infinite; position: absolute; border-radius: 50%; }
        .btc-core-pulse { animation: btcCorePulse 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
