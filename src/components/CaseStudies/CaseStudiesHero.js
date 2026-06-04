"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import { featuredCaseStudy, categories } from "@/data/case-studies/content";

// Tab accent colors for active state (dark hero bg)
const tabAccentColors = {
	all: null,
	payments: "#4A7EA8",
	clobs: "#A89480",
	novel: "#A88DE6",
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const CaseStudiesHero = ({ activeFilter, setActiveFilter }) => {
  return (
    <section
      data-header-theme="dark"
      className="relative bg-[#040207] h-auto lg:h-screen lg:min-h-[700px] overflow-hidden"
    >
      {/* Background video orb + sphere overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Rotated video container */}
        <div
          className="absolute w-[150%] md:w-[82%] -left-[40%] md:-left-[15%] top-[6%] aspect-square overflow-hidden"
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "center center",
            zIndex: 1,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="block w-full h-full object-cover opacity-70"
            style={{ playbackRate: 3 }}
            ref={(el) => {
              if (el) el.playbackRate = 3;
            }}
          >
            <source src="/videos/cs-hero-orb.webm" type="video/webm" />
          </video>
        </div>
        {/* Right edge fade over video — video spans from -15% to 67% of viewport */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none hidden lg:block"
          style={{
            left: "50%",
            width: "10%",
            background: "linear-gradient(to right, transparent, black)",
            zIndex: 3,
          }}
        />
        {/* Sphere overlay — same position/rotation */}
        <img
          src="/images/app/case-studies/cs-hero-sphere.png"
          alt=""
          className="absolute block pointer-events-none w-[150%] md:w-[82%] -left-[40%] md:-left-[15%] top-[6%] aspect-square"
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "center center",
            zIndex: 2,
          }}
        />
      </div>

      {/* Left — title + CTA */}
      <div className="relative z-[2] flex flex-col items-start pt-[140px] px-5 sm:px-[60px] lg:px-0 lg:absolute lg:top-[32%] lg:left-[86px] lg:-translate-y-1/2 lg:max-w-[520px] lg:pt-0">
        <motion.h1
          className="font-slussenExtended font-medium text-[32px] leading-[40px] tracking-[-1.5px] md:text-[42px] md:leading-[52px] md:tracking-[-2px] text-[#FDFCFF]"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          Blockspace enabling the most ambitious onchain networks
        </motion.h1>
        <motion.div
          className="mt-9"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.45}
        >
          <Button href="/get-started/" variant="pill-primary" size="pill-md">
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Featured case study — stacked below on mobile, absolute on lg+ */}
      <div className="relative z-[2] px-5 sm:px-[60px] mt-8 lg:mt-0 lg:px-0 lg:absolute lg:top-[16%] lg:right-[120px] lg:w-[42%] lg:max-w-[560px] lg:flex lg:flex-col">
        <motion.a
          href={featuredCaseStudy.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-white/[0.12] overflow-hidden bg-white/[0.03] no-underline text-inherit transition-[border-color] duration-300 hover:border-white/[0.22]"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          <div className="w-full aspect-[16/9] overflow-hidden">
            <img
              src={featuredCaseStudy.image}
              alt={featuredCaseStudy.title}
              className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.02]"
            />
          </div>
        </motion.a>

        {/* Below-card meta */}
        <motion.div
          className="flex flex-col gap-3 pt-7"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.75}
        >
          <p className="font-slussenMono text-[13px] font-medium uppercase tracking-[1.5px] text-[#848B94]">
            <span>{featuredCaseStudy.tag}</span>
            &nbsp;&nbsp;
            {featuredCaseStudy.meta
              ?.split("·")[0]
              ?.replace(/\d+ min read/, "")
              .trim()}
          </p>
          <h2 className="font-slussenExtended font-medium text-[24px] leading-[32px] tracking-[-1px] md:text-[36px] md:leading-[44px] md:tracking-[-1.5px] text-[#FDFCFF]">
            Featured Case Study
          </h2>
          <div className="self-start">
            <Button
              href={featuredCaseStudy.href}
              variant="pill-outline"
              size="pill-md"
              target="_blank"
            >
              Read More
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar — filter tabs */}
      <div className="relative z-[4] mt-8 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:pr-[60px]">
        <div className="flex items-stretch overflow-x-auto no-scrollbar border-t border-white/[0.08] lg:border-t-0 px-5 sm:px-[60px] lg:px-0">
          {Object.entries(categories).map(([key, { label }], i) => {
            const isActive = activeFilter === key;
            const accentColor = tabAccentColors[key];
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveFilter(key);
                  const target = document.getElementById("cs-content");
                  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`
                  relative flex items-center px-3 sm:px-5 md:px-12 py-4 md:py-6 flex-shrink-0 whitespace-nowrap
                  font-slussenMono text-[10px] sm:text-[11px] md:text-[13px] font-medium uppercase tracking-[1px] md:tracking-[1.5px]
                  transition-colors duration-300 cursor-pointer bg-transparent border-none
                  ${isActive ? "text-white/90" : "text-white/35 hover:text-white/70"}
                `}
                style={isActive && accentColor ? { color: accentColor } : undefined}
              >
                {i > 0 && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6 bg-white/[0.08]" />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesHero;
