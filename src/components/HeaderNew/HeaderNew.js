"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "@/macros/Link/Link";
import CelestiaLogoNewSVG, {
  CelestiaSymbolNewSVG,
} from "@/macros/SVGs/CelestiaLogoNewSVG";
import { useScrollPosition } from "@/utils/scrollLock";
import { useHeader } from "@/context/HeaderContext";
import DesktopNavNew, { NavDropdownPanel } from "./DesktopNavNew";
import MobileNavNew from "./MobileNavNew";
import MenuButtonNew from "./MenuButtonNew";
import MenuDataNew from "./data";
// import LuminaBlockNumber from "@/components/Lumina/BlockNumberDisplay";

const dropdowns = MenuDataNew.filter((item) => item.type === "dropdown");
const ctaItems = MenuDataNew.filter((item) => item.type === "link");

const EASE = [0.22, 1, 0.36, 1];

// Bar slides down from above and fades in, then its three zones stagger in.
const barVariants = {
  hidden: { y: -72, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const zoneVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Reduced-motion: fade only, no transform, no per-zone stagger.
const barVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

const zoneVariantsReduced = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

/**
 * HeaderNew - Full-width navigation bar (ported from the Celestia prototype)
 *
 * Layout (three zones):
 * - Logo hard-left
 * - Dropdown toggles absolutely centered (DesktopNavNew)
 * - "Get in Touch" CTA pill hard-right (+ mobile hamburger)
 *
 * Dropdowns are full-width strips that drop below the bar, with a dimming page
 * overlay. Hover-triggered with a 150ms grace delay so the cursor can travel
 * from a toggle into its panel. State is owned here so the centered toggles and
 * the full-width panels stay in sync.
 */
const HeaderNew = () => {
  const { setScrollIsLocked, menuIsOpen, setMenuIsOpen } = useScrollPosition();
  const { theme } = useHeader();
  const isLight = theme === "light";

  const shouldReduceMotion = useReducedMotion();
  const bar = shouldReduceMotion ? barVariantsReduced : barVariants;
  const zone = shouldReduceMotion ? zoneVariantsReduced : zoneVariants;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const closeTimeout = useRef(null);

  const openDropdown = useCallback((index) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveDropdown(index);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const closeNow = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveDropdown(null);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    setScrollIsLocked(menuIsOpen);
  }, [menuIsOpen, setScrollIsLocked]);

  // Close dropdown on scroll
  useEffect(() => {
    if (activeDropdown === null) return;
    const handleScroll = () => closeNow();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeDropdown, closeNow]);

  // Cleanup timeout on unmount
  useEffect(() => () => closeTimeout.current && clearTimeout(closeTimeout.current), []);

  const anyOpen = activeDropdown !== null;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <motion.nav
          className={`relative border-b transition-colors duration-300 ${
            isLight
              ? "bg-[#FDFCFF] border-black/[0.08]"
              : "bg-[#050208] border-white/[0.08]"
          }`}
          variants={bar}
          initial="hidden"
          animate="visible"
        >
          <div className="relative flex items-center justify-between max-w-[1400px] mx-auto px-5 md:px-10 h-16">
            {/* Logo */}
            <motion.div variants={zone}>
              <Link href="/" className="flex items-center flex-shrink-0">
                <CelestiaSymbolNewSVG
                  theme={theme}
                  className="w-8 h-auto block xs:hidden"
                />
                <CelestiaLogoNewSVG
                  theme={theme}
                  className="w-[120px] h-[30px] hidden xs:block"
                />
              </Link>
            </motion.div>

            {/* Centered dropdown toggles — fade/slide in with the bar
                (absolutely positioned, so it isn't a stagger zone) */}
            <DesktopNavNew
              items={dropdowns}
              activeIndex={activeDropdown}
              onOpen={openDropdown}
              onClose={scheduleClose}
              theme={theme}
            />

            {/* Right zone: CTA + mobile menu button (prototype `.nav-actions`, 14px gap) */}
            <motion.div variants={zone} className="flex items-center gap-3.5 flex-shrink-0">
              {ctaItems.map((cta) => (
                <Link
                  key={cta.name}
                  href={cta.url}
                  className={`inline-flex items-center justify-center px-[18px] lg:px-5 py-2 font-slussen text-[13px] font-medium rounded-full whitespace-nowrap no-underline transition-opacity duration-200 ease-out hover:opacity-[0.85] ${
                    isLight
                      ? "text-[#FDFCFF] bg-[#0E1014]"
                      : "text-[#0E1014] bg-white"
                  }`}
                >
                  {cta.name}
                </Link>
              ))}
              <div className="lg:hidden">
                <MenuButtonNew
                  isOpen={menuIsOpen}
                  onClick={() => setMenuIsOpen(!menuIsOpen)}
                  theme={theme}
                />
              </div>
            </motion.div>
          </div>

          {/* Full-width dropdown panels (below the bar) */}
          {dropdowns.map((item, index) => (
            <NavDropdownPanel
              key={item.name}
              item={item}
              isOpen={activeDropdown === index}
              onOpen={() => openDropdown(index)}
              onClose={scheduleClose}
              theme={theme}
            />
          ))}
        </motion.nav>
      </header>

      {/* Page overlay while a dropdown is open */}
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 transition-opacity duration-[250ms] ease-out"
        style={{
          opacity: anyOpen ? 1 : 0,
          pointerEvents: anyOpen ? "auto" : "none",
        }}
        onClick={closeNow}
        aria-hidden="true"
      />

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {menuIsOpen && (
          <MobileNavNew theme={theme} onClose={() => setMenuIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderNew;
