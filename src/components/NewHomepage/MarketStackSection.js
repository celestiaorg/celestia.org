"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Bowser from "bowser";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import AnimatedHeadline from "./AnimatedHeadline";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 48 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1.4,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const rows = [
	{
		title: "Private Blockspace",
		description:
			"Build onchain financial apps that keep positions, balances, and order sizes private without sacrificing performance.",
		href: "/private-blockspace/",
		video: {
			webm: "/videos/privateda_offerings.webm",
			safari: "/videos/privateda_offerings_safari.mov",
		},
		reverse: false,
	},
	{
		title: "Fibre Blockspace",
		description:
			"Build high performance trading venues and payment rails on top of the highest-throughput blockchain infrastructure layer in existence.",
		href: "https://blog.celestia.org/introducing-fibre-1tb-s-of-blockspace/",
		video: {
			webm: "/videos/fibre_blockspace.webm",
			safari: "/videos/fibre_blockspace_safari.mov",
		},
		reverse: true,
	},
];

const ExploreRow = ({ title, description, href, video, reverse, browserType }) => {
	const gradientDir = reverse ? "to left" : "to right";
	const gradient = `linear-gradient(${gradientDir}, #040207 0%, rgba(4,2,7,0.85) 15%, rgba(4,2,7,0.35) 35%, transparent 55%)`;

	return (
		<motion.div
			className={`relative grid rounded-lg border border-[rgba(226,232,240,0.1)] overflow-hidden ${
				reverse ? "md:pr-20" : "md:px-20 md:py-10"
			}`}
			style={{ gridTemplateColumns: "1fr" }}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: "-50px" }}
			variants={fadeUpVariants}
		>
			{/* Video — shares grid cell with text */}
			<div
				className='relative rounded-lg overflow-hidden hidden md:block aspect-video'
				style={{
					gridColumn: 1,
					gridRow: 1,
					width: reverse ? "68%" : "80%",
					marginLeft: reverse ? "0" : "auto",
					marginRight: reverse ? "auto" : "0",
					marginTop: reverse ? "0" : "-80px",
					alignSelf: "start",
				}}
			>
				{browserType === "safari" && (
					<video autoPlay loop muted playsInline preload='none' className='w-full h-full object-cover block'>
						{video.mobileSafari && (
							<source src={video.mobileSafari} type='video/quicktime' media='(max-width: 767px)' />
						)}
						<source src={video.safari} type='video/quicktime' />
					</video>
				)}
				{browserType === "other" && (
					<video autoPlay loop muted playsInline preload='none' className='w-full h-full object-cover block'>
						{video.mobileWebm && (
							<source src={video.mobileWebm} type='video/webm' media='(max-width: 767px)' />
						)}
						<source src={video.webm} type='video/webm' />
					</video>
				)}
				{/* Gradient overlay */}
				<div className='absolute inset-0 pointer-events-none rounded-lg' style={{ background: gradient }} />
			</div>

			{/* Text — shares grid cell, overlays video on desktop */}
			<div
				className='relative z-[1] max-w-[520px] flex flex-col justify-center gap-6 px-5 py-6 md:p-0'
				style={{
					gridColumn: 1,
					gridRow: 1,
					alignSelf: "center",
					marginLeft: reverse ? "auto" : undefined,
					marginRight: reverse ? "0" : undefined,
				}}
			>
				<h3 className='font-slussenExtended font-medium text-[32px] md:text-[40px] leading-[1.25] tracking-[-0.025em] text-[#FDFCFF]'>
					{title}
				</h3>
				<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#B0B7C0]'>
					{description}
				</p>
				<div className='self-start'>
					<Button href={href} variant='pill-primary' size='pill-md'>
						Learn More
					</Button>
				</div>
			</div>

			{/* Mobile video — below text, full width */}
			<div className='w-full rounded-lg overflow-hidden md:hidden mt-6'>
				{browserType === "safari" && (
					<video autoPlay loop muted playsInline preload='none' className='w-full h-full object-cover block'>
						{video.mobileSafari && <source src={video.mobileSafari} type='video/quicktime' />}
						<source src={video.safari} type='video/quicktime' />
					</video>
				)}
				{browserType === "other" && (
					<video autoPlay loop muted playsInline preload='none' className='w-full h-full object-cover block'>
						{video.mobileWebm && <source src={video.mobileWebm} type='video/webm' />}
						<source src={video.webm} type='video/webm' />
					</video>
				)}
			</div>
		</motion.div>
	);
};

const MarketStackSection = () => {
	const [browserType, setBrowserType] = useState(null);

	useEffect(() => {
		const browser = Bowser.getParser(window.navigator.userAgent);
		const browserName = browser.getBrowserName();
		const osName = browser.getOSName();
		const isIOS = osName === "iOS";
		const isSafari = browserName === "Safari";
		setBrowserType(isIOS || isSafari ? "safari" : "other");
	}, []);

	return (
		<section id='explore-celestia' data-header-theme='dark' className='bg-[#040207] pt-2 pb-16 md:pb-20'>
			<Container size='2xl' className='mb-8 md:mb-16'>
				<AnimatedHeadline text="Explore Celestia's Offerings" dark align="left" />
			</Container>

			<div className='flex flex-col gap-8'>
				{rows.map((row, index) => (
					<Container key={index} size='2xl'>
						<ExploreRow {...row} browserType={browserType} />
					</Container>
				))}
			</div>
		</section>
	);
};

export default MarketStackSection;
