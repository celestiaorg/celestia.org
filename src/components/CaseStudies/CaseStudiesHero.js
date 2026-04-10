"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import { featuredCaseStudy } from "@/data/case-studies/content";

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

const CaseStudiesHero = () => {
  return (
    <section
      data-header-theme="dark"
      className="relative bg-[#040207] h-auto pb-20 lg:h-screen lg:min-h-[700px] lg:pb-0 overflow-hidden"
    >
      {/* Background video orb + sphere overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Rotated video container */}
        <div
          className="absolute"
          style={{
            left: "-15%",
            top: "6%",
            width: "82%",
            aspectRatio: "1",
            overflow: "hidden",
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
          className="absolute block pointer-events-none"
          style={{
            left: "-15%",
            top: "6%",
            width: "82%",
            aspectRatio: "1",
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
          custom={0}
        >
          Blockspace enabling the most ambitious onchain networks
        </motion.h1>
        <motion.div
          className="mt-9"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.15}
        >
          <Button href="/build/" variant="pill-primary" size="pill-md">
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Right — featured case study (hidden on tablet and below) */}
      <div className="hidden lg:flex flex-col absolute top-[16%] right-[120px] w-[42%] max-w-[560px] z-[2]">
        <motion.a
          href={featuredCaseStudy.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-white/[0.12] overflow-hidden bg-white/[0.03] no-underline text-inherit transition-[border-color] duration-300 hover:border-white/[0.22]"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.2}
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
          custom={0.3}
        >
          <p className="font-slussenMono text-[13px] font-medium uppercase tracking-[1.5px] text-[#848B94]">
            <span>{featuredCaseStudy.tag}</span>
            &nbsp;&nbsp;
            {featuredCaseStudy.meta
              ?.split("·")[0]
              ?.replace(/\d+ min read/, "")
              .trim()}
          </p>
          <h2 className="font-slussenExtended font-medium text-[36px] leading-[44px] tracking-[-1.5px] text-[#FDFCFF]">
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
    </section>
  );
};

export default CaseStudiesHero;
