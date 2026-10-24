import PageHeader, { headerSecondaryAction } from "@/components/ui/PageHeader";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import portfolio from "@/lib/portfolio";
import { Metadata } from "next";
import PortfolioCard from "@/components/ui/PortfolioCard";

export const metadata: Metadata = {
  title: "Portfolio - Hall of Codes",
  description:
    "Meet the people behind Hall of Codes and explore their personal portfolios.",
  alternates: {
    canonical: "https://www.hallofcodes.org/portfolio",
  },
  openGraph: {
    title: "Portfolio - Hall of Codes",
    description:
      "Meet the people behind Hall of Codes and explore their personal portfolios.",
    url: "https://www.hallofcodes.org/portfolio",
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
    title: "Portfolio - Hall of Codes",
    description:
      "Meet the people behind Hall of Codes and explore their personal portfolios.",
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

export default function Portfolio() {
  const portfolioItems = portfolio;

  return (
    <main className="bg-[#090d16] text-white">
      <PageHeader
        title="The people behind the build."
        subtitle="Meet their portfolios."
        description="Explore the people who drive Hall of Codes and the personal portfolios that show their craft."
        watermark="portfolio"
        terminal={{
          path: "~/hallofcodes/public/portfolio",
          command: "ls public/portfolio",
          output: portfolioItems.map((item) => ({
            text: item.img_url.replace("/portfolio/", ""),
          })),
        }}
        stats={[
          { value: String(portfolioItems.length).padStart(2, "0"), label: "featured builders" },
          { value: "100%", label: "original work" },
          { value: "1 PR", label: "to get featured" },
        ]}
        actions={
          <Link href="/community#portfolio" className={headerSecondaryAction}>
            Get featured
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        }
      />

      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 md:py-28">
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold md:text-5xl">
            Builders with real impact.
          </h2>
          <p className="max-w-2xl text-gray-300">
            The portfolio showcases the builders who contribute to Hall of
            Codes, highlighting their work and impact.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((portfolioItem, index) => (
            <PortfolioCard
              key={index}
              portfolioItem={portfolioItem}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 border border-white/10 p-6 md:p-8">
          <div className="inline md:flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Portfolio originality criteria
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                To maintain a credible, high‑quality showcase, submissions must
                reflect original work and clear ownership.
              </p>
            </div>
            <span className="mt-4 inline-block border border-cyan-300/40 px-3 py-1 text-xs font-semibold text-cyan-300 md:mt-0">
              Required
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Your portfolio must be authored by you and reflect your own projects or contributions.",
              "Forked or copied projects without meaningful original work are not accepted.",
              "If you used a starter, clearly document what you built and how you extended it.",
              "We may request proof of ownership or contribution history when needed.",
            ].map((item, index) => (
              <div
                key={item}
                className="flex gap-4 border border-white/10 p-4"
              >
                <div className="pt-1 font-mono text-xs text-cyan-300">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-sm text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
