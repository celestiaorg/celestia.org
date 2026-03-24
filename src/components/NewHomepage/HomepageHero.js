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

// Hero headline component — Slussen Extended display font
const HeroHeadline = ({ children }) => (
	<h1 className='font-slussenExtended font-medium text-[30px] xs:text-[34px] sm:text-[42px] md:text-[48px] leading-[1.15] tracking-[-1.5px] sm:tracking-[-2.5px] text-white'>{children}</h1>
);

// Hero subtitle component — Slussen body font
const HeroSubtitle = ({ children }) => (
	<p className='font-slussen text-[18px] md:text-[20px] leading-[1.5] tracking-[-0.5px] text-[#B0B7C0] text-center max-w-[700px]'>
		{children}
	</p>
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
		<section
			data-header-theme='dark'
			className='relative h-[780px] sm:h-screen sm:min-h-[700px] sm:max-h-[750px] md:min-h-[750px] md:max-h-[80vw] lg:max-h-[850px] xl:h-[55vw] xl:max-h-[900px] bg-[#040207] text-white overflow-hidden'
		>
			{/* Transparent video background - centered */}
			<motion.div
				className='absolute inset-x-0 top-[480px] sm:top-[400px] md:top-[380px] lg:top-[300px] xl:top-[240px] flex justify-center items-start'
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
					<div className='absolute left-0 top-0 bottom-0 w-[60px] lg:w-[100px] z-10 bg-gradient-to-r from-[#040207] to-transparent pointer-events-none' />
					{/* Right edge fade */}
					<div className='absolute right-0 top-0 bottom-0 w-[60px] lg:w-[100px] z-10 bg-gradient-to-l from-[#040207] to-transparent pointer-events-none' />
				</div>
			</motion.div>

			{/* Content */}
			<Container size='lg' className='relative z-10 h-full'>
				<div className='flex flex-col items-center gap-6 pt-[180px] md:pt-[180px]'>
					{/* Text content */}
					<div className='flex flex-col items-center gap-6 text-center px-4'>
						<motion.div variants={fadeUpVariants} initial='hidden' animate='visible' custom={0.1}>
							<HeroHeadline>
								Dedicated, high-throughput blockchains<br className='hidden md:inline' />
								for the most ambitious products.
							</HeroHeadline>
						</motion.div>
						<motion.div variants={fadeUpVariants} initial='hidden' animate='visible' custom={0.25}>
							<HeroSubtitle>
								Scale is never your bottleneck. Celestia provides up to 1 Tb/s of blockspace throughput: enough for billions of transactions per second.
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
						<Button href='/build/' variant='pill-primary' size='pill-md'>
							Use Cases
						</Button>
						<Button href='/contact/' variant='pill-outline' size='pill-md'>
							Get in Touch <ArrowRightSVG />
						</Button>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default HomepageHero;
