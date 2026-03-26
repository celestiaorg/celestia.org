"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import { featuredCaseStudy } from "@/data/case-studies/content";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

const CaseStudiesHero = () => {
	return (
		<section data-header-theme='dark' className='bg-[#040207]'>
			{/* Title — centered */}
			<Container size='lg' className='pt-[160px] pb-16 md:pb-20 flex flex-col items-center text-center'>
				<motion.h1
					className='font-slussenExtended font-medium text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] tracking-[-2.5px] text-[#FDFCFF] max-w-[800px]'
					variants={fadeUpVariants}
					initial='hidden'
					animate='visible'
					custom={0.1}
				>
					Blockspace enabling the most ambitious onchain networks
				</motion.h1>
			</Container>

			{/* Featured Case Study — grid layout */}
			<Container size='lg' className='pb-16 md:pb-20'>
				<motion.a
					href={featuredCaseStudy.href}
					target='_blank'
					rel='noopener noreferrer'
					className='group grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-14 items-center no-underline'
					variants={fadeUpVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					custom={0.2}
				>
					{/* Image */}
					<div className='aspect-[16/9] rounded-[10px] overflow-hidden'>
						<img
							src={featuredCaseStudy.image}
							alt={featuredCaseStudy.title}
							className='w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.02]'
						/>
					</div>

					{/* Content */}
					<div className='flex flex-col gap-4'>
						{/* Tag — plain text, not a pill */}
						<span className='font-slussenMono text-[13px] font-medium uppercase tracking-[1.5px] text-[#848B94]'>
							{featuredCaseStudy.tag}
						</span>

						{/* Meta */}
						<p className='font-slussenMono text-[13px] leading-[24px] text-[#848B94]'>
							{featuredCaseStudy.meta}
						</p>

						{/* Title */}
						<h2 className='font-slussenExtended font-medium text-[26px] md:text-[32px] lg:text-[36px] leading-[1.22] tracking-[-1.5px] text-[#FDFCFF]'>
							{featuredCaseStudy.title}
						</h2>

						{/* Read More — outline button */}
						<span className='self-start inline-flex items-center justify-center font-slussen font-medium text-sm rounded-full px-7 py-3 border border-white/[0.12] text-white/60 group-hover:text-white/90 group-hover:border-white/20 transition-all duration-200 mt-2'>
							Read More
						</span>
					</div>
				</motion.a>
			</Container>
		</section>
	);
};

export default CaseStudiesHero;
