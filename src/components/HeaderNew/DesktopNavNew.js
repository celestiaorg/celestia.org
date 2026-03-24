"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/macros/Link/Link";
import MenuDataNew from "./data";

/**
 * DropdownArrow - Chevron icon for dropdown menus
 */
const DropdownArrow = ({ theme = "dark", isOpen = false }) => {
	const strokeColor = "rgba(255, 255, 255, 0.65)";

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
 * Uses a portal so the dropdown panel renders outside the blurred pill nav,
 * allowing its own backdrop-filter to work independently.
 */
const NavDropdown = ({ item, theme, isOpen, onToggle, onClose }) => {
	const buttonRef = useRef(null);
	const dropdownRef = useRef(null);
	const [pos, setPos] = useState({ top: 0, left: 0 });

	// Update dropdown position based on button location
	const updatePos = useCallback(() => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setPos({
				top: rect.bottom + 6,
				left: rect.left,
			});
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			updatePos();
		}
	}, [isOpen, updatePos]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current && !dropdownRef.current.contains(event.target) &&
				buttonRef.current && !buttonRef.current.contains(event.target)
			) {
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

	const dropdownVariants = {
		hidden: { opacity: 0, y: 8 },
		visible: {
			opacity: 1, y: 0,
			transition: { type: "tween", duration: 0.2, ease: "easeOut", staggerChildren: 0.035, delayChildren: 0.03 },
		},
		exit: {
			opacity: 0, y: 4,
			transition: { type: "tween", duration: 0.12, ease: "easeOut" },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 6 },
		visible: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.18, ease: "easeOut" } },
	};

	return (
		<div className="relative">
			<button
				ref={buttonRef}
				onClick={onToggle}
				className="flex items-center gap-2 font-untitledSans text-sm tracking-[-0.2px] leading-10 text-white/65 transition-colors duration-250 ease-out hover:text-white"
			>
				{item.name}
				<DropdownArrow theme={theme} isOpen={isOpen} />
			</button>

			{typeof document !== "undefined" && createPortal(
				<AnimatePresence>
					{isOpen && (
						<motion.div
							ref={dropdownRef}
							variants={dropdownVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="fixed min-w-[220px] rounded-xl py-2.5 z-[200] pointer-events-auto"
							style={{
								top: pos.top,
								left: pos.left,
								background: "rgba(4, 2, 7, 0.7)",
								border: "1px solid rgba(255, 255, 255, 0.08)",
								WebkitBackdropFilter: "blur(24px)",
								backdropFilter: "blur(24px)",
								boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
							}}
						>
							{item.items.map((subItem, index) => (
								<motion.div key={index} variants={itemVariants}>
									<Link
										href={subItem.url}
										className="block px-4 py-1 text-sm leading-9 text-white/60 hover:text-white hover:bg-white/5 transition-colors no-underline"
										onClick={onClose}
									>
										{subItem.name}
									</Link>
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>,
				document.body
			)}
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

/* Legacy export kept for backward compatibility — default is now DesktopNavNew */

export default DesktopNavNew;
