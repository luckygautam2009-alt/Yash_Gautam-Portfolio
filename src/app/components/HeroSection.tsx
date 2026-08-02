import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, Briefcase, FolderGit2, Code2, 
  Layers, Award, Send, Download, ArrowRight,
  Settings, MessageSquare, Cpu, Triangle, ArrowUpRight, FileText
} from 'lucide-react';
import userPhoto from '../../imports/user_photo.png';

import launchByteLogo from '../../imports/launchbyte_logo.jpg';

const NAV_ITEMS = [
  { id: 'about-section', label: 'About', icon: User },
  { id: 'evolution-section', label: 'Experience', icon: Briefcase },
  { id: 'projects-section', label: 'Projects', icon: FolderGit2 },
  { id: 'skills-section', label: 'Skills', icon: Code2 },
  { id: 'services-section', label: 'Services', icon: Layers },
  { id: 'recognition-section', label: 'Certifications', icon: Award },
  { id: 'resume', label: 'Resume', icon: FileText, href: '/resume.pdf' },
  { id: 'end-section', label: 'Contact', icon: Send },
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

export function HeroSection({ onScrollDown }: { onScrollDown?: () => void }) {
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
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
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
        (window as any).lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between"
      style={{
        background: 'transparent',
      }}
    >
      {/* Premium Header/Navigation Menu */}
      <header className="relative z-50 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Cursive Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="cursor-pointer"
          onClick={() => handleScrollTo('hero-section')}
        >
          <span 
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#6b4724", // Warm brown matching reference
              textShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            Yash.
          </span>
        </motion.div>

        {/* Navigation items (Centered in header) */}
        <nav className="hidden lg:flex items-center gap-5">
          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => {
                  if (item.href) {
                    window.open(item.href, '_blank', 'noopener,noreferrer');
                  } else {
                    handleScrollTo(item.id);
                  }
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#8b5a2b] transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/50 cursor-pointer"
              >
                <Icon size={15} className="text-[#8b5a2b]/70 group-hover:text-[#8b5a2b]" />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #8b5a2b 0%, #704720 100%)", // curating rich brown palette
            }}
          >
            <Download size={15} />
            <span>Download Resume</span>
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </header>

      {/* Subtle textured background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Shape 1: Settings (Gear) - Top Left */}
        <motion.div
          style={{ position: 'absolute', top: '12%', left: '6%', color: '#8b5a2b', opacity: 0.04 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <Settings size={130} strokeWidth={1} />
        </motion.div>

        {/* Shape 2: Code2 - Bottom Left */}
        <motion.div
          style={{ position: 'absolute', bottom: '15%', left: '12%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Code2 size={160} strokeWidth={0.8} />
        </motion.div>

        {/* Shape 3: MessageSquare - Center Top */}
        <motion.div
          style={{ position: 'absolute', top: '22%', left: '42%', color: '#8b5a2b', opacity: 0.03 }}
          animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MessageSquare size={90} strokeWidth={1} />
        </motion.div>

        {/* Shape 4: Cpu - Bottom Center */}
        <motion.div
          style={{ position: 'absolute', bottom: '8%', left: '55%', color: '#8b5a2b', opacity: 0.035 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Cpu size={110} strokeWidth={0.8} />
        </motion.div>

        {/* Shape 5: Triangle - Center Right */}
        <motion.div
          style={{ position: 'absolute', top: '38%', right: '35%', color: '#8b5a2b', opacity: 0.03 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          <Triangle size={140} strokeWidth={0.8} />
        </motion.div>

        {/* Shape 6: ArrowUpRight - Top Right */}
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
                color: "#8b5b35", // Warm medium brown
                fontWeight: 700,
              }}
            >
              Hello, I'm
            </span>
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 text-[#1e293b]"
            style={{
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.1,
            }}
          >
            Yash Gautam
          </h1>

          {/* Dynamic typing roles */}
          <div className="flex items-center gap-2 mb-4 h-8 sm:h-10">
            <span className="text-lg sm:text-xl font-bold text-gray-500">
              Full-Stack
            </span>
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
              <div className="w-6 h-6 rounded-lg bg-[#8b5a2b]/10 flex items-center justify-center flex-shrink-0 text-[#8b5a2b]">
                ✨
              </div>
              <div className="text-xs font-bold text-gray-800">
                Google Gemini Campus Ambassador
              </div>
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
              <div className="w-6 h-6 rounded-lg bg-[#8b5a2b]/10 flex items-center justify-center flex-shrink-0 text-[#8b5a2b]">
                🎓
              </div>
              <div className="text-xs font-bold text-gray-800">
                Techfest, IIT Bombay Ambassador
              </div>
            </div>

            {/* LaunchByte Founder Card (Clickable to WhatsApp / LinkedIn) */}
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
              <div className="text-xs font-extrabold text-[#704720]">
                Founder @ LaunchByte
              </div>

              {/* Action Links */}
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
              style={{
                background: "linear-gradient(135deg, #8b5a2b 0%, #704720 100%)",
              }}
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

        {/* Mobile/Tablet Portrait Image (inline grid, hidden on desktop, vignette blended) */}
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

      {/* Desktop-only: Large Portrait Image Cutout aligned to viewport edges (Avinash layout with vignette fade) */}
      <div 
        className="absolute right-0 bottom-0 h-[96vh] w-[50%] pointer-events-none z-0 hidden lg:flex items-end justify-end"
        style={{
          background: "transparent",
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible"
        }}
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

      {/* Floating WhatsApp Contact Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.a
          href="https://wa.me/919557393926" // Yash's whatsapp contact
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-lg hover:shadow-2xl cursor-pointer"
          whileHover={{ scale: 1.12, rotate: 8 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact Yash on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.983 0c3.23 0 6.262 1.255 8.537 3.535 2.275 2.279 3.528 5.311 3.524 8.535-.01 6.671-5.335 11.996-11.995 11.996-2.005 0-3.974-.499-5.729-1.452L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.535 0 10.026-4.48 10.033-10.02a9.925 9.925 0 0 0-2.93-7.147 9.9 9.9 0 0 0-7.16-2.91c-5.539 0-10.043 4.49-10.048 10.03-.001 1.93.504 3.812 1.461 5.485l-1.002 3.655 3.746-.983zm13.125-7.391c-.272-.136-1.614-.796-1.865-.887-.25-.09-.432-.136-.614.136-.182.273-.705.887-.864 1.069-.159.182-.318.204-.59.068-.272-.136-1.15-.424-2.19-1.353-.809-.721-1.355-1.612-1.514-1.886-.159-.273-.017-.42.12-.556.123-.122.272-.318.409-.477.137-.159.182-.272.272-.454.09-.182.045-.341-.022-.477-.068-.136-.614-1.477-.841-2.023-.222-.533-.443-.46-.614-.469-.158-.008-.341-.01-.523-.01a1.003 1.003 0 0 0-.727.341c-.25.273-.954.932-.954 2.272 0 1.341.977 2.636 1.114 2.818.137.182 1.92 2.931 4.653 4.114.65.281 1.157.449 1.553.575.653.208 1.248.179 1.717.109.524-.078 1.614-.659 1.841-1.295.227-.636.227-1.182.159-1.295-.068-.113-.25-.204-.523-.341z"/>
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
