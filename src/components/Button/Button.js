"use client";

import { tv, cn } from "tailwind-variants";
import { default as NextLink } from "next/link";
import { forwardRef } from "react";

/**
 * Check if a link is internal (relative path or same domain)
 */
const isInternalLink = (href) => {
	if (!href) return false;
	return href.startsWith("/") || href.startsWith("#") || !href.startsWith("http");
};

/**
 * Determine the element type based on props
 */
const getElementType = (href) => {
	if (href) return "anchor";
	return "button";
};

/**
 * Button variants using Tailwind Variants
 *
 * Design specs from Figma (2025):
 * - Border radius varies by size: xs=6px, sm=8px, md=16px, lg=16px
 * - Font: Untitled Sans Medium, 14px, line-height 22px, tracking -0.42px (-3%)
 * - Heights: xs=30px, sm=34px, md=42px, lg=46px
 *
 * Primary buttons use pseudo-element for gradient border:
 * - ::before positioned at inset-[-1px] creates 1px gradient border
 * - Button bg covers the center, leaving gradient visible as border
 */
const buttonVariants = tv({
	base: [
		"group relative overflow-visible inline-flex items-center justify-center gap-[10px]",
		"font-untitledSans font-medium text-sm leading-[22px] tracking-[-0.03em]",
		"no-underline cursor-pointer",
		"transition-colors duration-300",
		"focus:outline-none",
	],
	variants: {
		variant: {
			primary: "",
			outline: "bg-transparent",
			subtle: "",
			ghost: "bg-transparent border-transparent",
		},
		size: {
			xs: "h-[30px] px-[10px] py-[4px] text-sm rounded-[6px]",
			sm: "h-[34px] px-[12px] py-[6px] text-sm rounded-[8px]",
			md: "h-[42px] px-[16px] py-[10px] text-sm rounded-[16px]",
			lg: "h-[46px] px-[16px] py-[12px] text-sm rounded-[16px]",
		},
		theme: {
			dark: "",
			light: "",
		},
		disabled: {
			true: "cursor-not-allowed pointer-events-none",
		},
	},
	compoundVariants: [
		// ============ PRIMARY DARK ============
		{
			variant: "primary",
			theme: "dark",
			class: [
				"text-black",
				// Inner shadow for depth
				"shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.33)]",
			],
		},
		// ============ PRIMARY LIGHT ============
		{
			variant: "primary",
			theme: "light",
			class: [
				"text-[#17141A]",
			],
		},
		// ============ PRIMARY DISABLED DARK ============
		{
			variant: "primary",
			theme: "dark",
			disabled: true,
			class: "bg-[#28222F] text-[#67646A] shadow-none",
		},
		// ============ PRIMARY DISABLED LIGHT ============
		{
			variant: "primary",
			theme: "light",
			disabled: true,
			class: "bg-[#ECECEC] text-[#99959E] shadow-none",
		},

		// ============ OUTLINE DARK ============
		{
			variant: "outline",
			theme: "dark",
			class: [
				"text-white",
				"border border-[#353238]",
				"hover:border-[#ADB5FF] hover:text-white",
				"active:bg-[#A3A7CD] active:text-black active:border-[#A3A7CD]",
			],
		},
		// ============ OUTLINE LIGHT ============
		{
			variant: "outline",
			theme: "light",
			class: [
				"text-[#17141A]",
				"border border-[#F4EFFD]",
				"hover:border-[#C3B3E0]",
				"active:bg-[#EAE4F3] active:border-[#EAE4F3]",
			],
		},
		// ============ OUTLINE DISABLED DARK ============
		{
			variant: "outline",
			theme: "dark",
			disabled: true,
			class: "bg-[#28222F] text-[#67646A] border-[#28222F]",
		},
		// ============ OUTLINE DISABLED LIGHT ============
		{
			variant: "outline",
			theme: "light",
			disabled: true,
			class: "bg-[#ECECEC] text-[#99959E] border-[#ECECEC]",
		},

		// ============ SUBTLE DARK ============
		{
			variant: "subtle",
			theme: "dark",
			class: [
				"text-white",
				"bg-[#28222F] border border-[#28222F]",
				"hover:bg-[#3C3643] hover:border-[#3C3643] hover:text-white",
				"active:bg-[#A3A7CD] active:text-black active:border-[#A3A7CD]",
			],
		},
		// ============ SUBTLE LIGHT ============
		{
			variant: "subtle",
			theme: "light",
			class: [
				"text-[#17141A]",
				"bg-[#F4EFFD] border border-[#F4EFFD]",
				"hover:bg-[#EAE4F3] hover:border-[#EAE4F3] hover:text-[#17141A]",
				"active:bg-[#E0D7FF] active:border-[#E0D7FF]",
			],
		},
		// ============ SUBTLE DISABLED DARK ============
		{
			variant: "subtle",
			theme: "dark",
			disabled: true,
			class: "bg-[#28222F] text-[#67646A] border-[#28222F]",
		},
		// ============ SUBTLE DISABLED LIGHT ============
		{
			variant: "subtle",
			theme: "light",
			disabled: true,
			class: "bg-[#ECECEC] text-[#99959E] border-[#ECECEC]",
		},

		// ============ GHOST DARK ============
		{
			variant: "ghost",
			theme: "dark",
			class: [
				"text-white",
				"border border-transparent",
				"hover:bg-[#28222F] hover:border-[#28222F] hover:text-white",
				"active:bg-[#A3A7CD] active:text-black",
			],
		},
		// ============ GHOST LIGHT ============
		{
			variant: "ghost",
			theme: "light",
			class: [
				"text-[#17141A]",
				"border border-transparent",
				"hover:bg-[#F4EFFD] hover:border-[#F4EFFD] hover:text-[#17141A]",
				"active:bg-[#EAE4F3]",
			],
		},
		// ============ GHOST DISABLED DARK ============
		{
			variant: "ghost",
			theme: "dark",
			disabled: true,
			class: "bg-[#28222F] text-[#67646A]",
		},
		// ============ GHOST DISABLED LIGHT ============
		{
			variant: "ghost",
			theme: "light",
			disabled: true,
			class: "text-[#99959E]",
		},
	],
	defaultVariants: {
		variant: "primary",
		size: "md",
		theme: "dark",
	},
});

/**
 * Gradient border for primary buttons
 * Positioned 1px outside the button to create border effect
 * Changes gradient on hover for dark theme
 */
const GradientBorder = ({ theme, size }) => {
	// Border radius 1px larger than button
	const radiusMap = { xs: 7, sm: 9, md: 17, lg: 17 };
	const radius = radiusMap[size] || 17;
	const baseClasses = "absolute pointer-events-none transition-opacity duration-300";

	if (theme === "dark") {
		return (
			<>
				{/* Default border - white to #5A46A1 */}
				<span
					className={`${baseClasses} group-hover:opacity-0 group-active:opacity-0`}
					style={{
						inset: "-1px",
						borderRadius: `${radius}px`,
						background: "linear-gradient(to bottom, #FFFFFF, #5A46A1)",
						zIndex: 0,
					}}
					aria-hidden="true"
				/>
				{/* Hover border - #E3DBFF to #8072B3 at 60% */}
				<span
					className={`${baseClasses} opacity-0 group-hover:opacity-100 group-active:opacity-0`}
					style={{
						inset: "-1px",
						borderRadius: `${radius}px`,
						background: "linear-gradient(to bottom, rgba(227,219,255,0.6), rgba(128,114,179,0.6))",
						zIndex: 0,
					}}
					aria-hidden="true"
				/>
				{/* Active border - solid #A3A7CD */}
				<span
					className={`${baseClasses} opacity-0 group-active:opacity-100 bg-[#A3A7CD]`}
					style={{
						inset: "-1px",
						borderRadius: `${radius}px`,
						zIndex: 0,
					}}
					aria-hidden="true"
				/>
			</>
		);
	}

	// Light theme border
	return (
		<>
			{/* Default border - #F2F3FF → #9CA0D0 at 90% */}
			<span
				className={`${baseClasses} group-hover:opacity-0 group-active:opacity-0`}
				style={{
					inset: "-1px",
					borderRadius: `${radius}px`,
					background: "linear-gradient(to bottom, rgba(242,243,255,0.9), rgba(156,160,208,0.9))",
					zIndex: 0,
				}}
				aria-hidden="true"
			/>
			{/* Hover border - #F2F3FF → #9CA0D0 at 80% */}
			<span
				className={`${baseClasses} opacity-0 group-hover:opacity-100 group-active:opacity-0`}
				style={{
					inset: "-1px",
					borderRadius: `${radius}px`,
					background: "linear-gradient(to bottom, rgba(242,243,255,0.8), rgba(156,160,208,0.8))",
					zIndex: 0,
				}}
				aria-hidden="true"
			/>
			{/* Active border - solid #EAE4F3 */}
			<span
				className={`${baseClasses} opacity-0 group-active:opacity-100 bg-[#EAE4F3]`}
				style={{
					inset: "-1px",
					borderRadius: `${radius}px`,
					zIndex: 0,
				}}
				aria-hidden="true"
			/>
		</>
	);
};

/**
 * Gradient fill for primary buttons
 * Three layers: default gradient, hover solid, active solid
 */
const GradientFill = ({ size, theme }) => {
	const radiusMap = { xs: 6, sm: 8, md: 16, lg: 16 };
	const radius = radiusMap[size] || 16;
	const baseClasses = "absolute inset-0 pointer-events-none transition-opacity duration-300";

	// Colors per theme - TODO: configure light theme colors
	const colors = theme === "dark"
		? { hover: "#E0D7FF", active: "#A3A7CD" }
		: { hover: "#E0D7FF", active: "#EAE4F3" }; // Light theme colors

	return (
		<>
			{/* Layer 1: Default gradient */}
			<span
				className={`${baseClasses} group-hover:opacity-0 group-active:opacity-0`}
				style={{
					borderRadius: `${radius}px`,
					background: "linear-gradient(to bottom, rgba(232,226,255,0.4), #CABBFF), #FFFFFF",
					zIndex: 1,
				}}
				aria-hidden="true"
			/>
			{/* Layer 2: Hover solid */}
			<span
				className={`${baseClasses} opacity-0 group-hover:opacity-100 group-active:opacity-0`}
				style={{ borderRadius: `${radius}px`, zIndex: 1, backgroundColor: colors.hover }}
				aria-hidden="true"
			/>
			{/* Layer 3: Active solid */}
			<span
				className={`${baseClasses} opacity-0 group-active:opacity-100`}
				style={{ borderRadius: `${radius}px`, zIndex: 1, backgroundColor: colors.active }}
				aria-hidden="true"
			/>
		</>
	);
};

/**
 * Button Component
 *
 * Icons are handled via composition - just pass them as children:
 * <Button><Icon /> Text</Button>
 * <Button>Text <Icon /></Button>
 */
const Button = forwardRef(
	(
		{
			children,
			className,
			variant = "primary",
			size = "md",
			theme = "dark",
			disabled = false,
			href,
			onClick,
			type,
			self,
			style,
			...props
		},
		ref
	) => {
		const elementType = getElementType(href);
		const isInternal = isInternalLink(href);
		const isHashLink = href?.startsWith("#");

		// Combine all classes
		const classes = buttonVariants({
			variant,
			size,
			theme,
			disabled,
			className,
		});

		// Check if primary variant (needs gradient layers)
		const isPrimary = variant === "primary" && !disabled;
		const isPrimaryDisabled = variant === "primary" && disabled;

		// Border radius for pseudo element (1px larger than button)
		const radiusMap = { xs: 7, sm: 9, md: 17, lg: 17 };
		const borderRadius = radiusMap[size] || 17;

		// Content with gradient layers for primary
		const content = (
			<>
				{/* Gradient border - sits behind everything */}
				{isPrimary && <GradientBorder theme={theme} size={size} />}
				{/* Gradient fill - covers border center, leaving 1px edge visible */}
				{isPrimary && <GradientFill size={size} theme={theme} />}
				{/* Disabled primary: solid border */}
				{isPrimaryDisabled && (
					<span
						className={`absolute pointer-events-none ${theme === "dark" ? "bg-[#28222F]" : "bg-[#ECECEC]"}`}
						style={{ inset: "-1px", borderRadius: `${borderRadius}px`, zIndex: 0 }}
						aria-hidden="true"
					/>
				)}
				{/* Children (text, icons) - on top via composition */}
				<span className="relative z-10 inline-flex items-center gap-[10px]">{children}</span>
			</>
		);

		// Handle hash link with smooth scroll
		const handleHashClick = (e) => {
			if (isHashLink) {
				e.preventDefault();
				const targetId = href.substring(1);
				const targetElement = document.getElementById(targetId);
				if (targetElement) {
					targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
					window.history.pushState(null, "", href);
				}
			}
			onClick?.(e);
		};

		// Common props for all element types
		const commonProps = {
			ref,
			className: classes,
			style,
			...props,
		};

		// Render as anchor/link
		if (elementType === "anchor") {
			if (isHashLink) {
				return (
					<a href={href} onClick={handleHashClick} {...commonProps}>
						{content}
					</a>
				);
			}

			if (isInternal || self) {
				return (
					<NextLink href={href} prefetch={isInternal} scroll={true} {...commonProps}>
						{content}
					</NextLink>
				);
			}

			return (
				<a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
					{content}
				</a>
			);
		}

		// Render as button (default)
		return (
			<button
				type={type || "button"}
				onClick={onClick}
				disabled={disabled}
				{...commonProps}
			>
				{content}
			</button>
		);
	}
);

Button.displayName = "Button";

// Export utilities for external use
export { buttonVariants, cn };
export default Button;
