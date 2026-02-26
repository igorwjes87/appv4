"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { MorningChecklist } from "@/components/morning-checklist"
import { NeuralPlaylists } from "@/components/neural-playlists"
import { NeuralAcademy } from "@/components/neural-academy"
import { BrainDump } from "@/components/brain-dump"
import { Lojinha } from "@/components/lojinha"
import { BiohackerTracker } from "@/components/biohacker-tracker"
import { BottomNav, type Tab } from "@/components/bottom-nav"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("home")

  return (
    <div className="min-h-dvh bg-background max-w-md mx-auto relative">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-[0.03] rounded-full"
        style={{
          background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Scrollable content */}
      <main className="relative z-10">
        <AppHeader />

        {activeTab === "home" && (
          <>
            <MorningChecklist />
            <NeuralPlaylists />
          </>
        )}

        {activeTab === "academy" && <NeuralAcademy />}

        {activeTab === "braindump" && <BrainDump />}

        {activeTab === "tracker" && <BiohackerTracker />}

        {activeTab === "lojinha" && <Lojinha />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
