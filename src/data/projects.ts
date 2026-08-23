import { frogposCover, frogposPos, frogposReceipt, prepaviewCover, prepaviewShot1, prepaviewShot2, prepaviewShot3, prepaviewShot4, prepaviewShot5, prepaviewShot6, restaurantBotCover } from '../assets/images'
import type { ResponsiveImage } from '../components/OptimizedImage'

export interface CaseStudyScreenshot {
  image: ResponsiveImage
  alt: string
  width: number
  height: number
}

export interface ProjectCaseStudy {
  problem: string
  solution: string
  role: string
  result: string
  /** Extra screenshots shown as a gallery inside the case-study modal */
  screenshots?: CaseStudyScreenshot[]
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
  image: ResponsiveImage
  imageAlt: string
  liveUrl?: string
  secondaryUrl?: string
  secondaryLabel?: string
  /** Release status — 'live' for published links, 'soon' for placeholders */
  status?: 'live' | 'soon'
  /** Muted "· SOON" labels shown where links are not published yet */
  soonLabels?: string[]
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
    imageAlt: 'FrogPOS dashboard showing the live point-of-sale overview for a Filipino store.',
    liveUrl: 'https://frogrest.com',
    secondaryUrl: 'https://pos.frogrest.com',
    secondaryLabel: 'LIVE POS',
    status: 'live',
    caseStudy: {
      problem:
        'Small food and retail businesses need a POS workflow that can remain dependable during unstable connectivity while still supporting modern cloud operations.',
      solution:
        'FrogPOS is structured as an offline-aware, multi-tenant platform with sales, ordering, inventory, customer credit, receipt, kitchen, and localization workflows organized around day-to-day store operations.',
      role:
        'Founder / Full-Stack Developer — product architecture, frontend implementation, backend systems, database design, deployment, and product iteration.',
      result:
        'A deployable product foundation that brings core restaurant and retail operations into one maintainable web application without overstating unverified business impact.',
      screenshots: [
        { image: frogposCover, alt: 'FrogPOS dashboard overview.', width: 1280, height: 800 },
        { image: frogposPos, alt: 'FrogPOS point-of-sale terminal.', width: 1280, height: 800 },
        { image: frogposReceipt, alt: 'FrogPOS thermal receipt output.', width: 1080, height: 1920 },
      ],
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
    imageAlt: 'Prepaview gameplay screenshot showing the interview simulation environment.',
    liveUrl: 'https://frogrest.itch.io/prepaview',
    secondaryUrl: 'https://youtu.be/v27Fh6bPfZI',
    secondaryLabel: 'WATCH REEL',
    status: 'live',
    caseStudy: {
      problem:
        'Traditional interview practice can feel passive and repetitive, while game-like simulations require both convincing interaction design and reliable gameplay systems.',
      solution:
        'Prepaview explores interview preparation as an interactive simulation, combining Unreal Engine gameplay logic, AI behavior, player controls, and cinematic presentation into a playable prototype.',
      role:
        'Developer — gameplay systems, Blueprint logic, C++ integrations, interaction design, prototyping, testing, and presentation.',
      result:
        'A playable prototype demonstrating how interview preparation can be reframed as an interactive simulation rather than a static questionnaire.',
      screenshots: [
        { image: prepaviewShot1, alt: 'Prepaview interview simulation — lobby.', width: 1283, height: 729 },
        { image: prepaviewShot2, alt: 'Prepaview interview simulation — conversation.', width: 1280, height: 724 },
        { image: prepaviewShot3, alt: 'Prepaview interview simulation — office scene.', width: 1276, height: 726 },
        { image: prepaviewShot4, alt: 'Prepaview interview simulation — feedback.', width: 1276, height: 723 },
        { image: prepaviewShot5, alt: 'Prepaview interview simulation — role selection.', width: 660, height: 371 },
        { image: prepaviewShot6, alt: 'Prepaview interview simulation — interviewer.', width: 1279, height: 723 },
      ],
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
    imageAlt: 'Restaurant Bot chat interface showing a conversational food-ordering flow.',
    liveUrl: `${import.meta.env.BASE_URL}restaurant_chatbot.html`,
    status: 'live',
    caseStudy: {
      problem:
        'Conversational ordering can become unpredictable quickly when intent matching, menu navigation, and interface accessibility are handled as ad-hoc conditions.',
      solution:
        'The prototype uses explicit conversation states, aliases, fuzzy matching, safe rendering, keyboard navigation, and ARIA support to keep the ordering flow understandable and resilient.',
      role:
        'Frontend Developer — interaction model, state handling, accessibility, product matching, and interface implementation.',
      result:
        'A compact framework-free prototype that demonstrates deterministic conversational UX and accessibility-minded frontend engineering.',
    },
  },
]
