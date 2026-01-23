"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Bowser from "bowser";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";

// Animation variants
const fadeUpVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

const fadeInVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

// Skeleton placeholder card for upcoming features
const SkeletonCard = ({ mediaPosition = "left", index = 0 }) => {
	const mediaOrderClass = mediaPosition === "left" ? "order-1" : "order-1 md:order-2";
	const textOrderClass = mediaPosition === "left" ? "order-2" : "order-2 md:order-1";
	const textPaddingClass =
		mediaPosition === "left"
			? "px-0 py-10 md:py-0 md:px-[40px] lg:pl-[160px] lg:pr-20"
			: "px-0 py-10 md:py-0 md:px-[40px] lg:pr-[160px] lg:pl-20";
	return (
		<motion.div
			className='relative overflow-hidden'
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: "-50px" }}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						duration: 0.5,
						delay: index * 0.15,
					},
				},
			}}
		>
			<div className='flex flex-col md:flex-row items-stretch'>
				{/* Media placeholder - matches video container dimensions */}
				<div
					className={`relative w-full md:w-1/2 h-[280px] md:h-auto md:aspect-square bg-[#17141A] flex items-center justify-center ${mediaOrderClass}`}
				>
					<div className='sm:ml-10 w-[90%] h-[90%] bg-[#1e1b23] rounded-[24px]' />
				</div>

				{/* Text skeleton - always left-aligned like real text, hidden on mobile */}
				<div className={`hidden md:flex flex-col gap-6 justify-center items-start w-full md:w-1/2 ${textPaddingClass} ${textOrderClass}`}>
					<div className='h-[48px] md:h-[57px] bg-[#27232c] rounded-[17px] w-[80%] max-w-[350px]' />
					<div className='flex flex-col gap-3 items-start w-full'>
						<div className='h-[16px] md:h-[19px] bg-[#27232c] rounded-[10px] w-[100%] max-w-[430px]' />
						<div className='h-[16px] md:h-[19px] bg-[#27232c] rounded-[10px] w-[95%] max-w-[410px]' />
						<div className='h-[16px] md:h-[19px] bg-[#27232c] rounded-[10px] w-[75%] max-w-[330px]' />
					</div>
					<div className='h-[37px] bg-[#27232c] rounded-[12px] w-[122px]' />
				</div>
			</div>

			{/* Gradient overlay - transparent at top, fades to bg color */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{ background: "linear-gradient(to bottom, transparent 0%, transparent 15%, #17141A 55%)" }}
			/>
		</motion.div>
	);
};

// Feature card component with alternating video/text layout
const FeatureCard = ({
	title,
	description,
	videoSrc,
	webmSrc,
	safariSrc,
	mediaPosition = "left",
	buttons = [],
	index = 0,
	browserType,
	isSquare = false,
}) => {
	const mediaOrderClass = mediaPosition === "left" ? "order-1" : "order-1 md:order-2";
	const textOrderClass = mediaPosition === "left" ? "order-2" : "order-2 md:order-1";
	// When text is on the right (video left): no right padding. When text is on the left (video right): no left padding
	const textPaddingClass =
		mediaPosition === "left" ? "px-0 py-10 md:py-0 md:px-[40px] lg:pl-[160px] lg:pr-0" : "px-0 py-10 md:py-0 md:px-[40px] lg:pr-[160px] lg:pl-0";

	// Determine video container classes based on aspect ratio
	const videoContainerClass = isSquare
		? "relative w-full md:w-1/2 aspect-square bg-[#17141A] flex items-center justify-center"
		: "relative w-full md:w-1/2 h-[400px] md:h-[650px] bg-[#f7f7f7]";

	// Render cross-browser video if webmSrc and safariSrc are provided
	const renderVideo = () => {
		// If we have cross-browser sources
		if (webmSrc && safariSrc) {
			// Wait for browser detection before rendering
			if (!browserType) return null;

			// Safari/iOS uses HEVC MOV, others use WebM VP9
			if (browserType === "safari") {
				return (
					<video autoPlay loop muted playsInline className='w-full h-full object-contain'>
						<source src={safariSrc} type='video/quicktime' />
					</video>
				);
			}
			return (
				<video autoPlay loop muted playsInline className='w-full h-full object-contain'>
					<source src={webmSrc} type='video/webm' />
				</video>
			);
		}
		// Fallback to single source (MP4)
		if (videoSrc) {
			return (
				<video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover'>
					<source src={videoSrc} type='video/mp4' />
				</video>
			);
		}
		return null;
	};

	return (
		<motion.div
			className='flex flex-col md:flex-row items-stretch'
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: "-50px" }}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						duration: 0.5,
						delay: index * 0.15,
						staggerChildren: 0.2,
					},
				},
			}}
		>
			{/* Video */}
			<motion.div className={`${videoContainerClass} ${mediaOrderClass}`} variants={fadeInVariants}>
				{renderVideo()}
			</motion.div>

			{/* Text content */}
			<motion.div
				className={`flex flex-col gap-6 justify-center w-full md:w-1/2 ${textPaddingClass} ${textOrderClass}`}
				variants={fadeUpVariants}
			>
				<h3 className='font-untitledSans font-medium text-[32px] md:text-[40px] lg:text-[48px] leading-tight tracking-[-0.04em] text-white'>
					{title}
				</h3>
				<p className='font-untitledSans text-[16px] md:text-[18px] leading-[1.55] text-[#F5EDFE]'>{description}</p>
				<div className='flex flex-wrap items-center gap-4'>
					{buttons.map((button, btnIndex) => (
						<Button key={btnIndex} href={button.href} variant={button.variant === "subtle" ? "subtle" : "primary"} theme='dark' size='lg'>
							{button.label}
							{button.showArrow && <ArrowRightSVG />}
						</Button>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
};

const MarketStackSection = () => {
	const [browserType, setBrowserType] = useState(null);

	useEffect(() => {
		const browser = Bowser.getParser(window.navigator.userAgent);
		const browserName = browser.getBrowserName();
		const osName = browser.getOSName();

		// iOS uses WebKit for ALL browsers (Apple requirement)
		// So any iOS browser needs HEVC MOV, same as Safari
		const isIOS = osName === "iOS";
		const isSafari = browserName === "Safari";

		if (isIOS || isSafari) {
			setBrowserType("safari");
		} else {
			setBrowserType("other");
		}
	}, []);

	const features = [
		{
			title: "Confidentiality",
			description:
				"Celestia Private Blockspace makes it possible to build verifiably private onchain finance apps that can leverage millisecond latency speeds, yet keep balances, positions, and order sizes confidential.",
			webmSrc: "/videos/privateda.webm",
			safariSrc: "/videos/privateda_safari.mov",
			mediaPosition: "left",
			isSquare: true,
			buttons: [{ label: "Learn more", href: "/private-blockspace/", variant: "subtle" }],
		},
		// {
		// 	title: "Interoperability",
		// 	description: "Instant access to assets anywhere with Celestia Lazybridging.",
		// 	videoSrc: "/videos/home/CE_Under.mp4",
		// 	mediaPosition: "right",
		// 	buttons: [{ label: "Learn More", href: "/learn/", variant: "subtle" }],
		// },
		// {
		// 	title: "Programmable Liquidity",
		// 	description:
		// 		"Eden is the native execution environment of the Celestia network. Serving as the hub for TIA DeFi, Eden enables anyone to directly deploy and use applications in a credibly neutral environment.",
		// 	videoSrc: "/videos/home/CE_ACCESS_new.mp4",
		// 	mediaPosition: "left",
		// 	buttons: [
		// 		{ label: "Learn More", href: "/learn/", variant: "" },
		// 		{ label: "Developer Docs", href: "/developers/", variant: "subtle", showArrow: true },
		// 	],
		// },
	];

	return (
		<section data-header-theme='dark' className='bg-[#17141A] '>
			{/* Section title */}
			<Container size='lg' className='pt-[40px] pb-[20px] md:py-[80px]'>
				<motion.h2
					className='font-untitledSans font-medium text-[36px] md:text-[48px] lg:text-[64px] leading-tight tracking-[-0.07em] text-[#F5EDFE] text-center max-sm:text-pretty'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-100px" }}
					variants={fadeUpVariants}
				>
					Explore Celestia&apos;s Market Stack
				</motion.h2>
			</Container>

			{/* Feature cards - containerized */}
			<Container size='lg'>
				<div className='flex flex-col'>
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							index={index}
							title={feature.title}
							description={feature.description}
							videoSrc={feature.videoSrc}
							webmSrc={feature.webmSrc}
							safariSrc={feature.safariSrc}
							mediaPosition={feature.mediaPosition}
							buttons={feature.buttons}
							browserType={browserType}
							isSquare={feature.isSquare}
						/>
					))}
				</div>

				{/* Skeleton placeholder for upcoming feature */}
				<div className='relative bg-[#17141A] pb-[40px] pd:mb-0'>
					<SkeletonCard mediaPosition='right' index={1} />

					{/* More coming soon - positioned at center bottom */}
					<motion.div
						className='absolute bottom-20 md:bottom-40 left-0 right-0 flex items-center justify-center gap-4'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-50px" }}
						variants={fadeInVariants}
					>
						<div className='flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(245,237,254,0.2)]' />
						<span className='font-untitledSans font-medium text-[14px] md:text-[16px] uppercase tracking-[0.15em] text-[#756d7e] opacity-50'>
							More coming soon
						</span>
						<div className='flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(245,237,254,0.2)]' />
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default MarketStackSection;
