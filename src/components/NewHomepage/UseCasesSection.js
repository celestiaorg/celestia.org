"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";

// Color tokens matching prototype CSS variables
const STEEL_BLUE = "#3B7BA9"; // --steel-blue (Agentic accent)
const AMETHYST = "#7C68F2"; // --amethyst (Exchanges / hero-latency accent)

const fadeUpVariants = {
	hidden: { opacity: 0, y: 48 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1.4,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

// Dot grid component for the latency visual.
// flex:1 + alignContent:start mirrors the prototype's .uc-latency-grid — the
// grid stretches to fill the column height (so all three columns match) while
// the dots stay anchored to the top instead of compressing into a short block.
const DotGrid = ({ count, cols, dotSize = 6, gap = 3, hero = false }) => {
	// Responsive sizing: dots + gaps shrink on small screens so the 3-column latency
	// comparison fits narrow phones, but stay at their desktop size ≥ ~768px. Pure CSS
	// via clamp() — no JS / hydration flash.
	const dot = `clamp(${Math.max(2, Math.round(dotSize * 0.66))}px, ${((dotSize / 768) * 100).toFixed(3)}vw, ${dotSize}px)`;
	const g = `clamp(${Math.max(1.5, gap * 0.66).toFixed(1)}px, ${((gap / 768) * 100).toFixed(3)}vw, ${gap}px)`;
	return (
	<div
		className='justify-self-center mt-2'
		style={{
			display: "grid",
			gridTemplateColumns: `repeat(${cols}, ${dot})`,
			gap: g,
			justifyContent: "center",
			flex: "1 1 0%",
			alignContent: "start",
		}}
	>
		{Array.from({ length: count }).map((_, i) => (
			<span
				key={i}
				className='rounded-full'
				style={{
					width: dot,
					height: dot,
					background: hero ? AMETHYST : "#2a2a3a",
					opacity: hero ? 0.6 : 0.15,
				}}
			/>
		))}
	</div>
	);
};

// Agentic Payments card visual
const AgenticVisual = () => (
	<div className='flex flex-col justify-start gap-4 px-6 md:px-8 pb-7 flex-1 max-md:min-h-[200px]'>
		{/* Answer headline — single unified line (Slussen Extended, 32px, steel-blue) */}
		<h3
			// Mobile: --m-card-lg scale (26px ≤768, 23px ≤430); the manual break is
			// dropped on mobile so the line can rebalance (explicit space kept so
			// words don't join — prototype orphan fix)
			className='font-slussenExtended font-medium text-[23px] min-[431px]:text-[26px] md:text-[32px] leading-[1.18] md:leading-[1.25] tracking-[-0.025em] m-0 max-md:[text-wrap:balance]'
			style={{ color: STEEL_BLUE }}
		>
			Celestia Fibre Delivers up to{" "}
			<br className='max-md:hidden' />
			1.25 Billion TPS
		</h3>

		{/* Quote — fills remaining height, attribution pinned to bottom */}
		<div className='flex flex-1 gap-3.5 p-5 bg-black/[0.02] border border-black/[0.08] rounded-lg'>
			<div className='w-[3px] flex-shrink-0 rounded-sm' style={{ background: STEEL_BLUE }} />
			<div className='flex flex-1 flex-col justify-between gap-6'>
				<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4a4a5a]'>
					Cloudflare CEO said they&apos;re contemplating building an L1 because they need more throughput — expecting{" "}
					<strong className='font-semibold' style={{ color: STEEL_BLUE }}>
						1B microtransactions per second
					</strong>{" "}
					in the next 5-10 years.
				</p>
				<div className='flex items-center gap-2 flex-wrap'>
					<span className='font-slussen text-[16px] font-medium text-[#1a1a1a]'>Graham Novak</span>
					<span className='font-slussen text-[16px] text-[#8a8a9a]'>@gnovak_</span>
					<span className='font-slussen text-[16px] text-[#8a8a9a]'>
						<span className='mr-2'>·</span>Mar 2026
					</span>
				</div>
			</div>
		</div>
	</div>
);

// Latency column
const LatencyCol = ({ value, unit = "ms", logo, logoAlt, hero = false, logoSmall = false, dotCount, dotCols, dotSize, dotGap }) => (
	<div
		className='flex-1 min-w-0 flex flex-col items-center gap-1.5 py-3 px-1.5 sm:py-3.5 sm:px-2.5 rounded-lg border'
		style={{
			background: hero ? "rgba(124, 104, 242, 0.1)" : "rgba(0, 0, 0, 0.015)",
			borderColor: hero ? "rgba(124, 104, 242, 0.3)" : "rgba(0, 0, 0, 0.06)",
		}}
	>
		{/* Number */}
		<div className='flex items-baseline justify-center gap-1'>
			<span
				className='font-slussenExtended font-bold leading-none tracking-[-0.025em] text-[22px] min-[400px]:text-[26px] sm:text-[32px]'
				style={{
					color: hero ? AMETHYST : "rgba(0, 0, 0, 0.25)",
				}}
			>
				{value}
			</span>
			<span
				className='font-slussenExtended text-[11px] sm:text-[14px]'
				style={{ color: hero ? AMETHYST : "rgba(0, 0, 0, 0.2)", opacity: hero ? 0.8 : 1 }}
			>
				{unit}
			</span>
		</div>

		{/* Dot grid */}
		<DotGrid count={dotCount} cols={dotCols} dotSize={dotSize || 6} gap={dotGap || 3} hero={hero} />

		{/* Logo */}
		{hero ? (
			// Recolor the white logo to the exact AMETHYST brand purple via a CSS mask.
			// The previous brightness/sepia/hue-rotate filter only approximated the color
			// and rendered pink on iOS Safari (wide-gamut hue-rotate differs from desktop
			// Chrome); a mask + solid background is pixel-exact and browser-consistent.
			// aspectRatio matches the logo SVG viewBox (195x55).
			<div
				role='img'
				aria-label={logoAlt}
				className='mt-auto self-center h-[15px] sm:h-[22px]'
				style={{
					aspectRatio: "195 / 55",
					opacity: 0.95,
					backgroundColor: AMETHYST,
					WebkitMaskImage: `url(${logo})`,
					maskImage: `url(${logo})`,
					WebkitMaskRepeat: "no-repeat",
					maskRepeat: "no-repeat",
					WebkitMaskSize: "contain",
					maskSize: "contain",
					WebkitMaskPosition: "center",
					maskPosition: "center",
				}}
			/>
		) : (
			<img
				src={logo}
				alt={logoAlt}
				className='mt-auto self-center'
				style={{
					height: logoSmall ? 14 : 18,
					width: "auto",
					opacity: 0.4,
					filter: "brightness(0)",
				}}
			/>
		)}
	</div>
);

// Exchanges card visual
const ExchangesVisual = () => (
	<div className='flex flex-col justify-end gap-4 px-6 md:px-8 pb-7 flex-1 max-md:min-h-[248px]'>
		<div className='flex gap-1.5 sm:gap-2.5 flex-1 items-stretch'>
			<LatencyCol
				value='1'
				hero
				logo='/images/app/homepage/logo-bullet.svg'
				logoAlt='Bullet'
				dotCount={2}
				dotCols={2}
			/>
			<LatencyCol
				value='70'
				logo='/images/app/homepage/logo-hyperliquid.svg'
				logoAlt='Hyperliquid'
				dotCount={63}
				dotCols={9}
			/>
			<LatencyCol
				value='400'
				logo='/images/app/homepage/logo-solana.svg'
				logoAlt='Solana'
				logoSmall
				dotCount={400}
				dotCols={20}
				dotSize={3}
				dotGap={2}
			/>
		</div>
	</div>
);

const UseCasesSection = () => {
	return (
		<section data-header-theme='light' className='relative z-[2] bg-[#FDFCFF] max-md:pt-16 pb-16 md:pb-20'>
			<Container size='2xl'>
				{/* Section title */}
				<motion.h2
					className='font-slussen font-medium text-[17px] min-[431px]:text-[18px] md:text-[24px] leading-[1.25] tracking-[-0.025em] text-black/40 mb-12'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
				>
					Applications
				</motion.h2>

				{/* Two-column card grid */}
				<motion.div
					className='grid grid-cols-1 md:grid-cols-2 gap-6'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-50px" }}
					variants={staggerContainer}
				>
					{/* Agentic Payments card */}
					<motion.div variants={fadeUpVariants}>
						<Link
							href='/applications/#agentic-use-cases'
							className='group grid grid-rows-[auto_1fr] bg-white border border-black/[0.08] rounded-lg overflow-hidden transition-[border-color,box-shadow] duration-300 no-underline h-full hover:border-[#3B7BA9]'
						>
							<div className='p-6 max-md:py-7 md:p-8 md:pb-6'>
								<h3 className='font-slussen font-medium text-[20px] min-[431px]:text-[21px] md:text-[24px] leading-[1.4] tracking-[-0.01em] text-black/50 mb-2 transition-colors duration-300 group-hover:text-[#3B7BA9]'>
									Agentic Payments
								</h3>
								<span className='block font-slussenExtended font-medium text-[23px] min-[431px]:text-[26px] md:text-[32px] leading-[1.18] md:leading-[1.25] tracking-[-0.025em] text-[#1a1a1a] mb-4'>
									1B+ Payments / Second
								</span>
								<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4a4a5a]'>
									AI agents will transact at a frequency no legacy blockchain can support. We build rails so enterprises serving agents can monetize every agentic action in its ecosystem.
								</p>
							</div>
							<AgenticVisual />
						</Link>
					</motion.div>

					{/* Exchanges card */}
					<motion.div variants={fadeUpVariants}>
						<Link
							href='/applications/#exchanges-use-cases'
							className='group grid grid-rows-[auto_1fr] bg-white border border-black/[0.08] rounded-lg overflow-hidden transition-[border-color,box-shadow] duration-300 no-underline h-full hover:border-[#7C68F2]'
						>
							<div className='p-6 max-md:py-7 md:p-8 md:pb-6'>
								<h3 className='font-slussen font-medium text-[20px] min-[431px]:text-[21px] md:text-[24px] leading-[1.4] tracking-[-0.01em] text-black/50 mb-2 transition-colors duration-300 group-hover:text-[#7C68F2]'>
									Exchanges
								</h3>
								<span className='block font-slussenExtended font-medium text-[23px] min-[431px]:text-[26px] md:text-[32px] leading-[1.18] md:leading-[1.25] tracking-[-0.025em] text-[#1a1a1a] mb-4'>
									Millions of TPS &amp; Millisecond Latency
								</span>
								<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4a4a5a]'>
									The first blockchain-powered exchanges had to make compromises to build onchain. Celestia enables exchanges to maintain the throughput and UX of TradFi markets with the verifiability guarantees of a blockchain.
								</p>
							</div>
							<ExchangesVisual />
						</Link>
					</motion.div>
				</motion.div>

				{/* CTA button — prototype spacing: 48px section flex-gap + 40px
				    .use-case-cta margin-top = 88px above the button */}
				<motion.div
					className='flex justify-center mt-[88px]'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
				>
					<Link
						href='/applications/'
						className='group inline-flex items-center gap-2 font-slussen text-base font-medium text-[#1a1a1a] px-8 py-3.5 rounded-full border border-black/15 bg-transparent no-underline transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]'
					>
						See more Applications
						<span className='text-lg transition-transform duration-300 group-hover:translate-x-1'>→</span>
					</Link>
				</motion.div>
			</Container>
		</section>
	);
};

export default UseCasesSection;
