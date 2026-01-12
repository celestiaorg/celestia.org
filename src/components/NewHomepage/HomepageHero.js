"use client";

import { motion } from "framer-motion";
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
	return (
		<section data-header-theme='dark' className='relative h-screen max-h-[900px] bg-[#04070B] text-white overflow-hidden'>
			{/* Video background - absolutely positioned, shifted down, centered and max 1800px */}
			<motion.div
				className='absolute inset-x-0 top-[50%] lg:top-[30%] xl:top-[20%] bottom-0 flex justify-center max-w-[1800px] mx-auto'
				variants={fadeInVariants}
				initial='hidden'
				animate='visible'
				custom={0.3}
			>
				<video autoPlay loop muted playsInline className='w-full h-full object-contain md:object-cover object-top'>
					<source src='/videos/home-hero-new.mp4' type='video/mp4' />
				</video>
				{/* Left edge fade - only visible on xl screens and above */}
				<div className='hidden xl:block absolute left-0 top-0 bottom-0 w-[60px] z-10 bg-gradient-to-r from-[#04070B] to-transparent pointer-events-none' />
				{/* Right edge fade - only visible on xl screens and above */}
				<div className='hidden xl:block absolute right-0 top-0 bottom-0 w-[60px] z-10 bg-gradient-to-l from-[#04070B] to-transparent pointer-events-none' />
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
