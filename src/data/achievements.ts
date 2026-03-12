import type { Stat, Achievement } from "./types"

export const topImpact = [
  {
    value: "4+ Years",
    description: "Engineering scalable web applications & leading teams",
  },
  {
    value: "20% Boost",
    description: "Page performance improvement through optimization",
  },
  {
    value: "3 AI Platforms",
    description: "Led frontend for Accenture & BCG AI projects",
  },
]

export const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "%", label: "Performance Boost" },
  { value: 6, suffix: "", label: "Projects Delivered" },
  { value: 3, suffix: "", label: "AI Platforms Built" },
]

export const achievements: Achievement[] = [
  {
    title: "AI Platform Leadership",
    description:
      "Led frontend development for 3 AI-powered platforms at Accenture and BCG, integrating LLMs for document intelligence, proposal generation, and survey analytics.",
    type: "ai",
  },
  {
    title: "Performance Optimization",
    description:
      "Improved page performance by 20% at Albiorix Technology through optimization techniques including SSR, dynamic routing, and code quality improvements.",
    type: "performance",
  },
  {
    title: "Team Leadership & Mentoring",
    description:
      "Led a development team at Greychain building scalable React.js applications with AI functionalities. Conducted code reviews, enforced coding standards, and mentored engineers.",
    type: "leadership",
  },
  {
    title: "Real-time Systems",
    description:
      "Collaborated with functional teams to implement WebSocket and Streaming APIs for real-time features in production applications.",
    type: "ai",
  },
  {
    title: "Full-Stack Delivery",
    description:
      "Delivered 6 production projects across AI, healthcare, and fintech domains — from cryptocurrency trading platforms to healthcare appointment booking systems.",
    type: "leadership",
  },
]
