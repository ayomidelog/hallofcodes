import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "@/components/ui/CodeBlock";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  extractHeadings,
  getAllPosts,
  getPostBySlug,
  PostEntry,
  PostHeading,
  slugify,
} from "@/lib/posts";
import BlogCard from "@/components/ui/BlogCard";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.data.title ?? "Blog Post",
    description: post.data.excerpt ?? "Read this blog post.",
    keywords: post.data.topics,
    authors: [
      {
        name: post.data.author,
        url: post.data.author_url ?? undefined,
      },
    ],
    openGraph: {
      title: post.data.title,
      description: post.data.excerpt,
      type: "article",
      siteName: "Hall of Codes",
      locale: "en_US",
      images: [
        {
          url:
            post.data.og_image ?? "https://www.hallofcodes.org/hoc-cover.png",
          width: 1200,
          height: 630,
          alt: post.data.title ?? "Hall of Codes Logo",
        },
      ],
    },
    alternates: {
      canonical: `https://www.hallofcodes.org/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: post.data.excerpt,
      images: [
        {
          url:
            post.data.og_image ?? "https://www.hallofcodes.org/hoc-cover.png",
          width: 1200,
          height: 630,
          alt: post.data.title ?? "Hall of Codes Logo",
        },
      ],
    },
  };
}

/**
 * Table of Contents component that generates a list of links based on the headings in the blog post.
 *
 * @param headings - An array of Heading objects containing the level, text, and id for each heading in the blog post.
 * @returns A React component that renders the table of contents, or null if there are no headings.
 */
function TableOfContents({ headings }: { headings: PostHeading[] }) {
  if (!headings.length) return null;

  return (
    <aside className="hidden xl:block w-64 sticky top-24 self-start">
      <div className="text-sm font-semibold mb-3">On this page</div>

      <ul className="space-y-1 text-sm">
        {headings.map((h, i) => (
          <li
            key={i}
            style={{
              paddingLeft: `${(h.level - 1) * 12}px`,
            }}
          >
            <a
              href={`#${h.id}`}
              className="text-gray-400 transition-colors hover:text-cyan-300"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);
  const posts = getAllPosts();
  if (!post) notFound();

  const { content, data } = post;

  const headings = extractHeadings(content);
  const estimatedReadingTime = Math.ceil(content.split(" ").length / 200);

  const components = {
    h1: (props: any) => {
      const id = slugify(props.children?.toString() || "");
      return <h1 id={id} {...props} />;
    },
    h2: (props: any) => {
      const id = slugify(props.children?.toString() || "");
      return <h2 id={id} {...props} />;
    },
    h3: (props: any) => {
      const id = slugify(props.children?.toString() || "");
      return <h3 id={id} {...props} />;
    },
    pre: (props: any) => <pre {...props} />,
    code: (props: any) => <CodeBlock {...props} />,
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <div className="flex gap-10 w-full max-w-6xl">
          <div className="prose prose-invert w-full max-w-none xl:max-w-prose p-4 md:p-8 flex-1 min-w-0">
            <header className="not-prose mb-12 border-b border-white/10 pb-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                Back to the journal
              </Link>

              <h1 className="mt-8 text-4xl font-bold leading-tight text-white md:text-5xl">
                {data.title}
                <span
                  className="caret-blink ml-2 inline-block h-[0.75em] w-[0.4em] translate-y-[0.05em] bg-cyan-300"
                  aria-hidden
                />
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-400">
                {data.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-gray-500">
                <a
                  href={data.author_url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  title={data.author}
                  className="inline-flex items-center gap-2 text-gray-300 transition hover:text-cyan-300"
                >
                  <FontAwesomeIcon icon={faUser} />@{data.author}
                </a>
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendar} />
                  {data.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} />
                  {estimatedReadingTime} min read
                </span>
              </div>

              {data.topics && data.topics.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {data.topics.map((topic: string, number: number) => (
                    <span
                      key={number}
                      className="inline-flex border border-white/15 px-2.5 py-1 font-mono text-xs capitalize text-gray-400"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <MDXRemote source={content} components={components} />
          </div>
        </div>

        <TableOfContents headings={headings} />
      </div>

      <div className="flex justify-center">
        <div className="p-10 gap-10 pt-10 w-full max-w-6xl">
          <h3 className="text-lg font-semibold mb-3">More posts</h3>

          {posts.length > 1 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {posts
                .filter((p) => p.slug !== slug)
                .slice(0, 4)
                .map((post: PostEntry, index: number) => (
                  <BlogCard key={index} post={post} />
                ))}
            </ul>
          ) : (
            <p className="text-gray-400">
              No other posts available. Consider contributing your own insights
              and experiences to our blog!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
