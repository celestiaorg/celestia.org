"use client";

import { motion } from "framer-motion";
import { featuredCaseStudy, categories, catColors } from "@/data/case-studies/content";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

// Colored category chip — prototype .cs-cat (dot + label)
export const CategoryChip = ({ category }) => {
  const c = catColors[category];
  if (!c) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 font-slussen text-[14px] font-medium tracking-[-0.01em]"
      style={{ color: c.text }}
    >
      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: c.dot }} />
      {categories[category]?.label}
    </span>
  );
};

const CaseStudiesHero = ({ activeFilter, setActiveFilter }) => {
  return (
    <>
      {/* Sticky filter tabs — fixed below the navbar, always light (prototype
          .cs-filter-bar: same design language as the navbar dropdown bar,
          no category colour). */}
      <div className="fixed top-16 left-0 right-0 z-40 border-b border-black/[0.08] bg-[#FDFCFF]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-start gap-2 overflow-x-auto px-4 py-1.5 no-scrollbar min-[600px]:justify-center min-[600px]:px-10">
          {Object.entries(categories).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => {
                setActiveFilter(key);
                const target = document.getElementById("cs-content");
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`flex-shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent px-4 py-1.5 font-slussen text-[14px] font-normal tracking-normal transition-colors duration-200 ${
                activeFilter === key ? "text-[#0E1014]" : "text-black/50 hover:text-[#0E1014]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* HERO — light, split: left title + CTA, right featured card */}
      <section
        data-header-theme="light"
        className="bg-[#FDFCFF] pt-[clamp(150px,24vh,260px)] pb-12 min-[600px]:pb-[clamp(48px,8vh,100px)]"
      >
        <div className="mx-auto max-w-[1520px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]">
          {/* Labels row — "Case studies" left, "Featured case study" right */}
          <motion.div
            className="mb-5 flex items-baseline justify-between"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <span className="font-slussen text-[20px] font-medium leading-[1.25] tracking-[-0.025em] text-black/40 md:text-[24px]">
              Case studies
            </span>
            <span className="hidden font-slussen font-medium leading-[1.25] tracking-[-0.025em] text-black/40 min-[900px]:block min-[900px]:flex-[0_0_480px] md:text-[24px]">
              Featured case study
            </span>
          </motion.div>

          {/* Content — left: title + CTA, right: featured card */}
          <div className="flex flex-col items-start gap-10 min-[900px]:flex-row min-[900px]:justify-between min-[900px]:gap-[60px] min-[1200px]:gap-20">
            {/* Left */}
            <div className="flex flex-col items-start gap-8 min-[900px]:max-w-[620px]">
              <motion.h1
                className="font-slussenExtended text-[27px] font-medium leading-[1.15] tracking-[-0.04em] text-[#0E1014] min-[430px]:text-[30px] min-[768px]:text-[32px] min-[1024px]:leading-[1.1] min-[1024px]:text-[46px]"
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={0.3}
              >
                Blockspace enabling
                <br />
                the most ambitious
                <br />
                onchain networks.
              </motion.h1>
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={0.45}
              >
                {/* Dark pill — prototype .contact-btn-dark */}
                <a
                  href="/get-started/"
                  className="inline-flex items-center justify-center rounded-full border border-[#0E1014] bg-[#0E1014] px-6 py-2.5 font-slussen text-[14px] font-medium text-[#FDFCFF] no-underline transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]"
                >
                  Get Started
                </a>
              </motion.div>
            </div>

            {/* Right — featured card */}
            <motion.div
              className="flex w-full flex-col gap-3 min-[900px]:w-auto min-[900px]:flex-[0_0_480px]"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
            >
              {/* Mobile-only label (the desktop one lives in the labels row) */}
              <span className="-mt-2 font-slussen text-[20px] font-medium leading-[1.25] tracking-[-0.025em] text-black/40 min-[900px]:hidden">
                Featured case study
              </span>
              <a
                href={featuredCaseStudy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg no-underline"
              >
                <div className="aspect-[2000/1057] overflow-hidden">
                  <img
                    src={featuredCaseStudy.image}
                    alt={featuredCaseStudy.title}
                    className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
                  />
                </div>
              </a>
              <div className="flex flex-col gap-1.5">
                <p className="flex items-center gap-3 font-slussen text-[16px] leading-[1.5] text-black/35">
                  <CategoryChip category={featuredCaseStudy.category} />
                  <span>{featuredCaseStudy.date}</span>
                </p>
                <h2 className="font-slussenExtended text-[20px] font-medium leading-[1.25] tracking-[-0.025em] text-[#0E1014]">
                  {featuredCaseStudy.title}
                </h2>
                {/* Outline pill — prototype .contact-btn-outline (card-sized) */}
                <a
                  href={featuredCaseStudy.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center justify-center self-start rounded-full border border-black/[0.15] bg-transparent px-5 py-2 font-slussen text-[13px] font-medium text-[#0E1014] no-underline transition-colors duration-200 hover:border-black/50"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesHero;
