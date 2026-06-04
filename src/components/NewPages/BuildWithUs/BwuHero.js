"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
	}),
};

/**
 * BwuHero — light/frost hero (prototype .about-hero.bwu-hero).
 * Full-viewport frost island over the dark page body, 1px bottom divider.
 * Left column: muted "Build with Us" eyebrow, 46px long title, 18px lead,
 * body paragraph, dark pill CTA. Background video pinned to the right edge.
 */
const BwuHero = () => {
	const videoRef = useRef(null);

	// Background video — slightly faster, with fade in/out locked to the
	// video's real playback time so the fades always land on the loop seam.
	useEffect(() => {
		const vid = videoRef.current;
		if (!vid) return;
		vid.playbackRate = 1.25;
		const FADE = 0.9; // seconds of fade at each end (intrinsic timeline)
		vid.style.opacity = "0";
		let rafId;
		const tick = () => {
			const d = vid.duration;
			if (d && !isNaN(d)) {
				const t = vid.currentTime;
				let o = 1;
				if (t < FADE) o = t / FADE;
				else if (t > d - FADE) o = (d - t) / FADE;
				vid.style.opacity = Math.max(0, Math.min(1, o)).toFixed(3);
			}
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, []);

	return (
		<section
			data-header-theme='light'
			className='relative flex min-h-screen flex-col overflow-hidden border-b border-black/[0.08] bg-[#FDFCFF] px-6 pt-[140px] pb-[60px] min-[600px]:px-[60px] min-[600px]:pt-40 min-[600px]:pb-20 min-[1200px]:px-[120px] min-[1200px]:pt-[clamp(150px,24vh,260px)] min-[1200px]:pb-[clamp(48px,8vh,100px)]'
		>
			{/* Background video — pinned to the right edge (prototype: right: -8%) */}
			<video
				ref={videoRef}
				className='pointer-events-none absolute right-[-8%] top-0 z-[1] h-full w-auto max-w-none'
				autoPlay
				muted
				loop
				playsInline
			>
				{/* Safari decodes the HEVC .mov; Chrome/others skip quicktime and
				    fall through to the VP9 .webm */}
				<source src='/videos/bwu-anim_safari.mov' type='video/quicktime' />
				<source src='/videos/bwu-anim.webm' type='video/webm' />
			</video>

			{/* Content — single column, parent gap (20px) governs the stack,
			    CTA gets the loose gap via mt (prototype two-step rhythm). */}
			<motion.div
				className='relative z-[2] flex max-w-[620px] flex-col items-start gap-5'
				initial='hidden'
				animate='visible'
			>
				<motion.h1
					className='font-slussen text-[20px] font-medium leading-[1.25] tracking-[-0.025em] text-black/40 md:text-[24px]'
					variants={fadeUp}
					custom={0.1}
				>
					Build with Us
				</motion.h1>
				<motion.h2
					className='font-slussenExtended text-[27px] font-medium leading-[1.15] tracking-[-0.04em] text-[#0E1014] min-[430px]:text-[30px] min-[768px]:text-[32px] min-[1024px]:text-[46px] min-[1024px]:leading-[1.1]'
					variants={fadeUp}
					custom={0.2}
				>
					Your blockchain.
					<br />
					Built by us.
					<br />
					Owned by you.
				</motion.h2>
				<motion.p
					className='font-slussen text-[16px] font-normal leading-[1.5] tracking-[-0.01em] text-[#4A5058] min-[768px]:text-[18px]'
					variants={fadeUp}
					custom={0.3}
				>
					Celestia partners with enterprises to design, build, and ship high-throughput custom chains.
				</motion.p>
				<motion.p
					className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4A5058]'
					variants={fadeUp}
					custom={0.35}
				>
					Our engineering team owns the architecture and the build. You own the infrastructure and the roadmap.
				</motion.p>
				<motion.div className='mt-3' variants={fadeUp} custom={0.45}>
					{/* Dark pill — prototype .contact-btn-dark */}
					<a
						href='/contact/'
						className='inline-flex items-center justify-center rounded-full border border-[#0E1014] bg-[#0E1014] px-6 py-2.5 font-slussen text-[14px] font-medium text-[#FDFCFF] no-underline transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]'
					>
						Talk to our team
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default BwuHero;
