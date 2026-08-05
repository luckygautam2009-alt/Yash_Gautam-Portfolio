import { useState, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { HeroSection } from "./components/HeroSection";
import { MyEvolution } from "./components/MyEvolution";
import { ProjectCardsSection } from "./components/ProjectCardsSection";
import { ImpactRecognition } from "./components/ImpactRecognition";
import { BeyondTheCode } from "./components/BeyondTheCode";
import { FinalSection } from "./components/FinalSection";
import { AudioPlayer } from "./components/AudioPlayer";
import { motion } from "motion/react";

type Page = "preloader" | "portfolio";

// ─────────────────────────────────────────────────────────────────────────────
// SLEEK DEVELOPER PRELOADER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function MinimalPreloader({ onContinue, mouseX, mouseY }: { onContinue: () => void; mouseX: number; mouseY: number }) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 16) + 12;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoaded(true);
          // Auto-continue smoothly after 300ms
          setTimeout(() => {
            onContinue();
          }, 350);
        }, 150);
      }
      setProgress(current);
    }, 45);

    return () => clearInterval(interval);
  }, [onContinue]);

  const px = (mouseX - 0.5) * 10;
  const py = (mouseY - 0.5) * 8;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
      <div
        style={{
          width: "min(440px, 90vw)",
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderRadius: 32,
          border: "1px solid rgba(255,255,255,0.75)",
          boxShadow: "0 24px 80px rgba(139,90,43,0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
          padding: "44px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translate(${px}px,${py}px)`,
          transition: "transform 0.1s ease-out",
          animation: "terminalIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        {/* Monogram Monolith & Radial Ring */}
        <div style={{ position: "relative", width: 100, height: 100, marginBottom: 20 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="rgba(139, 90, 43, 0.12)"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#brownGrad)"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray="263.8"
              strokeDashoffset={263.8 - (263.8 * progress) / 100}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.05s ease-out" }}
            />
            <defs>
              <linearGradient id="brownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5a2b" />
                <stop offset="50%" stopColor="#d4a373" />
                <stop offset="100%" stopColor="#704720" />
              </linearGradient>
            </defs>
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#6b4724",
              fontFamily: "'Dancing Script', cursive",
              letterSpacing: -0.5,
            }}
          >
            YG
          </div>
        </div>

        {/* Name Title */}
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: "#1e293b",
            margin: "0 0 4px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Yash Gautam
        </h2>

        {/* Subtitle Tagline */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 2,
            color: "#8b5a2b",
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Portfolio Experience
        </div>

        {/* Progress bar line */}
        <div
          style={{
            width: "100%",
            height: 4,
            background: "rgba(139, 90, 43, 0.1)",
            borderRadius: 99,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #8b5a2b, #d4a373)",
              borderRadius: 99,
              transition: "width 0.08s ease-out",
            }}
          />
        </div>

        <div
          style={{
            fontSize: 11,
            fontFamily: "'SF Mono','Fira Code',monospace",
            color: "#6b7280",
            fontWeight: 600,
          }}
        >
          {loaded ? "System Ready" : `Initializing ${progress}%`}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("preloader");
  const [transitioning, setTransitioning] = useState(false);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);

  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (page !== "portfolio") return;

    const sections = [
      { id: "hero-section",        name: "hero" },
      { id: "about-section",       name: "about" },
      { id: "evolution-section",   name: "evolution" },
      { id: "projects-section",    name: "projects" },
      { id: "beyond-section",      name: "beyond" },
      { id: "skills-section",      name: "skills" },
      { id: "services-section",    name: "services" },
      { id: "recognition-section", name: "recognition" },
      { id: "end-section",         name: "end" },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  // Initialize Global Lenis smooth scrolling for portfolio view
  useEffect(() => {
    if (page !== "portfolio") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, [page]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    setMouseX(e.clientX / window.innerWidth);
    setMouseY(e.clientY / window.innerHeight);
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  const goTo = (next: Page) => {
    setTransitioning(true);
    setTimeout(() => {
      setPage(next);
      setTransitioning(false);
    }, 450);
  };

  return (
    <>
      <style>{`
        @keyframes terminalIn { from{opacity:0;transform:scale(0.94) translateY(28px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pageOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(1.03)} }
        @keyframes pageIn  { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }

        html { scroll-behavior: auto; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #fbf7f2; }
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }
      `}</style>

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg,#f7efe6 0%,#f3e6d8 25%,#eedecc 50%,#f4e8dc 75%,#f8f1e8 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Mouse-reactive warm gradient */}
        <div style={{ position:"fixed", inset:0, background:`radial-gradient(ellipse at ${50+(mouseX-0.5)*20}% ${50+(mouseY-0.5)*20}%, rgba(244,227,211,0.6) 0%, transparent 70%)`, pointerEvents:"none", zIndex:0 }} />

        {/* Ambient Audio Player */}
        <AudioPlayer />

        {/* Page content */}
        <div
          key={page}
          style={{
            position: page === "portfolio" ? "relative" : "absolute",
            inset: page === "portfolio" ? undefined : 0,
            width: "100%",
            minHeight: "100vh",
            zIndex: 10,
            opacity: transitioning ? 0 : 1,
            transition: "opacity 0.35s ease",
          }}
        >
          {page === "preloader" && (
            <MinimalPreloader
              onContinue={() => goTo("portfolio")}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          )}
          {page === "portfolio" && (
            <>
              <div className="w-full flex flex-col">
                <div id="hero-section" className="w-full scroll-mt-6">
                  <HeroSection
                    activeSection={activeSection}
                    onScrollDown={() => {
                      document.getElementById("evolution-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                </div>
                <div id="about-section" className="w-full scroll-mt-20">
                  {/* About Anchor target */}
                </div>
                <div id="evolution-section" className="w-full scroll-mt-20">
                  <MyEvolution />
                </div>
                <div id="projects-section" className="w-full scroll-mt-20">
                  <ProjectCardsSection />
                </div>
                <div id="recognition-section" className="w-full scroll-mt-20">
                  <ImpactRecognition />
                </div>
                <div id="beyond-section" className="w-full scroll-mt-20">
                  <BeyondTheCode />
                </div>
                <div id="end-section" className="w-full scroll-mt-20">
                  <FinalSection />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Soft noise texture overlay */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, pointerEvents:"none", zIndex:20, opacity:0.3 }} />
      </div>
    </>
  );
}

