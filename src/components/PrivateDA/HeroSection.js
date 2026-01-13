"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import PrimaryButtonNew from "@/macros/Buttons/PrimaryButtonNew";
import GhostButtonNew from "@/macros/Buttons/GhostButtonNew";

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
	return (
		<section
			data-header-theme='light'
			className='relative h-screen sm:max-h-[800px] lg:max-h-[600px] xl:max-h-[800px] bg-white-weak overflow-hidden'
		>
			{/* Hero background image */}
			<motion.div
				className='absolute inset-0 pointer-events-none overflow-hidden'
				variants={fadeInVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				custom={0.3}
			>
				<img
					src='/images/app/private-da/private-da-hero-image.png'
					alt=''
					className='absolute bottom-0 right-0 max-sm:w-[170%] max-sm:max-w-[800px] max-sm:translate-x-[30%] sm:w-[750px] xl:w-[68%] h-auto max-w-[1200px] object-contain'
				/>
			</motion.div>

			{/* Content */}
			<Container size='lg' className='relative z-10 flex flex-col justify-start lg:justify-center h-full pt-40 pb-20 lg:py-24'>
				<div className='max-w-xl lg:max-w-2xl'>
					{/* Title */}
					<motion.h1
						className='font-untitledSans font-medium text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1] tracking-[-0.05em] text-black mb-6'
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
						className='font-untitledSans text-lg md:text-xl lg:text-2xl leading-[1.33] text-black mb-12'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.25}
					>
						Post privately. Prove publicly.
					</motion.p>

					{/* Buttons */}
					<motion.div
						className='flex flex-wrap items-center gap-4'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.4}
					>
						<PrimaryButtonNew href='#get-started' variant='purple'>
							Get Started
						</PrimaryButtonNew>
						<GhostButtonNew href='/contact/' variant='dark'>
							Talk to us
						</GhostButtonNew>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default HeroSection;
