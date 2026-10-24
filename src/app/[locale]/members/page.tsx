import PageHeader, {
  headerPrimaryAction,
  headerSecondaryAction,
} from "@/components/ui/PageHeader";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrambleText from "@/components/ui/ScrambleText";
import { getMembers, Member } from "@/lib/github/members";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Members - Hall of Codes",
  description: "Meet the talented individuals who make up our community.",
  alternates: {
    canonical: "https://www.hallofcodes.org/members",
  },
  openGraph: {
    title: "Our Members - Hall of Codes",
    description: "Meet the talented individuals who make up our community.",
    url: "https://www.hallofcodes.org/members",
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
    title: "Our Members - Hall of Codes",
    description: "Meet the talented individuals who make up our community.",
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

export default async function Members() {
  const members = await getMembers();
  const memberCount = members.length;
  const pinned = members.filter((member) => member.location).length;

  return (
    <main className="bg-[#090d16] text-white">
      <PageHeader
        title="The people behind the build."
        subtitle="Meet the community."
        description="A diverse, high-impact group of builders, mentors, and collaborators shaping real projects together."
        watermark="members"
        terminal={{
          path: "~/hallofcodes/members",
          command: "gh api orgs/hallofcodes/public_members --jq '.[].login'",
          output: [
            ...members.slice(0, 7).map((member) => ({
              text: `@${member.login}`,
            })),
            {
              text: `... ${Math.max(0, memberCount - 7)} more`,
              muted: true,
            },
          ],
        }}
        stats={[
          { value: `${memberCount}+`, label: "public GitHub members" },
          { value: 2019, label: "building together since" },
          { value: pinned, label: "pinned on the globe" },
        ]}
        actions={
          <>
            <Link
              href="https://github.com/hallofcodes/join"
              className={headerPrimaryAction}
            >
              <FontAwesomeIcon icon={faGithub} />
              Join the network
            </Link>
            <Link
              href="https://github.com/hallofcodes?tab=repositories"
              className={headerSecondaryAction}
            >
              Become a contributor
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </>
        }
      />

      <section className="bg-[#0d1420]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div>
            <ScrambleText
              as="h2"
              text="Our members are the power source."
              durationMs={2000}
              className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl"
              aria-label="Some of our members"
            />
            <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
              Designers, developers, and tech leaders collaborating across
              projects, learning streams, and open-source initiatives.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {members.map((member: Member, index: number) => (
              <Link
                key={member.login}
                href={`https://github.com/${member.login}`}
                target="_blank"
                rel="noreferrer"
                className="group relative border-b border-white/10 px-3 py-8 text-center transition hover:bg-white/[0.04] sm:px-5 lg:border-r"
              >
                <span className="absolute left-3 top-3 text-[10px] text-gray-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Image
                  src={member.avatar}
                  alt={member.login}
                  width={88}
                  height={88}
                  className="mx-auto size-20 rounded-full object-cover grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="mt-4 block truncate text-sm font-medium text-gray-300 group-hover:text-white">
                  @{member.login}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
