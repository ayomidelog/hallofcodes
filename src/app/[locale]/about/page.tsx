import PageHeader, {
  headerPrimaryAction,
  headerSecondaryAction,
} from "@/components/ui/PageHeader";
import ScrambleText from "@/components/ui/ScrambleText";
import founders from "@/lib/founders";
import { getMembers } from "@/lib/github/members";
import { getRepositories } from "@/lib/github/repositories";
import timeline, { TimelineEntry } from "@/lib/timeline";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faBullseye,
  faChalkboardUser,
  faCodeCommit,
  faCodePullRequest,
  faEye,
  faRocket,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Hall of Codes",
  description:
    "The story of Hall of Codes: how a small crew of developers in 2019 grew into an open-source community that builds together.",
  alternates: {
    canonical: "https://www.hallofcodes.org/about",
  },
  openGraph: {
    title: "About - Hall of Codes",
    description:
      "The story of Hall of Codes: how a small crew of developers in 2019 grew into an open-source community that builds together.",
    url: "https://www.hallofcodes.org/about",
    siteName: "Hall of Codes",
    images: [
      {
        url: "https://www.hallofcodes.org/hoc-cover.png",
        width: 1200,
        height: 630,
        alt: "Hall of Codes Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Hall of Codes",
    description:
      "The story of Hall of Codes: how a small crew of developers in 2019 grew into an open-source community that builds together.",
    images: [
      {
        url: "https://www.hallofcodes.org/hoc-cover.png",
        width: 1200,
        height: 630,
        alt: "Hall of Codes Logo",
      },
    ],
  },
};

const principles = [
  {
    icon: faChalkboardUser,
    title: "Mentor in the open",
    description:
      "Newcomers learn by pairing with people who have shipped before. Questions are welcome in every channel.",
  },
  {
    icon: faCodePullRequest,
    title: "Review generously",
    description:
      "Every pull request is a conversation. We review to teach and to learn, never to gatekeep.",
  },
  {
    icon: faRocket,
    title: "Ship real things",
    description:
      "Ideas become repositories, repositories become tools that people actually use.",
  },
  {
    icon: faSeedling,
    title: "Grow maintainers",
    description:
      "Contributors are given room, trust, and responsibility until they are the ones holding the keys.",
  },
];

const FOUNDED = 2019;

export default async function About() {
  const [members, repositories] = await Promise.all([
    getMembers(),
    getRepositories(),
  ]);
  const years = new Date().getFullYear() - FOUNDED;

  return (
    <main className="bg-[#090d16] text-white">
      <PageHeader
        title="About Hall of Codes"
        subtitle="Since 2019."
        description="A small crew with big ideas and questionable sleep schedules grew into an open-source community that mentors, reviews, and ships together."
        watermark="about"
        terminal={{
          path: "~/hallofcodes",
          command: 'git log --reverse --format="%ad  %s"',
          output: timeline.map((entry) => ({
            text: `${entry.date.slice(-4)}  ${entry.heading}`,
          })),
        }}
        stats={[
          { value: FOUNDED, label: "the community began" },
          { value: `${years}+`, label: "years building together" },
          { value: `${members.length}+`, label: "public GitHub members" },
          { value: repositories.length, label: "active repositories" },
        ]}
        actions={
          <>
            <a
              href="https://github.com/hallofcodes/join"
              target="_blank"
              rel="noreferrer"
              className={headerPrimaryAction}
            >
              <FontAwesomeIcon icon={faGithub} />
              Join the organization
            </a>
            <a href="#history" className={headerSecondaryAction}>
              Read the history
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </a>
          </>
        }
      />

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <ScrambleText
            as="h2"
            text="Generosity, not gatekeeping."
            durationMs={2000}
            className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl"
          />
          <div className="space-y-6 text-base leading-8 text-gray-300 md:text-lg">
            <p>
              Hall of Codes started with a simple belief: strong software
              communities are designed around generosity. We bring developers,
              maintainers, and curious builders into the same room and give them
              a reason to stay.
            </p>
            <p>
              We mentor newcomers, review each other&apos;s work, and turn
              useful ideas into sustainable open-source projects. Different
              backgrounds, stacks, and time zones, with one shared habit:
              helping useful work move forward.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/10 md:grid-cols-2">
          {[
            {
              icon: faBullseye,
              title: "Mission",
              text: "Make collaboration easier than conflict by giving developers the context, mentorship, and trust needed to ship together.",
            },
            {
              icon: faEye,
              title: "Vision",
              text: "A global network where every useful idea can find a team and every contributor has room to become a maintainer.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="group bg-[#090d16] px-6 py-14 md:px-10 md:py-20"
            >
              <span className="flex size-11 items-center justify-center border border-white/15 text-gray-300 transition group-hover:border-cyan-300 group-hover:text-cyan-300">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <h2 className="mt-10 text-3xl font-semibold text-white md:text-4xl">
                {item.title}
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-gray-400">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <ScrambleText
            as="h2"
            text="How we work"
            durationMs={2000}
            className="text-4xl font-semibold leading-tight text-white md:text-5xl"
          />
          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <article
                key={principle.title}
                className="group bg-[#090d16] p-8 transition hover:bg-white/[0.03]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center border border-white/15 text-gray-300 transition group-hover:border-cyan-300 group-hover:text-cyan-300">
                    <FontAwesomeIcon icon={principle.icon} />
                  </span>
                  <span className="font-mono text-xs text-gray-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-10 text-xl font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-400">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="history" className="scroll-mt-20 border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ScrambleText
              as="h2"
              text="The commit history"
              durationMs={2000}
              className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl"
            />
            <p className="mt-6 max-w-md leading-8 text-gray-400">
              From a handful of Android developers to a GitHub organization, a
              .org domain, and a community spread across time zones. Every
              milestone, in order.
            </p>
          </div>

          <ol className="relative border-l border-white/10">
            {timeline.map((entry: TimelineEntry, index: number) => (
              <li
                key={`${entry.date}-${entry.heading}`}
                className="group relative pb-12 pl-10 last:pb-0"
                data-aos="fade-up"
              >
                <span className="absolute -left-[13px] top-0 flex size-[25px] items-center justify-center border border-white/15 bg-[#090d16] text-[10px] text-gray-500 transition group-hover:border-cyan-300 group-hover:text-cyan-300">
                  <FontAwesomeIcon icon={faCodeCommit} />
                </span>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-500">{entry.date}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">
                  {entry.heading}
                </h3>
                <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                  {entry.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <ScrambleText
            as="h2"
            text="The first commit"
            durationMs={2000}
            className="text-4xl font-semibold leading-tight text-white md:text-5xl"
          />
          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {founders.map((founder) => (
              <a
                key={founder.username}
                href={`https://github.com/${founder.username}`}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-6 bg-[#090d16] p-8 transition hover:bg-white/[0.03] sm:flex-row sm:items-start"
              >
                <Image
                  src={`https://avatars.githubusercontent.com/${founder.username}`}
                  alt={founder.name}
                  width={112}
                  height={112}
                  className="size-24 shrink-0 object-cover grayscale transition duration-300 group-hover:grayscale-0"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {founder.role} &middot; @{founder.username}
                  </p>
                  <p className="mt-4 leading-7 text-gray-400">
                    {founder.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1fr_auto]">
          <div>
            <ScrambleText
              as="h2"
              text="Write the next entry with us."
              durationMs={2000}
              className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl"
            />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              The history is still being written. Find collaborators, pick up
              an issue, or bring an idea the community can build with you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/community" className={headerPrimaryAction}>
              Join the community
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
            <Link href="/projects" className={headerSecondaryAction}>
              Browse projects
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
