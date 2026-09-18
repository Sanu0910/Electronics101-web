import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getPost } from "@/content/misc";
import {
  Badge,
  Container,
  PlaceholderTag,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { BlogCard } from "@/components/cards";
import { CopyLink } from "@/components/ui/CopyLink";
import { formatDate, readingTime } from "@/lib/utils";
import { site } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} · ${site.name}`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

/**
 * A deliberately small Markdown renderer for the subset these posts use:
 * `##` headings, `*emphasis*` and paragraphs. Pulling in a full Markdown
 * pipeline for three constructs would be a dependency doing almost nothing,
 * and this keeps the rendered output server-side and sanitised by React.
 */
function Body({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n{2,}/);
  return (
    <div className="mt-10 space-y-6">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 text-2xl font-bold tracking-tight">
              {block.slice(3)}
            </h2>
          );
        }
        const emphasised = block.startsWith("*") && block.endsWith("*");
        return (
          <p
            key={i}
            className={
              emphasised
                ? "rounded-xl border border-line bg-subtle p-4 text-sm italic text-faint"
                : "text-lg leading-relaxed text-muted"
            }
          >
            {emphasised ? block.slice(1, -1) : block}
          </p>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter(
    (p) => p.slug !== post.slug && p.domains.some((d) => post.domains.includes(d)),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/brand/icon-512.png` },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section>
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <Link href="/blog" className="text-faint transition-colors hover:text-accent">
              Blog
            </Link>
            <span className="mx-2 text-faint" aria-hidden="true">
              /
            </span>
            <span className="text-muted">{post.title}</span>
          </nav>

          <article>
            <div className="flex flex-wrap items-center gap-2">
              {post.domains.map((d) => (
                <Badge key={d} tone="accent">
                  {d}
                </Badge>
              ))}
              {post.placeholder ? <PlaceholderTag /> : null}
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-faint">
              <time dateTime={post.publishedAt} className="tabular">
                {formatDate(post.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.readingMinutes)}</span>
              <CopyLink path={`/blog/${post.slug}`} />
            </div>

            <Body markdown={post.body} />

            <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line px-3 py-1 text-xs text-faint"
                >
                  #{t}
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </Section>

      {related.length ? (
        <Section tone="subtle">
          <Container wide>
            <SectionHead eyebrow="Related" title="Read next" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} item={p} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
