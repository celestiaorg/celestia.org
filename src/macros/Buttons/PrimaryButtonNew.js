import Link from "@/macros/Link/Link";
import { getButtonType } from "@/utils/getButtonType";

/**
 * PrimaryButtonNew - Primary filled button for the new design system
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler (makes it a button)
 * @param {string} props.href - Link URL (makes it a link)
 * @param {boolean} props.self - Force link to open in same tab
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {'purple' | 'dark' | 'light'} props.variant - Color variant
 * @param {'button' | 'submit' | 'reset'} props.type - Button type (forces button element)
 * @param {boolean} props.disabled - Disabled state
 */
const PrimaryButtonNew = ({
	children,
	className = "",
	onClick = null,
	href = null,
	self = null,
	size = "md",
	variant = "purple",
	type = null,
	disabled = false,
}) => {
	const baseClasses =
		"inline-flex items-center justify-center font-untitledSans font-medium text-sm uppercase leading-none rounded-3xl no-underline transition-all duration-300";

	const sizeClasses = {
		sm: "px-4 py-3",
		md: "px-4 py-4",
		lg: "px-6 py-5",
	};

	const variantClasses = {
		purple: "bg-purple-muted text-white hover:bg-purple-muted/90",
		dark: "bg-black text-white hover:bg-black/90",
		light: "bg-white text-black hover:bg-white/90",
	};

	// Define what element the button should render as
	// If type is provided, force button element
	const buttonType = type ? "button" : getButtonType(href, onClick);
	const ButtonTypes = {
		anchor: Link,
		button: "button",
		div: "div",
	};
	const Button = ButtonTypes[buttonType];

	const disabledClasses = disabled ? "opacity-70 cursor-not-allowed" : "";

	return (
		<Button
			className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
			onClick={onClick}
			href={href}
			self={self}
			type={type}
			disabled={disabled}
		>
			{children}
		</Button>
	);
};

export default PrimaryButtonNew;
