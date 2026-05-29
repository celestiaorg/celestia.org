"use client";
import Link from "@/macros/Link/Link";
import { isInternalLink } from "@/utils/isInternalLink";

/**
 * DropdownArrow - Chevron icon matching prototype (10x6, strokeWidth 1.5)
 */
export const DropdownArrow = ({ isOpen = false }) => (
	<svg
		width="10"
		height="6"
		viewBox="0 0 10 6"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={`transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`}
		style={{ opacity: 0.5, flexShrink: 0 }}
	>
		<path
			d="M1 1L5 5L9 1"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

/**
 * DesktopNavNew - Centered dropdown toggles for the full-width bar.
 *
 * Renders only the toggle buttons (matching the prototype's `.nav-links`,
 * absolutely centered). The full-width dropdown panels + overlay are owned by
 * HeaderNew so they can span the bar width and dim the page. State is lifted to
 * the parent so toggles and panels stay in sync.
 *
 * @param {Array} props.items - Dropdown menu items (type === "dropdown")
 * @param {number|null} props.activeIndex - Currently open dropdown index
 * @param {Function} props.onOpen - (index) => void, called on hover/focus
 * @param {Function} props.onClose - () => void, schedules close with grace delay
 */
const DesktopNavNew = ({ items, activeIndex, onOpen, onClose }) => {
	return (
		<nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
			{items.map((item, index) => {
				const isOpen = activeIndex === index;
				return (
					<div
						key={item.name}
						className="relative"
						onMouseEnter={() => onOpen(index)}
						onMouseLeave={onClose}
					>
						<button
							type="button"
							aria-expanded={isOpen}
							aria-haspopup="true"
							className={`relative flex items-center gap-[5px] pb-1 font-slussen text-sm leading-[1.4] cursor-pointer bg-transparent border-none p-0 transition-colors duration-200 ease-out after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-[#5640D1] after:origin-center after:transition-transform after:duration-200 after:ease-out ${
								isOpen
									? "text-white after:scale-x-100"
									: "text-white/65 hover:text-white after:scale-x-0 hover:after:scale-x-100"
							}`}
						>
							{item.name}
							<DropdownArrow isOpen={isOpen} />
						</button>
					</div>
				);
			})}
		</nav>
	);
};

/**
 * NavDropdownPanel - Full-width strip that drops below the bar (prototype's
 * `.nav-dropdown-panel`). Items are centered in a horizontal row. External
 * links get a ↗ glyph.
 */
export const NavDropdownPanel = ({ item, isOpen, onOpen, onClose }) => {
	return (
		<div
			className="absolute top-full left-0 right-0 bg-[#050208] border-b border-white/[0.08] z-[199] transition-[opacity,transform] duration-200 ease-out"
			style={{
				opacity: isOpen ? 1 : 0,
				pointerEvents: isOpen ? "auto" : "none",
				transform: isOpen ? "translateY(0)" : "translateY(-8px)",
			}}
			onMouseEnter={onOpen}
			onMouseLeave={onClose}
		>
			<div className="flex items-center justify-center gap-2 max-w-[1400px] mx-auto px-10 py-1.5">
				{item.items.map((subItem) => {
					const external = !isInternalLink(subItem.url);
					return (
						<Link
							key={subItem.name}
							href={subItem.url}
							className="inline-flex items-center gap-1 px-4 py-1.5 font-slussen text-sm leading-[1.4] text-white/50 hover:text-white transition-colors duration-150 ease-out no-underline whitespace-nowrap"
						>
							{subItem.name}
							{external && <span aria-hidden="true">↗</span>}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default DesktopNavNew;
