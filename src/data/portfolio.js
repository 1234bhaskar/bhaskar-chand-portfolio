// Central content for the CLI portfolio.
// Edit values here to update the site without touching component logic.

export const USER = 'sde1'
export const HOST = 'sde1-portfolio'
export const PROMPT_PATH = '~'

// Full prompt label shown before each command, e.g. user@sde1-portfolio:~/$
export const promptLabel = (path = PROMPT_PATH) =>
  `${USER}@${HOST}:${path}/$`

export const bootLogs = [
  '[    0.000000] Booting sde1-portfolio kernel v1.0.4 ...',
  '[    0.114523] CPU0: phosphor-green pipeline online',
  '[    0.233981] Mounting /dev/skills ... OK',
  '[    0.418772] Mounting /dev/projects ... OK',
  '[    0.602104] Initializing network interface eth0 ... OK',
  '[    0.781340] Loading module: react@18 ... OK',
  '[    0.934655] Loading module: terminal-ui ... OK',
  '[    1.122089] Starting service: portfolio.daemon ... OK',
  '[    1.305512] Establishing secure session (TTY1) ... OK',
  '[    1.488043] Welcome, recruiter. Session is live.',
]

export const welcome = {
  bio: 'Software Engineer SDE1 | 1 year building scalable backend architecture.',
  detail:
    'Focused on resilient APIs, event-driven systems, and clean, observable services.',
}

export const skills = [
  'Java',
  'Spring Boot',
  'Node.js',
  'Express',
  'Python',
  'Django',
  'Laravel',
  'PHP',
  'Kafka',
  'Redis',
  'Elasticsearch',
  'AWS',
  'LangGraph',
  'VoltAgent',
]

export const projects = [
  {
    name: 'url-shortener',
    permissions: '-rwxr-xr-x',
    size: '4.2K',
    title: 'URL Shortener',
    description:
      'Built with Spring Boot, Redis for fast caching, and Kafka for async analytics.',
    stack: ['Spring Boot', 'Redis', 'Kafka'],
  },
  {
    name: 'job-application-portal',
    permissions: '-rwxr-xr-x',
    size: '6.8K',
    title: 'Job Application Portal',
    description:
      'Integrated with Amazon S3 for uploads and Elasticsearch for fast, scalable search.',
    stack: ['AWS S3', 'Elasticsearch', 'REST'],
  },
  {
    name: 'hotel-onboarding-system',
    permissions: '-rwxr-xr-x',
    size: '5.1K',
    title: 'Hotel Onboarding System',
    description:
      'A Laravel-based system managing complex JSON resource mapping for updates.',
    stack: ['Laravel', 'PHP', 'JSON Mapping'],
  },
]

export const links = [
  {
    key: 'github',
    label: 'GitHub',
    handle: 'github.com/sde1-dev',
    url: 'https://github.com/',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/sde1-dev',
    url: 'https://www.linkedin.com/',
  },
  {
    key: 'email',
    label: 'Email',
    handle: 'hello@sde1.dev',
    url: 'mailto:hello@sde1.dev',
  },
]
