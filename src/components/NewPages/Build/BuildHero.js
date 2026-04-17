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
      {/* Background video — pinned to right edge, natural aspect ratio */}
      <motion.video
        className="absolute right-[-20%] md:right-0 top-0 h-[1100px] md:h-full w-auto max-w-none pointer-events-none z-[1]"
        autoPlay
        muted
        loop
        playsInline
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        custom={0.3}
      >
        <source src="/videos/celestia-anim-build.webm" type="video/webm" />
      </motion.video>

      {/* Content */}
      <div className="relative z-[2] mt-[20vh] px-5 md:px-[60px] xl:px-[86px] flex flex-col items-start">
        <motion.h1
          className="font-slussenExtended font-medium text-[48px] leading-[54px] tracking-[-2px] md:text-[72px] md:leading-[80px] md:tracking-[-4px] text-[#FDFCFF] max-w-[700px] mb-7"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          Get started
        </motion.h1>

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
    </section>
  );
};

export default BuildHero;
