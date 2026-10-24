import MemberCard from "@/components/ui/MemberCard";
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

  return (
    <main className="bg-gray-950 text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div className="relative mx-auto flex min-h-screen max-w-screen-xl flex-col items-start justify-center gap-8 px-6 py-16">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            The people behind the build
            <span className="block">Meet the community.</span>
          </h1>
          <p className="max-w-2xl text-base text-gray-300 md:text-lg">
            We’re a diverse, high-impact group of builders, mentors, and
            collaborators shaping real projects together.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="https://github.com/hallofcodes/join"
              className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
            >
              Join the Network
            </Link>
            <Link
              href="https://github.com/hallofcodes?tab=repositories"
              className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-gray-500 hover:text-white"
            >
              Become a Contributor
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundImage:
            "linear-gradient(180deg, #0d1420 0%, #111827 55%, #172033 100%)",
        }}
      >
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
