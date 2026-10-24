import LegalDocument, { LegalSection } from "@/components/ui/LegalDocument";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines - Hall of Codes",
  description:
    "Please read and follow our community guidelines to ensure a positive and respectful environment for all members.",
  alternates: {
    canonical: "https://www.hallofcodes.org/community-guidelines",
  },
  openGraph: {
    title: "Community Guidelines - Hall of Codes",
    description:
      "Please read and follow our community guidelines to ensure a positive and respectful environment for all members.",
    url: "https://www.hallofcodes.org/community-guidelines",
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
    title: "Community Guidelines - Hall of Codes",
    description:
      "Please read and follow our community guidelines to ensure a positive and respectful environment for all members.",
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

const sections: LegalSection[] = [
  {
    id: "respect",
    title: "Be respectful, always",
    content: (
      <p>
        Treat all members with dignity. Harassment, hate speech,
        threats, discrimination, bullying, or personal attacks are not
        tolerated. Disagreements are normal, but disrespect is not.
      </p>
    ),
  },
  {
    id: "interesting",
    title: "Keep it interesting",
    content: (
      <p>
        Any topic that keeps the group interesting is allowed: tech,
        careers, startups, tools, productivity, AI, open source, and
        even light off-topic conversations. Just avoid content that
        harms the community&apos;s atmosphere or safety.
      </p>
    ),
  },
  {
    id: "no-spam",
    title: "No spam or flooding",
    content: (
      <p>
        Avoid repetitive posts, excessive self-promotion, unrelated
        links, or automated content dumps. Share with intent: add
        context, explain why it matters, and help the community learn.
      </p>
    ),
  },
  {
    id: "contribute",
    title: "Contribute positively",
    content: (
      <p>
        Help others grow. Share feedback that is constructive, not
        destructive. Offer resources, guidance, and support when you
        can.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Respect privacy",
    content: (
      <p>
        Do not share personal information of others without
        permission. Private messages, screenshots, and private details
        must remain private unless explicitly allowed by the original
        sender.
      </p>
    ),
  },
  {
    id: "identity",
    title: "Group identity is protected",
    content: (
      <p>
        Changing the group name, description, or icons is strictly
        prohibited. These are official brand assets and should not be
        altered without authorization from the admins.
      </p>
    ),
  },
  {
    id: "wit",
    title: "Wit happens",
    content: (
      <p>
        Sometimes messages may be witty, sarcastic, or playful.
        Don&apos;t take things personally. If something feels off, ask
        for clarity before escalating.
      </p>
    ),
  },
  {
    id: "liability",
    title: "No liability",
    content: (
      <p>
        Advice, consultations, or answers shared in this community are
        for informational purposes only. Hall of Codes members and
        admins are not responsible for any outcomes resulting from the
        use of shared information.
      </p>
    ),
  },
  {
    id: "enforcement",
    title: "Enforcement and bans",
    content: (
      <p>
        Violations may result in warnings, message removal, temporary
        removal, or bans. Temporary bans range from a minimum of 2
        weeks up to 6 months, depending on the severity and repetition
        of the behavior. Severe violations may result in immediate
        removal without warning.
      </p>
    ),
  },
];

export default function CommunityGuidelines() {
  return (
    <LegalDocument
      slug="community-guidelines"
      title="Community Guidelines"
      subtitle="Respect is the default."
      description="We are a collaborative, high-energy community built on respect, curiosity, and momentum. These guidelines keep the group valuable, safe, and fun for everyone."
      watermark="respect"
      sections={sections}
      closing={
        <p>
          By participating in Hall of Codes, you agree to follow these rules.
          Help us keep this space respectful, useful, and fun.
        </p>
      }
    />
  );
}
