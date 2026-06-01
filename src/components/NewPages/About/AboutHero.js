"use client";

import { motion } from "framer-motion";
import Link from "@/macros/Link/Link";
import { aboutStats } from "@/data/about/team";

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
	}),
};

const statsContainer = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay: 0.3, staggerChildren: 0.15 },
	},
};

const statItem = {
	hidden: { opacity: 0, y: 14 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Chevron = () => (
	<svg width='10' height='6' viewBox='0 0 10 6' fill='none' className='shrink-0'>
		<path
			d='M1 1L5 5L9 1'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

/**
 * AboutHero — light/frost hero (ported from prototype .about-hero).
 * Left: muted "About Celestia" label, "Who we are" display title, lead +
 * body paragraphs, and an "Our team" scroll hint. Right: three stacked stats.
 */
const AboutHero = () => {
	return (
		<section className='relative flex flex-col justify-center bg-[#FDFCFF] px-6 pt-[140px] pb-[60px] min-[600px]:px-[60px] min-[600px]:pt-40 min-[600px]:pb-20 min-[1200px]:px-[120px] min-[1200px]:pt-[180px] min-[1200px]:pb-[100px]'>
			<div className='flex flex-col items-start justify-between gap-12 min-[900px]:flex-row min-[900px]:gap-20'>
				{/* Left — content */}
				<motion.div
					className='flex max-w-full flex-1 flex-col items-start justify-between min-[900px]:max-w-[580px] min-[900px]:self-stretch'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-80px" }}
				>
					<div className='flex flex-col items-start'>
					<motion.h1
						className='mb-3 font-slussen text-[24px] font-medium leading-[1.25] tracking-[-0.025em] text-black/40'
						variants={fadeUp}
					>
						About Celestia
					</motion.h1>
					<motion.h2
						className='mb-7 font-slussenExtended text-[42px] font-medium leading-[1.1] tracking-[-0.04em] text-[#1a1a1a] min-[600px]:text-[56px] min-[900px]:text-[72px]'
						variants={fadeUp}
						custom={0.1}
					>
						Who we are
					</motion.h2>
					<motion.p
						className='mb-5 font-slussen text-[24px] font-medium leading-[1.25] tracking-[-0.025em] text-[#1a1a1a]'
						variants={fadeUp}
						custom={0.15}
					>
						Celestia builds dedicated, high-throughput chains for companies with internet-scale traffic.
					</motion.p>
					<motion.div
						className='flex flex-col gap-4'
						variants={fadeUp}
						custom={0.2}
					>
						<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4a4a5a]'>
							We are a full-stack partner. We design and build a chain from first principles for your specific traffic profile and application needs, then hand it to you production-ready. You own the infrastructure and the economics.
						</p>
						<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4a4a5a]'>
							Celestia Foundation supports the long-term development, governance, and ecosystem of the Celestia network. Celestia Labs is the core engineering team that builds and maintains it.
						</p>
					</motion.div>
					</div>
					<motion.div className='pt-12' variants={fadeUp} custom={0.3}>
						<Link
							href='#leadership'
							className='inline-flex items-center gap-1.5 font-slussen text-[14px] font-medium tracking-[-0.01em] text-[#4a4a5a] no-underline transition-opacity hover:opacity-70'
						>
							Our team <Chevron />
						</Link>
					</motion.div>
				</motion.div>

				{/* Right — stats */}
				<motion.div
					className='flex w-full shrink-0 flex-col gap-6 pt-2 min-[600px]:flex-row min-[900px]:w-auto min-[900px]:flex-col min-[900px]:gap-10'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-80px" }}
					variants={statsContainer}
				>
					{aboutStats.map((stat, i) => (
						<motion.div
							key={stat.number}
							className={`flex flex-1 flex-col gap-1.5 border-b border-black/[0.08] pb-6 min-[600px]:border-b-0 min-[600px]:border-r min-[600px]:pb-0 min-[600px]:pr-8 min-[600px]:last:border-r-0 min-[600px]:last:pr-0 min-[900px]:border-b min-[900px]:border-r-0 min-[900px]:pb-10 min-[900px]:pr-0 ${
								i === aboutStats.length - 1
									? "min-[900px]:border-b-0 min-[900px]:pb-0"
									: ""
							}`}
							variants={statItem}
						>
							<span className='font-slussenExpanded text-[32px] font-semibold leading-none tracking-[-0.02em] text-[#1a1a1a] min-[900px]:text-[56px]'>
								{stat.number}
							</span>
							<span className='max-w-[260px] font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4a4a5a]'>
								{stat.label}
							</span>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default AboutHero;
