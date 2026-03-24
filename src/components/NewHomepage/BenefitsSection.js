"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";

// Animation variants
const fadeUpVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

// Benefit card — vertical layout with image top, text bottom, hover color inversion
const BenefitCard = ({ title, description, imageSrc, imageAlt, index = 0, isLast }) => {
	return (
		<motion.div
			className={`group flex-1 flex flex-col bg-transparent ${
				!isLast ? "border-b md:border-b-0 md:border-r border-[rgba(226,232,240,0.1)]" : ""
			}`}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: "-50px" }}
			custom={index * 0.15}
			variants={cardVariants}
		>
			{/* Image area */}
			<div className='relative w-full h-[200px] md:h-[300px] lg:h-[380px] overflow-hidden'>
				<img
					src={imageSrc}
					alt={imageAlt}
					className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
				/>
				{/* Bottom gradient fade */}
				<div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#040207] to-transparent pointer-events-none' />
			</div>

			{/* Text content */}
			<div className='flex flex-col gap-4 px-0 py-6 md:px-8 md:py-8 lg:pt-8 lg:pb-10 flex-1 transition-colors duration-350 group-hover:bg-white'>
				<h3 className='font-slussen font-medium text-[20px] md:text-[24px] leading-[1.25] tracking-[-1px] text-white transition-colors duration-350 group-hover:text-[#040207]'>
					{title}
				</h3>
				<p className='font-slussen text-[14px] leading-[22px] text-[#B0B7C0] transition-colors duration-350 group-hover:text-[#5a5a5a] flex-1'>
					{description}
				</p>
			</div>
		</motion.div>
	);
};

const benefits = [
	{
		title: "Built for Machine Scale",
		description:
			"Celestia Fibre delivers 1 Tb/s of throughput: enough for hundreds of millions of TPS. Whether your product processes payments, API calls, or autonomous agent activity, the infrastructure will never be the bottleneck.",
		imageSrc: "/images/app/homepage/benefit-machine-scale.webp",
		imageAlt: "Built for machine scale",
	},
	{
		title: "Revenue Is Entirely Yours",
		description:
			"Every transaction on your chain generates fee revenue. On a shared chain, that value leaks to someone else's validator set. On Celestia, you run your own sequencer and capture 100% of it.",
		imageSrc: "/images/app/homepage/benefit-revenue.webp",
		imageAlt: "Revenue is entirely yours",
	},
	{
		title: "Lean Integration and Operation",
		description:
			"Celestia's API is POST and GET. You don't need to adopt an opinionated execution environment or inherit someone else's architectural decisions. Build the chain your product actually needs.",
		imageSrc: "/images/app/homepage/benefit-lean-integration.webp",
		imageAlt: "Lean integration and operation",
	},
];

const BenefitsSection = () => {
	return (
		<section data-header-theme='dark' className='bg-[#040207] pb-12 pt-8 md:pt-24 md:pb-20'>
			<Container size='lg'>
				<div className='flex flex-col gap-8 md:gap-12'>
					{/* Section label */}
					<motion.h3
						className='font-slussen font-medium text-[24px] tracking-[-0.5px] text-white/50'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						variants={fadeUpVariants}
					>
						Benefits
					</motion.h3>

					{/* Benefit cards — 3 columns on desktop, stacked on mobile */}
					<div className='flex flex-col md:flex-row'>
						{benefits.map((benefit, index) => (
							<BenefitCard
								key={index}
								index={index}
								title={benefit.title}
								description={benefit.description}
								imageSrc={benefit.imageSrc}
								imageAlt={benefit.imageAlt}
								isLast={index === benefits.length - 1}
							/>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default BenefitsSection;
