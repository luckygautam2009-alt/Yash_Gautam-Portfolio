import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, useSpring as useSpringMotion } from "motion/react";
import { GraduationCap, Code2, Trophy, GitBranch, Brain } from "lucide-react";

// ─── Color tokens (Warm Brown & Cream System) ──────────────────────────────────
const C = {
  accent:       "#8b5a2b",
  accentLight:  "rgba(139,90,43,0.12)",
  accentBorder: "rgba(139,90,43,0.28)",
  textPrimary:  "#2d1f10",
  textSecondary:"#4a3828",
  textMuted:    "#6e5a47",
  cardBg:       "rgba(255,255,255,0.72)",
  cardBorder:   "rgba(255,255,255,0.90)",
};

// ─── Per-milestone skill balls ─────────────────────────────────────────────────
interface SkillBall { name: string; x: string; y: string; delay: number }

interface MilestoneData {
  id: number; period: string; title: string; subtitle: string;
  highlights: string[]; Icon: React.ComponentType<{size?:number;style?:React.CSSProperties}>;
  tag: string; side: "left"|"right";
  accent: string[]; accentType: "pills"|"stats"|"github"|"neural";
  glowColor: string; glowColorSoft: string;
  skillBalls: SkillBall[];
  ballBg: string; ballBorder: string; ballText: string; ballDotColor: string;
}

const MILESTONES: MilestoneData[] = [
  {
    id:1, period:"2025 – Present",
    title:"B.Tech CSE (AI & ML)", subtitle:"NIET, Greater Noida",
    highlights:["Started my B.Tech journey in 2025","Built strong foundations in C++","Learned Data Structures & Algorithms","Explored Artificial Intelligence & Machine Learning","Built problem-solving skills through projects and coding"],
    Icon:GraduationCap, tag:"Education", side:"left",
    accent:["C++","DSA","Python","AI/ML","Mathematics"], accentType:"pills",
    glowColor:"rgba(212,163,115,0.45)", glowColorSoft:"rgba(212,163,115,0.18)",
    skillBalls:[
      { name:"C++",         x:"14%", y:"8%",  delay:0   },
      { name:"DSA",         x:"58%", y:"12%", delay:0.5 },
      { name:"Python",      x:"68%", y:"42%", delay:1.0 },
      { name:"AI / ML",     x:"10%", y:"52%", delay:0.7 },
      { name:"Mathematics", x:"42%", y:"74%", delay:1.3 },
    ],
    ballBg:"rgba(244,227,211,0.55)", ballBorder:"rgba(212,163,115,0.55)",
    ballText:"#5a3818", ballDotColor:"#b87d4b",
  },
  {
    id:2, period:"2025 – 2026",
    title:"Frontend Developer", subtitle:"Building Modern Web Experiences",
    highlights:["Learned HTML, CSS and JavaScript","Built responsive websites","Started React development","Learned Next.js and Tailwind CSS","Developed real-world frontend projects"],
    Icon:Code2, tag:"Development", side:"right",
    accent:["HTML/CSS","JavaScript","React","Next.js","Tailwind","TypeScript"], accentType:"pills",
    glowColor:"rgba(221,184,146,0.45)", glowColorSoft:"rgba(221,184,146,0.18)",
    skillBalls:[
      { name:"React",       x:"12%", y:"7%",  delay:0   },
      { name:"Next.js",     x:"56%", y:"14%", delay:0.4 },
      { name:"TypeScript",  x:"66%", y:"46%", delay:0.9 },
      { name:"Tailwind",    x:"8%",  y:"54%", delay:0.6 },
      { name:"HTML / CSS",  x:"38%", y:"76%", delay:1.2 },
    ],
    ballBg:"rgba(250,237,205,0.55)", ballBorder:"rgba(221,184,146,0.55)",
    ballText:"#6b4724", ballDotColor:"#d4a373",
  },
  {
    id:3, period:"2026 – Present",
    title:"Hackathon Builder", subtitle:"Innovation & Rapid Prototyping",
    highlights:["Participated in national hackathons","Built AI-powered MVPs","Worked in cross-functional teams","Rapid prototyping under deadlines","Focused on solving real-world problems"],
    Icon:Trophy, tag:"Hackathons", side:"left",
    accent:["National Events","AI-Powered MVPs","Cross-functional Teams"], accentType:"stats",
    glowColor:"rgba(202,158,116,0.45)", glowColorSoft:"rgba(202,158,116,0.18)",
    skillBalls:[
      { name:"Node.js",  x:"16%", y:"9%",  delay:0   },
      { name:"Firebase", x:"60%", y:"16%", delay:0.5 },
      { name:"MongoDB",  x:"70%", y:"46%", delay:1.0 },
      { name:"Figma",    x:"10%", y:"55%", delay:0.7 },
      { name:"Git",      x:"40%", y:"76%", delay:1.2 },
    ],
    ballBg:"rgba(245,208,168,0.50)", ballBorder:"rgba(215,170,120,0.55)",
    ballText:"#704720", ballDotColor:"#8b5a2b",
  },
  {
    id:4, period:"2026 – Present",
    title:"Open Source Contributor", subtitle:"GitHub & Community",
    highlights:["Contributed to open-source projects","Improved collaboration through Git","Worked with pull requests","Learned version control workflows"],
    Icon:GitBranch, tag:"Open Source", side:"right",
    accent:[], accentType:"github",
    glowColor:"rgba(224,176,140,0.45)", glowColorSoft:"rgba(224,176,140,0.18)",
    skillBalls:[
      { name:"GitHub",   x:"14%", y:"8%",  delay:0   },
      { name:"Git",      x:"58%", y:"12%", delay:0.4 },
      { name:"Open PRs", x:"68%", y:"44%", delay:0.9 },
      { name:"Markdown", x:"8%",  y:"54%", delay:0.6 },
    ],
    ballBg:"rgba(238,205,175,0.50)", ballBorder:"rgba(205,150,120,0.55)",
    ballText:"#6b4724", ballDotColor:"#a06b3e",
  },
  {
    id:5, period:"2026 – Present",
    title:"AI Developer & Community Builder", subtitle:"LaunchByte | AI Agents | Automation",
    highlights:["Building AI Agents & Automation","Founder of LaunchByte","Building full-stack AI applications","Participating in hackathons","Growing a student tech community"],
    Icon:Brain, tag:"AI & Community", side:"left",
    accent:[], accentType:"neural",
    glowColor:"rgba(212,163,115,0.50)", glowColorSoft:"rgba(212,163,115,0.18)",
    skillBalls:[
      { name:"LangChain",  x:"12%", y:"8%",  delay:0   },
      { name:"OpenAI API", x:"56%", y:"14%", delay:0.5 },
      { name:"AI Agents",  x:"66%", y:"46%", delay:1.0 },
      { name:"Automation", x:"8%",  y:"56%", delay:0.7 },
      { name:"LaunchByte", x:"36%", y:"76%", delay:1.2 },
    ],
    ballBg:"rgba(244,227,211,0.55)", ballBorder:"rgba(184,125,75,0.55)",
    ballText:"#5a3818", ballDotColor:"#8b5a2b",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContribGrid() {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background:"rgba(139,90,43,0.06)", border:"1px dashed rgba(139,90,43,0.22)" }}>
        <GitBranch size={15} style={{ color:C.accent, flexShrink:0 }} />
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:C.textSecondary, fontWeight:550 }}>
          Open Source Journey Started
        </span>
      </div>
      <p style={{ color:C.textMuted, fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", marginTop:7 }}>
        Building in public · 2026 onwards
      </p>
    </div>
  );
}

function NeuralNet() {
  const layers=[[3],[4],[4],[2]];
  const nodes:{x:number;y:number;layer:number}[]=[];
  layers.forEach((c,li)=>{ const t=c[0]; Array.from({length:t}).forEach((_,ni)=>nodes.push({x:li*54+14,y:ni*34+(4-t)*17+10,layer:li})); });
  const edges:{x1:number;y1:number;x2:number;y2:number}[]=[];
  for(let li=0;li<layers.length-1;li++){
    const f=nodes.filter(n=>n.layer===li),t=nodes.filter(n=>n.layer===li+1);
    f.forEach(a=>t.forEach(b=>edges.push({x1:a.x,y1:a.y,x2:b.x,y2:b.y})));
  }
  return (
    <div className="mt-5 overflow-hidden" style={{height:84}}>
      <svg width="226" height="82" viewBox="0 0 226 82">
        {edges.map((e,i)=><line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="rgba(194,84,114,0.2)" strokeWidth="0.9"/>)}
        {nodes.map((n,i)=>(
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={5.5} fill="rgba(194,84,114,0.15)" stroke="rgba(194,84,114,0.4)" strokeWidth="0.9"/>
            {n.layer===layers.length-1&&<circle cx={n.x} cy={n.y} r={3} fill={C.accent}/>}
          </g>
        ))}
      </svg>
      <p style={{ color:C.textMuted,fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",marginTop:3 }}>
        Neural architecture
      </p>
    </div>
  );
}

// Floating skill pill in empty space
function SkillPill({ ball, bg, border, text, dot }: {
  ball: SkillBall; bg: string; border: string; text: string; dot: string;
}) {
  return (
    <motion.div
      className="absolute flex items-center gap-2 rounded-full select-none"
      style={{
        left: ball.x,
        top:  ball.y,
        paddingLeft: "12px", paddingRight: "14px",
        paddingTop: "7px",   paddingBottom: "7px",
        background: bg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${border}`,
        boxShadow: `0 2px 18px ${bg.replace("0.38","0.28").replace("0.40","0.28")}, 0 1px 0 rgba(255,255,255,0.85) inset`,
        whiteSpace: "nowrap",
        zIndex: 15,
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: 0.3 + ball.delay, ease: [0.22,1,0.36,1] }}
      animate={{ y: [0, -(8 + ball.delay*3), 0] }}
    >
      {/* Coloured dot */}
      <span className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: dot, boxShadow:`0 0 6px ${dot}88` }} />
      <span style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "0.82rem",
        fontWeight: 650,
        color: text,
        letterSpacing: "0.01em",
      }}>
        {ball.name}
      </span>
    </motion.div>
  );
}

// Full milestone row — Premium Glassmorphism Card
function MilestoneCard({ milestone, index }: { milestone: MilestoneData; index: number }) {
  const ref        = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const isInView   = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered]   = useState(false);
  const [mouseXY, setMouseXY]   = useState({ x: 0.5, y: 0.5 });
  const { Icon, side } = milestone;

  // Tilt motion values — spring-smoothed
  const rawRY = useMotionValue(0);
  const rawRX = useMotionValue(0);
  const rotateY = useSpringMotion(rawRY, { stiffness: 180, damping: 22 });
  const rotateX = useSpringMotion(rawRX, { stiffness: 180, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return;
    const r = innerRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;   // 0 → 1
    const ny = (e.clientY - r.top)  / r.height;
    setMouseXY({ x: nx, y: ny });
    rawRY.set((nx - 0.5) *  9);
    rawRX.set((0.5 - ny) *  6);
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setMouseXY({ x: 0.5, y: 0.5 });
    rawRY.set(0); rawRX.set(0);
  };

  const cardVariants = {
    hidden:  { opacity:0, x: side==="left" ? -55 : 55, y:18, scale:0.96 },
    visible: { opacity:1, x:0, y:0, scale:1,
      transition:{ duration:0.78, delay:0.05, ease:[0.22,1,0.36,1] as const } },
  };

  // Multi-layered premium shadows
  const shadowBase = `
    0 1px 2px rgba(0,0,0,0.04),
    0 4px 12px rgba(0,0,0,0.06),
    0 12px 32px rgba(0,0,0,0.07),
    0 32px 64px rgba(0,0,0,0.05),
    0 1px 0 rgba(255,255,255,0.92) inset
  `;
  const shadowHover = `
    0 2px 4px rgba(0,0,0,0.05),
    0 8px 24px ${milestone.glowColorSoft},
    0 20px 60px ${milestone.glowColor},
    0 48px 96px rgba(0,0,0,0.06),
    0 1px 0 rgba(255,255,255,0.95) inset
  `;

  // Light reflection spot follows cursor
  const reflectX = `${mouseXY.x * 100}%`;
  const reflectY = `${mouseXY.y * 100}%`;

  // The card column
  const cardCol = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`w-[45%] ${side==="left"?"pr-6 lg:pr-10":"pl-6 lg:pl-10"}`}
      style={{ cursor:"default", perspective: "1200px" }}
    >
      {/* Outer wrapper handles the float + lift */}
      <motion.div
        animate={hovered
          ? { y: -8, scale: 1.018 }
          : { y: [0, -3, 0] }
        }
        transition={hovered
          ? { duration: 0.35, ease: [0.22,1,0.36,1] }
          : { duration: 4.2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
        }
      >
        {/* Inner glass card with 3-D tilt */}
        <motion.div
          ref={innerRef}
          style={{
            rotateX, rotateY,
            transformStyle: "preserve-3d",
            borderRadius: 28,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden"
        >
          {/* ── Glass surface ── */}
          <div
            style={{
              padding: "1.1rem 1.2rem 1.15rem",
              background: hovered
                ? "rgba(255,255,255,0.24)"
                : "rgba(255,255,255,0.18)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderRadius: 28,
              border: `1px solid ${ hovered ? "rgba(255,255,255,0.52)" : "rgba(255,255,255,0.35)" }`,
              borderTop:  `1.5px solid ${ hovered ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.58)" }`,
              borderLeft: `1.5px solid ${ hovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.48)" }`,
              boxShadow: hovered ? shadowHover : shadowBase,
              transition: "box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s ease, border-color 0.35s ease",
            }}
          >
            {/* ── Top specular highlight ── */}
            <div className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: 1.5,
                borderRadius: "28px 28px 0 0",
                background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.95) 38%,rgba(255,255,255,0.95) 62%,transparent 100%)",
              }} />

            {/* ── Cursor-tracked light orb ── */}
            <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 28, overflow: "hidden" }}>
              <div style={{
                position: "absolute",
                width: "55%", height: "55%",
                left: reflectX, top: reflectY,
                transform: "translate(-50%,-50%)",
                background: `radial-gradient(circle, rgba(255,255,255,${ hovered ? "0.18" : "0.10" }) 0%, transparent 70%)`,
                transition: "opacity 0.25s ease",
                borderRadius: "50%",
                filter: "blur(2px)",
              }} />
            </div>

            {/* ── Hover bottom glow ── */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: 28,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.35s ease",
                background: `radial-gradient(ellipse at 50% 115%, ${milestone.glowColorSoft} 0%, transparent 62%)`,
              }} />

            {/* ── Hover bottom accent bar ── */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: 2, borderRadius: "0 0 28px 28px",
                background: `linear-gradient(90deg,transparent,${milestone.glowColor},transparent)`,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.35s ease",
              }} />

            {/* ═══════════ CONTENT ═══════════ */}
            <div style={{ position: "relative", zIndex: 10 }}>

              {/* Header row */}
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom: "0.55rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap: "0.6rem" }}>

                  {/* Circular glass icon */}
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${C.accentBorder}`,
                    boxShadow: `0 2px 8px ${C.accentLight}, 0 1px 0 rgba(255,255,255,0.9) inset`,
                  }}>
                    <Icon size={16} style={{ color: C.accent }} />
                  </div>

                  <div>
                    <div style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase" as const,
                      color: C.accent, marginBottom: 2,
                    }}>
                      {milestone.tag}
                    </div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", color:C.textMuted, fontWeight:500 }}>
                      {milestone.period}
                    </div>
                  </div>
                </div>

                {/* Floating number pill */}
                <div style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: 999,
                  padding: "2px 9px",
                  fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem",
                  color: C.textMuted, fontWeight: 600, letterSpacing: "0.04em",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                  0{index+1}
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "1.22rem", fontWeight: 760,
                color: C.textPrimary, letterSpacing: "-0.018em",
                lineHeight: 1.2, marginBottom: "0.18rem",
              }}>
                {milestone.title}
              </h3>

              {/* Subtitle */}
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem",
                color: C.textMuted, fontWeight: 500, marginBottom: "0.6rem", lineHeight: 1.4,
              }}>
                {milestone.subtitle}
              </p>

              {/* Divider */}
              <div style={{
                height: 1, marginBottom: "0.55rem",
                background: "linear-gradient(90deg, transparent, rgba(139,90,43,0.14) 40%, rgba(139,90,43,0.14) 60%, transparent)",
              }} />

              {/* Bullet highlights — tighter spacing */}
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {milestone.highlights.map((h, i) => (
                  <li key={i} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    {/* Gradient dot */}
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                      background: `radial-gradient(circle, #e8c08a 0%, ${C.accent} 70%)`,
                      boxShadow: `0 0 5px rgba(139,90,43,0.45)`,
                    }} />
                    <span style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: "0.84rem",
                      color: C.textSecondary, lineHeight: 1.45, fontWeight: 440,
                    }}>
                      {h}
                    </span>
                  </li>
                ))}
              </ul>

              {/* ── Glass pill skill tags ── */}
              {milestone.accentType==="pills" && milestone.accent.length>0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem", marginTop:"0.65rem" }}>
                  {milestone.accent.map(tag => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "3px 10px 3px 7px", borderRadius: 999,
                        background: "rgba(255,255,255,0.45)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid rgba(255,255,255,0.6)`,
                        color: C.textSecondary,
                        fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", fontWeight: 560,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.8) inset",
                        cursor: "default",
                      }}
                    >
                      <span style={{
                        width: 5, height: 5, borderRadius:"50%", flexShrink:0,
                        background: `radial-gradient(circle,#e8c08a,${C.accent})`,
                        boxShadow: `0 0 4px ${C.accent}88`,
                      }} />
                      {tag}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Stats row */}
              {milestone.accentType==="stats" && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginTop:"0.65rem" }}>
                  {milestone.accent.map(stat => (
                    <div key={stat} style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "3px 10px 3px 8px", borderRadius: 999,
                      background: "rgba(255,255,255,0.45)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.6)",
                      fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem",
                      color: C.textSecondary, fontWeight: 560,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                    }}>
                      <span style={{ width:5,height:5,borderRadius:"50%",background:`radial-gradient(circle,#e8c08a,${C.accent})`,boxShadow:`0 0 4px ${C.accent}88`,flexShrink:0 }} />
                      {stat}
                    </div>
                  ))}
                </div>
              )}

              {milestone.accentType==="github" && <ContribGrid />}
              {milestone.accentType==="neural"  && <NeuralNet />}

            </div>{/* /CONTENT */}
          </div>{/* /glass surface */}
        </motion.div>{/* /tilt */}
      </motion.div>{/* /float */}
    </motion.div>
  );

  // The skill-balls column (fills opposite empty side, same height as card)
  const ballsCol = (
    <div className="w-[45%] relative self-stretch"
      style={{ padding: side==="left" ? "0 0 0 2.5rem" : "0 2.5rem 0 0" }}>
      {milestone.skillBalls.map(ball=>(
        <SkillPill
          key={ball.name}
          ball={ball}
          bg={milestone.ballBg}
          border={milestone.ballBorder}
          text={milestone.ballText}
          dot={milestone.ballDotColor}
        />
      ))}
    </div>
  );

  return (
    <div ref={ref} className={`relative flex items-center w-full ${side==="left"?"flex-row":"flex-row-reverse"}`}>
      {cardCol}

      {/* Timeline connector dot — must sit exactly on the center line */}
      <div className="w-[10%] flex justify-center relative z-20 flex-shrink-0" style={{ alignSelf: "flex-start", paddingTop: "2.2rem" }}>

        <motion.div
          initial={{ scale:0, opacity:0 }}
          animate={isInView?{scale:1,opacity:1}:{}}
          transition={{ duration:0.45, delay:0.25, ease:"backOut" }}
          className="relative flex items-center justify-center"
        >
          {/* White ring — the "sits on line" visual */}
          <div className="absolute rounded-full"
            style={{
              width: 26, height: 26,
              background: "rgba(255,255,255,0.92)",
              border: `2.5px solid ${C.accent}`,
              boxShadow: `0 0 0 3px rgba(255,255,255,0.9), 0 0 16px rgba(139,90,43,0.45)`,
              zIndex: 5,
            }} />
          {/* Inner colored dot */}
          <div className="rounded-full relative z-10"
            style={{
              width: 14, height: 14,
              background: `radial-gradient(circle, #e8c08a 0%, ${C.accent} 70%)`,
              boxShadow: `0 0 10px rgba(139,90,43,0.7), 0 0 22px rgba(139,90,43,0.35)`,
            }} />
          {/* Pulse ring */}
          <motion.div className="absolute rounded-full"
            style={{ width: 40, height: 40, background: `rgba(139,90,43,0.12)`, zIndex: 1 }}
            animate={{ scale:[1, 1.8, 1], opacity:[0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </div>


      {ballsCol}
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────
export function MyEvolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start end","end start"] });
  const rawScale    = useTransform(scrollYProgress,[0.06,0.88],[0,1]);
  const timelineScaleY = useSpring(rawScale,{ stiffness:60, damping:20 });
  const dotPercent  = useTransform(scrollYProgress,[0.08,0.86],["0%","100%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden"
      style={{ background:"transparent", minHeight:"100vh" }}>

      {/* Ambient mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { w:"48%",h:"40%",top:"3%", left:"2%",   bg:"radial-gradient(circle,rgba(244,227,211,0.5) 0%,transparent 68%)" },
          { w:"42%",h:"42%",top:"8%", right:"0%",  bg:"radial-gradient(circle,rgba(250,237,205,0.45) 0%,transparent 68%)" },
          { w:"52%",h:"42%",bottom:"12%",left:"24%",bg:"radial-gradient(circle,rgba(245,208,168,0.4) 0%,transparent 68%)" },
          { w:"38%",h:"32%",bottom:"4%",right:"4%", bg:"radial-gradient(circle,rgba(238,205,175,0.4) 0%,transparent 68%)" },
        ].map((b,i)=>(
          <div key={i} className="absolute" style={{
            width:b.w,height:b.h,
            top:b.top,left:(b as any).left,right:(b as any).right,bottom:(b as any).bottom,
            background:b.bg,filter:"blur(50px)",
          }}/>
        ))}
      </div>

      {/* ── Decorative Homepage-Style Floating Background Icons ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          style={{ position: 'absolute', top: '10%', left: '5%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GraduationCap size={130} strokeWidth={0.9} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: '32%', right: '6%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          <Code2 size={140} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', bottom: '25%', left: '8%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ y: [0, 15, 0], x: [0, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Trophy size={120} strokeWidth={0.9} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', bottom: '8%', right: '12%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GitBranch size={130} strokeWidth={0.8} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">

        {/* Section header */}
        <div className="pt-16 pb-14 text-center">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:0.55}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background:"rgba(255,255,255,0.65)",backdropFilter:"blur(14px)",
              border:`1px solid ${C.accentBorder}`,boxShadow:"0 2px 14px rgba(194,84,114,0.1)" }}>
            <span className="w-2 h-2 rounded-full"
              style={{ background:C.accent,boxShadow:`0 0 8px rgba(194,84,114,0.65)` }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",fontWeight:700,
              letterSpacing:"0.14em",textTransform:"uppercase" as const,color:C.accent }}>
              Career Journey
            </span>
          </motion.div>

          <motion.h2 initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:0.7,delay:0.08}}
            style={{ fontFamily:"'Outfit',sans-serif",
              fontSize:"clamp(2.8rem,5.8vw,5.2rem)",fontWeight:800,
              letterSpacing:"-0.03em",lineHeight:1.0,color:C.textPrimary,marginBottom:"1rem" }}>
            MY EVOLUTION
          </motion.h2>

          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:0.6,delay:0.18}}
            style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"1.15rem",lineHeight:1.65,
              color:C.textMuted,maxWidth:500,margin:"0 auto",fontWeight:450 }}>
            The journey from a curious student to an AI & Web Developer.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative mt-6">

          {/* Track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 overflow-hidden"
            style={{ width:3,background:"rgba(22,22,58,0.08)",borderRadius:999 }}>

            {/* Scroll-fill bar */}
            <motion.div className="absolute top-0 left-0 w-full origin-top"
              style={{ scaleY:timelineScaleY,height:"100%",borderRadius:999,
                background:"linear-gradient(180deg,#a8c0e8 0%,#b8a8e0 35%,#c25472 70%,#e8a0b0 100%)" }} />

            {/* Pulse 1 — fast coral */}
            <motion.div className="absolute left-0 w-full pointer-events-none"
              style={{ height:80,borderRadius:999,
                background:"linear-gradient(180deg,transparent 0%,rgba(194,84,114,0.85) 48%,transparent 100%)" }}
              animate={{ top:["-10%","110%"] }}
              transition={{ duration:2.6,repeat:Infinity,ease:"linear",repeatDelay:0.4 }} />

            {/* Pulse 2 — slow blue */}
            <motion.div className="absolute left-0 w-full pointer-events-none"
              style={{ height:130,borderRadius:999,
                background:"linear-gradient(180deg,transparent 0%,rgba(150,165,225,0.55) 50%,transparent 100%)" }}
              animate={{ top:["-15%","115%"] }}
              transition={{ duration:4.2,repeat:Infinity,ease:"linear",repeatDelay:0.8,delay:1.4 }} />

            {/* Shimmer sweep — upward */}
            <motion.div className="absolute left-0 w-full pointer-events-none"
              style={{ height:50,borderRadius:999,
                background:"linear-gradient(180deg,transparent 0%,rgba(255,255,255,0.68) 50%,transparent 100%)" }}
              animate={{ top:["110%","-10%"] }}
              transition={{ duration:3.8,repeat:Infinity,ease:"linear",repeatDelay:1.2,delay:2.0 }} />

            {/* Scroll-position live dot */}
            <motion.div className="absolute pointer-events-none"
              style={{ top:dotPercent,left:"50%",transform:"translate(-50%,-50%)",
                width:12,height:12,borderRadius:"50%",zIndex:10,
                background:"radial-gradient(circle,#ffffff 0%,#e890b0 55%,#c25472 100%)",
                boxShadow:"0 0 10px rgba(194,84,114,0.9),0 0 22px rgba(194,84,114,0.5)" }} />
          </div>

          {/* Milestone rows */}
          <div className="space-y-16 lg:space-y-24 py-6">
            {MILESTONES.map((m,i)=>(
              <MilestoneCard key={m.id} milestone={m} index={i} />
            ))}
          </div>

          {/* End marker */}
          <div className="flex justify-center mt-14">
            <motion.div initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}}
              viewport={{once:true}} transition={{duration:0.5,delay:0.2}}
              className="relative flex items-center justify-center">
              <div className="w-6 h-6 rounded-full z-10 relative flex items-center justify-center"
                style={{ background:"rgba(255,255,255,0.75)",border:`1.5px solid ${C.accentBorder}`,
                  boxShadow:`0 0 18px rgba(194,84,114,0.22)` }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:C.accent }} />
              </div>
              <p className="absolute whitespace-nowrap"
                style={{ top:"calc(100% + 12px)",fontFamily:"'DM Sans',sans-serif",
                  fontSize:"0.8rem",color:C.textMuted,letterSpacing:"0.06em",fontWeight:500 }}>
                The story continues…
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
