"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";

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

const benefits = [
	{
		title: (
			<>
				Throughput
				<br />
				no one else has.
			</>
		),
		description:
			"Unlike legacy blockchains, Celestia separates compute and storage so each can scale independently. We built Fibre to accommodate 1 Tb/s of data throughput (~1B+ transactions per second), so you can move your business onto blockchain rails, no matter how ambitious your vision.",
		svg: "/images/app/homepage/benefit-1-animated.svg",
	},
	{
		title: (
			<>
				Built by us.
				<br />
				Owned by you.
			</>
		),
		description:
			"We design the infrastructure, ship the chain, and hand it over production-ready. You control the infrastructure, the roadmap, and the economics from day one.",
		svg: "/images/app/homepage/benefit-3-animated.svg",
	},
	{
		title: (
			<>
				High Potential Businesses
				<br />
				Built on Low Fees
			</>
		),
		description:
			"Celestia enables you to offer low cost payments and financial transactions to your users that you can scale into real revenue. With Fibre, you can easily sustain 1M TPS, charge your users $0.0001 per transaction, and generate $3B+ in annual revenue.",
		svg: "/images/app/homepage/benefit-2-animated.svg",
	},
];

const BenefitCard = ({ title, description, svg }) => (
	<motion.div
		className='group flex flex-col bg-transparent border border-[rgba(226,232,240,0.1)] rounded-lg overflow-hidden relative'
		variants={fadeUpVariants}
	>
		{/* Animated SVG visual */}
		{/* Mobile (prototype): shorter visual crop — aspect 679/500 vs desktop 679/652 */}
		<div className='w-full aspect-[679/500] md:aspect-[679/652] overflow-hidden flex items-center justify-center bg-[#08070C] border-b border-[rgba(226,232,240,0.1)]'>
			<object
				type='image/svg+xml'
				data={svg}
				className='block w-full h-full'
				style={{ objectFit: "cover" }}
			/>
		</div>

		{/* Text content */}
		<div className='flex flex-col gap-4 p-6 pb-8 md:p-8 md:pb-10 flex-1 transition-colors duration-350 group-hover:bg-white'>
			<h3 className='font-nuberNextWide font-medium text-[20px] min-[431px]:text-[21px] md:text-[24px] leading-[1.25] tracking-[-0.025em] text-[#FDFCFF] min-h-[60px] transition-colors duration-350 group-hover:text-[#040207]'>
				{title}
			</h3>
			<p className='font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] text-[#B0B7C0] flex-1 transition-colors duration-350 group-hover:text-[#5a5a5a]'>
				{description}
			</p>
		</div>
	</motion.div>
);

const BenefitsSection = () => {
	return (
		<section data-header-theme='dark' className='relative z-[2] bg-[#040207] py-16 md:py-20'>
			<Container size='2xl'>
				{/* Section title */}
				<motion.h2
					className='font-nuberNext font-medium text-[17px] min-[431px]:text-[18px] md:text-[24px] leading-[1.25] tracking-[-0.025em] text-white/45 mb-8'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
				>
					Why Celestia
				</motion.h2>

				{/* 3-column grid */}
				<motion.div
					className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-50px" }}
					variants={staggerContainer}
				>
					{benefits.map((benefit, index) => (
						<BenefitCard key={index} {...benefit} />
					))}
				</motion.div>
			</Container>
		</section>
	);
};

export default BenefitsSection;
