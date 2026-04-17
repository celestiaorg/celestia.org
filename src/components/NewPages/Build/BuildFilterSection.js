"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/macros/Link/Link";

const FilterTab = ({ label, isActive, onClick }) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`font-slussen font-medium text-[12px] leading-[22px] tracking-[-0.2px] px-[14px] py-1.5 rounded-full border transition-all duration-200 ${
				isActive
					? "text-[#040207] border-[#040207] bg-black/[0.04]"
					: "text-black/40 border-black/10 bg-transparent hover:text-[#040207] hover:border-black/20"
			}`}
		>
			{label}
		</button>
	);
};

const itemVariants = {
	hidden: { opacity: 0, y: 12 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 26 },
	},
	exit: {
		opacity: 0,
		y: -8,
		transition: { duration: 0.15 },
	},
};

const ListItem = ({ title, description, image, url, isFirst }) => {
	const content = (
		<>
			<div className='w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden'>
				<img src={image} alt={title} className='w-full h-full object-cover block' />
			</div>
			<div className='flex-1 min-w-0'>
				<strong className='block font-slussen font-medium text-[15px] tracking-[-0.3px] text-[#1a1a1a] mb-0.5'>
					{title}
				</strong>
				<p className='font-slussen text-[13px] leading-[19px] text-[#6a6a7a] whitespace-nowrap overflow-hidden text-ellipsis'>
					{description}
				</p>
			</div>
			<img
				src='/images/app/build/arrow-right.svg'
				alt=''
				aria-hidden='true'
				className='w-3.5 h-3.5 opacity-20 flex-shrink-0 brightness-0 transition-[opacity,transform] duration-200 group-hover/item:opacity-50 group-hover/item:translate-x-[3px]'
			/>
		</>
	);

	const baseClasses = `group/item flex items-center gap-[18px] py-[18px] border-b border-black/[0.07] no-underline transition-[padding-left] duration-200 hover:pl-1.5 ${
		isFirst ? "border-t border-black/[0.07]" : ""
	}`;

	if (url) {
		return (
			<Link href={url} className={baseClasses}>
				{content}
			</Link>
		);
	}
	return <div className={baseClasses}>{content}</div>;
};

const BuildFilterSection = ({ id, sectionLabel, title, description, items, filterKey = "categories" }) => {
	const [activeFilter, setActiveFilter] = useState(null);

	const categories = useMemo(() => {
		const all = new Set();
		items.forEach((item) => {
			const value = item[filterKey];
			if (Array.isArray(value)) value.forEach((c) => all.add(c));
			else if (value) all.add(value);
		});
		return Array.from(all).sort();
	}, [items, filterKey]);

	const filteredItems = useMemo(() => {
		const sorted = [...items].sort((a, b) => a.title.localeCompare(b.title));
		if (!activeFilter) return sorted;
		return sorted.filter((item) => {
			const value = item[filterKey];
			if (Array.isArray(value)) return value.includes(activeFilter);
			return value === activeFilter;
		});
	}, [items, activeFilter, filterKey]);

	return (
		<section
			id={id}
			data-header-theme='light'
			className='bg-[#FDFCFF] border-t border-black/[0.06] py-16 px-5 md:py-24 md:px-[60px] xl:px-[120px]'
		>
			<div className='grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-20 items-start'>
				{/* LEFT */}
				<div className='flex flex-col lg:sticky lg:top-24 lg:self-start'>
					{sectionLabel && (
						<span className='inline-block font-slussenMono text-[11px] font-medium uppercase tracking-[1.5px] text-black/30 mb-3.5'>
							{sectionLabel}
						</span>
					)}
					<h2 className='font-slussenExtended font-medium text-[32px] leading-[40px] tracking-[-1.5px] md:text-[42px] md:leading-[52px] md:tracking-[-2px] text-[#1a1a1a] mb-3.5'>
						{title}
					</h2>
					<p className='font-slussen text-[14px] leading-[22px] text-[#6a6a7a] mb-8'>
						{description}
					</p>
					{categories.length > 0 && (
						<div className='flex flex-wrap gap-1.5'>
							<FilterTab label='All' isActive={activeFilter === null} onClick={() => setActiveFilter(null)} />
							{categories.map((cat) => (
								<FilterTab
									key={cat}
									label={cat}
									isActive={activeFilter === cat}
									onClick={() => setActiveFilter(cat)}
								/>
							))}
						</div>
					)}
				</div>

				{/* RIGHT */}
				<motion.div layout className='flex flex-col'>
					<AnimatePresence mode='popLayout' initial={false}>
						{filteredItems.map((item, index) => (
							<motion.div
								key={item.title}
								variants={itemVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								layout
							>
								<ListItem
									title={item.title}
									description={item.description}
									image={item.image}
									url={item.url}
									isFirst={index === 0}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
};

export default BuildFilterSection;
