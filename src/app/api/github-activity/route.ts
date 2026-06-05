import { NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "strattegia-mp3";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Busca contribuições dos últimos 52 semanas via GitHub GraphQL API
 * e os 6 repos públicos com mais stars.
 *
 * GET /api/github-activity
 * Cache: revalidate a cada 1h (edge-cached pelo Next.js)
 */
export const revalidate = 3600;

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage { name color }
            isPrivate
          }
        }
      }
      repositories(
        first: 6
        orderBy: { field: STARGAZERS, direction: DESC }
        privacy: PUBLIC
        isFork: false
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name color }
        }
      }
    }
  }
`;

export async function GET() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  };

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { login: GITHUB_USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: res.status });
    }

    const { data, errors } = await res.json();

    if (errors || !data?.user) {
      return NextResponse.json({ error: "No data returned" }, { status: 502 });
    }

    const { contributionCalendar } = data.user.contributionsCollection;
    const pinnedRepos: any[] = data.user.pinnedItems?.nodes ?? [];
    const topRepos: any[] = data.user.repositories?.nodes ?? [];

    // Usa pinned se disponíveis, senão cai para top por stars
    const repos = (pinnedRepos.length > 0 ? pinnedRepos : topRepos)
      .filter((r: any) => !r.isPrivate)
      .slice(0, 6);

    return NextResponse.json({
      totalContributions: contributionCalendar.totalContributions,
      weeks: contributionCalendar.weeks,
      repos,
    });
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
