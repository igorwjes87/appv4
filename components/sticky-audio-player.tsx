"use client"

import { useAudioPlayer } from "@/lib/audio-context"
import { Play, Pause, X } from "lucide-react"

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, "0")}`
}

export function StickyAudioPlayer() {
  const { currentTrack, isPlaying, progress, duration, pause, resume, stop, seekTo } =
    useAudioPlayer()

  if (!currentTrack) return null

  const fraction = duration > 0 ? progress / duration : 0
  const accentColor = currentTrack.accentColor || "#00D4FF"

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const frac = Math.max(0, Math.min(1, x / rect.width))
    seekTo(frac)
  }

  return (
    <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom,8px))] left-0 right-0 z-40">
      <div className="max-w-md mx-auto px-2">
        <div
          className="glass-card rounded-2xl border border-border/50 px-3 py-2.5 flex flex-col gap-1.5"
          style={{
            boxShadow: `0 -4px 20px rgba(0,0,0,0.3), 0 0 15px ${accentColor}15`,
          }}
        >
          {/* Top row: info + controls */}
          <div className="flex items-center gap-3">
            {/* Track thumbnail */}
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
              style={{ background: `${accentColor}15` }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: accentColor }}
              />
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {currentTrack.title}
              </p>
              {currentTrack.subtitle && (
                <p className="text-[10px] text-muted-foreground truncate">
                  {currentTrack.subtitle}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => (isPlaying ? pause() : resume())}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ background: `${accentColor}20` }}
                aria-label={isPlaying ? "Pausar" : "Continuar"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" style={{ color: accentColor }} />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: accentColor }} />
                )}
              </button>
              <button
                onClick={stop}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary/60 text-muted-foreground"
                aria-label="Fechar player"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-muted-foreground w-7 text-right tabular-nums">
              {formatTime(progress)}
            </span>
            <div
              className="flex-1 h-1 rounded-full bg-secondary/80 cursor-pointer relative"
              onClick={handleProgressClick}
              role="slider"
              aria-label="Progresso do audio"
              aria-valuenow={Math.round(fraction * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full transition-[width] duration-100"
                style={{
                  width: `${fraction * 100}%`,
                  background: accentColor,
                }}
              />
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  left: `calc(${fraction * 100}% - 5px)`,
                  background: "#07070D",
                  borderColor: accentColor,
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-muted-foreground w-7 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
