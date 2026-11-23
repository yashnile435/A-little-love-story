import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * FloatingHearts Animation
 * Generates floating romantic hearts and gentle starlight specks.
 * Respects prefers-reduced-motion.
 */
export const FloatingHearts = ({ count = 16 }) => {
  const shouldReduceMotion = useReducedMotion();

  // Generate deterministic particle configurations
  const particles = useMemo(() => {
    const items = [];
    const heartSymbols = ["♡", "♥", "❤", "✨", "✧"];

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        symbol: heartSymbols[i % heartSymbols.length],
        left: `${(i * 100) / count + (Math.sin(i * 99) * 4)}%`,
        size: 14 + (i % 5) * 4,
        duration: 12 + (i % 6) * 3,
        delay: (i * 0.7) % 6,
        opacity: 0.12 + (i % 4) * 0.08,
        sway: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15),
      });
    }
    return items;
  }, [count]);

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.slice(0, 8).map((p) => (
          <span
            key={p.id}
            style={{
              left: p.left,
              top: `${20 + (p.id * 8)}%`,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
            }}
            className="absolute text-[#f48fa3] select-none"
          >
            {p.symbol}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute select-none text-[#e85d7b]"
          style={{
            left: particle.left,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          initial={{ y: "105vh", x: 0, opacity: 0 }}
          animate={{
            y: ["105vh", "-10vh"],
            x: [0, particle.sway, 0, -particle.sway, 0],
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
};
