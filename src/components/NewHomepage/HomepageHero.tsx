"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";

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

const HomepageHero = () => {
  return (
    <section
      data-header-theme="dark"
      // Mobile (<768): compact auto-height hero — content first, fibre video
      // reflows IN-FLOW below the CTAs (prototype mobile layer). md+: a full
      // viewport-height hero (100vh, min 800px) — matches the prototype .hero
      // so the absolute-bottom fibre video pins to the bottom of the screen and
      // the proof section sits below the fold. The max-h clamps (80vw / 850 /
      // 900) keep the hero from over-growing on short-wide tablets and tall
      // large screens, as before.
      // max-md:pb-[75px]: the dark gap between the in-flow video and the proof
      // section's top border (prototype uses margin on .proof-points, but our
      // body bg is white so the gap must live inside the hero's dark box)
      className="relative flex flex-col max-md:pb-[75px] md:block md:h-screen md:min-h-[800px] md:max-h-[80vw] lg:max-h-[850px] xl:max-h-[900px] bg-[#040207] text-white overflow-hidden"
    >
      {/* Video background — mobile: in-flow full-bleed band below the CTAs,
          centered in the gap to the proof divider (74px top ↔ 75px proof
          margin). md+: absolute bottom, centered. */}
      <motion.div
        // Mobile: in-flow full-bleed band (w-screen). md+: absolute bottom,
        // centered, and FROZEN to the same column as page content — capped at
        // 1520px with the canonical page gutters (120 → 60) so the fibre never
        // stretches edge-to-edge on wide screens.
        className="order-2 relative mt-[74px] w-screen md:order-none md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:w-full md:max-w-[1520px] md:-translate-x-1/2 md:px-[60px] min-[1200px]:px-[120px] pointer-events-none"
        style={{ background: "#040207" }}
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        <div className="relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            // Mobile: flush to the viewport edges (100vw). md+: fills the
            // gutter-padded 1520px column above (so it tracks the content
            // freeze with real page gutters, not 90vw).
            className="block w-screen max-w-none h-auto md:w-full md:max-w-none"
          >
            <source src="/videos/hero-fibre.mp4" type="video/mp4" />
          </video>
          {/* Side edge blending via box-shadow — desktop only (mobile is full-bleed) */}
          <div
            className="hidden md:block absolute inset-0 z-[1] pointer-events-none"
            style={{
              boxShadow:
                "inset 80px 0 60px -20px #040207, inset -80px 0 60px -20px #040207",
            }}
          />
          {/* Top gradient fade — mobile 26% repaints the video's top edge to the
              exact hero black (no horizontal seam at any width) */}
          <div className="absolute top-0 left-0 right-0 h-[26%] md:h-[30%] z-[1] bg-gradient-to-b from-[#040207] to-transparent pointer-events-none" />
          {/* Bottom gradient fade — softens the video's lower edge into the section below */}
          <div className="absolute bottom-0 left-0 right-0 h-[26%] md:h-[25%] z-[1] bg-gradient-to-t from-[#040207] to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Content — mobile top anchor 116px (uniform hero anchor, clears the
          navbar). md+: no CTAs anymore, so the text block is vertically centered
          in the band above the bottom-pinned fibre video. The calc height is the
          section minus the video: video height = (min(100vw,1520px) − gutters)
          × 0.2422 (hero-fibre.mp4 is 2560×620). 90px top padding keeps the block
          clear of the overlay navbar. */}
      <Container size="2xl" className="order-1 md:order-none relative z-10 h-full">
        <div className="flex flex-col items-center gap-7 md:gap-10 pt-[116px] md:pt-[90px] md:justify-center md:h-[calc(100%-(min(100vw,1520px)-120px)*0.2422)] min-[1200px]:h-[calc(100%-(min(100vw,1520px)-240px)*0.2422)]">
          <div className="flex flex-col items-center gap-7 md:gap-10 text-center px-0 md:px-4">
            <motion.h1
              // Mobile type scale: long-sentence hero title — 26px ≤430, 30px to
              // 768, mobile tracking -0.025em (prototype computed -0.65px @ 26px)
              className="font-nuberNextWide font-medium text-[26px] min-[431px]:text-[30px] tracking-[-0.025em] leading-[1.18] max-md:text-balance md:text-[56px] md:leading-[1.1] md:tracking-[-0.04em] text-[#FDFCFF] max-w-[900px]"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              Escape Velocity for
              <br />
              the Onchain Economy
            </motion.h1>

            <motion.p
              // Mobile type scale: hero lead — 17px ≤430, 18px to 768
              className="font-nuberNext font-normal text-[17px] min-[431px]:text-[18px] leading-[1.4] max-md:text-pretty md:text-[18px] tracking-[-0.01em] text-[#E8EBEF] max-w-[720px]"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.25}
            >
              Celestia is the Layer 1 blockchain powering the world&apos;s
              fastest exchanges and agentic payments platforms. We build custom
              solutions at the bleeding edge of performance for internet-scale
              onchain applications.
            </motion.p>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default HomepageHero;
