/**
 * Certificados (cursos EAD do SENAI-SP e curso de extensão do ICMC-USP).
 *
 * Os arquivos públicos ficam em `public/certificados/` e são versões TARJADAS: número de documento,
 * data de nascimento, QR codes e códigos de autenticação foram removidos. Veja o README
 * (seção "Atualizar certificados") antes de adicionar um novo arquivo.
 *
 * Datas no formato AAAA-MM-DD. `end` é o fim do período do curso (data de conclusão);
 * `issued` é a data de emissão do documento.
 */

export type CertificateArea = 'programacao' | 'ia' | 'dados' | 'industria'

export interface Certificate {
  slug: string
  title: string
  /** Nome oficial completo, quando for diferente do título exibido */
  officialTitle?: string
  issuer: string
  unit: string
  /** Versão curta da unidade, usada na lista */
  unitShort: string
  hours: number
  start: string
  end: string
  issued: string
  area: CertificateArea
  /** Resumo do perfil profissional, quando o certificado traz um */
  summary?: string
  /** Conteúdo programático / capacidades */
  topics: string[]
  /** Informações extras (ex.: área de conhecimento) */
  extra?: { label: string; value: string }[]
  featured?: boolean
}

export const certificateAreas: { id: CertificateArea; label: string }[] = [
  { id: 'programacao', label: 'Programação' },
  { id: 'ia', label: 'Inteligência artificial' },
  { id: 'dados', label: 'Segurança e dados' },
  { id: 'industria', label: 'Indústria e gestão' },
]

const SENAI = 'SENAI-SP'
const SJBV = 'Centro de Treinamento SENAI · São João da Boa Vista'
const SJBV_SHORT = 'EAD · São João da Boa Vista'

export const certificates: Certificate[] = [
  {
    slug: 'meninas-programadoras-icmc-usp',
    title: 'Meninas Programadoras: Introdução à Programação',
    officialTitle:
      'Curso de Férias Meninas Programadoras Multidisciplinar: Introdução à Programação para Alunas do Ensino Médio ou Concluintes (100% online)',
    issuer: 'Universidade de São Paulo',
    unit: 'ICMC-USP · Instituto de Ciências Matemáticas e de Computação, São Carlos',
    unitShort: 'ICMC · São Carlos · online',
    hours: 40,
    start: '2026-01-05',
    end: '2026-01-31',
    issued: '2026-03-04',
    area: 'programacao',
    summary: 'Curso de extensão universitária, na modalidade de difusão, de introdução à programação.',
    topics: [],
    extra: [
      { label: 'Área de conhecimento', value: 'Ciência da Computação' },
      { label: 'Avaliação final', value: 'Aprovado' },
    ],
    featured: true,
  },
  {
    slug: 'compliance-prevenir-identificar-e-corrigir',
    title: 'Compliance: Prevenir, Identificar e Corrigir',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 6,
    start: '2026-10-22',
    end: '2026-11-08',
    issued: '2026-11-10',
    area: 'dados',
    summary:
      'Aplicar princípios de ética, transparência e proteção de dados, consolidando a cultura de compliance e integridade no ambiente social e profissional.',
    topics: [
      'Conceitos, origem e pilares do compliance e da integridade organizacional',
      'Ética e transparência nas relações sociais e profissionais',
      'Protocolos de conduta e proteção de dados em redes sociais, IA e no trabalho',
      'Conflitos de interesse, dilemas éticos e crimes digitais',
    ],
  },
  {
    slug: 'cidadania-digital-e-uso-consciente-da-internet',
    title: 'Cidadania Digital e Uso Consciente da Internet',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 4,
    start: '2026-02-23',
    end: '2026-06-11',
    issued: '2026-08-13',
    area: 'dados',
    summary:
      'Uso estratégico da internet e de ferramentas de IA, com segurança digital, análise crítica de informações e atenção aos impactos do mundo digital na saúde mental.',
    topics: [
      'Legislação sobre uso da internet e proteção de dados',
      'Impactos da IA na produção de conteúdo e na disseminação de informações',
      'Ética e práticas responsáveis no uso da internet',
      'Medidas de segurança para proteção de dados e privacidade online',
    ],
  },
  {
    slug: 'fundamentos-da-gestao-de-projetos',
    title: 'Fundamentos da Gestão de Projetos Aplicados na Indústria',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 12,
    start: '2026-02-23',
    end: '2026-05-22',
    issued: '2026-05-25',
    area: 'industria',
    summary: 'Fundamentos e metodologias aplicadas na gestão de projetos industriais.',
    topics: [
      'Fundamentos da gestão de projetos',
      'Diferenças entre metodologias tradicionais e ágeis',
      'Ferramentas para aplicação do Scrum',
    ],
  },
  {
    slug: 'desvendando-a-industria-4-0',
    title: 'Desvendando a Indústria 4.0',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 20,
    start: '2026-02-23',
    end: '2026-04-25',
    issued: '2026-08-13',
    area: 'industria',
    summary:
      'Tecnologias habilitadoras e processos da Indústria 4.0 e o caminho para preparar uma empresa para elas.',
    topics: [
      'Big Data, IoT, computação em nuvem, inteligência artificial e segurança digital',
      'Robótica avançada: escolha do robô conforme a aplicação',
      'Manufatura digital e integração de sistemas',
      'Riscos da digitalização e boas práticas de segurança',
    ],
  },
  {
    slug: 'design-thinking',
    title: 'Design Thinking',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 8,
    start: '2026-02-23',
    end: '2026-04-22',
    issued: '2026-08-13',
    area: 'industria',
    summary: 'Novas formas de pensar o processo de criação de produtos e serviços por meio do design thinking.',
    topics: [],
  },
  {
    slug: 'regulamentacao-da-lgpd-e-atuacao-da-anpd',
    title: 'Regulamentação da LGPD e Atuação da ANPD',
    issuer: SENAI,
    unit: 'Escola SENAI de Educação Online',
    unitShort: 'Escola SENAI de Educação Online',
    hours: 4,
    start: '2025-05-27',
    end: '2025-05-29',
    issued: '2026-08-13',
    area: 'dados',
    topics: [
      'Principais funções da ANPD',
      'Regulamentação da LGPD',
      'Procedimentos e sanções administrativas da ANPD',
    ],
  },
  {
    slug: 'por-dentro-da-seguranca-cibernetica',
    title: 'Por Dentro da Segurança Cibernética',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 4,
    start: '2025-03-17',
    end: '2025-06-11',
    issued: '2026-08-13',
    area: 'dados',
    summary:
      'Identificar riscos, vulnerabilidades e ameaças no contexto da segurança cibernética, de acordo com boas práticas, normas e legislações.',
    topics: ['Tipos de ameaças cibernéticas', 'Técnicas de coleta de informação', 'Técnicas de prevenção'],
  },
  {
    slug: 'seguranca-no-trabalho',
    title: 'Competência Transversal: Segurança no Trabalho',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 14,
    start: '2025-03-17',
    end: '2025-06-09',
    issued: '2026-08-13',
    area: 'industria',
    topics: [
      'Conceitos e principais acidentes de trabalho',
      'EPI e EPC',
      'Causas mais comuns dos acidentes de trabalho',
      'CIPA e mapa de risco',
    ],
  },
  {
    slug: 'etica-na-inteligencia-artificial',
    title: 'Ética na Inteligência Artificial',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 4,
    start: '2025-03-17',
    end: '2025-05-10',
    issued: '2026-08-13',
    area: 'ia',
    topics: [
      'Definição de inteligência artificial',
      'Importância da ética na IA',
      'Pilares da IA responsável',
      'Marco legal para IA',
      'Futuro da IA: desafios e oportunidades',
    ],
  },
  {
    slug: 'fluencia-fundamentos-da-inteligencia-artificial',
    title: 'Fluência: Fundamentos da Inteligência Artificial',
    issuer: SENAI,
    unit: SJBV,
    unitShort: SJBV_SHORT,
    hours: 8,
    start: '2025-03-17',
    end: '2025-05-09',
    issued: '2026-08-13',
    area: 'ia',
    summary:
      'Fundamentos da inteligência artificial para produtividade e apoio à tomada de decisão, considerando questões éticas.',
    topics: [
      'IA tradicional e IA generativa',
      'Impacto da IA nos mecanismos de pesquisa',
      'IA para produtividade em tarefas e processos de trabalho',
      'Práticas responsáveis no uso da IA',
    ],
  },
]

/** Caminhos dos arquivos públicos de cada certificado. */
export function certificateFiles(slug: string) {
  return {
    thumb: `certificados/img/${slug}-thumb.webp`,
    page1: `certificados/img/${slug}-p1.webp`,
    page2: `certificados/img/${slug}-p2.webp`,
    pdf: `certificados/pdf/${slug}.pdf`,
  }
}
