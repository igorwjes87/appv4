"use client"

import {
  Sunrise,
  GraduationCap,
  Activity,
  ShoppingBag,
  ChevronRight,
  Headphones,
} from "lucide-react"

interface DashboardCard {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  accentColor: string
  tab: string
}

const dashboardCards: DashboardCard[] = [
  {
    id: "ativacao",
    title: "Ativacao Matinal",
    subtitle: "Complete sua rotina de hoje",
    icon: <Sunrise className="w-4 h-4" />,
    accentColor: "#FF8C42",
    tab: "home",
  },
  {
    id: "academy",
    title: "Neural Academy",
    subtitle: "6 aulas disponiveis",
    icon: <GraduationCap className="w-4 h-4" />,
    accentColor: "#00D4FF",
    tab: "academy",
  },
  {
    id: "meditar",
    title: "Meditacoes",
    subtitle: "10 sessoes guiadas",
    icon: <Headphones className="w-4 h-4" />,
    accentColor: "#A78BFA",
    tab: "meditar",
  },
  {
    id: "tracker",
    title: "Biohacker Tracker",
    subtitle: "Wiki + Scanner de rotulos",
    icon: <Activity className="w-4 h-4" />,
    accentColor: "#34D399",
    tab: "tracker",
  },
  {
    id: "lojinha",
    title: "Lojinha Neural",
    subtitle: "Ofertas em destaque",
    icon: <ShoppingBag className="w-4 h-4" />,
    accentColor: "#F59E0B",
    tab: "lojinha",
  },
]

interface HomeDashboardProps {
  onNavigateToTab: (tab: string) => void
}

export function HomeDashboard({ onNavigateToTab }: HomeDashboardProps) {
  return (
    <section className="px-5 mt-5">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Explorar
      </h2>
      <div className="grid grid-cols-2 gap-2.5">
        {dashboardCards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigateToTab(card.tab)}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-border/40 bg-card/60 text-left transition-all hover:border-border/60 active:scale-[0.98] group"
          >
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
              style={{
                background: `${card.accentColor}15`,
                color: card.accentColor,
              }}
            >
              {card.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[11px] font-semibold text-foreground truncate">
                {card.title}
              </h3>
              <p className="text-[10px] text-muted-foreground truncate">
                {card.subtitle}
              </p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 group-hover:text-muted-foreground transition-colors" />
          </button>
        ))}
      </div>
    </section>
  )
}
