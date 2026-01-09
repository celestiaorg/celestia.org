"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";

/**
 * Filter button component
 */
const FilterButton = ({ label, isActive, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`
				font-untitledSans font-medium text-sm uppercase tracking-[0.225px]
				px-4 py-4 rounded-full transition-all duration-200
				${isActive
					? "bg-black text-white"
					: "bg-transparent text-black border border-black/10 hover:border-black/30"
				}
			`}
		>
			{label}
		</button>
	);
};

/**
 * Animation variants for list items
 */
const itemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 24,
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.2,
		},
	},
};

/**
 * List item component
 */
const ListItem = ({ title, description, image, url, isLast }) => {
	const content = (
		<>
			<div className='flex items-center gap-6 md:gap-8 py-1'>
				{/* Icon */}
				<div className='w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full overflow-hidden bg-gray-100'>
					<img
						src={image}
						alt={title}
						className='w-full h-full object-cover'
					/>
				</div>

				{/* Content */}
				<div className='flex flex-col gap-1 md:gap-1.5 min-w-0'>
					<h3 className='font-untitledSans font-medium text-base md:text-xl tracking-[-0.4px] text-black'>
						{title}
					</h3>
					<p className='font-untitledSans text-sm text-black leading-[20px]'>
						{description}
					</p>
				</div>
			</div>
		</>
	);

	const wrapperClasses = `block transition-opacity hover:opacity-70 ${!isLast ? "border-b border-black/10 pb-6" : ""}`;

	if (url) {
		return (
			<Link href={url} className={wrapperClasses}>
				{content}
			</Link>
		);
	}

	return <div className={wrapperClasses}>{content}</div>;
};

/**
 * BuildFilterSection - Reusable filterable list section
 * Used for "Choose a framework" and "Rollups-as-a-Service" sections
 */
const BuildFilterSection = ({
	id,
	title,
	description,
	items,
	filterKey = "categories",
	className = ""
}) => {
	const [activeFilter, setActiveFilter] = useState(null);

	// Extract unique categories from items
	const categories = useMemo(() => {
		const allCategories = new Set();
		items.forEach(item => {
			const value = item[filterKey];
			if (Array.isArray(value)) {
				value.forEach(cat => allCategories.add(cat));
			} else if (value) {
				allCategories.add(value);
			}
		});
		return Array.from(allCategories).sort();
	}, [items, filterKey]);

	// Filter items based on active filter
	const filteredItems = useMemo(() => {
		if (!activeFilter) {
			return [...items].sort((a, b) => a.title.localeCompare(b.title));
		}
		return items
			.filter(item => {
				const value = item[filterKey];
				if (Array.isArray(value)) {
					return value.includes(activeFilter);
				}
				return value === activeFilter;
			})
			.sort((a, b) => a.title.localeCompare(b.title));
	}, [items, activeFilter, filterKey]);

	return (
		<section
			id={id}
			data-header-theme='light'
			className={`bg-white py-16 md:py-[104px] ${className}`}
		>
			<Container size='lg'>
				<div className='flex flex-col lg:flex-row gap-10 lg:gap-[104px]'>
					{/* Left side - Title, description, filters */}
					<div className='lg:w-[40%] lg:sticky lg:top-24 lg:self-start'>
						<div className='flex flex-col gap-8 md:gap-10'>
							{/* Title and description */}
							<div className='flex flex-col gap-2'>
								<h2 className='font-untitledSans font-medium text-[32px] md:text-[48px] leading-[1.1] tracking-[-2px] text-black'>
									{title}
								</h2>
								<p className='font-untitledSans text-base text-black leading-[24px]'>
									{description}
								</p>
							</div>

							{/* Filter buttons */}
							{categories.length > 0 && (
								<div className='flex flex-wrap gap-3 md:gap-4'>
									<FilterButton
										label="All"
										isActive={activeFilter === null}
										onClick={() => setActiveFilter(null)}
									/>
									{categories.map((category) => (
										<FilterButton
											key={category}
											label={category}
											isActive={activeFilter === category}
											onClick={() => setActiveFilter(category)}
										/>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Right side - List of items */}
					<div className='lg:w-[60%]'>
						<motion.div layout className='flex flex-col gap-6'>
							<AnimatePresence mode="popLayout">
								{filteredItems.map((item, index) => (
									<motion.div
										key={item.title}
										variants={itemVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										layout
									>
										<ListItem
											title={item.title}
											description={item.description}
											image={item.image}
											url={item.url}
											isLast={index === filteredItems.length - 1}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default BuildFilterSection;
