"use client";

import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import { tabs, panels } from "@/data/use-cases/content";

const panelVariants = {
	enter: { opacity: 0, y: 20 },
	center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } },
	exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] } },
};

const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

// Twitter/X icon
const XIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#536471" />
	</svg>
);

// Link/chain icon
const LinkIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
		<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
		<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
	</svg>
);

// YouTube icon
const YouTubeIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000">
		<path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.8-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
	</svg>
);

// Link box — side card with reference link
const LinkBox = ({ link, tabId }) => {
	if (!link) return <div className="w-[280px] flex-shrink-0 hidden lg:block" />;

	const tintMap = {
		agentic: { border: "rgba(74, 126, 168, 0.25)", bg: "rgba(74, 126, 168, 0.06)", hoverBg: "rgba(74, 126, 168, 0.12)", hoverBorder: "#4A7EA8" },
		exchanges: { border: "rgba(168, 148, 128, 0.25)", bg: "rgba(168, 148, 128, 0.06)", hoverBg: "rgba(168, 148, 128, 0.12)", hoverBorder: "#8E7C6A" },
		novel: { border: "rgba(168, 141, 230, 0.25)", bg: "rgba(168, 141, 230, 0.06)", hoverBg: "rgba(168, 141, 230, 0.12)", hoverBorder: "#8B5CF6" },
	};
	const tint = tintMap[tabId] || tintMap.agentic;

	const icon = link.type === "twitter" ? <XIcon /> : link.type === "youtube" ? <YouTubeIcon /> : <LinkIcon />;

	return (
		<a
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
			className="hidden lg:flex w-[280px] flex-shrink-0 flex-col gap-3 p-6 rounded no-underline transition-all duration-300"
			style={{ border: `1px solid ${tint.border}`, background: tint.bg }}
			onMouseEnter={(e) => { e.currentTarget.style.borderColor = tint.hoverBorder; e.currentTarget.style.background = tint.hoverBg; }}
			onMouseLeave={(e) => { e.currentTarget.style.borderColor = tint.border; e.currentTarget.style.background = tint.bg; }}
		>
			<div className="flex items-center gap-2">
				{icon}
				<span className="font-slussen text-[13px] font-medium text-[#1a1a2e]">
					{link.author || link.site}
				</span>
			</div>
			{link.quote && <p className="font-slussen text-[13px] leading-5 text-[#4a4a5a] flex-1">{link.quote}</p>}
			{link.title && <p className="font-slussen text-[14px] font-medium leading-5 text-[#1a1a2e]">{link.title}</p>}
			{link.desc && <p className="font-slussen text-[13px] leading-5 text-[#64748B] flex-1">{link.desc}</p>}
			<span className="font-slussenMono text-[11px] text-[#94A3B8] mt-auto">{link.domain}</span>
		</a>
	);
};

// Row pair — main card (2-col grid: title | body) + side link box
const RowPair = ({ row, tabId, index }) => {
	const activeTab = tabs.find((t) => t.id === tabId);
	const accentColor = activeTab?.color || "#4A7EA8";

	return (
		<motion.div
			className="flex gap-4 items-stretch"
			variants={fadeUpVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px" }}
		>
			{/* Main card — 2-column grid */}
			<div
				className="flex-1 grid grid-cols-1 md:grid-cols-2 border border-black/[0.08] rounded overflow-hidden transition-colors duration-300 min-w-0 hover:border-current"
				style={{ "--tw-current-color": accentColor }}
				onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
				onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
			>
				{/* Left — number + title */}
				<div className="relative flex flex-col gap-3 p-8 md:p-10">
					<span className="font-slussenMono text-[14px] font-semibold tracking-[1.5px]" style={{ color: accentColor }}>
						{row.number}
					</span>
					<h3 className="font-slussen font-medium text-[26px] md:text-[34px] leading-[1.24] tracking-[-1.2px] text-[#1a1a2e]">
						{row.title}
					</h3>
					{/* Vertical divider */}
					<div className="hidden md:block absolute right-0 top-6 bottom-6 w-px bg-black/[0.08]" />
				</div>

				{/* Right — body */}
				<div className="flex flex-col gap-3 p-8 md:p-10">
					{row.body.map((p, i) => (
						<p key={i} className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a]">{p}</p>
					))}
					{row.bodyWithLink && (
						<p className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a]">
							<a href={row.bodyWithLink.linkUrl} className="underline underline-offset-2 font-medium transition-opacity hover:opacity-70" style={{ color: accentColor }}>{row.bodyWithLink.linkText}</a>
							{row.bodyWithLink.text}
						</p>
					)}
					{row.list && (
						<ul className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a] pl-5 flex flex-col gap-1">
							{row.list.map((li, i) => <li key={i}>{li}</li>)}
						</ul>
					)}
					{row.bodyAfterList?.map((p, i) => (
						<p key={`after-${i}`} className="font-slussen text-[14px] leading-[23px] text-[#4a4a5a]">{p}</p>
					))}
					{row.accentBody && (
						<p className="font-slussen text-[14px] leading-[23px] font-medium" style={{ color: accentColor }}>{row.accentBody}</p>
					)}
				</div>
			</div>

			{/* Side link box */}
			<LinkBox link={row.link} tabId={tabId} />
		</motion.div>
	);
};

// Lead text with accent spans
const LeadText = ({ lead, accentColor }) => (
	<div className="max-w-[680px] w-full mx-auto flex flex-col gap-3.5 p-7 sm:p-8 rounded-md border border-black/[0.06] bg-black/[0.03] mb-14">
		{lead.map((item, i) => (
			<p key={i} className="font-slussenMono text-[14px] leading-[24px] text-[#4a4a5a]">
				{item.text}
				{item.accent && <span className="font-medium" style={{ color: accentColor }}>{item.accent}</span>}
			</p>
		))}
	</div>
);

const UseCasesContent = ({ activeTab }) => {
	const panel = panels[activeTab];
	const activeTabData = tabs.find((t) => t.id === activeTab);
	const accentColor = activeTabData?.color || "#4A7EA8";

	return (
		<section id="use-cases-content" data-header-theme="light" className="bg-[#FDFCFF] py-16 md:py-20 lg:py-24 scroll-mt-16">
			<Container size="lg">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						variants={panelVariants}
						initial="enter"
						animate="center"
						exit="exit"
						className="flex flex-col items-center"
					>
						{/* Headline */}
						<h2 className="font-slussen font-medium text-[28px] sm:text-[34px] md:text-[40px] leading-[1.25] tracking-[-1.8px] text-[#1a1a2e] text-center max-w-[640px] mb-8">
							{panel.headline}
						</h2>

						{/* Lead text box */}
						<LeadText lead={panel.lead} accentColor={accentColor} />

						{/* Row pairs */}
						<div className="flex flex-col gap-4 w-full">
							{panel.rows.map((row, index) => (
								<RowPair key={`${activeTab}-${row.number}`} row={row} tabId={activeTab} index={index} />
							))}
						</div>
					</motion.div>
				</AnimatePresence>
			</Container>
		</section>
	);
};

export default UseCasesContent;
