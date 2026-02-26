"use client"

import { useState } from "react"
import {
  ScanLine,
  Lock,
  Crown,
  Camera,
  X,
  Pill,
  Brain,
  Moon,
  Zap,
  Heart,
  Shield,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Skull,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Sparkles,
} from "lucide-react"
import { ProModal } from "@/components/pro-modal"

interface Supplement {
  id: string
  name: string
  category: string
  icon: React.ReactNode
  shortDesc: string
  benefits: string[]
  dosage: string
  timing: string
  buyUrl?: string
}

interface HarmfulAdditive {
  code: string
  name: string
  risk: "alto" | "medio" | "baixo"
  description: string
}

interface ScanResult {
  productName: string
  score: number
  found: { code: string; name: string; risk: "alto" | "medio" | "baixo" }[]
  safe: string[]
  shopRecommendation?: { name: string; reason: string }
}

const harmfulAdditives: HarmfulAdditive[] = [
  {
    code: "E621",
    name: "Glutamato Monossodico",
    risk: "medio",
    description: "Excitotoxina que pode causar dores de cabeca, sobrecarga neuronal e aumento do apetite.",
  },
  {
    code: "E951",
    name: "Aspartame",
    risk: "alto",
    description: "Adocante artificial ligado a neurotoxicidade, alteracoes de humor e possivel carcinogenicidade.",
  },
  {
    code: "E211",
    name: "Benzoato de Sodio",
    risk: "medio",
    description: "Conservante que em combinacao com vitamina C forma benzeno, composto carcinogenico.",
  },
  {
    code: "E129",
    name: "Vermelho Allura",
    risk: "alto",
    description: "Corante artificial associado a hiperatividade em criancas e possivel genotoxicidade.",
  },
  {
    code: "E319",
    name: "TBHQ",
    risk: "alto",
    description: "Antioxidante sintetico derivado do petroleo. Pode prejudicar o sistema imunologico.",
  },
  {
    code: "E250",
    name: "Nitrito de Sodio",
    risk: "medio",
    description: "Conservante em carnes processadas. Forma nitrosaminas carcinogenicas quando aquecido.",
  },
  {
    code: "E110",
    name: "Amarelo Crepusculo",
    risk: "medio",
    description: "Corante artificial ligado a alergias, hiperatividade e possivel efeito carcinogenico.",
  },
  {
    code: "E950",
    name: "Acessulfame K",
    risk: "baixo",
    description: "Adocante sintetico com estudos inconclusivos sobre efeitos a longo prazo na microbiota.",
  },
]

const supplements: Supplement[] = [
  {
    id: "magnesio-treonato",
    name: "Magnesio Treonato",
    category: "Cognicao",
    icon: <Brain className="w-4 h-4 text-primary" />,
    shortDesc: "Atravessa a barreira hematoencefalica, melhora memoria e sono profundo.",
    benefits: [
      "Melhora memoria de curto e longo prazo",
      "Aumenta plasticidade sinaptica",
      "Regula o sono profundo (ondas delta)",
      "Reduz ansiedade e estresse",
    ],
    dosage: "144mg de magnesio elementar (2g de treonato)",
    timing: "30-60 min antes de dormir",
    buyUrl: "https://www.amazon.com.br/s?k=magnesio+treonato",
  },
  {
    id: "creatina",
    name: "Creatina Monohidratada",
    category: "Energia",
    icon: <Zap className="w-4 h-4 text-[#F59E0B]" />,
    shortDesc: "Combustivel celular para cerebro e musculos. Beneficio cognitivo comprovado.",
    benefits: [
      "Aumenta reserva de ATP cerebral",
      "Melhora raciocinio sob pressao",
      "Suporte a performance fisica",
      "Neuroprotetor",
    ],
    dosage: "3-5g por dia",
    timing: "Qualquer horario, com consistencia",
    buyUrl: "https://www.amazon.com.br/s?k=creatina+monohidratada",
  },
  {
    id: "omega3",
    name: "Omega-3 (EPA/DHA)",
    category: "Cognicao",
    icon: <Brain className="w-4 h-4 text-[#00D4FF]" />,
    shortDesc: "Acido graxo essencial para estrutura cerebral e reducao de inflamacao.",
    benefits: [
      "Componente estrutural das membranas neuronais",
      "Anti-inflamatorio sistemico",
      "Melhora humor e foco",
      "Suporte cardiovascular",
    ],
    dosage: "2-3g combinados de EPA + DHA",
    timing: "Com refeicoes gordurosas",
    buyUrl: "https://www.amazon.com.br/s?k=omega+3+epa+dha",
  },
  {
    id: "vitamina-d3",
    name: "Vitamina D3 + K2",
    category: "Base",
    icon: <Shield className="w-4 h-4 text-[#F59E0B]" />,
    shortDesc: "Hormonio essencial para imunidade, humor e funcao cognitiva.",
    benefits: [
      "Regula mais de 1000 genes",
      "Suporte imunologico",
      "Melhora humor e energia",
      "K2 direciona calcio para ossos",
    ],
    dosage: "2000-5000 UI D3 + 100-200mcg K2",
    timing: "Pela manha, com gordura",
    buyUrl: "https://www.amazon.com.br/s?k=vitamina+d3+k2",
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha KSM-66",
    category: "Adaptogeno",
    icon: <Heart className="w-4 h-4 text-[#34D399]" />,
    shortDesc: "Adaptogeno que reduz cortisol e melhora resiliencia ao estresse.",
    benefits: [
      "Reduz cortisol em ate 30%",
      "Melhora qualidade do sono",
      "Aumenta testosterona naturalmente",
      "Reduz ansiedade",
    ],
    dosage: "600mg extrato KSM-66",
    timing: "Noite, com refeicao",
    buyUrl: "https://www.amazon.com.br/s?k=ashwagandha+ksm-66",
  },
  {
    id: "l-teanina",
    name: "L-Teanina",
    category: "Foco",
    icon: <Moon className="w-4 h-4 text-[#A78BFA]" />,
    shortDesc: "Aminoacido do cha verde que promove foco calmo e ondas alpha.",
    benefits: [
      "Induz ondas cerebrais alpha",
      "Foco sem nervosismo",
      "Potencializa cafeina sem jitters",
      "Melhora qualidade do sono",
    ],
    dosage: "100-200mg (ou 2:1 com cafeina)",
    timing: "Manha com cafe ou noite para relaxar",
    buyUrl: "https://www.amazon.com.br/s?k=l-teanina",
  },
  {
    id: "lions-mane",
    name: "Lion's Mane",
    category: "Cognicao",
    icon: <Brain className="w-4 h-4 text-[#F59E0B]" />,
    shortDesc: "Cogumelo que estimula NGF e neurogenese - crescimento de novos neuronios.",
    benefits: [
      "Estimula fator de crescimento neural (NGF)",
      "Promove neurogenese",
      "Melhora memoria e aprendizado",
      "Efeito neuroprotetor",
    ],
    dosage: "500-1000mg extrato (30% polissacarideos)",
    timing: "Manha, com ou sem comida",
    buyUrl: "https://www.amazon.com.br/s?k=lions+mane+cogumelo",
  },
]

const categories = ["Todos", "Cognicao", "Energia", "Foco", "Adaptogeno", "Base"]

function getRiskColor(risk: string) {
  switch (risk) {
    case "alto": return { bg: "bg-destructive/15", text: "text-destructive", border: "border-destructive/20" }
    case "medio": return { bg: "bg-[#F59E0B]/15", text: "text-[#F59E0B]", border: "border-[#F59E0B]/20" }
    case "baixo": return { bg: "bg-[#34D399]/15", text: "text-[#34D399]", border: "border-[#34D399]/20" }
    default: return { bg: "bg-secondary", text: "text-muted-foreground", border: "border-border" }
  }
}

function getRiskLabel(risk: string) {
  switch (risk) {
    case "alto": return "Risco Alto"
    case "medio": return "Risco Medio"
    case "baixo": return "Risco Baixo"
    default: return risk
  }
}

// Simulated scan results for demonstration
const mockScanResults: ScanResult[] = [
  {
    productName: "Refrigerante Diet Cola",
    score: 25,
    found: [
      { code: "E951", name: "Aspartame", risk: "alto" },
      { code: "E950", name: "Acessulfame K", risk: "baixo" },
      { code: "E211", name: "Benzoato de Sodio", risk: "medio" },
    ],
    safe: ["Agua carbonatada", "Acido fosforico", "Cafeina"],
    shopRecommendation: {
      name: "Kit Foco Total",
      reason: "Substitua refrigerantes artificiais por nootropicos que realmente ativam seu cerebro.",
    },
  },
  {
    productName: "Salgadinho Industrializado",
    score: 15,
    found: [
      { code: "E621", name: "Glutamato Monossodico", risk: "medio" },
      { code: "E319", name: "TBHQ", risk: "alto" },
      { code: "E110", name: "Amarelo Crepusculo", risk: "medio" },
    ],
    safe: ["Farinha de milho", "Oleo vegetal"],
    shopRecommendation: {
      name: "E-book Biohacking",
      reason: "Aprenda 50+ protocolos para substituir ultraprocessados por alimentos que potencializam o cerebro.",
    },
  },
  {
    productName: "Iogurte Zero Acucar",
    score: 65,
    found: [
      { code: "E951", name: "Aspartame", risk: "alto" },
    ],
    safe: ["Leite desnatado", "Fermento lactico", "Pectina"],
    shopRecommendation: {
      name: "Magnesio Treonato Neural",
      reason: "Potencialize seu sono e cognicao com o suplemento mais eficaz para o cerebro.",
    },
  },
]

function ScannerOverlay({
  onClose,
  onScanComplete,
}: {
  onClose: () => void
  onScanComplete: (result: ScanResult) => void
}) {
  const [phase, setPhase] = useState<"scanning" | "done">("scanning")

  const startScan = () => {
    setPhase("scanning")
    setTimeout(() => {
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
      setPhase("done")
      setTimeout(() => {
        onScanComplete(randomResult)
        onClose()
      }, 500)
    }, 3500)
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/98 backdrop-blur-md">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-secondary z-20"
        aria-label="Fechar scanner"
      >
        <X className="w-5 h-5 text-foreground" />
      </button>

      <div className="flex flex-col items-center gap-5">
        {/* Scanner viewfinder */}
        <div className="relative w-72 h-72 rounded-2xl overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 bg-secondary/30" aria-hidden="true">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-primary rounded-tl-lg animate-bracket-pulse" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-primary rounded-tr-lg animate-bracket-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-primary rounded-bl-lg animate-bracket-pulse" style={{ animationDelay: "0.4s" }} />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-primary rounded-br-lg animate-bracket-pulse" style={{ animationDelay: "0.6s" }} />

          {/* Laser scan line */}
          {phase === "scanning" && (
            <div className="absolute inset-x-6 h-[2px] animate-laser-scan" style={{ top: "10%" }}>
              <div className="w-full h-full bg-primary rounded-full shadow-[0_0_15px_rgba(0,212,255,0.8),0_0_30px_rgba(0,212,255,0.4),0_0_60px_rgba(0,212,255,0.2)]" />
              {/* Glow particles */}
              <div className="absolute -top-1 left-1/4 w-1 h-1 rounded-full bg-primary/80 shadow-[0_0_6px_rgba(0,212,255,0.9)]" />
              <div className="absolute -top-0.5 left-1/2 w-0.5 h-0.5 rounded-full bg-primary/60 shadow-[0_0_4px_rgba(0,212,255,0.7)]" />
              <div className="absolute -top-1 left-3/4 w-1 h-1 rounded-full bg-primary/80 shadow-[0_0_6px_rgba(0,212,255,0.9)]" />
            </div>
          )}

          {/* Center icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Camera className="w-10 h-10 text-primary/30 mb-2" />
            <p className="text-xs text-muted-foreground text-center px-8">
              {phase === "scanning" ? "Analisando rotulo..." : "Concluido!"}
            </p>
          </div>

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(0,212,255,0.05) 0%, transparent 70%)",
            }}
          />
        </div>

        {phase === "scanning" ? (
          <div className="text-center">
            <p className="text-sm text-primary font-medium animate-pulse">Escaneando ingredientes...</p>
            <div className="flex gap-1 justify-center mt-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#34D399]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">Analise completa!</span>
          </div>
        )}

        <button
          onClick={startScan}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm neon-glow active:scale-[0.97] transition-all"
        >
          <ScanLine className="w-4 h-4" />
          {phase === "scanning" ? "Escaneando..." : "Escanear Rotulo"}
        </button>
      </div>
    </div>
  )
}

function ScanResultCard({
  result,
  onShopClick,
  onProClick,
}: {
  result: ScanResult
  onShopClick: () => void
  onProClick: () => void
}) {
  const scoreColor = result.score >= 60 ? "#34D399" : result.score >= 40 ? "#F59E0B" : "#FF4D6A"
  const scoreLabel = result.score >= 60 ? "Aceitavel" : result.score >= 40 ? "Atencao" : "Evitar"

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 overflow-hidden mb-5">
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">{result.productName}</h3>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: `${scoreColor}15` }}>
            <span className="text-lg font-bold font-mono" style={{ color: scoreColor }}>{result.score}</span>
            <span className="text-[9px] font-medium" style={{ color: scoreColor }}>/ 100</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: scoreColor }} />
          <span className="text-[11px] font-medium" style={{ color: scoreColor }}>{scoreLabel}</span>
        </div>
      </div>

      {/* Found harmful */}
      {result.found.length > 0 && (
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center gap-1.5 mb-2.5">
            <XCircle className="w-3.5 h-3.5 text-destructive" />
            <span className="text-[11px] font-semibold text-destructive">Ingredientes prejudiciais encontrados</span>
          </div>
          <div className="space-y-1.5">
            {result.found.map((item) => {
              const risk = getRiskColor(item.risk)
              return (
                <div key={item.code} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-secondary/40">
                  <span className={`text-[10px] font-bold font-mono ${risk.text}`}>{item.code}</span>
                  <span className="text-[11px] text-foreground flex-1">{item.name}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${risk.bg} ${risk.text}`}>
                    {getRiskLabel(item.risk)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Safe ingredients */}
      {result.safe.length > 0 && (
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
            <span className="text-[11px] font-semibold text-[#34D399]">Ingredientes seguros</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.safe.map((item) => (
              <span key={item} className="text-[10px] px-2 py-1 rounded-lg bg-[#34D399]/10 text-[#34D399] font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bio-Individual Analysis - PRO */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span className="text-[11px] font-semibold text-[#F59E0B]">Analise Bio-Individual</span>
          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#F59E0B]/15 text-[#F59E0B]">
            <Crown className="w-2 h-2" />
            PRO
          </span>
        </div>
        <div className="relative rounded-xl overflow-hidden">
          <div className="p-3 blur-[6px] select-none pointer-events-none" aria-hidden="true">
            <p className="text-[11px] text-secondary-foreground leading-relaxed">
              Com base no seu perfil genetico e historico de saude, este produto apresenta risco elevado para
              o seu biotipo. Recomendamos substituicao imediata por alternativas naturais que respeitam
              sua sensibilidade metabolica individual.
            </p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <button
              onClick={onProClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-[#07070D] text-[11px] font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] active:scale-[0.97] transition-all"
            >
              <Lock className="w-3 h-3" />
              Desbloquear com PRO
            </button>
          </div>
        </div>
      </div>

      {/* Shop recommendation */}
      {result.shopRecommendation && (
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-semibold text-primary">Opcao de Elite Recomendada</span>
          </div>
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/15">
            <h4 className="text-xs font-bold text-foreground mb-1">{result.shopRecommendation.name}</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              {result.shopRecommendation.reason}
            </p>
            <button
              onClick={onShopClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[11px] font-bold neon-glow active:scale-[0.97] transition-all"
            >
              <ShoppingBag className="w-3 h-3" />
              Ver na Lojinha Neural
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function BiohackerTracker({ onNavigateToShop }: { onNavigateToShop?: () => void }) {
  const [scannerOpen, setScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState<"aditivos" | "suplementos">("aditivos")
  const [proModalOpen, setProModalOpen] = useState(false)

  const filtered = supplements.filter((s) => {
    const matchesCategory =
      activeCategory === "Todos" || s.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="px-5 pt-2 pb-32">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Pill className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">
          Biohacker Tracker
        </h2>
      </div>
      <p className="text-xs text-muted-foreground mb-5 ml-[42px]">
        Escaneie rotulos e consulte a wiki de suplementos.
      </p>

      {/* Scanner Card - FREE for all */}
      <div className="relative rounded-2xl border border-primary/20 bg-card/80 overflow-hidden mb-5 animate-neon-pulse">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 shrink-0">
              <ScanLine className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Scanner de Rotulos
                </h3>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#34D399]/15 text-[#34D399]">
                  GRATIS
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                Aponte a camera para qualquer rotulo e receba uma analise basica instantanea.
              </p>
              <button
                onClick={() => setScannerOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold neon-glow transition-all active:scale-[0.97]"
              >
                <Camera className="w-3.5 h-3.5" />
                Escanear Rotulo
              </button>
            </div>
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.04]" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="none">
            <rect x="10" y="10" width="80" height="80" rx="8" stroke="#00D4FF" strokeWidth="2" />
            <line x1="10" y1="30" x2="90" y2="30" stroke="#00D4FF" strokeWidth="1" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#00D4FF" strokeWidth="1" />
            <line x1="10" y1="70" x2="90" y2="70" stroke="#00D4FF" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Scan result */}
      {scanResult && (
        <ScanResultCard
          result={scanResult}
          onShopClick={() => onNavigateToShop?.()}
          onProClick={() => setProModalOpen(true)}
        />
      )}

      {/* Scanner Modal */}
      {scannerOpen && (
        <ScannerOverlay
          onClose={() => setScannerOpen(false)}
          onScanComplete={(result) => setScanResult(result)}
        />
      )}

      {/* Section Toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setActiveSection("aditivos")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeSection === "aditivos"
              ? "bg-destructive/15 text-destructive border border-destructive/30"
              : "bg-secondary/50 text-muted-foreground border border-border/30"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Aditivos Prejudiciais
        </button>
        <button
          onClick={() => setActiveSection("suplementos")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeSection === "suplementos"
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-secondary/50 text-muted-foreground border border-border/30"
          }`}
        >
          <Pill className="w-3.5 h-3.5" />
          Wiki Suplementos
        </button>
      </div>

      {/* Harmful Additives List - Open for all */}
      {activeSection === "aditivos" && (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Skull className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">
              Lista de Aditivos Prejudiciais
            </h3>
          </div>
          <p className="text-[11px] text-muted-foreground mb-4 ml-6">
            Consulte antes de comprar. Conhecimento e gratuito.
          </p>

          <div className="space-y-2.5">
            {harmfulAdditives.map((additive) => {
              const risk = getRiskColor(additive.risk)
              const isExpanded = expandedId === additive.code

              return (
                <div
                  key={additive.code}
                  className={`rounded-xl border bg-card/60 overflow-hidden transition-all duration-300 ${risk.border}`}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : additive.code)}
                    className="w-full flex items-center gap-3 p-3.5 text-left"
                    aria-expanded={isExpanded}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${risk.bg}`}>
                      <span className={`text-xs font-bold font-mono ${risk.text}`}>
                        {additive.code}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-foreground truncate">
                          {additive.name}
                        </h4>
                        <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded ${risk.bg} ${risk.text}`}>
                          {getRiskLabel(additive.risk)}
                        </span>
                      </div>
                      {!isExpanded && (
                        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                          {additive.description}
                        </p>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-0 border-t border-border/30">
                      <div className="pt-3">
                        <p className="text-xs text-secondary-foreground leading-relaxed">
                          {additive.description}
                        </p>
                        <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-lg ${risk.bg}`}>
                          <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${risk.text}`} />
                          <p className={`text-[11px] font-medium ${risk.text}`}>
                            {additive.risk === "alto"
                              ? "Evite este aditivo sempre que possivel."
                              : additive.risk === "medio"
                                ? "Consuma com moderacao. Prefira alternativas naturais."
                                : "Baixo risco, mas monitore sua sensibilidade."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Supplements Wiki */}
      {activeSection === "suplementos" && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Pill className="w-4 h-4 text-[#A78BFA]" />
            <h3 className="text-sm font-semibold text-foreground">
              Wiki de Suplementos
            </h3>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar suplemento..."
              className="w-full bg-secondary/60 border border-border/60 rounded-xl pl-8 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/30 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-secondary/60 text-muted-foreground border border-border/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Supplement List */}
          <div className="space-y-2.5">
            {filtered.map((supp) => {
              const isExpanded = expandedId === supp.id
              return (
                <div
                  key={supp.id}
                  className="rounded-xl border border-border/40 bg-card/60 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : supp.id)}
                    className="w-full flex items-center gap-3 p-3.5 text-left"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/80 shrink-0">
                      {supp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-foreground truncate">
                          {supp.name}
                        </h4>
                        <span className="shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                          {supp.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                        {supp.shortDesc}
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-0 border-t border-border/30">
                      <div className="pt-3 space-y-3">
                        <div>
                          <h5 className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1.5">
                            Beneficios
                          </h5>
                          <ul className="space-y-1.5">
                            {supp.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11px] text-secondary-foreground">
                                <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-1 p-2.5 rounded-lg bg-secondary/40">
                            <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                              Dosagem
                            </p>
                            <p className="text-[11px] text-foreground">{supp.dosage}</p>
                          </div>
                          <div className="flex-1 p-2.5 rounded-lg bg-secondary/40">
                            <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                              Horario
                            </p>
                            <p className="text-[11px] text-foreground">{supp.timing}</p>
                          </div>
                        </div>
                        {supp.buyUrl && (
                          <a
                            href={supp.buyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-primary text-xs font-semibold transition-all hover:bg-primary/10 active:scale-[0.98]"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Comprar com Desconto
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-10 text-center">
                <Search className="w-6 h-6 text-muted-foreground/40 mb-2" />
                <p className="text-xs text-muted-foreground">Nenhum suplemento encontrado.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ProModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
    </section>
  )
}
