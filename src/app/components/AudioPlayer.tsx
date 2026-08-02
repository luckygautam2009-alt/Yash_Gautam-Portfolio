import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioPlayer() {
  // Start muted (browser autoplay policy requires muted for silent autoplay)
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create the audio element once on mount
  useEffect(() => {
    const audio = new Audio("/audio/bg-music.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audio.muted = true; // start muted for autoplay policy compliance

    audio.addEventListener("canplaythrough", () => setIsReady(true), { once: true });
    audioRef.current = audio;

    // Start playing immediately (muted autoplay is allowed by browsers)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — audio will start on first user interaction (toggle click)
      });
    }

    // Pause when tab is hidden, resume when tab is visible again
    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (!audioRef.current.muted) {
        // Only resume if the user had it unmuted
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Unmute & ensure it's playing
      audio.muted = false;
      if (audio.paused) {
        try { await audio.play(); } catch {}
      }
      setIsMuted(false);
    } else {
      // Mute (keep it in the "playing" state so unmuting is instant)
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const isPlaying = !isMuted;

  return (
    <>
      {/* Fixed floating button — bottom-left */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, y: 20, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        title={isPlaying ? "Mute Background Music" : "Unmute Background Music"}
        aria-label={isPlaying ? "Mute background music" : "Unmute background music"}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px 10px 13px",
          borderRadius: "999px",
          border: "1.5px solid rgba(255,255,255,0.82)",
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          boxShadow: isPlaying
            ? "0 8px 36px rgba(139,90,43,0.28), inset 0 1px 0 rgba(255,255,255,0.95)"
            : "0 6px 24px rgba(139,90,43,0.14), inset 0 1px 0 rgba(255,255,255,0.85)",
          cursor: "pointer",
          transition: "box-shadow 0.3s",
          userSelect: "none",
        }}
      >
        {/* Icon */}
        <AnimatePresence mode="wait" initial={false}>
          {isPlaying ? (
            <motion.span
              key="on"
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 size={15} style={{ color: "#8b5a2b", flexShrink: 0 }} />
            </motion.span>
          ) : (
            <motion.span
              key="off"
              initial={{ opacity: 0, scale: 0.6, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -10 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={15} style={{ color: "#9a7a60", flexShrink: 0 }} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Equalizer bars — visible only when playing */}
        <AnimatePresence initial={false}>
          {isPlaying ? (
            <motion.div
              key="bars"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "20px" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "2.5px",
                height: "14px",
                overflow: "hidden",
              }}
            >
              {[0.55, 1, 0.7, 0.88].map((_, i) => (
                <motion.span
                  key={i}
                  style={{
                    display: "block",
                    width: "3px",
                    borderRadius: "2px",
                    background: `linear-gradient(180deg, #8b5a2b, #d4a373)`,
                    minHeight: "3px",
                  }}
                  animate={{
                    height: ["30%", "100%", "45%", "85%", "30%"],
                  }}
                  transition={{
                    duration: 0.75 + i * 0.18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.12,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.span
              key="label"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#9a7a60",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              Music
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
