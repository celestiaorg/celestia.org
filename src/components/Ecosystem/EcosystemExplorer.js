"use client";
import Container from "@/components/Container/Container";
import { ecosystemData } from "@/data/ecosystem/ecosystemExplorer";
import GhostButton from "@/macros/Buttons/GhostButton";
import { Body, Display } from "@/macros/Copy";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const EcosystemExplorer = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({});
	const [filteredItems, setFilteredItems] = useState([]);
	const [categoryVisibility, setCategoryVisibility] = useState({});
	const accordionRefs = useRef({});
	const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
	const filterPanelRef = useRef(null);

	// Initialize selected filters and category visibility
	useEffect(() => {
		const initialFilters = {};
		const initialVisibility = {};

		ecosystemData.categories.forEach((category) => {
			initialVisibility[category.id] = true;
			category.subcategories.forEach((subcategory) => {
				initialFilters[subcategory.id] = false;
			});
		});

		setSelectedFilters(initialFilters);
		setCategoryVisibility(initialVisibility);
		setFilteredItems(ecosystemData.items);
	}, []);

	// Handle click outside to close mobile filters
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (mobileFiltersVisible && filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
				// Check if the click was on the filter toggle button
				const filterToggleButton = document.getElementById("filter-toggle-button");
				if (!filterToggleButton.contains(event.target)) {
					setMobileFiltersVisible(false);
				}
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// Prevent body scroll when filter panel is open on mobile
		if (mobileFiltersVisible) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "auto";
		};
	}, [mobileFiltersVisible]);

	// Filter items based on search term and selected filters
	useEffect(() => {
		let filtered = ecosystemData.items;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(item) =>
					item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Check if any filters are selected
		const anyFilterSelected = Object.values(selectedFilters).some((value) => value);

		// If filters are selected, apply them
		if (anyFilterSelected) {
			filtered = filtered.filter((item) => selectedFilters[item.category]);
		}

		setFilteredItems(filtered);
	}, [searchTerm, selectedFilters]);

	// Toggle filter selection
	const handleFilterChange = (filterId) => {
		setSelectedFilters((prev) => ({
			...prev,
			[filterId]: !prev[filterId],
		}));
	};

	// Toggle category visibility with animation
	const toggleCategoryVisibility = (categoryId) => {
		setCategoryVisibility((prev) => ({
			...prev,
			[categoryId]: !prev[categoryId],
		}));
	};

	// Count active filters
	const activeFilterCount = Object.values(selectedFilters).filter(Boolean).length;

	return (
		<section className='pt-16 pb-16 sm:pb-[200px] bg-white'>
			<Container size='lg'>
				<Display size='sm' className='mb-10'>
					Explore our Ecosystem
				</Display>

				<div className='flex flex-col gap-8 lg:flex-row'>
					{/* Mobile filter toggle */}
					<div className='w-full mb-4 lg:hidden'>
						<div className='flex items-center justify-between'>
							<button
								id='filter-toggle-button'
								onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
								className='flex items-center px-4 py-2 text-sm font-medium border border-[#413B46] rounded-full'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='mr-2'
								>
									<line x1='4' y1='21' x2='4' y2='14'></line>
									<line x1='4' y1='10' x2='4' y2='3'></line>
									<line x1='12' y1='21' x2='12' y2='12'></line>
									<line x1='12' y1='8' x2='12' y2='3'></line>
									<line x1='20' y1='21' x2='20' y2='16'></line>
									<line x1='20' y1='12' x2='20' y2='3'></line>
									<line x1='1' y1='14' x2='7' y2='14'></line>
									<line x1='9' y1='8' x2='15' y2='8'></line>
									<line x1='17' y1='16' x2='23' y2='16'></line>
								</svg>
								Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
							</button>

							{/* Search input for mobile */}
							<div className=''>
								<input
									type='text'
									placeholder='Search'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full px-4 py-2 transition-all duration-300 border border-[#413B46] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
							</div>
						</div>
					</div>

					{/* Mobile filter backdrop */}
					<div
						className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
							mobileFiltersVisible ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
						onClick={() => setMobileFiltersVisible(false)}
					></div>

					{/* Filters sidebar */}
					<div
						ref={filterPanelRef}
						className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:static lg:transform-none lg:shadow-none lg:w-1/4 lg:z-auto ${
							mobileFiltersVisible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
						}`}
					>
						{/* Mobile filter header */}
						<div className='sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-200 lg:hidden'>
							<Body size='md' className='font-medium'>
								Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
							</Body>
							<button
								onClick={() => setMobileFiltersVisible(false)}
								className='p-1 rounded-full hover:bg-gray-100'
								aria-label='Close filters'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<line x1='18' y1='6' x2='6' y2='18'></line>
									<line x1='6' y1='6' x2='18' y2='18'></line>
								</svg>
							</button>
						</div>

						{/* Filter categories */}
						<div className='h-full p-4 overflow-y-auto lg:p-0 lg:border-0'>
							{ecosystemData.categories.map((category) => (
								<div key={category.id} className={`${categoryVisibility[category.id] ? "mb-8" : "mb-0"} transition-all duration-300`}>
									<div
										className='flex items-center justify-between mb-4 cursor-pointer'
										onClick={() => toggleCategoryVisibility(category.id)}
									>
										<Body size='md' className='font-medium'>
											{category.name}
										</Body>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
												categoryVisibility[category.id] ? "rotate-180" : ""
											}`}
										>
											<polyline points='6 9 12 15 18 9'></polyline>
										</svg>
									</div>
									<div
										ref={(el) => (accordionRefs.current[category.id] = el)}
										className='overflow-hidden transition-all duration-300 ease-in-out'
										style={{
											maxHeight: categoryVisibility[category.id] ? `${category.subcategories.length * 32}px` : "0px",
											opacity: categoryVisibility[category.id] ? 1 : 0,
										}}
									>
										<div className='py-1 space-y-2'>
											{category.subcategories.map((subcategory) => (
												<div key={subcategory.id} className='flex items-center'>
													<input
														type='checkbox'
														id={subcategory.id}
														checked={selectedFilters[subcategory.id] || false}
														onChange={() => handleFilterChange(subcategory.id)}
														className='w-4 h-4 mr-2 border-gray-300 rounded accent-purple'
													/>
													<label htmlFor={subcategory.id} className='text-sm cursor-pointer'>
														{subcategory.name}
													</label>
												</div>
											))}
										</div>
									</div>
								</div>
							))}

							{/* Mobile apply filters button */}
							<div className='sticky bottom-0 left-0 right-0 p-4 mt-auto bg-white border-t border-gray-200 lg:hidden'>
								<button
									onClick={() => setMobileFiltersVisible(false)}
									className='w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-300 rounded-full bg-purple hover:bg-purple-dark'
								>
									Apply Filters
								</button>
							</div>
						</div>
					</div>

					{/* Main content */}
					<div className='w-full lg:w-3/4'>
						{/* Search input for desktop */}
						<div className='hidden mb-8 lg:block'>
							<input
								type='text'
								placeholder='Search'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-ful max-w-[290px] px-4 py-2 transition-all duration-300 border border-[#413B46] rounded-full focus:outline-none focus:ring-2 focus:ring-purple'
							/>
						</div>

						{/* Grid of items */}
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{filteredItems.map((item, index) => (
								<div
									key={index}
									className='flex flex-col h-full px-6 pt-6 pb-2 transition-all duration-300 border border-[#413B46] rounded-lg hover:shadow-md'
								>
									<div className='flex mb-4'>
										<div className='flex w-12 h-12'>
											<Image
												src={item.image || "/images/app/ecosystem/placeholder.png"}
												alt={item.title}
												width={48}
												height={48}
												className='w-auto h-auto max-w-full max-h-full'
											/>
										</div>
									</div>
									<Display size='xs' className='mb-2 !text-xl !font-medium'>
										{item.title}
									</Display>
									<Body size='sm' className='mb-4 text-black'>
										{item.description}
									</Body>
									<div className='flex flex-wrap gap-2 mt-auto mb-4'>
										<span className='px-2 py-1 text-xs bg-gray-100 rounded-sm'>
											{ecosystemData.categories
												.find((cat) => cat.subcategories.some((sub) => sub.id === item.category))
												?.subcategories.find((sub) => sub.id === item.category)?.name || item.category}
										</span>
									</div>

									<GhostButton key={index} href={item.url} className='md:inline-flex'>
										Explore
									</GhostButton>
								</div>
							))}
						</div>

						{/* Empty state */}
						{filteredItems.length === 0 && (
							<div className='py-12 text-center'>
								<Body size='lg'>No items match your search criteria.</Body>
								<Body size='md' className='mt-2 text-gray-600'>
									Try adjusting your filters or search term.
								</Body>
							</div>
						)}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default EcosystemExplorer;
