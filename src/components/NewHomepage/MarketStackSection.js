"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Bowser from "bowser";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";

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

const MarketStackSection = () => {
	const [browserType, setBrowserType] = useState(null);

	useEffect(() => {
		const browser = Bowser.getParser(window.navigator.userAgent);
		const browserName = browser.getBrowserName();
		const osName = browser.getOSName();

		const isIOS = osName === "iOS";
		const isSafari = browserName === "Safari";

		if (isIOS || isSafari) {
			setBrowserType("safari");
		} else {
			setBrowserType("other");
		}
	}, []);

	return (
		<section data-header-theme='dark' className='bg-[#040207] py-16 md:py-20 overflow-hidden'>
			{/* Section title */}
			<Container size='lg' className='mb-4 md:mb-0 md:-mb-5 relative z-[2]'>
				<motion.h3
					className='font-slussen font-medium text-[24px] tracking-[-0.5px] text-white/50'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
				>
					Explore Celestia&apos;s Market Stack
				</motion.h3>
			</Container>

			{/* Mobile layout — stacked: video then text */}
			<div className='block md:hidden'>
				<Container size='lg'>
					{/* Square video for mobile */}
					<motion.div
						className='w-full max-w-[85%] mx-auto pointer-events-none mb-4'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						variants={fadeInVariants}
					>
						{browserType === "safari" && (
							<video autoPlay loop muted playsInline className='w-full h-auto block'>
								<source src='/videos/privateda_market_stack_mobile_safari.mov' type='video/quicktime' />
							</video>
						)}
						{browserType === "other" && (
							<video autoPlay loop muted playsInline className='w-full h-auto block'>
								<source src='/videos/privateda_market_stack_mobile.webm' type='video/webm' />
							</video>
						)}
					</motion.div>

					{/* Text content */}
					<motion.div
						className='flex flex-col gap-6'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-50px" }}
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: { staggerChildren: 0.2 },
							},
						}}
					>
						<motion.h3
							className='font-slussenExtended font-medium text-[32px] leading-[1] tracking-[-2px] text-white'
							variants={fadeUpVariants}
						>
							Confidentiality
						</motion.h3>
						<motion.p
							className='font-slussen text-[18px] leading-[1.4] text-[#B0B7C0]'
							variants={fadeUpVariants}
						>
							Celestia Private Blockspace makes it possible to build verifiably private onchain markets that can leverage millisecond latency speeds, yet keep balances, positions, and order sizes confidential.
						</motion.p>
						<motion.div className='self-start' variants={fadeUpVariants}>
							<Button href='/private-blockspace/' variant='pill-primary' size='pill-md'>
								Learn More
							</Button>
						</motion.div>
					</motion.div>
				</Container>
			</div>

			{/* Desktop layout — text overlaying video */}
			<Container size='lg' className='relative min-h-[500px] hidden md:flex items-center overflow-visible'>
				{/* Text content — on top */}
				<motion.div
					className='relative z-[1] max-w-[520px] flex flex-col gap-6 mt-20'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-50px" }}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: 0.2 },
						},
					}}
				>
					<motion.h3
						className='font-slussenExtended font-medium text-[40px] lg:text-[48px] leading-[1] tracking-[-3px] text-white'
						variants={fadeUpVariants}
					>
						Confidentiality
					</motion.h3>
					<motion.p
						className='font-slussen text-[20px] leading-[1.4] text-[#B0B7C0]'
						variants={fadeUpVariants}
					>
						Celestia Private Blockspace makes it possible to build verifiably private onchain markets that can leverage millisecond latency speeds, yet keep balances, positions, and order sizes confidential.
					</motion.p>
					<motion.div className='self-start' variants={fadeUpVariants}>
						<Button href='/private-blockspace/' variant='pill-primary' size='pill-md'>
							Learn More
						</Button>
					</motion.div>
				</motion.div>

				{/* Desktop widescreen video — absolute */}
				<motion.div
					className='absolute top-1/2 right-0 -translate-y-1/2 w-[75%] pointer-events-none'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeInVariants}
				>
					{browserType === "safari" && (
						<video autoPlay loop muted playsInline className='w-full h-auto block'>
							<source src='/videos/privateda_market_stack_safari.mov' type='video/quicktime' />
						</video>
					)}
					{browserType === "other" && (
						<video autoPlay loop muted playsInline className='w-full h-auto block'>
							<source src='/videos/privateda_market_stack.webm' type='video/webm' />
						</video>
					)}

					{/* Left-to-right gradient fade so video blends under text */}
					<div
						className='absolute inset-0 pointer-events-none'
						style={{
							background: "linear-gradient(to right, #040207 0%, rgba(4,2,7,0.85) 15%, rgba(4,2,7,0.35) 35%, transparent 55%)",
						}}
					/>
				</motion.div>
			</Container>
		</section>
	);
};

export default MarketStackSection;
