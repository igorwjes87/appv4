// ============================================================
// GEMINI API - Preparacao para Scanner de Rotulos com IA
// ============================================================
// Quando integrar:
// 1. Obtenha uma API key em https://ai.google.dev/
// 2. Adicione NEXT_PUBLIC_GEMINI_API_KEY nas env vars
// 3. Substitua analyzeLabel() pela chamada real
// ============================================================

export interface ScanResult {
  productName: string
  score: number
  found: { code: string; name: string; risk: "alto" | "medio" | "baixo" }[]
  safe: string[]
  analysis?: string
  shopRecommendation?: { name: string; reason: string }
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

/**
 * Analisa a imagem de um rotulo usando Gemini Vision.
 * Atualmente retorna mock - substituir pela chamada real.
 *
 * Uso futuro:
 * ```
 * const result = await analyzeLabel(base64Image)
 * ```
 */
export async function analyzeLabel(_imageBase64: string): Promise<ScanResult> {
  // TODO: Integrar com Gemini API
  // const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     contents: [{
  //       parts: [
  //         { text: "Analise este rotulo de alimento..." },
  //         { inlineData: { mimeType: "image/jpeg", data: _imageBase64 } }
  //       ]
  //     }]
  //   })
  // })

  // Mock para demonstracao
  return {
    productName: "Produto Exemplo",
    score: 50,
    found: [
      { code: "E951", name: "Aspartame", risk: "alto" },
    ],
    safe: ["Agua", "Acucar"],
    analysis: "Analise detalhada requer plano PRO.",
  }
}

/**
 * Verifica se a Gemini API key esta configurada
 */
export function isGeminiConfigured(): boolean {
  return !!GEMINI_API_KEY && GEMINI_API_KEY.length > 0
}
