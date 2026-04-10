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

const HomepageHero = () => {
	return (
		<section
			data-header-theme='dark'
			className='relative h-[620px] sm:h-screen sm:min-h-[700px] sm:max-h-[750px] md:min-h-[750px] md:max-h-[80vw] lg:max-h-[850px] xl:h-[55vw] xl:max-h-[900px] bg-[#050208] text-white overflow-hidden'
		>
			{/* Video background — absolute bottom, centered */}
			<motion.div
				className='absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none'
				style={{ background: "#050208" }}
				variants={fadeInVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				custom={0.3}
			>
				<div className='relative'>
					<video autoPlay loop muted playsInline className='block w-auto max-w-[90vw] h-auto'>
						<source src='/videos/hero-fibre.mp4' type='video/mp4' />
					</video>
					{/* Side edge blending via box-shadow */}
					<div
						className='absolute inset-0 z-[1] pointer-events-none'
						style={{
							boxShadow: "inset 80px 0 60px -20px #050208, inset -80px 0 60px -20px #050208",
						}}
					/>
					{/* Top gradient fade */}
					<div className='absolute top-0 left-0 right-0 h-[30%] z-[1] bg-gradient-to-b from-[#050208] to-transparent pointer-events-none' />
				</div>
			</motion.div>

			{/* Content */}
			<Container size='lg' className='relative z-10 h-full'>
				<div className='flex flex-col items-center gap-10 pt-[180px] md:pt-[180px]'>
					<div className='flex flex-col items-center gap-10 text-center px-4'>
						<motion.h1
							className='font-slussenExtended font-bold text-[28px] leading-[34px] tracking-[-1.5px] sm:text-[36px] sm:leading-[42px] sm:tracking-[-2px] md:text-[70px] md:leading-[78px] md:tracking-[-3px] text-white'
							variants={fadeUpVariants}
							initial='hidden'
							animate='visible'
							custom={0.1}
						>
							Scale is never your bottleneck.
						</motion.h1>

						<motion.p
							className='font-slussen text-[16px] leading-[24px] tracking-[-0.3px] sm:text-[18px] sm:leading-[28px] sm:tracking-[-0.4px] md:text-[26px] md:leading-[36px] md:tracking-[-0.8px] text-[#B0B7C0] max-w-[820px]'
							variants={fadeUpVariants}
							initial='hidden'
							animate='visible'
							custom={0.25}
						>
							Celestia Fibre provides up to 1 Tb/s of blockspace throughput: enough for billions of onchain transactions per second.
						</motion.p>
					</div>

					<motion.div
						className='flex items-center gap-4'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.4}
					>
						<Button href='/use-cases/' variant='pill-primary' size='pill-md'>
							Use Cases
						</Button>
						<Button href='/products/' variant='pill-outline' size='pill-md'>
							Products <ArrowRightSVG />
						</Button>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default HomepageHero;
