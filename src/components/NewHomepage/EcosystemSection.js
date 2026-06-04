"use client";

import { motion } from "framer-motion";
import Link from "@/macros/Link/Link";
import Button from "@/components/Button/Button";
import AnimatedHeadline from "./AnimatedHeadline";

// 21 networks running on Celestia (source: celenium.io/networks). Rendered as
// uniform circular avatars so every chain reads at the same visual weight.
const chainLogos = [
	{ src: "/images/app/homepage/chains/eclipse.jpg", alt: "Eclipse" },
	{ src: "/images/app/homepage/chains/lightlink.webp", alt: "LightLink" },
	{ src: "/images/app/homepage/chains/b3.jpg", alt: "B3" },
	{ src: "/images/app/homepage/chains/hibachi.jpg", alt: "Hibachi" },
	{ src: "/images/app/homepage/chains/derive.jpg", alt: "Derive" },
	{ src: "/images/app/homepage/chains/molten-network.jpg", alt: "Molten Network" },
	{ src: "/images/app/homepage/chains/orderly.webp", alt: "Orderly" },
	{ src: "/images/app/homepage/chains/towns-protocol.jpg", alt: "Towns Protocol" },
	{ src: "/images/app/homepage/chains/gravity-alpha.jpg", alt: "Gravity Alpha" },
	{ src: "/images/app/homepage/chains/relay-chain.jpg", alt: "Relay Chain" },
	{ src: "/images/app/homepage/chains/manta-pacific.jpg", alt: "Manta Pacific" },
	{ src: "/images/app/homepage/chains/inertia.jpg", alt: "Inertia" },
	{ src: "/images/app/homepage/chains/ham.png", alt: "Ham" },
	{ src: "/images/app/homepage/chains/camp.jpg", alt: "Camp" },
	{ src: "/images/app/homepage/chains/yominet.png", alt: "Yominet" },
	{ src: "/images/app/homepage/chains/echelon.jpg", alt: "Echelon" },
	{ src: "/images/app/homepage/chains/embr-fun.jpg", alt: "Embr.fun" },
	{ src: "/images/app/homepage/chains/rave.jpg", alt: "Rave" },
	{ src: "/images/app/homepage/chains/xo-market.jpg", alt: "XO Market" },
	{ src: "/images/app/homepage/chains/plume.jpg", alt: "Plume" },
	{ src: "/images/app/homepage/chains/winr-protocol.jpg", alt: "WINR Protocol" },
];

/**
 * LogoCarousel — seamless infinite marquee of chain logos. The track holds 3
 * copies of the logo set; the CSS animation scrolls it by -33.333% (one set)
 * for a loop with no visible seam. Edges fade via a mask gradient.
 */
const LogoCarousel = () => (
	<motion.div
		className="overflow-hidden py-8"
		style={{
			maskImage:
				"linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
			WebkitMaskImage:
				"linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
		}}
		initial={{ opacity: 0 }}
		whileInView={{ opacity: 1 }}
		viewport={{ once: true, margin: "-50px" }}
		transition={{ duration: 0.6, ease: "easeOut" }}
	>
		<div className="flex items-center gap-10 w-max animate-carousel-scroll">
			{[0, 1, 2].map((set) =>
				chainLogos.map((logo, i) => (
					<img
						key={`${set}-${i}`}
						src={logo.src}
						alt={set === 0 ? logo.alt : ""}
						aria-hidden={set !== 0}
						loading="lazy"
						className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
					/>
				)),
			)}
		</div>
	</motion.div>
);

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 48 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
	},
};

const cards = [
	{
		href: "https://relay.link/",
		logo: "/images/app/homepage/logo-relay.png",
		logoAlt: "Relay Chain",
		background: "/images/app/homepage/eco-bg-1.webp",
		tag: "Cross-chain Transfers",
		stat: "$8.5B+ settled",
	},
	{
		href: "https://www.bullet.xyz/",
		logo: "/images/app/homepage/logo-bullet.svg",
		logoAlt: "Bullet",
		background: "/images/app/homepage/eco-bg-2.webp",
		tag: "Perpetual Futures Exchanges",
		stat: "30K orders/second",
	},
	{
		href: "https://www.derive.xyz/",
		logo: "/images/app/homepage/logo-derive.png",
		logoAlt: "Derive.XYZ",
		background: "/images/app/homepage/eco-bg-3.webp",
		tag: "Options & Futures",
		stat: "$26B+ notional volume",
		logoClass: "h-[26px]",
	},
];

const EcosystemCard = ({ href, logo, logoAlt, background, tag, stat, logoClass }) => {
	return (
		<motion.div variants={cardVariants} className="h-full">
			<Link
				href={href}
				className="group relative flex flex-col h-full min-h-[340px] rounded-lg overflow-hidden bg-[#0A080D] border border-white/[0.08] no-underline"
			>
				{/* Background image */}
				<div className="absolute inset-0 overflow-hidden">
					<img
						src={background}
						alt=""
						loading="lazy"
						className="w-full h-full object-cover scale-100 transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
					/>
					{/* Readability gradients — top + bottom */}
					<div
						className="absolute inset-0 z-[1] pointer-events-none"
						style={{
							background:
								"linear-gradient(to bottom, rgba(10,8,13,0.85) 0%, transparent 35%), linear-gradient(to top, rgba(10,8,13,0.95) 0%, rgba(10,8,13,0.7) 30%, transparent 55%)",
						}}
					/>
				</div>

				{/* Inner content */}
				<div className="relative z-[2] flex flex-col justify-between flex-1 p-6">
					{/* Logo — top */}
					<img
						src={logo}
						alt={logoAlt}
						className={`w-auto object-contain block brightness-0 invert ${logoClass || "h-10"}`}
					/>

					{/* Tag + stat — bottom */}
					<div className="flex flex-col items-start mt-auto">
						<span className="font-slussenExtended font-medium text-[24px] leading-[1.15] tracking-[-0.025em] text-white mb-2">
							{tag}
						</span>
						<strong className="font-slussenExtended font-semibold text-[24px] leading-none tracking-[-0.02em] text-white">
							{stat}
						</strong>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

/**
 * EcosystemSection — "Over 22+ chains run on Celestia" with three dark cards
 * (Relay / Bullet / Derive). Ported from the prototype's .ecosystem-section:
 * 3-column grid that reflows to a single column below 900px.
 */
const EcosystemSection = () => {
	return (
		<section data-header-theme="light" className="relative z-[2] bg-[#FDFCFF]">
			<div className="max-w-[1680px] mx-auto flex flex-col gap-12 py-12 px-6 min-[600px]:py-[60px] min-[600px]:px-[60px] min-[1200px]:py-20 min-[1200px]:px-[120px]">
			<AnimatedHeadline text="Over 22+ chains run on Celestia" />

			<motion.div
				className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-6"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				variants={staggerContainer}
			>
				{cards.map((card, i) => (
					<EcosystemCard key={i} {...card} />
				))}
			</motion.div>

			{/* Chain logo marquee */}
			<LogoCarousel />

			{/* CTA */}
			<motion.div
				className="text-center"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<Button
					href="https://celenium.io/networks"
					variant="pill-outline"
					size="pill-md"
					className="!text-[#1a1a1a] border-black/20 hover:!text-black hover:border-black/40"
				>
					Explore all chains <span aria-hidden="true">→</span>
				</Button>
			</motion.div>
			</div>
		</section>
	);
};

export default EcosystemSection;
