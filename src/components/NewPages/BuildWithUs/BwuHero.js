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
	// On mobile (≤768px) the video is a full-bleed cover behind the text, so
	// the seam fade is disabled and it stays fully opaque (prototype Round-4:
	// .bwu-hero .build-hero-video { opacity: 1 !important }).
	useEffect(() => {
		const vid = videoRef.current;
		if (!vid) return;
		vid.playbackRate = 1.25;
		const FADE = 0.9; // seconds of fade at each end (intrinsic timeline)
		vid.style.opacity = "0";
		let rafId;
		const tick = () => {
			if (window.innerWidth < 768) {
				vid.style.opacity = "1";
			} else {
				const d = vid.duration;
				if (d && !isNaN(d)) {
					const t = vid.currentTime;
					let o = 1;
					if (t < FADE) o = t / FADE;
					else if (t > d - FADE) o = (d - t) / FADE;
					vid.style.opacity = Math.max(0, Math.min(1, o)).toFixed(3);
				}
			}
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, []);

	return (
		<section
			data-header-theme='light'
			className='relative flex flex-col overflow-hidden border-b border-black/[0.08] bg-[#FDFCFF] max-md:min-h-[100svh] max-md:px-6 max-md:pt-[116px] max-md:pb-0 md:min-h-[min(74svh,840px)] md:px-[60px] md:pt-40 md:pb-20 min-[1200px]:min-h-[min(100svh,900px)] min-[1200px]:px-[120px] min-[1200px]:pt-[clamp(150px,24svh,260px)] min-[1200px]:pb-[clamp(48px,8svh,100px)]'
		>
			{/* Background video. md+: pinned to the right edge at natural ratio
			    (prototype: right: -8%). Mobile (≤768): a full-bleed cover behind
			    the centered text, anchored to the hero bottom so the swirl fills
			    the lower viewport (prototype Round-4: inset:0, object-fit:cover,
			    object-position:center bottom). */}
			<video
				ref={videoRef}
				className='pointer-events-none absolute max-md:inset-0 max-md:z-0 max-md:h-full max-md:w-full max-md:object-cover max-md:object-[center_bottom] md:right-[-22%] md:top-0 md:z-[1] md:h-full md:w-auto md:max-w-none min-[1200px]:right-[-8%]'
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

			{/* Mobile-only readability scrim — a full-hero white wash, strongest at
			    the top behind the text and fading down so the swirl still reads in
			    the lower hero (prototype Round-4b-fix: .bwu-hero::before). Sits above
			    the z-0 video and below the z-[2] text. */}
			<div className='md:hidden pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(253,252,255,0.97)_0%,rgba(253,252,255,0.92)_30%,rgba(253,252,255,0.74)_56%,rgba(253,252,255,0.46)_78%,rgba(253,252,255,0.22)_100%)]' />

			{/* Freeze: column aligns to the 1280px frozen content edge on wide screens */}
			<div className='relative z-[2] mx-auto w-full max-w-[1280px]'>
			{/* Content — single column, parent gap (20px) governs the stack,
			    CTA gets the loose gap via mt (prototype two-step rhythm). md+:
			    left-aligned. Mobile: centered (prototype .bwu-hero .about-hero-content
			    { text-align:center; align-items:center }). */}
			<motion.div
				className='flex flex-col gap-5 md:max-w-[620px] md:items-start md:text-left max-md:mx-auto max-md:max-w-full max-md:items-center max-md:text-center'
				initial='hidden'
				animate='visible'
			>
				<motion.h1
					className='font-slussen text-[17px] font-medium leading-[1.25] tracking-[-0.025em] text-black/40 min-[431px]:text-[18px] md:text-[24px]'
					variants={fadeUp}
					custom={0.1}
				>
					Build with Us
				</motion.h1>
				<motion.h2
					className='font-slussenExtended text-[26px] font-medium leading-[1.18] tracking-[-0.04em] text-[#0E1014] min-[431px]:text-[30px] min-[768px]:text-[32px] min-[1024px]:text-[46px] min-[1024px]:leading-[1.1]'
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
					className='font-slussen text-[17px] font-normal leading-[1.4] tracking-[-0.01em] text-[#4A5058] min-[431px]:text-[18px] md:leading-[1.5]'
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
			</div>
		</section>
	);
};

export default BwuHero;
