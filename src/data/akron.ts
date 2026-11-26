/**
 * Estudo de caso do Ákron (TCC da equipe Athenas).
 *
 * Fontes consultadas: README, docs/ e código do repositório Nananilda/tcc (sistema web, API e
 * firmware do ESP32), README do Nananilda/app_tcc (aplicativo Flutter), apresentacao.html e a
 * página da equipe no site da Athenas. Não há métricas inventadas: números citados (intervalos de
 * envio, testes, carga de sensores) aparecem no código ou na documentação dos repositórios.
 */

export interface Screen {
  id: string
  label: string
  src: string
  width: number
  height: number
  alt: string
}

export interface AppScreen {
  id: string
  label: string
  light: string
  dark: string
  alt: string
}

export const akron = {
  name: 'Ákron',
  greek: 'Ἄκρον',
  meaning: 'Do grego antigo: extremidade, ponto mais alto, cume — a mesma raiz de acrópole.',
  title: 'Sistema integrado de monitoramento ambiental de estoques',
  summary:
    'Solução que monitora as condições ambientais de estoques integrando sensores IoT, uma plataforma web e um aplicativo móvel. O sistema acompanha temperatura, umidade, ruído, qualidade do ar, pressão e radiação UV, guarda o histórico e avisa quando algo passa do limite.',
  context: 'TCC · Técnico em Desenvolvimento de Sistemas · SENAI Mococa-SP · 2026',
  team: 'Athenas Desenvolvimento de Sistemas',

  problem: {
    lead: 'Muitas indústrias já têm sistemas de gestão consolidados — estoque, produção, ERP. Mesmo assim, falta acompanhar em tempo real as condições físicas do ambiente onde os produtos ficam guardados e são produzidos.',
    quote:
      'Sabe quanto estoque tem e quanto produziu, mas nem sempre sabe, no mesmo instante, se a temperatura está acima do tolerável ou se o ruído passou do limite.',
    quoteSource: 'Apresentação do Ákron',
    gaps: [
      { title: 'Monitoramento contínuo', text: 'Muitas medições ainda são manuais e periódicas, deixando lacunas entre uma verificação e outra.' },
      { title: 'Comunicação entre setores', text: 'A informação sobre uma condição inadequada nem sempre chega rápido a quem pode agir.' },
      { title: 'Acompanhamento em tempo real', text: 'Relatórios atrasados impedem ações preventivas e afetam produtividade, eficiência e segurança.' },
    ],
  },

  objective:
    'Desenvolver um sistema integrado para coletar, armazenar, analisar e exibir dados ambientais em tempo real, emitindo alertas quando um parâmetro ultrapassa os limites definidos.',
  solution:
    'Sensores ligados a um ESP32 enviam as medições por HTTPS, em JSON, para uma API em PHP. Os dados ficam em MySQL e chegam a uma plataforma web e a um aplicativo Flutter, com painéis, gráficos, relatórios e alertas.',

  measures: [
    { label: 'Temperatura', unit: '°C' },
    { label: 'Umidade', unit: '%' },
    { label: 'Qualidade do ar', unit: 'índice' },
    { label: 'Ruído', unit: 'dB' },
    { label: 'Pressão', unit: 'hPa' },
    { label: 'Radiação UV', unit: 'índice' },
  ],

  pipeline: [
    { id: 'sensores', title: 'Sensores', detail: 'DHT11 (temperatura e umidade), GUVA-S12SD (radiação UV) e MQ-135 (qualidade do ar).' },
    { id: 'esp32', title: 'ESP32', detail: 'Mede a cada 5 s e envia a cada 60 s, por Wi-Fi e HTTPS, com a chave do dispositivo no cabeçalho.' },
    { id: 'api', title: 'API PHP', detail: 'Autentica o dispositivo, valida o formato e a faixa física, compara com os limites e gera alertas.' },
    { id: 'mysql', title: 'MySQL', detail: 'Guarda leituras, limites, alertas, estoques e usuários, com acesso por PDO e consultas preparadas.' },
    { id: 'telas', title: 'Web e app', detail: 'Painéis, gráficos atualizados a cada 15 s, relatórios em CSV e PDF e gestão de alertas.' },
  ],
  payload: {
    lines: ['POST api/leituras.php', 'X-Chave-Sensor: ••••••••', '{ "sensor_id": 12, "valor": 24.6 }'],
    note: 'Formato do envio feito pelo firmware. Valores ilustrativos; a chave foi omitida.',
  },

  features: [
    { title: 'Monitoramento em tempo real', text: 'Seis grandezas, com gráficos por unidade e atualização automática a cada 15 segundos.' },
    { title: 'Alertas automáticos e manuais', text: 'Gerados a partir das leituras, sem duplicar irregularidades contínuas, com reconhecimento, normalização e resolução.' },
    { title: 'Limites por sensor', text: 'Faixas de atenção e crítica, inferior e superior, além do prazo esperado de comunicação.' },
    { title: 'Relatórios', text: 'Filtros por estoque, sensor, tipo, período e valor, com estatísticas e exportação em CSV e PDF.' },
    { title: 'Estoques e permissões', text: 'Cada pessoa vê apenas os estoques autorizados; a regra vale nas páginas, nas consultas e na API.' },
    { title: 'Perfis de acesso', text: 'Administrador e funcionário, senhas guardadas em hash e sessão protegida contra CSRF.' },
    { title: 'Tema claro e escuro', text: 'Na web e no aplicativo, com a preferência salva.' },
    { title: 'Auditoria', text: 'As ações administrativas ficam registradas no banco de dados.' },
  ],

  web: {
    lead: 'Plataforma em PHP e MySQL, sem dependências externas para rodar: fontes, ícones e Chart.js ficam no próprio projeto. Responsiva, nos temas claro e escuro.',
    screens: [
      {
        id: 'painel',
        label: 'Painel',
        src: 'akron/web-painel.webp',
        width: 1280,
        height: 1860,
        alt: 'Painel do sistema web do Ákron com o resumo dos estoques, as condições atuais de temperatura, umidade e qualidade do ar e gráficos das últimas 24 horas.',
      },
      {
        id: 'monitoramento',
        label: 'Monitoramento',
        src: 'akron/web-monitoramento.webp',
        width: 1280,
        height: 1600,
        alt: 'Tela de monitoramento com filtros por estoque, sensor, tipo de medição e período, e as leituras atuais de cada sensor.',
      },
      {
        id: 'estoques',
        label: 'Estoques',
        src: 'akron/web-estoques.webp',
        width: 1280,
        height: 800,
        alt: 'Lista de estoques com a situação de cada um, a quantidade de sensores e os alertas ativos.',
      },
      {
        id: 'alertas',
        label: 'Alertas',
        src: 'akron/web-alertas.webp',
        width: 1280,
        height: 800,
        alt: 'Tela de alertas com filtros, contadores por gravidade e exportação em CSV e PDF.',
      },
      {
        id: 'sensor',
        label: 'Sensor',
        src: 'akron/web-sensor.webp',
        width: 1280,
        height: 800,
        alt: 'Detalhe de um sensor de temperatura com identificação, situação da comunicação e limites de atenção e crítico.',
      },
    ] as Screen[],
    mobile: [
      { src: 'akron/web-login-celular.webp', alt: 'Tela de login do sistema web em um celular, no tema claro.' },
      {
        src: 'akron/web-monitoramento-celular-escuro.webp',
        alt: 'Tela de monitoramento do sistema web em um celular, no tema escuro.',
      },
    ],
  },

  app: {
    lead: 'Aplicativo em Flutter para Android, iOS, web e desktop. Usa a mesma API JSON do sistema web — o app nunca fala direto com o banco de dados.',
    details: [
      'Login com token Bearer e retorno automático à tela de login quando a sessão expira',
      'Endereço do servidor configurável no próprio app',
      'Tema claro e escuro, com a escolha salva no aparelho',
      '94 testes automatizados descritos no repositório',
    ],
    screens: [
      { id: 'painel', label: 'Painel', light: 'akron/app-painel-claro.webp', dark: 'akron/app-painel-escuro.webp', alt: 'Painel do aplicativo com sensores ativos, alertas pendentes e atalhos para gráficos, alertas e relatórios.' },
      { id: 'graficos', label: 'Gráficos', light: 'akron/app-graficos-claro.webp', dark: 'akron/app-graficos-escuro.webp', alt: 'Gráfico de temperatura das últimas 24 horas no aplicativo.' },
      { id: 'alertas', label: 'Alertas', light: 'akron/app-alertas-claro.webp', dark: 'akron/app-alertas-escuro.webp', alt: 'Tela de alertas do aplicativo com contadores por gravidade e gráfico de alertas pendentes.' },
      { id: 'relatorios', label: 'Relatórios', light: 'akron/app-relatorios-claro.webp', dark: 'akron/app-relatorios-escuro.webp', alt: 'Relatório de qualidade ambiental no aplicativo, com filtros e resumo do período por sensor.' },
    ] as AppScreen[],
  },

  hardware: {
    board: 'ESP32 DevKit V1',
    sensors: [
      { name: 'DHT11', reads: 'temperatura e umidade' },
      { name: 'GUVA-S12SD', reads: 'índice UV' },
      { name: 'MQ-135', reads: 'índice relativo de qualidade do ar' },
    ],
    notes: [
      'Reconexão automática ao Wi-Fi e horário sincronizado por NTP para o HTTPS',
      'Página local de diagnóstico com as últimas medições',
      'O MQ-135 só envia dados depois de 2 minutos de aquecimento',
    ],
    honesty: 'O software trata seis grandezas; o firmware publicado no repositório lê quatro delas.',
  },

  architecture: [
    { n: '04', title: 'Clientes', text: 'Sistema web, aplicativo Flutter e dispositivos IoT, conversando por HTTP e JSON.' },
    { n: '03', title: 'Back-end em PHP', text: 'Regras de negócio, validações, autenticação e permissões.' },
    { n: '02', title: 'Acesso a dados', text: 'PDO com consultas preparadas, o que impede injeção de SQL.' },
    { n: '01', title: 'Banco de dados', text: 'MySQL com leituras, limites, alertas, estoques, usuários e auditoria.' },
  ],

  stack: [
    { layer: 'Web', items: 'PHP 8.1+, MySQL/MariaDB, PDO, HTML, CSS, JavaScript e Chart.js' },
    { layer: 'Aplicativo', items: 'Flutter, Dart, provider, go_router, fl_chart e http' },
    { layer: 'Hardware', items: 'ESP32 (core Arduino), DHT11, GUVA-S12SD e MQ-135' },
    { layer: 'Processo', items: 'Scrum e testes automatizados (PHP, Python e Node na web; flutter_test no app)' },
  ],

  /** Responsabilidades individuais da Bianca — separadas do trabalho da equipe. */
  role: {
    items: [
      { title: 'Scrum Master', text: 'Organizei o fluxo de trabalho da equipe e acompanhei as atividades ao longo do projeto.' },
      { title: 'Back-end', text: 'Trabalhei na lógica do sistema, nas APIs e na integração com o banco de dados.' },
      {
        title: 'Registro no GitHub',
        text: 'Versionei as primeiras versões do sistema web, de abril a junho de 2026, no meu repositório tcc, e sou coautora da versão de 27/10/2026, que trouxe a edição, a exclusão e a gestão de sensores.',
      },
    ],
    source: 'Papéis conforme a página da equipe no site da Athenas; datas conforme o histórico público de commits.',
    repo: { label: 'bywoliveira/tcc', href: 'https://github.com/bywoliveira/tcc' },
  },

  teamMembers: [
    { name: 'Anna Hilda', role: 'Product Owner · desenvolvedora full stack' },
    { name: 'Beatriz Gonçalves', role: 'Documentação' },
    { name: 'Bianca Moreira', role: 'Scrum Master · desenvolvedora back-end', me: true },
    { name: 'Carlos Eduardo', role: 'Desenvolvedor front-end' },
    { name: 'Marcelo Duzzi', role: 'Banco de dados' },
  ],
  advisors: 'Orientação: Prof. Leonardo Oliveira Casellato, Prof. Ricardo Akira Harada e Prof. Wellinton Cardoso Teodoro.',

  limits:
    'Limites declarados pela equipe: a validação foi feita em ambiente simulado, e não em uma indústria real; os sensores são de baixo custo, sem calibração com instrumentos certificados; e o sistema apoia a gestão, sem substituir as normas de segurança.',

  links: [
    { label: 'Repositório do sistema web', sub: 'github.com/Nananilda/tcc', href: 'https://github.com/Nananilda/tcc' },
    { label: 'Repositório do aplicativo', sub: 'github.com/Nananilda/app_tcc', href: 'https://github.com/Nananilda/app_tcc' },
    { label: 'Apresentação do projeto', sub: 'athenas.dev.br', href: 'https://athenas.dev.br/apresentacao.html' },
  ],

  video: {
    src: 'media/akron-apresentacao.mp4',
    poster: 'media/akron-apresentacao-poster.webp',
    duration: '1 min 46 s',
    title: 'A Athenas e o Ákron em vídeo',
  },
}
