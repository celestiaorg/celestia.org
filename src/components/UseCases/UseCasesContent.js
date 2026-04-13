"use client";

import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import { tabs, panels } from "@/data/use-cases/content";

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

// Quote card with accent line
const QuoteCard = ({ quote, accentColor }) => (
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
      <p className="font-slussenMono text-[15px] leading-[24px] text-[#4a4a5a] italic">
        {quote.text}{" "}
        {quote.highlight && <span className="font-slussenMono text-[18px] font-semibold tracking-[-0.3px] not-italic" style={{ color: accentColor }}>{quote.highlight}</span>}
        {quote.textAfter}
      </p>
      <div className="flex items-center gap-2">
        <span className="font-slussenMono text-[12px] font-semibold text-[#1a1a1a]">{quote.author}</span>
        <span className="font-slussenMono text-[11px] text-[#8a8a9a]">{quote.handle}</span>
      </div>
    </div>
  </a>
);

// Latency comparison diagram
const LatencyDiagram = ({ accentColor }) => {
  const cols = [
    { value: "1.2", label: "Bullet", logo: "/images/app/homepage/logo-bullet.svg", dots: 2, gridCols: 2, hero: true },
    { value: "70", label: "Hyperliquid", logo: "/images/app/homepage/logo-hyperliquid.svg", dots: 63, gridCols: 9, hero: false },
    { value: "400", label: "Solana", logo: "/images/app/homepage/logo-solana.svg", dots: 380, gridCols: 20, hero: false, dense: true },
  ];

  return (
    <div className="flex flex-col gap-3.5 w-full">
      <h4 className="font-slussen text-[16px] font-medium tracking-[-0.5px]" style={{ color: accentColor }}>Latency</h4>
      <div className="flex gap-2 flex-1 min-h-[220px]">
        {cols.map((col) => (
          <div
            key={col.label}
            className={`flex-1 flex flex-col items-center gap-2 p-4 pb-3 rounded-lg border ${
              col.hero ? "border-[rgba(168,148,128,0.22)] bg-[rgba(168,148,128,0.06)]" : "border-black/[0.06] bg-white"
            }`}
          >
            <div className="flex items-baseline gap-1 justify-center">
              <span className={`font-slussenExtended font-bold tracking-[-1px] leading-none ${col.hero ? "text-[32px]" : "text-[28px] text-black/25"}`} style={col.hero ? { color: accentColor } : undefined}>
                {col.value}
              </span>
              <span className={`font-slussenExtended text-[12px] ${col.hero ? "opacity-70" : "text-black/20"}`} style={col.hero ? { color: accentColor } : undefined}>ms</span>
            </div>
            <div
              className="grid gap-[3px] justify-center flex-1 content-start mt-2"
              style={{ gridTemplateColumns: `repeat(${col.dense ? 20 : col.gridCols}, ${col.dense ? "3px" : "6px"})` }}
            >
              {Array.from({ length: col.dots }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-full"
                  style={{
                    width: col.dense ? 3 : 6,
                    height: col.dense ? 3 : 6,
                    background: col.hero ? accentColor : "#2a2a3a",
                    opacity: col.hero ? 0.5 : 0.15,
                  }}
                />
              ))}
            </div>
            <img
              src={col.logo}
              alt={col.label}
              className={`mt-auto ${col.hero ? "h-[22px] opacity-80" : "h-[18px] opacity-40"} ${col.dense ? "!h-[14px]" : ""}`}
              style={col.hero ? { filter: "brightness(0) saturate(100%) invert(60%) sepia(20%) saturate(500%) hue-rotate(350deg) brightness(0.9)" } : { filter: "brightness(0)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// YouTube link card
const YouTubeLinkCard = ({ link, accentColor }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex gap-3 p-4 rounded-lg no-underline text-inherit transition-all duration-200"
    style={{ border: `1px solid ${accentColor}33`, background: `${accentColor}0D` }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.background = `${accentColor}24`; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${accentColor}33`; e.currentTarget.style.background = `${accentColor}0D`; }}
  >
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-[12px] font-medium text-[#536471]">
        <YouTubeIcon />
        <span>{link.author}</span>
      </div>
      <p className="font-slussen text-[13px] leading-5 text-[#4a4a5a]">{link.quote}</p>
      <span className="font-slussenMono text-[11px] text-black/30 tracking-[0.04em]">{link.domain}</span>
    </div>
  </a>
);

// Link preview (novel panel)
const LinkPreview = ({ link, accentColor }) => {
  if (!link) return null;
  const icon = link.type === "youtube" ? <YouTubeIcon /> : <LinkIcon />;
  return (
    <div className="flex flex-col gap-2.5 p-5 rounded-lg transition-all duration-200" style={{ border: `1px solid ${accentColor}33`, background: `${accentColor}0D` }}>
      <div className="flex items-center gap-2 text-[#536471] text-[12px] font-medium">{icon}<span>{link.author}</span></div>
      <p className="font-slussen text-[13px] leading-5 text-[#4a4a5a]">{link.quote}</p>
      <span className="font-slussenMono text-[11px] text-black/30 tracking-[0.04em]">{link.domain}</span>
    </div>
  );
};

// Lead text section
const LeadText = ({ panel, accentColor }) => (
  <motion.div
    className="max-w-[680px] w-full mx-auto flex flex-col gap-3.5 p-7 sm:p-8 rounded-md border border-black/[0.06] bg-black/[0.03] mb-14 md:mb-[100px]"
    variants={fadeUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {panel.lead.map((item, i) => (
      <p key={i} className="font-slussenMono text-[14px] leading-[24px] text-[#4a4a5a]">
        {item.text}
        {item.link && (
          <a href={item.link.url} className="underline underline-offset-2 font-medium transition-opacity hover:opacity-70" style={{ color: accentColor }} target="_blank" rel="noopener noreferrer">{item.link.text}</a>
        )}
        {item.textAfter}
        {item.accent && <em className="font-medium not-italic" style={{ color: accentColor }}>{item.accent}</em>}
      </p>
    ))}
    {panel.leadList && (
      <ul className="flex flex-col gap-2.5 pl-0 list-none">
        {panel.leadList.map((item, i) => (
          <li key={i} className="font-slussenMono text-[14px] leading-[24px] text-[#4a4a5a] relative pl-6">
            <span className="absolute left-0 text-[#8a8a9a]">–</span>
            {item.text}
            {item.link && <a href={item.link.url} className="underline underline-offset-2 font-medium transition-opacity hover:opacity-70" style={{ color: accentColor }} target="_blank" rel="noopener noreferrer">{item.link.text}</a>}
            {item.textAfter}
          </li>
        ))}
      </ul>
    )}
    {panel.leadFooter && (
      <p className="font-slussenMono text-[14px] leading-[24px] text-[#4a4a5a]">
        {panel.leadFooter.text}
        <em className="font-medium not-italic" style={{ color: accentColor }}>{panel.leadFooter.accent}</em>
      </p>
    )}
  </motion.div>
);

// Row 1 — twin layout (text left, right content)
const Row1Twin = ({ row1, accentColor }) => (
  <motion.div
    className="grid grid-cols-1 lg:grid-cols-2 w-full rounded-xl border border-black/[0.08] overflow-hidden bg-white transition-colors duration-200"
    variants={staggerItem}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
  >
    <div className="flex flex-col">
      <div className="flex flex-col gap-5 p-8 pb-5">
        <span className="font-slussenMono text-[14px] font-semibold tracking-[1.5px]" style={{ color: accentColor }}>{row1.number}</span>
        <h3 className="font-slussen font-medium text-[26px] md:text-[34px] leading-[42px] tracking-[-1.2px] text-[#1a1a2e]">{row1.title}</h3>
      </div>
      <div className="flex flex-col gap-3 px-8 pb-8 flex-1">
        {row1.body.map((p, i) => (
          <p key={i} className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a]">{p}</p>
        ))}
        {row1.list && (
          <ul className="flex flex-col gap-2 pl-0 list-none">
            {row1.list.map((item, i) => (
              <li key={i} className="font-slussenMono text-[14px] leading-[24px] text-[#4a4a5a] relative pl-4">
                <span className="absolute left-0" style={{ color: accentColor }}>—</span>{item}
              </li>
            ))}
          </ul>
        )}
        {row1.accentBody && <p className="font-slussen text-[14px] leading-[23px] font-medium" style={{ color: accentColor }}>{row1.accentBody}</p>}
      </div>
    </div>
    <div className="flex flex-col gap-5 p-8 lg:border-l border-black/[0.06] justify-center">
      {row1.quote && <QuoteCard quote={row1.quote} accentColor={accentColor} />}
      {row1.latency && <LatencyDiagram accentColor={accentColor} />}
      {row1.youtubeLink && <YouTubeLinkCard link={row1.youtubeLink} accentColor={accentColor} />}
    </div>
  </motion.div>
);

// Row 1 — 3-column (novel panel)
const Row1ThreeCol = ({ row1, accentColor }) => {
  const Tag = row1.href ? "a" : "div";
  const linkProps = row1.href ? { href: row1.href, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <motion.div variants={staggerItem}>
      <Tag
        {...linkProps}
        className="group grid grid-cols-1 lg:grid-cols-[28fr_40fr_32fr] w-full rounded-xl border border-black/[0.08] overflow-hidden bg-white no-underline text-inherit transition-colors duration-200"
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
      >
        <div className="flex flex-col gap-5 p-8 lg:p-10 lg:border-r border-black/[0.06]">
          <span className="font-slussenMono text-[14px] font-semibold tracking-[1.5px]" style={{ color: accentColor }}>{row1.number}</span>
          <h3 className="font-slussen font-medium text-[26px] md:text-[34px] leading-[1.24] tracking-[-1.2px] text-[#1a1a2e]">{row1.title}</h3>
        </div>
        <div className="flex flex-col gap-3 p-8 lg:p-10 lg:border-r border-black/[0.06]">
          {row1.body.map((p, i) => <p key={i} className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a]">{p}</p>)}
          {row1.accentBody && <p className="font-slussen text-[14px] leading-[23px] font-medium" style={{ color: accentColor }}>{row1.accentBody}</p>}
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-8">
          <LinkPreview link={row1.link} accentColor={accentColor} />
        </div>
      </Tag>
    </motion.div>
  );
};

// Row 2 cards
const Row2Card = ({ card, accentColor }) => (
  <motion.div
    className="flex flex-col rounded-xl border border-black/[0.08] overflow-hidden bg-white transition-colors duration-300"
    variants={staggerItem}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
  >
    <div className="flex flex-col gap-4 p-8 lg:px-9 lg:pt-9 lg:pb-5 border-b border-black/[0.06]">
      <span className="font-slussenMono text-[14px] font-semibold tracking-[1.5px]" style={{ color: accentColor }}>{card.number}</span>
      <h3 className="font-slussen font-medium text-[26px] md:text-[34px] leading-[42px] tracking-[-1.2px] text-[#1a1a2e]">{card.title}</h3>
    </div>
    <div className="flex flex-col gap-3 p-8 lg:px-9 lg:pt-6 lg:pb-9">
      {card.body.map((p, i) => <p key={i} className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a]">{p}</p>)}
      {card.accentBody && <p className="font-slussen text-[14px] leading-[23px] font-medium" style={{ color: accentColor }}>{card.accentBody}</p>}
      {card.linkNote && (
        <a
          href={card.linkNote.url}
          className="font-slussenMono text-[12px] font-medium leading-[18px] mt-2 transition-colors duration-200"
          style={{ color: `${accentColor}99`, textDecoration: "underline", textDecorationColor: `${accentColor}4D` }}
          onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; e.currentTarget.style.textDecorationColor = accentColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = `${accentColor}99`; e.currentTarget.style.textDecorationColor = `${accentColor}4D`; }}
        >
          {card.linkNote.text}
        </a>
      )}
    </div>
  </motion.div>
);

const UseCasesContent = ({ activeTab }) => {
  const panel = panels[activeTab];
  const activeTabData = tabs.find((t) => t.id === activeTab);
  const accentColor = activeTabData?.color || "#4A7EA8";
  const useThreeCol = activeTab === "novel" && panel.row1?.link;

  return (
    <section id="use-cases-content" data-header-theme="light" className="bg-[#FDFCFF] py-16 md:py-20 lg:py-24 scroll-mt-16">
      <Container size="2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center"
            id={`${activeTab}-use-cases`}
          >
            <h2 className="font-slussen font-medium text-[26px] sm:text-[32px] md:text-[40px] leading-[1.25] tracking-[-1.8px] text-[#1a1a2e] text-center max-w-[640px] mb-8">
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

export default UseCasesContent;
