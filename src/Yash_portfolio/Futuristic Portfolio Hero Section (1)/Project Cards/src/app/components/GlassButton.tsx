import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
}

export function GlassButton({ href, children, variant = "primary", icon }: GlassButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`
        relative inline-flex items-center gap-2 px-4 py-2 rounded-xl
        overflow-hidden cursor-pointer select-none no-underline
        transition-shadow duration-300
        ${isPrimary
          ? "bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.35)] text-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.45),0_0_40px_rgba(0,212,255,0.2)]"
          : "bg-[rgba(123,44,191,0.1)] border border-[rgba(123,44,191,0.4)] text-[#bf8cff] hover:shadow-[0_0_20px_rgba(123,44,191,0.45),0_0_40px_rgba(123,44,191,0.2)]"
        }
      `}
      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.03em" }}
    >
      {/* frosted glass overlay */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isPrimary
            ? "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(0,212,255,0.02) 100%)"
            : "linear-gradient(135deg, rgba(123,44,191,0.12) 0%, rgba(123,44,191,0.02) 100%)",
          backdropFilter: "blur(8px)",
        }}
      />
      {/* shimmer sweep on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />
      <span className="relative z-10 flex items-center gap-1.5">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    </motion.a>
  );
}
