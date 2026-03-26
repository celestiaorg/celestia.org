"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { categories, caseStudies } from "@/data/case-studies/content";

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
			staggerChildren: 0.1,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.3,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

const CaseStudyCard = ({ category, image, meta, title, description, href }) => {
	const tagColor = categories[category]?.color;
	const tagLabel = categories[category]?.label;

	return (
		<motion.div
			className='group flex flex-col rounded-lg overflow-hidden bg-white border border-black/[0.06] hover:shadow-lg transition-shadow duration-300 relative'
			variants={cardVariants}
			layout
		>
			{/* Colored top border accent on hover */}
			<div
				className='absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'
				style={{ backgroundColor: tagColor }}
			/>

			{/* Tag pill overlay */}
			<div className='absolute top-4 left-4 z-10'>
				<span
					className='inline-block px-3 py-1 rounded-full text-[11px] font-slussen font-medium uppercase tracking-[0.5px]'
					style={{
						backgroundColor: `${tagColor}18`,
						color: tagColor,
						backdropFilter: "blur(8px)",
					}}
				>
					{tagLabel}
				</span>
			</div>

			{/* Image */}
			<a href={href} target='_blank' rel='noopener noreferrer' className='block'>
				<div className='aspect-[2000/1057] overflow-hidden'>
					<img
						src={image}
						alt={title}
						className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
					/>
				</div>
			</a>

			{/* Content */}
			<div className='flex flex-col gap-4 p-5 md:p-6 flex-1'>
				{/* Meta */}
				<p className='font-slussenMono text-[12px] leading-[20px] text-black/35'>
					{meta}
				</p>

				{/* Title */}
				<h3 className='font-slussen font-medium text-[18px] md:text-[20px] leading-[1.3] tracking-[-0.5px] text-[#17141A] line-clamp-2'>
					{title}
				</h3>

				{/* Description */}
				<p className='font-slussen text-[14px] leading-[22px] text-black/50 line-clamp-3 flex-1'>
					{description}
				</p>

				{/* Button */}
				<div className='mt-auto pt-2'>
					<Button
						variant='pill-outline'
						size='pill-md'
						href={href}
						className='w-full !text-black/50 !border-black/[0.12] hover:!text-black/85 hover:!border-black/25'
					>
						Read More
					</Button>
				</div>
			</div>
		</motion.div>
	);
};

const CaseStudiesContent = () => {
	const [activeFilter, setActiveFilter] = useState("all");

	const filteredStudies =
		activeFilter === "all"
			? caseStudies
			: caseStudies.filter((study) => study.category === activeFilter);

	return (
		<section data-header-theme='light' className='bg-[#FDFCFF] py-16 md:py-24'>
			<Container size='lg'>
				<div className='flex flex-col gap-10 md:gap-12'>
					{/* Filter Tabs */}
					<motion.div
						className='flex flex-wrap gap-2 md:gap-3'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						variants={fadeUpVariants}
					>
						{Object.entries(categories).map(([key, { label, color }]) => {
							const isActive = activeFilter === key;
							return (
								<button
									key={key}
									onClick={() => setActiveFilter(key)}
									className={`
										font-slussen text-[14px] font-medium px-5 py-2.5 rounded-full
										transition-all duration-200 cursor-pointer border
										${
											isActive
												? "text-white border-transparent"
												: "text-black/50 border-black/[0.1] bg-transparent hover:border-black/20 hover:text-black/70"
										}
									`}
									style={
										isActive
											? {
													backgroundColor: key === "all" ? "#17141A" : color,
													borderColor: key === "all" ? "#17141A" : color,
											  }
											: {}
									}
								>
									{label}
								</button>
							);
						})}
					</motion.div>

					{/* Card Grid */}
					<AnimatePresence mode='wait'>
						<motion.div
							key={activeFilter}
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
							initial='hidden'
							animate='visible'
							exit='exit'
							variants={staggerContainer}
						>
							{filteredStudies.map((study, index) => (
								<CaseStudyCard key={`${study.category}-${index}`} {...study} />
							))}
						</motion.div>
					</AnimatePresence>
				</div>
			</Container>
		</section>
	);
};

export default CaseStudiesContent;
