"use client";
import { motion } from "framer-motion";
import Link from "@/macros/Link/Link";
import Container from "@/components/Container/Container";
import {
  footerLinksNew,
  socialLinksNew,
  legalLinksNew,
  footerHeadlineNew,
} from "./data";
import { useFooter } from "@/context/FooterContext";
import "./FooterNew.scss";

// Tab-specific footer themes (use-cases page)
const tabThemes = {
  agentic: {
    bg: "#0C1820",
    isDark: true,
    headlineColor: "#FDFCFF",
    linkColor: "rgba(255, 255, 255, 0.45)",
    linkHoverColor: "#fff",
    bottomColor: "rgba(255, 255, 255, 0.35)",
    dotColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    waveSrc: "/images/components/footer/footer-white-3.png",
  },
  exchanges: {
    bg: "#F2EDE6",
    isDark: false,
    headlineColor: "#1a1a2e",
    linkColor: "rgba(0, 0, 0, 0.45)",
    linkHoverColor: "#1a1a2e",
    bottomColor: "rgba(0, 0, 0, 0.35)",
    dotColor: "rgba(0, 0, 0, 0.25)",
    borderColor: "rgba(0, 0, 0, 0.08)",
    waveSrc: "/images/components/footer/footer-wave-light.png",
  },
  novel: {
    bg: "#F5F0FF",
    isDark: false,
    headlineColor: "#1a1a2e",
    linkColor: "rgba(0, 0, 0, 0.45)",
    linkHoverColor: "#1a1a2e",
    bottomColor: "rgba(0, 0, 0, 0.35)",
    dotColor: "rgba(0, 0, 0, 0.25)",
    borderColor: "rgba(0, 0, 0, 0.08)",
    waveSrc: "/images/components/footer/footer-wave-light.png",
  },
};

const socialIconSrc = {
  x: "/images/components/footer/social-x.svg",
  discord: "/images/components/footer/social-discord.svg",
  telegram: "/images/components/footer/social-telegram.svg",
  reddit: "/images/components/footer/social-reddit.svg",
  github: "/images/components/footer/social-github.svg",
  linkedin: "/images/components/footer/social-linkedin.svg",
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const FooterNew = () => {
  const currentYear = new Date().getFullYear();
  const { variant, footerTheme } = useFooter();

  // Determine the active theme
  const activeTabTheme =
    footerTheme && tabThemes[footerTheme] ? tabThemes[footerTheme] : null;
  const isDark = activeTabTheme ? activeTabTheme.isDark : variant === "dark";

  // Resolve all colors
  const bgColor = activeTabTheme?.bg || (isDark ? "#040207" : "#FDFCFF");
  const headlineColor =
    activeTabTheme?.headlineColor || (isDark ? "#FDFCFF" : "#040207");
  const linkColor =
    activeTabTheme?.linkColor || (isDark ? "#B0B7C0" : "rgba(0,0,0,0.5)");
  const linkHoverColor =
    activeTabTheme?.linkHoverColor || (isDark ? "#fff" : "#040207");
  const bottomColor =
    activeTabTheme?.bottomColor || (isDark ? "#B0B7C0" : "rgba(0,0,0,0.4)");
  const dotColor =
    activeTabTheme?.dotColor || (isDark ? "#B0B7C0" : "rgba(0,0,0,0.3)");
  const borderColor =
    activeTabTheme?.borderColor ||
    (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)");
  const waveSrc =
    activeTabTheme?.waveSrc ||
    (isDark
      ? "/images/components/footer/footer-white-3.png"
      : "/images/components/footer/footer-wave-light.png");

  return (
    <footer
      className="relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
      data-header-theme={isDark ? "dark" : "light"}
    >
      <div className="relative z-[2] mb-0 md:mb-[-120px]">
        <Container size="2xl" padding={true}>
          <motion.div
            className="pt-14"
            style={{ borderTop: `1px solid ${borderColor}` }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Main content area */}
            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
              <motion.div
                className="flex-1 max-w-[560px]"
                variants={fadeUpVariants}
              >
                <h2
                  className="font-slussenExtended font-medium text-[24px] md:text-[32px] leading-[1.25] tracking-[-0.025em]"
                  style={{ color: headlineColor }}
                >
                  {footerHeadlineNew}
                </h2>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-8 lg:gap-[50px] lg:flex-1 lg:justify-between lg:flex-nowrap"
                variants={fadeUpVariants}
              >
                {footerLinksNew.map((column, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex flex-col gap-2 lg:gap-[10px]"
                  >
                    {column.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.url}
                        className="font-slussen text-[14px] leading-[1.5] transition-colors no-underline"
                        style={{ color: linkColor }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = linkHoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = linkColor;
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Social Icons */}
            <motion.div
              className="flex items-center justify-center gap-6 mt-16"
              variants={fadeUpVariants}
            >
              {socialLinksNew.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  className={`transition-opacity ${isDark ? "opacity-40 hover:opacity-90" : "opacity-40 hover:opacity-80"}`}
                  aria-label={social.name}
                >
                  <img
                    src={socialIconSrc[social.icon]}
                    alt={social.name}
                    className="w-[22px] h-[22px]"
                    style={{ filter: !isDark ? "invert(1)" : undefined }}
                  />
                </Link>
              ))}
            </motion.div>

            {/* Bottom */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 pb-6 font-slussen text-[14px]"
              style={{ color: bottomColor }}
              variants={fadeUpVariants}
            >
              <div className="flex items-center gap-4">
                {legalLinksNew.map((link, index) => (
                  <span key={index} className="flex items-center gap-4">
                    <Link
                      href={link.url}
                      className="transition-colors no-underline"
                      style={{ color: bottomColor }}
                    >
                      {link.name}
                    </Link>
                    {index < legalLinksNew.length - 1 && (
                      <span
                        className="w-[2px] h-[2px] rounded-full"
                        style={{ backgroundColor: dotColor }}
                      />
                    )}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-4">
                <span
                  className="hidden sm:block w-[2px] h-[2px] rounded-full"
                  style={{ backgroundColor: dotColor }}
                />
                © {currentYear} Celestia Labs
              </span>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* Wave image */}
      <div className="relative w-full pointer-events-none">
        <img
          src={waveSrc}
          alt=""
          className="w-full block"
          style={{ mixBlendMode: isDark ? "lighten" : "normal" }}
        />
      </div>
    </footer>
  );
};

export default FooterNew;
