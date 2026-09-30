import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Menu,
  Rss,
  Send,
  X,
} from "lucide-react";

const EMAIL = "amayoclin2022@gmail.com";
const PHONE = "+254792057306";
const GITHUB_URL = "https://github.com/AmayoClinton";
const LINKEDIN_URL = "https://linkedin.com/in/amayo-clinton";
const DEVTO_URL = "https://dev.to/amayo_clinton";
const PORTRAIT_URL = "/clinton-amayo-portrait-cream.png";
const RESUME_URL = "/Clinton-Amayo-CV.pdf";

const navItems = [
  ["Home", "#hero"],
  ["About", "#about"],
  ["Focus Areas", "#focus"],
  ["Work", "#work"],
  ["Writing", "#writing"],
  ["Contact", "#contact"],
] as const;

const socials = [
  { label: "LinkedIn", href: LINKEDIN_URL, icon: Linkedin },
  { label: "GitHub", href: GITHUB_URL, icon: Github },
  { label: "DEV Community", href: DEVTO_URL, icon: Rss },
] as const;

const focusAreas = [
  ["Backend development", "Go · REST APIs · backend services · CLI tools"],
  ["Data & infrastructure", "PostgreSQL · SQLite · Linux (Ubuntu) · Docker"],
  ["Languages & tools", "Go · JavaScript · Ruby · HTML · Bash · Git · GitHub · VS Code · Postman"],
  ["Protocols & delivery", "Lightning Network · Nostr · HTTP / REST · OAuth 2.0 · Agile / Scrum · code review"],
] as const;

const workCards = [
  {
    title: "Sparkyard",
    type: "Developer discovery platform",
    description:
      "A platform for discovering developers and open-source projects across East Africa, with profile, project, and search features.",
    stack: "Go · JavaScript · Docker · PostgreSQL",
    href: GITHUB_URL,
    cta: "GitHub profile",
    tone: "sparkyard",
    external: true,
  },
  {
    title: "Dump Trade",
    type: "Circular economy · reuse platform",
    description:
      "Connects households, workshops, and industries so unwanted material finds another use instead of being dumped or burned, while giving waste collectors a verifiable track record.",
    stack: "JavaScript · Node.js · Express · PostgreSQL",
    href: "https://github.com/AmayoClinton/dumptrade",
    cta: "GitHub repository",
    tone: "dumptrade",
    external: true,
  },
  {
    title: "TraceBlocks",
    type: "Blockchain · supply chain traceability",
    description:
      "Tracks product checkpoints from manufacturing to delivery in Django, with each event recorded on VeChain for tamper-evident verification.",
    stack: "Python · Django · VeChain · SQLite",
    href: "https://github.com/codebyoketch/trace-blocks",
    cta: "GitHub project",
    tone: "traceblocks",
    external: true,
  },
] as const;

const posts = [
  "Nostr, Explained for Developers — A Deep Dive",
  "12 GitHub Actions Workflows That Will Quietly Save Your DevOps Team Hours Every Week",
  "Linux Permissions, Actually Explained — Not Just Memorized",
  "When AI Gets It Wrong: The Hidden Security Risk of Hallucinations in Cybersecurity",
] as const;

function PillNav({
  visible,
  open,
  onToggle,
  onClose,
}: {
  visible: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <header
      className={`pill-nav ${visible ? "pill-nav--visible" : ""} ${open ? "pill-nav--open" : ""}`}
      aria-hidden={!visible}
    >
      <a className="pill-name" href="#hero" onClick={onClose}>
        Clinton Amayo<span className="brand-dot">.</span>
      </a>
      <button
        className="pill-nav-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="portfolio-menu"
        onClick={onToggle}
      >
        {open ? <X size={15} /> : <Menu size={15} />}
      </button>
      <nav id="portfolio-menu" className="pill-menu" aria-label="Portfolio navigation">
        {navItems.map(([label, href]) => (
          <a href={href} key={href} onClick={onClose} tabIndex={open ? 0 : -1}>
            {label}
          </a>
        ))}
        <a href={RESUME_URL} download="Clinton-Amayo-Resume.pdf" onClick={onClose} tabIndex={open ? 0 : -1}>
          Download Resume <Download size={13} />
        </a>
      </nav>
    </header>
  );
}

function SharedPortrait({
  sceneRef,
  heroSlotRef,
  aboutSlotRef,
}: {
  sceneRef: { current: HTMLDivElement | null };
  heroSlotRef: { current: HTMLDivElement | null };
  aboutSlotRef: { current: HTMLDivElement | null };
}) {
  const flightRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const heroSlot = heroSlotRef.current;
    const aboutSlot = aboutSlotRef.current;
    const flight = flightRef.current;
    const card = cardRef.current;
    if (!scene || !heroSlot || !aboutSlot || !flight || !card) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const render = () => {
      const sceneRect = scene.getBoundingClientRect();
      const from = heroSlot.getBoundingClientRect();
      const to = aboutSlot.getBoundingClientRect();
      const destination = to.top + window.scrollY - window.innerHeight * 0.46;
      const progress = reduceMotion.matches
        ? 1
        : Math.max(0, Math.min(1, window.scrollY / Math.max(destination, 1)));
      const centerX = from.left + from.width / 2 + (to.left + to.width / 2 - from.left - from.width / 2) * progress;
      const centerY = from.top + from.height / 2 + (to.top + to.height / 2 - from.top - from.height / 2) * progress;
      const x = centerX - sceneRect.left - to.width / 2;
      const y = centerY - sceneRect.top - to.height / 2;
      const startScale = from.width / Math.max(to.width, 1);

      flight.style.width = `${to.width}px`;
      flight.style.height = `${to.height}px`;
      flight.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      card.style.setProperty("--portrait-flip", `${progress * 180}deg`);
      card.style.setProperty("--portrait-scale", `${startScale + (1 - startScale) * progress}`);
    };

    const scheduleRender = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(render);
    };
    const resizeObserver = new ResizeObserver(scheduleRender);
    resizeObserver.observe(scene);
    resizeObserver.observe(heroSlot);
    resizeObserver.observe(aboutSlot);
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender);
    scheduleRender();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
    };
  }, [aboutSlotRef, heroSlotRef, sceneRef]);

  return (
    <div className="portrait-flight" ref={flightRef} aria-hidden="true">
      <div className="portrait-flight-card" ref={cardRef}>
        <img src={PORTRAIT_URL} alt="" />
      </div>
    </div>
  );
}

export default function Home() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroSlotRef = useRef<HTMLDivElement>(null);
  const aboutSlotRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [mailReady, setMailReady] = useState(false);

  useEffect(() => {
    const updateNav = () => setNavVisible(window.scrollY > window.innerHeight * 0.68);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", updateNav);
      observer.disconnect();
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    setMailReady(true);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="recording-site" id="top">
      <PillNav
        visible={navVisible}
        open={menuOpen}
        onToggle={() => setMenuOpen((current) => !current)}
        onClose={closeMenu}
      />
      <main>
        <div className="intro-scene" ref={sceneRef}>
          <section className="recording-hero" id="hero" aria-labelledby="hero-title">
            <div className="hero-topline">
              <span>Software Development Apprentice · Zone01 Kisumu</span>
              <span>Kisumu, Kenya</span>
            </div>
            <h1 className="hero-title" id="hero-title" data-reveal>
              <span>FULLSTACK</span>
              <span>DEVELOPER</span>
            </h1>
            <div className="hero-marquee" aria-hidden="true">
              <div className="hero-marquee-track">
                <span>GO · JAVASCRIPT · RUBY · POSTGRESQL · DOCKER · LIGHTNING · NOSTR · </span>
                <span>GO · JAVASCRIPT · RUBY · POSTGRESQL · DOCKER · LIGHTNING · NOSTR · </span>
              </div>
            </div>
            <div className="hero-lower">
              <strong>© 2026 · CLINTON AMAYO</strong>
              <div className="hero-portrait-slot" ref={heroSlotRef} aria-hidden="true" />
              <span>GO · BACKEND · APIs · EAST AFRICA</span>
            </div>
            <div className="hero-actions">
              <a className="pill-button pill-button--dark" href="#work">
                View My Work <ArrowUpRight size={15} />
              </a>
              <a className="pill-button" href={RESUME_URL} download="Clinton-Amayo-Resume.pdf">
                Download Resume <Download size={14} />
              </a>
            </div>
            <a className="hero-scroll" href="#about">
              Scroll to explore <ChevronDown size={14} />
            </a>
          </section>

          <section className="recording-section about-recording" id="about" aria-labelledby="about-title">
            <div className="section-spacer" />
            <div className="about-heading-row">
              <div className="section-heading" data-reveal>
                <span className="section-kicker">/ABOUT</span>
                <h2 id="about-title">Hey!</h2>
              </div>
              <div className="about-portrait-slot" ref={aboutSlotRef} aria-hidden="true" />
            </div>
            <div className="about-columns" data-reveal>
              <p className="about-lede">
                Fullstack software developer with hands-on experience building backend services and CLI tools in Go, JavaScript, and Ruby.
              </p>
              <div className="about-copy">
                <p>
                  Strong foundations in Linux, version control, relational databases, and API development. Trained through Zone01 Kisumu&apos;s project-based apprenticeship, working in Agile / Scrum teams on real codebases.
                </p>
                <p>
                  I build with the needs of local users and infrastructure in mind, and write publicly about the real problems I solve along the way.
                </p>
              </div>
            </div>
            <div className="about-meta" data-reveal>
              <div>
                <span>Current role</span>
                <p>Software Development Apprentice<br />Zone01 Kisumu · 2025–present · Kisumu, Kenya</p>
              </div>
              <div>
                <span>How I work</span>
                <p>Fast self-learner · Agile / Scrum · peer code review · real delivery expectations · technical writing</p>
              </div>
            </div>
          </section>
          <SharedPortrait sceneRef={sceneRef} heroSlotRef={heroSlotRef} aboutSlotRef={aboutSlotRef} />
        </div>

        <section className="recording-section focus-recording" id="focus" aria-labelledby="focus-title">
          <div className="section-heading" data-reveal>
            <span className="section-kicker">/CAPABILITIES</span>
            <h2 id="focus-title">Focus Areas</h2>
          </div>
          <div className="focus-list">
            {focusAreas.map(([title, detail]) => (
              <div className="focus-row" data-reveal key={title}>
                <h3>{title}</h3>
                <p>{detail}</p>
                <ArrowUpRight size={16} aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        <section className="recording-section work-recording" id="work" aria-labelledby="work-title">
          <div className="section-heading section-heading--split" data-reveal>
            <div>
              <span className="section-kicker">/PROJECTS</span>
              <h2 id="work-title">Selected<br /><em>Work</em></h2>
            </div>
            <a href={`mailto:${EMAIL}`} className="pill-button">
              Let&apos;s work together <ArrowUpRight size={15} />
            </a>
          </div>

          <article className="featured-project" data-reveal aria-labelledby="mojaagent-title">
            <div className="feature-top"><span>PROJECT · BITCOIN LIGHTNING × M-PESA</span><span>BACKEND DEVELOPER</span></div>
            <div className="feature-content">
              <div className="feature-copy">
                <h3 id="mojaagent-title">MojaAgent</h3>
                <p>
                  A Go REST API connecting Bitcoin Lightning payments with M-Pesa float management, designed to help agents receive and settle payments in their existing workflow.
                </p>
                <a className="feature-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
                  GitHub profile <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="feature-tech" aria-label="MojaAgent technology stack">
                <span>Go</span><span>LND</span><span>PostgreSQL</span><span>Lightning Network</span><span>M-Pesa API</span>
              </div>
            </div>
            <div className="feature-orbit" aria-hidden="true"><span>↯</span></div>
          </article>

          <div className="personal-heading"><span>MORE PROJECTS</span><span>PRODUCTS · OPEN SOURCE</span></div>
          <div className="personal-grid">
            {workCards.map((card) => {
              const CardTag = "a" as const;
              return (
                <CardTag
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noreferrer" : undefined}
                  className="personal-card"
                  data-reveal
                  key={card.title}
                >
                  <div className={`personal-visual ${card.tone}`} aria-hidden="true">
                    <span>{card.title}</span><i />
                  </div>
                  <div className="personal-card-meta"><span>{card.type}</span><ArrowUpRight size={16} /></div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <small>{card.stack}</small>
                  <span className="personal-card-link">{card.cta} <ArrowUpRight size={14} /></span>
                </CardTag>
              );
            })}
          </div>
        </section>

        <section className="recording-section blog-recording" id="writing" aria-labelledby="writing-title">
          <div className="section-heading section-heading--split" data-reveal>
            <div>
              <span className="section-kicker">/DEV COMMUNITY</span>
              <h2 id="writing-title">Writing<span className="accent-period">.</span></h2>
            </div>
            <a href={DEVTO_URL} target="_blank" rel="noreferrer" className="text-link">
              Visit DEV profile <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="blog-grid">
            {posts.map((title) => (
              <a className="blog-row" data-reveal href={DEVTO_URL} target="_blank" rel="noreferrer" key={title}>
                <div>
                  <span className="blog-row-kicker">DEV COMMUNITY · ARTICLE</span>
                  <h3>{title}</h3>
                  <p>Published on DEV Community.</p>
                </div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="recording-contact" id="contact" aria-labelledby="contact-title">
          <div className="recording-section contact-inner">
            <div className="contact-copy" data-reveal>
              <span className="contact-kicker">/CONTACT · KISUMU, KENYA</span>
              <h2 id="contact-title">Let&apos;s<br /><em>talk.</em></h2>
              <p>For conversations about backend services, APIs, developer tools, or the projects above, get in touch.</p>
              <a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={15} /></a>
              <a href={`tel:${PHONE}`}>+254 792 057 306 <ArrowUpRight size={15} /></a>
            </div>
            <form onSubmit={handleSubmit} data-reveal>
              <label htmlFor="contact-name">Name<input id="contact-name" required name="name" autoComplete="name" placeholder="Enter your name" /></label>
              <label htmlFor="contact-email">Email<input id="contact-email" required type="email" name="email" autoComplete="email" placeholder="Enter your email" /></label>
              <label htmlFor="contact-message">Your message<textarea id="contact-message" required name="message" rows={5} placeholder="Tell me a little about it" /></label>
              <button className="pill-button pill-button--light" type="submit">
                {mailReady ? <>Message ready <Check size={15} /></> : <>Prepare email <Send size={14} /> </>}
              </button>
              <small aria-live="polite">{mailReady ? "Your email app should open with a message addressed to Clinton." : "This opens your email app; the message is sent only when you press Send there."}</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="recording-footer">
        <div className="footer-big">Clinton Amayo<span>Fullstack software developer · Kisumu, Kenya</span></div>
        <div className="footer-grid">
          <div>
            <span>/QUICK LINKS</span>
            {navItems.slice(0, 5).map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
          <div>
            <span>/CONTACT</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={`tel:${PHONE}`}>+254 792 057 306</a>
            <span>Kisumu, Kenya</span>
          </div>
          <div className="social-column">
            <span>/ELSEWHERE</span>
            <div className="socials">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-base"><span>© 2026 Clinton Amayo</span><span>Built with intention.</span></div>
      </footer>
    </div>
  );
}
