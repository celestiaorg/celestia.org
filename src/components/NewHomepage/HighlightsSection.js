"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const highlights = [
  {
    logo: "/images/app/homepage/logo-relay.png",
    logoAlt: "Relay Chain",
    background: "/images/app/homepage/highlight-relay.png",
    tag: "Cross-chain settlement",
    description:
      "Celestia\u2019s blockspace powers Relay\u2019s cross-chain payments settlement.",
    stat: "$8.5B+ in total volume",
    textMaxWidth: "60%",
    href: "https://relay.link/",
  },
  {
    logo: "/images/app/homepage/logo-bullet.svg",
    logoAlt: "Bullet",
    background: "/images/app/homepage/highlight-bullet.png",
    tag: "Exchanges",
    description: "Bullet is a decentralised perpetuals exchange on Celestia.",
    stat: "20k orders/second",
    textMaxWidth: "50%",
    href: "https://www.bullet.xyz/",
  },
];

const investors = [
  {
    src: "/images/app/homepage/raise-logo-1.png",
    alt: "Binance Labs",
    width: 147,
    height: 32,
  },
  {
    src: "/images/app/homepage/raise-logo-2.png",
    alt: "Maven 11",
    width: 159,
    height: 32,
  },
  {
    src: "/images/app/homepage/raise-logo-3.png",
    alt: "Bain Capital Crypto",
    width: 232,
    height: 32,
  },
  {
    src: "/images/app/homepage/raise-logo-4.png",
    alt: "Coinbase Ventures",
    width: 190,
    height: 32,
  },
  {
    src: "/images/app/homepage/raise-logo-5.png",
    alt: "Placeholder",
    width: 170,
    height: 32,
  },
];

// "Powered by Celestia" letter-by-letter reveal title
const AnimatedTitle = () => {
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const text = "Powered by Celestia";

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={titleRef}
      className="font-slussenExtended font-medium text-[36px] tracking-[-1.5px] text-center w-full text-[#1a1a1a] mb-10 flex justify-center"
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transitionDelay: `${i * 40}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0) rotateX(0deg)"
              : "translateY(40px) rotateX(90deg)",
            filter: isVisible ? "blur(0)" : "blur(8px)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
};

// Case study card — matches prototype exactly
const HighlightCard = ({
  logo,
  logoAlt,
  background,
  tag,
  description,
  stat,
  textMaxWidth,
  href,
}) => {
  return (
    <motion.div variants={cardVariants}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full h-[170px] md:h-[240px] rounded-lg overflow-hidden bg-black border border-[rgba(226,232,240,0.1)] no-underline transition-transform duration-[400ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:scale-[1.005]"
      >
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={background}
            alt=""
            className="w-full h-full object-cover scale-[1.35] transition-transform duration-[600ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:scale-[1.38]"
          />
          {/* Dark overlay — fades out on hover */}
          <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 ease-out group-hover:opacity-0" />
        </div>

        {/* Permanent text readability gradient */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)",
          }}
        />

        {/* Card content — matches prototype case-study-card-inner */}
        <div className="relative z-[3] flex flex-col justify-between p-5 md:py-5 md:px-6 w-full">
          {/* Logo — top */}
          <div>
            <img
              src={logo}
              alt={logoAlt}
              className="h-10 w-auto object-contain brightness-0 invert block"
            />
          </div>

          {/* Text — bottom left */}
          <div>
            <span className="font-slussenMono text-[13px] font-semibold uppercase tracking-[1.5px] text-white mb-1.5 block">
              {tag}
            </span>
            <p
              className="font-slussen text-[15px] md:text-[18px] leading-[1.2] tracking-[-0.04em] text-white"
              style={{ maxWidth: textMaxWidth }}
            >
              {description}
            </p>
          </div>

          {/* Stat — absolute bottom right */}
          <strong className="absolute bottom-5 right-6 font-slussenExtended font-bold text-[15px] md:text-[20px] text-white tracking-[-0.02em]">
            {stat}
          </strong>
        </div>
      </Link>
    </motion.div>
  );
};

// Raise card — $155M fundraise
const RaiseCard = () => {
  return (
    <motion.div
      className="mt-10 bg-[#040207] rounded-lg px-8 py-12 md:px-[52px] md:py-12 flex flex-wrap items-center gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUpVariants}
    >
      {/* Left: amount + text */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-5 w-full">
        <span className="font-slussenExpanded font-semibold text-[60px] md:text-[100px] leading-[1] tracking-[2px] text-white whitespace-nowrap flex-shrink-0 inline-block">
$155M
        </span>
        <img
          src="/images/app/homepage/raise-plus-new.svg"
          alt="+"
          className="w-[27px] h-[27px] flex-shrink-0 hidden md:block"
        />
        <p className="font-slussenExtended text-[22px] md:text-[37px] font-normal text-white leading-[1.1] tracking-[-0.3px] text-center md:text-left">
          Celestia raises over $155M to build
          <br className="hidden md:block" /> high-throughput blockspace
        </p>
      </div>

      {/* Investors */}
      <div className="w-full mt-2">
        <div className="h-px bg-white/15" />
        <div className="py-7 flex flex-col gap-5 xl:flex-row xl:justify-between xl:items-center">
          {/* Below xl: first row — 3 logos */}
          <div className="grid grid-cols-3 items-center justify-items-center gap-4 xl:hidden">
            {investors.slice(0, 3).map((investor, i) => (
              <img
                key={i}
                src={investor.src}
                alt={investor.alt}
                className="object-contain h-4 sm:h-6 w-auto max-w-full"
              />
            ))}
          </div>
          {/* Below xl: second row — 2 logos */}
          <div className="grid grid-cols-2 items-center justify-items-center gap-4 xl:hidden">
            {investors.slice(3).map((investor, i) => (
              <img
                key={i}
                src={investor.src}
                alt={investor.alt}
                className="object-contain h-4 sm:h-6 w-auto max-w-full"
              />
            ))}
          </div>
          {/* xl and up: single row */}
          {investors.map((investor, i) => (
            <img
              key={`xl-${i}`}
              src={investor.src}
              alt={investor.alt}
              className="hidden xl:block object-contain h-8 w-auto flex-shrink-0"
            />
          ))}
        </div>
        {/* "and more" divider */}
        <div className="flex items-center gap-4 font-slussenExtended text-sm text-[#a8aeb6]">
          <span className="flex-1 h-px bg-white/15" />
          <span>and more</span>
          <span className="flex-1 h-px bg-white/15" />
        </div>
      </div>
    </motion.div>
  );
};

const HighlightsSection = () => {
  return (
    <section
      data-header-theme="light"
      className="relative z-[2] bg-[#FDFCFF] py-16 md:py-20"
    >
      <Container size="2xl">
        {/* Animated title */}
        <AnimatedTitle />

        {/* Case study cards — flex row, gap 20px */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 sm:[&>*]:flex-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} {...highlight} />
          ))}
        </motion.div>

        {/* Raise card */}
        <RaiseCard />
      </Container>
    </section>
  );
};

export default HighlightsSection;
