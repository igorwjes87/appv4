"use client"

import { Headphones } from "lucide-react"

interface GammaFocusButtonProps {
  className?: string
}

export function GammaFocusButton({ className }: GammaFocusButtonProps) {
  const gammaUrl = "https://open.spotify.com/playlist/exemplo-gamma"

  const handleClick = () => {
    window.open(gammaUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section className={`px-5 mt-6 ${className ?? ""}`}>
      <button
        onClick={handleClick}
        className="w-full relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 to-primary/5 transition-all active:scale-[0.98] animate-neon-pulse"
      >
        {/* Pulsing glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            background: "radial-gradient(circle at 30% 50%, #00D4FF 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Icon */}
        <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 shrink-0">
          <Headphones className="w-5 h-5 text-primary" />
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-xl border border-primary/30 animate-ping opacity-20" />
        </div>

        {/* Text */}
        <div className="flex-1 text-left">
          <h3 className="text-sm font-bold text-foreground neon-text">
            Audio Foco Gamma
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Ative concentracao intensa com ondas gamma
          </p>
        </div>

        {/* Play indicator */}
        <div className="flex items-center gap-0.5 shrink-0">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-0.5 rounded-full bg-primary"
              style={{
                height: `${8 + Math.sin(i * 1.2) * 6}px`,
                animation: `neon-pulse ${1 + i * 0.2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </button>
    </section>
  )
}
