"use client";

import { motion } from "framer-motion";
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

const BuildHero = () => {
	return (
		<section
			data-header-theme='dark'
			className='relative h-screen max-h-[900px] sm:max-h-[600px] lg:max-h-[600px] xl:max-h-[900px] bg-[#17141A] text-white flex items-end pb-20 md:pb-64 lg:pb-80 overflow-hidden'
		>
			{/* Background image with mix-blend-lighten */}
			<motion.div
				className='absolute inset-0 pointer-events-none mix-blend-lighten bg-no-repeat bg-cover bg-[60%_center] sm:bg-[45%_center] md:bg-center'
				style={{
					backgroundImage: "url('/images/app/build/build-hero-new-image.png')",
				}}
				variants={fadeInVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				custom={0.3}
			/>

			{/* Top-left gradient overlay for mobile */}
			<div
				className='absolute inset-0 pointer-events-none md:hidden'
				style={{
					background: "radial-gradient(ellipse at top left, rgba(23,20,26,0.8) 0%, transparent 40%)",
				}}
			/>

			{/* Content */}
			<Container size='lg' className='relative z-10'>
				<div className='flex flex-col gap-6 md:gap-8'>
					{/* Heading */}
					<motion.h1
						className='font-untitledSans font-medium text-[48px] md:text-[72px] lg:text-[88px] leading-[1] tracking-[-3px] md:tracking-[-4px] lg:tracking-[-5px] text-white'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.1}
					>
						Get
						<br />
						Started
					</motion.h1>

					{/* Button group */}
					<motion.div
						className='flex flex-wrap gap-2 md:gap-4 items-center'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.25}
					>
						<Button href='#dev-resources' variant='primary' theme='dark' size='lg'>
							Build Custom
						</Button>
						<Button href='#frameworks' variant='outline' theme='dark' size='lg'>
							Build on a Framework <ArrowRightSVG />
						</Button>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default BuildHero;
