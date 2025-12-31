import {
  Person,
  Social,
  Newsletter,
  Home,
  About,
  Blog,
  Work,
  Gallery,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

// Interface para definir a estrutura completa de cada idioma
export type ContentTranslation = {
  person: Person;
  social: Social;
  newsletter: Newsletter;
  home: Home;
  about: About;
  blog: Blog;
  work: Work;
  gallery: Gallery;
};

// Conteúdo em Português
const pt: ContentTranslation = {
  person: {
    firstName: "Victor",
    lastName: "Rocha",
    name: "Victor Rocha",
    role: "Full Stack Developer & CEO @ MythMirror",
    avatar: "/images/avatar.jpg",
    email: "strattegiadev@gmail.com",
    location: "America/Sao_Paulo",
    languages: ["Português", "Inglês", "Espanhol"],
  },
  social: [
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/strattegia-mp3",
      essential: true,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/in/victor-jrocha",
      essential: true,
    },
    {
      name: "Email",
      icon: "email",
      link: "mailto:strattegiadev@gmail.com",
      essential: true,
    },
  ],
  newsletter: {
    display: true,
    title: <>Inscreva-se em minha Newsletter</>,
    description: (
      <>
        Compartilho insights semanais sobre a interseção entre desenvolvimento
        Full Stack, Inteligência Artificial e o ecossistema de startups de
        impacto social.
      </>
    ),
  },
  home: {
    path: "/",
    image: "/images/og/home.jpg",
    label: "Início",
    title: "Início",
    description:
      "Portfólio de Victor Rocha: Unindo Ciência da Computação, inovação e propósito para construir o futuro.",
    headline: (
      <>
        Transformando linhas de código em impacto social e inovação escalável.
      </>
    ),
    subline: (
      <>
        Olá, sou o Victor. Fundador da MythMirror e Desenvolvedor Full Stack
        apaixonado por resolver problemas reais. Combino engenharia de software
        robusta com visão estratégica para criar soluções que transformam vidas.
      </>
    ),
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">Destaque</strong>{" "}
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Conheça a MythMirror
          </Text>
        </Row>
      ),
      href: "/work/mythmirror-startup",
    },
  },
  about: {
    path: "/about",
    label: "Sobre",
    title: "Minha Jornada",
    description:
      "A trajetória de um empreendedor e cientista da computação em formação, focado em tecnologia acessível.",
    tableOfContent: {
      display: true,
      subItems: false,
    },
    avatar: {
      display: true,
    },
    calendar: {
      display: false,
      link: "https://cal.com/victor-rocha",
    },
    intro: {
      display: true,
      title: "Quem sou eu",
      description: (
        <>
          Sou movido pela curiosidade e pela paixão de resolver problemas
          complexos através da tecnologia. Como estudante de Ciência da
          Computação e CEO da MythMirror, lidero iniciativas que buscam
          democratizar o acesso à educação, saúde e finanças.
          <br />
          <br />
          Minha base técnica foi construída no Centro de Ensino Médio Integrado
          do Gama (CEMI), onde conquistei o 1º lugar no "Empreendedor do Futuro"
          (Sebrae-2022) e destaque em robótica. Hoje, aprofundo-me em
          Inteligência Artificial, Segurança Cibernética e Arquitetura de
          Software, sempre com o objetivo de unir programação, propósito e
          empreendedorismo.
        </>
      ),
    },
    work: {
      display: true,
      title: "Experiência Profissional",
      experiences: [
        {
          company: "MythMirror",
          timeframe: "Jan 2023 - Presente",
          role: "Sócio Fundador & CEO",
          achievements: [
            <>
              Liderança estratégica na criação de ecossistemas digitais de
              impacto, incluindo os projetos Orpheus (música), Midas (finanças),
              Athens (educação) e Asclepius (saúde).
            </>,
            <>
              Gestão completa do ciclo de desenvolvimento de produtos, aplicando
              metodologias ágeis para entregar soluções acessíveis e inovadoras
              que visam transformar a realidade de jovens brasileiros.
            </>,
            <>
              Coordenação de equipes multidisciplinares, unindo desenvolvimento
              técnico (Full Stack) com visão de negócios e responsabilidade
              social.
            </>,
          ],
          images: [],
        },
        {
          company: "SL Desenv. e Qualidade de Software",
          timeframe: "Maio 2023 - Dez 2023",
          role: "Desenvolvedor Full Stack Júnior",
          achievements: [
            <>
              Atuação intensiva no desenvolvimento Backend e criação de APIs
              RESTful, garantindo integração nativa e eficiente com MongoDB.
            </>,
            <>
              Participação na arquitetura de duas aplicações completas,
              utilizando React.js e TailwindCSS para interfaces modernas, além
              da otimização de performance em Progressive Web Apps (PWAs).
            </>,
            <>
              Reconhecido pela liderança técnica, comunicação efetiva e
              capacidade de colaborar em projetos complexos dentro de um
              ambiente ágil.
            </>,
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Formação Acadêmica",
      institutions: [
        {
          name: "Ciência da Computação - Estácio",
          description: (
            <>
              Bacharelado em Ciência da Computação (2025 - 2029) pela
              instituição Estácio. Foco acadêmico em Inteligência Artificial,
              Ciência de Dados, Computação em Nuvem e Engenharia de Software.
            </>
          ),
        },
        {
          name: "Ensino Médio Técnico em Informática - CEMI Gama",
          description: (
            <>
              Ensino Médio Técnico em Informática (2021 - 2023) pela instituição
              CEMI - Gama. Formação sólida em Lógica de Programação, Redes,
              Sistemas Operacionais e Robótica. Premiações: 1º Lugar
              Empreendedor do Futuro (Sebrae), 2º Lugar EXPOCEMI, 3º Lugar
              Torneio Interescolar de Robótica.
            </>
          ),
        },
      ],
    },
    technical: {
      display: true,
      title: "Arsenal Tecnológico",
      skills: [
        {
          title: "Desenvolvimento & Arquitetura",
          description: (
            <>Domínio de stack moderna para aplicações escaláveis e robustas.</>
          ),
          tags: [
            { name: "JavaScript", icon: "javascript" },
            { name: "TypeScript", icon: "typescript" },
            { name: "React.js", icon: "react" },
            { name: "Node.js", icon: "nodedotjs" },
            { name: "TailwindCSS", icon: "tailwind" },
            { name: "API REST", icon: "cloud" },
            { name: "POO", icon: "code" },
            { name: "Arquitetura de Sistemas", icon: "server" },
          ],
          images: [],
        },
        {
          title: "Dados & Infraestrutura",
          description: (
            <>
              Gestão de dados e segurança para suporte a decisões inteligentes.
            </>
          ),
          tags: [
            { name: "MongoDB", icon: "mongodb" },
            { name: "SQL", icon: "database" },
            { name: "Git/GitHub", icon: "githubAlt" },
            { name: "Linux", icon: "linux" },
            { name: "Segurança da Informação", icon: "lock" },
            { name: "Redes", icon: "wifi" },
          ],
          images: [],
        },
        {
          title: "Gestão & Soft Skills",
          description: (
            <>Liderança e metodologias para impulsionar a inovação.</>
          ),
          tags: [
            { name: "Liderança", icon: "user" },
            { name: "Gestão de Projetos", icon: "chart" },
            { name: "Metodologias Ágeis", icon: "lightning" },
            { name: "Comunicação Efetiva", icon: "chat" },
            { name: "Inglês", icon: "flag" },
          ],
          images: [],
        },
      ],
    },
  },
  blog: {
    path: "/blog",
    label: "Blog",
    title: "Artigos & Pensamentos",
    description:
      "Espaço onde compartilho aprendizados sobre tecnologia, carreira e o futuro da inovação.",
  },
  work: {
    path: "/work",
    label: "Projetos",
    title: "Portfólio Selecionado",
    description:
      "Uma vitrine das soluções que desenvolvi, do conceito à implementação.",
  },
  gallery: {
    path: "/gallery",
    label: "Galeria",
    title: "Bastidores",
    description:
      "Momentos marcantes da minha jornada acadêmica e profissional.",
    images: [
      {
        src: "/images/gallery/horizontal-1.jpg",
        alt: "Hackathon participation",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/vertical-1.jpg",
        alt: "Speaking at tech event",
        orientation: "vertical",
      },
    ],
  },
};

// Conteúdo em Inglês
const en: ContentTranslation = {
  person: {
    firstName: "Victor",
    lastName: "Rocha",
    name: "Victor Rocha",
    role: "Full Stack Developer & CEO @ MythMirror",
    avatar: "/images/avatar.jpg",
    email: "strattegiadev@gmail.com",
    location: "America/Sao_Paulo",
    languages: ["Portuguese", "English", "Spanish"],
  },
  social: [
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/strattegia-mp3",
      essential: true,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/in/victor-jrocha",
      essential: true,
    },
    {
      name: "Email",
      icon: "email",
      link: "mailto:strattegiadev@gmail.com",
      essential: true,
    },
  ],
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
    path: "/",
    image: "/images/og/home.jpg",
    label: "Home",
    title: "Home",
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
            Meet MythMirror
          </Text>
        </Row>
      ),
      href: "/work/mythmirror-startup",
    },
  },
  about: {
    path: "/about",
    label: "About",
    title: "My Journey",
    description:
      "The path of an entrepreneur and computer scientist in the making, focused on accessible technology.",
    tableOfContent: {
      display: true,
      subItems: false,
    },
    avatar: {
      display: true,
    },
    calendar: {
      display: false,
      link: "https://cal.com/victor-rocha",
    },
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
          My technical foundation was built at the Centro de Ensino Médio
          Integrado do Gama (CEMI), where I won 1st Place in the "Entrepreneur
          of the Future" award (Sebrae-2022) and excelled in robotics. Today, I
          am deepening my knowledge in Artificial Intelligence, Cybersecurity,
          and Software Architecture, always aiming to bridge programming,
          purpose, and entrepreneurship.
        </>
      ),
    },
    work: {
      display: true,
      title: "Work Experience",
      experiences: [
        {
          company: "MythMirror",
          timeframe: "Jan 2023 - Present",
          role: "Founder & CEO",
          achievements: [
            <>
              Strategic leadership in creating digital impact ecosystems,
              including projects like Orpheus (music), Midas (finance), Athens
              (education), and Asclepius (health).
            </>,
            <>
              Full product lifecycle management, applying agile methodologies to
              deliver accessible and innovative solutions aimed at transforming
              the reality of young Brazilians.
            </>,
            <>
              Coordination of multidisciplinary teams, merging technical
              development (Full Stack) with business acumen and social
              responsibility.
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
              Intensive work on Backend development and the creation of RESTful
              APIs, ensuring native and efficient integration with MongoDB.
            </>,
            <>
              Participation in the architecture of two complete commercial
              applications using React.js and TailwindCSS for modern interfaces,
              alongside performance optimization in Progressive Web Apps (PWAs).
            </>,
            <>
              Recognized for technical leadership, effective communication, and
              the ability to collaborate on complex projects within an agile
              environment.
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
              B.S. in Computer Science (2025 - 2029) at Estácio. Academic focus
              on Artificial Intelligence, Data Science, Cloud Computing, and
              Software Engineering.
            </>
          ),
        },
        {
          name: "IT Technical High School - CEMI Gama",
          description: (
            <>
              Technical High School Degree in IT (2021 - 2023) at CEMI - Gama.
              Solid foundation in Programming Logic, Networks, Operating
              Systems, and Robotics. Awards: 1st Place Entrepreneur of the
              Future (Sebrae), 2nd Place EXPOCEMI, 3rd Place Interschool
              Robotics Tournament.
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
            { name: "React.js", icon: "react" },
            { name: "Node.js", icon: "nodedotjs" },
            { name: "TailwindCSS", icon: "tailwind" },
            { name: "REST API", icon: "cloud" },
            { name: "OOP", icon: "code" },
            { name: "System Architecture", icon: "server" },
          ],
          images: [],
        },
        {
          title: "Data & Infrastructure",
          description: (
            <>Data management and security to support intelligent decisions.</>
          ),
          tags: [
            { name: "MongoDB", icon: "mongodb" },
            { name: "SQL", icon: "database" },
            { name: "Git/GitHub", icon: "githubAlt" },
            { name: "Linux", icon: "linux" },
            { name: "InfoSec", icon: "lock" },
            { name: "Networking", icon: "wifi" },
          ],
          images: [],
        },
        {
          title: "Management & Soft Skills",
          description: <>Leadership and methodologies to drive innovation.</>,
          tags: [
            { name: "Leadership", icon: "user" },
            { name: "Project Management", icon: "chart" },
            { name: "Agile Methodologies", icon: "lightning" },
            { name: "Effective Communication", icon: "chat" },
            { name: "English", icon: "flag" },
          ],
          images: [],
        },
      ],
    },
  },
  blog: {
    path: "/blog",
    label: "Blog",
    title: "Articles & Thoughts",
    description:
      "A space where I share learnings on technology, career, and the future of innovation.",
  },
  work: {
    path: "/work",
    label: "Projects",
    title: "Selected Portfolio",
    description:
      "A showcase of the solutions I have developed, from concept to implementation.",
  },
  gallery: {
    path: "/gallery",
    label: "Gallery",
    title: "Behind the Scenes",
    description: "Memorable moments from my academic and professional journey.",
    images: [
      {
        src: "/images/gallery/horizontal-1.jpg",
        alt: "Hackathon participation",
        orientation: "horizontal",
      },
      {
        src: "/images/gallery/vertical-1.jpg",
        alt: "Speaking at tech event",
        orientation: "vertical",
      },
    ],
  },
};

// Objeto principal de exportação
export const i18nContent = {
  pt,
  en,
};

export type AvailableLanguages = keyof typeof i18nContent;
