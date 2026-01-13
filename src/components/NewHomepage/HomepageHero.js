"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Bowser from "bowser";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

// Animation variants
const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

const fadeInVariants = {
	hidden: { opacity: 0 },
	visible: (delay = 0) => ({
		opacity: 1,
		transition: {
			duration: 1,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

// Hero headline component with specific styling from Figma
const HeroHeadline = ({ children }) => (
	<h1 className='font-untitledSans font-medium text-[48px] md:text-[64px] lg:text-[88px] leading-[1] tracking-[-0.05em] text-white'>{children}</h1>
);

// Hero subtitle component
const HeroSubtitle = ({ children }) => (
	<p className='font-untitledSans text-[18px] md:text-[20px] lg:text-[24px] leading-[1.33] text-[#b8b8b8] text-center max-w-[672px]'>{children}</p>
);

const HomepageHero = () => {
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

	return (
		<section data-header-theme='dark' className='relative h-screen max-h-[900px] bg-[#17141A] text-white overflow-hidden'>
			{/* Transparent video background - centered */}
			<motion.div
				className='absolute inset-x-0 top-[380px] md:top-[40%] lg:top-[25%] xl:top-[15%] flex justify-center items-start'
				variants={fadeInVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				custom={0.3}
			>
				<div className='relative w-full max-w-[1680px]'>
					{/* Safari: HEVC MOV with alpha */}
					{browserType === "safari" && (
						<video autoPlay loop muted playsInline className='w-full h-auto'>
							<source src='/videos/fiber_hero_safari.mov' type='video/quicktime' media='(min-width: 768px)' />
							<source src='/videos/fiber_hero_safari_mobile.mov' type='video/quicktime' />
						</video>
					)}
					{/* Chrome/Firefox/Edge: WebM VP9 with alpha */}
					{browserType === "other" && (
						<video autoPlay loop muted playsInline className='w-full h-auto'>
							<source src='/videos/fiber_hero_premium.webm' type='video/webm' media='(min-width: 768px)' />
							<source src='/videos/fiber_hero_mobile.webm' type='video/webm' />
						</video>
					)}
					{/* Left edge fade */}
					<div className='absolute left-0 top-0 bottom-0 w-[60px] lg:w-[100px] z-10 bg-gradient-to-r from-[#17141A] to-transparent pointer-events-none' />
					{/* Right edge fade */}
					<div className='absolute right-0 top-0 bottom-0 w-[60px] lg:w-[100px] z-10 bg-gradient-to-l from-[#17141A] to-transparent pointer-events-none' />
				</div>
			</motion.div>

			{/* Content */}
			<Container size='lg' className='relative z-10 h-full'>
				<div className='flex flex-col items-center gap-10 pt-[180px] md:pt-[180px]'>
					{/* Text content */}
					<div className='flex flex-col items-center gap-8 sm:gap-2 text-center'>
						<motion.div variants={fadeUpVariants} initial='hidden' animate='visible' custom={0.1}>
							<HeroHeadline>Cut Ahead.</HeroHeadline>
						</motion.div>
						<motion.div variants={fadeUpVariants} initial='hidden' animate='visible' custom={0.25}>
							<HeroSubtitle>
								Celestia is the L1 for specialised onchain markets, enabling fibre optic performance with millisecond latency.
							</HeroSubtitle>
						</motion.div>
					</div>

					{/* CTA buttons */}
					<motion.div
						className='flex flex-wrap items-center justify-center gap-4'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.4}
					>
						<PrimaryButton href='/build/' variant='purple' size='xl' noBorder>
							Start Building
						</PrimaryButton>
						<PrimaryButton href='/contact/' variant='ghost' size='xl' showArrow>
							Get in Touch
						</PrimaryButton>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default HomepageHero;
