"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import CelestiaLogoNewSVG, {
  CelestiaSymbolNewSVG,
} from "@/macros/SVGs/CelestiaLogoNewSVG";
import { useScrollPosition } from "@/utils/scrollLock";
import DesktopNavNew from "./DesktopNavNew";
import MobileNavNew from "./MobileNavNew";
import MenuButtonNew from "./MenuButtonNew";
// import LuminaBlockNumber from "@/components/Lumina/BlockNumberDisplay";

/**
 * HeaderNew - Floating pill-shaped navigation bar
 *
 * Features:
 * - Compact pill nav with glassmorphism (backdrop blur + border)
 * - Desktop navigation with dropdowns
 * - Full mobile menu with animations
 * - Smooth entrance animation
 */
const HeaderNew = () => {
  const { setScrollIsLocked, menuIsOpen, setMenuIsOpen } = useScrollPosition();
  const effectiveTheme = "dark";

  // Lock scroll when mobile menu is open
  useEffect(() => {
    setScrollIsLocked(menuIsOpen);
  }, [menuIsOpen, setScrollIsLocked]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <Container
          size="2xl"
          className="py-4 md:py-5 xl:!px-10 flex items-center justify-between"
        >
          <motion.nav
            className="inline-flex items-center gap-6 lg:gap-9 px-5 lg:px-6 py-2.5 lg:py-2.5 rounded-full pointer-events-auto"
            style={{
              background: "rgba(10, 8, 18, 0.88)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {/* Logo */}
            <Link href="/" className="block flex-shrink-0">
              <CelestiaSymbolNewSVG
                theme="dark"
                className="w-8 h-auto block xs:hidden"
              />
              <CelestiaLogoNewSVG
                theme="dark"
                className="w-[110px] h-[28px] hidden xs:block"
              />
            </Link>

            {/* Desktop nav links */}
            <DesktopNavNew theme={effectiveTheme} />

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <MenuButtonNew
                isOpen={menuIsOpen}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                theme={effectiveTheme}
              />
            </div>
          </motion.nav>

          {/* Lumina light node badge — commented out, keeping code for later */}
          {/* <motion.div
						className='pointer-events-auto'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
					>
						<LuminaBlockNumber colorScheme="purple" />
					</motion.div> */}
        </Container>
      </header>

      {/* Mobile navigation overlay */}
      <AnimatePresence>{menuIsOpen && <MobileNavNew />}</AnimatePresence>
    </>
  );
};

export default HeaderNew;
