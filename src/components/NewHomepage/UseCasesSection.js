"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";

// Color tokens matching prototype CSS variables
const HORIZON = "#4A7EA8";
const PARCHMENT = "#A89480";

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

// Dot grid component for the latency visual
const DotGrid = ({ count, cols, dotSize = 6, gap = 3, hero = false }) => (
	<div
		className='justify-self-center mt-2'
		style={{
			display: "grid",
			gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
			gap: `${gap}px`,
			justifyContent: "center",
		}}
	>
		{Array.from({ length: count }).map((_, i) => (
			<span
				key={i}
				className='rounded-full'
				style={{
					width: dotSize,
					height: dotSize,
					background: hero ? PARCHMENT : "#2a2a3a",
					opacity: hero ? 0.5 : 0.15,
				}}
			/>
		))}
	</div>
);

// Agentic Payments card visual
const AgenticVisual = () => (
	<div className='flex flex-col justify-end gap-4 px-6 md:px-8 pb-7'>
		{/* Answer block */}
		<div>
			<div className='font-slussen text-[20px] font-medium tracking-[-0.5px]' style={{ color: HORIZON }}>
				Celestia Fibre delivers up to
			</div>
			<div className='font-slussenExtended font-bold text-[48px] md:text-[64px] leading-[1.1] tracking-[-2px] mt-1' style={{ color: HORIZON }}>
				1.25B <span className='text-[36px] md:text-[48px] font-medium opacity-70'>TPS</span>
			</div>
		</div>

		{/* Quote */}
		<div className='flex gap-3.5 p-4 md:p-5 bg-black/[0.02] border border-black/[0.08] rounded-lg'>
			<div className='w-[3px] flex-shrink-0 rounded-sm' style={{ background: HORIZON }} />
			<div className='flex flex-col gap-2.5'>
				<p className='font-slussenMono text-[13px] leading-[21px] text-[#4a4a5a] italic'>
					Cloudflare CEO said they&apos;re contemplating building an L1 because they need more throughput — expecting{" "}
					<strong className='font-semibold not-italic' style={{ color: HORIZON }}>
						a billion micro-transactions per second
					</strong>{" "}
					in the next 5-10 years
				</p>
				<div className='flex items-center gap-2 flex-wrap'>
					<span className='font-slussenMono text-xs font-semibold text-[#1a1a1a]'>Graham Novak</span>
					<span className='font-slussenMono text-[11px] text-[#8a8a9a]'>@gnovak_</span>
					<span className='font-slussenMono text-[11px] text-[#8a8a9a]'>
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
		className='flex-1 flex flex-col items-center gap-1.5 py-3.5 px-2.5 rounded-lg border'
		style={{
			background: hero ? "rgba(168, 148, 128, 0.06)" : "rgba(0, 0, 0, 0.015)",
			borderColor: hero ? "rgba(168, 148, 128, 0.22)" : "rgba(0, 0, 0, 0.06)",
		}}
	>
		{/* Number */}
		<div className='flex items-baseline justify-center gap-1'>
			<span
				className='font-slussenExtended font-bold leading-none tracking-[-1px]'
				style={{
					fontSize: hero ? 36 : 32,
					color: hero ? PARCHMENT : "rgba(0, 0, 0, 0.25)",
				}}
			>
				{value}
			</span>
			<span
				className='font-slussenExtended text-[13px]'
				style={{ color: hero ? PARCHMENT : "rgba(0, 0, 0, 0.2)", opacity: hero ? 0.7 : 1 }}
			>
				{unit}
			</span>
		</div>

		{/* Dot grid */}
		<DotGrid count={dotCount} cols={dotCols} dotSize={dotSize || 6} gap={dotGap || 3} hero={hero} />

		{/* Logo */}
		<img
			src={logo}
			alt={logoAlt}
			className='mt-auto self-center'
			style={{
				height: hero ? 22 : logoSmall ? 14 : 18,
				width: "auto",
				opacity: hero ? 0.8 : 0.4,
				filter: hero
					? "brightness(0) saturate(100%) invert(60%) sepia(20%) saturate(500%) hue-rotate(350deg) brightness(0.9)"
					: "brightness(0)",
			}}
		/>
	</div>
);

// Exchanges card visual
const ExchangesVisual = () => (
	<div className='flex flex-col justify-end gap-3.5 px-6 md:px-8 pb-7 flex-1'>
		<div className='font-slussen text-[20px] font-medium tracking-[-0.5px]' style={{ color: PARCHMENT }}>
			Latency
		</div>
		<div className='flex gap-2.5 flex-1 items-stretch'>
			<LatencyCol
				value='1.2'
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
		<section data-header-theme='light' className='relative z-[2] bg-[#FDFCFF] pb-12 md:pb-20'>
			<Container size='2xl'>
				{/* Section title */}
				<motion.h2
					className='font-slussen font-medium text-[26px] tracking-[-0.6px] text-[#1a1a1a] mb-10'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
				>
					Use Cases
				</motion.h2>

				{/* Two-column card grid */}
				<motion.div
					className='grid grid-cols-1 md:grid-cols-2 gap-4'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-50px" }}
					variants={staggerContainer}
				>
					{/* Agentic Payments card */}
					<motion.div variants={fadeUpVariants}>
						<Link
							href='/use-cases/#agentic-use-cases'
							className='group grid grid-rows-[auto_1fr] bg-white border border-black/[0.08] rounded-xl overflow-hidden transition-[border-color,box-shadow] duration-300 no-underline h-full hover:border-[#4A7EA8]'
						>
							<div className='p-6 md:p-8 pb-5 md:pb-6'>
								<h3 className='font-slussen font-medium text-[28px] md:text-[34px] leading-[40px] tracking-[-1.2px] text-[#1a1a1a] mb-5'>
									Agentic Payments
								</h3>
								<p className='font-slussen text-sm leading-[23px] text-[#4a4a5a]'>
									AI agents are projected to generate 500B+ paid requests per day by 2028. Every API call, every crawl, every inference query becomes a micropayment. Celestia Fibre can deliver up to 1.25B TPS to meet that demand.
								</p>
							</div>
							<AgenticVisual />
						</Link>
					</motion.div>

					{/* Exchanges card */}
					<motion.div variants={fadeUpVariants}>
						<Link
							href='/use-cases/#exchanges-use-cases'
							className='group grid grid-rows-[auto_1fr] bg-white border border-black/[0.08] rounded-xl overflow-hidden transition-[border-color,box-shadow] duration-300 no-underline h-full hover:border-[#A89480]'
						>
							<div className='p-6 md:p-8 pb-5 md:pb-6'>
								<h3 className='font-slussen font-medium text-[28px] md:text-[34px] leading-[40px] tracking-[-1.2px] text-[#1a1a1a] mb-5'>
									Exchanges
								</h3>
								<p className='font-slussen text-sm leading-[23px] text-[#4a4a5a]'>
									Onchain perpetual futures hit $8T in volume in 2025, up 12x in two years. Celestia-powered exchanges already benchmark sub-millisecond order placement and 20,000+ orders per second, with blockspace to scale into the millions.
								</p>
							</div>
							<ExchangesVisual />
						</Link>
					</motion.div>
				</motion.div>

				{/* CTA button */}
				<motion.div
					className='flex justify-center mt-10'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
				>
					<Link
						href='/use-cases/'
						className='group inline-flex items-center gap-2 font-slussen text-base font-medium text-[#1a1a1a] px-8 py-3.5 rounded-full border border-black/15 bg-transparent no-underline transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]'
					>
						See Use Cases
						<span className='text-lg transition-transform duration-300 group-hover:translate-x-1'>→</span>
					</Link>
				</motion.div>
			</Container>
		</section>
	);
};

export default UseCasesSection;
