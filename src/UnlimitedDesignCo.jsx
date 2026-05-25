import { useState, useEffect, useRef } from "react";
import "./overhaul/overhaul.css";

const LOGO = "/overhaul/logo.png";
const FOOTER_LOGO = "/overhaul/UDC-LOGO.svg";

const NAV = [
  { id: "home", label: "Home" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
];

function portfolioImage(folder, filename) {
  return `/portfolio/${folder}/${encodeURIComponent(filename)}`;
}

const LUNAR_BOOKLET_GALLERY = Array.from({ length: 16 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return portfolioImage("lunar-new-year-booklet", `FINAL_LNY BOOKLET 5_5_V3-${num}.jpg`);
});

const PAGEANT_GALLERY = [
  "mpk-pageant.jpg",
  "mpk-miss-teen-pageant.jpg",
  "MISS MPK MISS TEEN MPK SPONSORSHIP FLYER_v3-01.jpg",
  "MISS MPK MISS TEEN MPK SPONSORSHIP FLYER_v3-02.jpg",
  "Screenshot 2026-05-25 at 11.19.55\u202fAM.jpg",
  "Screenshot 2026-05-25 at 11.23.21\u202fAM.jpg",
].map((f) => portfolioImage("miss-monterey-park-pageant", f));

const EVENT_FLYER_FILES = [
  "LAW DAY 2026_Artboard 1.jpg",
  "2026 EASTER PROMO.jpg",
  "HOLIDAY INN MIXER 10_10.jpg",
  "COFFEE WITH THE CHAMBER.jpg",
  "01-26_STEAM FRESH.jpg",
  "HKBA DELTA MPCC.jpg",
  "MPCC SUMMER INTERNSHIP 2026.jpg",
  "NEW WEBSITE LAUNCH.jpg",
  "RACE EPIDEMIC_LETTER_v3_letter copy.jpg",
  "COFFEE MIXER 02-26.jpg",
];

const CLAIM_YOUR_BUSINESS_FILES = Array.from({ length: 6 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `CLAIM YOUR BUSINESS-${num}.jpg`;
});

const EVENT_FLYER_URLS = EVENT_FLYER_FILES.map((f) =>
  portfolioImage("event-marketing-materials", f),
);

const CLAIM_YOUR_BUSINESS_URLS = CLAIM_YOUR_BUSINESS_FILES.map((f) =>
  portfolioImage("event-marketing-materials", f),
);

const EVENT_GALLERY_SEGMENTS = [
  { pagesPerSpread: 2, urls: EVENT_FLYER_URLS },
  { pagesPerSpread: 3, urls: CLAIM_YOUR_BUSINESS_URLS },
];

const EVENT_FLYERS_GALLERY = [...EVENT_FLYER_URLS, ...CLAIM_YOUR_BUSINESS_URLS];

const LOUNGEFLY_GALLERY = [
  "LOUNGEFLY PORTFOLIO-10.jpg",
  "LOUNGEFLY PORTFOLIO-01.jpg",
  "LOUNGEFLY PORTFOLIO-02.jpg",
  "LOUNGEFLY PORTFOLIO-03.jpg",
  "LOUNGEFLY PORTFOLIO-04.jpg",
  "LOUNGEFLY PORTFOLIO-05.jpg",
  "LOUNGEFLY PORTFOLIO-06.jpg",
  "LOUNGEFLY PORTFOLIO-07.jpg",
  "LOUNGEFLY PORTFOLIO-08.jpg",
  "LOUNGEFLY PORTFOLIO-09.jpg",
].map((f) => portfolioImage("loungefly", f));

const PORTFOLIO = [
  {
    title: "Miss MPK Pageant 2026",
    heading: "Miss & Miss Teen Monterey Park",
    client: "MPCC · Print, digital & pageant site",
    accent: "#1a2454",
    image: portfolioImage("miss-monterey-park-pageant", "mpk-pageant.jpg"),
    imageAlt: "Miss Monterey Park pageant campaign — print and web",
    gallery: PAGEANT_GALLERY,
    href: "https://www.montereyparkchamber.org/pageant",
    linkLabel: "View pageant site",
  },
  {
    title: "2026 Lunar New Year Gala Booklet",
    heading: "2026 Lunar New Year Gala Booklet",
    client: "Monterey Park Chamber of Commerce",
    accent: "var(--sage)",
    image: portfolioImage("lunar-new-year-booklet", "FINAL_LNY BOOKLET 5_5_V3-01.jpg"),
    imageAlt: "2026 Lunar New Year Gala booklet cover",
    imagePosition: "center 28%",
    gallery: LUNAR_BOOKLET_GALLERY,
    href: "https://www.montereyparkchamber.org",
    linkLabel: "View chamber site",
  },
  {
    title: "MPCC Event Marketing",
    heading: "Chamber Event Flyers & Promotions",
    client: "Monterey Park Chamber · Events & mixers",
    accent: "var(--navy)",
    image: portfolioImage("event-marketing-materials", "LAW DAY 2026_Artboard 1.jpg"),
    imageAlt: "Monterey Park Chamber Law Day 2026 promotional flyer",
    gallery: EVENT_FLYERS_GALLERY,
    gallerySegments: EVENT_GALLERY_SEGMENTS,
    href: "https://www.montereyparkchamber.org",
    linkLabel: "View chamber site",
  },
  {
    title: "Loungefly / Funko",
    heading: "Licensed IP Accessories Design",
    client: "Loungefly / Funko",
    accent: "var(--orchid-pale)",
    image: portfolioImage("loungefly", "LOUNGEFLY PORTFOLIO-10.jpg"),
    imageAlt: "Loungefly licensed accessories design",
    gallery: LOUNGEFLY_GALLERY,
  },
];

const SERVICES = [
  {
    badge: "New",
    featured: true,
    title: "Civic & Community Design",
    body: "Event programs, sponsorship materials, member communications, signage, and full campaign suites for chambers, nonprofits, and civic organizations — including ongoing design for the Monterey Park Chamber of Commerce.",
  },
  {
    badge: "Most popular",
    title: "Real Estate Marketing",
    body: "Complete design systems for listing agents and buyer specialists — buyer packets, listing presentations, postcards, door hangers, and social media templates.",
  },
  {
    badge: "Brand & identity",
    title: "Brand Identity",
    body: "Logo design, color systems, typography, and brand guidelines that give your organization a cohesive, professional presence.",
  },
  {
    badge: "Print",
    title: "Print & Collateral",
    body: "Brochures, flyers, event programs, and promotional materials designed to make a lasting impression at every touchpoint.",
  },
];

const CREDENTIALS = [
  ["Marketing Chair", "Monterey Park Chamber of Commerce"],
  ["Chamber website design & graphics", "montereyparkchamber.org"],
  ["Creative Director", "Miss & Miss Teen Monterey Park Pageant"],
  ["Licensed IP Design", "Loungefly / Funko (Disney, Warner Bros.)"],
  ["BFA in Illustration", null],
  ["Founder", "Creative Futures Design Education Initiative"],
  ["Real Estate Marketing Specialist", null],
  ["City of Monterey Park Certificate of Appreciation", null],
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function buildGallerySpreads(segments) {
  return segments.flatMap(({ pagesPerSpread = 2, urls }) => {
    const spreads = [];
    for (let i = 0; i < urls.length; i += pagesPerSpread) {
      spreads.push({
        pagesPerSpread,
        urls: urls.slice(i, i + pagesPerSpread),
      });
    }
    return spreads;
  });
}

function getGallerySegments(item) {
  if (item.gallerySegments?.length) return item.gallerySegments;
  if (item.gallery?.length) return [{ pagesPerSpread: 2, urls: item.gallery }];
  return [];
}

function PortfolioFlipbook({ title, segments, onClose }) {
  const [spread, setSpread] = useState(0);
  const [animating, setAnimating] = useState(false);
  const thumbsRef = useRef(null);
  const spreads = buildGallerySpreads(segments);
  const spreadCount = spreads.length;
  const current = spreads[spread] ?? spreads[0];
  const totalPages = spreads.reduce((n, s) => n + s.urls.length, 0);
  const pagesBefore = spreads
    .slice(0, spread)
    .reduce((n, s) => n + s.urls.length, 0);
  const pageStart = pagesBefore + 1;
  const pageEnd = pagesBefore + (current?.urls.length ?? 0);
  const thumbSpreadByUrl = spreads.flatMap((sp, spreadIdx) =>
    sp.urls.map(() => spreadIdx),
  );

  const goToSpread = (next) => {
    const clamped = Math.max(0, Math.min(spreadCount - 1, next));
    if (clamped === spread || animating) return;
    setAnimating(true);
    window.setTimeout(() => {
      setSpread(clamped);
      setAnimating(false);
    }, 280);
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (animating) return;
      if (e.key === "ArrowLeft") goToSpread(spread - 1);
      if (e.key === "ArrowRight") goToSpread(spread + 1);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- goToSpread uses spread/animating
  }, [spread, spreadCount, animating, onClose]);

  useEffect(() => {
    const el = thumbsRef.current?.querySelector(".u-flipbook-thumb.is-active");
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [spread]);

  if (!current) return null;

  const layoutClass =
    current.pagesPerSpread === 3
      ? "is-triple"
      : current.urls.length === 1
        ? "is-single"
        : "is-double";

  return (
    <div
      className="u-flipbook"
      role="dialog"
      aria-modal="true"
      aria-labelledby="u-flipbook-title"
      onClick={onClose}
    >
      <div className="u-flipbook-shell" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="u-flipbook-close"
          onClick={onClose}
          aria-label="Close flipbook"
        >
          ×
        </button>

        <div id="u-flipbook-title" className="u-flipbook-title">
          {title}
        </div>

        <div className="u-flipbook-stage">
          {spreadCount > 1 && (
            <button
              type="button"
              className="u-flipbook-arrow u-flipbook-arrow--prev"
              onClick={() => goToSpread(spread - 1)}
              disabled={spread === 0 || animating}
              aria-label="Previous spread"
            >
              ‹
            </button>
          )}

          <div
            className={`u-flipbook-spread ${layoutClass}${animating ? " is-turning" : ""}`}
          >
            {current.urls.map((url, pageIdx) => (
              <span key={url} className="u-flipbook-spread-cell">
                {pageIdx > 0 && <div className="u-flipbook-spine" aria-hidden />}
                <div
                  className={[
                    "u-flipbook-page",
                    pageIdx === 0 && "u-flipbook-page--left",
                    pageIdx === current.urls.length - 1 &&
                      current.urls.length > 1 &&
                      "u-flipbook-page--right",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <img
                    src={url}
                    alt={`${title} — page ${pagesBefore + pageIdx + 1}`}
                  />
                </div>
              </span>
            ))}
          </div>

          {spreadCount > 1 && (
            <button
              type="button"
              className="u-flipbook-arrow u-flipbook-arrow--next"
              onClick={() => goToSpread(spread + 1)}
              disabled={spread >= spreadCount - 1 || animating}
              aria-label="Next spread"
            >
              ›
            </button>
          )}
        </div>

        <p className="u-flipbook-count">
          Spread {spread + 1} of {spreadCount}
          {totalPages > 1 && (
            <>
              {" "}
              · Pages {pageStart}
              {pageEnd > pageStart ? `–${pageEnd}` : ""} of {totalPages}
            </>
          )}
        </p>

        <div className="u-flipbook-thumbs-wrap">
          <div className="u-flipbook-thumbs" ref={thumbsRef}>
            {segments.flatMap((seg) => seg.urls).map((url, idx) => (
              <button
                key={url}
                type="button"
                className={`u-flipbook-thumb${thumbSpreadByUrl[idx] === spread ? " is-active" : ""}`}
                onClick={() => goToSpread(thumbSpreadByUrl[idx])}
                aria-label={`Go to page ${idx + 1}`}
                aria-current={
                  thumbSpreadByUrl[idx] === spread ? "true" : undefined
                }
              >
                <img src={url} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UnlimitedDesignCo() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const openGallery = (item) => {
    const segments = getGallerySegments(item);
    const count = segments.reduce((n, s) => n + s.urls.length, 0);
    if (!count) return;
    setLightbox({ title: item.title, segments });
  };

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    const subject = encodeURIComponent("Project inquiry — Unlimited Design Co.");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:bevlim2468@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="u">
      <nav className="u-nav">
        <button type="button" className="u-brand" onClick={() => scrollTo("home")}>
          <img className="u-logo u-brand-logo" src={LOGO} alt="Unlimited Design Co." />
        </button>
        <div className="u-nav-links">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className="u-nav-link"
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" className="u-cta" onClick={() => scrollTo("contact")}>
          Contact
        </button>
      </nav>

      <header id="home" className="u-hero">
        <div className="u-hero-l u-hero-l--ivory-pattern">
          <div className="u-eyebrow">Design for communities &amp; brands</div>
          <h1 className="u-h1">
            Where good work
            <br />
            meets <em>good people.</em>
          </h1>
          <p className="u-sub">
            Polished, purposeful design for{" "}
            <strong>
              chambers of commerce, civic organizations, real estate professionals,
            </strong>{" "}
            and growing local brands. Every piece built to make your community look as good as
            it actually is.
          </p>
          <div className="u-btns">
            <button type="button" className="u-btn" onClick={() => scrollTo("portfolio")}>
              View our work
            </button>
            <button type="button" className="u-btn-g" onClick={() => scrollTo("contact")}>
              Let&apos;s talk
            </button>
          </div>
        </div>
        <div className="u-hero-r">
          <div className="u-hero-img">
            <img className="u-logo u-hero-logo" src={LOGO} alt="Unlimited Design Co." />
          </div>
        </div>
      </header>

      <div className="u-stats">
        <div className="u-stat">
          <div className="u-stat-n">13+</div>
          <div className="u-stat-l">Years experience</div>
        </div>
        <div className="u-stat">
          <div className="u-stat-n">100+</div>
          <div className="u-stat-l">Projects delivered</div>
        </div>
        <div className="u-stat">
          <div className="u-stat-n">IP</div>
          <div className="u-stat-l">Licensed design</div>
        </div>
      </div>

      <div className="u-pattern-break u-pattern-break--sage">
        <div className="u-ey u-sage-ey">Who we serve</div>
        <h2 className="u-h2 u-sage-h2">
          Design that feels <em className="u-sage-em u-h2-accent--gold">like home</em>
        </h2>
        <p className="u-p u-sage-p">
          From civic events to real estate suites — we bring the same care and craft to every
          community we are part of.
        </p>
      </div>

      <section className="u-sec u-sage-sec u-sec--sage-pattern">
        <div className="u-sec-inner">
          <div className="u-tags">
            {[
              "Chambers of Commerce",
              "Civic Organizations",
              "Realtor Associations",
              "Real Estate Agents",
              "Community Events",
              "Local Businesses",
            ].map((tag) => (
              <div key={tag} className="u-tag">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="portfolio" className="u-pattern-break u-pattern-break--ivory">
        <div className="u-ey">Selected work</div>
        <h2 className="u-h2">
          A portfolio <em><span className="u-h2-accent--mauve">built</span> on results</em>
        </h2>
        <p className="u-p">
          From globally distributed licensed accessories to community-defining civic campaigns.
        </p>
      </div>

      <section className="u-sec u-sec--ivory-pattern">
        <div className="u-pgrid">
          {PORTFOLIO.map((item) => (
            <article
              key={item.title}
              className={`u-pi${item.gallery ? " u-pi--clickable" : ""}`}
              role={item.gallery ? "button" : undefined}
              tabIndex={item.gallery ? 0 : undefined}
              onClick={item.gallery ? () => openGallery(item) : undefined}
              onKeyDown={
                item.gallery
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openGallery(item);
                      }
                    }
                  : undefined
              }
              aria-label={
                item.gallery ? `Open gallery — ${item.title}` : undefined
              }
            >
              <div className="u-pt" style={{ background: item.accent }}>
                <img
                  className="u-pt-img"
                  src={item.image}
                  alt={item.imageAlt}
                  style={
                    item.imagePosition
                      ? { objectPosition: item.imagePosition }
                      : undefined
                  }
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="u-pm">
                <div className="u-pt2">{item.heading}</div>
                <div className="u-pc">{item.client}</div>
                {item.href && (
                  <a
                    className="u-p-link"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.linkLabel ?? "View project"} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {lightbox && (
          <PortfolioFlipbook
            key={lightbox.title}
            title={lightbox.title}
            segments={lightbox.segments}
            onClose={() => setLightbox(null)}
          />
        )}
      </section>

      <div id="services" className="u-pattern-break u-pattern-break--cream">
        <div className="u-ey">What we offer</div>
        <h2 className="u-h2">
          <em className="u-h2-accent--mauve">Design services</em> that move the needle
        </h2>
        <p className="u-p">
          Tailored for communities, civic organizations, and growing brands — with the polish of
          an in-house creative team.
        </p>
      </div>

      <section className="u-sec u-sec--cream-pattern">
        <div className="u-sgrid">
          {SERVICES.map((s) => (
            <div key={s.title} className={`u-sc${s.featured ? " ft" : ""}`}>
              <div className={`u-sl${s.featured ? " ht" : ""}`}>{s.badge}</div>
              <h3 className="u-sh3">{s.title}</h3>
              <p className="u-sb">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="u-sec u-sage-sec" style={{ padding: "4rem 2rem" }}>
        <div className="u-sec-inner u-about-grid">
          <div>
            <h2 className="u-ah2">
              <span className="u-ah2-line">Beverly Lim —</span>
              <em className="u-ah2-role">Creative Director</em>
            </h2>
            <p className="u-ab">
              Graphic designer with 13+ years turning ideas into polished, purposeful visuals.
              Marketing Chair for the Monterey Park Chamber of Commerce, Creative Director for
              the Miss &amp; Miss Teen Monterey Park Pageant, and founder of Creative Futures.
            </p>
            <p className="u-ab">
              I contribute graphics across chamber campaigns and helped shape the design of the
              chamber website —{" "}
              <a
                href="https://www.montereyparkchamber.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.montereyparkchamber.org
              </a>
              , including the pageant program at{" "}
              <a
                href="https://www.montereyparkchamber.org/pageant"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.montereyparkchamber.org/pageant
              </a>
              .
            </p>
            <p className="u-ab">
              I believe good design is not a luxury — it is the difference between being noticed
              and being overlooked.
            </p>
          </div>
          <ul className="u-cred-list">
            {CREDENTIALS.map(([strong, rest]) => (
              <li key={strong}>
                <span className="u-cred-text">
                  {rest ? (
                    <>
                      <strong>{strong}</strong>, {rest}
                    </>
                  ) : (
                    strong
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="u-contact">
        <div>
          <h2 className="u-ch2">
            Ready to work
            <br />
            <em>together?</em>
          </h2>
          <p className="u-cp">
            Whether you are a chamber looking for a full campaign suite or a realtor ready for
            a brand refresh — every great project starts with a conversation.
          </p>
          <div className="u-cd">
            <div>
              Email —{" "}
              <a href="mailto:bevlim2468@gmail.com">bevlim2468@gmail.com</a>
            </div>
            <div>
              Based in — <span>The San Gabriel Valley</span>
            </div>
            <div>
              Serving — <span>Communities &amp; businesses nationwide</span>
            </div>
          </div>
        </div>
        {sent ? (
          <p className="u-cp" style={{ margin: 0 }}>
            Thank you — your email client should open with your message. I&apos;ll reply within
            1–2 business days.
          </p>
        ) : (
          <form onSubmit={submit}>
            <input
              className="u-ff"
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={update}
              required
            />
            <input
              className="u-ff"
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={update}
              required
            />
            <textarea
              className="u-ff"
              name="message"
              rows={4}
              placeholder="Tell me about your project"
              style={{ resize: "none" }}
              value={form.message}
              onChange={update}
            />
            <button type="submit" className="u-fs">
              Send message →
            </button>
          </form>
        )}
      </section>

      <footer className="u-footer">
        <div className="u-footer-bg" />
        <div className="u-fc">
          <div className="u-fl">
            <img className="u-logo u-footer-logo" src={FOOTER_LOGO} alt="Unlimited Design Co." />
          </div>
          <div className="u-fcp">
            © 2025 · Beverly Lim · The San Gabriel Valley
          </div>
        </div>
      </footer>
    </div>
  );
}
