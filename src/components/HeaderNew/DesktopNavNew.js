"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "@/macros/Link/Link";
import MenuDataNew from "./data";

/**
 * DropdownArrow - Chevron icon matching prototype (10x6, strokeWidth 1.5)
 */
const DropdownArrow = ({ isOpen = false }) => (
	<svg
		width="10"
		height="6"
		viewBox="0 0 10 6"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={`transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
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
 * NavDropdown - Dropdown menu using absolute positioning (no portal).
 * Matches prototype: CSS opacity/translateY transition, 0.18s ease.
 */
const NavDropdown = ({ item, isOpen, onToggle, onClose }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, onClose]);

	return (
		<div className="relative" ref={containerRef}>
			<button
				onClick={onToggle}
				className="flex items-center gap-[5px] font-slussen text-sm font-normal tracking-[-0.2px] leading-5 text-white/65 transition-colors duration-250 ease-out hover:text-white bg-transparent border-none p-0 cursor-pointer"
			>
				{item.name}
				<DropdownArrow isOpen={isOpen} />
			</button>

			<div
				className="absolute left-[-16px] min-w-[180px] flex flex-col gap-[2px] rounded-2xl p-2 z-[200] transition-all duration-[180ms] ease-out"
				style={{
					top: "calc(100% + 26px)",
					background: "rgba(10, 8, 18, 0.96)",
					border: "1px solid rgba(255, 255, 255, 0.12)",
					WebkitBackdropFilter: "blur(24px)",
					backdropFilter: "blur(24px)",
					opacity: isOpen ? 1 : 0,
					pointerEvents: isOpen ? "auto" : "none",
					transform: isOpen ? "translateY(0)" : "translateY(-4px)",
				}}
			>
				{item.items.map((subItem, index) => (
					<Link
						key={index}
						href={subItem.url}
						className="block px-3.5 py-2.5 text-sm font-normal font-slussen tracking-[-0.2px] text-white/65 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors duration-150 ease-out no-underline whitespace-nowrap"
						onClick={onClose}
					>
						{subItem.name}
					</Link>
				))}
			</div>
		</div>
	);
};

/**
 * DesktopNavNew - Desktop navigation with dropdowns
 */
const DesktopNavNew = () => {
	const [openDropdown, setOpenDropdown] = useState(null);

	const handleToggle = useCallback((index) => {
		setOpenDropdown((prev) => (prev === index ? null : index));
	}, []);

	const handleClose = useCallback(() => {
		setOpenDropdown(null);
	}, []);

	return (
		<nav className="hidden lg:flex items-center gap-8">
			{MenuDataNew.map((item, index) =>
				item.type === "link" ? (
					<Link
						key={index}
						href={item.url}
						className="flex items-center font-slussen text-sm font-normal tracking-[-0.2px] leading-5 text-white/65 transition-colors duration-250 ease-out hover:text-white no-underline"
					>
						{item.name}
					</Link>
				) : (
					<NavDropdown
						key={index}
						item={item}
						isOpen={openDropdown === index}
						onToggle={() => handleToggle(index)}
						onClose={handleClose}
					/>
				)
			)}
		</nav>
	);
};

export default DesktopNavNew;
