"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import { hero, tabs } from "@/data/applications/content";

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

// Scroll the panel content flush under the fixed navbar + filter bar
// (scroll-mt on the section handles the offset).
const scrollToContent = () => {
  const target = document.getElementById("applications-content");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ApplicationsHero = ({ activeTab, setActiveTab }) => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [barLight, setBarLight] = useState(false);

  // Filter bar theme — flips to light once the dark hero scrolls past
  // the navbar (64px) + filter bar (~48px), matching the prototype.
  useEffect(() => {
    const check = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setBarLight(heroBottom <= 112);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Background video — slightly faster, with fade in/out locked to the
  // video's real playback time so the fades always land on the loop seam
  // (a CSS keyframe fade drifts against the video clock).
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.playbackRate = 1.25;
    const FADE = 0.9; // seconds of fade at each end (intrinsic timeline)
    vid.style.opacity = "0";
    let rafId;
    const tick = () => {
      const d = vid.duration;
      if (d && !isNaN(d)) {
        const t = vid.currentTime;
        let o = 1;
        if (t < FADE) o = t / FADE;
        else if (t > d - FADE) o = (d - t) / FADE;
        vid.style.opacity = Math.max(0, Math.min(1, o)).toFixed(3);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* Category filter bar — fixed below the navbar, plain text tabs */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 border-b transition-colors duration-300 ${
          barLight
            ? "bg-[#FDFCFF] border-black/[0.08]"
            : "bg-[#050208] border-white/[0.08]"
        }`}
      >
        <div className="flex items-center justify-start md:justify-center gap-1 md:gap-2 max-w-[1400px] mx-auto px-4 md:px-10 py-1.5 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setTimeout(scrollToContent, 100);
              }}
              className={`flex-shrink-0 px-3 md:px-4 py-1.5 font-slussen text-[14px] font-normal tracking-normal transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                barLight
                  ? activeTab === tab.id
                    ? "text-[#0E1014]"
                    : "text-black/50 hover:text-[#0E1014]"
                  : activeTab === tab.id
                    ? "text-white"
                    : "text-white/50 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <section
        ref={heroRef}
        data-header-theme="dark"
        className="relative h-screen min-h-[700px] bg-[#040207] overflow-hidden flex flex-col"
      >
        {/* Background video — anchored to the right edge (prototype: right: -8%),
            natural aspect ratio, full height. Sits clear of the left-aligned copy. */}
        <video
          ref={videoRef}
          className="absolute right-[-8%] top-0 h-full w-auto max-w-none pointer-events-none z-[1]"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Safari decodes the HEVC .mov; Chrome/others skip quicktime and fall
              through to the VP9 .webm */}
          <source src="/videos/applications-anim_safari.mov" type="video/quicktime" />
          <source src="/videos/applications-anim.webm" type="video/webm" />
        </video>

        {/* Heading — center-left, stacked eyebrow / title / subtitle / CTA.
            Text column capped at the prototype's --hero-col-width (620px). */}
        <div className="relative z-[2] mt-[clamp(150px,24vh,260px)] px-5 md:px-[60px] xl:px-[86px]">
          <div className="flex flex-col items-start gap-5 max-w-[620px]">
          <motion.span
            className="font-slussen text-[24px] font-medium leading-[1.25] tracking-[-0.025em] text-white/45"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            className="font-slussenExtended font-medium text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[46px] md:tracking-[-0.04em] text-[#FDFCFF]"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            Every API call paid,
            <br />
            every order processed,
            <br />
            every market verifiable.
          </motion.h1>

          <motion.p
            className="font-slussen text-[24px] md:text-[32px] font-medium leading-[1.25] tracking-[-0.025em] text-white/60 whitespace-pre-line"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.375}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-3"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.6}
          >
            <Button
              onClick={scrollToContent}
              variant="pill-primary"
              size="pill-md"
              className="whitespace-nowrap"
            >
              {hero.cta.label}
            </Button>
          </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplicationsHero;
