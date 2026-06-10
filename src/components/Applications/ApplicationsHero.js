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
    // Mobile: the video is a full-bleed background and stays at full opacity
    // (prototype forces opacity:1); the seam fade is a desktop-only treatment.
    const mqMobile = window.matchMedia("(max-width: 767px)");
    vid.style.opacity = "0";
    let rafId;
    const tick = () => {
      const d = vid.duration;
      if (mqMobile.matches) {
        vid.style.opacity = "1";
      } else if (d && !isNaN(d)) {
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
            : "bg-[#040207] border-white/[0.08]"
        }`}
      >
        <div className="flex items-center justify-center gap-1 md:gap-2 max-w-[1400px] mx-auto px-4 md:px-10 py-1.5 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setTimeout(scrollToContent, 100);
              }}
              className={`flex-shrink-0 px-2 min-[431px]:px-3 md:px-4 py-1.5 font-slussen text-[13px] min-[431px]:text-[14px] font-normal tracking-normal transition-colors duration-200 cursor-pointer whitespace-nowrap ${
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
        className="relative h-[100svh] min-h-[640px] max-h-[1100px] md:h-[100svh] md:max-h-[1100px] min-[1200px]:h-[100svh] min-[1200px]:max-h-[900px] bg-[#040207] overflow-hidden flex flex-col"
      >
        {/* Background video. Mobile (prototype): full-bleed cover behind the
            centered copy, anchored to the hero bottom. Desktop (≥768): natural
            aspect, pinned to the right edge (right: -8%) clear of the left copy. */}
        <video
          ref={videoRef}
          className="absolute z-[1] pointer-events-none inset-0 w-full h-full object-cover object-bottom md:inset-auto md:right-[-8%] md:top-0 md:h-full md:w-auto md:max-w-none"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Single H.264 mp4 (bt709-tagged export from the prototype handoff) —
              plays in Safari + Chrome alike with consistent colour, replacing the
              old .webm/.mov pair whose untagged exports over-saturated in Safari. */}
          <source src="/videos/applications-anim.mp4" type="video/mp4" />
        </video>

        {/* Mobile readability scrim — a single LINEAR top→bottom gradient over the
            full-bleed video (prototype pattern, e.g. .explore-media::after): solid
            #040207 at the top (flush + seamless with the header), fading through
            translucent behind the copy to fully transparent so the swirl reads in
            the lower hero. Replaces the old radial scrim, whose soft edge showed as
            a light/dark seam on iOS Safari (brighter HEVC). Desktop video is
            right-pinned, so md:hidden. */}
        <div
          aria-hidden="true"
          className="md:hidden absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #040207 0%, #040207 10%, rgba(4,2,7,0.85) 24%, rgba(4,2,7,0.45) 44%, rgba(4,2,7,0) 64%)",
          }}
        />

        {/* Heading — center-left, stacked eyebrow / title / subtitle / CTA.
            Text column capped at the prototype's --hero-col-width (620px).
            Freeze: aligns to the 1280px frozen content edge on wide screens. */}
        <div className="relative z-[2] pt-[132px] md:pt-[clamp(150px,24svh,260px)] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]">
          <div className="mx-auto w-full max-w-[1280px]">
          <div className="relative flex flex-col items-center text-center gap-5 max-w-full mx-auto md:items-start md:text-left md:max-w-[620px] md:mx-0">
          <motion.span
            className="font-slussen text-[17px] min-[431px]:text-[18px] md:text-[24px] font-medium leading-[1.25] tracking-[-0.025em] text-white/45"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            className="font-slussenExtended font-medium text-[26px] min-[431px]:text-[30px] leading-[1.1] tracking-[-0.025em] md:text-[46px] md:tracking-[-0.04em] text-[#FDFCFF]"
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
            className="font-slussen text-[17px] min-[431px]:text-[18px] md:text-[32px] font-medium leading-[1.25] tracking-[-0.025em] text-white/60 whitespace-normal md:whitespace-pre-line"
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
        </div>
      </section>
    </>
  );
};

export default ApplicationsHero;
