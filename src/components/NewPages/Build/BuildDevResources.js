"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const resourceCards = [
  {
    title: "Documentation",
    description: "Documentation for the Celestia network.",
    href: "https://docs.celestia.org/",
  },
  {
    title: "Pay for blobspace",
    description:
      "Overview of paying for blob transactions and Celestia's fee market.",
    href: "https://docs.celestia.org/learn/TIA/paying-for-blobspace/",
  },
  {
    title: "Blog tutorial",
    description: "Learn how to publish and retrieve transaction data from Celestia.",
    href: "https://docs.celestia.org/build/post-retrieve-blob/client/go/",
  },
  {
    title: "Blobstream",
    description: "Use Celestia as the DA layer for your Ethereum L2.",
    href: "https://docs.celestia.org/build/blobstream/integrate-contracts/",
  },
  {
    title: "Node API",
    description:
      "Use the celestia-node API to publish and retrieve transactions from Celestia.",
    href: "https://docs.celestia.org/build/rpc/node-api/",
  },
];

const ResourceCard = ({ title, description, href, index = 0 }) => {
  return (
    <motion.div
      className="flex flex-col justify-between p-8 w-full min-h-[208px] rounded-[32px] border border-[rgba(226,232,240,0.1)] bg-gradient-to-b from-transparent to-[rgba(81,81,81,0.1)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: index * 0.1,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
    >
      <div className="flex flex-col gap-[10px]">
        <h3 className="font-untitledSans font-medium text-[24px] leading-[32px] tracking-[-1px] text-white">
          {title}
        </h3>
        <p className="font-untitledSans text-[14px] leading-[20px] text-[#d8cce5]">
          {description}
        </p>
      </div>
      <div className="mt-6">
        <Button href={href} variant="outline" theme="dark" size="md">
          Read More
        </Button>
      </div>
    </motion.div>
  );
};

const BuildDevResources = () => {
  return (
    <section
      id="dev-resources"
      data-header-theme="dark"
      className="bg-[#17141A] pt-14 pb-[104px]"
    >
      <Container size="lg">
        {/* Section heading */}
        <motion.h2
          className="font-untitledSans font-medium text-[40px] md:text-[56px] lg:text-[64px] leading-[1] tracking-[-3px] lg:tracking-[-4px] text-white text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
        >
          Developer resources
        </motion.h2>

        {/* Cards grid */}
        <div className="flex flex-col gap-4">
          {/* First row - 3 cards on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resourceCards.slice(0, 3).map((card, index) => (
              <ResourceCard key={index} index={index} {...card} />
            ))}
          </div>

          {/* Second row - 2 cards that stretch on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceCards.slice(3, 5).map((card, index) => (
              <ResourceCard key={index} index={index + 3} {...card} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BuildDevResources;
