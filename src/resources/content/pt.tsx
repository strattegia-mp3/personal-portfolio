import { Line, Row, Text } from "@once-ui-system/core";
import type { ContentTranslation } from "@/types";
import { PERSON, SOCIAL, PATHS, OG_IMAGE, GALLERY_IMAGES } from "./shared";

export const pt: ContentTranslation = {
  person: { ...PERSON, languages: ["Português", "Inglês", "Espanhol"] },
  social: [...SOCIAL],
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
    path: PATHS.home,
    image: OG_IMAGE,
    label: "Início",
    title: "Início",
    seoTitle: "Victor Rocha | Desenvolvedor de Software",
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
            Conheça a RenderUp
          </Text>
        </Row>
      ),
      href: "/work/renderup",
    },
  },
  about: {
    path: PATHS.about,
    label: "Sobre",
    title: "Minha Jornada",
    seoTitle: "Sobre | Victor Rocha",
    description:
      "A trajetória de um empreendedor e cientista da computação em formação, focado em tecnologia acessível.",
    tableOfContent: { display: true, subItems: false },
    avatar: { display: true },
    calendar: { display: false, link: "https://cal.com/victor-rocha" },
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
          Minha base técnica foi construída no CEMI Gama, onde conquistei o 1º
          lugar no "Empreendedor do Futuro" (Sebrae-2022) e destaque em
          robótica. Hoje, aprofundo-me em IA, Segurança Cibernética e
          Arquitetura de Software.
        </>
      ),
    },
    work: {
      display: true,
      title: "Experiência Profissional",
      experiences: [
        {
          company: "RenderUp",
          timeframe: "Mar 2026 - Presente",
          role: "Co-founder & Head de Tecnologia e Automação",
          achievements: [
            <>
              Responsável por toda a infraestrutura tecnológica e governança de
              TI da agência de pós-produção e motion design.
            </>,
            <>
              Implementação de automações usando IA e Prompt Engineering,
              otimizando desde o onboarding até a renderização final.
            </>,
            <>
              Estruturação de fluxos de trabalho ágeis para escalabilidade e
              qualidade visual de excelência.
            </>,
          ],
          images: [],
        },
        {
          company: "MythMirror",
          timeframe: "Jan 2023 - Presente",
          role: "Sócio Fundador & CEO",
          achievements: [
            <>
              Liderança estratégica na criação de ecossistemas digitais de
              impacto: Orpheus (música), Midas (finanças), Athens (educação) e
              Asclepius (saúde).
            </>,
            <>
              Gestão completa do ciclo de desenvolvimento de produtos com
              metodologias ágeis para entregar soluções acessíveis e inovadoras.
            </>,
            <>
              Coordenação de equipes multidisciplinares unindo desenvolvimento
              Full Stack com visão de negócios e responsabilidade social.
            </>,
          ],
          images: [],
        },
        {
          company: "SL Desenv. e Qualidade de Software",
          timeframe: "Jan 2026 - Mai 2026",
          role: "Estagiário em Automação de Testes (QA)",
          achievements: [
            <>
              Desenvolvimento e manutenção de scripts de testes automatizados em
              .NET (C#) com Selenium WebDriver e NUnit.
            </>,
            <>
              Aplicação de BDD escrevendo cenários em Gherkin e executando-os
              via Reqnroll, alinhando regras de negócio e cobertura técnica.
            </>,
            <>
              Automação de rotinas operacionais e otimização de desempenho e
              acessibilidade das plataformas.
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
              Desenvolvimento Backend intensivo e criação de APIs RESTful com
              integração nativa ao MongoDB.
            </>,
            <>
              Arquitetura de duas aplicações completas com React.js e
              TailwindCSS, com otimização de performance em PWAs.
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
              Bacharelado em Ciência da Computação (2025-2029). Foco em IA,
              Ciência de Dados, Computação em Nuvem e Engenharia de Software.
            </>
          ),
        },
        {
          name: "Ensino Médio Técnico em Informática - CEMI Gama",
          description: (
            <>
              Ensino Médio Técnico em Informática (2021-2023). Premiações: 1º
              Lugar Empreendedor do Futuro (Sebrae), 2º Lugar EXPOCEMI, 3º Lugar
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
            { name: "C#", icon: "csharp" },
            { name: "Python", icon: "python" },
            { name: "Java", icon: "java" },
            { name: "React.js", icon: "react" },
            { name: "Node.js", icon: "nodedotjs" },
            { name: "TailwindCSS", icon: "tailwind" },
            { name: "POO", icon: "code" },
            { name: "Arquitetura de Sistemas", icon: "server" },
          ],
          images: [],
        },
        {
          title: "Qualidade & Automação (QA)",
          description: (
            <>
              Garantia de estabilidade, testes e automação de processos
              inteligentes.
            </>
          ),
          tags: [
            { name: "Cypress", icon: "cypress" },
            { name: "Selenium WebDriver", icon: "selenium" },
            { name: "NUnit", icon: "test" },
            { name: "BDD / Gherkin", icon: "check" },
            { name: "Inteligência Artificial", icon: "robot" },
            { name: "Prompt Engineering", icon: "terminal" },
            { name: "Automação Operacional", icon: "gears" },
          ],
          images: [],
        },
        {
          title: "Dados, Redes & Infraestrutura",
          description: (
            <>
              Gestão de dados e hardware para suporte a decisões inteligentes.
            </>
          ),
          tags: [
            { name: "MongoDB", icon: "mongodb" },
            { name: "SQL", icon: "database" },
            { name: "Git/GitHub", icon: "githubAlt" },
            { name: "Linux", icon: "linux" },
            { name: "Redes & Hardware", icon: "wifi" },
            { name: "Maker & Impressão 3D", icon: "cubes" },
          ],
          images: [],
        },
        {
          title: "Gestão & Soft Skills",
          description: (
            <>Liderança e metodologias para impulsionar a inovação.</>
          ),
          tags: [
            { name: "Empreendedorismo", icon: "rocket" },
            { name: "Liderança", icon: "user" },
            { name: "Gestão de Projetos", icon: "chart" },
            { name: "Metodologias Ágeis", icon: "lightning" },
            { name: "Resolução de Problemas", icon: "puzzle" },
            { name: "Comunicação Efetiva", icon: "chat" },
          ],
          images: [],
        },
      ],
    },
  },
  blog: {
    path: PATHS.blog,
    label: "Blog",
    title: "Artigos & Pensamentos",
    seoTitle: "Blog | Victor Rocha",
    description:
      "Espaço onde compartilho aprendizados sobre tecnologia, carreira e o futuro da inovação.",
  },
  work: {
    path: PATHS.work,
    label: "Projetos",
    title: "Portfólio Selecionado",
    seoTitle: "Projetos | Victor Rocha",
    description:
      "Uma vitrine das soluções que desenvolvi, do conceito à implementação.",
  },
  gallery: {
    path: PATHS.gallery,
    label: "Galeria",
    title: "Galeria Particular de Fotografias",
    seoTitle: "Galeria | Victor Rocha",
    description: "Momentos que mereceram fotografias em minha jornada.",
    images: [...GALLERY_IMAGES],
  },
};
