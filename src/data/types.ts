export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
}

export interface Experience {
  company: string
  role: string
  dateRange: string
  bullets: string[]
  metrics?: string[]
}

export interface Project {
  title: string
  client?: string
  techStack: string[]
  role: string
  description: string
  bullets: string[]
  category: "ai" | "healthcare" | "fintech" | "other"
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Education {
  degree: string
  abbreviation: string
  institution: string
  location?: string
  dateRange: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Achievement {
  title: string
  description: string
  type: "ai" | "performance" | "leadership"
}

export interface ResumeData {
  basics: PersonalInfo
  summary: string
  experience: Experience[]
  projects: Project[]
  skills: SkillCategory[]
  education: Education[]
}
