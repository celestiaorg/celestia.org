"use client";

import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import { tabs, panels } from "@/data/applications/content";

// Prototype design tokens
const STEEL_BLUE = "#3B7BA9"; // --steel-blue
const AMETHYST = "#7C68F2"; // --amethyst
const SANDSTONE = "#A99C92"; // --sandstone (novel panel borders/hover)
const SANDSTONE_TEXT = "#6C5E55"; // --sandstone-text (novel accents)

// Dots + gaps shrink on small screens (clamp) so the 3-column latency comparison
// fits narrow phones, but stay at their desktop size ≥ ~768px. Pure CSS — no JS.
const fluidPx = (max: number, floor: number): string => `clamp(${floor}px, ${((max / 768) * 100).toFixed(3)}vw, ${max}px)`;

const panelVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
};

const YouTubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.8-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
  </svg>
);

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

interface CardNumProps {
  children: React.ReactNode;
  color: string;
}

// Shared card title elements — NuberNext Wide per prototype
const CardNum = ({ children, color }: CardNumProps) => (
  <span className="font-nuberNextWide text-[14px] font-medium tracking-[1.5px]" style={{ color }}>
    {children}
  </span>
);

const cardHeadingClasses =
  "font-nuberNextWide font-medium text-[23px] min-[431px]:text-[26px] md:text-[32px] leading-[1.25] tracking-[-0.025em] text-[#0E1014]";

const cardBodyTextClasses = "font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4A5058]";

interface QuoteData {
  url: string;
  text: string;
  highlight?: string;
  textAfter?: string;
  author: string;
  handle: string;
  date?: string;
}

interface QuoteCardProps {
  quote: QuoteData;
  accentColor: string;
}

// Quote card with accent line (prototype .uc-quote--card --large)
const QuoteCard = ({ quote, accentColor }: QuoteCardProps) => (
  <a
    href={quote.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex gap-3.5 p-6 rounded-lg border border-black/[0.08] bg-black/[0.02] no-underline text-inherit transition-colors duration-200"
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
  >
    <div className="w-[3px] flex-shrink-0 rounded-sm" style={{ background: accentColor }} />
    <div className="flex flex-col gap-2.5">
      <p className={cardBodyTextClasses}>
        {quote.text}{" "}
        {quote.highlight && <span className="font-medium" style={{ color: accentColor }}>{quote.highlight}</span>}
        {quote.textAfter}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-nuberNext text-[16px] font-medium text-[#0E1014]">{quote.author}</span>
        <span className="font-nuberNext text-[16px] text-[#808890]">{quote.handle}</span>
        {quote.date && (
          <span className="font-nuberNext text-[16px] text-[#808890]">
            <span className="mr-2">·</span>
            {quote.date}
          </span>
        )}
      </div>
    </div>
  </a>
);

// Latency comparison diagram (prototype .uc-latency--card) — amethyst hero column
const LatencyDiagram = () => {
  const cols = [
    { value: "1", label: "Bullet", logo: "/images/app/homepage/logo-bullet.svg", dots: 2, gridCols: 2, hero: true },
    { value: "70", label: "Hyperliquid", logo: "/images/app/homepage/logo-hyperliquid.svg", dots: 63, gridCols: 9, hero: false },
    { value: "400", label: "Solana", logo: "/images/app/homepage/logo-solana.svg", dots: 380, gridCols: 20, hero: false, dense: true },
  ];

  return (
    <div className="flex gap-1.5 sm:gap-2 w-full min-h-[200px] sm:min-h-[220px]">
      {cols.map((col) => (
        <div
          key={col.label}
          className="flex-1 min-w-0 flex flex-col items-center gap-1.5 p-2 pb-2.5 sm:p-4 sm:pb-3 rounded-lg border"
          style={
            col.hero
              ? { background: "rgba(124, 104, 242, 0.1)", borderColor: "rgba(124, 104, 242, 0.3)" }
              : { background: "rgba(0, 0, 0, 0.015)", borderColor: "rgba(0, 0, 0, 0.06)" }
          }
        >
          <div className="flex items-baseline gap-1 justify-center">
            <span
              className={`font-nuberNextWide text-[22px] min-[400px]:text-[26px] sm:text-[32px] leading-none tracking-[-0.025em] ${
                col.hero ? "font-semibold" : "font-medium text-black/25"
              }`}
              style={col.hero ? { color: AMETHYST } : undefined}
            >
              {col.value}
            </span>
            <span
              className={`font-nuberNextWide text-[11px] sm:text-[14px] ${col.hero ? "opacity-80" : "text-black/20"}`}
              style={col.hero ? { color: AMETHYST } : undefined}
            >
              ms
            </span>
          </div>
          <div
            className="grid justify-center flex-1 content-start mt-2"
            style={{
              gridTemplateColumns: `repeat(${col.gridCols}, ${col.dense ? fluidPx(3, 2) : fluidPx(6, 4)})`,
              gap: col.dense ? fluidPx(2, 1.5) : fluidPx(3, 2),
            }}
          >
            {Array.from({ length: col.dots }).map((_, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: col.dense ? fluidPx(3, 2) : fluidPx(6, 4),
                  height: col.dense ? fluidPx(3, 2) : fluidPx(6, 4),
                  background: col.hero ? AMETHYST : "#2a2a3a",
                  opacity: col.hero ? 0.6 : 0.15,
                }}
              />
            ))}
          </div>
          {col.hero ? (
            // Recolor the white logo to the exact AMETHYST brand purple via a CSS
            // mask. The previous brightness/sepia/hue-rotate filter only approximated
            // the color and rendered pink on iOS Safari (wide-gamut hue-rotate differs
            // from desktop Chrome); a mask + solid background is pixel-exact and
            // browser-consistent. aspectRatio matches the logo SVG viewBox (195x55).
            <div
              role="img"
              aria-label={col.label}
              className="mt-auto h-[15px] sm:h-[22px] opacity-95"
              style={{
                aspectRatio: "195 / 55",
                backgroundColor: AMETHYST,
                WebkitMaskImage: `url(${col.logo})`,
                maskImage: `url(${col.logo})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
              }}
            />
          ) : (
            <img
              src={col.logo}
              alt={col.label}
              className={`mt-auto ${col.dense ? "h-[16px] opacity-40" : "h-[18px] opacity-40"}`}
              style={{ filter: "brightness(0)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

interface LinkData {
  url: string;
  thumbnail?: string;
  author: string;
  quote: string;
  domain: string;
  type?: string;
}

// YouTube link card — row layout with thumbnail (prototype .uc-link-card--beige --row)
const YouTubeLinkCard = ({ link }: { link: LinkData }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col md:flex-row items-start md:items-center gap-3.5 p-5 rounded-lg no-underline text-inherit transition-all duration-200"
    style={{ border: "1px solid rgba(124, 104, 242, 0.25)", background: "rgba(124, 104, 242, 0.05)" }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMETHYST; e.currentTarget.style.background = "rgba(124, 104, 242, 0.14)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(124, 104, 242, 0.25)"; e.currentTarget.style.background = "rgba(124, 104, 242, 0.05)"; }}
  >
    <div className="relative w-[190px] min-w-[190px] rounded-lg overflow-hidden leading-[0]">
      <img src={link.thumbnail} alt={link.quote} className="w-full block" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </div>
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 font-nuberNext text-[14px] font-medium text-[#636A74]">
        <YouTubeIcon />
        <span>{link.author}</span>
      </div>
      <p className="font-nuberNext text-[14px] leading-[1.5] text-[#4A5058]">{link.quote}</p>
      <span className="font-nuberNext text-[14px] text-black/30 tracking-[0.04em]">{link.domain}</span>
    </div>
  </a>
);

// Link preview (novel panel) — sandstone tint per prototype [data-panel="novel"] .uc-link-card
const LinkPreview = ({ link }: { link?: LinkData | null }) => {
  if (!link) return null;
  const icon = link.type === "youtube" ? <YouTubeIcon /> : <LinkIcon />;
  return (
    <div
      className="flex flex-col gap-2.5 p-5 rounded-lg transition-all duration-200 group-hover:border-[#A99C92] group-hover:bg-[rgba(168,148,128,0.14)]"
      style={{ border: "1px solid rgba(168, 148, 128, 0.22)", background: "rgba(168, 148, 128, 0.05)" }}
    >
      <div className="flex items-center gap-2 font-nuberNext text-[14px] font-medium text-[#636A74]">{icon}<span>{link.author}</span></div>
      <p className="font-nuberNext text-[14px] leading-[1.5] text-[#4A5058]">{link.quote}</p>
      <span className="font-nuberNext text-[14px] text-black/30 tracking-[0.04em]">{link.domain}</span>
    </div>
  );
};

interface LeadItem {
  text?: string;
  link?: { url: string; text: string };
  textAfter?: string;
  bold?: string;
  accent?: string;
}

interface PanelData {
  headline: string;
  lead: LeadItem[];
  leadList?: LeadItem[];
  leadFooter?: { text: string; accent: string };
  row1?: Row1Data;
  row2?: Row2CardData[];
}

interface Row1Data {
  number: string;
  title: string;
  body: string[];
  list?: string[];
  accentBody?: string;
  quote?: QuoteData;
  latency?: boolean;
  youtubeLink?: LinkData;
  link?: LinkData;
  href?: string;
}

interface Row2CardData {
  number: string;
  title: string;
  body: string[];
  accentBody?: string;
  linkNote?: { text: string; url: string };
}

// Lead text section (prototype .uc-panel-lead — Roboto Mono 14px)
const LeadText = ({ panel, accentColor }: { panel: PanelData; accentColor: string }) => (
  <motion.div
    className="max-w-[680px] w-full mx-auto flex flex-col gap-3.5 p-7 sm:px-8 rounded-lg border border-black/[0.06] bg-black/[0.03] mb-14"
    variants={fadeUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {panel.lead.map((item, i) => (
      <p key={i} className="font-robotoMono text-[14px] leading-[1.5] tracking-normal text-[#4A5058]">
        {item.text}
        {item.link && (
          <a href={item.link.url} className="underline underline-offset-2 font-medium transition-opacity hover:opacity-70" style={{ color: accentColor }} target="_blank" rel="noopener noreferrer">{item.link.text}</a>
        )}
        {item.textAfter}
        {item.bold && <strong className="font-medium" style={{ color: accentColor }}>{item.bold}</strong>}
        {item.accent && <em className="font-medium not-italic" style={{ color: accentColor }}>{item.accent}</em>}
      </p>
    ))}
    {panel.leadList && (
      <ul className="flex flex-col gap-2.5 pl-0 list-none">
        {panel.leadList.map((item, i) => (
          <li key={i} className="font-robotoMono text-[14px] leading-[1.5] tracking-normal text-[#4A5058] relative pl-4">
            <span className="absolute left-0 text-[#808890]">—</span>
            {item.text}
            {item.link && <a href={item.link.url} className="underline underline-offset-2 font-medium transition-opacity hover:opacity-70" style={{ color: accentColor }} target="_blank" rel="noopener noreferrer">{item.link.text}</a>}
            {item.textAfter}
          </li>
        ))}
      </ul>
    )}
    {panel.leadFooter && (
      <p className="font-robotoMono text-[14px] leading-[1.5] tracking-normal text-[#4A5058]">
        {panel.leadFooter.text}
        <em className="font-medium not-italic" style={{ color: accentColor }}>{panel.leadFooter.accent}</em>
      </p>
    )}
  </motion.div>
);

// Row 1 — twin layout (text left, right content)
const Row1Twin = ({ row1, accentColor }: { row1: Row1Data; accentColor: string }) => {
  const stacked = Boolean(row1.latency);
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 w-full rounded-lg border border-black/[0.08] overflow-hidden bg-white transition-colors duration-200"
      variants={staggerItem}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 p-8 pb-5">
          <CardNum color={accentColor}>{row1.number}</CardNum>
          <h3 className={cardHeadingClasses}>{row1.title}</h3>
        </div>
        <div className="flex flex-col gap-3 px-8 pb-8 flex-1">
          {row1.body.map((p, i) => (
            <p key={i} className={cardBodyTextClasses}>{p}</p>
          ))}
          {row1.list && (
            <ul className="flex flex-col gap-2.5 pl-0 list-none">
              {row1.list.map((item, i) => (
                <li key={i} className={`${cardBodyTextClasses} relative pl-4`}>
                  <span className="absolute left-0" style={{ color: accentColor }}>—</span>{item}
                </li>
              ))}
            </ul>
          )}
          {row1.accentBody && <p className="font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] font-medium" style={{ color: accentColor }}>{row1.accentBody}</p>}
        </div>
      </div>
      <div className={`flex flex-col lg:border-l border-t lg:border-t-0 border-black/[0.06] justify-center ${stacked ? "gap-5 p-7" : "gap-4 p-8"}`}>
        {row1.quote && <QuoteCard quote={row1.quote} accentColor={accentColor} />}
        {row1.latency && <LatencyDiagram />}
        {row1.youtubeLink && <YouTubeLinkCard link={row1.youtubeLink} />}
      </div>
    </motion.div>
  );
};

// Row 1 — 3-column (novel / Experimental panel only)
const Row1ThreeCol = ({ row1, accentColor = SANDSTONE_TEXT }: { row1: Row1Data; accentColor?: string }) => {
  const Tag = row1.href ? "a" : "div";
  const linkProps = row1.href ? { href: row1.href, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <motion.div variants={staggerItem}>
      <Tag
        {...linkProps}
        className="group grid grid-cols-1 lg:grid-cols-[28fr_40fr_32fr] w-full rounded-lg border border-black/[0.08] overflow-hidden bg-white no-underline text-inherit transition-colors duration-200"
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = SANDSTONE; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
      >
        <div className="flex flex-col gap-5 p-8 lg:px-9 lg:py-10 lg:border-r border-black/[0.06]">
          <CardNum color={accentColor}>{row1.number}</CardNum>
          <h3 className={cardHeadingClasses}>{row1.title}</h3>
        </div>
        <div className="flex flex-col gap-3 p-8 lg:px-9 lg:py-10 lg:border-r border-black/[0.06]">
          {row1.body.map((p, i) => <p key={i} className={cardBodyTextClasses}>{p}</p>)}
          {row1.accentBody && <p className="font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] font-medium" style={{ color: accentColor }}>{row1.accentBody}</p>}
        </div>
        <div className="flex flex-col justify-center p-8 lg:py-10">
          <LinkPreview link={row1.link} />
        </div>
      </Tag>
    </motion.div>
  );
};

// Row 2 cards
const Row2Card = ({ card, accentColor }: { card: Row2CardData; accentColor: string }) => (
  <motion.div
    className="flex flex-col rounded-lg border border-black/[0.08] overflow-hidden bg-white transition-colors duration-300"
    variants={staggerItem}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
  >
    <div className="flex flex-col gap-4 p-8 lg:px-9 lg:pt-9 lg:pb-5 border-b border-black/[0.06]">
      <CardNum color={accentColor}>{card.number}</CardNum>
      <h3 className={cardHeadingClasses}>{card.title}</h3>
    </div>
    <div className="flex flex-col gap-3 p-8 lg:px-9 lg:pt-6 lg:pb-9">
      {card.body.map((p, i) => <p key={i} className={cardBodyTextClasses}>{p}</p>)}
      {card.accentBody && <p className="font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] font-medium" style={{ color: accentColor }}>{card.accentBody}</p>}
      {card.linkNote && (
        <a
          href={card.linkNote.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-robotoMono text-[16px] font-medium leading-[1.5] mt-3 underline underline-offset-[3px] transition-colors duration-200"
          style={{ color: accentColor, textDecorationColor: `${accentColor}4D` }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecorationColor = accentColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecorationColor = `${accentColor}4D`; }}
        >
          {card.linkNote.text}
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="inline-block ml-1 align-middle">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  </motion.div>
);

const ApplicationsContent = ({ activeTab }: { activeTab: string }) => {
  const panel = panels[activeTab];
  const activeTabData = tabs.find((t) => t.id === activeTab);
  const accentColor = activeTabData?.color || STEEL_BLUE;
  const useThreeCol = activeTab === "novel" && panel.row1?.link;

  return (
    <section id="applications-content" data-header-theme="light" className="bg-[#FDFCFF] py-16 md:py-20 lg:py-24 scroll-mt-[104px]">
      <Container size="2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center"
            data-tab={activeTab}
          >
            <h2 className="font-nuberNextWide font-medium text-[23px] min-[431px]:text-[26px] md:text-[32px] lg:text-[36px] leading-[1.1] tracking-[-0.04em] text-[#0E1014] text-center max-w-[640px] mb-8">
              {panel.headline}
            </h2>

            <LeadText panel={panel} accentColor={accentColor} />

            <motion.div
              className="flex flex-col gap-3 w-full"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {panel.row1 && (
                useThreeCol
                  ? <Row1ThreeCol row1={panel.row1} accentColor={accentColor} />
                  : <Row1Twin row1={panel.row1} accentColor={accentColor} />
              )}

              {panel.row2 && panel.row2.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {panel.row2.map((card) => (
                    <Row2Card key={card.number} card={card} accentColor={accentColor} />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default ApplicationsContent;
