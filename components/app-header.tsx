"use client"

import { useState, useEffect } from "react"
import { Zap, Bell } from "lucide-react"
import { NotificationsPanel } from "@/components/notifications-panel"

export function AppHeader() {
  const [daysLeft, setDaysLeft] = useState(8)
  const [greeting, setGreeting] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Bom dia")
    else if (hour < 18) setGreeting("Boa tarde")
    else setGreeting("Boa noite")
  }, [])

  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 neon-glow">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{greeting}</p>
          <h1 className="text-base font-semibold text-foreground tracking-tight">Método Neural</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 neon-border border">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">
            {daysLeft} dias grátis
          </span>
        </div>
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-secondary transition-colors hover:bg-secondary/80"
          aria-label="Notificações"
        >
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  )
}
