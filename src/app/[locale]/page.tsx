import { projects } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import { getMembers } from "@/lib/github/members";
import { getRepositories } from "@/lib/github/repositories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faArrowUpRightFromSquare,
  faCircleInfo,
  faCode,
  faCodeCommit,
  faComments,
  faHandPointer,
  faIdCard,
  faPenNib,
  faStar,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ScrambleText from "@/components/ui/ScrambleText";
import portfolio from "@/lib/portfolio";
import { getAllPosts, PostEntry } from "@/lib/posts";
import { fetchTrackedMembers } from "@/lib/wakatime/leaderboards";
import HallOfFame from "./components/HallOfFame";
import MemberGlobe from "@/components/ui/MemberGlobe";
import {
  headerPrimaryAction,
  headerSecondaryAction,
} from "@/components/ui/PageHeader";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string) {
  return dateFormat.format(new Date(value));
}

export const dynamic = "force-static";

export default async function Home() {
  const [members, getLeaderboards, repositories] = await Promise.all([
    getMembers(),
    fetchTrackedMembers(),
    getRepositories(),
  ]);

  const posts = getAllPosts();
  const [latestPost, ...rest] = posts;
  const otherPosts = rest.slice(0, 3);

  const featured = projects[0];
  const recentRepos = repositories
    .filter((repo) => !repo.archived && !repo.name.startsWith("."))
    .sort(
      (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, 5);

  const directory = [
    {
      href: "/about",
      path: "/about",
      icon: faCircleInfo,
      label: "About",
      count: "since 2019",
      description: "Our story, mission, how we work, and the people who made the first commit.",
      cta: "Read the history",
    },
    {
      href: "/members",
      path: "/members",
      icon: faUserGroup,
      label: "Members",
      count: `${members.length}+`,
      description: "Every public member of the GitHub organization, in one place.",
      cta: "Meet everyone",
    },
    {
      href: "/projects",
      path: "/projects",
      icon: faCode,
      label: "Projects",
      count: String(projects.length).padStart(2, "0"),
      description: "Tools and experiments the community designed, built, and still maintains.",
      cta: "See what we ship",
    },
    {
      href: "/community",
      path: "/community",
      icon: faComments,
      label: "Community",
      count: "4 channels",
      description: "Where we talk: GitHub, Codeberg, WhatsApp, and Messenger, plus events and sponsors.",
      cta: "Join the conversation",
    },
    {
      href: "/portfolio",
      path: "/portfolio",
      icon: faIdCard,
      label: "Portfolio",
      count: String(portfolio.length).padStart(2, "0"),
      description: "Personal sites from members, and how to get yours featured.",
      cta: "Browse portfolios",
    },
    {
      href: "/blog",
      path: "/blog",
      icon: faPenNib,
      label: "Blog",
      count: `${posts.length} articles`,
      description: "Lessons on security, databases, PHP, AI, and maintaining open source.",
      cta: "Start reading",
    },
  ];

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hall of Codes",
    url: "https://www.hallofcodes.org",
    logo: "https://www.hallofcodes.org/hoc-icon.png",
    sameAs: [
      "https://www.facebook.com/hallofcodes",
      "https://github.com/hallofcodes",
    ],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hall of Codes",
    url: "https://www.hallofcodes.org",
    inLanguage: "en",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, webSite],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <main className="overflow-hidden bg-[#090d16] text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <video
            className="absolute inset-0 h-full w-full object-cover grayscale"
            autoPlay
            muted
            loop
            playsInline
            data-aos="fade-in"
            data-aos-duration="2000"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[#090d16]/85" />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            aria-hidden
          >
            <defs>
              <pattern
                id="home-hero-grid"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M48 0H0V48"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-hero-grid)" />
          </svg>

          <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 md:pt-40">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold leading-[1.02] md:text-7xl lg:text-[5.25rem]">
                  Hall of Codes
                  <span className="mt-2 block text-gray-500 lg:whitespace-nowrap lg:text-[0.82em]">
                    <ScrambleText text="Build together." durationMs={1600} />
                    <span
                      className="caret-blink ml-2 inline-block h-[0.75em] w-[0.4em] translate-y-[0.05em] bg-cyan-300"
                      aria-hidden
                    />
                  </span>
                </h1>

                <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-gray-300 md:text-lg lg:mx-0">
                  We bring developers together to build meaningful projects,
                  support one another, and keep the spirit of open source
                  alive.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link href="/members" className={headerPrimaryAction}>
                    Meet the members
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </Link>
                  <Link href="/projects" className={headerSecondaryAction}>
                    Browse projects
                  </Link>
                  <a
                    href="https://github.com/hallofcodes/join"
                    target="_blank"
                    rel="noreferrer"
                    className={headerSecondaryAction}
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    Join
                  </a>
                </div>
              </div>

              <figure className="mx-auto w-full max-w-[34rem]">
                <MemberGlobe members={members} />
                <figcaption className="mt-2 flex items-center justify-center gap-3 font-mono text-xs text-gray-500">
                  <FontAwesomeIcon icon={faHandPointer} />
                  Drag to spin. Hover a face to say hi.
                </figcaption>
              </figure>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4">
              {[
                { value: `${members.length}+`, label: "public GitHub members" },
                { value: repositories.length, label: "active repositories" },
                { value: posts.length, label: "journal articles" },
                { value: 2019, label: "building since" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col bg-[#090d16]/90 p-4 sm:p-6"
                >
                  <dt className="order-2 mt-2 text-xs text-gray-500 md:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-2xl font-semibold text-white md:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="#explore"
              className="mx-auto mt-10 flex w-fit items-center gap-3 font-mono text-xs text-gray-500 transition hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowDown} className="animate-bounce" />
              scroll to explore
            </a>
          </div>
        </section>

        <section id="explore" className="scroll-mt-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <ScrambleText
                  as="h2"
                  text="Find your way around."
                  durationMs={2000}
                  className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl"
                />
                <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
                  Everything the community builds, writes, and shares, one
                  click away. Pick a door.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition hover:gap-5 hover:text-white"
              >
                New here? Read our story
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {directory.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col bg-[#090d16] p-8 transition hover:bg-white/[0.03]"
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center border border-white/15 text-gray-300 transition group-hover:border-cyan-300 group-hover:text-cyan-300">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <span className="font-mono text-xs text-gray-600">
                      {item.path}
                    </span>
                  </div>
                  <div className="mt-10 flex items-baseline gap-3">
                    <h3 className="text-2xl font-semibold text-white">
                      {item.label}
                    </h3>
                    <span className="font-mono text-sm text-gray-500">
                      {item.count}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 leading-7 text-gray-400">
                    {item.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition group-hover:gap-5 group-hover:text-white">
                    {item.cta}
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d1420]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <HallOfFame members={getLeaderboards} />
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <ScrambleText
                as="h2"
                text="Shipping right now."
                durationMs={2000}
                className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl"
              />
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition hover:gap-5 hover:text-white"
              >
                All {projects.length} featured projects
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[1.25fr_0.75fr]">
              <article className="group flex flex-col bg-[#090d16]">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
                  <Image
                    src={featured.coverImage}
                    alt={`${featured.name} cover`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <span className="font-mono text-xs text-gray-500">
                    Featured project
                  </span>
                  <h3 className="mt-3 text-3xl font-semibold text-white">
                    {featured.name}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                    {featured.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/10 px-2 py-0.5 font-mono text-[11px] text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {featured.homepage && (
                      <a
                        href={featured.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className={headerPrimaryAction}
                      >
                        Try it live
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="text-xs"
                        />
                      </a>
                    )}
                    <a
                      href={featured.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className={headerSecondaryAction}
                    >
                      <FontAwesomeIcon icon={faGithub} />
                      Source
                    </a>
                  </div>
                </div>
              </article>

              <div className="flex flex-col bg-[#090d16] p-8">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-white">
                  <FontAwesomeIcon
                    icon={faCodeCommit}
                    className="text-cyan-300"
                  />
                  Latest pushes
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Repositories with the most recent commits across the
                  organization.
                </p>
                <ol className="mt-6 flex-1 border-t border-white/10">
                  {recentRepos.map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/repo block border-b border-white/10 py-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate font-mono text-sm text-gray-200 transition group-hover/repo:text-cyan-300">
                            {repo.name}
                          </span>
                          <span className="shrink-0 font-mono text-[11px] text-gray-600">
                            {formatDate(repo.pushed_at)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                          {repo.language && <span>{repo.language}</span>}
                          <span className="inline-flex items-center gap-1">
                            <FontAwesomeIcon icon={faStar} />
                            {repo.stars}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ol>
                <a
                  href="https://github.com/hallofcodes?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition hover:gap-5 hover:text-white"
                >
                  All {repositories.length} repositories
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d1420]">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
            <div>
              <ScrambleText
                as="h2"
                text="Meet the builders"
                durationMs={2000}
                className="text-4xl font-semibold leading-tight text-white md:text-5xl"
              />
              <p className="mt-6 max-w-md leading-8 text-gray-400">
                Different backgrounds, stacks, and time zones. One shared
                habit: helping useful work move forward.
              </p>

              <div className="mt-10 grid grid-cols-6 gap-px border border-white/10 bg-white/10">
                {members.slice(0, 17).map((member) => (
                  <a
                    key={member.login}
                    href={`https://github.com/${member.login}`}
                    target="_blank"
                    rel="noreferrer"
                    title={`@${member.login}`}
                    className="group aspect-square bg-[#0d1420] p-2"
                  >
                    <Image
                      src={member.avatar}
                      alt={`@${member.login}`}
                      width={72}
                      height={72}
                      className="size-full rounded-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                    />
                  </a>
                ))}
                <Link
                  href="/members"
                  className="flex aspect-square items-center justify-center bg-[#0d1420] font-mono text-xs text-gray-400 transition hover:text-cyan-300"
                  aria-label={`See all ${members.length} members`}
                >
                  +{Math.max(0, members.length - 17)}
                </Link>
              </div>

              <Link
                href="/members"
                className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition hover:gap-5 hover:text-white"
              >
                All {members.length} members
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            <div>
              <ScrambleText
                as="h2"
                text="Their best work"
                durationMs={2000}
                className="text-4xl font-semibold leading-tight text-white md:text-5xl"
              />
              <p className="mt-6 max-w-md leading-8 text-gray-400">
                Personal portfolios from members, built with their own themes
                and style.
              </p>

              <ul className="mt-10 border-t border-white/10">
                {portfolio.slice(0, 3).map((item) => (
                  <li key={item.link}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid grid-cols-[6rem_1fr_auto] items-center gap-5 border-b border-white/10 py-4"
                    >
                      <span className="relative aspect-[4/3] overflow-hidden border border-white/10">
                        <Image
                          src={item.img_url}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover grayscale transition duration-300 group-hover:grayscale-0"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-white">
                          {item.name}
                        </span>
                        <span className="block truncate text-sm text-gray-500">
                          {item.title}
                        </span>
                      </span>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="text-xs text-gray-600 transition group-hover:text-white"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <Link
                href="/portfolio"
                className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition hover:gap-5 hover:text-white"
              >
                All {portfolio.length} portfolios
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <ScrambleText
                  as="h2"
                  text="From the journal"
                  durationMs={2000}
                  className="text-4xl font-semibold leading-tight text-white md:text-5xl"
                />
                <p className="mt-6 max-w-md leading-8 text-gray-400">
                  Lessons from building together and maintaining open source,
                  written by members.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition hover:gap-5 hover:text-white"
              >
                Browse the journal
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            {latestPost && (
              <div className="mt-12 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[1.1fr_0.9fr]">
                <Link
                  href={`/blog/${latestPost.slug}`}
                  className="group flex flex-col justify-between gap-10 bg-[#090d16] p-8 transition hover:bg-white/[0.03] md:p-10"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-gray-500">
                      <span className="text-cyan-300">Latest</span>
                      <span className="capitalize">
                        {latestPost.topics?.[0] ?? "general"}
                      </span>
                      <span>{latestPost.date}</span>
                    </div>
                    <h3 className="mt-6 text-3xl font-semibold leading-tight text-white md:text-4xl">
                      {latestPost.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 max-w-xl leading-8 text-gray-400">
                      {latestPost.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition group-hover:gap-5 group-hover:text-white">
                    Read by @{latestPost.author}
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </span>
                </Link>

                <div className="flex flex-col bg-[#090d16]">
                  {otherPosts.map((post: PostEntry) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex-1 border-b border-white/10 p-6 transition last:border-b-0 hover:bg-white/[0.03] md:p-8"
                    >
                      <div className="flex flex-wrap items-center gap-x-4 font-mono text-xs text-gray-500">
                        <span className="capitalize">
                          {post.topics?.[0] ?? "general"}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold leading-snug text-white transition group-hover:text-cyan-300">
                        {post.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-7xl items-end gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1fr_auto]">
            <div>
              <ScrambleText
                as="h2"
                text="Bring the next idea."
                durationMs={2000}
                className="max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl"
                aria-label="Join Hall of Codes"
              />
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                Find collaborators, contribute to active projects, or start
                something the community can build with you.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/community" className={headerPrimaryAction}>
                Join the community
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
              <a
                href="https://github.com/hallofcodes"
                target="_blank"
                rel="noreferrer"
                className={headerSecondaryAction}
              >
                <FontAwesomeIcon icon={faGithub} />
                GitHub organization
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
