"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BRAND_KIT_VARIANTS, BRAND_KIT_README, makeZip, svgToPngBytes, celestiaSVG, triggerDownload } from "@/utils/brand";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
	}),
};

const BrandHero = () => {
	const videoRef = useRef(null);
	const [downloading, setDownloading] = useState(false);

	// Fade in/out locked to playback time so the loop seam stays hidden (prototype).
	// On mobile (≤768px) the video is a full-bleed cover behind the centered text,
	// so the seam fade is disabled and it stays fully opaque (prototype Round-4:
	// .brand-hero .brand-hero-video { opacity: 1 !important }).
	useEffect(() => {
		const vid = videoRef.current;
		if (!vid) return;
		const FADE = 0.9;
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

	const handleDownloadKit = async () => {
		if (downloading) return;
		setDownloading(true);
		const originalText = "Download Brand Kit";
		try {
			const enc = new TextEncoder();
			const files = [{ name: "README.txt", data: enc.encode(BRAND_KIT_README) }];
			for (const v of BRAND_KIT_VARIANTS) {
				const svgText = celestiaSVG(v.which, v.color);
				files.push({ name: "svg/" + v.name + ".svg", data: enc.encode(svgText) });
				const png = await svgToPngBytes(svgText, 4);
				files.push({ name: "png/" + v.name + ".png", data: png });
			}
			const zipBlob = makeZip(files);
			triggerDownload(URL.createObjectURL(zipBlob), "celestia-brand-kit.zip", true);
		} catch (e) {
			console.error("Brand kit build failed", e);
		} finally {
			setDownloading(false);
		}
	};

	return (
		<section data-header-theme="dark" className="relative bg-[#040207] overflow-hidden flex flex-col max-md:min-h-[100svh] max-md:justify-start md:min-h-[100svh] md:justify-center min-[1200px]:min-h-[min(100svh,900px)]">
			{/* Background video. Tablet + desktop (≥768): pinned to the right edge at
			    native ratio (prototype: right: -8%). Mobile (≤768): a full-bleed cover
			    behind the centered text, anchored to the hero bottom so the cells
			    swirl fills the lower viewport (prototype Round-4 .brand-hero-video). */}
			<video
				ref={videoRef}
				className="pointer-events-none absolute max-md:inset-0 max-md:z-0 max-md:h-full max-md:w-full max-md:object-cover max-md:object-[center_bottom] md:right-[-8%] md:top-0 md:z-[1] md:h-full md:w-auto md:max-w-none"
				autoPlay
				muted
				loop
				playsInline
			>
				<source src="/videos/brand-hero-anim_safari.mov?v=orig" type="video/quicktime" />
				<source src="/videos/brand-hero-anim.webm?v=orig" type="video/webm" />
			</video>

			{/* Mobile top fade — darkens the full-bleed video flush from the hero top
			    so the strip above the radial text scrim doesn't read as a light/dark
			    seam (most visible on iOS Safari, which renders the HEVC .mov brighter
			    than Chrome's webm). Desktop video is right-pinned, so md:hidden. */}
			<div
				aria-hidden="true"
				className="md:hidden absolute inset-0 z-[1] pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, #040207 0%, #040207 10%, rgba(4,2,7,0.85) 24%, rgba(4,2,7,0.45) 44%, rgba(4,2,7,0) 64%)",
				}}
			/>

			{/* Freeze: aligns to the 1280px frozen content edge on wide screens.
			    Tablet + desktop (≥768) vertically center via the section's
			    justify-center; mobile (≤768) top-anchors at 116px (prototype --m-hero-top). */}
			<div className="relative z-[2] px-6 max-md:pt-[116px] min-[600px]:px-[60px] min-[1200px]:px-[120px]">
			<div className="mx-auto w-full max-w-[1280px]">
			{/* Tablet + desktop (≥768): left-aligned. Mobile (≤768): centered with a
			    radial near-black scrim behind the text for readability over the
			    full-bleed video (prototype Round-4b .brand-hero-inner::before). */}
			<div className="flex flex-col max-w-[860px] items-start max-md:relative max-md:isolate max-md:mx-auto max-md:max-w-full max-md:items-center max-md:text-center">
				<motion.h1
					className="font-slussenExtended font-medium text-[31px] min-[431px]:text-[36px] leading-[1.1] tracking-[-0.04em] md:text-[72px] text-[#FDFCFF] mb-7"
					variants={fadeUpVariants}
					initial="hidden"
					animate="visible"
					custom={0.1}
				>
					The Celestia
					<br />
					Brand Kit
				</motion.h1>

				<motion.p
					className="font-slussen text-[18px] leading-[1.5] tracking-[-0.01em] text-white/[0.72] max-w-[600px] mb-10"
					variants={fadeUpVariants}
					initial="hidden"
					animate="visible"
					custom={0.18}
				>
					The marks, colors, and generative system that make Celestia recognizable. Download the logos, copy the palette, and explore the cells.
				</motion.p>

				<motion.div variants={fadeUpVariants} initial="hidden" animate="visible" custom={0.25}>
					<button
						onClick={handleDownloadKit}
						disabled={downloading}
						className="inline-flex items-center justify-center rounded-full bg-white text-[#040207] font-slussen text-sm font-medium h-auto px-7 py-3 transition-all duration-200 hover:opacity-75 active:scale-[0.98] disabled:opacity-60"
					>
						{downloading ? "Preparing…" : "Download Brand Kit"}
					</button>
				</motion.div>
			</div>
			</div>
			</div>
		</section>
	);
};

export default BrandHero;
