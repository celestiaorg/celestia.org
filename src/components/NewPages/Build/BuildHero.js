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
      className="relative min-h-screen bg-[#040207] overflow-hidden flex flex-col"
    >
      {/* Background video — anchored to the right edge (prototype: right: -8%),
          natural aspect ratio, full height. Sits clear of the left-aligned copy. */}
      <motion.video
        className="absolute right-[-8%] top-0 h-full w-auto max-w-none pointer-events-none z-[1]"
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

      {/* Content — freeze: aligns to the 1280px frozen content edge on wide screens */}
      <div className="relative z-[2] mt-[20vh] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col items-start">
        <motion.h1
          className="font-slussenExtended font-medium text-[48px] leading-[54px] tracking-[-2px] md:text-[72px] md:leading-[80px] md:tracking-[-4px] text-[#FDFCFF] max-w-[700px] mb-5"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          Get
          <br />
          started
        </motion.h1>

        <motion.p
          className="font-slussen text-[18px] font-normal leading-[1.5] tracking-[-0.01em] text-white/[0.72] max-w-[480px] mb-8"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.18}
        >
          Start building on Celestia from a framework, a rollup-as-a-service
          provider, or build fully custom with our team.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 items-start md:items-center"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.25}
        >
          <Button
            href="#dev-resources"
            variant="pill-primary"
            size="pill-md"
            className="whitespace-nowrap"
          >
            Build Custom
          </Button>
          <Button
            href="#frameworks"
            variant="pill-outline"
            size="pill-md"
            className="whitespace-nowrap"
          >
            Build on a Framework
          </Button>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default BuildHero;
