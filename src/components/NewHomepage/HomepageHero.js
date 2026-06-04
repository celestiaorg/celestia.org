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
      className="relative h-[680px] sm:h-screen sm:min-h-[700px] sm:max-h-[750px] md:min-h-[750px] md:max-h-[80vw] lg:max-h-[850px] xl:h-[55vw] xl:max-h-[900px] bg-[#050208] text-white overflow-hidden"
    >
      {/* Video background — absolute bottom, centered */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ background: "#050208" }}
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
            className="block w-auto max-w-[90vw] h-auto"
          >
            <source src="/videos/hero-fibre.mp4" type="video/mp4" />
          </video>
          {/* Side edge blending via box-shadow */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              boxShadow:
                "inset 80px 0 60px -20px #050208, inset -80px 0 60px -20px #050208",
            }}
          />
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-[30%] z-[1] bg-gradient-to-b from-[#050208] to-transparent pointer-events-none" />
          {/* Bottom gradient fade — softens the video's lower edge into the section below */}
          <div className="absolute bottom-0 left-0 right-0 h-[25%] z-[1] bg-gradient-to-t from-[#050208] to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Content */}
      <Container size="2xl" className="relative z-10 h-full">
        <div className="flex flex-col items-center gap-10 pt-[180px] md:pt-[180px]">
          <div className="flex flex-col items-center gap-10 text-center px-4">
            <motion.h1
              className="font-slussenExtended font-medium text-[32px] tracking-[-0.025em] leading-[1.1] md:text-[56px] md:tracking-[-0.04em] text-[#FDFCFF] max-w-[900px]"
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
              className="font-slussen font-medium text-[24px] leading-[1.25] tracking-[-0.01em] text-white/45 max-w-[820px]"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.25}
            >
              Celestia designs and ships custom, high-throughput chains for the
              world&apos;s most ambitious enterprises.
            </motion.p>
          </div>

          <motion.div
            className="flex items-center gap-4"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            <Button href="/applications/" variant="pill-primary" size="pill-md">
              Build with us
            </Button>
            <Button
              href="#explore-celestia"
              variant="pill-outline"
              size="pill-md"
              className="!text-white border-white/30 hover:border-white/50"
            >
              See what&apos;s possible on Celestia
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HomepageHero;
