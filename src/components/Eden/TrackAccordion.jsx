"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import TrackItem from "./TrackItem";

const TrackAccordion = ({ track, index, isOpen, onToggle }) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const contentRef = useRef(null);

	useEffect(() => {
		const handleResize = () => onToggle && isOpen && onToggle();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isOpen, onToggle]);

	return (
		<div className={`w-full transition-all ease-in-out duration-500 ${isOpen ? "bg-[#F7F7F7]" : "bg-white"}`}>
			<div
				className={"relative w-full flex flex-wrap md:flex-nowrap items-center py-8 md:py-12 px-4 md:px-14 cursor-pointer overflow-hidden"}
				onClick={onToggle}
				onMouseEnter={() => !isOpen && setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className={`absolute inset-0 transition-opacity duration-500 ${isHovered || isOpen ? "opacity-100" : "opacity-0"}`}>
					<Image src={track.background} alt='' fill className='object-cover' />
				</div>
				<div className={"relative w-full md:w-1/2 z-10"}>
					<div
						className={`uppercase font-aeonik font-[500] tracking-[0.06em] text-sm md:text-base mb-4 md:mb-6 transition-colors duration-500 ${
							isHovered || isOpen ? "text-white" : "text-[#00A651]"
						}`}
					>
						{track.subtitle}
					</div>
					<div
						className={`uppercase font-spartan font-[600] text-[28px] md:text-[40px] leading-[0.8em] transition-colors duration-500 ${
							isHovered || isOpen ? "text-white" : "text-black"
						}`}
					>
						{track.title}
					</div>
				</div>
				<div className={"relative w-full md:w-1/2 md:pl-16 z-10"}>
					<div className={"flex items-center gap-x-14 pt-2 md:pt-0"}>
						<p className={`font-aeonik text-sm transition-colors duration-500 ${isHovered || isOpen ? "text-white" : "text-black"}`}>
							{track.text}
						</p>
						<div
							className={`relative aspect-square transition-all ease-in-out duration-500 flex items-center justify-center w-14 h-14 ${
								isHovered || isOpen ? " bg-white/10 backdrop-blur-[10px]" : ""
							}`}
						>
							<span
								className={`absolute w-[3px] h-5 rotate-90 transition-colors duration-500 ${
									isHovered || isOpen ? "bg-white" : "bg-black"
								}`}
							></span>
							<span
								className={`absolute w-[3px] transition-all ease-in-out duration-500 ${isOpen ? "h-0" : "h-5"} ${
									isHovered || isOpen ? "bg-white" : "bg-black"
								}`}
							></span>
						</div>
					</div>
				</div>
			</div>
			<div
				ref={contentRef}
				className={`border-b border-[#D3CED7] transition-all ease-in-out duration-500 overflow-hidden`}
				style={{
					maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
				}}
			>
				<div className={"w-full grid grid-cols-1 md:grid-cols-2 divide-solid divide-[#D3CED7]"}>
					{track.items && track.items.map((item, idx) => <TrackItem key={idx} item={item} index={idx} />)}
				</div>
			</div>
		</div>
	);
};

export default TrackAccordion;
