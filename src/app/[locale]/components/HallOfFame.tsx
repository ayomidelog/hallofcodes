import ScrambleText from "@/components/ui/ScrambleText";
import { WakaTimeUser } from "@/lib/wakatime/leaderboards";
import { faArrowRight, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

function Podium({ member, rank }: { member: WakaTimeUser; rank: number }) {
  const first = rank === 1;

  return (
    <a
      href={`https://github.com/${member.username}`}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex flex-col bg-[#090d16] p-6 transition hover:bg-white/[0.03] md:border md:border-white/10 md:p-8 ${
        first ? "md:order-2 md:pb-16" : rank === 2 ? "md:order-1 md:mt-12" : "md:order-3 md:mt-20"
      }`}
      data-aos="fade-up"
      data-aos-delay={rank * 100}
    >
      {first && (
        <span className="absolute inset-x-0 top-0 h-px bg-cyan-300" aria-hidden />
      )}

      <div className="flex items-start justify-between">
        <span
          className={`font-mono text-5xl font-bold leading-none ${
            first ? "text-white" : "text-gray-700"
          }`}
        >
          {String(rank).padStart(2, "0")}
        </span>
        {first && (
          <FontAwesomeIcon
            icon={faCrown}
            className="text-xl text-cyan-300"
            aria-label="Top coder"
          />
        )}
      </div>

      <div className="mt-10 flex items-center gap-4">
        <Image
          src={`https://avatars.githubusercontent.com/${member.username}`}
          alt={member.name}
          width={64}
          height={64}
          className="size-14 shrink-0 rounded-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">
            {member.name}
          </h3>
          <p className="truncate font-mono text-xs text-gray-500">
            @{member.username}
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="text-2xl font-semibold text-white md:text-3xl">
          {member.codingTime}
        </div>
        <div className="mt-1 text-xs text-gray-500">coded this week</div>
      </div>

      {member.languages.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {member.languages.slice(0, 4).map((lang) => (
            <span
              key={lang}
              className="border border-white/10 px-2 py-0.5 font-mono text-[11px] text-gray-400"
            >
              {lang}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

export default function HallOfFame({ members }: { members: WakaTimeUser[] }) {
  const top3 = members.slice(0, 3);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <ScrambleText
            as="h2"
            text="Hall of Fame"
            durationMs={2000}
            className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl"
          />
          <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
            The members who logged the most coding time this week on the
            public WakaTime leaderboard. Every keystroke counts.
          </p>
        </div>
        <a
          href="https://wakatime.com/leaders"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 text-sm font-semibold text-gray-300 transition hover:gap-5 hover:text-white"
        >
          Full leaderboard on WakaTime
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </a>
      </div>

      {top3.length > 0 ? (
        <div className="mt-12 grid items-start gap-px border border-white/10 bg-white/10 md:grid-cols-3 md:border-0 md:bg-transparent md:gap-4">
          {top3.map((member, index) => (
            <Podium key={member.username} member={member} rank={index + 1} />
          ))}
        </div>
      ) : (
        <p className="mt-12 border border-white/10 p-8 text-gray-400">
          The leaderboard is warming up. Check back after the next refresh.
        </p>
      )}

      <p className="mt-8 max-w-2xl text-sm leading-7 text-gray-500">
        Want your name here? Join the GitHub organization, connect WakaTime to
        your editor, and make your WakaTime profile public.
      </p>
    </>
  );
}
