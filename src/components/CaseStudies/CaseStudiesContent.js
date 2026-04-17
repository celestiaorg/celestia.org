"use client";

import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import { categories, caseStudies } from "@/data/case-studies/content";

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
	},
};

const CaseStudyCard = ({ category, image, meta, title, description, href }) => {
	const cat = categories[category];

	return (
		<motion.a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className='group flex flex-col rounded-xl overflow-hidden bg-white border border-black/[0.08] no-underline transition-colors duration-300'
			style={{ "--hover-border": cat?.color }}
			onMouseEnter={(e) => { e.currentTarget.style.borderColor = cat?.color || "rgba(0,0,0,0.14)"; }}
			onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
			variants={cardVariants}
			layout
		>
			{/* Tag pill — inside card, top */}
			<div className='px-4 pt-4'>
				<span
					className='inline-block font-slussenMono text-[11px] font-medium uppercase tracking-[1.5px] px-3 py-1 rounded-full'
					style={{
						color: cat?.tagText,
						backgroundColor: cat?.tagBg,
						border: `1px solid ${cat?.tagBorder}`,
					}}
				>
					{cat?.label}
				</span>
			</div>

			{/* Image — inset with margin and rounded */}
			<div className='mx-4 mt-3 aspect-[2000/1057] rounded-lg overflow-hidden'>
				<img
					src={image}
					alt={title}
					className='w-full h-full object-cover'
				/>
			</div>

			{/* Content */}
			<div className='flex flex-col flex-1 gap-2 px-5 pt-4 pb-5'>
				{/* Meta */}
				<p className='font-slussenMono text-[12px] leading-5 text-[#848B94]'>
					{meta}
				</p>

				{/* Title */}
				<h3 className='font-slussen font-medium text-[18px] leading-[24px] tracking-[-0.3px] text-[#1a1a2e] line-clamp-2'>
					{title}
				</h3>

				{/* Description */}
				<p className='font-slussen text-[14px] leading-[21px] text-[#64748B] line-clamp-3'>
					{description}
				</p>

				{/* Read More button — tag-colored */}
				<span
					className='mt-auto pt-3 w-full inline-flex items-center justify-center font-slussen font-medium text-sm rounded-full px-7 py-3 border transition-all duration-250'
					style={{
						color: cat?.btnText,
						borderColor: cat?.btnBorder,
					}}
				>
					Read More
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
		<section id='cs-content' data-header-theme='light' className='bg-[#FDFCFF] py-16 md:py-24 scroll-mt-32'>
			<Container size='2xl'>
				{/* Card Grid */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeFilter}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
						initial='hidden'
						animate='visible'
						variants={staggerContainer}
					>
						{filteredStudies.map((study, index) => (
							<CaseStudyCard key={`${study.category}-${index}`} {...study} />
						))}
					</motion.div>
				</AnimatePresence>
			</Container>
		</section>
	);
};

export default CaseStudiesContent;
