import { useState, useEffect, useRef, useCallback } from "react";
import { HeroSection } from "./components/HeroSection";

// ─────────────────────────────────────────────────────────────────────────────
// ORB CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const ORBS = [
  { id: 0, size: 340, top: "-8%",  left: "-4%",  bg: "radial-gradient(circle at 35% 35%, #a8d8f0, #7cb9e8, #5a9fd4)", dur: 14, dx: 18, dy: 28 },
  { id: 1, size: 380, top: "-6%",  left: "58%",  bg: "radial-gradient(circle at 40% 30%, #c9b8f0, #a78bdc, #9b6fd4)", dur: 18, dx: 22, dy: 24 },
  { id: 2, size: 310, top: "52%",  left: "-6%",  bg: "radial-gradient(circle at 35% 40%, #b8c8f0, #9aabd8, #8890d0)", dur: 12, dx: 16, dy: 32 },
  { id: 3, size: 360, top: "68%",  left: "30%",  bg: "radial-gradient(circle at 40% 35%, #f0c4b8, #e8a898, #e89080)", dur: 20, dx: 24, dy: 20 },
  { id: 4, size: 200, top: "28%",  left: "80%",  bg: "radial-gradient(circle at 35% 35%, #a8d8f0, #7cb9e8, #68a8dc)", dur: 16, dx: 14, dy: 26 },
  { id: 5, size: 160, top: "35%",  left: "-2%",  bg: "radial-gradient(circle at 40% 40%, #f0d0b8, #e8b898, #e8a888)", dur: 11, dx: 20, dy: 18 },
  { id: 6, size: 140, top: "4%",   left: "76%",  bg: "radial-gradient(circle at 35% 35%, #f0c8b0, #e8b090, #e89870)", dur: 13, dx: 18, dy: 22 },
  { id: 7, size: 220, top: "72%",  left: "72%",  bg: "radial-gradient(circle at 40% 40%, #f4d0c0, #ebb8a8, #e8a898)", dur: 17, dx: 12, dy: 30, blur: 30 },
];

// ─────────────────────────────────────────────────────────────────────────────
// CODE TYPING DATA
// ─────────────────────────────────────────────────────────────────────────────
const CODE_LINES = [
  { text: '#include <stdio.h>',                              type: 'include' },
  { text: '',                                                type: 'blank'   },
  { text: 'int main() {',                                    type: 'keyword' },
  { text: '    printf("Welcome to Yash\'s Portfolio\\n");', type: 'printf'  },
  { text: '    printf("AIML Passionate\\n");',               type: 'printf'  },
  { text: '    printf("Web Developer\\n");',                 type: 'printf'  },
  { text: '    printf("Open Source Contributor\\n");',       type: 'printf'  },
  { text: '    printf("Hackathon Enthusiast\\n");',          type: 'printf'  },
  { text: '    return 0;',                                   type: 'return'  },
  { text: '}',                                               type: 'brace'   },
];

const OUTPUT_LINES = [
  "Welcome to Yash's Portfolio",
  "AIML Passionate",
  "Web Developer",
  "Open Source Contributor",
  "Hackathon Enthusiast",
];

type Phase = "typing" | "compiling" | "transitioning" | "output";
type Page  = "terminal" | "portfolio";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function highlight(line: string, type: string): React.ReactNode {
  if (type === "include") return <span style={{ color: "#7c6fcd" }}>{line}</span>;
  if (type === "keyword") {
    const m = line.match(/^(int) (main)(\(\) \{)$/);
    if (m) return <><span style={{ color: "#7c6fcd" }}>{m[1]}</span>{" "}<span style={{ color: "#2563eb" }}>{m[2]}</span><span style={{ color: "#374151" }}>{m[3]}</span></>;
  }
  if (type === "printf") {
    const m = line.match(/^(\s*)(printf)(\()(")(.+?)(")(.*\);)$/);
    if (m) return <><span>{m[1]}</span><span style={{ color: "#2563eb" }}>{m[2]}</span><span style={{ color: "#374151" }}>{m[3]}</span><span style={{ color: "#059669" }}>{m[4]}{m[5]}{m[6]}</span><span style={{ color: "#374151" }}>{m[7]}</span></>;
  }
  if (type === "return") return <><span style={{ color: "#7c6fcd" }}>    return</span><span style={{ color: "#374151" }}> 0;</span></>;
  return <span style={{ color: "#374151" }}>{line}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING ORB COMPONENT
import { MyEvolution } from "./components/MyEvolution";
import { ProjectCardsSection } from "./components/ProjectCardsSection";
import { ImpactRecognition } from "./components/ImpactRecognition";
import { BeyondTheCode } from "./components/BeyondTheCode";
import { FinalSection } from "./components/FinalSection";
import { Home, Zap, FolderGit2, Trophy, Brain, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
function FloatingOrb({ orb, mouseX, mouseY }: { orb: typeof ORBS[0]; mouseX: number; mouseY: number }) {
  const px = (mouseX - 0.5) * -28 * (0.6 + orb.id * 0.08);
  const py = (mouseY - 0.5) * -28 * (0.6 + orb.id * 0.07);
  return (
    <div
      style={{
        position: "absolute",
        width: orb.size, height: orb.size,
        top: orb.top, left: orb.left,
        borderRadius: "50%",
        background: orb.bg,
        filter: `blur(${orb.blur ?? 0}px)`,
        boxShadow: "inset -20px -20px 60px rgba(255,255,255,0.3), inset 10px 10px 40px rgba(255,255,255,0.4), 0 20px 60px rgba(0,0,0,0.08)",
        transform: `translate(${px}px, ${py}px)`,
        transition: "transform 0.12s ease-out",
        animation: `orbFloat${orb.id} ${orb.dur}s ease-in-out infinite`,
        zIndex: 0, pointerEvents: "none",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMINAL SECTION
// ─────────────────────────────────────────────────────────────────────────────
function TerminalSection({ onContinue, mouseX, mouseY }: { onContinue: () => void; mouseX: number; mouseY: number }) {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [compileLine1, setCompileLine1] = useState("");
  const [compileLine2, setCompileLine2] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [outputVisible, setOutputVisible] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  const typeLine = (line: string, baseDelay: number): Promise<void> =>
    new Promise<void>(resolve => {
      if (line === "") {
        const t = setTimeout(() => { setCurrentLineText(""); resolve(); }, 80);
        timeoutRefs.current.push(t); return;
      }
      let i = 0;
      const type = () => {
        i++;
        setCurrentLineText(line.slice(0, i));
        if (i < line.length) {
          const ch = line[i - 1];
          const d = /[({)}"']/.test(ch) ? baseDelay * 1.5 : /\s/.test(ch) ? baseDelay * 0.6 : baseDelay + Math.random() * 20;
          const t = setTimeout(type, d);
          timeoutRefs.current.push(t);
        } else {
          const t = setTimeout(resolve, 160);
          timeoutRefs.current.push(t);
        }
      };
      type();
    });

  useEffect(() => {
    const run = async () => {
      await new Promise<void>(r => { const t = setTimeout(() => { setTerminalVisible(true); r(); }, 400); timeoutRefs.current.push(t); });
      await new Promise<void>(r => { const t = setTimeout(r, 600); timeoutRefs.current.push(t); });
      for (let li = 0; li < CODE_LINES.length; li++) {
        const { text, type } = CODE_LINES[li];
        await typeLine(text, type === "printf" ? 20 : 28);
        setTypedLines(prev => [...prev, text]);
        setCurrentLineText("");
        await new Promise<void>(r => { const t = setTimeout(r, type === "blank" ? 100 : 35); timeoutRefs.current.push(t); });
      }
      await new Promise<void>(r => { const t = setTimeout(r, 450); timeoutRefs.current.push(t); });
      setPhase("compiling");
      await typeLine("$ gcc portfolio.c -o portfolio", 25);
      setCompileLine1("$ gcc portfolio.c -o portfolio");
      setCurrentLineText("");
      await new Promise<void>(r => { const t = setTimeout(r, 700); timeoutRefs.current.push(t); });
      await typeLine("$ ./portfolio", 30);
      setCompileLine2("$ ./portfolio");
      setCurrentLineText("");
      await new Promise<void>(r => { const t = setTimeout(r, 500); timeoutRefs.current.push(t); });
      setPhase("transitioning");
      await new Promise<void>(r => { const t = setTimeout(r, 700); timeoutRefs.current.push(t); });
      setShowOutput(true); setOutputVisible(true); setPhase("output");
      for (let i = 0; i < OUTPUT_LINES.length; i++) {
        await new Promise<void>(r => { const t = setTimeout(r, 260); timeoutRefs.current.push(t); });
        setOutputLines(prev => [...prev, OUTPUT_LINES[i]]);
      }
      await new Promise<void>(r => { const t = setTimeout(r, 600); timeoutRefs.current.push(t); });
      setShowButton(true);
    };
    run();
    return () => timeoutRefs.current.forEach(clearTimeout);
  }, []);

  const isTransitioning = phase === "transitioning";
  const px = (mouseX - 0.5) * 12;
  const py = (mouseY - 0.5) * 8;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      {/* Terminal */}
      {!showOutput && terminalVisible && (
        <div
          style={{
            width: "min(680px, 92vw)",
            background: "rgba(255,255,255,0.22)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.7)",
            overflow: "hidden",
            transform: `translate(${px}px,${py}px)`,
            opacity: isTransitioning ? 0 : 1,
            transition: isTransitioning ? "opacity 0.5s ease, transform 0.5s ease" : "transform 0.1s ease-out",
            animation: terminalVisible ? "terminalIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards" : "none",
          }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 18px", background:"rgba(255,255,255,0.30)", borderBottom:"1px solid rgba(255,255,255,0.4)" }}>
            <span style={{ width:12, height:12, borderRadius:"50%", background:"#ff5f57", display:"block" }} />
            <span style={{ width:12, height:12, borderRadius:"50%", background:"#febc2e", display:"block" }} />
            <span style={{ width:12, height:12, borderRadius:"50%", background:"#28c840", display:"block" }} />
            <span style={{ flex:1, textAlign:"center", fontSize:13, fontWeight:600, color:"#374151", fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Text',sans-serif", marginLeft:-36 }}>portfolio.c — zsh</span>
          </div>
          <div style={{ padding:"20px 24px 24px", fontFamily:"'SF Mono','Fira Code',monospace", fontSize:14, lineHeight:"1.75", minHeight:300, color:"#374151" }}>
            {(phase === "typing" || phase === "compiling" || isTransitioning) && (
              <>
                {typedLines.map((line, i) => (
                  <div key={i} style={{ whiteSpace:"pre" }}>{line === "" ? " " : highlight(line, CODE_LINES[i].type)}</div>
                ))}
                {phase === "typing" && (
                  <div style={{ whiteSpace:"pre", display:"flex", alignItems:"center" }}>
                    {typedLines.length < CODE_LINES.length ? highlight(currentLineText, CODE_LINES[typedLines.length].type) : currentLineText}
                    <span style={{ display:"inline-block", width:2, height:"1.1em", background:"#374151", marginLeft:1, opacity: cursorVisible ? 1 : 0, borderRadius:1, verticalAlign:"middle" }} />
                  </div>
                )}
                {phase === "compiling" && (
                  <>
                    <div style={{ height:16 }} />
                    {compileLine1 && <div style={{ color:"#1d4ed8", fontWeight:600 }}>{compileLine1}</div>}
                    {!compileLine2 && (
                      <div style={{ display:"flex", alignItems:"center" }}>
                        <span style={{ color:"#1d4ed8", fontWeight:600 }}>{currentLineText}</span>
                        <span style={{ display:"inline-block", width:2, height:"1.1em", background:"#1d4ed8", marginLeft:1, opacity: cursorVisible?1:0, borderRadius:1 }} />
                      </div>
                    )}
                    {compileLine2 && <div style={{ color:"#1d4ed8", fontWeight:600 }}>{compileLine2}</div>}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Output card */}
      {showOutput && outputVisible && (
        <div
          style={{
            width: "min(560px, 90vw)",
            background: "rgba(255,255,255,0.28)",
            backdropFilter: "blur(48px) saturate(200%)",
            WebkitBackdropFilter: "blur(48px) saturate(200%)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.65)",
            boxShadow: "0 32px 100px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.8)",
            padding: "40px 48px 44px",
            display: "flex", flexDirection: "column", alignItems: "center",
            transform: `translate(${px}px,${py}px)`,
            transition: "transform 0.12s ease-out",
            animation: "outputIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#a8d8f0 0%,#c9b8f0 50%,#f0c4b8 100%)", border:"3px solid rgba(255,255,255,0.8)", boxShadow:"0 8px 32px rgba(124,111,205,0.3)", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>🧑‍💻</div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:"#6b7280", textTransform:"uppercase", marginBottom:10, fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif" }}>Program Output</div>
          <div style={{ width:48, height:2, borderRadius:2, background:"linear-gradient(90deg,#a8d8f0,#c9b8f0,#f0c4b8)", marginBottom:28 }} />
          <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:4 }}>
            {outputLines.map((line, i) => (
              <div key={i} style={{ fontFamily:"'SF Mono','Fira Code',monospace", fontSize: i===0?22:16, fontWeight: i===0?700:600, color: i===0?"#111827":"#374151", textAlign:"center", padding: i===0?"0 0 12px":"3px 0", textShadow:"0 1px 2px rgba(255,255,255,0.8)", borderBottom: i===0?"1px solid rgba(0,0,0,0.07)":"none", marginBottom: i===0?12:0, animation:"outputLineIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards", opacity:0, animationDelay:`${i*0.08}s`, animationFillMode:"forwards" }}>
                {i===0 ? `✦ ${line}` : `› ${line}`}
              </div>
            ))}
          </div>
          {showButton && (
            <div style={{ marginTop:36 }}>
              <button
                onClick={onContinue}
                style={{ background:"rgba(255,255,255,0.75)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.6)", borderRadius:50, padding:"14px 36px", fontSize:17, fontWeight:700, color:"#111827", cursor:"pointer", boxShadow:"0 8px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)", fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif", letterSpacing:0.3, outline:"none", transition:"transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease", animation:"btnIn 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
              >
                Tap to Continue →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("terminal");
  const [transitioning, setTransitioning] = useState(false);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);

  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (page !== "portfolio") return;

    const sections = [
      { id: "hero-section", name: "hero" },
      { id: "evolution-section", name: "evolution" },
      { id: "projects-section", name: "projects" },
      { id: "recognition-section", name: "recognition" },
      { id: "beyond-section", name: "beyond" },
      { id: "end-section", name: "end" },
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
      // Adjust overflow based on page
      if (next === "portfolio") {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
    }, 500);
  };

  return (
    <>
      <style>{`
        @keyframes orbFloat0 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-28px) scale(1.05)} }
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-22px,24px) scale(1.06)} 66%{transform:translate(14px,-16px) scale(0.98)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,32px) scale(1.04)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(24px,-20px) scale(1.05)} 80%{transform:translate(-10px,14px) scale(1.02)} }
        @keyframes orbFloat4 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-14px,26px) scale(1.06)} }
        @keyframes orbFloat5 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-18px) scale(1.04)} }
        @keyframes orbFloat6 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-18px,22px) scale(1.05)} }
        @keyframes orbFloat7 { 0%,100%{transform:translate(0,0) scale(1)} 30%{transform:translate(12px,30px) scale(1.03)} 70%{transform:translate(-8px,-12px) scale(0.99)} }

        @keyframes terminalIn { from{opacity:0;transform:scale(0.94) translateY(28px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes outputIn   { from{opacity:0;transform:scale(0.94) translateY(32px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes outputLineIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes btnIn { from{opacity:0;transform:translateY(22px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }

        @keyframes pageOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(1.04)} }
        @keyframes pageIn  { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }

html, body { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        body { margin: 0; overflow: hidden; }
        .nav-dock-button {
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        .nav-dock-button:hover {
          transform: scale(1.15) !important;
          background-color: rgba(255, 255, 255, 0.65) !important;
          color: #1e1b4b !important;
        }
      `}</style>

      <div
        style={{
          width: "100vw",
          height: page === "portfolio" ? "auto" : "100vh",
          minHeight: "100vh",
          position: "relative",
          overflowY: page === "portfolio" ? "auto" : "hidden",
          overflowX: "hidden",
          background: "linear-gradient(135deg,#d4e8f5 0%,#e8d8f0 25%,#f5d8e8 50%,#f8e8d8 75%,#f0e8d4 100%)",
        }}
      >
        {/* Mouse-reactive gradient */}
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at ${50+(mouseX-0.5)*20}% ${50+(mouseY-0.5)*20}%, rgba(200,230,255,0.5) 0%, transparent 70%)`, pointerEvents:"none", zIndex:0 }} />

        {/* Floating Orbs — always present */}
        {ORBS.map(orb => <FloatingOrb key={orb.id} orb={orb} mouseX={mouseX} mouseY={mouseY} />)}

        {/* Page content */}
        <div
          key={page}
          style={{
            position: page === "portfolio" ? "relative" : "absolute",
            inset: page === "portfolio" ? undefined : 0,
            width: "100%",
            minHeight: "100vh",
            zIndex: 10,
            animation: transitioning ? "pageOut 0.45s ease forwards" : "pageIn 0.55s cubic-bezier(0.34,1.2,0.64,1) both",
          }}
        >
          {page === "terminal" && (
            <TerminalSection
              onContinue={() => goTo("portfolio")}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          )}
          {page === "portfolio" && (
            <>
              <div className="w-full flex flex-col">
                <div id="hero-section" className="w-full">
                  <HeroSection onScrollDown={() => {
                    document.getElementById("evolution-section")?.scrollIntoView({ behavior: "smooth" });
                  }} />
                </div>
                <div id="evolution-section" className="w-full">
                  <MyEvolution />
                </div>
                <div id="projects-section" className="w-full">
                  <ProjectCardsSection />
                </div>
                <div id="recognition-section" className="w-full">
                  <ImpactRecognition />
                </div>
                <div id="beyond-section" className="w-full">
                  <BeyondTheCode />
                </div>
                <div id="end-section" className="w-full">
                  <FinalSection />
                </div>
              </div>

              {/* Floating Glassmorphic Navigation Dock */}
              <div
                style={{
                  position: "fixed",
                  top: "24px",
                  right: "24px",
                  zIndex: 100,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.65)",
                  borderRadius: "9999px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                }}
              >
                {[
                  { id: "hero-section", name: "hero", label: "Home", icon: Home },
                  { id: "evolution-section", name: "evolution", label: "Evolution", icon: Zap },
                  { id: "projects-section", name: "projects", label: "Projects", icon: FolderGit2 },
                  { id: "recognition-section", name: "recognition", label: "Recognition", icon: Trophy },
                  { id: "beyond-section", name: "beyond", label: "Beyond", icon: Brain },
                  { id: "end-section", name: "end", label: "Contact", icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      aria-label={`Scroll to ${item.label} section`}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: "none",
                        background: isActive ? "rgba(255, 255, 255, 0.8)" : "transparent",
                        color: isActive ? "#1e1b4b" : "#4f46e5",
                        cursor: "pointer",
                        boxShadow: isActive
                          ? "0 4px 14px rgba(79, 70, 229, 0.2), inset 0 1px 0 rgba(255,255,255,0.9)"
                          : "none",
                      }}
                      className="nav-dock-button"
                    >
                      <Icon size={20} />
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredItem === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -12, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            style={{
                              position: "absolute",
                              top: "135%",
                              left: "50%",
                              transform: "translateX(-50%)",
                              background: "rgba(17, 24, 39, 0.85)",
                              backdropFilter: "blur(12px)",
                              WebkitBackdropFilter: "blur(12px)",
                              color: "#ffffff",
                              fontSize: "12px",
                              fontWeight: 700,
                              padding: "6px 12px",
                              borderRadius: "8px",
                              whiteSpace: "nowrap",
                              pointerEvents: "none",
                              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                            }}
                          >
                            {item.label}
                            <div
                              style={{
                                position: "absolute",
                                bottom: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 0,
                                height: 0,
                                borderLeft: "5px solid transparent",
                                borderRight: "5px solid transparent",
                                borderBottom: "5px solid rgba(17, 24, 39, 0.85)",
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Noise overlay */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, pointerEvents:"none", zIndex:20, opacity:0.4 }} />
      </div>
    </>
  );
}
