"use client";

import { motion, AnimatePresence } from "framer-motion";
import { whyCelestia } from "@/data/use-cases/content";

const panelVariants = {
	enter: { opacity: 0, y: 20 },
	center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } },
	exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] } },
};

const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

// Tab-specific color schemes matching prototype CSS variables exactly
const themes = {
	agentic: {
		bg: "#0C1820",
		titleColor: "#FDFCFF",
		textColor: "#B0B7C0",
		strongColor: "#FDFCFF",
		arrowColor: "#4A7EA8",
		primaryBg: "#C4DCF0",
		primaryText: "#0C1820",
		outlineText: "#C4DCF0",
		outlineBorder: "rgba(196, 220, 240, 0.25)",
		outlineHoverText: "#fff",
		outlineHoverBorder: "rgba(196, 220, 240, 0.5)",
		headerTheme: "dark",
	},
	exchanges: {
		bg: "#F2EDE6",
		titleColor: "#4A5058",
		textColor: "#808890",
		strongColor: "#4A5058",
		arrowColor: "#8E7C6A",
		primaryBg: "#746456",
		primaryText: "#fff",
		outlineText: "#A89480",
		outlineBorder: "#C8B8A2",
		outlineHoverText: "#746456",
		outlineHoverBorder: "#A89480",
		headerTheme: "light",
	},
	novel: {
		bg: "#F5F0FF",
		titleColor: "#4A5058",
		textColor: "#808890",
		strongColor: "#4A5058",
		arrowColor: "#8B5CF6",
		primaryBg: "#7C3AED",
		primaryText: "#fff",
		outlineText: "#A88DE6",
		outlineBorder: "#D6C4F7",
		outlineHoverText: "#7C3AED",
		outlineHoverBorder: "#A88DE6",
		headerTheme: "light",
	},
};

const WhyCelestia = ({ activeTab }) => {
	const data = whyCelestia[activeTab];
	const t = themes[activeTab];

	return (
		<section data-header-theme={t.headerTheme} className="relative">
			<AnimatePresence mode="wait">
				<motion.div
					key={activeTab}
					variants={panelVariants}
					initial="enter"
					animate="center"
					exit="exit"
					className="flex flex-col items-center w-full px-5 md:px-[60px] lg:px-[120px] py-16 md:py-20 lg:py-24"
					style={{ backgroundColor: t.bg }}
				>
					{/* All content centered, max-width 780px */}
					<div className="w-full max-w-[780px]">
						{/* Title — centered */}
						<motion.h3
							className="font-slussen font-medium text-[24px] md:text-[28px] tracking-[-1px] text-center mb-8"
							style={{ color: t.titleColor }}
							variants={fadeUpVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							{data.title}
						</motion.h3>

						{/* Bullet points */}
						<div className="flex flex-col gap-5 mb-7">
							{data.points.map((point, index) => (
								<motion.div
									key={index}
									className="flex gap-3.5 items-start"
									variants={fadeUpVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, margin: "-30px" }}
								>
									<span
										className="text-[18px] font-semibold flex-shrink-0 mt-0.5"
										style={{ color: t.arrowColor }}
									>
										→
									</span>
									<p className="font-slussen text-[16px] leading-[26px]" style={{ color: t.textColor }}>
										<strong className="font-semibold" style={{ color: t.strongColor }}>
											{point.bold}
										</strong>{" "}
										{point.description}
									</p>
								</motion.div>
							))}
						</div>

						{/* CTAs — centered */}
						<motion.div
							className="flex gap-4 items-center justify-center mt-12"
							variants={fadeUpVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<a
								href={data.ctas.primary.href}
								className="font-slussen font-medium text-sm inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 transition-opacity duration-200 hover:opacity-80 no-underline"
								style={{ backgroundColor: t.primaryBg, color: t.primaryText }}
							>
								{data.ctas.primary.label}
							</a>
							<a
								href={data.ctas.outline.href}
								className="font-slussen font-medium text-sm inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 border transition-all duration-200 no-underline bg-transparent"
								style={{ color: t.outlineText, borderColor: t.outlineBorder }}
								onMouseEnter={(e) => { e.currentTarget.style.color = t.outlineHoverText; e.currentTarget.style.borderColor = t.outlineHoverBorder; }}
								onMouseLeave={(e) => { e.currentTarget.style.color = t.outlineText; e.currentTarget.style.borderColor = t.outlineBorder; }}
							>
								{data.ctas.outline.label}
							</a>
						</motion.div>
					</div>
				</motion.div>
			</AnimatePresence>
		</section>
	);
};

export default WhyCelestia;
