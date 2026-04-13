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
    background: "/images/app/homepage/highlight-relay.webp",
    tag: "Cross-chain settlement",
    description: (
      <>
        Celestia&apos;s blockspace powers Relay&apos;s cross-chain payments
        settlement — with{" "}
        <strong className="font-bold tracking-[-0.02em]">
          &lt;1s fill times
        </strong>
        .
      </>
    ),
    href: "#",
  },
  {
    logo: "/images/app/homepage/logo-bullet.svg",
    logoAlt: "Bullet",
    background: "/images/app/homepage/highlight-bullet.webp",
    tag: "Exchanges",
    description: (
      <>
        Bullet is a decentralised perpetuals exchange, processing{" "}
        <strong className="font-bold tracking-[-0.02em]">
          20k orders/second
        </strong>{" "}
        on Celestia&apos;s blockspace.
      </>
    ),
    href: "#",
  },
];

const investors = [
  {
    src: "/images/app/homepage/raise-logo-1.webp",
    alt: "Binance Labs",
    width: 147,
    height: 32,
  },
  {
    src: "/images/app/homepage/raise-logo-2.webp",
    alt: "Maven 11",
    width: 159,
    height: 32,
  },
  {
    src: "/images/app/homepage/raise-logo-3.webp",
    alt: "Bain Capital Crypto",
    width: 232,
    height: 32,
  },
  {
    src: "/images/app/homepage/raise-logo-4.webp",
    alt: "Coinbase Ventures",
    width: 190,
    height: 32,
  },
  {
    src: "/images/app/homepage/raise-logo-5.webp",
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

// Case study card
const HighlightCard = ({
  logo,
  logoAlt,
  background,
  tag,
  description,
  href,
}) => {
  return (
    <motion.div variants={cardVariants}>
      <Link
        href={href}
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

        {/* Card content */}
        <div className="relative z-[3] flex flex-col justify-between p-5 md:p-6 w-full">
          {/* Logo top */}
          <div>
            <img
              src={logo}
              alt={logoAlt}
              className="h-8 w-auto object-contain brightness-0 invert block"
            />
          </div>

          {/* Text bottom */}
          <div>
            <span className="font-slussenMono text-[13px] font-semibold uppercase tracking-[1.5px] text-white mb-1.5 block">
              {tag}
            </span>
            <p className="font-slussen text-[15px] md:text-[18px] leading-[1.2] tracking-[-0.04em] text-white">
              {description}
            </p>
          </div>
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
        <span className="font-slussenExpanded font-semibold text-[60px] md:text-[100px] leading-none tracking-[2px] text-white whitespace-nowrap flex-shrink-0">
          $155M
        </span>
        <img
          src="/images/app/homepage/raise-plus-new.svg"
          alt="+"
          className="w-[27px] h-[27px] flex-shrink-0 hidden md:block"
        />
        <p className="font-slussenExtended text-[22px] md:text-[37px] font-normal text-white leading-[1.1] tracking-[-0.3px] text-center md:text-left">
          Celestia Raises $155M+ To Build
          <br className="hidden md:block" /> High-Throughput Blockspace
        </p>
      </div>

      {/* Investors */}
      <div className="w-full mt-2">
        <div className="h-px bg-white/15" />
        <div className="flex items-center justify-between py-7 overflow-hidden gap-6 md:gap-0">
          {investors.map((investor, i) => (
            <img
              key={i}
              src={investor.src}
              alt={investor.alt}
              style={{ width: investor.width, height: investor.height }}
              className="object-contain flex-shrink-0 hidden sm:block"
            />
          ))}
          {/* Mobile: show first 3 */}
          {investors.slice(0, 3).map((investor, i) => (
            <img
              key={`m-${i}`}
              src={investor.src}
              alt={investor.alt}
              className="object-contain h-6 w-auto flex-shrink-0 sm:hidden"
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

        {/* Case study cards */}
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
