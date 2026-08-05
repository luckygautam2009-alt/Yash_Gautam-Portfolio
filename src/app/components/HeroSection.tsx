import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Briefcase, FolderGit2, Code2, 
  Layers, Award, Send, Download, ArrowRight,
  Settings, MessageSquare, Cpu, Triangle, ArrowUpRight, FileText,
  Menu, X
} from 'lucide-react';
import userPhoto from '../../imports/user_photo.png';
import launchByteLogo from '../../imports/launchbyte_logo.jpg';

const NAV_ITEMS = [
  { id: 'about-section',       label: 'About',          icon: User },
  { id: 'evolution-section',   label: 'Experience',     icon: Briefcase },
  { id: 'projects-section',    label: 'Projects',       icon: FolderGit2 },
  { id: 'skills-section',      label: 'Skills',         icon: Code2 },
  { id: 'services-section',    label: 'Services',       icon: Layers },
  { id: 'recognition-section', label: 'Certifications', icon: Award },
  { id: 'end-section',         label: 'Contact',        icon: Send },
];

const ROLES = [
  "AI & Web Developer",
  "Google Gemini Campus Ambassador",
  "IIT Bombay Techfest Ambassador",
  "Founder @ LaunchByte",
  "AI Learner & Agent Builder",
  "Open Source Contributor",
  "Hackathon Enthusiast"
];

// ─────────────────────────────────────────────────────────────────────────────
// FIXED PREMIUM NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function PremiumNavbar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
          background: scrolled
            ? 'rgba(251,247,242,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          boxShadow: scrolled
            ? '0 1px 0 rgba(139,90,43,0.10), 0 4px 24px rgba(139,90,43,0.08)'
            : 'none',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontFamily: "'Dancing Script', cursive",
              fontSize: '2.1rem',
              fontWeight: 700,
              color: '#6b4724',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)',
              lineHeight: 1,
            }}
            aria-label="Scroll to top"
          >
            Yash.
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id.replace('-section', '');
              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleScrollTo(item.id)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + idx * 0.04 }}
                  whileHover={{ y: -1 }}
                  style={{
                    background: isActive
                      ? 'rgba(139,90,43,0.10)'
                      : 'transparent',
                    border: 'none',
                    borderRadius: 10,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '7px 12px',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? '#8b5a2b' : '#5a4535',
                    transition: 'background 0.2s ease, color 0.2s ease, font-weight 0.2s ease',
                    position: 'relative',
                    animation: isActive ? 'navActivePulse 2.5s ease infinite' : 'none',
                  }}
                >
                  <Icon
                    size={13}
                    style={{
                      color: isActive ? '#8b5a2b' : 'rgba(139,90,43,0.65)',
                      transition: 'color 0.2s ease',
                    }}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-dot"
                      style={{
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: '#8b5a2b',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="hidden lg:inline-flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #8b5a2b 0%, #704720 100%)',
              color: '#fff',
              textDecoration: 'none',
              padding: '9px 20px',
              borderRadius: 100,
              fontSize: '0.82rem',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(139,90,43,0.3)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <Download size={13} />
            Download Resume
            <ArrowRight size={13} />
          </motion.a>

          {/* Mobile Hamburger */}
          <motion.button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(139,90,43,0.2)',
              borderRadius: 10,
              padding: '8px',
              cursor: 'pointer',
              color: '#6b4724',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              style={{
                overflow: 'hidden',
                background: 'rgba(251,247,242,0.97)',
                backdropFilter: 'blur(24px)',
                borderTop: '1px solid rgba(139,90,43,0.12)',
                boxShadow: '0 8px 24px rgba(139,90,43,0.12)',
              }}
            >
              <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id.replace('-section', '');
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      onClick={() => handleScrollTo(item.id)}
                      style={{
                        background: isActive ? 'rgba(139,90,43,0.10)' : 'transparent',
                        border: 'none',
                        borderRadius: 10,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '11px 14px',
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? '#8b5a2b' : '#5a4535',
                        textAlign: 'left',
                        width: '100%',
                        transition: 'background 0.2s ease, color 0.2s ease',
                      }}
                    >
                      <Icon size={15} style={{ color: isActive ? '#8b5a2b' : 'rgba(139,90,43,0.65)' }} />
                      {item.label}
                    </motion.button>
                  );
                })}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #8b5a2b 0%, #704720 100%)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '11px 18px',
                    borderRadius: 10,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 6,
                  }}
                >
                  <Download size={15} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
export function HeroSection({ onScrollDown, activeSection }: { onScrollDown?: () => void; activeSection: string }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Typewriter effect logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fullText = ROLES[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          return;
        }
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between"
      style={{ background: 'transparent' }}
    >
      {/* Fixed premium navbar */}
      <PremiumNavbar activeSection={activeSection} />

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div style={{ height: 72 }} />

      {/* Subtle textured background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          style={{ position: 'absolute', top: '12%', left: '6%', color: '#8b5a2b', opacity: 0.04 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <Settings size={130} strokeWidth={1} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', bottom: '15%', left: '12%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Code2 size={160} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: '22%', left: '42%', color: '#8b5a2b', opacity: 0.03 }}
          animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MessageSquare size={90} strokeWidth={1} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', bottom: '8%', left: '55%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Cpu size={110} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: '38%', right: '35%', color: '#8b5a2b', opacity: 0.03 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          <Triangle size={140} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: '15%', right: '15%', color: '#8b5a2b', opacity: 0.04 }}
          animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowUpRight size={100} strokeWidth={1} />
        </motion.div>
      </div>

      {/* Hero Body Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex-1 grid lg:grid-cols-12 gap-8 items-center pt-6 pb-10">
        {/* Left Side: Text, Leadership Badges, and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Greeting */}
          <div className="mb-1">
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "2.4rem",
                color: "#8b5b35",
                fontWeight: 700,
              }}
            >
              Hello, I'm
            </span>
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 text-[#1e293b]"
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}
          >
            Yash Gautam
          </h1>

          {/* Dynamic typing roles */}
          <div className="flex items-center gap-2 mb-4 h-8 sm:h-10">
            <span className="text-lg sm:text-xl font-bold text-gray-500">Full-Stack</span>
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1.8rem",
                color: "#8b5a2b",
                fontWeight: 700,
              }}
            >
              {currentText}
            </span>
            <span
              className="inline-block w-1.5 h-6 bg-[#8b5a2b] animate-pulse"
              style={{ verticalAlign: "middle" }}
            />
          </div>

          {/* Bio tagline */}
          <p
            className="text-base sm:text-lg text-gray-600 max-w-xl mb-5 leading-relaxed font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Building intelligent experiences through AI, Automation, and Modern Web Technologies.
          </p>

          {/* ── Key Leadership & Ambassador Highlights ── */}
          <div className="flex flex-wrap gap-3 mb-7 max-w-2xl">
            {/* Google Gemini CA */}
            <div
              className="group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl transition-all duration-300 hover:scale-[1.03] cursor-default"
              style={{
                background: "rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(139, 90, 43, 0.2)",
                boxShadow: "0 4px 14px rgba(139, 90, 43, 0.06)",
              }}
            >
              <div className="w-6 h-6 rounded-lg bg-[#8b5a2b]/10 flex items-center justify-center flex-shrink-0 text-[#8b5a2b]">✨</div>
              <div className="text-xs font-bold text-gray-800">Google Gemini Campus Ambassador</div>
            </div>

            {/* Techfest IIT Bombay CA */}
            <div
              className="group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl transition-all duration-300 hover:scale-[1.03] cursor-default"
              style={{
                background: "rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(139, 90, 43, 0.2)",
                boxShadow: "0 4px 14px rgba(139, 90, 43, 0.06)",
              }}
            >
              <div className="w-6 h-6 rounded-lg bg-[#8b5a2b]/10 flex items-center justify-center flex-shrink-0 text-[#8b5a2b]">🎓</div>
              <div className="text-xs font-bold text-gray-800">Techfest, IIT Bombay Ambassador</div>
            </div>

            {/* LaunchByte Founder Card */}
            <div
              className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl transition-all duration-300 hover:scale-[1.04]"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(253,246,238,0.85) 100%)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(139, 90, 43, 0.3)",
                boxShadow: "0 6px 18px rgba(139, 90, 43, 0.12)",
              }}
            >
              <img
                src={launchByteLogo}
                alt="LaunchByte Community"
                className="w-6 h-6 rounded-full object-cover border border-[#8b5a2b]/30"
              />
              <div className="text-xs font-extrabold text-[#704720]">Founder @ LaunchByte</div>
              <div className="flex items-center gap-1.5 ml-1">
                <a
                  href="https://chat.whatsapp.com/DfB8awNjkjj7UkB5h2eW1e"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Join our WhatsApp Community"
                  className="p-1 rounded-md bg-[#25d366]/10 text-[#128c7e] hover:bg-[#25d366] hover:text-white transition-colors"
                >
                  <MessageSquare size={13} />
                </a>
                <a
                  href="https://www.linkedin.com/company/launchbytehq/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow us on LinkedIn"
                  className="p-1 rounded-md bg-[#0a66c2]/10 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white transition-colors"
                >
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => handleScrollTo('projects-section')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-white text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #8b5a2b 0%, #704720 100%)" }}
            >
              <span>View My Work</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => handleScrollTo('end-section')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[#8b5a2b] text-sm font-extrabold border-2 border-[#8b5a2b]/30 hover:border-[#8b5a2b] bg-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Let's Connect</span>
              <Send size={15} />
            </button>
          </div>
        </motion.div>

        {/* Mobile/Tablet Portrait Image */}
        <div className="lg:hidden flex justify-center items-center mt-6 w-full">
          <div className="relative w-full max-w-[340px] aspect-[4/5]" style={{ overflow: "visible", background: "transparent" }}>
            <img
              src={userPhoto}
              alt="Yash Gautam Portrait"
              className="w-full h-full object-cover select-none"
              style={{
                opacity: 0.92,
                maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, black 50%), linear-gradient(to top, transparent 0%, black 12%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, black 50%), linear-gradient(to top, transparent 0%, black 12%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in"
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop-only: Large Portrait Image */}
      <div
        className="absolute right-0 bottom-0 h-[96vh] w-[50%] pointer-events-none z-0 hidden lg:flex items-end justify-end"
        style={{ background: "transparent", overflow: "visible" }}
      >
        <motion.img
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          src={userPhoto}
          alt="Yash Gautam Portrait"
          className="h-[115%] w-auto object-contain object-bottom select-none"
          style={{
            opacity: 0.88,
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 18%, black 48%), linear-gradient(to top, transparent 0%, black 12%), linear-gradient(to bottom, transparent 0%, black 15%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 18%, black 48%), linear-gradient(to top, transparent 0%, black 12%), linear-gradient(to bottom, transparent 0%, black 15%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in"
          }}
        />
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.a
          href="https://wa.me/919557393926"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl cursor-pointer"
          whileHover={{ scale: 1.12, rotate: 8 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact Yash on WhatsApp"
        >
          {/* Official WhatsApp logo */}
          <svg viewBox="0 0 32 32" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#fff"/>
            <path fill="#25D366" d="M16 3.2A12.8 12.8 0 0 0 5.18 22.5L3.2 28.8l6.46-1.95A12.8 12.8 0 1 0 16 3.2z"/>
            <path fill="#fff" d="M22.25 19.57c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.61.07a7.7 7.7 0 0 1-2.27-1.4 8.5 8.5 0 0 1-1.57-1.95c-.16-.28 0-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.49h-.55a1.06 1.06 0 0 0-.77.36 3.23 3.23 0 0 0-1 2.4 5.6 5.6 0 0 0 1.17 2.97c.14.19 2.03 3.1 4.92 4.35.69.3 1.22.47 1.64.6a3.95 3.95 0 0 0 1.81.11 2.96 2.96 0 0 0 1.94-1.37 2.4 2.4 0 0 0 .17-1.37c-.08-.12-.29-.19-.57-.33z"/>
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
