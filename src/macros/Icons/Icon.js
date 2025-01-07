"use client";
import { rotateClass } from "@/utils/rotateClassName";
import ArrowLongSVG from "../SVGs/ArrowLongSVG";

const Icon = ({
	Icon = <ArrowLongSVG />,
	direction = "up",
	hover = false,
	HoverIcon = <ArrowLongSVG />,
	hoverDirection = "up",
	className,
	size = "md", // xs, sm, md, lg || 16px, 24px, 48px, 64px
	border = true,
	dark = false,
	transparentBg = false,
}) => {
	const sizeClasses = {
		xs: "h-4 w-4",
		sm: "h-6 w-6",
		40: "h-10 w-10",
		md: "h-12 w-12",
		lg: "h-16 w-16",
	};

	return (
		<div
			className={`
        ${hover ? "group" : ""} transition-colors duration-200 relative overflow-hidden rounded-full 
        ${sizeClasses[size]}
        ${
			border
				? `border ${
						dark ? `border-white ${hover ? "group-hover:border-black" : ""}` : `border-black ${hover ? "group-hover:border-white" : ""}`
				  }`
				: ``
		}
        ${
			transparentBg
				? `bg-transparent`
				: dark
				? `bg-black ${hover ? "group-hover:bg-white" : ""}`
				: `bg-white ${hover ? "group-hover:bg-black" : ""}`
		}
        ${className}
        `}
		>
			<div
				className={`absolute top-0 left-0 h-full w-full transition-transform 
            ${rotateClass(direction)}`}
			>
				<div
					className={`absolute top-0 left-0 h-full w-full transition-all duration-300
            ${hover ? "group-hover:-top-full" : ""}`}
				>
					<div className={`top-0 left-0 absolute h-full w-full flex justify-center items-center`}>{Icon}</div>
					{hover && (
						<div
							className={`top-full left-0 absolute h-full w-full flex justify-center items-center transition-transform 
                ${rotateClass(hoverDirection)}`}
						>
							{HoverIcon}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Icon;
