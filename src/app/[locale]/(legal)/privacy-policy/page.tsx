import LegalDocument, { LegalSection } from "@/components/ui/LegalDocument";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Hall of Codes",
  description:
    "Privacy Policy for Hall of Codes. Explains what data (if any) we collect, how we use it, and third-party services involved.",
  alternates: { canonical: "https://www.hallofcodes.org/privacy-policy" },
  openGraph: {
    title: "Privacy Policy - Hall of Codes",
    description:
      "Privacy Policy for Hall of Codes. Explains what data (if any) we collect, how we use it, and third-party services involved.",
    url: "https://www.hallofcodes.org/privacy-policy",
    siteName: "Hall of Codes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - Hall of Codes",
    description:
      "Privacy Policy for Hall of Codes. Explains what data (if any) we collect, how we use it, and third-party services involved.",
  },
};

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <p>
        Hall of Codes is a community site focused on collaboration, open-source
        projects, and a community blog. This site does not provide user
        accounts (no login or registration). Below we explain what information
        we do and do not collect, how the site obtains certain public data, and
        which third-party services may process limited information on our
        behalf.
      </p>
    ),
  },
  {
    id: "not-collected",
    title: "Information we do not collect",
    content: (
      <p>
        Because Hall of Codes does not offer user registration or login, we do
        not collect or store personal account data such as names, email
        addresses, passwords, or profile information through our site.
      </p>
    ),
  },
  {
    id: "processed",
    title: "Information we may process",
    content: (
      <ul>
        <li>
          <strong className="text-white">Google Search Console.</strong> We use
          Google Search Console to monitor the site&apos;s presence in Google
          Search and obtain aggregate search performance data. This is used to
          improve discoverability and site health; we do not use it to track
          individual users.
        </li>
        <li>
          <strong className="text-white">Vercel and hosting logs.</strong> The
          site is hosted on Vercel. Vercel may collect standard server logs (for
          example IP addresses, request user agent strings, and other transient
          request metadata) as part of their hosting and security operations.
          Those logs are processed and retained by Vercel according to their
          policies.
        </li>
        <li>
          <strong className="text-white">GitHub public data.</strong> Member and
          repository lists shown on the site are fetched from the public data of
          the GitHub organization &quot;hallofcodes.&quot; Only public members
          and public repositories are included. That data is cached on our side
          and refreshed approximately every 6 hours to limit rate use and
          improve performance.
        </li>
        <li>
          <strong className="text-white">Public contributions.</strong> Blog
          posts and other content published to the site come from the
          project&apos;s content repository (via pull requests or merges). Once
          published, those posts are publicly visible and served by the site.
        </li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and client-side storage",
    content: (
      <p>
        The core site does not set proprietary tracking cookies. Third-party
        services (for example Google or Vercel) may set or access cookies or
        local storage as described in their own policies. If you encounter any
        embedded third-party widgets or links, those providers may operate
        separately and have their own cookies and tracking mechanisms.
      </p>
    ),
  },
  {
    id: "usage",
    title: "How we use information",
    content: (
      <>
        <p>We use the limited information described above to:</p>
        <ul>
          <li>Maintain and operate the site</li>
          <li>
            Improve discoverability and search presence via Google Search
            Console
          </li>
          <li>
            Display public organization data (members and repos) fetched from
            GitHub
          </li>
          <li>Publish community-contributed content (blog posts and similar)</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    content: (
      <>
        <p>
          The site integrates third-party services (notably Google Search
          Console and Vercel hosting) and fetches public data from GitHub. These
          third parties have their own privacy policies and practices. We
          encourage you to review:
        </p>
        <ul>
          <li>
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              Google Privacy Policy
            </a>
          </li>
          <li>
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
              Vercel Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Privacy Statement
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "contributions",
    title: "User contributions and public posting",
    content: (
      <p>
        If you contribute content (for example by submitting a blog post via
        the repository), that content becomes part of the public site and may
        be visible to anyone. Contributors should only submit content they have
        the right to publish and must follow the project&apos;s contribution
        guidelines. AI-assisted content should be disclosed as described in the
        contributor guidance.
      </p>
    ),
  },
  {
    id: "moderation",
    title: "Community guidelines and moderation",
    content: (
      <p>
        Hall of Codes members and contributors are expected to follow our{" "}
        <Link href="/community-guidelines">Community Guidelines</Link>. Actions
        in group chats, blog posts, user names, and other public contributions
        are subject to those guidelines and enforcement (including warnings,
        content removal, or bans).
      </p>
    ),
  },
  {
    id: "retention",
    title: "Data retention and deletion",
    content: (
      <p>
        Public data fetched from GitHub is refreshed on a cache schedule
        (approximately every 6 hours) so the site reflects changes on GitHub. If
        you wish to remove or correct information that appears on this site and
        you control the underlying GitHub resource, update or remove it on
        GitHub and the site cache will refresh. For any other removal requests,
        open an issue in the repository (see contact below).
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We take reasonable measures to protect site operations and public
        content. However, no online service can guarantee absolute security.
        Hosting provider logs (for example from Vercel) are controlled by the
        provider and subject to their security practices.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        Hall of Codes is not intended for young children. We do not knowingly
        collect information from children under 13. If you believe we have
        content that involves the personal information of a child under 13,
        please contact us (see below).
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. When changes are
        significant, we will post an updated effective date here.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        If you have questions or requests about this policy, please open an
        issue in the{" "}
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

export default function PrivacyPolicy() {
  return (
    <LegalDocument
      slug="privacy-policy"
      title="Privacy Policy"
      subtitle="No accounts. No tracking."
      description="What we collect, what we deliberately do not, and which third-party services touch your visit to Hall of Codes."
      watermark="privacy"
      effectiveDate="2026-05-04"
      sections={sections}
    />
  );
}
