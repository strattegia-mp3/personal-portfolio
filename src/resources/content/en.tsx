import { Line, Row, Text } from "@once-ui-system/core";
import type { ContentTranslation } from "@/types";
import { PERSON, SOCIAL, PATHS, OG_IMAGE, GALLERY_IMAGES } from "./shared";

export const en: ContentTranslation = {
  person: { ...PERSON, languages: ["Portuguese", "English", "Spanish"] },
  social: [...SOCIAL],
  newsletter: {
    display: true,
    title: <>Subscribe to my Newsletter</>,
    description: (
      <>
        Sharing weekly insights at the intersection of Full Stack development,
        Artificial Intelligence, and the social impact startup ecosystem.
      </>
    ),
  },
  home: {
    path: PATHS.home,
    image: OG_IMAGE,
    label: "Home",
    title: "Home",
    seoTitle: "Victor Rocha | Software Developer",
    description:
      "Victor Rocha's Portfolio: Bridging Computer Science, innovation, and purpose to build the future.",
    headline: (
      <>
        Transforming lines of code into social impact and scalable innovation.
      </>
    ),
    subline: (
      <>
        Hi, I'm Victor. Founder of MythMirror and a Full Stack Developer
        passionate about solving real-world problems. I combine robust software
        engineering with strategic vision to create solutions that transform
        lives.
      </>
    ),
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">Featured</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Meet RenderUp
          </Text>
        </Row>
      ),
      href: "/work/renderup",
    },
  },
  about: {
    path: PATHS.about,
    label: "About",
    title: "My Journey",
    seoTitle: "About | Victor Rocha",
    description:
      "The path of an entrepreneur and computer scientist in the making, focused on accessible technology.",
    tableOfContent: { display: true, subItems: false },
    avatar: { display: true },
    calendar: { display: false, link: "https://cal.com/victor-rocha" },
    intro: {
      display: true,
      title: "Who I Am",
      description: (
        <>
          I am driven by curiosity and a passion for solving complex problems
          through technology. As a Computer Science student and CEO of
          MythMirror, I lead initiatives aimed at democratizing access to
          education, health, and finance.
          <br />
          <br />
          My technical foundation was built at CEMI Gama, where I won 1st Place
          in the "Entrepreneur of the Future" award (Sebrae-2022) and excelled
          in robotics. Today, I deepen my knowledge in AI, Cybersecurity, and
          Software Architecture.
        </>
      ),
    },
    work: {
      display: true,
      title: "Work Experience",
      experiences: [
        {
          company: "RenderUp",
          timeframe: "Mar 2026 - Present",
          role: "Co-founder & Head of Technology",
          achievements: [
            <>
              Responsible for the entire technological infrastructure and IT
              governance of the post-production and motion design agency.
            </>,
            <>
              Implemented process automations using AI and Prompt Engineering,
              optimizing workflows from onboarding to final rendering.
            </>,
            <>
              Structured agile workflows to guarantee scalability and visual
              excellence.
            </>,
          ],
          images: [],
        },
        {
          company: "MythMirror",
          timeframe: "Jan 2023 - Present",
          role: "Founder & CEO",
          achievements: [
            <>
              Strategic leadership in creating digital impact ecosystems:
              Orpheus (music), Midas (finance), Athens (education), and
              Asclepius (health).
            </>,
            <>
              Full product lifecycle management with agile methodologies to
              deliver accessible and innovative solutions.
            </>,
            <>
              Coordination of multidisciplinary teams merging Full Stack
              development with business acumen and social responsibility.
            </>,
          ],
          images: [],
        },
        {
          company: "SL Desenv. e Qualidade de Software",
          timeframe: "Jan 2026 - May 2026",
          role: "QA Test Automation Intern",
          achievements: [
            <>
              Developed and maintained automated test scripts in .NET (C#) with
              Selenium WebDriver and NUnit.
            </>,
            <>
              Applied BDD by writing Gherkin scenarios and executing them via
              Reqnroll, ensuring alignment between business rules and technical
              coverage.
            </>,
            <>
              Automated operational routines and optimized performance and
              accessibility of the platforms.
            </>,
          ],
          images: [],
        },
        {
          company: "SL Desenv. e Qualidade de Software",
          timeframe: "May 2023 - Dec 2023",
          role: "Junior Full Stack Developer",
          achievements: [
            <>
              Intensive Backend development and RESTful API creation with native
              MongoDB integration.
            </>,
            <>
              Architecture of two complete applications using React.js and
              TailwindCSS with PWA performance optimization.
            </>,
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Education",
      institutions: [
        {
          name: "Computer Science - Estácio",
          description: (
            <>
              B.S. in Computer Science (2025-2029). Focus on AI, Data Science,
              Cloud Computing, and Software Engineering.
            </>
          ),
        },
        {
          name: "IT Technical High School - CEMI Gama",
          description: (
            <>
              Technical High School in IT (2021-2023). Awards: 1st Place
              Entrepreneur of the Future (Sebrae), 2nd Place EXPOCEMI, 3rd Place
              Interschool Robotics Tournament.
            </>
          ),
        },
      ],
    },
    technical: {
      display: true,
      title: "Tech Arsenal",
      skills: [
        {
          title: "Development & Architecture",
          description: (
            <>Mastery of modern stacks for scalable and robust applications.</>
          ),
          tags: [
            { name: "JavaScript", icon: "javascript" },
            { name: "TypeScript", icon: "typescript" },
            { name: "C#", icon: "csharp" },
            { name: "Python", icon: "python" },
            { name: "Java", icon: "java" },
            { name: "React.js", icon: "react" },
            { name: "Node.js", icon: "nodedotjs" },
            { name: "TailwindCSS", icon: "tailwind" },
            { name: "OOP", icon: "code" },
            { name: "System Architecture", icon: "server" },
          ],
          images: [],
        },
        {
          title: "Quality & Automation (QA)",
          description: (
            <>
              Ensuring stability through testing and intelligent process
              automation.
            </>
          ),
          tags: [
            { name: "Cypress", icon: "cypress" },
            { name: "Selenium WebDriver", icon: "selenium" },
            { name: "NUnit", icon: "test" },
            { name: "BDD / Gherkin", icon: "check" },
            { name: "Artificial Intelligence", icon: "robot" },
            { name: "Prompt Engineering", icon: "terminal" },
            { name: "Operational Automation", icon: "gears" },
          ],
          images: [],
        },
        {
          title: "Data, Networks & Infrastructure",
          description: (
            <>Data and hardware management to support intelligent decisions.</>
          ),
          tags: [
            { name: "MongoDB", icon: "mongodb" },
            { name: "SQL", icon: "database" },
            { name: "Git/GitHub", icon: "githubAlt" },
            { name: "Linux", icon: "linux" },
            { name: "Networking & Hardware", icon: "wifi" },
            { name: "Maker & 3D Printing", icon: "cubes" },
          ],
          images: [],
        },
        {
          title: "Management & Soft Skills",
          description: <>Leadership and methodologies to drive innovation.</>,
          tags: [
            { name: "Entrepreneurship", icon: "rocket" },
            { name: "Leadership", icon: "user" },
            { name: "Project Management", icon: "chart" },
            { name: "Agile Methodologies", icon: "lightning" },
            { name: "Problem Solving", icon: "puzzle" },
            { name: "Effective Communication", icon: "chat" },
          ],
          images: [],
        },
      ],
    },
  },
  blog: {
    path: PATHS.blog,
    label: "Blog",
    title: "Articles & Thoughts",
    seoTitle: "Blog | Victor Rocha",
    description:
      "A space where I share my general thoughts and learnings.",
  },
  work: {
    path: PATHS.work,
    label: "Projects",
    title: "Selected Portfolio",
    seoTitle: "Projects | Victor Rocha",
    description:
      "A showcase of the solutions I have developed, from concept to implementation.",
  },
  gallery: {
    path: PATHS.gallery,
    label: "Gallery",
    title: "Private Photo Gallery",
    seoTitle: "Gallery | Victor Rocha",
    description: "Moments that deserved to be photographed on my journey.",
    images: [...GALLERY_IMAGES],
  },
  chat: {
    fab: "Chat with Tori",
    fabTooltip: "Chat with Tori 🐶",
    title: "Chat with Tori",
    subtitle: "Ask about Victor's career and projects",
    placeholder: "Ask a question…",
    send: "Send",
    close: "Close chat",
    error: "Something went wrong. Woof! Try again.",
    poweredBy: "Powered by Gemini · May make mistakes",
    welcomeTitle: "Hi! 👋 I'm Tori.",
    welcomeSubtitle:
      "I can answer questions about Victor's experience, projects and skills.",
    suggestions: [
      "What technologies does Victor know?",
      "Tell me about MythMirror startup",
      "Does Victor know React?",
      "How to get in touch with him?",
      "What are Victor's hobbies?",
      "Tell me about his work at RenderUp",
      "Does Victor work with AI?",
      "Tell me about his social projects.",
    ],
  },
};
