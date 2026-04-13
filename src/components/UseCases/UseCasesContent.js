"use client";

import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import { tabs, panels } from "@/data/use-cases/content";

const panelVariants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// Icons
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      fill="currentColor"
    />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.8-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
  </svg>
);

const LinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// Link preview card inside Row 1
const LinkPreview = ({ link, accentColor }) => {
  if (!link) return null;
  const icon =
    link.type === "twitter" ? (
      <XIcon />
    ) : link.type === "youtube" ? (
      <YouTubeIcon />
    ) : (
      <LinkIcon />
    );

  return (
    <div
      className="flex flex-col gap-2.5 p-5 rounded-lg transition-all duration-200"
      style={{
        border: `1px solid ${accentColor}33`,
        background: `${accentColor}0D`,
      }}
    >
      <div className="flex items-center gap-2 text-[#536471] text-[12px] font-medium">
        {icon}
        <span>{link.author || link.site}</span>
      </div>
      <p className="font-slussen text-[13px] leading-5 text-[#4a4a5a]">
        {link.quote}
      </p>
      <span className="font-slussenMono text-[11px] text-black/30 tracking-[0.04em]">
        {link.domain}
      </span>
    </div>
  );
};

// Lead text section
const LeadText = ({ lead, accentColor }) => (
  <motion.div
    className="max-w-[680px] w-full mx-auto flex flex-col gap-3.5 p-7 sm:p-8 rounded-md border border-black/[0.06] bg-black/[0.03] mb-14 md:mb-[100px]"
    variants={fadeUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {lead.map((item, i) => (
      <p
        key={i}
        className="font-slussenMono text-[14px] leading-[24px] text-[#4a4a5a]"
      >
        {item.text}
        {item.link && (
          <a
            href={item.link.url}
            className="underline underline-offset-2 font-medium transition-opacity hover:opacity-70"
            style={{ color: accentColor }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.link.text}
          </a>
        )}
        {item.textAfter}
        {item.accent && (
          <span className="font-medium" style={{ color: accentColor }}>
            {item.accent}
          </span>
        )}
      </p>
    ))}
  </motion.div>
);

// Row 1 — full-width 3-column linked card
const Row1Card = ({ row1, accentColor }) => {
  const Tag = row1.href ? "a" : "div";
  const linkProps = row1.href
    ? { href: row1.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div variants={staggerItem}>
      <Tag
        {...linkProps}
        className="group grid grid-cols-1 lg:grid-cols-[28fr_40fr_32fr] w-full rounded-xl border border-black/[0.08] overflow-hidden bg-white no-underline text-inherit transition-colors duration-200 hover:border-current"
        style={{ "--tw-current-color": accentColor }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = accentColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
        }}
      >
        {/* Title column */}
        <div className="flex flex-col gap-5 p-8 lg:p-10 lg:border-r border-black/[0.06]">
          <span
            className="font-slussenMono text-[14px] font-semibold tracking-[1.5px]"
            style={{ color: accentColor }}
          >
            {row1.number}
          </span>
          <h3 className="font-slussen font-medium text-[26px] md:text-[34px] leading-[1.24] tracking-[-1.2px] text-[#1a1a2e]">
            {row1.title}
          </h3>
        </div>

        {/* Body column */}
        <div className="flex flex-col gap-3 p-8 lg:p-10 lg:border-r border-black/[0.06]">
          {row1.body.map((p, i) => (
            <p
              key={i}
              className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a]"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
          {row1.accentBody && (
            <p
              className="font-slussen text-[14px] leading-[23px] font-medium"
              style={{ color: accentColor }}
            >
              {row1.accentBody}
            </p>
          )}
        </div>

        {/* Preview column */}
        <div className="flex flex-col justify-center p-8 lg:p-8">
          <LinkPreview link={row1.link} accentColor={accentColor} />
        </div>
      </Tag>
    </motion.div>
  );
};

// Row 2 cards — side by side
const Row2Card = ({ card, accentColor }) => (
  <motion.div
    className="flex flex-col rounded-xl border border-black/[0.08] overflow-hidden bg-white transition-colors duration-300"
    variants={staggerItem}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = accentColor;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
    }}
  >
    {/* Title */}
    <div className="flex flex-col gap-4 p-8 lg:px-9 lg:pt-9 lg:pb-5 border-b border-black/[0.06]">
      <span
        className="font-slussenMono text-[14px] font-semibold tracking-[1.5px]"
        style={{ color: accentColor }}
      >
        {card.number}
      </span>
      <h3 className="font-slussen font-medium text-[26px] md:text-[34px] leading-[42px] tracking-[-1.2px] text-[#1a1a2e]">
        {card.title}
      </h3>
    </div>

    {/* Body */}
    <div className="flex flex-col gap-3 p-8 lg:px-9 lg:pt-6 lg:pb-9">
      {card.body.map((p, i) => (
        <p
          key={i}
          className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a]"
        >
          {p}
        </p>
      ))}
      {card.list && (
        <ul className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a] pl-5 flex flex-col gap-1 list-disc">
          {card.list.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      )}
      {card.accentBody && (
        <p
          className="font-slussen text-[14px] leading-[23px] font-medium"
          style={{ color: accentColor }}
        >
          {card.accentBody}
        </p>
      )}
    </div>
  </motion.div>
);

const UseCasesContent = ({ activeTab }) => {
  const panel = panels[activeTab];
  const activeTabData = tabs.find((t) => t.id === activeTab);
  const accentColor = activeTabData?.color || "#4A7EA8";
  const row2Cols = panel.row2Cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section
      id="use-cases-content"
      data-header-theme="light"
      className="bg-[#FDFCFF] py-16 md:py-20 lg:py-24 scroll-mt-16"
    >
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
            {/* Headline */}
            <h2 className="font-slussen font-medium text-[26px] sm:text-[32px] md:text-[40px] leading-[1.25] tracking-[-1.8px] text-[#1a1a2e] text-center max-w-[640px] mb-8">
              {panel.headline}
            </h2>

            {/* Lead text box */}
            <LeadText lead={panel.lead} accentColor={accentColor} />

            {/* Cards */}
            <motion.div
              className="flex flex-col gap-3 w-full"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Row 1 — full-width 3-col card */}
              {panel.row1 && (
                <Row1Card row1={panel.row1} accentColor={accentColor} />
              )}

              {/* Row 2 — side-by-side cards */}
              {panel.row2 && panel.row2.length > 0 && (
                <div className={`grid grid-cols-1 ${row2Cols} gap-3`}>
                  {panel.row2.map((card) => (
                    <Row2Card
                      key={card.number}
                      card={card}
                      accentColor={accentColor}
                    />
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
