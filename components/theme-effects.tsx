"use client";

import { useEffect, useMemo, useState } from "react";
import { getActiveTheme, type ThemeConfig } from "@/lib/theme";
import themesData from "@/data/themes.json";

const EFFECT_LABELS: Record<string, string> = {
  snow: "Neve caindo",
  fireworks: "Fogos de artifício",
  hearts: "Corações flutuando",
  easter: "Ovos de Páscoa",
  bats: "Morcegos",
  confetti: "Confetes",
  crosses: "Símbolos de saúde",
  balloons: "Balões",
};

function useActiveEffect() {
  const [effect, setEffect] = useState<string | null>(null);

  useEffect(() => {
    const config = themesData as ThemeConfig;
    const active = getActiveTheme(config);
    setEffect(active.effect || null);
  }, []);

  return effect;
}

function SnowEffect() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        opacity: 0.4 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="absolute rounded-full bg-white shadow-sm"
          style={{
            left: f.left,
            top: `-12px`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animation: `snow-fall ${f.duration}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes snow-fall {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(25vh) translateX(10px);
          }
          50% {
            transform: translateY(50vh) translateX(-10px);
          }
          75% {
            transform: translateY(75vh) translateX(8px);
          }
          100% {
            transform: translateY(110vh) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

function HeartsEffect() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
        color: ["#E91E63", "#F48FB1", "#EC407A", "#F06292"][Math.floor(Math.random() * 4)],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: h.left,
            bottom: `-30px`,
            fontSize: h.size,
            color: h.color,
            animation: `heart-rise ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        >
          ♥
        </span>
      ))}
      <style jsx>{`
        @keyframes heart-rise {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function EasterEffect() {
  const eggs = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 16 + Math.random() * 18,
        delay: Math.random() * 5,
        duration: 7 + Math.random() * 5,
        rotation: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {eggs.map((e) => (
        <span
          key={e.id}
          className="absolute rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-white/30 shadow-sm"
          style={{
            left: e.left,
            top: `-30px`,
            width: e.size,
            height: e.size * 1.25,
            background: `linear-gradient(135deg, ${["#F48FB1", "#CE93D8", "#81D4FA", "#A5D6A7", "#FFF59D"][e.id % 5]}, #ffffff)`,
            animation: `easter-fall ${e.duration}s linear ${e.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes easter-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function ConfettiEffect() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 8 + Math.random() * 8,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
        color: ["#F59E0B", "#1E88E5", "#10B981", "#EC4899", "#8B5CF6"][Math.floor(Math.random() * 5)],
        shape: Math.random() > 0.5 ? "50%" : "0",
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: `-12px`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function BatsEffect() {
  const bats = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 16 + Math.random() * 14,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {bats.map((b) => (
        <span
          key={b.id}
          className="absolute text-slate-900"
          style={{
            left: b.left,
            top: `-30px`,
            fontSize: b.size,
            animation: `bat-fly ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        >
          🦇
        </span>
      ))}
      <style jsx>{`
        @keyframes bat-fly {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(50vh) translateX(40px);
          }
          100% {
            transform: translateY(110vh) translateX(-30px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function CrossesEffect() {
  const crosses = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 14 + Math.random() * 12,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {crosses.map((c) => (
        <span
          key={c.id}
          className="absolute text-emerald-500"
          style={{
            left: c.left,
            top: `-30px`,
            fontSize: c.size,
            fontWeight: 700,
            animation: `cross-fall ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          ✚
        </span>
      ))}
      <style jsx>{`
        @keyframes cross-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function FireworksEffect() {
  const bursts = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: `${15 + Math.random() * 70}%`,
        top: `${10 + Math.random() * 40}%`,
        delay: i * 1.2 + Math.random(),
        color: ["#D4AF37", "#F59E0B", "#EC4899", "#3B82F6", "#10B981"][i % 5],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {bursts.map((b) => (
        <span
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: b.left,
            top: b.top,
            width: 8,
            height: 8,
            backgroundColor: b.color,
            boxShadow: `0 0 12px 2px ${b.color}`,
            animation: `firework-burst 3s ease-out ${b.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes firework-burst {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          40% {
            transform: scale(1);
            opacity: 0.9;
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
          100% {
            transform: scale(6);
            opacity: 0;
            box-shadow: 0 0 0 40px rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </div>
  );
}

function BalloonsEffect() {
  const balloons = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 18 + Math.random() * 18,
        delay: Math.random() * 5,
        duration: 7 + Math.random() * 5,
        color: ["#F59E0B", "#1E88E5", "#10B981", "#EC4899", "#8B5CF6", "#EF4444"][Math.floor(Math.random() * 6)],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {balloons.map((b) => (
        <span
          key={b.id}
          className="absolute rounded-full border border-white/20"
          style={{
            left: b.left,
            bottom: `-40px`,
            width: b.size,
            height: b.size * 1.2,
            background: `radial-gradient(circle at 30% 30%, ${b.color}, ${b.color}dd)`,
            animation: `balloon-rise ${b.duration}s ease-in ${b.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes balloon-rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          50% {
            transform: translateY(-50vh) translateX(15px);
          }
          100% {
            transform: translateY(-120vh) translateX(-10px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export function ThemeEffects() {
  const effect = useActiveEffect();

  if (!effect) return null;

  return (
    <>
      {effect === "snow" && <SnowEffect />}
      {effect === "hearts" && <HeartsEffect />}
      {effect === "easter" && <EasterEffect />}
      {effect === "confetti" && <ConfettiEffect />}
      {effect === "bats" && <BatsEffect />}
      {effect === "crosses" && <CrossesEffect />}
      {effect === "fireworks" && <FireworksEffect />}
      {effect === "balloons" && <BalloonsEffect />}
    </>
  );
}

export { EFFECT_LABELS };
