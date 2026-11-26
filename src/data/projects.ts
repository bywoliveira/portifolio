/**
 * Outros projetos públicos do GitHub (github.com/bywoliveira).
 * Critério: apenas repositórios reais com conteúdo relevante. Ficaram de fora o README do perfil,
 * o repositório "portifolio" (vazio no momento da análise), "tcc-main" (cópia de uma versão do TCC)
 * e "hello_world" (versão anterior do laboratório "helloworld").
 */

export interface Project {
  name: string
  description: string
  stack: string[]
  year: string
  href: string
}

export const projects: Project[] = [
  {
    name: 'tcc',
    description:
      'Primeiras versões do back-end do Ákron, de abril a junho de 2026: login, usuários, sensores, alertas e relatórios em PHP com PDO.',
    stack: ['PHP', 'MySQL', 'MVC'],
    year: '2026',
    href: 'https://github.com/bywoliveira/tcc',
  },
  {
    name: 'crud-mvc-imagem-simples',
    description:
      'CRUD em PHP organizado em MVC: login com sessão, cadastro, edição e exclusão de produtos e usuários, com envio de imagem e banco MySQL.',
    stack: ['PHP', 'MySQL', 'MVC'],
    year: '2026',
    href: 'https://github.com/bywoliveira/crud-mvc-imagem-simples',
  },
  {
    name: 'laravel---api-cep',
    description:
      'Cadastro de usuários em Laravel que preenche o endereço automaticamente a partir do CEP, consultando a API pública ViaCEP.',
    stack: ['Laravel', 'PHP', 'JavaScript'],
    year: '2026',
    href: 'https://github.com/bywoliveira/laravel---api-cep',
  },
  {
    name: 'helloworld',
    description:
      'Laboratório de Flutter do curso: layouts, navegação com go_router, formulários, SQLite, câmera, GPS e mapas, sensores do aparelho e um CRUD de tarefas consumindo uma API.',
    stack: ['Flutter', 'Dart', 'SQLite'],
    year: '2026',
    href: 'https://github.com/bywoliveira/helloworld',
  },
  {
    name: 'PEND',
    description:
      'Estudos de front-end: design responsivo, DOM, POO, Canvas, Web Storage, geolocalização e câmera, requisições assíncronas, Webpack, Angular e Bootstrap.',
    stack: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
    year: '2026',
    href: 'https://github.com/bywoliveira/PEND',
  },
]
