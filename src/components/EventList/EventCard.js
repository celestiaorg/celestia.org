"use client";

import React from "react";
import Image from "next/image";
import { Heading } from "@/macros/Copy";
import SecondaryButton from "@/macros/Buttons/SecondaryButton";
import { formatDateRange } from "@/utils/dateUtils";
import CalendarSVG from "@/macros/SVGs/Calendar";
import PinSVG from "@/macros/SVGs/Pin";

const EventCard = ({ title, startDate, endDate, location, url, image, category = [], featured = false, className = "" }) => {
	const truncateDescription = (text, limit) => {
		if (!text) return "";
		if (text.length <= limit) return text;
		return text.slice(0, limit).trim() + "...";
	};

	const categoryCheck = category.filter((item) => item !== "");

	// Normalize image path
	const imagePath = image.startsWith("/images/events/") ? image : `/images/events/${image}`;

	// Fix "Comming soon!" typo
	const normalizedStartDate = startDate?.toLowerCase().includes("comming") ? "Coming soon!" : startDate;

	const cardClasses = featured
		? "flex flex-col lg:flex-row min-w-full w-full bg-[#F8F8F8] rounded-lg overflow-hidden border border-[#413B46] p-2"
		: "flex flex-col min-w-full w-full bg-[#F8F8F8] rounded-lg overflow-hidden border border-[#413B46] p-2";

	const imageClasses = featured
		? "relative w-full lg:w-1/2 aspect-[16/9] rounded-lg overflow-hidden"
		: "relative w-full aspect-[16/9] rounded-lg overflow-hidden";

	const contentClasses = featured ? "flex flex-col gap-2 p-6 lg:w-1/2 lg:justify-center" : "flex flex-col gap-2 p-6";

	return (
		<article className={`${cardClasses} ${className}`}>
			<div className={imageClasses}>
				<Image
					src={imagePath}
					alt={truncateDescription(title, 50)}
					fill
					className='object-cover'
					sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"}
				/>
			</div>
			<div className={contentClasses}>
				{categoryCheck.length > 0 && (
					<div className='flex flex-wrap gap-2'>
						{category.filter(Boolean).map((tag, index) => (
							<span key={index} className='text-[#7B2BF9] text-xs font-medium uppercase'>
								{tag}
							</span>
						))}
					</div>
				)}
				<div className='flex items-center gap-5 text-sm'>
					<div className='flex items-center gap-3'>
						<CalendarSVG className='w-4 h-4' />
						<time>{formatDateRange(normalizedStartDate || "Coming Soon", endDate)}</time>
					</div>
					<div className='flex items-center gap-3'>
						<PinSVG className='w-4 h-4' />
						<span>{location}</span>
					</div>
				</div>
				<Heading
					size={"md"}
					tag={"h2"}
					className={
						featured
							? "text-[1.8rem] leading-[1.2] lg:text-[32px] lg:leading-tight"
							: "text-[1.4rem] leading-[1.2] lg:text-[28px] lg:leading-tight"
					}
				>
					{truncateDescription(title, featured ? 100 : 50)}
				</Heading>
				<SecondaryButton
					href={url}
					target={url === "#" ? "_self" : "_blank"}
					rel={url === "#" ? "" : "noopener noreferrer"}
					className='mt-2 w-fit'
					noBorder={false}
				>
					{url === "#" ? "COMING SOON" : "VIEW EVENT"}
				</SecondaryButton>
			</div>
		</article>
	);
};

export default EventCard;
