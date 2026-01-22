"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Bowser from "bowser";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";

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

const HeroSection = () => {
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
		<section
			data-header-theme='dark'
			className='relative h-screen min-h-[770px] max-h-[900px] sm:max-h-[600px] lg:max-h-[600px] xl:max-h-[800px] bg-[#17141A] overflow-hidden'
		>
			{/* Content */}
			<Container size='lg' className='relative h-full pt-40 pb-20 lg:py-24'>
				{/* Hero background video - Desktop/Tablet */}
				<motion.div
					className='hidden sm:block absolute inset-0 pointer-events-none overflow-visible'
					variants={fadeInVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					custom={0.3}
				>
					<div className='absolute top-0 right-0 translate-x-[-5%] translate-y-[10%] sm:w-[950px] sm:translate-x-[2%] sm:translate-y-[5%] lg:translate-x-[-5%] lg:translate-y-[10%] xl:w-[90%] max-w-[1600px]'>
						{/* Safari: HEVC MOV with embedded bg color */}
						{browserType === "safari" && (
							<video autoPlay loop muted playsInline className='w-full h-auto'>
								<source src='/videos/privateda_hero_safari.mov' type='video/quicktime' />
							</video>
						)}
						{/* Chrome/Firefox/Edge: WebM VP9 with alpha */}
						{browserType === "other" && (
							<video autoPlay loop muted playsInline className='w-full h-auto'>
								<source src='/videos/privateda_hero.webm' type='video/webm' />
							</video>
						)}
					</div>
				</motion.div>

				{/* Hero background video - Mobile (1:1 ratio) */}
				<motion.div
					className='sm:hidden absolute inset-0 pointer-events-none overflow-visible'
					variants={fadeInVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					custom={0.3}
				>
					<div className='absolute top-[380px] left-1/2 -translate-x-1/2 w-[120%] max-w-[500px]'>
						{/* Safari: HEVC MOV with embedded bg color */}
						{browserType === "safari" && (
							<video autoPlay loop muted playsInline className='w-full h-auto'>
								<source src='/videos/privateda_safari.mov' type='video/quicktime' />
							</video>
						)}
						{/* Chrome/Firefox/Edge: WebM VP9 with alpha */}
						{browserType === "other" && (
							<video autoPlay loop muted playsInline className='w-full h-auto'>
								<source src='/videos/privateda.webm' type='video/webm' />
							</video>
						)}
					</div>
				</motion.div>

				<div className='relative z-10 flex flex-col justify-start lg:justify-center h-full'>
					<div className='max-w-xl lg:max-w-2xl'>
						{/* Title */}
						<motion.h1
							className='font-untitledSans font-medium text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1] tracking-[-0.05em] text-white mb-6'
							variants={fadeUpVariants}
							initial='hidden'
							animate='visible'
							custom={0.1}
						>
							Private
							<br />
							Blockspace
						</motion.h1>

						{/* Subtitle */}
						<motion.p
							className='font-untitledSans text-lg md:text-xl lg:text-2xl leading-[1.33] text-[#F5EDFE] mb-12 max-w-[433px]'
							variants={fadeUpVariants}
							initial='hidden'
							animate='visible'
							custom={0.25}
						>
							Confidential onchain markets with public guarantees.
						</motion.p>

						{/* Buttons */}
						<motion.div
							className='flex flex-wrap items-center gap-4'
							variants={fadeUpVariants}
							initial='hidden'
							animate='visible'
							custom={0.4}
						>
							<Button href='#get-started' variant='primary' theme='light' size='lg'>
								Get Started
							</Button>
							<Button href='/contact/' variant='subtle' theme='dark' size='lg'>
								Talk to us <ArrowRightSVG />
							</Button>
						</motion.div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default HeroSection;
