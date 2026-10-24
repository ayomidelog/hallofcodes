import LegalDocument, { LegalSection } from "@/components/ui/LegalDocument";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - Hall of Codes",
  description:
    "Terms of Service for Hall of Codes community site. Rules for acceptable use, contributions, and limitations of liability.",
  alternates: { canonical: "https://www.hallofcodes.org/terms-of-service" },
  openGraph: {
    title: "Terms of Service - Hall of Codes",
    description:
      "Terms of Service for Hall of Codes community site. Rules for acceptable use, contributions, and limitations of liability.",
    url: "https://www.hallofcodes.org/terms-of-service",
    siteName: "Hall of Codes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service - Hall of Codes",
    description:
      "Terms of Service for Hall of Codes community site. Rules for acceptable use, contributions, and limitations of liability.",
  },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    content: (
      <p>
        By using the Hall of Codes website (the &quot;Service&quot;), you agree
        to be bound by these Terms of Service (&quot;Terms&quot;). If you do not
        agree to these Terms, please do not use the Service.
      </p>
    ),
  },
  {
    id: "scope",
    title: "Scope of the Service",
    content: (
      <p>
        Hall of Codes is an inclusion-focused community site centered around
        open-source software projects and a community blog. The Service
        provides a platform for programmers to collaborate, share knowledge, and
        contribute to projects. The Service is provided for informational and
        collaborative purposes and does not include user accounts or
        personalized features.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for illegal purposes or in violation of laws.</li>
          <li>
            Harass, threaten, defame, or otherwise engage in abusive conduct
            toward community members.
          </li>
          <li>
            Attempt to circumvent security measures, scrape non-public data, or
            interfere with the operation of the Service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "contributions",
    title: "Contributions and blog posts",
    content: (
      <>
        <p>
          Community members may contribute content (for example blog posts)
          through the project&apos;s contribution process. Contributors should
          only submit content they own or have the right to publish.
          Contributions are public once merged and visible on the Service.
        </p>
        <p>
          By submitting content to the project&apos;s repository or otherwise
          providing content for publication, you represent and warrant that you
          have all rights necessary to grant the repository and the Service the
          right to host, display, and distribute that content. The
          repository&apos;s contribution guidelines and any repository-level
          license govern the license under which your contribution is
          distributed; please review those materials before submitting content.
        </p>
      </>
    ),
  },
  {
    id: "moderation",
    title: "Community guidelines and moderation",
    content: (
      <p>
        All interactions, including actions in group chats, blog posts, and
        public identifiers (user names), are subject to the Hall of Codes{" "}
        <Link href="/community-guidelines">Community Guidelines</Link>.
        Violations may result in content removal, warnings, temporary
        suspension, or bans. Moderation decisions are made by the
        project&apos;s maintainers and admins.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services",
    content: (
      <p>
        The Service relies on third-party platforms (for example GitHub, Google
        Search Console, and Vercel). Your use of the Service may be subject to
        those third-party terms and privacy policies in addition to these Terms.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimer and limitation of liability",
    content: (
      <>
        <p>
          The Service is provided &quot;as is&quot; and &quot;as
          available&quot; without warranties of any kind. To the fullest extent
          permitted by law, Hall of Codes and its maintainers disclaim all
          warranties, express or implied, including fitness for a particular
          purpose and non-infringement.
        </p>
        <p>
          In no event will Hall of Codes, its maintainers, contributors, or
          service providers be liable for any indirect, incidental, special, or
          consequential damages arising out of or in connection with the use of
          the Service.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless Hall of Codes and its
        maintainers from any claim, damage, or liability arising from your
        breach of these Terms or your contributions.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination and changes",
    content: (
      <p>
        We may modify or discontinue the Service (or any part) at any time. We
        may also update these Terms from time to time; continued use of the
        Service after changes constitutes acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These Terms are governed by the laws applicable to the project
        maintainers&apos; jurisdiction, without regard to conflict-of-law
        principles. If you have legal concerns, please consult an attorney.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        For questions or requests, please open an issue on the{" "}
        <a
          href="https://github.com/hallofcodes/hallofcodes/issues"
          target="_blank"
          rel="noreferrer"
        >
          project repository
        </a>
        .
      </p>
    ),
  },
];

export default function TermsOfService() {
  return (
    <LegalDocument
      slug="terms-of-service"
      title="Terms of Service"
      subtitle="The rules of the repo."
      description="How the Hall of Codes site may be used, how contributions are handled, and where our responsibility ends."
      watermark="terms"
      effectiveDate="2026-05-04"
      sections={sections}
    />
  );
}
