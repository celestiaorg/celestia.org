"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { celestiaSVG, svgToPngBytes, triggerDownload } from "@/utils/brand";


const fadeUpVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

const BrandLogos = () => {
	const handleDownload = async (which, color, name, fmt) => {
		const svgText = celestiaSVG(which, color);
		if (fmt === "svg") {
			const url = URL.createObjectURL(new Blob([svgText], { type: "image/svg+xml" }));
			triggerDownload(url, name + ".svg", true);
		} else {
			const bytes = await svgToPngBytes(svgText, 4);
			const url = URL.createObjectURL(new Blob([bytes], { type: "image/png" }));
			triggerDownload(url, name + ".png", true);
		}
	};

	const LogoBlock = ({ title, which, variants }) => (
		<div className="mb-16 last:mb-0">
			<p className="font-nuberNext text-[13px] font-medium tracking-[0.08em] uppercase text-[#808890] mb-[18px]">{title}</p>
			<div className="grid grid-cols-1 min-[768px]:grid-cols-3 gap-4 mb-5">
				{variants.map((v) => (
					<div
						key={v.name}
						className={`aspect-[16/10] rounded-[14px] flex items-center justify-center py-[12%] px-[16%] relative overflow-hidden border ${
							v.bg === "frost" ? "bg-[#FDFCFF] border-[#EAECEE]" : v.bg === "void" ? "bg-[#040207] border-[#1a1c22]" : "bg-[#5640D1] border-transparent"
						}`}
					>
						<img
							src={v.src}
							alt={`${title} ${v.tag}`}
							className={`w-full h-full object-contain ${which === 'symbol' ? 'max-w-[120px]' : ''}`}
						/>
						<span
							className={`absolute bottom-3 left-[14px] font-nuberNext text-[10px] tracking-[0.08em] uppercase ${
								v.bg === "frost" ? "text-[#A8AEB6]" : v.bg === "void" ? "text-white/35" : "text-white/60"
							}`}
						>
							{v.tag}
						</span>
					</div>
				))}
			</div>
			<div className="flex flex-wrap gap-2.5 items-center">
				<span className="font-nuberNext text-[13px] text-[#808890] mr-1.5">Download</span>
				{variants.map((v) => (
					<Fragment key={v.name}>
						<button
							type="button"
							onClick={() => handleDownload(which, v.color, v.name, "svg")}
							className="inline-flex items-center gap-1.5 font-nuberNext text-[13px] font-medium tracking-[-0.01em] text-[#0E1014] bg-transparent border border-[#D8DADE] rounded-full px-4 py-2 transition-all hover:border-[#5640D1] hover:text-[#5640D1]"
						>
							{v.tag} · SVG
						</button>
						<button
							type="button"
							onClick={() => handleDownload(which, v.color, v.name, "png")}
							className="inline-flex items-center gap-1.5 font-nuberNext text-[13px] font-medium tracking-[-0.01em] text-[#0E1014] bg-transparent border border-[#D8DADE] rounded-full px-4 py-2 transition-all hover:border-[#5640D1] hover:text-[#5640D1]"
						>
							{v.tag} · PNG
						</button>
					</Fragment>
				))}
			</div>
		</div>
	);

	const symbolVariants = [
		{ bg: "frost", tag: "Frost", color: "#0E1014", name: "celestia-symbol-black", src: "/images/brand/celestia-symbol.svg" },
		{ bg: "void", tag: "Void", color: "#FFFFFF", name: "celestia-symbol-white", src: "/images/brand/celestia-symbol-white.svg" },
		{ bg: "indigo", tag: "Indigo", color: "#5640D1", name: "celestia-symbol-indigo", src: "/images/brand/celestia-symbol-white.svg" },
	];
	const logotypeVariants = [
		{ bg: "frost", tag: "Frost", color: "#0E1014", name: "celestia-logotype-black", src: "/images/brand/celestia-wordmark.svg" },
		{ bg: "void", tag: "Void", color: "#FFFFFF", name: "celestia-logotype-white", src: "/images/brand/celestia-wordmark-white.svg" },
		{ bg: "indigo", tag: "Indigo", color: "#5640D1", name: "celestia-logotype-indigo", src: "/images/brand/celestia-wordmark-white.svg" },
	];

	return (
		<section className="brand-section bg-[#FDFCFF] py-20 md:py-[110px]">
			<div className="mx-auto w-full max-w-[1520px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]">
				<motion.div
					className="mb-14 max-w-[760px]"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
					variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
				>
					<motion.h2 variants={fadeUpVariants} className="font-nuberNextWide font-medium text-[25px] min-[431px]:text-[28px] md:text-[42px] leading-[1.12] tracking-[-0.04em] text-[#0E1014] mb-[18px]">
						Symbol and Logotype
					</motion.h2>
					<motion.p variants={fadeUpVariants} className="font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4A5058]">
						Two marks. The symbol stands alone where space is tight; the logotype carries the full name. Each works in black, white, and on indigo. Download as SVG for design tools or PNG for everything else.
					</motion.p>
				</motion.div>

				<LogoBlock title="Symbol" which="symbol" variants={symbolVariants} />
				<LogoBlock title="Logotype" which="logotype" variants={logotypeVariants} />
			</div>
		</section>
	);
};

export default BrandLogos;
