import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "motion/react";
import { GraduationCap, Code2, Trophy, GitBranch, Brain } from "lucide-react";

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  accent:       "#c25472",
  accentLight:  "rgba(194,84,114,0.13)",
  accentBorder: "rgba(194,84,114,0.25)",
  textPrimary:  "#16163a",
  textSecondary:"#36366a",
  textMuted:    "#62628a",
  cardBg:       "rgba(255,255,255,0.62)",
  cardBorder:   "rgba(255,255,255,0.85)",
};

// ─── Background spheres ───────────────────────────────────────────────────────
const SPHERES = [
  { id:0,  left:"4%",   top:"18%", size:110, color:"radial-gradient(circle at 32% 30%,#cce4f8,#88b8e8 55%,#6090d4)", dur:18, delay:0,   mx:28, my:38 },
  { id:1,  left:"76%",  top:"12%", size:130, color:"radial-gradient(circle at 32% 30%,#d8c8f4,#b0a0e8 55%,#8878d0)", dur:22, delay:1.2, mx:22, my:44 },
  { id:2,  left:"0%",   top:"56%", size:90,  color:"radial-gradient(circle at 32% 30%,#eeb8c4,#d48090 55%,#be6078)", dur:16, delay:2.4, mx:18, my:32 },
  { id:3,  left:"80%",  top:"52%", size:105, color:"radial-gradient(circle at 32% 30%,#c8daf4,#90b8e4 55%,#6c98d0)", dur:20, delay:0.8, mx:24, my:40 },
  { id:4,  left:"10%",  top:"80%", size:75,  color:"radial-gradient(circle at 32% 30%,#f4d0b4,#e0b08c 55%,#c89068)", dur:14, delay:3.0, mx:16, my:28 },
  { id:5,  left:"74%",  top:"78%", size:88,  color:"radial-gradient(circle at 32% 30%,#f4c0d0,#e098b0 55%,#ce7090)", dur:19, delay:1.6, mx:20, my:36 },
  { id:6,  left:"38%",  top:"10%", size:55,  color:"radial-gradient(circle at 32% 30%,#c4dcf4,#96c0e8)",              dur:13, delay:2.0, mx:14, my:22 },
  { id:7,  left:"52%",  top:"88%", size:62,  color:"radial-gradient(circle at 32% 30%,#ecc4d4,#dca0b8)",              dur:17, delay:0.4, mx:18, my:26 },
  { id:8,  left:"86%",  top:"35%", size:50,  color:"radial-gradient(circle at 32% 30%,#d4caf4,#b8aae4)",              dur:15, delay:1.8, mx:12, my:20 },
  { id:9,  left:"18%",  top:"42%", size:42,  color:"radial-gradient(circle at 32% 30%,#f4d4b4,#e4bc94)",              dur:21, delay:2.8, mx:10, my:18 },
];

// ─── Per-milestone skill balls ─────────────────────────────────────────────────
// Each ball lives in the EMPTY side opposite the card so it's never hidden.
// x/y are percentages within that empty side container.
// Colors are pastel background-oriented (derived from the sphere palette).
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
    id:1, period:"2022 – Present",
    title:"B.Tech CSE (AI & ML)", subtitle:"NIET Greater Noida",
    highlights:["Started coding journey","Developed interest in AI","Built foundation in problem solving","Explored modern technologies"],
    Icon:GraduationCap, tag:"Education", side:"left",
    accent:["Python","DSA","AI/ML","Mathematics"], accentType:"pills",
    glowColor:"rgba(136,184,232,0.55)", glowColorSoft:"rgba(136,184,232,0.18)",
    // Empty space is on the RIGHT
    skillBalls:[
      { name:"Python",      x:"14%", y:"8%",  delay:0   },
      { name:"C++",         x:"58%", y:"12%", delay:0.5 },
      { name:"DSA",         x:"68%", y:"42%", delay:1.0 },
      { name:"AI / ML",     x:"10%", y:"52%", delay:0.7 },
      { name:"Mathematics", x:"42%", y:"74%", delay:1.3 },
    ],
    ballBg:"rgba(168,208,245,0.38)", ballBorder:"rgba(120,172,228,0.55)",
    ballText:"#2a5a9a", ballDotColor:"#6aaade",
  },
  {
    id:2, period:"2023",
    title:"Web Developer", subtitle:"Frontend Engineering",
    highlights:["Built responsive websites","Modern UI/UX development","React and Next.js projects","Frontend engineering experience"],
    Icon:Code2, tag:"Development", side:"right",
    accent:["React","Next.js","Tailwind","TypeScript"], accentType:"pills",
    glowColor:"rgba(176,160,232,0.55)", glowColorSoft:"rgba(176,160,232,0.18)",
    // Empty space is on the LEFT
    skillBalls:[
      { name:"React",       x:"12%", y:"7%",  delay:0   },
      { name:"Next.js",     x:"56%", y:"14%", delay:0.4 },
      { name:"TypeScript",  x:"66%", y:"46%", delay:0.9 },
      { name:"Tailwind",    x:"8%",  y:"54%", delay:0.6 },
      { name:"HTML / CSS",  x:"38%", y:"76%", delay:1.2 },
    ],
    ballBg:"rgba(195,180,240,0.38)", ballBorder:"rgba(155,140,220,0.55)",
    ballText:"#4a34a0", ballDotColor:"#9a88d8",
  },
  {
    id:3, period:"2023",
    title:"Hackathon Builder", subtitle:"Innovation & Speed",
    highlights:["Participated in hackathons","Rapid prototyping experience","Team collaboration","Built innovative solutions"],
    Icon:Trophy, tag:"Competition", side:"left",
    accent:["5+ Events","48hr Sprints","Team Leader"], accentType:"stats",
    glowColor:"rgba(224,176,140,0.55)", glowColorSoft:"rgba(224,176,140,0.18)",
    // Empty space is on the RIGHT
    skillBalls:[
      { name:"Node.js",  x:"16%", y:"9%",  delay:0   },
      { name:"Firebase", x:"60%", y:"16%", delay:0.5 },
      { name:"MongoDB",  x:"70%", y:"46%", delay:1.0 },
      { name:"Figma",    x:"10%", y:"55%", delay:0.7 },
      { name:"Git",      x:"40%", y:"76%", delay:1.2 },
    ],
    ballBg:"rgba(245,208,168,0.40)", ballBorder:"rgba(215,170,120,0.55)",
    ballText:"#8a5020", ballDotColor:"#d49060",
  },
  {
    id:4, period:"2024",
    title:"Open Source Contributor", subtitle:"GSSoC & GitHub",
    highlights:["GSSoC Contributor","Pull requests and issue solving","GitHub collaboration","Community contribution"],
    Icon:GitBranch, tag:"Open Source", side:"right",
    accent:[], accentType:"github",
    glowColor:"rgba(212,128,144,0.55)", glowColorSoft:"rgba(212,128,144,0.18)",
    // Empty space is on the LEFT
    skillBalls:[
      { name:"GitHub",   x:"14%", y:"8%",  delay:0   },
      { name:"Git CLI",  x:"58%", y:"12%", delay:0.4 },
      { name:"GSSoC",    x:"68%", y:"44%", delay:0.9 },
      { name:"Open PRs", x:"8%",  y:"54%", delay:0.6 },
      { name:"Markdown", x:"36%", y:"74%", delay:1.1 },
    ],
    ballBg:"rgba(238,175,185,0.40)", ballBorder:"rgba(205,130,148,0.55)",
    ballText:"#8a2040", ballDotColor:"#d06880",
  },
  {
    id:5, period:"2024 – Present",
    title:"AI Developer", subtitle:"Agents & Automation",
    highlights:["AI Agents","Automation Systems","Intelligent Applications","Machine Learning Exploration"],
    Icon:Brain, tag:"AI & ML", side:"left",
    accent:[], accentType:"neural",
    glowColor:"rgba(184,168,224,0.55)", glowColorSoft:"rgba(184,168,224,0.18)",
    // Empty space is on the RIGHT
    skillBalls:[
      { name:"LangChain",    x:"12%", y:"8%",  delay:0   },
      { name:"OpenAI API",   x:"56%", y:"14%", delay:0.5 },
      { name:"AI Agents",    x:"66%", y:"46%", delay:1.0 },
      { name:"Automation",   x:"8%",  y:"56%", delay:0.7 },
      { name:"Hugging Face", x:"36%", y:"76%", delay:1.2 },
    ],
    ballBg:"rgba(195,182,240,0.40)", ballBorder:"rgba(158,140,222,0.55)",
    ballText:"#3c2a98", ballDotColor:"#9880d0",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContribGrid() {
  const cols = 16; const rows = 5;
  const cells = Array.from({ length: cols*rows }, (_, i) => {
    const r = (i*7919+1234567)%100/100;
    return r<0.45?0:r<0.65?1:r<0.82?2:r<0.93?3:4;
  });
  const colors = ["rgba(180,160,220,0.12)","rgba(194,84,114,0.2)","rgba(194,84,114,0.4)","rgba(194,84,114,0.65)","rgba(194,84,114,0.9)"];
  return (
    <div className="mt-5">
      <div className="grid gap-[3px]" style={{ gridTemplateColumns:`repeat(${cols},1fr)` }}>
        {cells.map((v,i)=><div key={i} className="rounded-sm" style={{ width:10,height:10,background:colors[v] }}/>)}
      </div>
      <p style={{ color:C.textMuted,fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",marginTop:7 }}>
        Contribution activity
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

// Full milestone row
function MilestoneCard({ milestone, index }: { milestone: MilestoneData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const { Icon, side } = milestone;

  const cardVariants = {
    hidden:  { opacity:0, x: side==="left" ? -55 : 55, y:18, scale:0.96 },
    visible: { opacity:1, x:0, y:0, scale:1,
      transition:{ duration:0.78, delay:0.05, ease:[0.22,1,0.36,1] as const } },
  };

  const shadowBase = `
    0 4px 32px rgba(120,100,180,0.1),
    0 1px 0 rgba(255,255,255,0.98) inset,
    0 -1px 0 rgba(0,0,0,0.05) inset,
    3px 0 0 rgba(255,255,255,0.55) inset,
    -1px 0 0 rgba(0,0,0,0.04) inset
  `;
  const shadowHover = `
    0 10px 60px ${milestone.glowColor},
    0 3px 24px ${milestone.glowColorSoft},
    0 1px 0 rgba(255,255,255,0.98) inset,
    0 -1px 0 rgba(0,0,0,0.05) inset,
    3px 0 0 rgba(255,255,255,0.55) inset,
    -1px 0 0 rgba(0,0,0,0.04) inset
  `;

  // The card column
  const cardCol = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale:1.025, y:-7 }}
      transition={{ duration:0.32, ease:"easeOut" }}
      onHoverStart={()=>setHovered(true)}
      onHoverEnd={()=>setHovered(false)}
      className={`w-[46%] ${side==="left"?"pr-8 lg:pr-12":"pl-8 lg:pl-12"}`}
      style={{ cursor:"default" }}
    >
      <div className="relative rounded-2xl overflow-hidden"
        style={{
          padding:"1.5rem 1.6rem",
          background: hovered
            ? "linear-gradient(135deg,rgba(255,255,255,0.78) 0%,rgba(255,255,255,0.60) 100%)"
            : C.cardBg,
          backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)",
          border:`1px solid ${hovered?"rgba(255,255,255,0.94)":C.cardBorder}`,
          boxShadow: hovered ? shadowHover : shadowBase,
          transition:"box-shadow 0.35s ease, background 0.35s ease, border-color 0.35s ease",
        }}
      >
        {/* Mirror top stripe */}
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl pointer-events-none"
          style={{ background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.98) 40%,rgba(255,255,255,0.98) 60%,transparent 100%)" }} />

        {/* Hover bloom */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ opacity:hovered?1:0, transition:"opacity 0.35s ease",
            background:`radial-gradient(ellipse at 50% 110%,${milestone.glowColorSoft} 0%,transparent 65%)` }} />

        {/* Header */}
        <div className="flex items-start justify-between mb-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background:C.accentLight, border:`1px solid ${C.accentBorder}` }}>
              <Icon size={18} style={{ color:C.accent }} />
            </div>
            <div>
              <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",fontWeight:700,
                letterSpacing:"0.1em",textTransform:"uppercase" as const,color:C.accent,marginBottom:3 }}>
                {milestone.tag}
              </div>
              <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.8rem",color:C.textMuted,fontWeight:500 }}>
                {milestone.period}
              </div>
            </div>
          </div>
          <span className="rounded-full px-2.5 py-0.5 tabular-nums"
            style={{ background:"rgba(22,22,58,0.06)",border:"1px solid rgba(22,22,58,0.09)",
              color:C.textMuted,fontFamily:"'DM Sans',sans-serif",fontSize:"0.72rem" }}>
            0{index+1}
          </span>
        </div>

        {/* Title */}
        <h3 className="relative z-10 leading-snug mb-1"
          style={{ fontFamily:"'Outfit',sans-serif",fontSize:"1.42rem",fontWeight:700,
            color:C.textPrimary,letterSpacing:"-0.015em" }}>
          {milestone.title}
        </h3>

        {/* Subtitle */}
        <p className="relative z-10 mb-4"
          style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.92rem",color:C.textMuted,fontWeight:500 }}>
          {milestone.subtitle}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 relative z-10">
          {milestone.highlights.map((h,i)=>(
            <li key={i} className="flex items-center gap-3">
              <span className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background:C.accent,boxShadow:`0 0 6px rgba(194,84,114,0.5)` }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.95rem",
                color:C.textSecondary,lineHeight:1.55,fontWeight:450 }}>
                {h}
              </span>
            </li>
          ))}
        </ul>

        {/* Accent visuals */}
        {milestone.accentType==="pills" && milestone.accent.length>0 && (
          <div className="flex flex-wrap gap-2 mt-5 relative z-10">
            {milestone.accent.map(tag=>(
              <span key={tag} className="px-2.5 py-1 rounded-full"
                style={{ background:"rgba(22,22,58,0.07)",border:"1px solid rgba(22,22,58,0.1)",
                  color:C.textSecondary,fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",fontWeight:500 }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {milestone.accentType==="stats" && (
          <div className="flex gap-5 mt-5 relative z-10">
            {milestone.accent.map(stat=>(
              <div key={stat} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background:C.accent }} />
                <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.82rem",color:C.textSecondary,fontWeight:500 }}>
                  {stat}
                </span>
              </div>
            ))}
          </div>
        )}
        {milestone.accentType==="github" && <ContribGrid />}
        {milestone.accentType==="neural"  && <NeuralNet />}

        {/* Bottom hover bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl pointer-events-none"
          style={{ background:`linear-gradient(90deg,transparent,${milestone.glowColor},transparent)`,
            opacity:hovered?1:0, transition:"opacity 0.35s ease" }} />
      </div>
    </motion.div>
  );

  // The skill-balls column (fills opposite empty side, same height as card)
  const ballsCol = (
    <div className="w-[46%] relative self-stretch"
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

      {/* Timeline connector dot */}
      <div className="w-[8%] flex justify-center relative z-20 flex-shrink-0">
        <motion.div
          initial={{ scale:0, opacity:0 }}
          animate={isInView?{scale:1,opacity:1}:{}}
          transition={{ duration:0.45, delay:0.25, ease:"backOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full relative z-10"
            style={{ background:`radial-gradient(circle,#e8a0b8 0%,${C.accent} 65%)`,
              boxShadow:`0 0 12px rgba(194,84,114,0.65),0 0 28px rgba(194,84,114,0.3)` }} />
          <motion.div className="absolute rounded-full"
            style={{ width:30,height:30,background:"rgba(194,84,114,0.14)" }}
            animate={{ scale:[1,1.7,1],opacity:[0.55,0,0.55] }}
            transition={{ duration:2.4,repeat:Infinity,ease:"easeInOut" }} />
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
      style={{ background:"linear-gradient(135deg,#d4e8f8 0%,#ddd0f0 28%,#f0c8d8 58%,#fce4d0 85%,#f8dce8 100%)",minHeight:"100vh" }}>

      {/* Ambient mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { w:"48%",h:"40%",top:"3%", left:"2%",   bg:"radial-gradient(circle,rgba(160,200,245,0.48) 0%,transparent 68%)" },
          { w:"42%",h:"42%",top:"8%", right:"0%",  bg:"radial-gradient(circle,rgba(185,165,228,0.42) 0%,transparent 68%)" },
          { w:"52%",h:"42%",bottom:"12%",left:"24%",bg:"radial-gradient(circle,rgba(240,180,195,0.36) 0%,transparent 68%)" },
          { w:"38%",h:"32%",bottom:"4%",right:"4%", bg:"radial-gradient(circle,rgba(245,205,165,0.38) 0%,transparent 68%)" },
        ].map((b,i)=>(
          <div key={i} className="absolute" style={{
            width:b.w,height:b.h,
            top:b.top,left:(b as any).left,right:(b as any).right,bottom:(b as any).bottom,
            background:b.bg,filter:"blur(50px)",
          }}/>
        ))}
      </div>

      {/* Floating 3-D spheres */}
      {SPHERES.map(s=>(
        <motion.div key={s.id} className="absolute rounded-full pointer-events-none"
          style={{ left:s.left,top:s.top,width:s.size,height:s.size,background:s.color,filter:"blur(0.8px)",opacity:0.75 }}
          animate={{ x:[0,s.mx*0.6,-s.mx*0.4,s.mx,0], y:[0,-s.my*0.5,-s.my*0.9,-s.my*0.3,0], scale:[1,1.04,0.97,1.02,1] }}
          transition={{ duration:s.dur,delay:s.delay,repeat:Infinity,ease:"easeInOut",times:[0,0.3,0.55,0.8,1] }}
        />
      ))}

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
