"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { categories, featuredCaseStudy } from "@/data/case-studies/content";

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

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const CaseStudiesHero = () => {
	const tagColor = categories[featuredCaseStudy.category]?.color;
	const tagLabel = categories[featuredCaseStudy.category]?.label;

	return (
		<section data-header-theme='dark' className='bg-[#040207] pt-32 md:pt-40 pb-16 md:pb-20'>
			<Container size='lg'>
				<motion.div
					className='flex flex-col gap-12 md:gap-16'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={staggerContainer}
				>
					{/* Title */}
					<motion.h1
						className='font-slussenExtended font-medium text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2] tracking-[-1.5px] text-white max-w-[800px]'
						variants={fadeUpVariants}
					>
						Blockspace enabling the most ambitious onchain networks
					</motion.h1>

					{/* Featured Case Study Card */}
					<motion.a
						href={featuredCaseStudy.href}
						target='_blank'
						rel='noopener noreferrer'
						className='group flex flex-col lg:flex-row gap-0 rounded-lg overflow-hidden border border-white/[0.08] bg-[#0A0710] no-underline hover:border-white/[0.15] transition-colors duration-300'
						variants={fadeUpVariants}
					>
						{/* Image */}
						<div className='relative w-full lg:w-[55%] aspect-[16/9] lg:aspect-auto overflow-hidden'>
							<img
								src={featuredCaseStudy.image}
								alt={featuredCaseStudy.title}
								className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
							/>
						</div>

						{/* Content */}
						<div className='flex flex-col justify-center gap-5 p-6 md:p-8 lg:p-10 w-full lg:w-[45%]'>
							{/* Tag */}
							<div>
								<span
									className='inline-block px-3 py-1 rounded-full text-xs font-slussen font-medium uppercase tracking-[0.5px]'
									style={{
										backgroundColor: `${tagColor}20`,
										color: tagColor,
									}}
								>
									{tagLabel}
								</span>
							</div>

							{/* Meta */}
							<p className='font-slussenMono text-[13px] leading-[24px] text-white/40'>
								{featuredCaseStudy.meta}
							</p>

							{/* Title */}
							<h2 className='font-slussen font-medium text-[22px] md:text-[26px] lg:text-[30px] leading-[1.25] tracking-[-0.8px] text-white'>
								{featuredCaseStudy.title}
							</h2>

							{/* Description */}
							<p className='font-slussen text-[15px] leading-[24px] text-white/50'>
								{featuredCaseStudy.description}
							</p>

							{/* Button */}
							<div className='mt-2'>
								<Button variant='pill-outline' size='pill-md' href={featuredCaseStudy.href}>
									Read More
								</Button>
							</div>
						</div>
					</motion.a>
				</motion.div>
			</Container>
		</section>
	);
};

export default CaseStudiesHero;
