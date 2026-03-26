"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import { tabs, panels } from "@/data/use-cases/content";

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

// Tab icons per category (duplicated from hero for the sticky bar)
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

// Link preview card for external links
const LinkPreview = ({ link }) => {
	if (!link) return null;

	const iconMap = {
		twitter: (
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
			</svg>
		),
		youtube: (
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor" />
			</svg>
		),
		website: (
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" />
			</svg>
		),
	};

	return (
		<a
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group/link flex items-start gap-4 p-4 sm:p-5 mt-4 rounded-xl border border-black/[0.06] bg-white hover:bg-gray-50 transition-colors duration-200 no-underline"
		>
			<span className="flex-shrink-0 w-10 h-10 rounded-lg bg-black/[0.04] flex items-center justify-center text-black/40 group-hover/link:text-black/60 transition-colors">
				{iconMap[link.type] || iconMap.website}
			</span>
			<span className="flex flex-col gap-1 min-w-0">
				<span className="font-slussenMono text-[11px] font-medium uppercase tracking-[1px] text-black/35">
					{link.label}
				</span>
				<span className="font-slussen text-[14px] leading-[1.45] text-black/60 line-clamp-2">
					{link.description}
				</span>
			</span>
			<span className="flex-shrink-0 mt-1 text-black/20 group-hover/link:text-black/40 transition-colors">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 1h9v9M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</span>
		</a>
	);
};

// Content row — number + title left, body + optional link right
const ContentRow = ({ row, index, isLast }) => {
	return (
		<motion.div
			className={`flex flex-col md:flex-row gap-4 md:gap-10 lg:gap-16 py-8 md:py-10 ${
				!isLast ? "border-b border-black/[0.06]" : ""
			}`}
			variants={fadeUpVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px" }}
			custom={index * 0.1}
		>
			{/* Left column — number + title */}
			<div className="flex items-baseline gap-4 md:w-[320px] lg:w-[380px] flex-shrink-0">
				<span className="font-slussenMono text-[13px] font-medium text-black/25 tracking-[0.5px]">
					{row.number}
				</span>
				<h3 className="font-slussen font-semibold text-[20px] md:text-[22px] leading-[1.3] tracking-[-0.5px] text-[#17141A]">
					{row.title}
				</h3>
			</div>

			{/* Right column — body + optional link */}
			<div className="flex-1">
				<p className="font-slussen text-[15px] md:text-[16px] leading-[1.65] text-black/55">
					{row.body}
				</p>
				<LinkPreview link={row.link} />
			</div>
		</motion.div>
	);
};

const UseCasesContent = ({ activeTab, setActiveTab }) => {
	const stickyRef = useRef(null);
	const sentinelRef = useRef(null);
	const [isSticky, setIsSticky] = useState(false);

	// Intersection Observer for sticky detection
	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsSticky(!entry.isIntersecting);
			},
			{ threshold: 0, rootMargin: "0px" }
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, []);

	const panel = panels[activeTab];
	const activeTabData = tabs.find((t) => t.id === activeTab);

	return (
		<section
			id="use-cases-content"
			data-header-theme="light"
			className="bg-[#FDFCFF] relative"
		>
			{/* Sentinel element — when it leaves viewport, tabs become sticky */}
			<div ref={sentinelRef} className="absolute top-0 h-px w-full" />

			{/* Sticky tab bar */}
			<div
				ref={stickyRef}
				className={`sticky top-0 z-30 transition-all duration-300 ${
					isSticky
						? "bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
						: "bg-transparent"
				}`}
			>
				<Container size="lg">
					<div className="flex items-center gap-2 sm:gap-3 py-4 overflow-x-auto no-scrollbar">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`
									flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border transition-all duration-300 cursor-pointer flex-shrink-0
									font-slussenMono text-[11px] sm:text-[12px] font-medium uppercase tracking-[1.5px]
									${
										activeTab === tab.id
											? "border-current bg-black/[0.04]"
											: "border-black/[0.08] hover:border-black/[0.16] bg-transparent"
									}
								`}
								style={{
									color: activeTab === tab.id ? tab.color : "rgba(0,0,0,0.35)",
								}}
							>
								<TabIcon id={tab.id} color={activeTab === tab.id ? tab.color : "rgba(0,0,0,0.35)"} />
								{tab.label}
							</button>
						))}
					</div>
				</Container>
			</div>

			{/* Panel content */}
			<Container size="lg" className="pb-16 md:pb-24">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						variants={panelVariants}
						initial="enter"
						animate="center"
						exit="exit"
					>
						{/* Headline */}
						<div className="pt-10 md:pt-16 pb-8 md:pb-12 text-center">
							<h2 className="font-slussen font-medium text-[28px] sm:text-[34px] md:text-[40px] leading-[1.2] tracking-[-1.5px] text-[#17141A]">
								{panel.headline}
							</h2>
						</div>

						{/* Lead text box */}
						<div className="mb-10 md:mb-14 max-w-[900px] mx-auto">
							<div className="rounded-xl border border-black/[0.06] bg-black/[0.02] px-6 py-5 sm:px-8 sm:py-6">
								<p className="font-slussenMono text-[13px] sm:text-[14px] leading-[1.75] text-black/50">
									{panel.lead}
								</p>
							</div>
						</div>

						{/* Content rows */}
						<div className="max-w-[1000px] mx-auto">
							{panel.rows.map((row, index) => (
								<ContentRow
									key={`${activeTab}-${row.number}`}
									row={row}
									index={index}
									isLast={index === panel.rows.length - 1}
								/>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
			</Container>
		</section>
	);
};

export default UseCasesContent;
