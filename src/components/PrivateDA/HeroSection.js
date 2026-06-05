"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

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
			data-header-theme='dark'
			className='relative min-h-[min(100svh,1100px)] md:min-h-[min(60svh,700px)] min-[1200px]:min-h-[min(100svh,900px)] bg-black-pure overflow-hidden flex flex-col'
		>
			{/* Orb video — bottom band on mobile (below text), anchored bottom-right on desktop. Matches prototype .pb-hero-orb sizing + left fade. */}
			<motion.div
				className='pointer-events-none absolute bottom-0 right-[4%] w-[92%] h-[46%] md:right-12 md:w-[70%] lg:w-[65%] md:h-[calc(100%-32px)] md:bottom-8 z-0'
				variants={fadeInVariants}
				initial='hidden'
				animate='visible'
				custom={0.3}
			>
				<video
					autoPlay
					muted
					loop
					playsInline
					className='absolute bottom-0 right-0 w-full h-full object-cover object-right-bottom block'
					style={{
						WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 38%)',
						maskImage: 'linear-gradient(to right, transparent 0%, #000 38%)',
					}}
				>
					<source src='/videos/privateda_hero_new.mp4' type='video/mp4' />
				</video>
			</motion.div>

			{/* Content row — freeze: aligns to the 1280px frozen content edge on wide screens */}
			<div className='relative z-[2] flex-1 mt-[min(20svh,200px)] pb-16 md:pb-20 lg:pb-[100px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px] flex items-start'>
				<div className='mx-auto w-full max-w-[1280px]'>
				<div className='flex flex-col items-start gap-7 max-w-[540px]'>
					<motion.h1
						className='font-slussenExtended font-medium text-white text-[44px] leading-[50px] tracking-[-2.5px] md:text-[56px] md:leading-[62px] md:tracking-[-3px] lg:text-[80px] lg:leading-[86px] lg:tracking-[-4.5px] m-0'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.1}
					>
						Private
						<br />
						Blockspace
					</motion.h1>

					<motion.p
						className='font-slussen text-[18px] leading-[1.6] tracking-[-0.2px] text-white/55 max-w-[400px] m-0'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.25}
					>
						Confidential onchain markets with publicly verifiable guarantees.
					</motion.p>

					<motion.div
						className='flex flex-wrap items-center gap-3'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.4}
					>
						<Button
							href='https://docs.celestia.org/build/private-blockspace/about/'
							variant='pill-primary'
							size='pill-md'
						>
							Get Started
						</Button>
						<Button href='/contact/' variant='pill-outline' size='pill-md'>
							Talk to us <span>→</span>
						</Button>
					</motion.div>
				</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
