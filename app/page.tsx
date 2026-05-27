import {
  ArrowUpRight,
  CalendarBlank,
  EnvelopeSimple,
  GithubLogo,
  GraduationCap,
  InstagramLogo,
  LinkSimple,
  LinkedinLogo,
  MapPin,
  SealCheck,
  Sparkle
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ContactPanel } from "@/components/contact-panel";
import { GalleryStrip } from "@/components/gallery-strip";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  about,
  experience,
  memberships,
  profile,
  projects,
  socials,
  techStack
} from "@/lib/portfolio-data";

function SectionTitle({
  eyebrow,
  title,
  action,
  actionHref
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  actionHref?: string;
}) {
  const actionContent = action ? (
    <>
      {action}
      <ArrowUpRight size={15} />
    </>
  ) : null;

  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h2>
      </div>
      {action && actionHref ? (
        <a
          className="hidden items-center gap-2 text-sm text-muted transition hover:text-accent md:inline-flex"
          href={actionHref}
          rel="noreferrer"
          target="_blank"
        >
          {actionContent}
        </a>
      ) : action ? (
        <span className="hidden items-center gap-2 text-sm text-muted md:inline-flex">{actionContent}</span>
      ) : null}
    </div>
  );
}

function TextLink({
  href,
  children,
  icon
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <a
      className="group inline-flex items-center justify-between gap-3 border border-line bg-white px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent active:-translate-y-px"
      href={href}
      rel="noreferrer"
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {children}
      </span>
      <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={15} />
    </a>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-line bg-white px-2.5 py-1 font-mono text-[11px] text-ink/78">
      {children}
    </span>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "GitHub") {
    return <GithubLogo size={16} />;
  }

  if (label === "LinkedIn") {
    return <LinkedinLogo size={16} />;
  }

  if (label === "Instagram") {
    return <InstagramLogo size={16} />;
  }

  return <ArrowUpRight size={15} />;
}

export default function Home() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden px-4 py-5 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl border-x border-line bg-paper/70">
        <header className="grid min-w-0 gap-6 border-b border-line px-4 py-6 md:grid-cols-[210px_1fr] md:px-6 lg:px-8">
          <div className="profile-avatar relative w-full max-w-[220px] animate-quiet-rise overflow-hidden border border-line bg-white p-2 md:max-w-none">
            <Image
              alt="Marc Cedric Asas"
              className="aspect-square w-full object-cover"
              height={420}
              priority
              src={profile.avatarUrl}
              width={420}
            />
            <span aria-hidden="true" className="shade-overlay">
              <span className="shade-lens" />
              <span className="shade-bridge" />
              <span className="shade-lens" />
            </span>
          </div>

          <div className="grid min-w-0 content-between gap-6">
            <div className="grid min-w-0 gap-4 lg:grid-cols-[1fr_auto]">
              <div className="min-w-0 animate-quiet-rise [animation-delay:80ms]">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-4xl font-semibold leading-none tracking-tight md:text-6xl">
                    {profile.name}
                  </h1>
                  <SealCheck className="text-accent" size={26} weight="fill" />
                </div>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                  <MapPin size={16} />
                  {profile.location}
                </p>
                <p className="mt-5 text-lg tracking-tight text-ink/90">
                  {profile.roles.join(" / ")}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                  <GraduationCap size={16} />
                  {profile.affiliation}
                </p>
              </div>

              <div className="animate-quiet-rise self-start justify-self-start [animation-delay:160ms] lg:justify-self-end">
                <ThemeToggle />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
              <TextLink href={`mailto:${profile.email}`} icon={<EnvelopeSimple size={17} />}>
                Send email
              </TextLink>
              <TextLink href={profile.github} icon={<GithubLogo size={17} />}>
                GitHub
              </TextLink>
              <TextLink href="#projects" icon={<Sparkle size={17} />}>
                View work
              </TextLink>
            </div>
          </div>
        </header>

        <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0 border-b border-line px-4 py-8 md:px-6 lg:border-r lg:px-8">
            <SectionTitle eyebrow="Profile" title="About" />
            <div className="copy-width space-y-5 text-base leading-8 text-ink/82">
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <aside className="min-w-0 border-b border-line px-4 py-8 md:px-6 lg:px-8">
            <figure className="mx-auto w-full max-w-[260px] animate-quiet-rise">
              <Image
                alt="Certified Data Engineer Associate badge"
                className="h-auto w-full shadow-soft"
                height={240}
                src="/images/data-engineer-associate-badge.png"
                width={196}
              />
            </figure>
          </aside>

          <section className="min-w-0 border-b border-line px-4 py-8 md:px-6 lg:border-r lg:px-8">
            <SectionTitle eyebrow="Tools" title="Tech Stack" action="Based on GitHub work" />
            <div className="space-y-6">
              {techStack.map((stack) => (
                <div className="grid gap-3 md:grid-cols-[150px_1fr]" key={stack.group}>
                  <h3 className="text-sm font-semibold">{stack.group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="row-span-2 min-w-0 border-b border-line px-4 py-8 md:px-6 lg:px-8">
            <SectionTitle eyebrow="Timeline" title="Experience" />
            <div className="space-y-0 border-l border-line">
              {experience.map((item, index) => (
                <div className="relative pb-8 pl-6 last:pb-0" key={item.role}>
                  <span className="absolute -left-[5px] top-1 size-2.5 border border-ink bg-paper" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold tracking-tight">{item.role}</h3>
                      <p className="mt-1 text-sm text-ink/75">{item.company}</p>
                    </div>
                    <span className="border border-line bg-white px-2 py-1 font-mono text-[11px]">
                      {item.year}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
                  {index === 0 ? (
                    <div className="mt-3 inline-flex items-center gap-2 border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                      <CalendarBlank size={14} />
                      Active track
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </aside>

          <section id="projects" className="min-w-0 border-b border-line px-4 py-8 md:px-6 lg:border-r lg:px-8">
            <SectionTitle
              action="View all"
              actionHref="https://github.com/marcxxz21?tab=repositories"
              eyebrow="Selected work"
              title="Recent Projects"
            />
            <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  className="group animate-quiet-rise bg-paper p-5 transition hover:bg-white hover:text-[#181817]"
                  key={project.title}
                  style={{ animationDelay: `${index * 90}ms` }}
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
                  <p className="mt-3 min-h-16 text-sm leading-6 text-muted transition group-hover:text-[#5f5b53]">{project.description}</p>
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
              ))}
            </div>
          </section>

          <section className="col-span-full grid min-w-0 gap-0 border-b border-line lg:grid-cols-[1fr_1fr_1fr_1fr]">
            <div className="border-b border-line px-4 py-6 md:px-6 lg:border-b-0 lg:border-r lg:px-8">
              <h2 className="mb-5 text-lg font-semibold">Member of</h2>
              <div className="space-y-2">
                {memberships.map((membership) => (
                  <a
                    className="flex items-center justify-between border border-line bg-white px-3 py-3 text-sm transition hover:border-accent hover:text-accent active:-translate-y-px"
                    href={membership.href}
                    key={membership.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {membership.label}
                    <LinkSimple size={15} />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-b border-line px-4 py-6 md:px-6 lg:border-b-0 lg:border-r lg:px-8">
              <h2 className="mb-5 text-lg font-semibold">Social Links</h2>
              <div className="space-y-2">
                {socials.map((social) => (
                  <a
                    className="flex items-center justify-between border border-line bg-white px-3 py-3 text-sm transition hover:border-accent hover:text-accent active:-translate-y-px"
                    href={social.href}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="inline-flex items-center gap-2">
                      <SocialIcon label={social.label} />
                      {social.label}
                    </span>
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-b border-line px-4 py-6 md:px-6 lg:border-b-0 lg:border-r lg:px-8">
              <h2 className="mb-5 text-lg font-semibold">Speaking</h2>
              <p className="text-sm leading-6 text-muted">
                Available for talks on applied physics thinking, data engineering, and AI-assisted software.
              </p>
              <a
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-accent"
                href={`mailto:${profile.email}?subject=Speaking invitation`}
              >
                Get in touch
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="px-4 py-6 md:px-6 lg:px-8">
              <h2 className="mb-5 text-lg font-semibold">Contact</h2>
              <div className="space-y-2">
                <a
                  className="flex items-center justify-between border border-line bg-white px-3 py-3 text-sm transition hover:border-accent hover:text-accent active:-translate-y-px"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                  <EnvelopeSimple size={15} />
                </a>
                <a
                  className="flex items-center justify-between border border-line bg-white px-3 py-3 text-sm transition hover:border-accent hover:text-accent active:-translate-y-px"
                  href={profile.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  Source profile
                  <GithubLogo size={15} />
                </a>
              </div>
            </div>
          </section>

          <section className="col-span-full min-w-0 border-b border-line px-4 py-8 md:px-6 lg:px-8">
            <SectionTitle eyebrow="Field notes" title="Gallery" />
            <GalleryStrip />
          </section>

          <footer className="col-span-full px-4 py-8 text-center text-sm text-muted md:px-6 lg:px-8">
            &copy; 2026 {profile.name}. All rights reserved.
          </footer>
        </div>
      </div>
      <ContactPanel />
    </main>
  );
}
