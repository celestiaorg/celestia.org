"use client";

import { motion } from "framer-motion";

const headerVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 28 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
	}),
};

const cards = [
	{
		icon: "/images/app/private-blockspace/pb-icon-1.svg",
		title: "Confidential by default",
		body: "Designed to keep sensitive market data private: balances, positions, order sizes, counterparties, routing logic.",
	},
	{
		icon: "/images/app/private-blockspace/pb-icon-2.svg",
		title: "Verifiable without decryption",
		body: "An anchor point provides verifiable claims on encrypted data without decrypting it.",
	},
	{
		icon: "/images/app/private-blockspace/pb-icon-3.svg",
		title: "Built for performance",
		body: "Designed to deliver millisecond-market UX while inheriting Celestia's scale and reliability.",
	},
];

const FeaturesSection = () => {
	return (
		<section
			data-header-theme='dark'
			className='bg-black-pure border-t border-white/[0.05] px-5 py-16 md:px-12 md:py-[100px] lg:px-[86px] lg:py-[120px]'
		>
			<motion.div
				className='mb-10 md:mb-16 max-w-[720px]'
				variants={headerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: "-60px" }}
			>
				<h2 className='font-slussenExtended font-medium text-[32px] leading-[1.18] tracking-[-1.5px] md:text-[42px] md:tracking-[-2.2px] text-white/90 mb-4'>
					Run confidential markets without sacrificing accountability.
				</h2>
				<p className='font-slussen text-[17px] leading-[1.65] tracking-[-0.1px] text-white/[0.72] max-w-[580px] m-0'>
					Keep balances, positions, and order flow private, while anyone can independently verify data
					availability and correctness.
				</p>
			</motion.div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{cards.map((card, i) => (
					<motion.div
						key={card.title}
						className='group flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white hover:border-white transition-colors duration-200 px-8 pt-9 pb-10'
						variants={cardVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-60px" }}
						custom={i}
					>
						<div className='flex items-center'>
							<img
								src={card.icon}
								alt=''
								className='w-[100px] h-[100px] object-contain brightness-[1.6] group-hover:brightness-0 transition-[filter] duration-200'
							/>
						</div>
						<h3 className='font-slussenExtended font-medium text-[24px] leading-[1.3] tracking-[-0.025em] text-white/90 group-hover:text-[#0a0a0a] m-0'>
							{card.title}
						</h3>
						<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-white/[0.72] group-hover:text-black/55 m-0'>
							{card.body}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default FeaturesSection;
