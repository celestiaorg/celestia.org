import Link from "@/macros/Link/Link";
import { getButtonType } from "@/utils/getButtonType";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "../SVGs/ArrowLongSVG";

const BorderButton = ({ onClick = null, href = null, self = null, children, className, iconDirection = "down-right" }) => {
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
			href={href}
			onClick={onClick}
			self={self}
			className={`flex justify-between items-center group py-3 px-0 group relative overflow-hidden transition-all duration-200 hover:px-4 text-black no-underline border-t border-black ${className}`}
		>
			<div
				className={`z-0 absolute w-0 h-[200%] top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 bg-black`}
			></div>
			<p
				className={`relative z-10 text-xl leading-[1.2] uppercase tracking-wider grow-1 pr-14 group-hover:text-white transition-colors duration-200`}
			>
				{children}
			</p>
			<Icon
				Icon={<ArrowLongSVG />}
				hover
				HoverIcon={<ArrowLongSVG />}
				className={`flex-grow-0 shrink-0`}
				direction={iconDirection}
				border={false}
				size={"sm"}
				transparentBg
			/>
		</Button>
	);
};

export default BorderButton;
