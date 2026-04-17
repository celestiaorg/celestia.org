"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";
import { hero, tabs } from "@/data/use-cases/content";

// Animation variants
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

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 1,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

// Tab icons matching prototype exactly
const TabIcon = ({ id }) => {
  if (id === "agentic") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2" />
        <path d="M15 20v2" />
        <path d="M2 15h2" />
        <path d="M2 9h2" />
        <path d="M20 15h2" />
        <path d="M20 9h2" />
        <path d="M9 2v2" />
        <path d="M9 20v2" />
      </svg>
    );
  }
  if (id === "exchanges") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 3l4 4-4 4" />
        <path d="M20 7H4" />
        <path d="M8 21l-4-4 4-4" />
        <path d="M4 17h16" />
      </svg>
    );
  }
  if (id === "novel") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return null;
};

// Sticky tab color map
const stickyIconColors = {
  agentic: "#4A7EA8",
  exchanges: "#A89480",
  novel: "#A88DE6",
};

const UseCasesHero = ({ activeTab, setActiveTab }) => {
  const bottomBarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const check = () => {
      if (bottomBarRef.current) {
        const rect = bottomBarRef.current.getBoundingClientRect();
        setIsSticky(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <>
      {/* Sticky tabs bar — white, fixed at top */}
      {isSticky && (
        <div className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-white border-b border-black/[0.06] justify-end">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setTimeout(() => {
                  const target = document.getElementById("use-cases-content");
                  if (target)
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
              }}
              className={`
							relative flex items-center gap-3.5 px-8 md:px-12 py-6 md:py-8 flex-shrink-0
							font-slussenMono text-[11px] md:text-[13px] font-medium uppercase tracking-[1.5px]
							transition-colors duration-300 cursor-pointer whitespace-nowrap
							${activeTab === tab.id ? "text-black/85" : "text-black/30 hover:text-black/60"}
						`}
            >
              {i > 0 && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6 bg-black/[0.08]" />
              )}
              <span
                className={`transition-all duration-300 ${activeTab === tab.id ? "opacity-100" : "opacity-35"}`}
                style={{
                  color:
                    activeTab === tab.id ? stickyIconColors[tab.id] : undefined,
                }}
              >
                <TabIcon id={tab.id} />
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
      <section
        data-header-theme="dark"
        className="relative h-screen min-h-[700px] bg-[#040207] text-white overflow-hidden flex flex-col"
      >
        {/* Orb video — right side, circular, nearly full height */}
        <motion.div
          className="absolute right-[-280px] sm:right-[-120px] md:right-[40px] lg:right-[60px] top-[16px] bottom-[80px] h-[65vh] md:h-auto aspect-square rounded-full overflow-hidden pointer-events-none z-[3]"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.15)",
            background: "#000000",
          }}
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ animation: "orbSpin 80s linear infinite" }}
            ref={(el) => {
              if (el) {
                el.playbackRate = 3;
                const checkEnd = () => {
                  if (el.duration && el.currentTime >= el.duration - 3) {
                    el.currentTime = 0;
                    el.play();
                  }
                  requestAnimationFrame(checkEnd);
                };
                el.addEventListener(
                  "loadedmetadata",
                  () => requestAnimationFrame(checkEnd),
                  { once: true },
                );
              }
            }}
          >
            <source src="/videos/hero-orb.webm" type="video/webm" />
          </video>
        </motion.div>

        {/* Heading — positioned upper-left */}
        <Container size="2xl" className="relative z-[4]">
          <div className="pt-[120px] md:pt-[14vh] max-w-[540px]">
            <motion.h1
              className="font-slussenExtended font-medium text-[32px] leading-[40px] tracking-[-1.5px] sm:text-[38px] sm:leading-[48px] sm:tracking-[-2px] md:text-[42px] md:leading-[52px] text-[#FDFCFF]"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              Every API call paid,
              <br />
              every order processed,
              <br />
              every market verifiable.
            </motion.h1>

            <motion.div
              className="mt-7"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.25}
            >
              <button
                onClick={() => {
                  const target = document.getElementById("use-cases-content");
                  if (target)
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className="font-slussen font-medium text-sm inline-flex items-center gap-2 bg-white text-[#040207] rounded-full px-7 py-3 hover:opacity-75 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                {hero.cta.label}
                <ArrowRightSVG className="opacity-60" />
              </button>
            </motion.div>
          </div>
        </Container>

        {/* Bottom bar — text left, tabs right */}
        <div className="mt-auto relative z-[4]" ref={bottomBarRef}>
          <Container size="2xl">
            <motion.div
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 pb-0"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
            >
              {/* Text lines */}
              <div className="flex flex-col gap-3 py-6 max-w-[420px]">
                <p className="font-slussenMono text-[22px] sm:text-[26px] md:text-[30px] font-medium leading-[32px] sm:leading-[36px] md:leading-[40px] tracking-[-1px] md:tracking-[-1.5px] text-white/60 whitespace-pre-line">
                  {hero.bottomText.primary}
                </p>
                {hero.bottomText.secondary && (
                  <p className="font-slussen font-light text-[16px] sm:text-[18px] leading-[1.55] text-[#B0B7C1]">
                    {hero.bottomText.secondary}
                  </p>
                )}
              </div>

              {/* Tab buttons — flat text, dividers between */}
              <div className="flex items-stretch flex-shrink-0 overflow-x-auto no-scrollbar pb-4 md:pb-0 lg:-mr-12">
                {tabs.map((tab, i) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setTimeout(() => {
                        const target =
                          document.getElementById("use-cases-content");
                        if (target)
                          target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }, 100);
                    }}
                    className={`
										relative flex items-center gap-2 md:gap-3.5 px-3 sm:px-5 md:px-12 py-4 md:py-6 flex-shrink-0
										font-slussenMono text-[10px] sm:text-[11px] md:text-[13px] font-medium uppercase tracking-[1px] md:tracking-[1.5px]
										transition-colors duration-300 cursor-pointer whitespace-nowrap
										${activeTab === tab.id ? "text-white/90" : "text-white/35 hover:text-white/70"}
									`}
                  >
                    {/* Divider before (except first) */}
                    {i > 0 && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6 bg-white/[0.08]" />
                    )}
                    <span
                      className={`transition-all duration-300 ${activeTab === tab.id ? "opacity-100" : "opacity-40"}`}
                      style={{
                        color: activeTab === tab.id ? tab.color : undefined,
                      }}
                    >
                      <TabIcon id={tab.id} />
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </Container>
        </div>

        {/* CSS keyframe for orb spin */}
        <style jsx global>{`
          @keyframes orbSpin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default UseCasesHero;
