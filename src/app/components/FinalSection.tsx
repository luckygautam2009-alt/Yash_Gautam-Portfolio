import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Linkedin, Github, Mail, FileText, ExternalLink, ArrowUpRight, Home, User, Briefcase, FolderGit2, Code2, Award, Send, Layers, Instagram } from "lucide-react";
import bgImage from "../../imports/WhatsApp_Image_2026-06-06_at_22.07.20-1.jpeg";

// ── Soft particle canvas ──────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#8b5a2b", "#d4a373", "#b87d4b", "#faedcd", "#ca9e74", "#eedecc"];
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.35 + 0.08,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#d4a373";
            ctx.globalAlpha = (1 - d / 90) * 0.14;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.55 }} />;
}

// ── Energy Orb ────────────────────────────────────────────────────────────────
function EnergyOrb({ inView }: { inView: boolean }) {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 300, height: 300 }}>
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: 170 + i * 46,
            height: 170 + i * 46,
            borderColor: i === 1 ? "rgba(139,90,43,0.4)" : i === 2 ? "rgba(212,163,115,0.3)" : "rgba(184,125,75,0.2)",
          }}
          animate={inView ? { rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.03, 1] } : {}}
          transition={{
            rotate: { duration: 10 + i * 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 185, height: 185,
          background: "radial-gradient(circle, rgba(212,163,115,0.32) 0%, rgba(139,90,43,0.18) 50%, transparent 80%)",
          filter: "blur(20px)",
        }}
        animate={inView ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: 175, height: 175,
          background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, rgba(244,227,211,0.7) 35%, rgba(212,163,115,0.6) 65%, rgba(139,90,43,0.5) 100%)",
          boxShadow: "0 8px 40px rgba(139,90,43,0.3), 0 2px 8px rgba(212,163,115,0.3), inset 0 2px 0 rgba(255,255,255,0.9), inset 0 -4px 12px rgba(139,90,43,0.2)",
          border: "1px solid rgba(255,255,255,0.85)",
        }}
        animate={inView ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.07 }}
      >
        <div className="absolute rounded-full"
          style={{ width: 55, height: 32, background: "rgba(255,255,255,0.75)", filter: "blur(7px)", top: "18%", left: "20%", transform: "rotate(-20deg)" }} />
        <div className="text-center z-10 px-4 select-none">
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.52rem", letterSpacing: "0.25em", color: "rgba(90,56,24,0.8)", marginBottom: "0.2rem" }}>STATUS</div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.65rem", letterSpacing: "0.18em", color: "#2d1f10", fontWeight: 700, lineHeight: 1.35, textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}>READY<br />TO BUILD</div>
          <motion.div
            style={{ width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle, #8b5a2b, #d4a373)", margin: "0.4rem auto 0", boxShadow: "0 0 8px rgba(139,90,43,0.8)" }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
      {[
        { size: 15, orbit: 105, color: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #8b5a2b)", dur: 6 },
        { size: 10, orbit: 118, color: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #d4a373)", dur: 9 },
        { size: 8,  orbit: 97,  color: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #b87d4b)", dur: 7 },
      ].map((o, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: o.size, height: o.size, background: o.color, boxShadow: `0 2px 8px rgba(139,90,43,0.3), inset 0 1px 2px rgba(255,255,255,0.8)`, top: "50%", left: "50%", marginTop: -o.size / 2, marginLeft: -o.size / 2, transformOrigin: `${-o.orbit + o.size / 2}px ${o.size / 2}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

// ── Social Connect Card ────────────────────────────────────────────────────────
function SocialCard({
  icon: Icon,
  label,
  sub,
  href,
  accent,
  accentDark,
  bg,
  border,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  href: string;
  accent: string;
  accentDark: string;
  bg: string;
  border: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.07, y: -8 }}
      whileTap={{ scale: 0.95 }}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        className="relative rounded-2xl p-5 flex flex-col items-center gap-2.5 overflow-hidden"
        style={{
          background: bg,
          border: `1px solid ${hovered ? accent + "66" : border}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: hovered
            ? `0 8px 32px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.8)`
            : `0 4px 20px rgba(160,140,200,0.08), inset 0 1px 0 rgba(255,255,255,0.75)`,
          transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
          cursor: "pointer",
        }}
      >
        {/* top sheen */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }} />

        {/* hover glow orb */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${accent}22, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Icon container */}
        <motion.div
          className="relative z-10 rounded-xl p-3"
          style={{
            background: "rgba(255,255,255,0.58)",
            border: `1px solid ${border}`,
            boxShadow: hovered ? `0 4px 16px ${accent}44` : `0 2px 8px ${accent}22`,
            transition: "box-shadow 0.35s ease",
          }}
          animate={hovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Icon size={20} style={{ color: accentDark }} />
        </motion.div>

        <div className="relative z-10 text-center">
          <div style={{ color: "rgba(10,5,35,0.92)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.04em" }}>{label}</div>
          <div style={{ color: "rgba(30,20,60,0.6)", fontSize: "0.65rem", letterSpacing: "0.08em", marginTop: 2 }}>{sub}</div>
        </div>

        <ExternalLink size={10} style={{ color: `${accentDark}88` }} className="relative z-10" />

        {/* bottom accent line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />
      </div>
    </motion.a>
  );
}

const QUICK_LINKS = [
  { label: "Home",           id: "hero-section",        icon: Home },
  { label: "About",          id: "about-section",        icon: User },
  { label: "Experience",     id: "evolution-section",    icon: Briefcase },
  { label: "Projects",       id: "projects-section",     icon: FolderGit2 },
  { label: "Skills",         id: "skills-section",       icon: Code2 },
  { label: "Certifications", id: "recognition-section",  icon: Award },
  { label: "Contact",        id: "end-section",           icon: Send },
];

const SOCIALS = [
  {
    icon: Linkedin, label: "LinkedIn", sub: "Let's connect",
    href: "https://www.linkedin.com/in/yash-gautam-1b9150383/",
    accent: "#8b5a2b", accentDark: "#704720",
    bg: "linear-gradient(135deg, rgba(244,227,211,0.55) 0%, rgba(244,227,211,0.18) 100%)",
    border: "rgba(139,90,43,0.35)",
  },
  {
    icon: Github, label: "GitHub", sub: "View my work",
    href: "https://github.com/luckygautam2009-alt",
    accent: "#704720", accentDark: "#5a3818",
    bg: "linear-gradient(135deg, rgba(250,237,205,0.55) 0%, rgba(250,237,205,0.18) 100%)",
    border: "rgba(112,71,32,0.35)",
  },
  {
    icon: Mail, label: "Email", sub: "Drop me a line",
    href: "mailto:luckygautam2009@gmail.com",
    accent: "#b87d4b", accentDark: "#8b5a2b",
    bg: "linear-gradient(135deg, rgba(245,208,168,0.55) 0%, rgba(245,208,168,0.18) 100%)",
    border: "rgba(184,125,75,0.35)",
  },
  {
    icon: Instagram, label: "Instagram", sub: "Follow my journey",
    href: "https://www.instagram.com/yash_gautam_52/?hl=en",
    accent: "#c2185b", accentDark: "#ad1457",
    bg: "linear-gradient(135deg, rgba(252,228,236,0.55) 0%, rgba(252,228,236,0.18) 100%)",
    border: "rgba(194,24,91,0.30)",
  },
];

// helper: scroll to section
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if ((window as any).lenis) {
    (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.4 });
  } else {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

// ── Main section ──────────────────────────────────────────────────────────────
export function FinalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Ambient overlays ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(240,230,248,0.16) 50%, rgba(255,245,235,0.22) 100%)" }} />

      {/* ── Extra ambient depth blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", width: 500, height: 500, top: "10%", left: "5%", background: "radial-gradient(circle, rgba(142,202,230,0.16) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", width: 600, height: 600, bottom: "5%", right: "5%", background: "radial-gradient(circle, rgba(181,168,216,0.16) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, top: "40%", left: "40%", background: "radial-gradient(circle, rgba(244,160,168,0.10) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      {/* ── Particle canvas ── */}
      <ParticleCanvas />

      {/* ── Decorative floating icons ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div style={{ position: "absolute", top: "10%", left: "6%", color: "#8b5a2b", opacity: 0.03 }}
          animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }}>
          <Mail size={140} strokeWidth={0.8} />
        </motion.div>
        <motion.div style={{ position: "absolute", top: "35%", right: "8%", color: "#8b5a2b", opacity: 0.03 }}
          animate={{ y: [0, -15, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}>
          <Linkedin size={140} strokeWidth={0.8} />
        </motion.div>
        <motion.div style={{ position: "absolute", bottom: "25%", left: "8%", color: "#8b5a2b", opacity: 0.03 }}
          animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}>
          <Github size={130} strokeWidth={0.8} />
        </motion.div>
        <motion.div style={{ position: "absolute", bottom: "10%", right: "12%", color: "#8b5a2b", opacity: 0.03 }}
          animate={{ y: [0, 12, 0], x: [0, 8, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}>
          <FileText size={120} strokeWidth={0.9} />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center" style={{ paddingTop: "5.5rem" }}>

        {/* ── Section Badge ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: -12 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring" }}
          className="mb-6 flex items-center gap-3"
          style={{
            background: "rgba(255,255,255,0.68)",
            border: "1.5px solid rgba(139,90,43,0.28)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "0 4px 24px rgba(139,90,43,0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
            borderRadius: 100,
            padding: "7px 20px",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "1rem" }}
          >
            ✉️
          </motion.span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#8b5a2b",
            textTransform: "uppercase",
          }}>
            Let's Connect
          </span>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "radial-gradient(circle, #34d399, #10b981)",
            boxShadow: "0 0 8px rgba(52,211,153,0.8)",
            display: "inline-block",
            animation: "pulse 1.8s ease-in-out infinite",
          }} />
        </motion.div>

        {/* ── Main Title ── */}
        <motion.div
          className="text-center px-6 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.15 }}
        >
          <div style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
            fontWeight: 700,
            letterSpacing: "0.38em",
            color: "#8b5a2b",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
            opacity: 0.85,
          }}>
            — Final Chapter —
          </div>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2.1rem, 5.5vw, 4.2rem)",
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #2d1f10 0%, #8b5a2b 38%, #704720 65%, #d4a373 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.1rem",
          }}>
            Let's Build Something
          </h2>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2.1rem, 5.5vw, 4.2rem)",
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#2d1f10",
          }}>
            Extraordinary.
          </h2>
        </motion.div>

        {/* ── Shimmering divider ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.32, ease: [0.23, 1, 0.32, 1] }}
          style={{
            width: 120,
            height: 2,
            borderRadius: 99,
            background: "linear-gradient(90deg, transparent, #d4a373, #8b5a2b, #d4a373, transparent)",
            marginBottom: "1.4rem",
            boxShadow: "0 0 14px rgba(212,163,115,0.5)",
          }}
        />

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.42 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "rgba(45,31,16,0.78)",
            fontSize: "clamp(0.92rem, 1.6vw, 1.08rem)",
            letterSpacing: "0.01em",
            marginBottom: "3.5rem",
            fontWeight: 500,
            maxWidth: 480,
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          Every great product starts with a conversation.{" "}
          <span style={{ color: "#8b5a2b", fontWeight: 700 }}>Let's start ours.</span>
        </motion.p>


        {/* ── Hero text + Orb ── */}
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.45 }}
          >
            <div style={{ fontSize: "clamp(2rem, 5vw, 4.6rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#2d1f10", marginBottom: "0.15rem" }}>Enough About Me.</div>
            <div style={{ fontSize: "clamp(1.85rem, 4.6vw, 4.2rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #8b5a2b 0%, #704720 50%, #b87d4b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.15rem" }}>Now Let's Talk</div>
            <div style={{ fontSize: "clamp(1.85rem, 4.6vw, 4.2rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#2d1f10", marginBottom: "0.15rem" }}>About Your Next</div>
            <div style={{ fontSize: "clamp(1.85rem, 4.6vw, 4.2rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
              <span style={{ color: "#2d1f10" }}>Big</span>
              <span style={{ background: "linear-gradient(90deg, #8b5a2b, #b87d4b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Idea.</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-8 flex items-center gap-3 flex-wrap"
            >
              {[
                { label: "AI Engineer", accent: "#8b5a2b", bg: "rgba(244,227,211,0.5)", border: "rgba(139,90,43,0.35)" },
                { label: "Full-Stack Dev", accent: "#704720", bg: "rgba(250,237,205,0.5)", border: "rgba(112,71,32,0.35)" },
                { label: "Open to Collaborate", accent: "#b87d4b", bg: "rgba(245,208,168,0.5)", border: "rgba(184,125,75,0.35)" },
              ].map((t) => (
                <span key={t.label} style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: t.accent, border: `1px solid ${t.border}`, padding: "0.28rem 0.75rem", borderRadius: "100px", background: t.bg, backdropFilter: "blur(8px)", fontWeight: 700 }}>{t.label}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Energy Orb */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.55 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.65, type: "spring" }}
          >
            <EnergyOrb inView={inView} />
          </motion.div>
        </div>

        {/* ── Contact Hub ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="w-full max-w-4xl mx-auto px-6 mb-20"
        >
          <div className="text-center mb-7">
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.62rem", letterSpacing: "0.3em", color: "#8b5a2b", fontWeight: 700, textTransform: "uppercase" }}>— Contact Hub —</span>
          </div>

          <div className="relative rounded-3xl p-8"
            style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.85)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", boxShadow: "0 8px 48px rgba(139,90,43,0.12), inset 0 2px 0 rgba(255,255,255,0.9)" }}
          >
            <div className="absolute top-0 left-8 right-8 h-px rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)" }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SOCIALS.map((s, i) => (
                <SocialCard key={s.label} {...s} delay={0.95 + i * 0.1} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            PREMIUM 3-COLUMN FOOTER
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
          className="w-full"
          style={{
            background: "linear-gradient(180deg, rgba(244,227,211,0.35) 0%, rgba(238,222,204,0.55) 60%, rgba(234,218,200,0.65) 100%)",
          }}
        >

          <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
            {/* 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

              {/* ── LEFT: Brand ── */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.25 }}
                className="flex flex-col gap-4"
              >
                <button
                  onClick={() => scrollToSection("hero-section")}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "2.4rem",
                    fontWeight: 700,
                    color: "#6b4724",
                    textAlign: "left",
                    lineHeight: 1,
                    textShadow: "0 2px 8px rgba(139,90,43,0.15)",
                  }}
                  aria-label="Go to top"
                >
                  Yash.
                </button>

                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "rgba(45,31,16,0.72)", lineHeight: 1.75, maxWidth: 260, fontWeight: 500 }}>
                  AI & Full-Stack Developer building intelligent experiences through curiosity, code, and creativity.
                </p>

                {/* Decorative element */}
                <div className="flex items-center gap-2 mt-1">
                  <div style={{ width: 32, height: 2, borderRadius: 2, background: "linear-gradient(90deg, #8b5a2b, #d4a373)" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4a373", boxShadow: "0 0 8px rgba(212,163,115,0.6)" }} />
                  <div style={{ width: 16, height: 2, borderRadius: 2, background: "linear-gradient(90deg, #d4a373, transparent)" }} />
                </div>

                {/* Resume link */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em",
                    color: "#8b5a2b", textDecoration: "none",
                    padding: "7px 16px", borderRadius: 100,
                    background: "rgba(139,90,43,0.08)",
                    border: "1px solid rgba(139,90,43,0.25)",
                    width: "fit-content",
                    transition: "all 0.25s ease",
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = "rgba(139,90,43,0.16)")}
                  onMouseOut={e => (e.currentTarget.style.background = "rgba(139,90,43,0.08)")}
                >
                  <FileText size={13} />
                  Download Resume
                  <ArrowUpRight size={12} />
                </a>
              </motion.div>

              {/* ── CENTER: Quick Links ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.35 }}
                className="flex flex-col gap-4"
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.28em", color: "#8b5a2b", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>
                  Quick Links
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {QUICK_LINKS.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <motion.button
                        key={link.label}
                        onClick={() => scrollToSection(link.id)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 1.4 + i * 0.06 }}
                        whileHover={{ x: 3 }}
                        style={{
                          background: "none", border: "none", cursor: "pointer", padding: "6px 0",
                          display: "flex", alignItems: "center", gap: 7,
                          fontSize: "0.82rem", fontWeight: 600,
                          color: "rgba(45,31,16,0.72)",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          textAlign: "left",
                          transition: "color 0.2s ease",
                        }}
                        onMouseOver={e => (e.currentTarget.style.color = "#8b5a2b")}
                        onMouseOut={e => (e.currentTarget.style.color = "rgba(45,31,16,0.72)")}
                      >
                        <Icon size={12} style={{ color: "rgba(139,90,43,0.6)", flexShrink: 0 }} />
                        {link.label}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── RIGHT: Connect ── */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.45 }}
                className="flex flex-col gap-4"
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.28em", color: "#8b5a2b", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>
                  Connect
                </div>
                <div className="flex flex-col gap-2.5">
                  {SOCIALS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 12 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 1.5 + i * 0.07 }}
                        whileHover={{ x: 4, scale: 1.02 }}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "10px 14px", borderRadius: 12,
                          background: "rgba(255,255,255,0.42)",
                          border: "1px solid rgba(255,255,255,0.72)",
                          backdropFilter: "blur(12px)",
                          textDecoration: "none",
                          transition: "all 0.28s ease",
                          cursor: "pointer",
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.65)";
                          e.currentTarget.style.boxShadow = `0 4px 16px ${s.accent}33`;
                          e.currentTarget.style.borderColor = `${s.accent}55`;
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.42)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.72)";
                        }}
                      >
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={15} style={{ color: s.accentDark }} />
                        </div>
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "rgba(20,10,40,0.88)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.label}</div>
                          <div style={{ fontSize: "0.65rem", color: "rgba(45,31,16,0.55)", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.04em" }}>{s.sub}</div>
                        </div>
                        <ArrowUpRight size={13} style={{ color: `${s.accentDark}88`, marginLeft: "auto" }} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* ── Footer Bottom Bar ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.7 }}
            >
              {/* Separator line */}
              <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, transparent, rgba(139,90,43,0.25), rgba(212,163,115,0.35), rgba(139,90,43,0.25), transparent)", marginBottom: "1.25rem" }} />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left: copyright */}
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", color: "rgba(15,8,45,0.48)", textTransform: "uppercase" }}>
                  © 2026 Yash Gautam. All Rights Reserved.
                </div>

                {/* Center: decorative */}
                <div className="flex items-center gap-2">
                  <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, transparent, rgba(139,90,43,0.4))" }} />
                  <motion.div
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "radial-gradient(circle, #d4a373, #8b5a2b)", boxShadow: "0 0 8px rgba(212,163,115,0.6)" }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, rgba(139,90,43,0.4), transparent)" }} />
                </div>

                {/* Right: designed by */}
                <div className="flex items-center gap-1.5" style={{ fontFamily: "'Courier New', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", color: "rgba(15,8,45,0.72)", textTransform: "uppercase", fontWeight: 800 }}>
                  Designed &amp; Developed by Yash Gautam
                </div>
              </div>
            </motion.div>
          </div>
        </motion.footer>

      </div>
    </section>
  );
}
