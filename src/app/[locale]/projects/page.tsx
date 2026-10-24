import type { Metadata } from "next";
import TimelineCard from "@/components/ui/TimelineCard";
import PageHeader, {
  headerPrimaryAction,
  headerSecondaryAction,
} from "@/components/ui/PageHeader";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects - Hall of Codes",
  description:
    "Explore community-built open-source projects crafted by our builders.",
  alternates: {
    canonical: "https://www.hallofcodes.org/projects",
  },
  openGraph: {
    title: "Projects - Hall of Codes",
    description:
      "Explore community-built open-source projects crafted by our builders.",
    url: "https://www.hallofcodes.org/projects",
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
    title: "Projects - Hall of Codes",
    description:
      "Explore community-built open-source projects crafted by our builders.",
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

export default function Projects() {
  const displayProjects = projects.slice(0, 6);
  const tags = new Set(projects.flatMap((project) => project.tags));

  return (
    <main className="bg-[#090d16] text-white">
      <PageHeader
        title="Projects built by our devs."
        subtitle="Shipped, not handed off."
        description="Tools, experiments, and community infrastructure built through practical collaboration rather than handoffs."
        watermark="projects"
        terminal={{
          path: "~/hallofcodes/projects",
          command: "ls -1 ~/hallofcodes/projects",
          output: projects.map((project) => ({
            text: `${project.slug}/`,
          })),
        }}
        stats={[
          {
            value: String(projects.length).padStart(2, "0"),
            label: "featured projects",
          },
          { value: tags.size, label: "topics covered" },
          {
            value: projects.filter((p) => p.homepage).length,
            label: "live deployments",
          },
        ]}
        actions={
          <>
            <a
              href="https://github.com/hallofcodes?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className={headerPrimaryAction}
            >
              <FontAwesomeIcon icon={faGithub} />
              All repositories
            </a>
            <Link href="/community" className={headerSecondaryAction}>
              Pitch a project
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </>
        }
      />

      <section className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="relative">
          {/* Vertical spine line */}
          <div className="absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 bg-white/10 md:left-1/2" />

          <div className="space-y-12 md:space-y-16">
            {displayProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={project.slug}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Central Spine Node */}
                  <div className="absolute left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center border border-cyan-300 bg-[#090d16] md:left-1/2">
                    <div className="h-1.5 w-1.5 bg-cyan-300" />
                  </div>

                  {/* Alternating Spacer */}
                  <div className="hidden w-5/12 md:block" />

                  {/* Timeline Card */}
                  <div className="ml-10 w-full md:ml-0 md:w-6/13">
                    <TimelineCard project={project} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
