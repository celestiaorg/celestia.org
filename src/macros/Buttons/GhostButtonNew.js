import Link from "@/macros/Link/Link";
import { getButtonType } from "@/utils/getButtonType";

/**
 * ChevronRight - Small arrow pointing right
 */
const ChevronRight = ({ className = "" }) => (
	<svg
		width="5"
		height="8"
		viewBox="0 0 5 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			d="M0.5 7.5L4 4L0.5 0.5"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

/**
 * GhostButtonNew - Text button with arrow for the new design system
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler (makes it a button)
 * @param {string} props.href - Link URL (makes it a link)
 * @param {boolean} props.self - Force link to open in same tab
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {'dark' | 'light'} props.variant - Color variant
 * @param {boolean} props.showArrow - Whether to show the arrow
 */
const GhostButtonNew = ({
	children,
	className = "",
	onClick = null,
	href = null,
	self = null,
	size = "md",
	variant = "dark",
	showArrow = true,
}) => {
	const baseClasses =
		"inline-flex items-center gap-4 font-untitledSans font-medium text-sm uppercase leading-none rounded-3xl no-underline transition-all duration-300";

	const sizeClasses = {
		sm: "px-3 py-3",
		md: "px-4 py-4",
		lg: "px-5 py-5",
	};

	const variantClasses = {
		dark: "text-black hover:opacity-70",
		light: "text-white hover:opacity-70",
	};

	// Define what element the button should render as
	const buttonType = getButtonType(href, onClick);
	const ButtonTypes = {
		anchor: Link,
		button: "button",
		div: "div",
	};
	const Button = ButtonTypes[buttonType];

	return (
		<Button
			className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
			onClick={onClick}
			href={href}
			self={self}
		>
			{children}
			{showArrow && <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />}
		</Button>
	);
};

export default GhostButtonNew;
