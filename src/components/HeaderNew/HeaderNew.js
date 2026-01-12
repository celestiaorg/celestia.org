"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import CelestiaLogoNewSVG, { CelestiaSymbolNewSVG } from "@/macros/SVGs/CelestiaLogoNewSVG";
import useHeaderTheme from "@/hooks/useHeaderTheme";
import { useScrollPosition } from "@/utils/scrollLock";
import DesktopNavNew from "./DesktopNavNew";
import MobileNavNew from "./MobileNavNew";
import MenuButtonNew from "./MenuButtonNew";

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
 */
const HeaderNew = () => {
	const { theme } = useHeaderTheme();
	const { setScrollIsLocked, menuIsOpen, setMenuIsOpen } = useScrollPosition();

	// Lock scroll when mobile menu is open
	useEffect(() => {
		setScrollIsLocked(menuIsOpen);
	}, [menuIsOpen, setScrollIsLocked]);

	// Determine the effective theme (when menu is open, treat as dark for the hamburger to show correctly)
	const effectiveTheme = menuIsOpen ? "dark" : theme;

	return (
		<>
			<motion.header
				className='fixed top-0 left-0 w-full z-50'
				variants={headerVariants}
				initial='hidden'
				animate='visible'
			>
				<Container size='lg' padding={false}>
					<div
						className={`relative w-full flex justify-between items-center py-6 z-50 px-4 md:px-10 ${
							menuIsOpen ? "filter invert" : ""
						} transition-all duration-300`}
					>
						{/* Left side: Menu button (mobile) + Logo */}
						<div className='flex items-center gap-x-3 xs:gap-x-4'>
							<div className={`${menuIsOpen ? "invert" : ""} transition-all duration-300 lg:hidden`}>
								<MenuButtonNew isOpen={menuIsOpen} onClick={() => setMenuIsOpen(!menuIsOpen)} theme={effectiveTheme} />
							</div>

							<Link href='/' className='block'>
								{/* Symbol for screens smaller than xs (390px) */}
								<CelestiaSymbolNewSVG theme={effectiveTheme} className='w-10 h-auto block xs:hidden' />
								{/* Full logo for xs and larger screens */}
								<CelestiaLogoNewSVG theme={effectiveTheme} className='w-[128px] sm:w-[146px] h-auto hidden xs:block' />
							</Link>
						</div>

						{/* Right side: Desktop navigation */}
						<DesktopNavNew theme={effectiveTheme} />
					</div>
				</Container>
			</motion.header>

			{/* Mobile navigation overlay */}
			<AnimatePresence>{menuIsOpen && <MobileNavNew />}</AnimatePresence>
		</>
	);
};

export default HeaderNew;
