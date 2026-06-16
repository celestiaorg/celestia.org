"use client";

import { motion, AnimatePresence } from "framer-motion";
import { caseStudies } from "@/data/case-studies/content";
import { CategoryChip } from "./CaseStudiesHero";

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.08 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] },
	},
};

// Prototype .cs-news-card — borderless column: image, chip, date, 3-line
// clamped title (fixed height so Read More buttons align), outline button.
const CaseStudyCard = ({ category, image, date, title, href }) => {
	return (
		<motion.a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className='group flex flex-col gap-5 no-underline text-inherit'
			variants={cardVariants}
			layout
		>
			{/* Image */}
			<div className='aspect-[2000/1057] rounded-lg overflow-hidden'>
				<img
					src={image}
					alt=''
					loading='lazy'
					className='w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]'
				/>
			</div>

			{/* Content */}
			<div className='flex flex-col gap-2'>
				<span className='self-start'>
					<CategoryChip category={category} />
				</span>
				<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-black/35'>
					{date}
				</p>
				<h3 className='font-slussenExtended text-[20px] font-medium leading-[1.25] tracking-[-0.025em] text-[#0E1014] line-clamp-3 min-h-[90px] min-[431px]:text-[21px] min-[768px]:text-[24px]'>
					{title}
				</h3>
				<span className='mt-1 w-full inline-flex items-center justify-center rounded-full border border-black/[0.15] bg-transparent px-7 py-3 font-slussen text-[14px] font-medium text-[#0E1014] transition-colors duration-250 group-hover:border-black/30'>
					Read more
				</span>
			</div>
		</motion.a>
	);
};

const CaseStudiesContent = ({ activeFilter }) => {
	const filteredStudies =
		activeFilter === "all"
			? caseStudies
			: caseStudies.filter((study) => study.category === activeFilter);

	return (
		<section
			id='cs-content'
			data-header-theme='light'
			className='bg-[#FDFCFF] pb-12 min-[600px]:pb-[60px] min-[1200px]:pb-20 scroll-mt-[104px]'
		>
			<div className='mx-auto max-w-[1520px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]'>
				{/* Card grid — 3 / 2 / 1 columns (prototype .cs-grid-light) */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeFilter}
						className='grid grid-cols-1 gap-6 min-[768px]:grid-cols-2 min-[900px]:grid-cols-3'
						initial='hidden'
						animate='visible'
						variants={staggerContainer}
					>
						{filteredStudies.map((study, index) => (
							<CaseStudyCard key={`${study.category}-${index}`} {...study} />
						))}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
};

export default CaseStudiesContent;
