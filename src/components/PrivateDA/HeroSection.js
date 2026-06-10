"use client";

import { useEffect, useRef } from "react";
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
	const videoRef = useRef(null);

	// Responsive source swap — Safari does NOT reliably honour <source media>, so
	// pick the source in JS (works in Safari + Chromium). ≤768px → portrait mobile
	// clip (privatebs-mobile.mp4, 1080×1780); above → wide desktop (privatebs.mp4,
	// 1920×890). Matches the prototype's pbHeroVideo swap script.
	useEffect(() => {
		const v = videoRef.current;
		if (!v) return;
		const mq = window.matchMedia("(max-width: 768px)");
		const DESKTOP = "/videos/privatebs.mp4";
		const MOBILE = "/videos/privatebs-mobile.mp4";
		const apply = () => {
			const want = mq.matches ? MOBILE : DESKTOP;
			if ((v.currentSrc || "").indexOf(want) === -1) {
				v.src = want;
				v.load();
				const p = v.play();
				if (p && p.catch) p.catch(() => {});
			}
		};
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);

	return (
		<section
			data-header-theme='dark'
			className='relative min-h-[min(100svh,1100px)] md:min-h-[100svh] min-[1200px]:min-h-[min(100svh,900px)] bg-black-pure overflow-hidden flex flex-col'
		>
			{/* Orb video — mobile (≤768): the orb fills the whole hero, cover-filling
			    with the dedicated portrait source (privatebs-mobile.mp4, 1080×1780 —
			    atom already upright + centred), anchored bottom, with a 52% top scrim
			    feathering the orb into the black hero (prototype Round-4 REV-4). md+:
			    anchored bottom-right (right:48px, bottom:32px, width:65%), the wide
			    source (privatebs.mp4, 1920×890) object-contained + scaled 1.45 from the
			    bottom-right corner so the atom reads big without overscaling/escaping
			    the top, with a left fade mask. */}
			<motion.div
				className='pointer-events-none absolute z-0 inset-0 overflow-hidden md:inset-auto md:right-12 md:bottom-8 md:w-[65%] md:h-[calc(100%-32px)]'
				variants={fadeInVariants}
				initial='hidden'
				animate='visible'
				custom={0.3}
			>
				<video
					ref={videoRef}
					autoPlay
					muted
					loop
					playsInline
					className='absolute inset-0 w-full h-full object-cover object-bottom block md:object-contain md:object-[right_bottom] md:scale-[1.45] md:origin-bottom-right md:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_38%)] md:[mask-image:linear-gradient(to_right,transparent_0%,#000_38%)]'
				>
					{/* Default source for SSR / no-JS; the effect above swaps in the
					    portrait clip on ≤768px viewports. */}
					<source src='/videos/privatebs.mp4' type='video/mp4' />
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
