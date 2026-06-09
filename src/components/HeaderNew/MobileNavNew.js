"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "@/macros/Link/Link";
import MenuDataNew from "./data";
import MobileNavDropdownNew from "./MobileNavDropdownNew";

const dropdowns = MenuDataNew.filter((item) => item.type === "dropdown");
const ctaItems = MenuDataNew.filter((item) => item.type === "link");

// Prototype's mobile-menu easing (cubic-bezier(0.4, 0, 0.2, 1)).
const EASE = [0.4, 0, 0.2, 1];

/**
 * MobileNavNew - Full-screen mobile navigation overlay (prototype `.mobile-menu`).
 *
 * Sits below the fixed bar (z-40 vs the header's z-50) and clears it with top
 * padding, so the logo, CTA pill, and the burger-turned-X stay visible on top.
 * Dropdowns render as single-open accordions; the "Get in Touch" link renders as
 * a full-width CTA pill at the bottom. The whole panel fades and slides down on
 * open, matching the prototype.
 *
 * @param {'dark' | 'light'} props.theme - Current header theme
 * @param {Function} props.onClose - Closes the menu (called when a link is tapped)
 */
const MobileNavNew = ({ theme = "dark", onClose }) => {
	const isLight = theme === "light";
	const [openIndex, setOpenIndex] = useState(null);

	return (
		<motion.div
			className={`fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pb-10 pt-[88px] lg:hidden ${
				isLight ? "bg-[#FDFCFF]" : "bg-[#040207]"
			}`}
			initial={{ opacity: 0, y: -8 }}
			animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
			exit={{ opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE } }}
		>
			<div className="flex flex-col">
				{dropdowns.map((item, index) => (
					<MobileNavDropdownNew
						key={item.name}
						name={item.name}
						items={item.items}
						isOpen={openIndex === index}
						onToggle={() => setOpenIndex(openIndex === index ? null : index)}
						onNavigate={onClose}
						theme={theme}
					/>
				))}
			</div>

			{ctaItems.map((cta) => (
				<Link
					key={cta.name}
					href={cta.url}
					onClick={onClose}
					className={`mt-8 flex items-center justify-center rounded-full py-4 font-slussen text-[16px] font-medium no-underline transition-opacity duration-200 ease-out hover:opacity-[0.85] ${
						isLight ? "bg-[#0E1014] text-[#FDFCFF]" : "bg-white text-[#0E1014]"
					}`}
				>
					{cta.name}
				</Link>
			))}
		</motion.div>
	);
};

export default MobileNavNew;
