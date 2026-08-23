import type { LucideIcon } from 'lucide-react'
import { Braces, Code2, Database, Film, Gamepad2, Layers3, Palette, ServerCog, TerminalSquare, Video } from 'lucide-react'

export interface SkillItem {
  name: string
  icon: LucideIcon
}

export interface SkillGroup {
  label: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Production',
    items: [
      { name: 'TypeScript', icon: Braces },
      { name: 'React', icon: Code2 },
      { name: 'Node.js', icon: ServerCog },
      { name: 'PostgreSQL', icon: Database },
      { name: 'Tailwind CSS', icon: Layers3 },
      { name: 'JavaScript', icon: TerminalSquare },
    ],
  },
  {
    label: 'Proficient',
    items: [
      { name: 'Python', icon: Code2 },
      { name: 'C#', icon: Braces },
      { name: 'Java', icon: Code2 },
      { name: '.NET', icon: ServerCog },
      { name: 'HTML/CSS', icon: Layers3 },
    ],
  },
  {
    label: 'Creative',
    items: [
      { name: 'Unreal Engine', icon: Gamepad2 },
      { name: 'After Effects', icon: Film },
      { name: 'Sony Vegas', icon: Video },
      { name: 'CapCut', icon: Video },
      { name: 'Canva', icon: Palette },
    ],
  },
]

export const services = [
  'Full-Stack Development',
  'Frontend Development',
  'Backend & API Development',
  'Database Architecture',
  'UI Implementation',
  'Game Prototyping',
  'Video Editing',
  'Motion Graphics',
]

export const specialties = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Unreal Engine', 'After Effects']
