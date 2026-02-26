// ============================================================
// MEDIA LINKS - Cole suas URLs aqui!
// ============================================================
// Para playlists: Spotify abre em nova aba, Google Drive toca inline.
// Para vídeos: YouTube incorpora via iframe, Google Drive usa preview.
//
// Formatos aceitos:
//   Spotify:     "https://open.spotify.com/..."
//   Google Drive: "https://drive.google.com/file/d/FILE_ID/view"
//   YouTube:     "https://www.youtube.com/watch?v=VIDEO_ID"
//                "https://youtu.be/VIDEO_ID"
// ============================================================

export interface PlaylistLink {
  id: string
  title: string
  subtitle: string
  duration: string
  /** URL do Spotify ou Google Drive */
  url: string
  accentColor: string
  icon: "gamma" | "flow" | "dopamine" | "alpha"
}

export interface MeditationLink {
  id: string
  title: string
  description: string
  duration: string
  /** URL do Spotify ou Google Drive */
  url: string
  category: "foco" | "sono" | "ansiedade" | "energia" | "clareza"
  /** true = disponivel para usuarios free (primeiro de cada categoria) */
  isFree?: boolean
}

export interface VideoLink {
  id: string
  title: string
  description: string
  /** URL do YouTube ou Google Drive */
  url: string
  /** Thumbnail opcional - se vazio, usa placeholder */
  thumbnail?: string
  duration?: string
  category?: string
}

// ============================================================
// PLAYLISTS NEURAIS - Cole os links de áudio aqui
// ============================================================
export const playlistLinks: PlaylistLink[] = [
  {
    id: "gamma",
    title: "Foco Gamma",
    subtitle: "Concentração intensa",
    duration: "45 min",
    url: "https://open.spotify.com/playlist/exemplo-gamma",
    accentColor: "#00D4FF",
    icon: "gamma",
  },
  {
    id: "flow",
    title: "Neural Flow",
    subtitle: "Estado de fluxo criativo",
    duration: "60 min",
    url: "https://open.spotify.com/playlist/exemplo-flow",
    accentColor: "#A78BFA",
    icon: "flow",
  },
  {
    id: "dopamine",
    title: "Ativação Dopaminérgica",
    subtitle: "Energia e motivação",
    duration: "30 min",
    url: "https://drive.google.com/file/d/EXEMPLO_DOPAMINE_ID/view",
    accentColor: "#F59E0B",
    icon: "dopamine",
  },
  {
    id: "alpha",
    title: "Ondas Alpha",
    subtitle: "Relaxamento profundo",
    duration: "50 min",
    url: "https://drive.google.com/file/d/EXEMPLO_ALPHA_ID/view",
    accentColor: "#34D399",
    icon: "alpha",
  },
]

// ============================================================
// NEURAL ACADEMY - Cole os links de vídeo aqui
// ============================================================
export const videoLinks: VideoLink[] = [
  {
    id: "v1",
    title: "Neurociência do Foco",
    description: "Como hackear sua atenção com técnicas baseadas em ciência",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "15 min",
    category: "Fundamentos",
  },
  {
    id: "v2",
    title: "Rotina Matinal Neural",
    description: "O passo a passo da ativação matinal completa",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "22 min",
    category: "Prática",
  },
  {
    id: "v3",
    title: "Dopamina e Produtividade",
    description: "Entenda o ciclo de recompensa e como usá-lo a seu favor",
    url: "https://drive.google.com/file/d/EXEMPLO_VIDEO_ID/view",
    duration: "18 min",
    category: "Fundamentos",
  },
  {
    id: "v4",
    title: "Meditação Guiada - Nível 1",
    description: "Sessão guiada para iniciantes no método",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "10 min",
    category: "Prática",
  },
  {
    id: "v5",
    title: "Ondas Cerebrais Explicadas",
    description: "Alpha, Beta, Gamma, Theta - o que cada uma faz",
    url: "https://drive.google.com/file/d/EXEMPLO_VIDEO2_ID/view",
    duration: "12 min",
    category: "Fundamentos",
  },
  {
    id: "v6",
    title: "Journaling para Clareza Mental",
    description: "Técnica de 3 páginas para desbloquear seu pensamento",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "8 min",
    category: "Prática",
  },
]

// ============================================================
// MEDITACOES GUIADAS - Cole os links de audio aqui
// ============================================================
export const meditationLinks: MeditationLink[] = [
  {
    id: "med-foco-1",
    title: "Foco Absoluto",
    description: "Meditacao guiada para concentracao profunda e clareza mental.",
    duration: "10 min",
    url: "https://open.spotify.com/track/exemplo-foco-1",
    category: "foco",
    isFree: true,
  },
  {
    id: "med-foco-2",
    title: "Deep Work Meditation",
    description: "Prepare sua mente para sessoes de trabalho profundo.",
    duration: "15 min",
    url: "https://drive.google.com/file/d/EXEMPLO_FOCO_2/view",
    category: "foco",
  },
  {
    id: "med-sono-1",
    title: "Sono Reparador",
    description: "Relaxamento progressivo para induzir sono profundo.",
    duration: "20 min",
    url: "https://open.spotify.com/track/exemplo-sono-1",
    category: "sono",
    isFree: true,
  },
  {
    id: "med-sono-2",
    title: "Delta Waves Sleep",
    description: "Ondas delta para transicao suave ao sono profundo.",
    duration: "30 min",
    url: "https://drive.google.com/file/d/EXEMPLO_SONO_2/view",
    category: "sono",
  },
  {
    id: "med-ansiedade-1",
    title: "Calma Interior",
    description: "Tecnicas de respiracao para aliviar ansiedade aguda.",
    duration: "8 min",
    url: "https://open.spotify.com/track/exemplo-ansiedade-1",
    category: "ansiedade",
    isFree: true,
  },
  {
    id: "med-ansiedade-2",
    title: "Reset do Sistema Nervoso",
    description: "Ativacao do sistema nervoso parassimpatico.",
    duration: "12 min",
    url: "https://drive.google.com/file/d/EXEMPLO_ANSIEDADE_2/view",
    category: "ansiedade",
  },
  {
    id: "med-energia-1",
    title: "Energia Matinal",
    description: "Ativacao energetica para comecar o dia com disposicao.",
    duration: "7 min",
    url: "https://open.spotify.com/track/exemplo-energia-1",
    category: "energia",
    isFree: true,
  },
  {
    id: "med-energia-2",
    title: "Power Nap Guidado",
    description: "Cochilo estrategico de 20 min para recarregar.",
    duration: "20 min",
    url: "https://drive.google.com/file/d/EXEMPLO_ENERGIA_2/view",
    category: "energia",
  },
  {
    id: "med-clareza-1",
    title: "Clareza de Decisao",
    description: "Meditacao para tomar decisoes com mais clareza.",
    duration: "12 min",
    url: "https://open.spotify.com/track/exemplo-clareza-1",
    category: "clareza",
    isFree: true,
  },
  {
    id: "med-clareza-2",
    title: "Visao de Futuro",
    description: "Visualizacao guiada para alinhar metas e proposito.",
    duration: "18 min",
    url: "https://drive.google.com/file/d/EXEMPLO_CLAREZA_2/view",
    category: "clareza",
  },
]

// ============================================================
// HELPERS - Detectam o tipo do link automaticamente
// ============================================================

export function isSpotifyUrl(url: string): boolean {
  return url.includes("open.spotify.com")
}

export function isGoogleDriveUrl(url: string): boolean {
  return url.includes("drive.google.com")
}

export function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be")
}

/**
 * Extrai o ID do arquivo do Google Drive
 * Ex: "https://drive.google.com/file/d/ABC123/view" -> "ABC123"
 */
export function getGoogleDriveFileId(url: string): string | null {
  const match = url.match(/\/file\/d\/([^/]+)/)
  return match ? match[1] : null
}

/**
 * Gera URL de áudio direto do Google Drive
 */
export function getGoogleDriveAudioUrl(url: string): string | null {
  const fileId = getGoogleDriveFileId(url)
  if (!fileId) return null
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

/**
 * Gera URL de preview do Google Drive (para vídeos)
 */
export function getGoogleDrivePreviewUrl(url: string): string | null {
  const fileId = getGoogleDriveFileId(url)
  if (!fileId) return null
  return `https://drive.google.com/file/d/${fileId}/preview`
}

/**
 * Extrai o ID do vídeo do YouTube
 * Ex: "https://www.youtube.com/watch?v=ABC123" -> "ABC123"
 * Ex: "https://youtu.be/ABC123" -> "ABC123"
 */
export function getYouTubeVideoId(url: string): string | null {
  const longMatch = url.match(/[?&]v=([^&]+)/)
  if (longMatch) return longMatch[1]
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return shortMatch[1]
  return null
}

/**
 * Gera URL embed do YouTube
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url)
  if (!videoId) return null
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
}
