"use client";

import Link from "@/macros/Link/Link";
import { getButtonType } from "@/utils/getButtonType";
import ChevronRightSVG from "@/macros/SVGs/ChevronRightSVG";

const PrimaryButton = ({
	children,
	className,
	onClick = null,
	href = null,
	self = null,
	lightMode = false,
	noBorder = false,
	hover = true,
	size = "md",
	isActive = false,
	variant = null, // "purple" | "purple-bright" | "ghost" | "ghost-dark" | "outline" for new design
	showArrow = false, // Show right arrow (for ghost variant)
}) => {
	const baseClasses = `leading-none text-center uppercase rounded-full block no-underline transform transition-all duration-150`;
	const lightModeClasses = `text-black border-black ${hover ? "hover:text-white transition-all duration-300" : null}`;
	const darkModeClasses = `bg-black text-white border-white ${hover ? "hover:text-black hover:border-black transition-all duration-300" : null}`;
	const purpleVariantClasses = `bg-[#766793] text-white border-[#766793] ${hover ? "hover:bg-[#8a7ba8] hover:border-[#8a7ba8] transition-all duration-300" : ""}`;
	const purpleBrightVariantClasses = `bg-[#9747ff] text-white border-[#9747ff] ${hover ? "hover:bg-[#a85fff] hover:border-[#a85fff] transition-all duration-300" : ""}`;
	const ghostVariantClasses = `bg-transparent text-white border-transparent ${hover ? "hover:bg-white/10 transition-all duration-300" : ""}`;
	const ghostDarkVariantClasses = `bg-transparent text-[#17141a] border-transparent ${hover ? "hover:bg-black/5 transition-all duration-300" : ""}`;
	const outlineVariantClasses = `bg-transparent text-white border-white ${hover ? "hover:bg-white hover:text-black transition-all duration-300" : ""}`;
	const borderClasses = noBorder || variant === "ghost" || variant === "ghost-dark" ? `border-0` : `border`;
	const sizeClasses = {
		sm: `text-xs px-3 py-2`,
		md: `text-xs px-5 py-3`,
		lg: `text-base px-10 py-5`,
		xl: `text-sm px-4 py-4`,
	};

	const getModeClasses = () => {
		if (variant === "purple") return purpleVariantClasses;
		if (variant === "purple-bright") return purpleBrightVariantClasses;
		if (variant === "ghost") return ghostVariantClasses;
		if (variant === "ghost-dark") return ghostDarkVariantClasses;
		if (variant === "outline") return outlineVariantClasses;
		return lightMode ? lightModeClasses : darkModeClasses;
	};

	// define what element the button should render as
	const buttonType = getButtonType(href, onClick);
	const ButtonTypes = {
		anchor: Link,
		button: "button",
		div: "div",
	};
	const Button = ButtonTypes[buttonType];

	// For purple, purple-bright, ghost, ghost-dark, and outline variants, skip the bubble hover animation
	const showBubbleHover = hover && variant !== "purple" && variant !== "purple-bright" && variant !== "ghost" && variant !== "ghost-dark" && variant !== "outline";

	return (
		<Button
			className={`group relative block
				${baseClasses}
				${sizeClasses[size]}
				${getModeClasses()}
				${borderClasses}
				${className}
			`}
			onClick={onClick}
			href={href}
			self={self}
		>
			<div className='absolute inset-0 overflow-hidden rounded-full'>
				{showBubbleHover && (
					<div
						className={`absolute w-1/2 h-full top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 ${
							lightMode ? "bg-black" : "bg-white"
						}`}
					></div>
				)}
			</div>
			<div className={`relative z-10 flex items-center justify-center gap-4 ${showArrow ? "" : ""}`}>
				{children}
				{showArrow && (
					<ChevronRightSVG color={variant === "ghost-dark" ? "#17141a" : "white"} className="w-[6px] h-auto" />
				)}
			</div>
		</Button>
	);
};

export default PrimaryButton;
