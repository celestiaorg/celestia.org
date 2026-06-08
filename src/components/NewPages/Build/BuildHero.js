"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

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

const BuildHero = () => {
  return (
    <section
      data-header-theme="dark"
      className="relative min-h-[min(100svh,1100px)] md:min-h-[min(85svh,900px)] min-[1200px]:min-h-[min(100svh,900px)] bg-[#040207] overflow-hidden flex flex-col"
    >
      {/* Background video.
          md+ (prototype .build-hero-video): pinned to the right edge
          (right:-8%), natural aspect ratio, full height, z-1 — sits clear of
          the left-aligned copy.
          mobile ≤768 (prototype Round-4 SPEC-1): becomes a FULL-BLEED cover of
          the whole hero (inset:0, object-cover, anchored center-bottom so the
          swirl reaches the bottom edge on every screen), z-0 — reads BEHIND the
          centered text. */}
      <motion.video
        className="absolute pointer-events-none max-md:inset-0 max-md:h-full max-md:w-full max-md:max-w-none max-md:object-cover max-md:object-bottom max-md:z-0 md:right-[-8%] md:top-0 md:h-full md:w-auto md:max-w-none md:z-[1]"
        autoPlay
        muted
        loop
        playsInline
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        custom={0.3}
      >
        {/* Safari decodes the HEVC .mov; Chrome/others skip quicktime and fall
            through to the VP9 .webm */}
        <source src="/videos/celestia-anim-build_safari.mov" type="video/quicktime" />
        <source src="/videos/celestia-anim-build.webm" type="video/webm" />
      </motion.video>

      {/* Content row — mobile: top-anchored at 116px (prototype --m-hero-top,
          clears the navbar) and centered. md+: aligns to the 1280px frozen
          content edge, left-aligned, vertically offset. */}
      <div className="relative z-[2] flex-1 max-md:pt-[116px] md:mt-[min(20svh,200px)] pb-16 md:pb-20 lg:pb-[100px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px] flex items-start">
      <div className="mx-auto w-full max-w-[1280px]">
      <div className="relative flex flex-col items-start max-w-[700px] max-md:items-center max-md:text-center max-md:mx-auto max-md:max-w-full">
        {/* Readability scrim — mobile only (prototype .build-hero-content::before):
            a soft radial ellipse painted behind the text so the title/copy stay
            legible over the full-bleed swirl. Sits above the z-0 video, below
            the text (-z-1 within this z-2 stacking context). */}
        <div className="md:hidden absolute -top-[150px] -left-[30px] -right-[30px] -bottom-[26px] -z-[1] pointer-events-none [background:radial-gradient(ellipse_84%_74%_at_50%_40%,rgba(4,2,7,0.92)_0%,rgba(4,2,7,0.74)_42%,rgba(4,2,7,0.36)_66%,rgba(4,2,7,0)_82%)]" />

        <motion.h1
          className="font-slussenExtended font-medium text-[31px] min-[431px]:text-[36px] leading-[1.12] tracking-[-0.04em] md:text-[72px] md:leading-[80px] md:tracking-[-4px] text-[#FDFCFF] max-w-[700px] mb-5"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          Get
          <br className="max-md:hidden" />
          started
        </motion.h1>

        <motion.p
          className="font-slussen font-normal text-[17px] min-[431px]:text-[18px] leading-[1.4] md:leading-[1.5] tracking-[-0.01em] text-white/[0.72] max-w-[480px] mb-8"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.18}
        >
          Start building on Celestia from a framework, a rollup-as-a-service
          provider, or build fully custom with our team.
        </motion.p>

        <motion.div
          className="flex gap-3 md:items-center max-md:flex-col max-md:items-stretch max-md:w-full max-md:max-w-[360px] max-md:mx-auto"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.25}
        >
          <Button
            href="#dev-resources"
            variant="pill-primary"
            size="pill-md"
            className="whitespace-nowrap max-md:w-full max-md:justify-center"
          >
            Build Custom
          </Button>
          <Button
            href="#frameworks"
            variant="pill-outline"
            size="pill-md"
            className="whitespace-nowrap max-md:w-full max-md:justify-center"
          >
            Build on a Framework
          </Button>
        </motion.div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default BuildHero;
