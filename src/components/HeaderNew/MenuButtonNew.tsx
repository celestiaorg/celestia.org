"use client";

interface MenuButtonNewProps {
	isOpen: boolean;
	onClick: () => void;
	theme?: "dark" | "light";
}

/**
 * MenuButtonNew - Three-line hamburger that morphs to an X (prototype `.nav-burger`).
 *
 * 44×44 tap target, 22px-wide bars with a 5px gap. On open the top/bottom bars
 * translate to center and rotate ±45°, the middle bar fades out.
 */
const MenuButtonNew = ({ isOpen, onClick, theme = "dark" }: MenuButtonNewProps) => {
	const colorClass = theme === "dark" ? "bg-[#FDFCFF]" : "bg-[#0E1014]";
	const bar = `block h-[1.5px] w-[22px] rounded-sm ${colorClass}`;

	return (
		<button
			onClick={onClick}
			className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-expanded={isOpen}
		>
			<span
				className={`${bar} transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
					isOpen ? "translate-y-[6.5px] rotate-45" : ""
				}`}
			/>
			<span
				className={`${bar} transition-opacity duration-200 ease-out ${
					isOpen ? "opacity-0" : "opacity-100"
				}`}
			/>
			<span
				className={`${bar} transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
					isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
				}`}
			/>
		</button>
	);
};

export default MenuButtonNew;
