/**
 * Informações pessoais e profissionais da Bianca.
 * Tudo o que aparece sobre ela no site sai daqui: edite este arquivo para atualizar textos e links.
 *
 * Fontes usadas na primeira versão:
 *  - perfil do GitHub (github.com/bywoliveira) e o README do perfil;
 *  - site da equipe Athenas (papel no TCC Ákron);
 *  - certificados enviados (cursos do SENAI-SP e do ICMC-USP).
 */

export interface ContactLink {
  /** Rótulo exibido (ex.: "GitHub") */
  label: string
  /** Texto curto ao lado do rótulo (ex.: "@bywoliveira") */
  handle: string
  href: string
}

export const profile = {
  name: 'Bianca Oliveira',
  fullName: 'Bianca Moreira de Oliveira',
  initials: 'BO',
  area: 'Desenvolvimento de Sistemas',
  school: 'SENAI',
  city: 'Mococa',
  state: 'SP',
  /** Coordenadas aproximadas de Mococa (SP), usadas como detalhe tipográfico. */
  coordinates: '21°28′ S · 47°00′ W',

  /** Frase de apresentação do topo (hero). */
  intro:
    'Desenvolvo sistemas web e mobile — da regra de negócio ao banco de dados. No Ákron, meu TCC no SENAI, fui Scrum Master e desenvolvedora back-end.',

  /**
   * Foto opcional. Para remover, troque o objeto inteiro por `null`.
   * A imagem atual vem do site da equipe Athenas (foi recortada e teve os metadados removidos).
   */
  photo: {
    src: 'img/bianca-oliveira-900.webp',
    srcSmall: 'img/bianca-oliveira-560.webp',
    width: 900,
    height: 1125,
    alt: 'Retrato de Bianca Oliveira: cabelo cacheado, óculos de armação fina, brinco de estrela e camiseta vermelha.',
  } as { src: string; srcSmall: string; width: number; height: number; alt: string } | null,

  /** Título editorial da seção "Sobre mim". */
  aboutTitle: 'Tecnologia para resolver problemas reais.',

  /** Parágrafos da seção "Sobre mim", em primeira pessoa. */
  about: [
    'Sou estudante de Desenvolvimento de Sistemas no SENAI, em formação técnica integrada ao Ensino Médio, em Mococa (SP). Meu interesse está em tecnologia, desenvolvimento de software e análise de dados — principalmente em como um sistema pode resolver um problema real, organizar processos e transformar informação em decisão.',
    'No TCC, o Ákron, atuei como Scrum Master e desenvolvedora back-end: organizei o fluxo de trabalho da equipe, acompanhei as atividades e trabalhei na lógica do sistema, nas APIs e na integração com o banco de dados.',
    'Fora do TCC, guardo no GitHub os projetos e estudos do curso: um CRUD em PHP com MVC, uma aplicação Laravel que consulta CEP, um laboratório de Flutter e exercícios de front-end. Também concluí o curso de extensão Meninas Programadoras, do ICMC-USP.',
  ],

  /** Ficha rápida exibida na seção "Sobre mim". */
  facts: [
    { label: 'Formação', value: 'Técnico em Desenvolvimento de Sistemas · SENAI', note: 'integrado ao Ensino Médio' },
    { label: 'TCC', value: 'Ákron', note: 'equipe Athenas · 2026' },
    { label: 'Papel no TCC', value: 'Scrum Master e back-end', note: 'lógica, APIs e banco de dados' },
    { label: 'Em foco', value: 'Sistemas web e mobile', note: 'back-end e dados' },
  ],

  /** Frase do README do perfil, usada como assinatura no fim da página. */
  quote: 'Para tudo há um tempo, um jeito e um propósito.',

  github: {
    user: 'bywoliveira',
    url: 'https://github.com/bywoliveira',
    bio: 'técnica de desenvolvimento de sistemas - SENAI',
  },

  /**
   * Canais de contato. Links com `href` vazio NÃO são exibidos.
   * Para adicionar um e-mail profissional: preencha `email` abaixo (ex.: 'nome@dominio.com').
   */
  email: '',
  contacts: [
    { label: 'GitHub', handle: '@bywoliveira', href: 'https://github.com/bywoliveira' },
    {
      label: 'LinkedIn',
      handle: 'Bianca Moreira de Oliveira',
      href: 'https://www.linkedin.com/in/bianca-moreira-de-oliveira-013059390',
    },
  ] as ContactLink[],
}

/** Lista final de contatos (inclui o e-mail somente se estiver preenchido). */
export function contactLinks(): ContactLink[] {
  const list = profile.contacts.filter((c) => c.href.trim() !== '')
  if (profile.email.trim()) {
    list.unshift({ label: 'E-mail', handle: profile.email, href: `mailto:${profile.email}` })
  }
  return list
}
