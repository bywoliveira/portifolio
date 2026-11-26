import type { IconKey } from '../components/TechIcon'

/**
 * Habilidades organizadas por categoria.
 * Regra do portfólio: cada item precisa apontar ONDE foi usado (repositório, TCC ou curso).
 * Nada de porcentagens. Para adicionar um item, copie uma linha e ajuste `name`, `icons` e `where`.
 *
 * Ficaram de fora por falta de evidência pública (podem ser incluídos quando houver projeto):
 * Node.js e Python, que aparecem no README do perfil.
 */

export interface SkillItem {
  name: string
  icons: IconKey[]
  where: string
}

export interface SkillGroup {
  id: string
  title: string
  /** Observação opcional exibida abaixo do título do grupo. */
  note?: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Back-end',
    items: [
      { name: 'PHP', icons: ['php'], where: 'Ákron (back-end, em equipe) · crud-mvc-imagem-simples · laravel---api-cep' },
      { name: 'Laravel', icons: ['laravel'], where: 'laravel---api-cep — cadastro com endereço preenchido pela API ViaCEP' },
      { name: 'APIs REST e JSON', icons: ['api'], where: 'Ákron — endpoints consumidos pelo app Flutter e pelo ESP32 · consumo da ViaCEP' },
      { name: 'Arquitetura MVC', icons: ['layers'], where: 'crud-mvc-imagem-simples · Ákron (controllers, models e views)' },
    ],
  },
  {
    id: 'dados',
    title: 'Banco de dados',
    items: [
      { name: 'MySQL', icons: ['mysql'], where: 'Ákron (PDO e consultas preparadas) · crud-mvc-imagem-simples' },
      { name: 'SQLite', icons: ['sqlite'], where: 'helloworld — persistência local no Flutter com sqflite' },
    ],
  },
  {
    id: 'web',
    title: 'Web',
    items: [
      { name: 'HTML e CSS', icons: ['html', 'css'], where: 'Layouts responsivos com media queries · PEND e portal NewsToday' },
      {
        name: 'JavaScript',
        icons: ['javascript'],
        where: 'DOM, POO, Canvas, Web Storage, geolocalização, câmera e requisições assíncronas · PEND',
      },
      { name: 'TypeScript e Angular', icons: ['typescript', 'angular'], where: 'App de exemplo com componentes e rotas · PEND' },
      { name: 'Bootstrap', icons: ['bootstrap'], where: 'Estudos de framework CSS · PEND' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    items: [
      {
        name: 'Flutter e Dart',
        icons: ['flutter', 'dart'],
        where: 'helloworld — go_router, formulários, SQLite, câmera, GPS e mapas, sensores e CRUD via HTTP',
      },
    ],
  },
  {
    id: 'iot',
    title: 'IoT',
    note: 'Contexto do TCC, em equipe: o firmware do ESP32 envia as leituras para a API PHP do Ákron.',
    items: [
      { name: 'ESP32 e sensores', icons: ['espressif'], where: 'Ákron (equipe) — DHT11, sensor UV e MQ-135, envio por HTTPS em JSON' },
      { name: 'Indústria 4.0', icons: ['cpu'], where: 'Curso Desvendando a Indústria 4.0 (SENAI, 20 h) — IoT, Big Data e integração de sistemas' },
    ],
  },
  {
    id: 'processo',
    title: 'Processo e ferramentas',
    items: [
      { name: 'Git e GitHub', icons: ['git', 'github'], where: 'Versionamento dos projetos do curso e do TCC' },
      { name: 'Scrum', icons: ['workflow'], where: 'Scrum Master no Ákron · curso Fundamentos da Gestão de Projetos (SENAI)' },
      { name: 'Design Thinking', icons: ['lightbulb'], where: 'Curso Design Thinking (SENAI, 8 h)' },
      { name: 'VS Code e Figma', icons: ['figma'], where: 'Ferramentas listadas no meu perfil do GitHub' },
    ],
  },
]
