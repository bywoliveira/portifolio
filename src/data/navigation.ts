/** Seções da página, na ordem em que aparecem. Usado pelo header, pelo menu mobile e pela constelação lateral. */
export interface NavItem {
  id: string
  /** Rótulo do menu principal */
  label: string
  /** Rótulo curto da constelação lateral */
  short: string
  /** Aparece no menu do topo? */
  inHeader: boolean
}

export const navigation: NavItem[] = [
  { id: 'inicio', label: 'Início', short: 'Início', inHeader: true },
  { id: 'sobre', label: 'Sobre mim', short: 'Sobre', inHeader: true },
  { id: 'habilidades', label: 'Habilidades', short: 'Habilidades', inHeader: true },
  { id: 'akron', label: 'Projetos', short: 'Ákron', inHeader: true },
  { id: 'certificados', label: 'Certificados', short: 'Certificados', inHeader: true },
  { id: 'github', label: 'GitHub', short: 'Outros projetos', inHeader: false },
  { id: 'contato', label: 'Contato', short: 'Contato', inHeader: true },
]
