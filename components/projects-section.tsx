"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { allProjects, projects } from "@/lib/portfolio-data";

type Project = (typeof projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className="group animate-quiet-rise bg-paper p-5 transition hover:bg-white hover:text-[#181817]"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <a
          aria-label={`Open ${project.title}`}
          className="inline-flex size-8 shrink-0 items-center justify-center border border-line bg-white transition group-hover:border-accent group-hover:text-accent active:-translate-y-px"
          href={project.href}
          rel="noreferrer"
          target="_blank"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
      <p className="mt-3 min-h-16 text-sm leading-6 text-muted transition group-hover:text-[#5f5b53]">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            className="border border-line bg-white px-2.5 py-1 font-mono text-[11px] text-ink/78 transition group-hover:border-[#181817] group-hover:bg-[#181817] group-hover:text-white"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <section id="projects" className="min-w-0 border-b border-line px-4 py-8 md:px-6 lg:border-r lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Selected work</p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Recent Projects</h2>
        </div>
        <button
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent active:-translate-y-px"
          onClick={() => setOpen(true)}
          type="button"
        >
          View all
          <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard index={index} key={project.title} project={project} />
        ))}
      </div>

      {open ? (
        <div
          aria-labelledby="all-projects-title"
          aria-modal="true"
          className="fixed inset-0 z-40 flex items-center justify-center bg-[#181817]/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
          role="dialog"
        >
          <div className="max-h-[88dvh] w-full max-w-6xl overflow-hidden border border-line bg-paper shadow-soft">
            <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-4 md:px-6">
              <div>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">GitHub archive</p>
                <h2 id="all-projects-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
                  All Projects
                </h2>
              </div>
              <button
                aria-label="Close all projects"
                className="inline-flex size-9 shrink-0 items-center justify-center border border-line bg-white transition hover:border-accent hover:text-accent active:-translate-y-px"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[calc(88dvh-81px)] overflow-y-auto p-4 md:p-6">
              <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
                {allProjects.map((project, index) => (
                  <ProjectCard index={index} key={project.title} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
