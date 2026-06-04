"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const coreSwatches = [
	{ hex: "#FDFCFF", name: "Frost" },
	{ hex: "#0E1014", name: "Void" },
	{ hex: "#5640D1", name: "Indigo" },
	{ hex: "#7C68F2", name: "Amethyst" },
];

const ramps = [
	{
		name: "Cool Gray",
		steps: [
			{ shade: "50", hex: "#EAECEE" },
			{ shade: "200", hex: "#C4C8CE" },
			{ shade: "400", hex: "#808890" },
			{ shade: "600", hex: "#4A5058" },
			{ shade: "800", hex: "#242830" },
		],
	},
	{
		name: "Blue",
		steps: [
			{ shade: "50", hex: "#EAEDF0" },
			{ shade: "200", hex: "#A9C2D4" },
			{ shade: "400", hex: "#5595C3" },
			{ shade: "600", hex: "#32688F" },
			{ shade: "800", hex: "#254459" },
		],
	},
	{
		name: "Purple",
		steps: [
			{ shade: "50", hex: "#E3E1F2" },
			{ shade: "200", hex: "#C8C3E5" },
			{ shade: "400", hex: "#7C68F2" },
			{ shade: "600", hex: "#4331A5" },
			{ shade: "800", hex: "#231860" },
		],
	},
	{
		name: "Beige",
		steps: [
			{ shade: "50", hex: "#EDECEB" },
			{ shade: "200", hex: "#C6BDB7" },
			{ shade: "400", hex: "#9A897E" },
			{ shade: "600", hex: "#6C5E55" },
			{ shade: "800", hex: "#473E38" },
		],
	},
];

const BrandPalette = () => {
	const [toast, setToast] = useState(null);

	const copy = (hex) => {
		if (navigator.clipboard) navigator.clipboard.writeText(hex);
		setToast(hex);
		setTimeout(() => setToast(null), 1400);
	};

	return (
		<section className="bg-[#FDFCFF] pt-0 pb-20 md:pb-[110px]">
			<div className="mx-auto w-full max-w-[1520px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]">
				<motion.div
					className="mb-14 max-w-[760px]"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
				>
					<motion.h2 className="font-slussenExtended font-medium text-[42px] leading-[1.12] tracking-[-0.04em] text-[#0E1014] mb-[18px]">Palette</motion.h2>
					<motion.p className="font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4A5058]">
						Frost and Void anchor every surface; Indigo and Amethyst carry the brand. Four extended families — Neutral, Blue, Purple, and Beige — handle the rest. Click any color to copy its hex.
					</motion.p>
				</motion.div>

				{/* Core */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
					{coreSwatches.map((s, i) => (
						<div
							key={i}
							onClick={() => copy(s.hex)}
							className="rounded-[14px] overflow-hidden border border-[#EAECEE] cursor-pointer transition-transform hover:-translate-y-0.5"
						>
							<div className="h-[150px]" style={{ background: s.hex, borderBottom: s.hex === "#FDFCFF" ? "1px solid #EAECEE" : "none" }} />
							<div className="p-4 bg-white">
								<p className="font-slussen text-[16px] font-medium text-[#0E1014] mb-1">{s.name}</p>
								<p className="font-slussen text-[13px] tracking-[0.02em] text-[#808890] uppercase">{s.hex}</p>
							</div>
						</div>
					))}
				</div>

				{/* Ramps */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
					{ramps.map((ramp, ri) => (
						<div key={ri}>
							<p className="font-slussen text-[13px] font-medium tracking-[0.08em] uppercase text-[#808890] mb-3.5">{ramp.name}</p>
							<div className="rounded-xl overflow-hidden border border-[#EAECEE]">
								{ramp.steps.map((step, si) => (
									<div
										key={si}
										onClick={() => copy(step.hex)}
										className="flex items-center justify-between px-4 py-[13px] cursor-pointer text-[13px] font-slussen tracking-[0.02em] hover:pl-[22px] transition-[padding] duration-150"
										style={{ background: step.hex, color: ["#EAECEE", "#C4C8CE", "#EDECEB", "#E3E1F2", "#EAEDF0"].includes(step.hex) ? "#0E1014" : "#fff" }}
									>
										<span>{step.shade}</span>
										<span className="opacity-70 text-[11px] uppercase">{step.hex}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Toast */}
			{toast && (
				<div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#0E1014] text-white font-slussen text-[13px] px-[22px] py-3 rounded-full z-[9999] shadow">
					Copied {toast}
				</div>
			)}
		</section>
	);
};

export default BrandPalette;
