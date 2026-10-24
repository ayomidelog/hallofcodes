import BlogCard from "@/components/ui/BlogCard";
import PageHeader, {
  headerPrimaryAction,
  headerSecondaryAction,
} from "@/components/ui/PageHeader";
import {
  faArrowLeft,
  faArrowRight,
  faPenNib,
  faRss,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllPosts, PostEntry } from "@/lib/posts";
import { Metadata } from "next";
import Link from "next/link";

const POSTS_PER_PAGE = 12;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const rawPage = Number(sp?.page ?? "1");
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  return {
    title: `Blog - Page ${page}`,
    description: `Browse our blog posts, insights, and experiences on software development, technology trends, and personal growth in the tech industry. Page ${page}.`,
    keywords: ["blog", "software development", "technology", "personal growth"],
    openGraph: {
      title: `Blog - Page ${page}`,
      description: `Browse our blog posts, insights, and experiences on software development, technology trends, and personal growth in the tech industry. Page ${page}.`,
      type: "website",
      siteName: "Hall of Codes",
      locale: "en_US",
    },
    alternates: {
      canonical: `https://www.hallofcodes.org/blog?page=${page}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog - Page ${page}`,
      description: `Browse our blog posts, insights, and experiences on software development, technology trends, and personal growth in the tech industry. Page ${page}.`,
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const rawPage = Number(sp?.page ?? "1");
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const posts = getAllPosts();
  const authors = new Set(posts.map((post) => post.author)).size;
  const topics = new Set(posts.flatMap((post) => post.topics ?? [])).size;
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, end);

  return (
    <main className="bg-[#090d16] text-white">
      <PageHeader
        title="Stories from the build."
        subtitle="Read, learn, and grow."
        description="Insights on software development, technology trends, and growth in the tech industry, written by builders for builders."
        watermark="journal"
        terminal={{
          path: "~/hallofcodes/content/blog",
          command: "tail -n 5 journal.log",
          output: posts.slice(0, 5).map((post) => ({
            text: `${post.date}  ${post.title}`,
          })),
        }}
        stats={[
          { value: String(posts.length).padStart(2, "0"), label: "articles published" },
          { value: authors, label: "community authors" },
          { value: topics, label: "topics explored" },
          { value: "RSS", label: "subscribe at /rss.xml" },
        ]}
        actions={
          <>
            <Link
              href="/blog/contribute-to-hall-of-codes-blog"
              className={headerPrimaryAction}
            >
              <FontAwesomeIcon icon={faPenNib} />
              Write for the blog
            </Link>
            <a href="/rss.xml" className={headerSecondaryAction}>
              <FontAwesomeIcon icon={faRss} />
              RSS feed
            </a>
          </>
        }
      />

      <section>
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Real stories. Real insights.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                Dive into our members&apos; experiences, lessons learned, and
                thoughts on software development, technology, and personal
                growth.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {paginatedPosts.map((post: PostEntry, index: number) => (
              <BlogCard key={index} post={post} />
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-sm">
            {safePage > 1 ? (
              <Link
                href={`/blog?page=${safePage - 1}`}
                className="inline-flex items-center border border-white/20 px-4 py-2 text-gray-200 transition hover:border-white hover:text-white"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-xs" />
                Previous
              </Link>
            ) : (
              <span />
            )}
            <span className="text-gray-500">
              Page {safePage} of {totalPages}
            </span>
            {safePage < totalPages ? (
              <Link
                href={`/blog?page=${safePage + 1}`}
                className="inline-flex items-center border border-white/20 px-4 py-2 text-gray-200 transition hover:border-white hover:text-white"
              >
                Next
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
