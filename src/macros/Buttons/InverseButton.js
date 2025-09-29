import Link from "@/macros/Link/Link";
import { getButtonType } from "@/utils/getButtonType";

const InverseButton = ({
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
}) => {
	const baseClasses = `leading-none text-center uppercase rounded-full block no-underline transform transition-all duration-150`;
	const lightModeClasses = `bg-black text-white border-black ${
		hover ? "hover:bg-white hover:text-black hover:border-black transition-all duration-300" : null
	}`;
	const darkModeClasses = `bg-white text-black border-white ${
		hover ? "hover:bg-black hover:text-white hover:border-white transition-all duration-300" : null
	}`;
	const borderClasses = noBorder ? `border-0` : `border`;
	const sizeClasses = {
		sm: `text-xs px-3 py-2`,
		md: `text-xs px-5 py-3`,
		lg: `text-base px-10 py-5`,
	};

	// define what element the button should render as
	const buttonType = getButtonType(href, onClick);
	const ButtonTypes = {
		anchor: Link,
		button: "button",
		div: "div",
	};
	const Button = ButtonTypes[buttonType];

	return (
		<Button
			className={`group relative block
				${baseClasses} 
				${sizeClasses[size]}
				${lightMode ? lightModeClasses : darkModeClasses}
				${borderClasses} 
				${className}
			`}
			onClick={onClick}
			href={href}
			self={self}
		>
			<div className='absolute inset-0 overflow-hidden rounded-full'>
				{hover && (
					<div
						className={`absolute w-1/2 h-full top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 ${
							lightMode ? "bg-white" : "bg-black"
						}`}
					></div>
				)}
			</div>
			<div className={`relative z-10`}>{children}</div>
		</Button>
	);
};

export default InverseButton;
