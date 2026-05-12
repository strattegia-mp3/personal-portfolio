import { notFound } from "next/navigation";
import { getPosts, Team } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { DynamicTitle } from "@/components/mdx/DynamicTitle";
import {
  ProjectsLabel,
  RelatedProjectsTitle,
} from "@/components/i18n/ClientLabels";
import { TitleManager } from "@/components/i18n/TitleManager";
import { ProjectLinks } from "@/components/work/ProjectLinks";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image:
      post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const allProjects = getPosts(["src", "app", "work", "projects"]);
  let post = allProjects.find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person: Team) => ({
      src: person.avatar,
    })) || [];

  const titleDefault = post.metadata.title;
  const titleEn = post.metadata.title_en || titleDefault;
  const titlePt = post.metadata.title_pt || titleDefault;

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <TitleManager
        titlePt={`${titlePt} | Projetos`}
        titleEn={`${titleEn} | Projects`}
      />
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image ||
          `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <ProjectsLabel />
        </SmartLink>
        <Text
          variant="body-default-xs"
          onBackground="neutral-weak"
          marginBottom="12"
        >
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <DynamicTitle
          fallback={post.metadata.title}
          titleEn={post.metadata.title_en}
          titlePt={post.metadata.title_pt}
        />
      </Column>

      {/* Margem inferior ajustada para dar espaço aos links */}
      <Row marginBottom="16" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && (
            <AvatarGroup reverse avatars={avatars} size="s" />
          )}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member: Team, idx: number) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>

      <ProjectLinks
        link={post.metadata.link}
        repository={post.metadata.repository}
      />

      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <RelatedProjectsTitle />
        <Projects posts={allProjects} exclude={[post.slug]} range={[1, 2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
