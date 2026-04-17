"use client";

/**
 * MenuButtonNew - Hamburger/close button with theme-aware colors
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the menu is open
 * @param {Function} props.onClick - Click handler
 * @param {'dark' | 'light'} props.theme - Current theme for color
 */
const MenuButtonNew = ({ isOpen, onClick, theme = "dark" }) => {
	const colorClass = theme === "dark" ? "bg-white" : "bg-black";

	return (
		<button
			onClick={onClick}
			className="relative w-7 h-7 flex flex-col justify-center items-center gap-1.5 lg:hidden"
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-expanded={isOpen}
		>
			<span
				className={`block w-5 h-[1.5px] ${colorClass} transition-all duration-300 ease-out ${
					isOpen ? "rotate-45 translate-y-[3.75px]" : ""
				}`}
			/>
			<span
				className={`block w-5 h-[1.5px] ${colorClass} transition-all duration-300 ease-out ${
					isOpen ? "-rotate-45 -translate-y-[3.75px]" : ""
				}`}
			/>
		</button>
	);
};

export default MenuButtonNew;
