import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "motion/react";
import { Linkedin, Github, Mail, FileText, ExternalLink } from "lucide-react";

const contactLinks = [
  {
    id: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    sublabel: "Let's connect professionally",
    href: "https://linkedin.com/in/yashgautam",
    gradient: "linear-gradient(135deg, rgba(173,216,255,0.6) 0%, rgba(200,190,255,0.5) 100%)",
    glowColor: "rgba(150,190,255,0.35)",
    iconColor: "#5b9bd5",
  },
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    sublabel: "Explore my open source work",
    href: "https://github.com/yashgautam",
    gradient: "linear-gradient(135deg, rgba(200,190,255,0.6) 0%, rgba(255,200,210,0.5) 100%)",
    glowColor: "rgba(180,170,255,0.35)",
    iconColor: "#8b7dd8",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    sublabel: "Drop me a message anytime",
    href: "mailto:yash@example.com",
    gradient: "linear-gradient(135deg, rgba(255,200,210,0.6) 0%, rgba(255,220,180,0.5) 100%)",
    glowColor: "rgba(255,170,180,0.35)",
    iconColor: "#e8889a",
  },
  {
    id: "resume",
    icon: FileText,
    label: "Resume",
    sublabel: "View my full experience",
    href: "#",
    gradient: "linear-gradient(135deg, rgba(255,220,180,0.6) 0%, rgba(173,235,220,0.5) 100%)",
    glowColor: "rgba(255,200,150,0.35)",
    iconColor: "#d4956a",
  },
];

function FloatingSphere({
  size,
  gradient,
  style,
  duration = 6,
  delay = 0,
}: {
  size: number;
  gradient: string;
  style: React.CSSProperties;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: gradient,
        filter: "blur(2px)",
        ...style,
      }}
      animate={{
        y: [0, -24, 0, 12, 0],
        x: [0, 8, -6, 4, 0],
        scale: [1, 1.04, 0.97, 1.02, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function GlassCard({
  link,
  index,
  inView,
}: {
  link: typeof contactLinks[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = link.icon;

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: 0.6 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        padding: "28px 24px",
        borderRadius: "24px",
        background: hovered
          ? link.gradient.replace(/0\.6/, "0.75").replace(/0\.5/, "0.65")
          : "rgba(255,255,255,0.45)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: hovered
          ? `0 20px 60px ${link.glowColor}, 0 4px 20px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.8)`
          : "0 8px 32px rgba(180,190,220,0.2), 0 2px 8px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.8)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        minWidth: "150px",
        flex: "1 1 140px",
        maxWidth: "180px",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Glass reflection highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
          borderRadius: "24px 24px 0 0",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "16px",
          background: hovered ? link.gradient : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered ? `0 8px 24px ${link.glowColor}` : "0 4px 12px rgba(180,190,220,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        <Icon size={24} color={link.iconColor} strokeWidth={1.8} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#3a3a5c",
            marginBottom: "4px",
            letterSpacing: "0.01em",
          }}
        >
          {link.label}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "rgba(90,90,130,0.75)",
            letterSpacing: "0.01em",
            lineHeight: 1.4,
          }}
        >
          {link.sublabel}
        </div>
      </div>
      <ExternalLink size={13} color="rgba(140,140,180,0.6)" strokeWidth={1.5} />
    </motion.a>
  );
}

function CenterSphereCluster({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: "340px",
        height: "340px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* Outer ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: "-40px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(173,216,255,0.2) 0%, rgba(200,190,255,0.15) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Small orbiting spheres */}
      <motion.div
        style={{
          position: "absolute",
          top: "12%",
          left: "14%",
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #b8e4ff, #7cb9e8 60%, #5fa3d8)",
          boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.08), inset 4px 4px 12px rgba(255,255,255,0.5)",
        }}
        animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "8%",
          right: "10%",
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #e8d5ff, #c4a8f0 55%, #a882e0)",
          boxShadow: "inset -10px -10px 24px rgba(0,0,0,0.08), inset 5px 5px 14px rgba(255,255,255,0.5)",
        }}
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "8%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #ffd6e0, #ffb3c6 55%, #f490a8)",
          boxShadow: "inset -9px -9px 22px rgba(0,0,0,0.08), inset 4px 4px 12px rgba(255,255,255,0.5)",
        }}
        animate={{ y: [0, 8, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "12%",
          width: 55,
          height: 55,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #ffe8c8, #ffcc94 55%, #f4a84a)",
          boxShadow: "inset -7px -7px 18px rgba(0,0,0,0.07), inset 3px 3px 10px rgba(255,255,255,0.5)",
        }}
        animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Central large sphere */}
      <motion.div
        style={{
          position: "relative",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 35%, rgba(255,255,255,0.9), rgba(210,230,255,0.5) 40%, rgba(180,160,240,0.4) 70%, rgba(255,180,190,0.3))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1.5px solid rgba(255,255,255,0.8)",
          boxShadow: "0 20px 60px rgba(180,190,255,0.3), 0 4px 20px rgba(255,255,255,0.6), inset 0 2px 8px rgba(255,255,255,0.8), inset -4px -4px 16px rgba(180,160,220,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
        animate={{ scale: [1, 1.04, 1], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner glow */}
        <div
          style={{
            position: "absolute",
            inset: "15%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
          }}
        />
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(80,80,130,0.8)",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}
          >
            READY TO
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "rgba(70,70,120,0.9)",
              textTransform: "uppercase",
            }}
          >
            CONNECT
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; opacity: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const p = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4,
    }));
    setParticles(p);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(135deg, #d6ecff 0%, #e8e0ff 30%, #ffd6e8 65%, #ffe8d0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >
      {/* Background gradient spheres matching reference */}
      <FloatingSphere
        size={420}
        gradient="radial-gradient(circle at 40% 40%, #a8d8f0, #78b8e8 50%, #5898d8)"
        style={{ top: "-8%", left: "-8%", opacity: 0.75 }}
        duration={9}
        delay={0}
      />
      <FloatingSphere
        size={380}
        gradient="radial-gradient(circle at 40% 38%, #e8d0ff, #c8a8f8 50%, #a880e8)"
        style={{ top: "5%", right: "-5%", opacity: 0.7 }}
        duration={10}
        delay={1.5}
      />
      <FloatingSphere
        size={350}
        gradient="radial-gradient(circle at 38% 40%, #ffd0e0, #ffb0c8 50%, #f490b0)"
        style={{ bottom: "10%", left: "5%", opacity: 0.65 }}
        duration={8}
        delay={0.8}
      />
      <FloatingSphere
        size={280}
        gradient="radial-gradient(circle at 40% 38%, #ffe8c0, #ffc898 50%, #f4a870)"
        style={{ bottom: "5%", right: "8%", opacity: 0.6 }}
        duration={7.5}
        delay={2}
      />
      <FloatingSphere
        size={180}
        gradient="radial-gradient(circle at 40% 38%, #c0eef8, #90d8f0 50%, #68c0e8)"
        style={{ top: "42%", left: "2%", opacity: 0.55 }}
        duration={6.5}
        delay={1.2}
      />
      <FloatingSphere
        size={140}
        gradient="radial-gradient(circle at 40% 38%, #ffd8f0, #ffb8e0 50%, #f898c8)"
        style={{ top: "38%", right: "3%", opacity: 0.5 }}
        duration={6}
        delay={3}
      />

      {/* Ambient particles */}
      {inView &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.7)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, p.opacity, 0],
              scale: [0, 1, 0],
              y: [0, -30, -60],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Main content container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "64px",
        }}
      >
        {/* Top text section */}
        <div style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              color: "rgba(100,100,160,0.8)",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            PORTFOLIO · CONTACT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(32px, 6vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #4a4a8a 0%, #7a5ab8 35%, #c06090 70%, #d47050 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
            }}
          >
            LET'S BUILD SOMETHING
            <br />
            EXTRAORDINARY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              fontSize: "18px",
              color: "rgba(90,90,140,0.85)",
              letterSpacing: "0.02em",
              fontStyle: "italic",
            }}
          >
            Every great product starts with a conversation.
          </motion.p>
        </div>

        {/* Middle section: text + sphere */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "60px",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "right", maxWidth: "280px" }}
          >
            <div
              style={{
                fontSize: "clamp(22px, 3.5vw, 38px)",
                fontWeight: 700,
                color: "rgba(60,60,100,0.9)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                marginBottom: "12px",
              }}
            >
              Enough About Me.
            </div>
            <div
              style={{
                fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 400,
                color: "rgba(80,80,130,0.75)",
                lineHeight: 1.4,
                letterSpacing: "0.01em",
              }}
            >
              Now Let's Talk About
              <br />
              <span
                style={{
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #7a5ab8, #c06090)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Your Next Big Idea.
              </span>
            </div>
          </motion.div>

          {/* Center sphere */}
          <CenterSphereCluster inView={inView} />

          {/* Right decorative text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: "240px" }}
          >
            {["Creativity", "Innovation", "Collaboration", "Possibility"].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: ["#7ab8f0", "#a882e0", "#f490a8", "#f4a84a"][i],
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${["#7ab8f0", "#a882e0", "#f490a8", "#f4a84a"][i]}`,
                  }}
                />
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "rgba(70,70,120,0.8)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {word}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact cards */}
        <div style={{ width: "100%", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              color: "rgba(100,100,160,0.7)",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            REACH OUT
          </motion.div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {contactLinks.map((link, i) => (
              <GlassCard key={link.id} link={link} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Footer glass panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            padding: "40px 64px",
            borderRadius: "32px",
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow:
              "0 20px 70px rgba(170,180,230,0.2), 0 4px 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
            textAlign: "center",
            maxWidth: "600px",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Glass reflection */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "45%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)",
              borderRadius: "32px 32px 0 0",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              background: "linear-gradient(135deg, #4a4a8a 0%, #8a5ab8 50%, #c06090 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "8px",
            }}
          >
            YASH GAUTAM
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              color: "rgba(120,100,170,0.8)",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            AI &amp; WEB DEVELOPER
          </div>

          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(160,140,210,0.5), transparent)",
              margin: "0 auto 28px",
            }}
          />

          <div
            style={{
              fontSize: "15px",
              color: "rgba(80,80,130,0.75)",
              marginBottom: "6px",
            }}
          >
            Thanks For Visiting.
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "rgba(70,60,120,0.85)",
              letterSpacing: "0.01em",
            }}
          >
            Let's Build Something Meaningful Together.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
