import PageHeader from "@/components/ui/PageHeader";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faFileLines,
  faHandshake,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type LegalDocumentProps = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  watermark: string;
  effectiveDate?: string;
  sections: LegalSection[];
  closing?: React.ReactNode;
};

const documents: { href: string; label: string; icon: IconDefinition }[] = [
  {
    href: "/community-guidelines",
    label: "Community Guidelines",
    icon: faHandshake,
  },
  { href: "/terms-of-service", label: "Terms of Service", icon: faFileLines },
  { href: "/privacy-policy", label: "Privacy Policy", icon: faShieldHalved },
];

/** Counts the words in the plain text of a React node tree. */
function countWords(node: React.ReactNode): number {
  if (typeof node === "string") return node.split(/\s+/).filter(Boolean).length;
  if (typeof node === "number") return 1;
  if (Array.isArray(node)) return node.reduce((n, child) => n + countWords(child), 0);
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: React.ReactNode };
    return countWords(props.children);
  }
  return 0;
}

export default function LegalDocument({
  slug,
  title,
  subtitle,
  description,
  watermark,
  effectiveDate,
  sections,
  closing,
}: LegalDocumentProps) {
  const words = sections.reduce(
    (total, section) => total + countWords(section.content),
    0,
  );
  const minutes = Math.max(1, Math.round(words / 200));

  const stats = [
    { value: String(sections.length).padStart(2, "0"), label: "sections" },
    { value: `${minutes} min`, label: "reading time" },
    ...(effectiveDate ? [{ value: effectiveDate, label: "effective date" }] : []),
  ];

  return (
    <main className="bg-[#090d16] text-white">
      <PageHeader
        title={title}
        subtitle={subtitle}
        description={description}
        watermark={watermark}
        stats={stats}
        terminal={{
          path: `~/hallofcodes/${slug}.md`,
          command: `grep "^## " ${slug}.md`,
          output: sections.map((section, index) => ({
            text: `${String(index + 1).padStart(2, "0")}  ${section.title}`,
            muted: index > 5,
          })),
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[16rem_1fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-sm font-semibold text-white">On this page</h2>
          <ol className="mt-4 border-l border-white/10">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group -ml-px flex gap-3 border-l border-transparent py-2 pl-4 text-sm text-gray-400 transition hover:border-cyan-300 hover:text-white"
                >
                  <span className="font-mono text-xs text-gray-600 group-hover:text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="min-w-0">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="grid scroll-mt-28 gap-4 border-t border-white/10 py-10 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]"
            >
              <span className="font-mono text-sm text-cyan-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                <div className="mt-4 max-w-3xl space-y-4 leading-8 text-gray-300 [&_a]:text-white [&_a]:underline [&_a]:decoration-cyan-300 [&_a]:underline-offset-4 [&_a:hover]:text-cyan-300 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-gray-600">
                  {section.content}
                </div>
              </div>
            </section>
          ))}

          {closing && (
            <div className="mt-6 border border-white/10 bg-white/[0.02] p-6 leading-8 text-gray-300 sm:ml-16">
              {closing}
            </div>
          )}
        </div>
      </div>

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/10 md:grid-cols-4">
          {documents
            .filter((doc) => doc.href !== `/${slug}`)
            .map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group flex items-center justify-between gap-4 bg-[#090d16] px-6 py-8 transition hover:bg-white/[0.03]"
              >
                <span className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={doc.icon}
                    className="text-gray-500 transition group-hover:text-cyan-300"
                  />
                  <span className="font-semibold text-gray-200 group-hover:text-white">
                    {doc.label}
                  </span>
                </span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs text-gray-600 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>
            ))}
          <a
            href="https://github.com/hallofcodes/hallofcodes/issues"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 bg-[#090d16] px-6 py-8 transition hover:bg-white/[0.03] md:col-span-2"
          >
            <span className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faGithub}
                className="text-gray-500 transition group-hover:text-cyan-300"
              />
              <span className="font-semibold text-gray-200 group-hover:text-white">
                Questions? Open an issue on GitHub
              </span>
            </span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs text-gray-600 transition group-hover:translate-x-1 group-hover:text-white"
            />
          </a>
        </div>
      </section>
    </main>
  );
}
