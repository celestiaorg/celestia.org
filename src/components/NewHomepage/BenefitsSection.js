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
		num: "01",
		title: "Unmatched Scale",
		description:
			"Celestia Fibre can handle up to 1.25 billion transactions per second with latency as low as one millisecond — internet-scale blockspace, ready for the products that need it.",
		svg: "/images/app/homepage/benefit-1-animated.svg",
	},
	{
		num: "02",
		title: "Your Custom Chain, Your Revenue",
		description: (
			<>
				Build with complete architectural freedom — your execution logic, your rules.
				<br />
				<br />
				Every transaction generates fee revenue for you. Celestia handles data availability, meaning you don&apos;t need to subsidise a validator set to stay secure.
			</>
		),
		svg: "/images/app/homepage/benefit-2-animated.svg",
	},
	{
		num: "03",
		title: "We Build It for You",
		description: (
			<>
				If you already have distribution, you don&apos;t need to hire a blockchain team.
				<br />
				<br />
				Leave the work to us. We architect, build, and deploy a custom blockchain tailored exclusively to your product — so you can focus on delivering product, not infrastructure.
			</>
		),
		svg: "/images/app/homepage/benefit-3-animated.svg",
	},
];

const BenefitCard = ({ num, title, description, svg }) => (
	<motion.div
		className='group flex flex-col bg-transparent border border-[rgba(226,232,240,0.1)] rounded-lg overflow-hidden relative'
		variants={fadeUpVariants}
	>
		{/* Animated SVG visual */}
		<div className='w-full aspect-[679/652] md:aspect-[679/652] overflow-hidden flex items-center justify-center bg-[#08070C] border-b border-[rgba(226,232,240,0.1)]'>
			<object
				type='image/svg+xml'
				data={svg}
				className='block w-full h-full'
				style={{ objectFit: "cover" }}
			/>
		</div>

		{/* Text content */}
		<div className='flex flex-col gap-4 p-6 md:p-8 md:pb-10 flex-1 transition-colors duration-350 group-hover:bg-white'>
			<span className='font-slussenMono text-sm text-white/35 transition-colors duration-350 group-hover:text-black/30'>
				{num}
			</span>
			<h3 className='font-slussen font-medium text-[24px] leading-[30px] tracking-[-1px] text-[#FDFCFF] transition-colors duration-350 group-hover:text-[#040207]'>
				{title}
			</h3>
			<p className='font-slussen text-sm leading-[22px] text-[#B0B7C0] flex-1 transition-colors duration-350 group-hover:text-[#5a5a5a]'>
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
					className='font-slussen font-medium text-[26px] tracking-[-0.6px] text-white/70 mb-8'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
				>
					Benefits
				</motion.h2>

				{/* 3-column grid */}
				<motion.div
					className='grid grid-cols-1 md:grid-cols-3 gap-4'
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
