import { IconName } from "@/resources/icons";
import { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Languages spoken */
  languages?: string[];
};

/**
 * Newsletter Section
 * @description The below information will be displayed on the Home page in Newsletter block
 */
export type Newsletter = {
  /** Whether to display the newsletter section */
  display: boolean;
  /** Title of the newsletter   */
  title: React.ReactNode;
  /** Description of the newsletter */
  description: React.ReactNode;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Title of the page (SEO and metadata) */
  seoTitle: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: React.ReactNode;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: React.ReactNode;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /** Skill tags */
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  github: {
    /** Whether to display the GitHub section */
    display: boolean;
    /** Your exact GitHub username to build URLs */
    username: string;
    /** Title of the GitHub section */
    title: string;
    /** Label for contributions */
    contributions: string;
    /** Label for repositories */
    repos: string;
    /** Label for stars */
    stars: string;
    /** Label for forks */
    forks: string;
    /** Fallback text when a repository has no description */
    noDesc: string;
    /** Generic error message for GitHub data fetching */
    error: string;
    /** Label for the "View All" link */
    viewAll: string;
    /** Text for the "Less" legend label (e.g. "Less") */
    less: string;
    /** Text for the "More" legend label (e.g. "More") */
    more: string;
    /** Function that formats the tooltip text based on count and date */
    contribTooltip: (n: number, d: string) => string;
  };
}

/**
 * Blog page configuration.
 * @description Configuration for the Blog page, including metadata and navigation label.
 */
export interface Blog extends BasePageConfig {}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}

/**
 * Gallery page configuration.
 * @description Configuration for the Gallery page, including metadata, navigation label, and image list.
 */
export interface Gallery extends BasePageConfig {
  /** List of images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
    /** Image alt text */
    alt: string;
    /** Image orientation (horizontal/vertical) */
    orientation: string;
  }>;
}

/**
 * Chat configuration.
 * @description Configuration for the chat widget, including labels, tooltips, and default messages.
 */
export interface Chat {
  /** Label or icon text for the Floating Action Button (FAB) */
  fab: string;
  /** Tooltip text displayed when hovering over the FAB */
  fabTooltip: string;
  /** Main title of the chat interface */
  title: string;
  /** Subtitle or status text of the chat interface */
  subtitle: string;
  /** Placeholder text for the message input field */
  placeholder: string;
  /** Label or tooltip for the send message button */
  send: string;
  /** Label or tooltip for the close chat button */
  close: string;
  /** Generic error message displayed when a chat action fails */
  error: string;
  /** Attribution text displayed in the chat (e.g., "Powered by OpenAI") */
  poweredBy: string;
  /** Title of the welcome message displayed when opening the chat */
  welcomeTitle: string;
  /** Subtitle or description of the welcome message */
  welcomeSubtitle: string;
  /** List of suggested prompts or questions to help the user start a conversation */
  suggestions: string[];
}

/**
 * Represents a single day of GitHub contributions.
 * @description Dynamic Data & API (GitHub)
 */
export interface ContributionDay {
  /** Number of contributions made on this day */
  contributionCount: number;
  /** Date of the contributions */
  date: string;
}

/**
 * Represents a week of GitHub contributions.
 * @description Dynamic Data & API (GitHub)
 */
export interface Week {
  /** List of contribution days within the week */
  contributionDays: ContributionDay[];
}

/**
 * Represents a GitHub repository.
 * @description Dynamic Data & API (GitHub)
 */
export interface Repo {
  /** Name of the repository */
  name: string;
  /** Description of the repository */
  description: string | null;
  /** URL of the repository */
  url: string;
  /** Number of stars the repository has */
  stargazerCount: number;
  /** Number of forks the repository has */
  forkCount: number;
  /** Primary programming language used in the repository */
  primaryLanguage: {
    /** Name of the language */
    name: string;
    /** Color hex code associated with the language */
    color: string;
  } | null;
}

/**
 * GitHub data aggregated for display.
 * @description Dynamic Data & API (GitHub)
 */
export interface GitHubData {
  /** Total number of contributions in the given period */
  totalContributions: number;
  /** Weekly contribution data */
  weeks: Week[];
  /** List of repositories */
  repos: Repo[];
}

/**
 * Base metadata for MDX posts.
 * @description MDX Posts Types (Blog & Projects)
 */
export interface BaseMetadata {
  /** Primary title of the post */
  title: string;
  /** Portuguese title of the post */
  title_pt?: string;
  /** English title of the post */
  title_en?: string;
  /** Publication date */
  publishedAt: string;
  /** Primary summary of the post */
  summary: string;
  /** Portuguese summary of the post */
  summary_pt?: string;
  /** English summary of the post */
  summary_en?: string;
  /** Main image for the post */
  image?: string;
  /** Array of additional images */
  images?: string[];
  /** Primary tag or category */
  tag?: string;
  /** Portuguese tag or category */
  tag_pt?: string;
  /** English tag or category */
  tag_en?: string;
  /** Indicates if the post is a draft */
  draft?: boolean;
}

/**
 * Metadata specifically for project MDX posts.
 * @description MDX Posts Types (Blog & Projects)
 */
export interface ProjectMetadata extends BaseMetadata {
  /** Team members involved in the project */
  team?: Array<{
    /** Name of the team member */
    name: string;
    /** Role of the team member */
    role: string;
    /** URL to the avatar image */
    avatar: string;
    /** LinkedIn profile URL */
    linkedIn: string;
  }>;
  /** External link to the live project */
  link?: string;
  /** URL to the project's source code repository */
  repository?: string;
}

/**
 * Represents a blog post parsed from MDX.
 * @description MDX Posts Types (Blog & Projects)
 */
export interface PostData {
  /** Unique slug for the post URL */
  slug: string;
  /** Metadata associated with the post */
  metadata: BaseMetadata;
  /** Raw or compiled MDX content */
  content: string;
}

/**
 * Represents a project post parsed from MDX.
 * @description MDX Posts Types (Blog & Projects)
 */
export interface ProjectData {
  /** Unique slug for the project URL */
  slug: string;
  /** Metadata associated with the project */
  metadata: ProjectMetadata;
  /** Raw or compiled MDX content */
  content: string;
}

/**
 * Properties for the PostViews component.
 * @description Component props for tracking and displaying post views.
 */
export interface PostViewsProps {
  /** Unique slug for the post URL */
  slug: string;
  /** If true, also fires a POST to increment the view count on mount */
  track?: boolean;
}

/**
 * Global typing that combines all pages and settings
 * and defines the exact format of the language files (pt.tsx and en.tsx).
 */
export type ContentTranslation = {
  person: Person;
  social: Social;
  newsletter: Newsletter;
  home: Home;
  about: About;
  blog: Blog;
  work: Work;
  gallery: Gallery;
  chat: Chat;
};
