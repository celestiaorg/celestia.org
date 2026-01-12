"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import CelestiaLogoNewSVG, { CelestiaSymbolNewSVG } from "@/macros/SVGs/CelestiaLogoNewSVG";
import useHeaderTheme from "@/hooks/useHeaderTheme";
import { useScrollPosition } from "@/utils/scrollLock";
import DesktopNavNew from "./DesktopNavNew";
import MobileNavNew from "./MobileNavNew";
import MenuButtonNew from "./MenuButtonNew";
import LuminaBlockNumber from "@/components/Lumina/BlockNumberDisplay";

// Animation variants for header
const headerVariants = {
	hidden: { opacity: 0, y: -20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

/**
 * HeaderNew - New header component with theme-aware colors
 *
 * Features:
 * - Dynamic color switching based on underlying section background
 * - Desktop navigation with dropdowns
 * - Full mobile menu with animations
 * - Smooth color transitions
 * - Background blur on scroll (after 5vh)
 */
const HeaderNew = () => {
	const { theme } = useHeaderTheme();
	const { setScrollIsLocked, menuIsOpen, setMenuIsOpen } = useScrollPosition();
	const [hasScrolled, setHasScrolled] = useState(false);
	const ticking = useRef(false);

	// Lock scroll when mobile menu is open
	useEffect(() => {
		setScrollIsLocked(menuIsOpen);
	}, [menuIsOpen, setScrollIsLocked]);

	// Track scroll position for background and height change (triggers on any scroll > 0)
	const handleScroll = useCallback(() => {
		if (ticking.current) return;

		ticking.current = true;
		requestAnimationFrame(() => {
			const shouldShowBackground = window.scrollY > 0;
			setHasScrolled((prev) => (prev !== shouldShowBackground ? shouldShowBackground : prev));
			ticking.current = false;
		});
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		// Check initial scroll position
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// Determine the effective theme (when menu is open, treat as dark for the hamburger to show correctly)
	const effectiveTheme = menuIsOpen ? "dark" : theme;

	return (
		<>
			<motion.header
				className='fixed top-0 left-0 w-full z-50'
				variants={headerVariants}
				initial='hidden'
				animate={{
					...headerVariants.visible,
					backdropFilter: hasScrolled ? "blur(24px)" : "blur(0px)",
					backgroundColor: hasScrolled
						? theme === "dark"
							? "rgba(0, 0, 0, 0.8)"
							: "rgba(255, 255, 255, 0.8)"
						: "rgba(0, 0, 0, 0)",
				}}
				transition={{
					duration: 0.3,
					ease: [0.25, 0.4, 0.25, 1],
				}}
			>
				<Container size='lg' padding={false}>
					<div
						className={`relative w-full flex justify-between items-center ${hasScrolled ? "py-3" : "py-6"} z-50 px-4 md:px-10 transition-all duration-300`}
					>
						{/* Left side: Menu button (mobile) + Logo */}
						<div className='flex items-center gap-x-3 xs:gap-x-4'>
							<div className='transition-all duration-300 lg:hidden'>
								<MenuButtonNew isOpen={menuIsOpen} onClick={() => setMenuIsOpen(!menuIsOpen)} theme={effectiveTheme} />
							</div>

							<Link href='/' className='block'>
								{/* Symbol for screens smaller than xs (390px) */}
								<CelestiaSymbolNewSVG theme={effectiveTheme} className='w-10 h-auto block xs:hidden' />
								{/* Full logo for xs and larger screens */}
								<CelestiaLogoNewSVG theme={effectiveTheme} className='w-[128px] sm:w-[146px] h-auto hidden xs:block' />
							</Link>
						</div>

						{/* Right side: Navigation + Start Light Node */}
						<div className='flex items-center gap-8 ml-auto'>
							<DesktopNavNew theme={effectiveTheme} />
							{/* Delay Lumina badge reveal to avoid header height jump during initial animation */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
							>
								<LuminaBlockNumber colorScheme="purple" />
							</motion.div>
						</div>
					</div>
				</Container>
			</motion.header>

			{/* Mobile navigation overlay */}
			<AnimatePresence>{menuIsOpen && <MobileNavNew />}</AnimatePresence>
		</>
	);
};

export default HeaderNew;
