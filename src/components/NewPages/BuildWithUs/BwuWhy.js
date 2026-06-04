"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import AnimatedHeadline from "@/components/NewHomepage/AnimatedHeadline";

const items = [
	{
		title: "Built by the Team Behind Ethereum's Scaling Research",
		body: "Celestia's founder, Mustafa Al-Bassam, co-authored the data availability research underpinning Ethereum's scaling roadmap. The same engineering team designs and ships every Celestia chain.",
	},
	{
		title: "25+ Production Chains Built and Launched by the Team",
		body: "Celestia engineers have shipped 25+ production chains across exchanges, payment networks, and onchain financial markets. Real chains, in production, at scale.",
	},
	{
		title: "Dedicated Throughput, Owned by You",
		body: "Custom architecture and dedicated blockspace. No competition for capacity, no roadmap you do not control.",
	},
];

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * BwuWhy — "Why Celestia" (prototype .bwu-why-section).
 * Dark section: left-aligned headline, editorial 3-column layout with thin
 * vertical dividers (no card boxes). Titles reserve 2 lines so the
 * paragraphs start on the same baseline across columns.
 */
const BwuWhy = () => {
	return (
		<section data-header-theme='dark' className='bg-[#040207]'>
			<div className='mx-auto flex max-w-[1520px] flex-col gap-10 px-6 py-12 min-[680px]:px-[60px] min-[680px]:py-[60px] min-[1200px]:px-[120px] min-[1200px]:py-20'>
				<AnimatedHeadline text='Why Celestia' align='left' dark />
				<motion.div
					className='flex flex-col items-stretch gap-9 min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-12'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					variants={staggerContainer}
				>
					{items.map((item, i) => (
						<Fragment key={item.title}>
							{i > 0 && (
								<motion.span
									className='h-px w-[60px] flex-shrink-0 self-center bg-white/10 min-[900px]:h-auto min-[900px]:w-px min-[900px]:self-stretch'
									variants={itemVariants}
								/>
							)}
							<motion.div
								className='flex flex-1 flex-col items-start gap-4 text-left'
								variants={itemVariants}
							>
								<h3 className='font-slussenExtended text-[22px] font-medium leading-[1.25] tracking-[-0.025em] text-[#FDFCFF] min-[768px]:text-[24px] min-[900px]:min-h-[2.5em]'>
									{item.title}
								</h3>
								<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#C4C8CE]'>
									{item.body}
								</p>
							</motion.div>
						</Fragment>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default BwuWhy;
