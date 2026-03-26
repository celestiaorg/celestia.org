"use client";

import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";
import { tabs, whyCelestia } from "@/data/use-cases/content";

// Animation variants
const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

const panelVariants = {
	enter: {
		opacity: 0,
		y: 20,
	},
	center: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.25,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

// Background colors per tab
const backgrounds = {
	agentic: "#122436",
	exchanges: "#F5EDE0",
	novel: "#EDE6F6",
};

// Text color schemes per tab
const colorSchemes = {
	agentic: {
		title: "text-white",
		bold: "text-white",
		description: "text-white/60",
		arrow: "text-white/30",
		headerTheme: "dark",
	},
	exchanges: {
		title: "text-[#17141A]",
		bold: "text-[#17141A]",
		description: "text-black/50",
		arrow: "text-[#8E7C6A]/40",
		headerTheme: "light",
	},
	novel: {
		title: "text-[#17141A]",
		bold: "text-[#17141A]",
		description: "text-black/50",
		arrow: "text-[#8B5CF6]/40",
		headerTheme: "light",
	},
};

// Arrow bullet icon
const ArrowBullet = ({ className }) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={`flex-shrink-0 mt-0.5 ${className}`}
	>
		<path
			d="M4 10h12M12 6l4 4-4 4"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const WhyCelestia = ({ activeTab }) => {
	const data = whyCelestia[activeTab];
	const colors = colorSchemes[activeTab];
	const bg = backgrounds[activeTab];
	const isDark = activeTab === "agentic";

	return (
		<section
			data-header-theme={colors.headerTheme}
			className="relative overflow-hidden transition-colors duration-500"
			style={{ backgroundColor: bg }}
		>
			<Container size="lg" className="py-16 md:py-24">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						variants={panelVariants}
						initial="enter"
						animate="center"
						exit="exit"
						className="flex flex-col gap-12 md:gap-16"
					>
						{/* Title */}
						<motion.h2
							className={`font-slussenExtended font-medium text-[28px] sm:text-[34px] md:text-[40px] leading-[1.15] tracking-[-1.5px] ${colors.title}`}
							variants={fadeUpVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							custom={0}
						>
							{data.title}
						</motion.h2>

						{/* Points list */}
						<div className="flex flex-col gap-6 md:gap-8 max-w-[800px]">
							{data.points.map((point, index) => (
								<motion.div
									key={index}
									className="flex gap-4"
									variants={fadeUpVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, margin: "-30px" }}
									custom={index * 0.1}
								>
									<ArrowBullet className={colors.arrow} />
									<p className="font-slussen text-[15px] md:text-[16px] leading-[1.65]">
										<span className={`font-semibold ${colors.bold}`}>
											{point.bold}
										</span>{" "}
										<span className={colors.description}>
											{point.description}
										</span>
									</p>
								</motion.div>
							))}
						</div>

						{/* CTAs */}
						<motion.div
							className="flex flex-wrap gap-4"
							variants={fadeUpVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							custom={0.3}
						>
							{isDark ? (
								<>
									<Button
										href={data.ctas.primary.href}
										variant="pill-primary"
										size="pill-md"
									>
										{data.ctas.primary.label}
										<ArrowRightSVG />
									</Button>
									<Button
										href={data.ctas.outline.href}
										variant="pill-outline"
										size="pill-md"
									>
										{data.ctas.outline.label}
										<ArrowRightSVG />
									</Button>
								</>
							) : (
								<>
									<Button
										href={data.ctas.primary.href}
										variant="pill-primary"
										size="pill-md"
										className="!bg-[#17141A] !text-white hover:!opacity-80"
									>
										{data.ctas.primary.label}
										<ArrowRightSVG color="white" />
									</Button>
									<Button
										href={data.ctas.outline.href}
										variant="pill-outline"
										size="pill-md"
										className="!border-black/[0.12] !text-black/50 hover:!text-black/85 hover:!border-black/25"
									>
										{data.ctas.outline.label}
										<ArrowRightSVG />
									</Button>
								</>
							)}
						</motion.div>
					</motion.div>
				</AnimatePresence>
			</Container>
		</section>
	);
};

export default WhyCelestia;
