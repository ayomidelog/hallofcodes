import { Project } from "@/lib/projects";
import Image from "next/image";

export default function TimelineCard({ project }: { project: Project }) {
  const imageSrc =
    project.coverImage && project.coverImage.trim() !== ""
      ? project.coverImage
      : `https://opengraph.githubassets.com/1/hallofcodes/${project.slug}`;

  return (
    <article
      data-aos="fade-up"
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:bg-gray-900/80 hover:shadow-xl hover:shadow-blue-500/5"
    >
      {/* 1 Cover Image per Card */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-gray-800/80 bg-gray-950">
        <Image
          src={imageSrc}
          alt={`${project.name} cover`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Title */}
          <h3 className="text-xl font-bold tracking-tight text-white transition group-hover:text-blue-400">
            {project.name}
          </h3>

          {/* Extended SEO Description */}
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            {project.description}
          </p>

          {/* Tech Badges */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-gray-800 bg-gray-950/80 px-2 py-0.5 text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Link Actions */}
        <div className="mt-6 flex items-center justify-between pt-4">
          {project.homepage ? (
            <a
              href={project.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 transition hover:text-white"
            >
              Live
            </a>
          ) : (
            <div />
          )}

          <a
            href={project.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-500"
          >
            View Repository
          </a>
        </div>
      </div>
    </article>
  );
}
