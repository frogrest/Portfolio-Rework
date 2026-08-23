import frogposCover from '../assets/images/frogpos-cover.jpg'
import prepaviewCover from '../assets/images/prepaview-cover.jpg'
import restaurantBotCover from '../assets/images/restaurant-bot-cover.jpg'

export interface ProjectCaseStudy {
  problem: string
  solution: string
  role: string
  result: string
  screenshots: string[]
}

export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  category: string
  description: string
  technologies: string[]
  features: string[]
  image: string
  imageAlt: string
  liveUrl?: string
  secondaryUrl?: string
  secondaryLabel?: string
  caseStudy: ProjectCaseStudy
}

export const projects: Project[] = [
  {
    id: 'frogpos',
    number: '01',
    title: 'FROGPOS',
    subtitle: 'Point-of-sale infrastructure for modern Filipino businesses.',
    category: 'FULL-STACK SAAS PLATFORM',
    description:
      'A production point-of-sale platform created for Filipino stores and restaurants, combining offline-first reliability with modern cloud infrastructure.',
    technologies: ['React 19', 'TypeScript', 'Hono', 'Node.js', 'Neon PostgreSQL', 'PWA'],
    features: [
      'Offline-first sales',
      'Multi-tenant SaaS architecture',
      'QR self-ordering',
      'Kitchen display system',
      'Ingredient-based inventory',
      'Split billing',
      'Customer credit tracking',
      'Thermal receipt support',
      'English / Tagalog localization',
    ],
    image: frogposCover,
    imageAlt: 'Temporary FrogPOS dashboard placeholder clearly marked for replacement with an authentic product screenshot.',
    liveUrl: 'https://frogrest.com',
    secondaryUrl: 'https://pos.frogrest.com',
    secondaryLabel: 'LIVE POS',
    caseStudy: {
      problem:
        'Small food and retail businesses need a POS workflow that can remain dependable during unstable connectivity while still supporting modern cloud operations.',
      solution:
        'FrogPOS is structured as an offline-aware, multi-tenant platform with sales, ordering, inventory, customer credit, receipt, kitchen, and localization workflows organized around day-to-day store operations.',
      role:
        'Founder / Full-Stack Developer — product architecture, frontend implementation, backend systems, database design, deployment, and product iteration.',
      result:
        'A deployable product foundation that brings core restaurant and retail operations into one maintainable web application without overstating unverified business impact.',
      screenshots: [frogposCover],
    },
  },
  {
    id: 'prepaview',
    number: '02',
    title: 'PREPAVIEW',
    subtitle: 'Gamified interview simulation & gameplay prototype.',
    category: 'INTERACTIVE SIMULATION',
    description:
      'A high-fidelity gameplay and simulation project focused on responsive player interactions, AI behavior, and an immersive approach to interview preparation.',
    technologies: ['Unreal Engine', 'Blueprints', 'C++', 'Gameplay Systems', 'AI Systems'],
    features: [
      'Responsive player controls',
      'AI behavior systems',
      'Custom Unreal Engine Blueprints',
      'C++ integrations',
      'Cinematic presentation',
      'Playable prototype',
    ],
    image: prepaviewCover,
    imageAlt: 'Temporary gaming workstation stock image representing the Prepaview development process, not actual gameplay.',
    caseStudy: {
      problem:
        'Traditional interview practice can feel passive and repetitive, while game-like simulations require both convincing interaction design and reliable gameplay systems.',
      solution:
        'Prepaview explores interview preparation as an interactive simulation, combining Unreal Engine gameplay logic, AI behavior, player controls, and cinematic presentation into a playable prototype.',
      role:
        'Developer — gameplay systems, Blueprint logic, C++ integrations, interaction design, prototyping, testing, and presentation.',
      result:
        'A playable prototype demonstrating how interview preparation can be reframed as an interactive simulation rather than a static questionnaire.',
      screenshots: [prepaviewCover],
    },
  },
  {
    id: 'restaurant-bot',
    number: '03',
    title: 'RESTAURANT BOT',
    subtitle: 'Accessible conversational ordering interface.',
    category: 'FRONTEND PROTOTYPE',
    description:
      'A lightweight food-ordering conversational interface built without external frontend frameworks, emphasizing deterministic behavior and accessibility.',
    technologies: ['JavaScript', 'CSS', 'HTML', 'Accessibility', 'State Machines'],
    features: [
      'Deterministic conversation states',
      'Category aliases',
      'Fuzzy product matching',
      'Safe output rendering',
      'Keyboard-friendly interaction',
      'ARIA accessibility support',
    ],
    image: restaurantBotCover,
    imageAlt: 'Temporary developer workstation stock image used as a cover for the Restaurant Bot prototype.',
    caseStudy: {
      problem:
        'Conversational ordering can become unpredictable quickly when intent matching, menu navigation, and interface accessibility are handled as ad-hoc conditions.',
      solution:
        'The prototype uses explicit conversation states, aliases, fuzzy matching, safe rendering, keyboard navigation, and ARIA support to keep the ordering flow understandable and resilient.',
      role:
        'Frontend Developer — interaction model, state handling, accessibility, product matching, and interface implementation.',
      result:
        'A compact framework-free prototype that demonstrates deterministic conversational UX and accessibility-minded frontend engineering.',
      screenshots: [restaurantBotCover],
    },
  },
]
