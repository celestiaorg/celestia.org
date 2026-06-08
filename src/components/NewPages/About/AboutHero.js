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

/**
 * AboutHero — light/frost hero (ported from prototype .about-hero).
 * Full-viewport frost section so the dark sections below don't peek above
 * the fold. Left: "Who we are" display title, 18px muted lead, body
 * paragraphs, dark pill "Our team" CTA. Right: three stacked stats.
 */
const AboutHero = () => {
	return (
		<section className='relative flex min-h-[min(100svh,1100px)] md:min-h-[min(60svh,700px)] min-[1200px]:min-h-[min(100svh,900px)] flex-col bg-[#FDFCFF] px-6 pt-[140px] pb-[60px] min-[600px]:px-[60px] min-[600px]:pt-40 min-[600px]:pb-20 min-[1200px]:px-[120px] min-[1200px]:pt-[clamp(150px,24svh,260px)] min-[1200px]:pb-[clamp(48px,8svh,100px)]'>
			{/* Freeze: content caps at 1280px on wide screens, extra space becomes padding */}
			<div className='mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-12 min-[900px]:flex-row min-[900px]:gap-20'>
				{/* Left — content */}
				<motion.div
					className='flex max-w-full flex-1 flex-col items-start min-[900px]:max-w-[580px]'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-80px" }}
				>
					<motion.h1
						className='mb-5 font-slussenExtended text-[31px] font-medium leading-[1.1] tracking-[-0.04em] text-[#0E1014] min-[431px]:text-[36px] min-[769px]:text-[56px] min-[900px]:text-[72px]'
						variants={fadeUp}
						custom={0.1}
					>
						Who we are
					</motion.h1>
					<motion.p
						className='mb-5 font-slussen text-[17px] font-normal leading-[1.5] tracking-[-0.01em] text-[#4A5058] min-[431px]:text-[18px]'
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
						<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4A5058]'>
							We are a full-stack partner. We design and build a chain from first principles for your specific traffic profile and application needs, then hand it to you production-ready. You own the infrastructure and the economics.
						</p>
						<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4A5058]'>
							Celestia Foundation supports the long-term development, governance, and ecosystem of the Celestia network. Celestia Labs is the core engineering team that builds and maintains it.
						</p>
					</motion.div>
					{/* CTA — dark pill, prototype .contact-btn-dark */}
					<motion.div className='mt-8' variants={fadeUp} custom={0.3}>
						<Link
							href='#leadership'
							className='inline-flex items-center justify-center rounded-full border border-[#0E1014] bg-[#0E1014] px-6 py-2.5 font-slussen text-[14px] font-medium text-[#FDFCFF] no-underline transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]'
						>
							Our team
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
							<span className='font-slussenExtended text-[32px] font-semibold leading-none tracking-[-0.02em] text-[#0E1014] min-[900px]:text-[56px]'>
								{stat.number}
							</span>
							<span className='max-w-[260px] font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#4A5058]'>
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
