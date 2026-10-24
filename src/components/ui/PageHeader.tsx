import ScrambleText from "@/components/ui/ScrambleText";
import TerminalCard, { TerminalLine } from "@/components/ui/TerminalCard";

export type PageHeaderStat = {
  value: string | number;
  label: string;
};

type PageHeaderProps = {
  title: string;
  subtitle: string;
  description: string;
  watermark: string;
  terminal: {
    path: string;
    command: string;
    output: TerminalLine[];
  };
  stats?: PageHeaderStat[];
  actions?: React.ReactNode;
};

/**
 * Shared header for every top-level page: a two-line title with a scrambled
 * second line, a terminal panel that "runs" a page-specific command, an
 * outlined watermark word, and an optional stats strip.
 */
export default function PageHeader({
  title,
  subtitle,
  description,
  watermark,
  terminal,
  stats,
  actions,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#090d16] text-white">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
        aria-hidden
      >
        <defs>
          <pattern
            id="page-header-grid"
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
        <rect width="100%" height="100%" fill="url(#page-header-grid)" />
      </svg>

      <span
        className="text-outline pointer-events-none absolute -bottom-[0.18em] right-0 select-none whitespace-nowrap text-[22vw] font-bold leading-none lg:text-[16rem]"
        aria-hidden
      >
        {watermark}
      </span>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div data-aos="fade-up">
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              {title}
              <span className="mt-1 block text-gray-500">
                <ScrambleText text={subtitle} durationMs={1400} />
                <span
                  className="caret-blink ml-2 inline-block h-[0.75em] w-[0.4em] translate-y-[0.05em] bg-cyan-300"
                  aria-hidden
                />
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
              {description}
            </p>

            {actions && (
              <div className="mt-10 flex flex-wrap gap-3">{actions}</div>
            )}
          </div>

          <div data-aos="fade-up" data-aos-delay="150">
            <TerminalCard {...terminal} />
          </div>
        </div>

        {stats && stats.length > 0 && (
          <dl
            className={`mt-16 grid gap-px border border-white/10 bg-white/10 md:mt-20 ${
              stats.length === 3
                ? "grid-cols-3"
                : "grid-cols-2 md:grid-cols-4"
            }`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-[#090d16] p-4 sm:p-6">
                <dt className="order-2 mt-2 text-xs text-gray-500 md:text-sm">
                  {stat.label}
                </dt>
                <dd className="order-1 text-2xl font-semibold text-white md:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

/** Primary and secondary call-to-action styles shared by page headers. */
export const headerPrimaryAction =
  "inline-flex items-center gap-3 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white";
export const headerSecondaryAction =
  "inline-flex items-center gap-3 border border-white/20 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:border-white hover:text-white";
