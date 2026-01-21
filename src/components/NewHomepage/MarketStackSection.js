"use client";

import { motion } from "framer-motion";
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

// Feature card component with alternating video/text layout
const FeatureCard = ({ title, description, videoSrc, mediaPosition = "left", buttons = [], index = 0 }) => {
	const mediaOrderClass = mediaPosition === "left" ? "order-1" : "order-1 md:order-2";
	const textOrderClass = mediaPosition === "left" ? "order-2" : "order-2 md:order-1";

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
			<motion.div className={`relative w-full md:w-1/2 h-[400px] md:h-[650px] bg-[#f7f7f7] ${mediaOrderClass}`} variants={fadeInVariants}>
				<video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover'>
					<source src={videoSrc} type='video/mp4' />
				</video>
			</motion.div>

			{/* Text content */}
			<motion.div
				className={`flex flex-col gap-6 justify-center w-full md:w-1/2 px-6 py-10 md:px-[80px] lg:px-[120px] xl:px-[200px] ${textOrderClass}`}
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
	const features = [
		{
			title: "Confidentiality",
			description:
				"Celestia Private Blockspace makes it possible to build verifiably private onchain finance apps that can leverage millisecond latency speeds, yet keep balances, positions, and order sizes confidential.",
			videoSrc: "/videos/home/CE_BLOB.mp4",
			mediaPosition: "left",
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
		<section data-header-theme='light' className='bg-[#17141A] '>
			{/* Section title */}
			<Container size='lg' className='py-[60px] md:py-[80px]'>
				<motion.h2
					className='font-untitledSans font-medium text-[36px] md:text-[48px] lg:text-[64px] leading-tight tracking-[-0.07em] text-[#F5EDFE] text-center'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-100px" }}
					variants={fadeUpVariants}
				>
					Explore Celestia&apos;s Market Stack
				</motion.h2>
			</Container>

			{/* Feature cards - full width */}
			<div className='flex flex-col'>
				{features.map((feature, index) => (
					<FeatureCard
						key={index}
						index={index}
						title={feature.title}
						description={feature.description}
						videoSrc={feature.videoSrc}
						mediaPosition={feature.mediaPosition}
						buttons={feature.buttons}
					/>
				))}
			</div>
		</section>
	);
};

export default MarketStackSection;
