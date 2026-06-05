"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BRAND_KIT_VARIANTS, BRAND_KIT_README, makeZip, svgToPngBytes, celestiaSVG, triggerDownload } from "@/utils/brand";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
	}),
};

const fadeInVariants = {
	hidden: { opacity: 0 },
	visible: (delay = 0) => ({
		opacity: 1,
		transition: { duration: 1, delay, ease: [0.25, 0.4, 0.25, 1] },
	}),
};

const BrandHero = () => {
	const [downloading, setDownloading] = useState(false);

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
		<section data-header-theme="dark" className="relative min-h-[min(100svh,1100px)] md:min-h-[min(60svh,700px)] min-[1200px]:min-h-[min(100svh,900px)] bg-[#040207] overflow-hidden flex flex-col">
			<motion.video
				className="absolute right-[-8%] top-0 h-full w-auto max-w-none pointer-events-none z-[1]"
				autoPlay
				muted
				loop
				playsInline
				variants={fadeInVariants}
				initial="hidden"
				animate="visible"
				custom={0.3}
			>
				<source src="/videos/celestia-anim-build_safari.mov" type="video/quicktime" />
				<source src="/videos/celestia-anim-build.webm" type="video/webm" />
			</motion.video>

			{/* Freeze: aligns to the 1280px frozen content edge on wide screens */}
			<div className="relative z-[2] mt-[min(20svh,200px)] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]">
			<div className="mx-auto w-full max-w-[1280px]">
			<div className="flex flex-col items-start max-w-[860px]">
				<motion.h1
					className="font-slussenExtended font-medium text-[56px] leading-[1.1] tracking-[-0.04em] md:text-[72px] text-[#FDFCFF] mb-7"
					variants={fadeUpVariants}
					initial="hidden"
					animate="visible"
					custom={0.1}
				>
					The Celestia
					<br />
					Brand Kit.
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
