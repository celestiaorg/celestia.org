"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "@/macros/Link/Link";
import { isInternalLink } from "@/utils/isInternalLink";
import { DropdownArrow } from "./DesktopNavNew";
import type { NavSubItem } from "./data";

// Prototype's mobile-menu reveal easing (cubic-bezier(0.4, 0, 0.2, 1)).
const EASE = [0.4, 0, 0.2, 1];

interface MobileNavDropdownNewProps {
	name: string;
	items: NavSubItem[];
	isOpen: boolean;
	onToggle: () => void;
	onNavigate: () => void;
	theme?: "dark" | "light";
}

/**
 * MobileNavDropdownNew - Accordion section for the mobile menu (prototype `.m-acc`).
 *
 * A display-font head with a chevron that rotates 180° when open, over a body of
 * links that reveal via a height animation. Open/close state is owned by the
 * parent (MobileNavNew) so only one section is open at a time. External links
 * get a ↗ glyph.
 */
const MobileNavDropdownNew = ({ name, items, isOpen, onToggle, onNavigate, theme = "dark" }: MobileNavDropdownNewProps) => {
	const isLight = theme === "light";
	return (
		<div className={`border-b ${isLight ? "border-black/10" : "border-white/10"}`}>
			<button
				type="button"
				onClick={onToggle}
				aria-expanded={isOpen}
				className={`flex w-full items-center justify-between px-1 py-5 text-left font-nuberNextWide text-[22px] font-medium tracking-[-0.025em] ${
					isLight ? "text-[#0E1014]" : "text-[#FDFCFF]"
				}`}
			>
				{name}
				<DropdownArrow isOpen={isOpen} />
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: "auto" }}
						exit={{ height: 0 }}
						transition={{ duration: 0.3, ease: EASE }}
						className="overflow-hidden"
					>
						<div className="flex flex-col pb-2">
							{items.map((item) => {
								const external = !isInternalLink(item.url);
								return (
									<Link
										key={item.name}
										href={item.url}
										onClick={onNavigate}
										className={`block px-1 py-3 font-nuberNext text-[16px] no-underline transition-colors duration-150 ${
											isLight
												? "text-black/55 hover:text-black"
												: "text-white/55 hover:text-white"
										}`}
									>
										{item.name}
										{external && <span aria-hidden="true"> ↗</span>}
									</Link>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileNavDropdownNew;
