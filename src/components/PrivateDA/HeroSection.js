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
			className='relative min-h-[min(100svh,1100px)] md:min-h-[100svh] min-[1200px]:min-h-[min(100svh,900px)] bg-black-pure overflow-hidden flex flex-col'
		>
			{/* Orb video — mobile (≤768): full-bleed bottom band behind the centered
			    text (prototype .pb-hero-orb Round-4: left/right 0, bottom 0, height
			    min(100vw,58svh), object centered-bottom, with a top scrim that
			    feathers the band's top edge into the black hero). md+: anchored
			    bottom-right with a left fade. A mobile-cropped clip is swapped in
			    under 768px (prototype serves privateda-mobile.mp4 the same way). */}
			<motion.div
				className='pointer-events-none absolute z-0 max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:w-full max-md:h-[min(100vw,58svh)] max-md:overflow-hidden md:right-0 md:bottom-8 md:w-[70%] min-[1101px]:w-[65%] md:h-[calc(100%-32px)]'
				variants={fadeInVariants}
				initial='hidden'
				animate='visible'
				custom={0.3}
			>
				{/* Mobile: exact prototype geometry (.pb-hero .pb-hero-orb video) — the
				    atom sits at ~74% x in this 1080² clip, so it is widened to 200%
				    and shifted left by 49% (left:0 + translateX(-49%)) to land the
				    atom dead-centre and bottom-flush. object-position center center.
				    md+: video fills the wrapper with a left fade mask. */}
				<video
					autoPlay
					muted
					loop
					playsInline
					className='safari-tone absolute inset-0 h-full object-cover block max-md:left-0 max-md:right-auto max-md:w-[200%] max-md:max-w-none max-md:-translate-x-[49%] max-md:object-center md:w-full md:object-right-bottom md:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_38%)] md:[mask-image:linear-gradient(to_right,transparent_0%,#000_38%)]'
				>
					<source src='/videos/privateda_mobile.mp4' type='video/mp4' media='(max-width: 768px)' />
					<source src='/videos/privateda_hero_new.mp4' type='video/mp4' />
				</video>
				{/* Top scrim — mobile only: dissolves the band's top edge into the hero
				    black (prototype .pb-hero-orb::after { background: linear-gradient(#000,transparent); height:52% }).
				    Must be true #000000 — the theme's `black` token is #17141A, which
				    would tint the edge grey. */}
				<div className='md:hidden absolute inset-x-0 top-0 h-[52%] z-[1] bg-gradient-to-b from-[#000000] to-transparent pointer-events-none' />
			</motion.div>

			{/* Content row — mobile: top-anchored at 116px (prototype --m-hero-top,
			    clears the navbar) and centered. md+: aligns to the 1280px frozen
			    content edge, left-aligned, vertically offset. */}
			<div className='relative z-[2] flex-1 max-md:pt-[116px] md:mt-[min(20svh,200px)] pb-16 md:pb-20 lg:pb-[100px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px] flex items-start'>
				<div className='mx-auto w-full max-w-[1280px]'>
				<div className='flex flex-col items-start gap-7 max-w-[540px] max-md:items-center max-md:text-center max-md:mx-auto max-md:max-w-full'>
					<motion.h1
						className='font-slussenExtended font-medium text-white text-[31px] min-[431px]:text-[36px] leading-[1.12] tracking-[-0.04em] md:text-[56px] md:leading-[62px] md:tracking-[-3px] lg:text-[80px] lg:leading-[86px] lg:tracking-[-4.5px] m-0'
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
						className='font-slussen text-[17px] min-[431px]:text-[18px] leading-[1.4] md:leading-[1.6] tracking-[-0.2px] text-white/55 max-w-[400px] m-0'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.25}
					>
						Confidential onchain markets with publicly verifiable guarantees.
					</motion.p>

					<motion.div
						className='flex flex-wrap items-center gap-3 max-md:justify-center'
						variants={fadeUpVariants}
						initial='hidden'
						animate='visible'
						custom={0.4}
					>
						<Button
							href='/get-started/'
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
