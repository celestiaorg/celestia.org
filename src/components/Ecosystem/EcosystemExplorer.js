"use client";
import Container from "@/components/Container/Container";
import { ecosystemData } from "@/data/ecosystem/ecosystemExplorer";
import { Body, Display } from "@/macros/Copy";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const EcosystemExplorer = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({});
	const [filteredItems, setFilteredItems] = useState([]);
	const [categoryVisibility, setCategoryVisibility] = useState({});

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

	// Toggle category visibility
	const toggleCategoryVisibility = (categoryId) => {
		setCategoryVisibility((prev) => ({
			...prev,
			[categoryId]: !prev[categoryId],
		}));
	};

	return (
		<section className='py-16 bg-white'>
			<Container size='lg'>
				<Display size='md' className='mb-8'>
					Explore our Ecosystem
				</Display>

				<div className='flex flex-col gap-8 lg:flex-row'>
					{/* Filters sidebar */}
					<div className='w-full lg:w-1/4'>
						{ecosystemData.categories.map((category) => (
							<div key={category.id} className='mb-8'>
								<div
									className='flex items-center justify-between mb-4 cursor-pointer'
									onClick={() => toggleCategoryVisibility(category.id)}
								>
									<Body size='lg' className='font-medium'>
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
										className={`w-4 h-4 transition-transform ${categoryVisibility[category.id] ? "rotate-180" : ""}`}
									>
										<polyline points='6 9 12 15 18 9'></polyline>
									</svg>
								</div>
								{categoryVisibility[category.id] && (
									<div className='space-y-2'>
										{category.subcategories.map((subcategory) => (
											<div key={subcategory.id} className='flex items-center'>
												<input
													type='checkbox'
													id={subcategory.id}
													checked={selectedFilters[subcategory.id] || false}
													onChange={() => handleFilterChange(subcategory.id)}
													className='w-4 h-4 mr-2 border-gray-300 rounded'
												/>
												<label htmlFor={subcategory.id} className='text-sm cursor-pointer'>
													{subcategory.name}
												</label>
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>

					{/* Main content */}
					<div className='w-full lg:w-3/4'>
						{/* Search input */}
						<div className='mb-8'>
							<input
								type='text'
								placeholder='Search'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>

						{/* Grid of items */}
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{filteredItems.map((item, index) => (
								<div key={index} className='flex flex-col h-full p-6 border border-gray-200 rounded-lg'>
									<div className='flex justify-center mb-4'>
										<div className='flex items-center justify-center w-12 h-12'>
											<Image
												src={item.image || "/images/app/ecosystem/placeholder.png"}
												alt={item.title}
												width={48}
												height={48}
												className='w-auto h-auto max-w-full max-h-full'
											/>
										</div>
									</div>
									<Display size='xs' className='mb-2 text-center'>
										{item.title}
									</Display>
									<Body size='sm' className='mb-4 text-center text-gray-600'>
										{item.description}
									</Body>
									<div className='flex flex-wrap justify-center gap-2 mt-auto mb-4'>
										<span className='px-3 py-1 text-xs bg-gray-100 rounded-full'>
											{ecosystemData.categories
												.find((cat) => cat.subcategories.some((sub) => sub.id === item.category))
												?.subcategories.find((sub) => sub.id === item.category)?.name || item.category}
										</span>
										<span className='px-3 py-1 text-xs bg-gray-100 rounded-full'>Category</span>
									</div>
									<Link
										href={item.url}
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800'
									>
										Explore
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
											className='w-4 h-4 ml-1'
										>
											<line x1='5' y1='12' x2='19' y2='12'></line>
											<polyline points='12 5 19 12 12 19'></polyline>
										</svg>
									</Link>
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
