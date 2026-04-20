"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import ContactForm from "@/components/ContactForm/ContactForm";

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

const ContactHero = () => {
  return (
    <section
      data-header-theme="dark"
      className="relative min-h-screen bg-black-pure overflow-hidden flex flex-col"
    >
      {/* Background video — anchored bottom-left, scales with viewport */}
      <motion.video
        className="pointer-events-none absolute left-0 -top-40 sm:top-auto sm:bottom-0 h-[40%] md:h-[65%] lg:h-[75%] w-auto z-0"
        autoPlay
        muted
        loop
        playsInline
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        custom={0.3}
      >
        <source src="/videos/celestia-anim-contact.webm" type="video/webm" />
      </motion.video>

      {/* Content row */}
      <div className="relative z-[1] flex-1 mt-[16vh] md:mt-[18vh] pb-20 md:pb-[120px] px-5 md:px-[60px] xl:px-[86px]">
        <div className="flex flex-col md:flex-row items-start gap-20 md:gap-16 lg:gap-20">
          {/* Left: heading + Our Team CTA */}
          <motion.div
            className="flex flex-col items-start gap-6 sm:gap-8 flex-1 min-w-0"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            <h1 className="font-slussenExtended font-medium text-white text-[48px] leading-[54px] tracking-[-2.5px] md:text-[72px] md:leading-[76px] md:tracking-[-4px]">
              Get in
              <br />
              Touch
            </h1>
            <Button href="#team" variant="pill-primary" size="pill-md">
              Our Team
            </Button>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="w-full md:w-[380px] lg:w-[440px] md:shrink-0"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.25}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
