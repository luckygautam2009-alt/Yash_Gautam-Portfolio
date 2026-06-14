import { motion } from "motion/react";

const ORBS = [
  { size: 320, color: "radial-gradient(circle at 40% 35%, #a5c8f5, #7ba7e8)", x: "8%", y: "4%", duration: 14, delay: 0 },
  { size: 220, color: "radial-gradient(circle at 40% 35%, #f9c5d1, #f4a0b5)", x: "72%", y: "2%", duration: 18, delay: 2 },
  { size: 260, color: "radial-gradient(circle at 40% 35%, #c4b5fd, #a78bfa)", x: "80%", y: "55%", duration: 16, delay: 1 },
  { size: 180, color: "radial-gradient(circle at 40% 35%, #93c5fd, #60a5fa)", x: "5%", y: "62%", duration: 20, delay: 3 },
  { size: 150, color: "radial-gradient(circle at 40% 35%, #fdba74, #fb923c)", x: "55%", y: "78%", duration: 13, delay: 1.5 },
  { size: 100, color: "radial-gradient(circle at 40% 35%, #f0abfc, #e879f9)", x: "38%", y: "8%", duration: 17, delay: 4 },
  { size: 80, color: "radial-gradient(circle at 40% 35%, #6ee7b7, #34d399)", x: "88%", y: "22%", duration: 12, delay: 2.5 },
];

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            filter: "blur(2px)",
            opacity: 0.82,
          }}
          animate={{
            y: [0, -28, 10, -14, 0],
            x: [0, 12, -8, 16, 0],
            scale: [1, 1.04, 0.97, 1.02, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
