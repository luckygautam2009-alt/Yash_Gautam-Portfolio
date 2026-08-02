import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Linkedin, Github, Mail, FileText, ExternalLink } from "lucide-react";
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

    const colors = ["#8ecae6", "#b5a8d8", "#f4a0a8", "#f9c6a0", "#d4aacc", "#a8c8e8"];
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 3 + 1,
      alpha: Math.random() * 0.45 + 0.1,
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
      // soft connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#b5a8d8";
            ctx.globalAlpha = (1 - d / 100) * 0.18;
            ctx.lineWidth = 0.6;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }} />;
}

// ── Floating pastel sphere ────────────────────────────────────────────────────
function PastelSphere({ size, top, left, right, bottom, gradient, dur, delay }: {
  size: number; top?: string; left?: string; right?: string; bottom?: string;
  gradient: string; dur: number; delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        background: gradient,
        boxShadow: `0 ${size * 0.08}px ${size * 0.3}px rgba(160,140,200,0.18), inset 0 ${size * 0.06}px ${size * 0.15}px rgba(255,255,255,0.55)`,
        top, left, right, bottom,
      }}
      animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ── Energy Orb ────────────────────────────────────────────────────────────────
function EnergyOrb({ inView }: { inView: boolean }) {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 320, height: 320 }}>
      {/* outer rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: 180 + i * 50,
            height: 180 + i * 50,
            borderColor: i === 1 ? "rgba(142,202,230,0.45)" : i === 2 ? "rgba(181,168,216,0.3)" : "rgba(244,160,168,0.2)",
          }}
          animate={inView ? { rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.03, 1] } : {}}
          transition={{
            rotate: { duration: 10 + i * 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* glow aura */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200, height: 200,
          background: "radial-gradient(circle, rgba(142,202,230,0.35) 0%, rgba(181,168,216,0.25) 50%, transparent 80%)",
          filter: "blur(22px)",
        }}
        animate={inView ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* main sphere */}
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: 185,
          height: 185,
          background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85) 0%, rgba(142,202,230,0.55) 35%, rgba(181,168,216,0.5) 65%, rgba(244,198,160,0.4) 100%)",
          boxShadow: "0 8px 40px rgba(142,202,230,0.45), 0 2px 8px rgba(181,168,216,0.3), inset 0 2px 0 rgba(255,255,255,0.8), inset 0 -4px 12px rgba(160,140,200,0.2)",
          border: "1px solid rgba(255,255,255,0.75)",
        }}
        animate={inView ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.07 }}
      >
        {/* specular highlight */}
        <div className="absolute rounded-full"
          style={{
            width: 60, height: 35,
            background: "rgba(255,255,255,0.65)",
            filter: "blur(8px)",
            top: "18%", left: "20%",
            transform: "rotate(-20deg)",
          }}
        />
        <div className="text-center z-10 px-4 select-none">
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            color: "rgba(40,20,90,0.7)",
            marginBottom: "0.2rem",
          }}>STATUS</div>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.18em",
            color: "rgba(15,5,50,0.92)",
            fontWeight: 700,
            lineHeight: 1.35,
            textShadow: "0 1px 0 rgba(255,255,255,0.8)",
          }}>READY<br />TO BUILD</div>
          <motion.div
            style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "radial-gradient(circle, #8ecae6, #b5a8d8)",
              margin: "0.4rem auto 0",
              boxShadow: "0 0 8px rgba(142,202,230,0.8)",
            }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* micro-orbs */}
      {[
        { size: 16, orbit: 108, color: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #8ecae6)", dur: 6 },
        { size: 11, orbit: 122, color: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #b5a8d8)", dur: 9 },
        { size: 9,  orbit: 100, color: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #f4a0a8)", dur: 7 },
      ].map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.size, height: o.size,
            background: o.color,
            boxShadow: `0 2px 8px rgba(160,140,200,0.4), inset 0 1px 2px rgba(255,255,255,0.8)`,
            top: "50%", left: "50%",
            marginTop: -o.size / 2,
            marginLeft: -o.size / 2,
            transformOrigin: `${-o.orbit + o.size / 2}px ${o.size / 2}px`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

// ── Contact cards ─────────────────────────────────────────────────────────────
const contacts = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    sub: "Let's connect",
    href: "https://linkedin.com/in/yash-gautam",
    accent: "#8ecae6",
    accentDark: "#5aa8c8",
    bg: "linear-gradient(135deg, rgba(142,202,230,0.28) 0%, rgba(142,202,230,0.08) 100%)",
    border: "rgba(142,202,230,0.55)",
  },
  {
    icon: Github,
    label: "GitHub",
    sub: "View my work",
    href: "https://github.com/luckygautam2009-alt",
    accent: "#b5a8d8",
    accentDark: "#8878b8",
    bg: "linear-gradient(135deg, rgba(181,168,216,0.28) 0%, rgba(181,168,216,0.08) 100%)",
    border: "rgba(181,168,216,0.55)",
  },
  {
    icon: Mail,
    label: "Email",
    sub: "Drop me a line",
    href: "mailto:yash@example.com",
    accent: "#f4a0a8",
    accentDark: "#d8707a",
    bg: "linear-gradient(135deg, rgba(244,160,168,0.28) 0%, rgba(244,160,168,0.08) 100%)",
    border: "rgba(244,160,168,0.55)",
  },
  {
    icon: FileText,
    label: "Resume",
    sub: "Download PDF",
    href: "#resume",
    accent: "#f9c6a0",
    accentDark: "#d89060",
    bg: "linear-gradient(135deg, rgba(249,198,160,0.28) 0%, rgba(249,198,160,0.08) 100%)",
    border: "rgba(249,198,160,0.55)",
  },
];

function ContactCard({ icon: Icon, label, sub, href, accent, accentDark, bg, border, delay }: typeof contacts[0] & { delay: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ scale: 1.07, y: -7 }}
      className="relative group cursor-pointer block"
      style={{ textDecoration: "none" }}
    >
      <div
        className="relative rounded-2xl p-6 flex flex-col items-center gap-3 overflow-hidden transition-all duration-500"
        style={{
          background: bg,
          border: `1px solid ${border}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: `0 4px 24px rgba(160,140,200,0.1), inset 0 1px 0 rgba(255,255,255,0.75)`,
        }}
      >
        {/* top glass sheen */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }} />

        {/* hover soft glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 30%, ${accent}22, transparent 70%)` }} />

        <motion.div
          className="relative z-10 rounded-xl p-3"
          style={{
            background: `rgba(255,255,255,0.55)`,
            border: `1px solid ${border}`,
            boxShadow: `0 2px 8px ${accent}33`,
          }}
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Icon size={20} style={{ color: accentDark }} />
        </motion.div>

        <div className="relative z-10 text-center">
          <div style={{ color: "rgba(10,5,35,0.92)", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.04em" }}>{label}</div>
          <div style={{ color: "rgba(30,20,60,0.65)", fontSize: "0.68rem", letterSpacing: "0.08em", marginTop: 2 }}>{sub}</div>
        </div>

        <ExternalLink size={11} style={{ color: `${accentDark}88` }} className="relative z-10" />

        {/* bottom accent line */}
        <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      </div>
    </motion.a>
  );
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
      {/* ── Full background image ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Soft overlay to deepen contrast for text readability ── */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(240,230,248,0.18) 50%, rgba(255,245,235,0.25) 100%)" }} />

      {/* ── Extra ambient depth blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", width: 500, height: 500,
          top: "10%", left: "5%",
          background: "radial-gradient(circle, rgba(142,202,230,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", width: 600, height: 600,
          bottom: "5%", right: "5%",
          background: "radial-gradient(circle, rgba(181,168,216,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400,
          top: "40%", left: "40%",
          background: "radial-gradient(circle, rgba(244,160,168,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </div>

      {/* ── Additional floating spheres ── */}
      <PastelSphere size={90}  top="8%"   left="3%"   gradient="radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #8ecae6)"  dur={8}  delay={0} />
      <PastelSphere size={60}  top="55%"  left="1%"   gradient="radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), #b5a8d8)" dur={10} delay={1.2} />
      <PastelSphere size={50}  top="20%"  right="4%"  gradient="radial-gradient(circle at 35% 30%, rgba(255,255,255,0.88), #f4a0a8)" dur={9}  delay={0.5} />
      <PastelSphere size={38}  bottom="22%" right="8%" gradient="radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), #f9c6a0)" dur={7}  delay={2} />
      <PastelSphere size={28}  top="72%"  left="22%"  gradient="radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #d4aacc)"  dur={6}  delay={0.8} />
      <PastelSphere size={20}  top="35%"  right="18%" gradient="radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), #a8c8e8)"  dur={5}  delay={1.5} />

      {/* ── Particle canvas ── */}
      <ParticleCanvas />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center" style={{ paddingTop: "5.5rem" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-5 flex items-center gap-3"
        >
          <div style={{ width: 28, height: 1, background: "linear-gradient(90deg, transparent, #8ecae6)" }} />
          <span style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "rgba(30,20,60,0.75)",
            textTransform: "uppercase",
          }}>Final Chapter</span>
          <div style={{ width: 28, height: 1, background: "linear-gradient(90deg, #8ecae6, transparent)" }} />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="text-center mb-4 px-6"
          style={{
            fontSize: "clamp(0.62rem, 1.2vw, 0.78rem)",
            letterSpacing: "0.4em",
            color: "rgba(20,10,50,0.75)",
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
          }}
        >
          LET'S BUILD SOMETHING EXTRAORDINARY
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.28 }}
          style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #b5a8d8, #8ecae6, transparent)", marginBottom: "1.25rem" }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.38 }}
          style={{
            color: "rgba(20,10,55,0.7)",
            fontSize: "clamp(0.78rem, 1.1vw, 0.92rem)",
            letterSpacing: "0.07em",
            marginBottom: "3.5rem",
            fontStyle: "italic",
          }}
        >
          Every great product starts with a conversation.
        </motion.p>

        {/* ── Hero text + Orb ── */}
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">

          {/* Hero heading */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.45 }}
          >
            <div style={{
              fontSize: "clamp(2rem, 5vw, 4.6rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "rgba(10,5,30,0.95)",
              marginBottom: "0.15rem",
            }}>
              Enough About Me.
            </div>
            <div style={{
              fontSize: "clamp(1.85rem, 4.6vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #1a6e94 0%, #5a3898 50%, #a83045 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.15rem",
            }}>
              Now Let's Talk
            </div>
            <div style={{
              fontSize: "clamp(1.85rem, 4.6vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "rgba(10,5,30,0.92)",
              marginBottom: "0.15rem",
            }}>
              About Your Next
            </div>
            <div style={{
              fontSize: "clamp(1.85rem, 4.6vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              flexWrap: "wrap",
            }}>
              <span style={{ color: "rgba(10,5,30,0.92)" }}>Big</span>
              <span style={{
                background: "linear-gradient(90deg, #a83045, #5a3898)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Idea.</span>
            </div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-8 flex items-center gap-3 flex-wrap"
            >
              {[
                { label: "AI Engineer", accent: "#2a7a9a", bg: "rgba(142,202,230,0.22)", border: "rgba(142,202,230,0.55)" },
                { label: "Full-Stack Dev", accent: "#5a4898", bg: "rgba(181,168,216,0.2)", border: "rgba(181,168,216,0.5)" },
                { label: "Open to Collaborate", accent: "#a83045", bg: "rgba(244,160,168,0.2)", border: "rgba(244,160,168,0.55)" },
              ].map((t) => (
                <span key={t.label} style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  color: t.accent,
                  border: `1px solid ${t.border}`,
                  padding: "0.28rem 0.75rem",
                  borderRadius: "100px",
                  background: t.bg,
                  backdropFilter: "blur(8px)",
                }}>{t.label}</span>
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
          className="w-full max-w-4xl mx-auto px-6 mb-24"
        >
          <div className="text-center mb-7">
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.3em",
              color: "rgba(20,10,50,0.65)",
              textTransform: "uppercase",
            }}>— Contact Hub —</span>
          </div>

          {/* Frosted hub container — mirrors the glass card in the image */}
          <div
            className="relative rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,0.38)",
              border: "1px solid rgba(255,255,255,0.72)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              boxShadow: "0 8px 48px rgba(160,140,200,0.18), inset 0 2px 0 rgba(255,255,255,0.85)",
            }}
          >
            <div className="absolute top-0 left-8 right-8 h-px rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)" }} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contacts.map((c, i) => (
                <ContactCard key={c.label} {...c} delay={0.95 + i * 0.1} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Cinematic closing ── */}
        <div
          className="w-full flex flex-col items-center"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(240,228,248,0.55) 60%, rgba(230,220,245,0.75) 100%)",
            paddingTop: "4rem",
            paddingBottom: "4rem",
          }}
        >
          {/* Divider glow */}
          <div style={{
            width: "55%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(142,202,230,0.7), rgba(181,168,216,0.7), transparent)",
            marginBottom: "3rem",
          }} />

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.35 }}
            className="text-center mb-2"
          >
            <div style={{
              fontSize: "clamp(1.8rem, 5.5vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "0.25em",
              background: "linear-gradient(135deg, #0e6a90 0%, #4a2e8a 50%, #9a2a40 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textTransform: "uppercase",
            }}>YASH GAUTAM</div>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.55 }}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.38em",
              color: "rgba(15,8,45,0.72)",
              textTransform: "uppercase",
              marginBottom: "2.5rem",
            }}
          >
            AI &amp; Web Developer
          </motion.div>

          {/* Terminal closing */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col items-center gap-2"
          >
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "rgba(20,90,130,0.95)",
            }}>Session Completed.</div>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "rgba(15,8,50,0.72)",
            }}>Thanks For Visiting.</div>

            {/* Blinking cursor */}
            <motion.div
              style={{
                width: 9, height: 17,
                background: "linear-gradient(135deg, #8ecae6, #b5a8d8)",
                borderRadius: 2,
                marginTop: "0.5rem",
                boxShadow: "0 0 10px rgba(142,202,230,0.6)",
              }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
            />
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 2.1 }}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              color: "rgba(15,8,45,0.45)",
              marginTop: "2.5rem",
              textTransform: "uppercase",
            }}
          >
            © 2026 Yash Gautam · All rights reserved
          </motion.div>
        </div>
      </div>
    </section>
  );
}
