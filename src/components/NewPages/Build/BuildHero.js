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

const BuildHero = () => {
	return (
		<section
			data-header-theme='dark'
			className='relative h-screen md:max-h-[900px] bg-[#17141A] text-white flex items-end pb-48 md:pb-64 lg:pb-80 overflow-hidden'
		>
			{/* Background image with mix-blend-lighten */}
			<motion.div
				className='absolute inset-0 pointer-events-none'
				variants={fadeInVariants}
				initial='hidden'
				animate='visible'
				custom={0.3}
			>
				<div
					className='absolute inset-0 mix-blend-lighten bg-no-repeat bg-cover bg-[45%_center] md:bg-center'
					style={{
						backgroundImage: "url('/images/app/build/build-hero-new-image.png')",
					}}
				/>
			</motion.div>

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
						started
					</motion.h1>

					{/* Button group */}
					<motion.div
						className='flex flex-wrap gap-2 md:gap-4 items-center'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.25}
					>
						<PrimaryButton href='#build-custom' variant='purple' size='xl'>
							Build Custom
						</PrimaryButton>
						<PrimaryButton href='#build-framework' variant='ghost' size='xl' showArrow>
							Build on a Framework
						</PrimaryButton>
						<PrimaryButton href='#deploy' variant='ghost' size='xl' showArrow>
							Deploy
						</PrimaryButton>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default BuildHero;
