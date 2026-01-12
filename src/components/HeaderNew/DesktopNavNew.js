"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/macros/Link/Link";
import MenuDataNew from "./data";

/**
 * DropdownArrow - Chevron icon for dropdown menus
 */
const DropdownArrow = ({ theme = "dark", isOpen = false }) => {
	const strokeColor = theme === "dark" ? "white" : "#17141A";

	return (
		<svg
			width="7"
			height="4"
			viewBox="0 0 7 4"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`transition-all duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
		>
			<path
				d="M0.5 0.5L3.5 3.5L6.5 0.5"
				stroke={strokeColor}
				strokeLinecap="round"
				strokeLinejoin="round"
				className="transition-all duration-500 ease-out"
			/>
		</svg>
	);
};

/**
 * NavDropdown - Dropdown menu for desktop navigation
 */
const NavDropdown = ({ item, theme, isOpen, onToggle, onClose }) => {
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const textColorClass = theme === "dark" ? "text-white" : "text-black";

	// Animation variants for the dropdown container - fade up (GPU accelerated)
	const dropdownVariants = {
		hidden: {
			opacity: 0,
			y: 8,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "tween",
				duration: 0.2,
				ease: "easeOut",
				staggerChildren: 0.035,
				delayChildren: 0.03,
			},
		},
		exit: {
			opacity: 0,
			y: 4,
			transition: {
				type: "tween",
				duration: 0.12,
				ease: "easeOut",
			},
		},
	};

	// Animation variants for individual menu items - fade up (GPU accelerated)
	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 6,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "tween",
				duration: 0.18,
				ease: "easeOut",
			},
		},
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={onToggle}
				className={`flex items-center gap-3 font-untitledSans text-sm uppercase tracking-[0.225px] leading-[23px] ${textColorClass} transition-all duration-500 ease-out hover:opacity-70`}
			>
				{item.name}
				<DropdownArrow theme={theme} isOpen={isOpen} />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						variants={dropdownVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="absolute top-full left-0 mt-4 min-w-[240px] bg-white rounded-xl py-3 z-50"
						style={{
							boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15), 0 2px 10px rgba(0, 0, 0, 0.1)",
							willChange: "transform, opacity",
							transform: "translateZ(0)",
						}}
					>
						{item.items.map((subItem, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								style={{ willChange: "transform, opacity" }}
							>
								<Link
									href={subItem.url}
									className="block px-5 py-2.5 text-sm text-black/80 hover:text-black hover:bg-black/5 transition-colors no-underline"
									onClick={onClose}
								>
									{subItem.name}
								</Link>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

/**
 * DesktopNavNew - Desktop navigation with dropdowns
 *
 * @param {Object} props
 * @param {'dark' | 'light'} props.theme - Current theme for colors
 */
const DesktopNavNew = ({ theme = "dark" }) => {
	const [openDropdown, setOpenDropdown] = useState(null);

	const handleToggle = (index) => {
		setOpenDropdown(openDropdown === index ? null : index);
	};

	const handleClose = () => {
		setOpenDropdown(null);
	};

	return (
		<nav className="hidden lg:flex items-center gap-8">
			{MenuDataNew.map((item, index) => (
				<NavDropdown
					key={index}
					item={item}
					theme={theme}
					isOpen={openDropdown === index}
					onToggle={() => handleToggle(index)}
					onClose={handleClose}
				/>
			))}
		</nav>
	);
};

export default DesktopNavNew;
