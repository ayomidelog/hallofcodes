import PageHeader, { headerPrimaryAction } from "@/components/ui/PageHeader";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <main className="bg-[#090d16] text-white">
      <PageHeader
        title="Page not found."
        subtitle="404 Error."
        description="The page you're looking for doesn't exist or may have been moved somewhere else."
        watermark="404"
        terminal={{
          path: "~/hallofcodes",
          command: "git checkout this-page",
          output: [
            {
              text: "error: pathspec 'this-page' did not match any file(s) known to git",
            },
            { text: "hint: try heading back home", muted: true },
          ],
        }}
        actions={
          <Link href="/" className={headerPrimaryAction}>
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            Back to home
          </Link>
        }
      />
    </main>
  );
}
