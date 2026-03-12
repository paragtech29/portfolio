import type { ResumeData } from "./types"

export const resumeData: ResumeData = {
  basics: {
    name: "Parag Baldaniya",
    title: "Frontend Developer | Team Lead",
    email: "paragahir75@gmail.com",
    phone: "+(91) 8780715459",
    location: "Ahmedabad",
  },

  summary:
    "I am an accomplished React.js Developer with over 4 years of experience in engineering scalable web applications and leading development teams. I have a proven track record of enhancing user experiences through innovative AI feature integration and excel at mentoring engineers. My expertise lies in driving project delivery using Agile methodologies and improving code quality through best practices. I am looking for a challenging Frontend Developer role to leverage my technical leadership and development skills in creating impactful products.",

  experience: [
    {
      company: "Greychain",
      role: "Team Lead",
      dateRange: "July 2023 - Present",
      bullets: [
        "Led a team to build scalable React.js applications with integrated AI functionalities",
        "Collaborated with functional teams to implement WebSocket and Streaming APIs for real-time features",
        "Conducted code reviews, enforced coding standards, and optimized performance",
      ],
    },
    {
      company: "Albiorix Technology Pvt. Ltd.",
      role: "Frontend Developer",
      dateRange: "Jun 2022 - July 2023",
      bullets: [
        "Developed features using React.js and Next.js including server-side rendering and dynamic routing",
        "Collaborated with designers and backend developers for seamless integration",
        "Improved page performance by 20% through optimization techniques",
        "Reviewed code to ensure best practices and consistent quality",
      ],
      metrics: ["Improved page performance by 20%"],
    },
    {
      company: "Search Result Media Pvt. Ltd.",
      role: "Frontend Developer",
      dateRange: "Jan 2020 - Jun 2022",
      bullets: [
        "Built responsive UIs using HTML, CSS, JavaScript, and React.js",
        "Integrated front-end with Node.js backends and RESTful APIs",
        "Ensured cross-browser compatibility and device responsiveness",
      ],
    },
  ],

  projects: [
    {
      title: "AI - Proposal Accelerator",
      client: "Accenture",
      techStack: ["React.js", "Java (Spring Boot)", "Python", "MySQL", "LLM", "OpenAI"],
      role: "Frontend Lead",
      description:
        "Built an AI-powered platform to streamline RFP management by auto-generating proposal content. Enabled tracking of RFPs, auto-filling sections using LLMs, managing users and content, and integrating AI-driven research insights.",
      bullets: [
        "Developed the React.js interface and integrated advanced AI features",
        "Built an AI-powered platform to streamline RFP management by auto-generating proposal content",
        "Enabled tracking of RFPs, auto-filling sections using LLMs, managing users and content, and integrating AI-driven research insights",
      ],
      category: "ai",
    },
    {
      title: "AI - Knowledge Management",
      client: "Accenture",
      techStack: ["React.js", "Java (Spring Boot)", "Python", "MySQL", "LLM", "OpenAI"],
      role: "Frontend Lead",
      description:
        "Developed a document and knowledge management platform with taxonomy-based tagging and AI-driven insights. Enabled secure uploading, tagging, and retrieval of documents, plus KPI generation from AI responses.",
      bullets: [
        "Built React.js interface, integrated LLM for document intelligence",
        "Developed a document and knowledge management platform with taxonomy-based tagging and AI-driven insights",
        "Enabled secure uploading, tagging, and retrieval of documents, plus KPI generation from AI responses",
      ],
      category: "ai",
    },
    {
      title: "AI - SurveyOps",
      client: "BCG",
      techStack: ["React.js", "Java (Spring Boot)", "Python", "MySQL", "LLM", "OpenAI"],
      role: "Frontend Lead",
      description:
        "Created an AI-driven platform for analyzing Excel/CSV survey data. Included sentiment analysis, word cloud generation, theme-based filtering, and custom report creation using AI models. The platform enabled users to gain insights from complex datasets quickly, improving decision-making and survey interpretation.",
      bullets: [
        "Led development of React.js frontend, with LLM-powered data analysis features",
        "Created an AI-driven platform for analyzing Excel/CSV survey data",
        "Included sentiment analysis, word cloud generation, theme-based filtering, and custom report creation using AI models",
        "The platform enabled users to gain insights from complex datasets quickly, improving decision-making and survey interpretation",
      ],
      category: "ai",
    },
    {
      title: "WOW Health Express",
      techStack: ["React Native", "Node.js", "MySQL"],
      role: "Junior Developer",
      description:
        "Built a lab sample management platform streamlining sample collection, tracking, and reporting. Enhanced efficiency and ensured secure healthcare data communication with real-time syncing. Improved coordination between labs and providers, reducing manual work and delays.",
      bullets: [
        "Contributed to frontend development, bug fixing, and testing",
        "Built a lab sample management platform streamlining sample collection, tracking, and reporting",
        "Enhanced efficiency and ensured secure healthcare data communication with real-time syncing",
        "Improved coordination between labs and providers, reducing manual work and delays",
      ],
      category: "healthcare",
    },
    {
      title: "FLUUS",
      techStack: ["React.js", "Node.js"],
      role: "Senior Developer",
      description:
        "Developed a secure cryptocurrency trading platform. Implemented payment integrations, dashboard interfaces, and end-to-end features for trading, authentication, and user management. Optimized user experience and ensured platform stability under high transaction loads.",
      bullets: [
        "Worked on full-stack implementation, performance optimization, and testing",
        "Developed a secure cryptocurrency trading platform",
        "Implemented payment integrations, dashboard interfaces, and end-to-end features for trading, authentication, and user management",
        "Optimized user experience and ensured platform stability under high transaction loads",
      ],
      category: "fintech",
    },
    {
      title: "X CARE",
      techStack: ["React.js", "PHP", "MySQL"],
      role: "Senior Developer",
      description:
        "Developed a clinic discovery and appointment booking platform. Patients can search clinics, view providers, and book appointments with real-time availability and confirmation. Improved patient access to healthcare services through intuitive UI and seamless scheduling.",
      bullets: [
        "Responsible for frontend/backend development, UI integration, and testing",
        "Developed a clinic discovery and appointment booking platform",
        "Patients can search clinics, view providers, and book appointments with real-time availability and confirmation",
        "Improved patient access to healthcare services through intuitive UI and seamless scheduling",
      ],
      category: "healthcare",
    },
  ],

  skills: [
    {
      category: "Frontend Development",
      skills: ["HTML", "CSS", "JavaScript (ES6+)", "TypeScript", "React.js", "Redux", "Responsive Web Design"],
    },
    {
      category: "Backend & Full-Stack",
      skills: ["Node.js", "Express.js", "RESTful API Development"],
    },
    {
      category: "Tools & Practices",
      skills: ["Agile (Scrum, Kanban)", "API Integration", "Git", "Jira", "Visual Studio Code", "Postman"],
    },
    {
      category: "Version Control",
      skills: ["GitHub", "GitLab", "Azure DevOps"],
    },
    {
      category: "Testing",
      skills: ["Jest", "React Testing Library", "Cypress"],
    },
    {
      category: "DevOps & CI/CD",
      skills: ["Docker", "CI/CD Pipeline Automation"],
    },
    {
      category: "Cloud Services",
      skills: ["AWS (Basics)", "Azure (Basics)", "Firebase"],
    },
    {
      category: "Collaboration & Leadership",
      skills: ["Strong Communication", "Collaboration", "Mentorship", "Team Leadership"],
    },
    {
      category: "Soft Skills",
      skills: ["Problem-Solving", "Attention to Detail", "Code Quality", "Time Management", "Adaptability"],
    },
  ],

  education: [
    {
      degree: "Master Of Computer Application",
      abbreviation: "MCA",
      institution: "Nirma University",
      location: "Ahmedabad",
      dateRange: "Aug 2017 – May 2020",
    },
    {
      degree: "Bachelor Of Computer Application",
      abbreviation: "BCA",
      institution: "L.J. College, Gujarat University",
      dateRange: "Aug 2014 – May 2017",
    },
    {
      degree: "Higher Secondary Certificate",
      abbreviation: "HSC",
      institution: "Vidhyanagar High School",
      dateRange: "2013 – 2014",
    },
    {
      degree: "Secondary School Certificate",
      abbreviation: "SSC",
      institution: "Saraswati Vidhya Mandir",
      dateRange: "2011 – 2012",
    },
  ],
}
