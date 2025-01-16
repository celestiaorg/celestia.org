"use client";
import { Heading, Body } from "@/macros/Copy";
import Link from "@/macros/Link/Link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useEffect, useRef, useState } from "react";
import MovingGradients from "@/components/Animation/MovingGradient/MovingGradient";

const VerticalTitleCard = ({ title, titleClamp = null, description, descriptionClamp = null, url, dark = false }) => {
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = () => {
		if (url) {
			setIsHovering(true);
		}
	};
	const handleMouseLeave = () => {
		if (url) {
			setIsHovering(false);
		}
	};
	const handleFocus = () => {
		if (url) {
			setIsHovering(true);
		}
	};
	const handleBlur = () => {
		if (url) {
			setIsHovering(false);
		}
	};

	const Tag = url ? Link : "div";

	return (
		<Tag
			href={url}
			className={`flex min-w-[85%] md:min-w-0 md:w-full rounded-xl  border transition-colors duration-300 delay-0 relative overflow-hidden  ${
				dark ? "bg-black text-white border-white" : "bg-white text-black border-black"
			}
      ${url ? "group hover:border-black hover:text-black" : ""}
      `}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
		>
			<div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}>
				<MovingGradients />
			</div>
			<div className={`py-6 px-6 md:px-10 flex flex-col w-full z-10`}>
				{url && (
					<Icon
						Icon={<ArrowLongSVG dark={true} />}
						hover
						dark
						HoverIcon={<ArrowLongSVG dark={false} />}
						className={`flex-grow-0 self-end md:-mr-4 mb-28 group-hover:!bg-white group-hover:[&_svg]:stroke-black`}
						direction={`top-right`}
						border
						size={"lg"}
					/>
				)}
				<div className={"mt-auto mb-0"}>
					<Heading size={"md"} tag={"h4"} className={`text-pretty mb-3 ${titleClamp ? `line-clamp-${titleClamp}` : ""}`}>
						{title}
					</Heading>
					{description && (
						<Body
							size={"md"}
							className={`text-pretty lg:text-[16px] leading-snug ${descriptionClamp ? `line-clamp-${descriptionClamp}` : ""}`}
						>
							{description}
						</Body>
					)}
				</div>
			</div>
		</Tag>
	);
};

export default VerticalTitleCard;
