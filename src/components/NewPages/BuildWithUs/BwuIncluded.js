"use client";

import { motion } from "framer-motion";

const cards = [
	{
		icon: "/images/app/build/bwu-icon-1.svg",
		title: "Custom chain architecture",
		body: "Designed to your traffic profile, compliance posture, and integration surface. No retrofitting a shared chain to your business.",
	},
	{
		icon: "/images/app/build/bwu-icon-2.svg",
		title: "Dedicated engineering team",
		body: "Senior engineers assigned to your build, from discovery through launch. One team, not a vendor stack.",
	},
	{
		icon: "/images/app/build/bwu-icon-3.svg",
		title: "Production-ready handoff",
		body: "Audit, security review, and load testing complete. Mainnet-ready on your launch date.",
	},
	{
		icon: "/images/app/build/bwu-icon-4.svg",
		title: "Optional managed operations",
		body: "We host and operate the chain post-launch, or you take it in-house. You decide.",
	},
];

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * BwuIncluded — "What's included" (prototype #included .bwu-grid--2x2).
 * Dark section: muted eyebrow, 2×2 grid of bordered icon cards that invert
 * dark→white on hover (icons flip to black via brightness filter).
 */
const BwuIncluded = () => {
	return (
		<section id='included' data-header-theme='dark' className='bg-[#040207]'>
			<div className='mx-auto flex max-w-[1520px] flex-col gap-10 px-6 py-12 min-[680px]:px-[60px] min-[680px]:py-[60px] min-[1200px]:px-[120px] min-[1200px]:py-20'>
				<motion.h2
					className='font-slussen text-[17px] font-medium leading-[1.25] tracking-[-0.025em] text-white/45 min-[431px]:text-[18px] md:text-[24px]'
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					What&apos;s included
				</motion.h2>
				<motion.div
					className='grid grid-cols-1 gap-6 min-[680px]:grid-cols-2'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					variants={staggerContainer}
				>
					{cards.map((card) => (
						<motion.div
							key={card.title}
							className='group flex flex-col gap-3.5 rounded-lg border border-white/[0.07] bg-transparent p-8 transition-colors duration-[350ms] hover:border-white hover:bg-white'
							variants={cardVariants}
						>
							<div className='mb-1 flex items-center justify-start'>
								<img
									src={card.icon}
									alt=''
									className='h-auto w-auto max-w-none transition-[filter] duration-[350ms] group-hover:brightness-0'
								/>
							</div>
							<h3 className='font-slussenExtended text-[20px] font-medium leading-[1.25] tracking-[-0.025em] text-[#FDFCFF] transition-colors duration-[350ms] group-hover:text-[#0E1014] min-[431px]:text-[21px] min-[768px]:text-[24px]'>
								{card.title}
							</h3>
							<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#C4C8CE] transition-colors duration-[350ms] group-hover:text-black/55'>
								{card.body}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default BwuIncluded;
