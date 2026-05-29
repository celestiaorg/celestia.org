"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "@/macros/Link/Link";
import CelestiaLogoNewSVG, {
  CelestiaSymbolNewSVG,
} from "@/macros/SVGs/CelestiaLogoNewSVG";
import { useScrollPosition } from "@/utils/scrollLock";
import DesktopNavNew, { NavDropdownPanel } from "./DesktopNavNew";
import MobileNavNew from "./MobileNavNew";
import MenuButtonNew from "./MenuButtonNew";
import MenuDataNew from "./data";
// import LuminaBlockNumber from "@/components/Lumina/BlockNumberDisplay";

const dropdowns = MenuDataNew.filter((item) => item.type === "dropdown");
const ctaItems = MenuDataNew.filter((item) => item.type === "link");

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
  const theme = "dark";

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
        <nav className="relative bg-[#050208] border-b border-white/[0.08]">
          <div className="relative flex items-center justify-between max-w-[1400px] mx-auto px-5 md:px-10 h-16">
            {/* Logo */}
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

            {/* Centered dropdown toggles */}
            <DesktopNavNew
              items={dropdowns}
              activeIndex={activeDropdown}
              onOpen={openDropdown}
              onClose={scheduleClose}
            />

            {/* Right zone: CTA + mobile menu button */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {ctaItems.map((cta) => (
                <Link
                  key={cta.name}
                  href={cta.url}
                  className="hidden lg:inline-flex items-center justify-center px-5 py-2 font-slussen text-[13px] font-medium text-[#0E1014] bg-white rounded-full whitespace-nowrap no-underline transition-opacity duration-200 ease-out hover:opacity-[0.85]"
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
            </div>
          </div>

          {/* Full-width dropdown panels (below the bar) */}
          {dropdowns.map((item, index) => (
            <NavDropdownPanel
              key={item.name}
              item={item}
              isOpen={activeDropdown === index}
              onOpen={() => openDropdown(index)}
              onClose={scheduleClose}
            />
          ))}
        </nav>
      </header>

      {/* Page overlay while a dropdown is open */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-[250ms] ease-out"
        style={{
          opacity: anyOpen ? 1 : 0,
          pointerEvents: anyOpen ? "auto" : "none",
        }}
        onClick={closeNow}
        aria-hidden="true"
      />

      {/* Mobile navigation overlay */}
      <AnimatePresence>{menuIsOpen && <MobileNavNew />}</AnimatePresence>
    </>
  );
};

export default HeaderNew;
