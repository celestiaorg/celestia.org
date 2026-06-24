"use client";

import { motion, AnimatePresence } from "framer-motion";
import { whyCelestia } from "@/data/applications/content";

const panelVariants = {
	enter: { opacity: 0, y: 20 },
	center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } },
	exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] } },
};

const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

// Tab-specific color schemes matching prototype CSS variables exactly.
// Note the prototype swapped panel hues: exchanges = purple, novel = beige.
const themes = {
	agentic: {
		bg: "#122436", // --dark-blue-darkest
		titleColor: "#FDFCFF",
		textColor: "#C4C8CE", // --text-body
		strongColor: "#FDFCFF",
		arrowColor: "#729FBF", // --steel-blue-dark
		primaryBg: "#DAE8F2", // --dark-blue-lightest
		primaryText: "#122436",
		outlineText: "#DAE8F2",
		outlineBorder: "rgba(218, 232, 242, 0.25)",
		outlineHoverText: "#FDFCFF",
		outlineHoverBorder: "rgba(218, 232, 242, 0.5)",
		headerTheme: "dark",
	},
	exchanges: {
		bg: "#F5F0FF", // --purple-lightest
		titleColor: "#4A5058", // --neutral-darkest
		textColor: "#808890", // --neutral-dark
		strongColor: "#4A5058",
		arrowColor: "#8F82D8", // --amethyst-dark
		primaryBg: "#7C3AED", // --purple-dark
		primaryText: "#FDFCFF",
		outlineText: "#A88DE6", // --purple-mid
		outlineBorder: "#D6C4F7", // --purple-light
		outlineHoverText: "#7C3AED",
		outlineHoverBorder: "#A88DE6",
		headerTheme: "light",
	},
	novel: {
		bg: "#F2EDE6", // --beige-lightest
		titleColor: "#4A5058",
		textColor: "#808890",
		strongColor: "#4A5058",
		arrowColor: "#B0A9A4", // --sandstone-dark
		primaryBg: "#746456", // --beige-dark
		primaryText: "#FDFCFF",
		outlineText: "#A89480", // --beige-mid
		outlineBorder: "#C8B8A2", // --beige-light
		outlineHoverText: "#746456",
		outlineHoverBorder: "#A89480",
		headerTheme: "light",
	},
};

const WhyCelestia = ({ activeTab }: { activeTab: string }) => {
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
					className="flex flex-col items-center w-full px-5 md:px-[60px] lg:px-[120px] pt-16 pb-20 md:pt-20 md:pb-[100px]"
					style={{ backgroundColor: t.bg }}
				>
					{/* All content centered, max-width 780px. Flex column so the
					    items' mb + CTA mt stack like the prototype (28 + 48 = 76px). */}
					<div className="w-full max-w-[780px] flex flex-col">
						{/* Title — centered, NuberNext Wide per prototype .uc-why-title */}
						<motion.h3
							className="font-nuberNextWide font-medium text-[25px] min-[431px]:text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.025em] text-center mb-8"
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
									<p className="font-nuberNext text-[16px] leading-[1.5]" style={{ color: t.textColor }}>
										<strong className="font-semibold" style={{ color: t.strongColor }}>
											{point.bold}
										</strong>{" "}
										{Array.isArray(point.description)
											? point.description.map((seg, i) =>
													seg.bold ? (
														<strong key={i} className="font-semibold" style={{ color: t.strongColor }}>
															{seg.bold}
														</strong>
													) : (
														seg.text
													),
											  )
											: point.description}
									</p>
								</motion.div>
							))}
						</div>

						{/* CTAs — centered */}
						<motion.div
							className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center mt-12"
							variants={fadeUpVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<a
								href={data.ctas.primary.href}
								className="font-nuberNext font-medium text-sm inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 transition-opacity duration-200 hover:opacity-80 no-underline"
								style={{ backgroundColor: t.primaryBg, color: t.primaryText }}
							>
								{data.ctas.primary.label}
							</a>
							<a
								href={data.ctas.outline.href}
								className="font-nuberNext font-medium text-sm inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 border transition-all duration-200 no-underline bg-transparent"
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
