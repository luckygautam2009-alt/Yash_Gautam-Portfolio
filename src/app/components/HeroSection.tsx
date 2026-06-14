import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import idCardImage from '../../imports/Untitled_design__3_.png';

const skills = [
  { name: 'AI Learner', color: 'cyan' },
  { name: 'Web Developer', color: 'purple' },
  { name: 'Open Source', color: 'blue' },
  { name: 'Leadership', color: 'cyan' },
  { name: 'Hackathon Enthusiast', color: 'purple' },
  { name: 'Problem Solver', color: 'blue' },
  { name: 'Automation Builder', color: 'cyan' },
  { name: 'Tech Explorer', color: 'purple' },
];

const orbs = [
  // Mix of small, medium orbs with soft gradients matching reference
  { size: 280, left: '8%', top: '15%', gradient: 'radial-gradient(circle at 35% 35%, rgba(255, 192, 203, 0.85), rgba(255, 218, 185, 0.6))' },
  { size: 350, left: '35%', top: '8%', gradient: 'radial-gradient(circle at 35% 35%, rgba(135, 206, 235, 0.9), rgba(100, 180, 220, 0.65))' },
  { size: 220, left: '75%', top: '12%', gradient: 'radial-gradient(circle at 35% 35%, rgba(255, 182, 193, 0.8), rgba(255, 200, 180, 0.6))' },
  { size: 180, left: '3%', top: '50%', gradient: 'radial-gradient(circle at 35% 35%, rgba(230, 230, 250, 0.75), rgba(200, 200, 230, 0.55))' },
  { size: 300, left: '15%', top: '65%', gradient: 'radial-gradient(circle at 35% 35%, rgba(176, 224, 230, 0.85), rgba(135, 206, 235, 0.6))' },
  { size: 400, left: '82%', top: '55%', gradient: 'radial-gradient(circle at 35% 35%, rgba(147, 112, 219, 0.8), rgba(120, 90, 200, 0.6))' },
  { size: 240, left: '92%', top: '30%', gradient: 'radial-gradient(circle at 35% 35%, rgba(255, 218, 185, 0.75), rgba(235, 195, 165, 0.55))' },
  { size: 200, left: '88%', top: '75%', gradient: 'radial-gradient(circle at 35% 35%, rgba(176, 224, 230, 0.8), rgba(150, 200, 215, 0.6))' },
  { size: 450, left: '50%', top: '85%', gradient: 'radial-gradient(circle at 35% 35%, rgba(255, 192, 203, 0.85), rgba(240, 170, 190, 0.65))' },
  { size: 190, left: '45%', top: '5%', gradient: 'radial-gradient(circle at 35% 35%, rgba(230, 230, 250, 0.75), rgba(210, 210, 235, 0.55))' },
  { size: 260, left: '65%', top: '70%', gradient: 'radial-gradient(circle at 35% 35%, rgba(135, 206, 235, 0.8), rgba(115, 185, 220, 0.6))' },
  { size: 320, left: '25%', top: '88%', gradient: 'radial-gradient(circle at 35% 35%, rgba(255, 218, 185, 0.8), rgba(235, 195, 165, 0.6))' },
];

export function HeroSection({ onScrollDown }: { onScrollDown?: () => void }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFE5E5 0%, #E6E6FA 25%, #D8BFD8 50%, #FFDAB9 75%, #FFE4E1 100%)',
      }}
      onMouseMove={handleMouseMove}
      onWheel={(e) => { if (e.deltaY > 0) { onScrollDown?.(); } }}
    >
      {/* Floating Orbs Background Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {orbs.map((orb, index) => (
          <Orb
            key={index}
            {...orb}
            mouseX={mouseX}
            mouseY={mouseY}
            index={index}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - ID Card Section */}
          <div className="relative flex justify-center lg:justify-end items-center z-50">
            <div className="relative">
              {/* ID Card with Pendulum Animation */}
              <motion.div
                ref={cardRef}
                className="relative cursor-pointer z-50"
                style={{
                  transformOrigin: 'top center',
                }}
                initial={{ y: -600, rotateZ: 0 }}
                animate={{ y: 0, rotateZ: 0 }}
                transition={{
                  y: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    mass: 1.5,
                    delay: 0.5,
                  },
                  rotateZ: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    mass: 1.5,
                    delay: 0.5,
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  rotateZ: 0,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setIsCardHovered(true)}
                onHoverEnd={() => setIsCardHovered(false)}
              >
                <ImageWithFallback
                  src={idCardImage}
                  alt="NIET Business School ID Card"
                  className="w-[450px] h-auto rounded-2xl shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))',
                  }}
                />
              </motion.div>

              {/* Skill Chips - Outside card container with higher z-index */}
              {isCardHovered && (
                <div className="absolute inset-0 z-[100] pointer-events-none">
                  {skills.map((skill, index) => {
                    const angle = (index / skills.length) * Math.PI * 2;
                    const radius = 280;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={skill.name}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 0,
                          scale: 0.5
                        }}
                        animate={{
                          x,
                          y,
                          opacity: 1,
                          scale: 1
                        }}
                        exit={{
                          x: 0,
                          y: 0,
                          opacity: 0,
                          scale: 0.5
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          delay: index * 0.05,
                        }}
                      >
                        <div
                          className="px-5 py-2.5 rounded-full backdrop-blur-md text-sm font-bold whitespace-nowrap"
                          style={{
                            background: skill.color === 'cyan'
                              ? 'rgba(0, 180, 220, 0.25)'
                              : skill.color === 'purple'
                              ? 'rgba(120, 40, 200, 0.25)'
                              : 'rgba(30, 100, 220, 0.25)',
                            border: `2px solid ${
                              skill.color === 'cyan'
                                ? '#00B4D8'
                                : skill.color === 'purple'
                                ? '#7C3AED'
                                : '#1E64DC'
                            }`,
                            boxShadow: `0 0 25px ${
                              skill.color === 'cyan'
                                ? 'rgba(0, 180, 220, 0.6)'
                                : skill.color === 'purple'
                                ? 'rgba(124, 58, 237, 0.6)'
                                : 'rgba(30, 100, 220, 0.6)'
                            }, 0 4px 15px rgba(0,0,0,0.2)`,
                            color: skill.color === 'cyan'
                              ? '#006A7A'
                              : skill.color === 'purple'
                              ? '#5B21B6'
                              : '#0C4A8A',
                            textShadow: `0 0 15px ${
                              skill.color === 'cyan'
                                ? 'rgba(0, 180, 220, 0.8)'
                                : skill.color === 'purple'
                                ? 'rgba(124, 58, 237, 0.8)'
                                : 'rgba(30, 100, 220, 0.8)'
                            }`,
                          }}
                        >
                          {skill.name}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Introduction Panel */}
          <motion.div
            className="relative z-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div 
              className="p-10 rounded-3xl backdrop-blur-xl border border-white/30"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
              }}
            >
              <motion.h1 
                className="text-5xl font-bold mb-3 bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #1F2937 0%, #4B5563 100%)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Hi, I'm Yash Gautam 👋
              </motion.h1>
              
              <motion.h2 
                className="text-2xl font-semibold mb-6 text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                AI & Web Developer
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                Building intelligent experiences through AI, Automation and Modern Web Technologies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Focus:</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    'AI Agents',
                    'Open Source Contributions',
                    'Automation Workflows',
                    'Full Stack Development',
                    'Machine Learning Projects'
                  ].map((item, index) => (
                    <motion.li 
                      key={item}
                      className="flex items-center text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mr-3" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Social Icons */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                <a 
                  href="https://github.com/luckygautam2009-alt"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Yash Gautam GitHub Profile"
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Github className="w-5 h-5 text-gray-700" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/yash-gautam-1b9150383/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Yash Gautam LinkedIn Profile"
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Linkedin className="w-5 h-5 text-gray-700" />
                </a>
                <a 
                  href="https://www.instagram.com/yash_gautam_52/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Yash Gautam Instagram Profile"
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Instagram className="w-5 h-5 text-gray-700" />
                </a>
                <a 
                  href="mailto:luckygautam2009@gmail.com"
                  aria-label="Send Email to Yash Gautam"
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Mail className="w-5 h-5 text-gray-700" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Interactive Orb Component
function Orb({
  size,
  left,
  top,
  gradient,
  mouseX,
  mouseY,
  index
}: {
  size: number;
  left: string;
  top: string;
  gradient: string;
  mouseX: any;
  mouseY: any;
  index: number;
}) {
  const orbRef = useRef<HTMLDivElement>(null);
  const [orbPosition, setOrbPosition] = useState({ x: 0, y: 0 });
  const [isOrbHovered, setIsOrbHovered] = useState(false);

  useEffect(() => {
    if (orbRef.current) {
      const rect = orbRef.current.getBoundingClientRect();
      setOrbPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, []);

  // Calculate distance from mouse
  const distance = useTransform(
    [mouseX, mouseY],
    ([mx, my]) => {
      const dx = mx - orbPosition.x;
      const dy = my - orbPosition.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  );

  // Check if mouse is hovering over orb
  useEffect(() => {
    const unsubscribe = distance.on('change', (d) => {
      setIsOrbHovered(d < size / 2);
    });
    return unsubscribe;
  }, [distance, size]);

  // Enhanced movement based on size and hover state
  const movementFactor = size > 300 ? 0.025 : size > 200 ? 0.035 : 0.05;
  const hoverBoost = isOrbHovered ? 1.5 : 1;

  const x = useTransform(distance, (d) => {
    const dx = mouseX.get() - orbPosition.x;
    return d < 400 ? dx * movementFactor * hoverBoost : 0;
  });

  const y = useTransform(distance, (d) => {
    const dy = mouseY.get() - orbPosition.y;
    return d < 400 ? dy * movementFactor * hoverBoost : 0;
  });

  const springX = useSpring(x, {
    stiffness: isOrbHovered ? 80 : 50,
    damping: isOrbHovered ? 15 : 20
  });
  const springY = useSpring(y, {
    stiffness: isOrbHovered ? 80 : 50,
    damping: isOrbHovered ? 15 : 20
  });

  const scale = useSpring(isOrbHovered ? 1.15 : 1, {
    stiffness: 100,
    damping: 15
  });

  return (
    <motion.div
      ref={orbRef}
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left,
        top,
        x: springX,
        y: springY,
        scale,
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isOrbHovered ? 1.15 : 1,
        opacity: 1,
      }}
      transition={{
        scale: { duration: 1, delay: index * 0.08 },
        opacity: { duration: 0.4, delay: index * 0.08 },
      }}
    >
      {/* Floating animation wrapper with soft gradient */}
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          background: gradient,
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, Math.sin(index) * 20, 0],
        }}
        transition={{
          duration: 8 + index * 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      />
    </motion.div>
  );
}
