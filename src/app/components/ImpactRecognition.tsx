import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Code2, Users, Zap, GitPullRequest, Trophy,
  ExternalLink, Shield, Globe, Cpu, Sparkles, Briefcase, Award, BookOpen, Database
} from "lucide-react";
import bgImage         from "../../imports/WhatsApp_Image_2026-06-06_at_22.07.20.jpeg";
import certAWS         from "../../imports/Screenshot_2026-06-13_at_6.24.49_PM.png";
import certGfG         from "../../imports/Screenshot_2026-06-13_at_6.28.47_PM.png";
import certSolution    from "../../imports/cert_solution_challenge.png";
import certInamigos    from "../../imports/cert_inamigos.png";
import badgeContrib    from "../../imports/image.png";
import badgeAmbassad   from "../../imports/image-1.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import launchByteLogo from "../../imports/launchbyte_logo.jpg";

// ─── Animated counter ──────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref   = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const id = setInterval(() => {
      n += Math.max(1, Math.ceil(to / 60));
      if (n >= to) { setCount(to); clearInterval(id); } else setCount(n);
    }, 18);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Background scene ─────────────────────────────────────────────
function BackgroundScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background:"rgba(255,255,255,0.08)" }} />

      {/* Decorative Homepage-Style Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          style={{ position: 'absolute', top: '8%', left: '6%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          <Trophy size={140} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: '38%', right: '8%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Award size={150} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', bottom: '25%', left: '8%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Globe size={130} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', bottom: '8%', right: '12%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={120} strokeWidth={0.9} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Glass ribbon wrapper ──────────────────────────────────────────
function Ribbon({ children, delay=0 }: { children:React.ReactNode; delay?:number }) {
  return (
    <motion.div
      initial={{ opacity:0, y:50 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.8, delay, ease:[0.22,1,0.36,1] }}
      className="relative rounded-[2.5rem] overflow-visible"
      style={{
        background:"rgba(255,255,255,0.45)",
        backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
        border:"1.5px solid rgba(255,255,255,0.75)",
        boxShadow:"0 8px 48px rgba(139,90,43,0.12), 0 2px 16px rgba(255,255,255,0.40) inset",
      }}
    >
      <div className="absolute top-0 left-8 right-8 h-px rounded-full"
        style={{ background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }} />
      <div className="absolute -left-3 top-8 w-6 h-12 rounded-l-2xl"
        style={{ background:"rgba(255,255,255,0.50)", border:"1.5px solid rgba(255,255,255,0.65)",
          borderRight:"none", boxShadow:"-4px 4px 12px rgba(139,90,43,0.15)" }} />
      <div className="absolute -right-3 top-8 w-6 h-12 rounded-r-2xl"
        style={{ background:"rgba(255,255,255,0.50)", border:"1.5px solid rgba(255,255,255,0.65)",
          borderLeft:"none", boxShadow:"4px 4px 12px rgba(139,90,43,0.15)" }} />
      {children}
    </motion.div>
  );
}

// ─── Stat cards ───────────────────────────────────────────────────
const statCards = [
  { icon:Code2,          label:"Projects Built",     value:5, suffix:"+",  color:"#8b5a2b", light:"#f4e3d3", override:null },
  { icon:Trophy,         label:"Hackathon Projects", value:5, suffix:"+",  color:"#704720", light:"#faedcd", override:null },
  { icon:Zap,            label:"Hackathons",          value:4, suffix:"-5", color:"#b87d4b", light:"#fceade", override:null },
  { icon:Users,          label:"Ambassadors",         value:3, suffix:"+",  color:"#8b5a2b", light:"#eedecc", override:null },
  { icon:GitPullRequest, label:"Open Source",         value:0, suffix:"",   color:"#704720", light:"#f9ebe0", override:"Contributor" },
  { icon:Cpu,            label:"Specialization",      value:0, suffix:"",   color:"#8b5a2b", light:"#f7e6d5", override:"AI & Web Dev" },
];
function StatCard({ card, index }: { card:typeof statCards[0]; index:number }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.55, delay:index*0.08 }}
      whileHover={{ y:-7, scale:1.05, transition:{ duration:0.2 } }}
      className="relative flex flex-col items-center gap-2.5 p-5 rounded-3xl cursor-default"
      style={{
        background:"rgba(255,255,255,0.65)",
        backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
        border:"1.5px solid rgba(255,255,255,0.85)",
        boxShadow:`0 6px 30px ${card.color}15, 0 1px 0 rgba(255,255,255,0.9) inset`,
      }}
    >
      <div className="p-3 rounded-2xl" style={{ background:card.light, boxShadow:`0 2px 10px ${card.color}22` }}>
        <Icon style={{ width:18, height:18, color:card.color }} />
      </div>
      <div className="text-2xl font-black tabular-nums" style={{ color:card.color }}>
        {card.override ?? <Counter to={card.value} suffix={card.suffix} />}
      </div>
      <p className="text-xs font-semibold text-[#5a4838] text-center leading-tight">{card.label}</p>
    </motion.div>
  );
}

// ─── Label ────────────────────────────────────────────────────────
function Label({ text, color }: { text:string; color:string }) {
  return (
    <motion.div
      initial={{ opacity:0, x:-16 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.45 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
      style={{ background:`${color}18`, color, border:`1.5px solid ${color}40` }}
    >
      <Sparkles style={{ width:11, height:11 }} />
      {text}
    </motion.div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────
function RibbonDivider() {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px" style={{ background:"linear-gradient(90deg, transparent, rgba(139,90,43,0.3))" }} />
      <div className="flex gap-1.5">
        {["#8b5a2b","#d4a373","#b87d4b"].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background:c }} />)}
      </div>
      <div className="flex-1 h-px" style={{ background:"linear-gradient(90deg, rgba(139,90,43,0.3), transparent)" }} />
    </div>
  );
}

// ─── Journey rope card ────────────────────────────────────────────
interface RopeCard {
  icon: React.ElementType;
  title: string;
  badge: string;
  color: string;
  light: string;
  description: string;
  events?: { name:string; duration:string }[];
  badgeImg?: string;
  extraImg?: string;
  communityLinks?: { whatsapp: string; linkedin: string };
  side: "left"|"right";
  delay: number;
}

const ropeCards: RopeCard[] = [
  {
    icon: Sparkles,
    title: "Founder of LaunchByte",
    badge: "Student Tech-Lead Community",
    color: "#8b5a2b",
    light: "#f4e3d3",
    description: "Founded a thriving student tech community organizing hackathons, tech events, internships, and developer growth opportunities.",
    badgeImg: launchByteLogo,
    communityLinks: {
      whatsapp: "https://chat.whatsapp.com/DfB8awNjkjj7UkB5h2eW1e",
      linkedin: "https://www.linkedin.com/company/launchbytehq/?viewAsMember=true",
    },
    side: "left",
    delay: 0.05,
  },
  {
    icon: Globe,
    title: "Google Gemini Campus Ambassador",
    badge: "Google AI Ambassador",
    color: "#704720",
    light: "#faedcd",
    description: "Promoting Google Gemini AI technologies, driving AI awareness, and organizing workshops for aspiring developers.",
    side: "right",
    delay: 0.1,
  },
  {
    icon: Award,
    title: "Campus Ambassador @ Techfest, IIT Bombay",
    badge: "IIT Bombay Ambassador",
    color: "#b87d4b",
    light: "#fceade",
    description: "Representing Asia's largest science & technology festival, leading campus outreach and driving tech innovation events.",
    side: "left",
    delay: 0.15,
  },
  {
    icon: GitPullRequest,
    title: "GSSoC Contributor",
    badge: "Open Source Contributor",
    color: "#8b5a2b",
    light: "#deeeff",
    description: "Contributed to open source projects, collaborated with developers, resolved issues, and submitted pull requests during GirlScript Summer of Code.",
    badgeImg: undefined, // set below
    side: "right",
    delay: 0.2,
  },
  {
    icon: Trophy,
    title: "Hackathon Participant",
    badge: "Hackathon Builder",
    color: "#704720",
    light: "#ffdede",
    description: "Participated in multiple hackathons and innovation challenges, shipping real products under pressure.",
    events: [
      { name:"HackBMU 8.0",          duration:"24-Hour Hackathon" },
      { name:"Tech4Hack HackFest",    duration:"6-Hour Hackathon" },
      { name:"Additional Hackathons", duration:"Innovation Challenges" },
    ],
    side: "left",
    delay: 0.25,
  },
];

// attach imported images after declaration (TS limitation with top-level refs)
ropeCards[3].badgeImg = badgeContrib as unknown as string;

function RopeCard({ card, index }: { card:RopeCard; index:number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = card.icon;
  const isLeft = card.side === "left";

  return (
    <div className={`relative flex items-start gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
      {/* rope connector */}
      <div className="flex flex-col items-center" style={{ width:48, flexShrink:0 }}>
        {/* vertical rope segment above knot */}
        <div className="w-0.5 flex-1 min-h-8"
          style={{ background:"linear-gradient(180deg, rgba(140,160,200,0.4), rgba(140,160,200,0.8))" }} />
        {/* knot / pin */}
        <motion.div
          animate={{ scale: hovered ? 1.3 : 1 }}
          transition={{ duration:0.25 }}
          className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background:`radial-gradient(circle at 35% 35%, ${card.color}cc, ${card.color})`,
            boxShadow:`0 2px 10px ${card.color}66, 0 0 0 3px rgba(255,255,255,0.8)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </motion.div>
        {/* string from knot to card */}
        <motion.div
          animate={{ scaleY: hovered ? 0.92 : 1 }}
          transition={{ duration:0.25 }}
          className="w-0.5 h-8 origin-top"
          style={{ background:"linear-gradient(180deg, rgba(140,160,200,0.8), rgba(140,160,200,0.3))" }}
        />
      </div>

      {/* card */}
      <motion.div
        initial={{ opacity:0, x: isLeft ? -60 : 60, y:20 }}
        whileInView={{ opacity:1, x:0, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.75, delay:card.delay, ease:[0.22,1,0.36,1] }}
        whileHover={{ y:-6, transition:{ duration:0.22 } }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative flex-1 rounded-3xl overflow-visible cursor-default my-2"
        style={{
          background:"rgba(255,255,255,0.55)",
          backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
          border:"1.5px solid rgba(255,255,255,0.78)",
          boxShadow: hovered
            ? `0 20px 50px ${card.color}35, 0 2px 0 rgba(255,255,255,0.9) inset`
            : `0 6px 28px ${card.color}1a, 0 1px 0 rgba(255,255,255,0.85) inset`,
          transition:"box-shadow 0.3s",
        }}
      >
        {/* top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background:`linear-gradient(90deg, transparent, ${card.color}99, transparent)` }} />

        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -5 : 0 }}
              transition={{ duration:0.25 }}
              className="flex-shrink-0 p-3 rounded-2xl"
              style={{ background:card.light }}
            >
              <Icon style={{ width:22, height:22, color:card.color }} />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-black text-slate-800 text-lg leading-tight">{card.title}</h3>
              <span className="inline-block mt-1.5 text-xs px-3 py-0.5 rounded-full font-bold"
                style={{ background:card.light, color:card.color }}>
                {card.badge}
              </span>
            </div>
            {/* badge image — pops out on hover */}
            {card.badgeImg && (
              <motion.div
                className="flex-shrink-0 relative z-20"
                animate={{
                  scale:    hovered ? 1.35 : 1,
                  y:        hovered ? -18  : 0,
                  rotate:   hovered ? 8    : 0,
                  filter:   hovered ? "drop-shadow(0 12px 24px rgba(80,100,200,0.45))" : "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
                }}
                transition={{ duration:0.32, ease:[0.34,1.56,0.64,1] }}
              >
                <img src={card.badgeImg} alt={`${card.title} badge`} className="w-16 h-16 object-contain" />
              </motion.div>
            )}
          </div>

          <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">{card.description}</p>

          {/* LaunchByte Community Links */}
          {card.communityLinks && (
            <div className="flex flex-wrap items-center gap-3 mb-4 pt-1">
              <a
                href={card.communityLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="Join our WhatsApp Community"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25d366] text-white text-xs font-bold shadow-sm hover:shadow-md hover:bg-[#20bd5a] transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Join WhatsApp Group</span>
                <ExternalLink size={13} />
              </a>

              <a
                href={card.communityLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on LinkedIn"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a66c2] text-white text-xs font-bold shadow-sm hover:shadow-md hover:bg-[#0855a3] transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Follow on LinkedIn</span>
                <ExternalLink size={13} />
              </a>
            </div>
          )}

          {/* hackathon events */}
          {card.events && (
            <div className="space-y-2 mb-4">
              {card.events.map(ev => (
                <div key={ev.name} className="flex items-center justify-between px-3 py-2 rounded-2xl"
                  style={{ background:"rgba(255,255,255,0.65)", border:"1px solid rgba(255,255,255,0.75)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background:card.color }} />
                    <span className="text-sm font-semibold text-slate-700">{ev.name}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">{ev.duration}</span>
                </div>
              ))}
            </div>
          )}

          {/* hackathon photo — pops out on hover */}
          {card.extraImg && (
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              animate={{
                scale:  hovered ? 1.04 : 1,
                y:      hovered ? -10  : 0,
                boxShadow: hovered
                  ? "0 20px 40px rgba(192,80,80,0.30)"
                  : "0 4px 12px rgba(0,0,0,0.10)",
              }}
              transition={{ duration:0.3, ease:[0.34,1.2,0.64,1] }}
            >
              <img src={card.extraImg} alt={`${card.title} photo`} className="w-full h-48 object-cover rounded-2xl" />
              {/* glass overlay */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background:"linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)" }}
                animate={{ opacity: hovered ? 0.7 : 0.3 }}
                transition={{ duration:0.3 }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Journey rope section ─────────────────────────────────────────
function JourneyRope() {
  return (
    <div className="relative">
      {/* Central vertical rope */}
      <div
        className="absolute left-[23px] top-0 bottom-0 w-0.5"
        style={{
          background:"linear-gradient(180deg, transparent 0%, rgba(120,150,200,0.5) 8%, rgba(120,150,200,0.7) 50%, rgba(120,150,200,0.5) 92%, transparent 100%)",
        }}
      />
      {/* rope texture dashes */}
      {[...Array(12)].map((_,i) => (
        <div
          key={i}
          className="absolute left-[21px] w-1"
          style={{
            top:`${8 + i * 8}%`,
            height:4,
            background:"rgba(120,150,200,0.3)",
            borderRadius:2,
            transform:"rotate(45deg)",
          }}
        />
      ))}

      <div className="space-y-2 pl-0">
        {ropeCards.map((card, i) => <RopeCard key={card.title} card={card} index={i} />)}
      </div>
    </div>
  );
}

// ─── Certificate card ─────────────────────────────────────────────
const certs = [
  {
    title: "Full Stack Web Development",
    org: "GeeksforGeeks SkillUp",
    status: "Completed" as const,
    icon: Code2,
    color: "#8b5a2b",
    light: "rgba(244,227,211,0.6)",
    img: certGfG,
    delay: 0,
  },
  {
    title: "AWS Student Community Day Delhi NCR",
    org: "AWS Community + Sharda University",
    status: "Participation" as const,
    icon: Shield,
    color: "#704720",
    light: "rgba(250,237,205,0.6)",
    img: certAWS,
    delay: 0.1,
  },
  {
    title: "Solution Challenge 2026 – Build with AI",
    org: "Google Developer Groups / Hack2Skill",
    status: "Certificate of Participation" as const,
    icon: Award,
    color: "#8b5a2b",
    light: "rgba(244,227,211,0.6)",
    img: certSolution,
    delay: 0.2,
    date: "22/07/2026",
  },
  {
    title: "AI & Web Development Internship",
    org: "InAmigos Foundation",
    status: "Certificate of Internship" as const,
    icon: Briefcase,
    color: "#704720",
    light: "rgba(250,237,205,0.6)",
    img: certInamigos,
    delay: 0.3,
    date: "25/06/2026 – 15/07/2026",
  },
];

function CertCard({ cert }: { cert: typeof certs[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, scale:0.92, y:30 }}
      whileInView={{ opacity:1, scale:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.7, delay:cert.delay }}
      whileHover={{ y:-10, scale:1.025, transition:{ duration:0.25 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        background:"rgba(255,255,255,0.60)",
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        border:"1.5px solid rgba(139,90,43,0.18)",
        boxShadow: hovered
          ? `0 24px 56px ${cert.color}35, 0 1px 0 rgba(255,255,255,0.9) inset`
          : `0 8px 32px ${cert.color}18, 0 1px 0 rgba(255,255,255,0.85) inset`,
        transition:"box-shadow 0.3s",
      }}
    >
      <div className="p-6">
        {/* certificate image with pop-out on hover */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-5"
          animate={{
            scale:      hovered ? 1.05 : 1,
            y:          hovered ? -8   : 0,
            boxShadow:  hovered
              ? `0 20px 40px ${cert.color}40`
              : "0 4px 16px rgba(0,0,0,0.10)",
          }}
          transition={{ duration:0.32, ease:[0.34,1.2,0.64,1] }}
          style={{ aspectRatio:"16/10" }}
        >
          <ImageWithFallback
            src={cert.img}
            alt={cert.title}
            className="w-full h-full object-cover"
          />
          {/* glass reflection overlay */}
          <motion.div
            className="absolute inset-0"
            style={{ background:"linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 55%)" }}
            animate={{ opacity: hovered ? 0.7 : 0.25 }}
            transition={{ duration:0.3 }}
          />
          {/* hover shimmer sweep */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0"
                initial={{ x:"-100%", skewX:"-15deg" }}
                animate={{ x:"200%" }}
                exit={{ opacity:0 }}
                transition={{ duration:0.6, ease:"easeInOut" }}
                style={{ background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)", width:"40%" }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <h3 className="font-black text-base leading-tight mb-1" style={{ color: "#2d1f10" }}>{cert.title}</h3>
        <p className="text-sm font-semibold mb-1" style={{ color: "#6e5a47" }}>{cert.org}</p>
        {'date' in cert && (cert as any).date && (
          <p className="text-xs font-medium mb-3" style={{ color: "#9a7a60" }}>{(cert as any).date}</p>
        )}
        {!('date' in cert && (cert as any).date) && <div className="mb-3" />}

        <div className="flex items-center justify-between">
          <span className="text-xs px-3 py-1.5 rounded-full font-bold"
            style={{ background:cert.light, color:cert.color }}>
            {cert.status}
          </span>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
            transition={{ duration:0.2 }}
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color:cert.color }}
          >
            <ExternalLink style={{ width:12, height:12 }} />
            View Certificate
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────
export function ImpactRecognition() {
  return (
    <section className="relative min-h-screen w-full py-20 px-4 overflow-hidden">
      <BackgroundScene />

      <div className="relative max-w-5xl mx-auto">

        {/* ── Header ribbon (no "portfolio" tag) ── */}
        <Ribbon delay={0}>
          <div className="px-8 py-10 text-center">
            <motion.h2
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3"
              style={{
                background:"linear-gradient(135deg, #2d1f10 0%, #8b5a2b 50%, #704720 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}
            >
              IMPACT &amp; RECOGNITION
            </motion.h2>
            <motion.p
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true }}
              transition={{ duration:0.6, delay:0.2 }}
              className="font-bold tracking-widest uppercase text-sm"
              style={{ color: "#6e5a47" }}
            >
              Building.&nbsp; Contributing.&nbsp; Leading.&nbsp; Growing.
            </motion.p>
            <motion.div
              initial={{ scaleX:0 }}
              whileInView={{ scaleX:1 }}
              viewport={{ once:true }}
              transition={{ duration:0.9, delay:0.35 }}
              className="mx-auto mt-5 w-40 h-0.5 rounded-full"
              style={{ background:"linear-gradient(90deg, #8b5a2b, #d4a373, #8b5a2b)" }}
            />
          </div>
        </Ribbon>

        {/* ── Stats ribbon ── */}
        <div className="mt-6">
          <Ribbon delay={0.1}>
            <div className="px-8 py-8">
              <Label text="Top Impact Stats" color="#8b5a2b" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {statCards.map((card,i) => <StatCard key={card.label} card={card} index={i} />)}
              </div>
            </div>
          </Ribbon>
        </div>

        <RibbonDivider />

        {/* ── Journey rope section ── */}
        <Ribbon delay={0.1}>
          <div className="px-8 py-8">
            <Label text="Achievement Journey" color="#8b5a2b" />
            <motion.h2
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5 }}
              className="text-2xl font-black mb-8"
              style={{ color: "#2d1f10" }}
            >
              Milestones &amp; Recognition
            </motion.h2>
            <JourneyRope />
          </div>
        </Ribbon>

        <RibbonDivider />

        {/* ── Certification gallery ── */}
        <Ribbon delay={0.1}>
          <div className="px-8 py-8">
            <Label text="Certification Gallery" color="#8b5a2b" />
            <motion.h2
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5 }}
              className="text-2xl font-black mb-6"
              style={{ color: "#2d1f10" }}
            >
              Verified Credentials
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {certs.map(c => <CertCard key={c.title} cert={c} />)}
            </div>

            <div className="flex justify-center mt-8">
              <motion.a
                href="https://drive.google.com/drive/folders/1RSKDgoS0Wtrb0hMNJIDV2p_4htXTcgVO?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View more certificates of Avinash Kumar on Google Drive"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{
                  y: -5,
                  scale: 1.04,
                  boxShadow: "0 20px 48px rgba(74, 144, 200, 0.3), 0 1px 0 rgba(255, 255, 255, 0.9) inset",
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-slate-800 cursor-pointer"
                style={{
                  background: "rgba(255, 255, 255, 0.65)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1.5px solid rgba(139,90,43,0.25)",
                  boxShadow: "0 8px 32px rgba(139,90,43,0.12), 0 1px 0 rgba(255, 255, 255, 0.9) inset",
                  transition: "box-shadow 0.3s",
                  color: "#2d1f10",
                }}
              >
                <span>See More Certificates</span>
                <ExternalLink style={{ width: 16, height: 16, color: "#8b5a2b" }} />
              </motion.a>
            </div>
          </div>
        </Ribbon>

      </div>
    </section>
  );
}
