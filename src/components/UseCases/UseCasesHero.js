"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";
import { hero, tabs } from "@/data/use-cases/content";

// Animation variants
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

// Tab icons per category
const TabIcon = ({ id, color }) => {
	if (id === "agentic") {
		return (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M8 1v4M8 11v4M1 8h4M11 8h4M3.05 3.05l2.83 2.83M10.12 10.12l2.83 2.83M12.95 3.05l-2.83 2.83M5.88 10.12l-2.83 2.83" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		);
	}
	if (id === "exchanges") {
		return (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2 11l3-4 3 2.5 3-5 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M2 14h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		);
	}
	if (id === "novel") {
		return (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="8" cy="8" r="3" stroke={color} strokeWidth="1.5" />
				<path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		);
	}
	return null;
};

const UseCasesHero = ({ activeTab, setActiveTab }) => {
	return (
		<section
			data-header-theme="dark"
			className="relative min-h-screen bg-[#040207] text-white overflow-hidden"
		>
			{/* Orb video — right side */}
			<motion.div
				className="absolute right-[-5%] md:right-[2%] lg:right-[5%] top-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] md:w-[420px] lg:w-[480px] xl:w-[520px] aspect-square pointer-events-none"
				variants={fadeInVariants}
				initial="hidden"
				animate="visible"
				custom={0.4}
			>
				<div className="w-full h-full rounded-full overflow-hidden">
					<video
						autoPlay
						loop
						muted
						playsInline
						className="w-full h-full object-cover"
					>
						<source src="/videos/hero-orb.webm" type="video/webm" />
					</video>
				</div>
			</motion.div>

			{/* Content */}
			<Container size="lg" className="relative z-10 h-full">
				<div className="flex flex-col justify-between min-h-screen pt-[160px] md:pt-[180px] pb-0">
					{/* Top section — heading + CTA */}
					<div className="flex flex-col gap-8 max-w-[820px]">
						<motion.h1
							className="font-slussenExtended font-medium text-[28px] xs:text-[32px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-[-1.5px] sm:tracking-[-2px] text-white"
							variants={fadeUpVariants}
							initial="hidden"
							animate="visible"
							custom={0.1}
						>
							{hero.heading}
						</motion.h1>

						<motion.div
							variants={fadeUpVariants}
							initial="hidden"
							animate="visible"
							custom={0.25}
						>
							<Button
								href={hero.cta.href}
								variant="pill-primary"
								size="pill-md"
							>
								{hero.cta.label}
								<ArrowRightSVG />
							</Button>
						</motion.div>
					</div>

					{/* Bottom bar — text + tabs */}
					<motion.div
						className="mt-auto border-t border-white/[0.08]"
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						custom={0.45}
					>
						<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 py-8 lg:py-10">
							{/* Text lines */}
							<div className="flex flex-col gap-2 max-w-[600px]">
								<p className="font-slussen font-medium text-[18px] sm:text-[22px] md:text-[24px] leading-[1.35] tracking-[-0.5px] text-white">
									{hero.bottomText.primary}
								</p>
								<p className="font-slussen text-[15px] sm:text-[16px] md:text-[18px] leading-[1.5] text-[#B0B7C0]">
									{hero.bottomText.secondary}
								</p>
							</div>

							{/* Tab buttons */}
							<div className="flex gap-2 sm:gap-3 flex-shrink-0">
								{tabs.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`
											group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border transition-all duration-300 cursor-pointer
											font-slussenMono text-[11px] sm:text-[12px] font-medium uppercase tracking-[1.5px]
											${
												activeTab === tab.id
													? "border-current bg-white/[0.06]"
													: "border-white/[0.08] hover:border-white/[0.16] bg-transparent"
											}
										`}
										style={{
											color: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.45)",
										}}
									>
										<TabIcon id={tab.id} color={activeTab === tab.id ? tab.color : "rgba(255,255,255,0.45)"} />
										{tab.label}
									</button>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default UseCasesHero;
