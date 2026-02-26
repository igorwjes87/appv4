"use client"

import { useState, useEffect } from "react"
import { Sunrise, Check, RotateCcw, ChevronDown, ChevronUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const STORAGE_KEY = "neural-morning-checklist"
const ACTIVATION_STORAGE_KEY = "neural-morning-activation-v2"

interface CheckItem {
  id: string
  label: string
  checked: boolean
}

interface ActivationFields {
  intention: string
  courage: string
  priority: string
  noise: string
  notes: string
  observation: string
}

const emptyActivation: ActivationFields = {
  intention: "",
  courage: "",
  priority: "",
  noise: "",
  notes: "",
  observation: "",
}

function loadActivation(): ActivationFields | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(ACTIVATION_STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as { fields: ActivationFields; date: string }
    const today = new Date().toDateString()
    if (data.date !== today) return null
    return data.fields
  } catch {
    return null
  }
}

function saveActivation(fields: ActivationFields) {
  if (typeof window === "undefined") return
  localStorage.setItem(
    ACTIVATION_STORAGE_KEY,
    JSON.stringify({ fields, date: new Date().toDateString() })
  )
}

const defaultItems: CheckItem[] = [
  { id: "1", label: "Copo de agua com limao", checked: false },
  { id: "2", label: "10 min de luz solar", checked: false },
  { id: "3", label: "Journaling (3 paginas)", checked: false },
  { id: "4", label: "Meditacao de 5 min", checked: false },
  { id: "5", label: "Exercicio fisico (20 min)", checked: false },
]

function loadChecklist(): CheckItem[] | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as { items: CheckItem[]; date: string }
    const today = new Date().toDateString()
    if (data.date !== today) return null
    return data.items
  } catch {
    return null
  }
}

function saveChecklist(items: CheckItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ items, date: new Date().toDateString() })
  )
}

interface FieldConfig {
  key: keyof ActivationFields
  label: string
  placeholder: string
  color: string
  minRows: number
}

const fieldConfigs: FieldConfig[] = [
  {
    key: "intention",
    label: "Intencao do Dia",
    placeholder: "Qual e minha intencao para hoje?",
    color: "#00D4FF",
    minRows: 2,
  },
  {
    key: "courage",
    label: "Coragem",
    placeholder: "Qual desafio vou enfrentar hoje?",
    color: "#F59E0B",
    minRows: 2,
  },
  {
    key: "priority",
    label: "Prioridade #1",
    placeholder: "Minha tarefa de maior alavancagem",
    color: "#34D399",
    minRows: 2,
  },
  {
    key: "noise",
    label: "Ruidos Mentais",
    placeholder: "O que esta tirando meu foco? Preocupacoes, distrações...",
    color: "#FF4D6A",
    minRows: 3,
  },
  {
    key: "notes",
    label: "Anotacoes",
    placeholder: "Ideias, lembretes, insights do momento...",
    color: "#A78BFA",
    minRows: 3,
  },
  {
    key: "observation",
    label: "Observacao do Dia",
    placeholder: "Como estou me sentindo agora? Estado fisico e mental.",
    color: "#EC4899",
    minRows: 2,
  },
]

export function MorningActivation() {
  const [items, setItems] = useState<CheckItem[]>(defaultItems)
  const [hydrated, setHydrated] = useState(false)
  const [activation, setActivation] = useState<ActivationFields>(emptyActivation)
  const [checklistOpen, setChecklistOpen] = useState(true)

  useEffect(() => {
    const saved = loadChecklist()
    if (saved) setItems(saved)
    const savedActivation = loadActivation()
    if (savedActivation) setActivation(savedActivation)
    setHydrated(true)
  }, [])

  const updateActivation = (field: keyof ActivationFields, value: string) => {
    setActivation((prev) => {
      const updated = { ...prev, [field]: value }
      saveActivation(updated)
      return updated
    })
  }

  const toggleItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
      saveChecklist(updated)
      return updated
    })
  }

  const resetChecklist = () => {
    const reset = defaultItems.map((i) => ({ ...i, checked: false }))
    setItems(reset)
    saveChecklist(reset)
    setActivation(emptyActivation)
    saveActivation(emptyActivation)
  }

  const completedCount = items.filter((i) => i.checked).length
  const progressValue = (completedCount / items.length) * 100
  const allDone = completedCount === items.length

  return (
    <section className="px-5 pt-2 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FF8C42]/10">
            <Sunrise className="w-4 h-4 text-[#FF8C42]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Ativacao Matinal</h2>
            <p className="text-xs text-muted-foreground">
              {completedCount}/{items.length} concluidos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetChecklist}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Resetar tudo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono text-primary tabular-nums">
            {hydrated ? `${Math.round(progressValue)}%` : "..."}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <Progress
          value={hydrated ? progressValue : 0}
          className="h-1.5 bg-secondary"
        />
      </div>

      {/* All done celebration */}
      {allDone && hydrated && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#34D399]/10 border border-[#34D399]/20 mb-5">
          <Check className="w-4 h-4 text-[#34D399]" />
          <span className="text-xs text-[#34D399] font-medium">
            Ativacao completa! Seu cerebro agradece.
          </span>
        </div>
      )}

      {/* Activation Fields - Expandable Textareas */}
      <div className="flex flex-col gap-4 mb-6">
        {fieldConfigs.map((cfg) => (
          <div key={cfg.key}>
            <label
              htmlFor={`activation-${cfg.key}`}
              className="text-[10px] font-semibold uppercase tracking-wider mb-1.5 block"
              style={{ color: cfg.color }}
            >
              {cfg.label}
            </label>
            <textarea
              id={`activation-${cfg.key}`}
              value={activation[cfg.key]}
              onChange={(e) => updateActivation(cfg.key, e.target.value)}
              placeholder={cfg.placeholder}
              rows={cfg.minRows}
              className="w-full bg-secondary/60 border border-border/60 rounded-xl px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 resize-y focus:outline-none focus:ring-1 transition-all leading-relaxed"
              style={{
                minHeight: `${cfg.minRows * 2.2}rem`,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = `${cfg.color}40`
                e.currentTarget.style.boxShadow = `0 0 0 1px ${cfg.color}30`
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = ""
                e.currentTarget.style.boxShadow = ""
              }}
            />
          </div>
        ))}
      </div>

      {/* Checklist section - collapsible */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <button
          onClick={() => setChecklistOpen(!checklistOpen)}
          className="flex items-center justify-between w-full p-4 text-left"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Checklist</span>
            <span className="text-[10px] text-muted-foreground">
              ({completedCount}/{items.length})
            </span>
          </div>
          {checklistOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {checklistOpen && (
          <div className="px-4 pb-4 flex flex-col gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-left ${
                  item.checked
                    ? "bg-primary/5"
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-300 shrink-0 ${
                    item.checked
                      ? "bg-primary border-primary neon-glow"
                      : "border-border"
                  }`}
                >
                  {item.checked && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                <span
                  className={`text-sm transition-all duration-300 ${
                    item.checked
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Persistence hint */}
      <p className="text-[10px] text-muted-foreground/40 text-center mt-4">
        Progresso salvo automaticamente. Reseta todo dia.
      </p>
    </section>
  )
}
