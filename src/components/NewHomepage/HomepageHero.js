"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";

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
        className="order-2 relative mt-[74px] w-screen md:order-none md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:w-auto md:-translate-x-1/2 pointer-events-none"
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
            // Mobile: flush to the viewport edges (100vw). md+: the fibre
            // video scales with the viewport at 90vw (prototype .hero-video
            // video { max-width: 90vw }), uncapped so it keeps growing on
            // wide screens just like the prototype.
            className="block w-screen max-w-none h-auto md:w-auto md:max-w-[90vw]"
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
          navbar). md+ anchor 164px = prototype's 64px hero pad + 100px content pad. */}
      <Container size="2xl" className="order-1 md:order-none relative z-10 h-full">
        <div className="flex flex-col items-center gap-7 md:gap-10 pt-[116px] md:pt-[164px]">
          <div className="flex flex-col items-center gap-7 md:gap-10 text-center px-0 md:px-4">
            <motion.h1
              // Mobile type scale: long-sentence hero title — 26px ≤430, 30px to
              // 768, mobile tracking -0.025em (prototype computed -0.65px @ 26px)
              className="font-slussenExtended font-medium text-[26px] min-[431px]:text-[30px] tracking-[-0.025em] leading-[1.18] max-md:text-balance md:text-[56px] md:leading-[1.1] md:tracking-[-0.04em] text-[#FDFCFF] max-w-[900px]"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              A custom blockchain.
              <br />
              Built for your business.
              <br />
              Owned by you.
            </motion.h1>

            <motion.p
              // Mobile type scale: hero lead — 17px ≤430, 18px to 768
              className="font-slussen font-medium text-[17px] min-[431px]:text-[18px] leading-[1.4] max-md:text-pretty md:text-[24px] md:leading-[1.25] tracking-[-0.01em] text-white/45 max-w-[820px]"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.25}
            >
              Celestia designs and ships custom, high-throughput chains for the
              world&apos;s most ambitious enterprises.
            </motion.p>
          </div>

          {/* CTAs — mobile: stacked + centered, 18px gap; secondary collapses to
              a plain text link with a chevron arrowhead (prototype mobile) */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-[18px] md:gap-4"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            <Button href="/build-with-us/" variant="pill-primary" size="pill-md">
              Build with us
            </Button>
            <Button
              href="/applications/"
              variant="pill-outline"
              size="pill-md"
              className="!text-white border-white/30 hover:border-white/50 max-md:border-0 max-md:bg-transparent max-md:px-0 max-md:py-1 max-md:text-base max-md:hover:opacity-70"
            >
              See what&apos;s possible on Celestia
              {/* arrowhead chevron (no shaft) — mobile text-link affordance */}
              <span
                aria-hidden="true"
                className="md:hidden inline-block h-[7px] w-[7px] rotate-45 border-r-[1.8px] border-t-[1.8px] border-current"
              />
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HomepageHero;
