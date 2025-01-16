import Link from "@/macros/Link/Link";
import { getButtonType } from "@/utils/getButtonType";

const TertiaryButton = ({
	children,
	className,
	onClick = null,
	href = null,
	self = null,
	lightMode = false,
	noBorder = false,
	hover = true,
	size = "md",
}) => {
	const baseClasses = `leading-none text-center font-medium rounded-full block no-underline transform transition-all duration-150`;
	const lightModeClasses = `text-[#00FFFF] border-[#00FFFF] ${
		hover ? "hover:text-[#1D013D] hover:bg-[#00FFFF] transition-all duration-300" : null
	}`;
	const darkModeClasses = `bg-[#00FFFF] text-[#1D013D] border-[#00FFFF] ${
		hover ? "hover:bg-transparent hover:text-[#00FFFF] transition-all duration-300" : null
	}`;
	const borderClasses = noBorder ? `border-0` : `border`;
	const sizeClasses = {
		sm: `text-xs px-3 py-2`,
		md: `text-xs px-5 py-3`,
		lg: `text-base px-10 py-5`,
	};

	const buttonType = getButtonType(href, onClick);
	const ButtonTypes = {
		anchor: Link,
		button: "button",
		div: "div",
	};
	const Button = ButtonTypes[buttonType];

	return (
		<Button
			className={`group relative h-fit 
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
							lightMode ? "bg-[#00FFFF]" : "bg-transparent"
						}`}
					></div>
				)}
			</div>
			<div className={`relative z-10`}>{children}</div>
		</Button>
	);
};

export default TertiaryButton;
