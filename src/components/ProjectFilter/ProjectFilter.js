"use client";
import { Row, Col } from "@/macros/Grids/";
import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/Container/Container";
import { Display, Body } from "@/macros/Copy/";
import FilterNavigation from "@/components/ProjectFilter/ProjectFilterNavigation";
import ProjectCard from "@/components/Cards/ProjectCard/ProjectCard";
import { AnimatePresence } from "framer-motion";
import Sticky from "react-stickynode";

import { useScrollPosition } from "@/utils/scrollLock";

const ProjectFilter = ({ id, title, description, filters, filterTarget, filtersToShow = 5, items, showCategoriesOnCard = false }) => {
	const [currentFilter, setCurrentFilter] = useState(null);
	const [filteredProjects, setFilteredProjects] = useState([...items].sort((a, b) => a.title.localeCompare(b.title)));
	const [isDesktop, setIsDesktop] = useState(false);
	let parentRef = useRef(null);
	const { navHeights } = useScrollPosition();

	let setFilter = (filter) => {
		window.scrollTo(0, parentRef.current.offsetTop - navHeights.primary - navHeights.secondary);
		setCurrentFilter(filter);
	};

	// Filter projects based on the current filter and maintain alphabetical order
	useEffect(() => {
		if (currentFilter === null) {
			setFilteredProjects([...items].sort((a, b) => a.title.localeCompare(b.title)));
		} else {
			const filteredProjects = items
				.filter((item) => {
					const filterValue = item[filterTarget];
					if (Array.isArray(filterValue)) {
						return filterValue.includes(currentFilter);
					} else {
						return filterValue === currentFilter;
					}
				})
				.sort((a, b) => a.title.localeCompare(b.title));
			setFilteredProjects(filteredProjects);
		}
	}, [currentFilter, filterTarget, items]);

	// Check if the user is on a desktop device
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsDesktop(true);
			} else {
				setIsDesktop(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<section id={id} ref={parentRef}>
				<Container size='md' className=''>
					<Row className={" lg:gap-10"}>
						<Col width={40} className='relative'>
							<Sticky
								enabled={isDesktop}
								top={navHeights.primary + navHeights.secondary}
								bottomBoundary={`#sticky-boundary-${id ? id : "bottom"}`}
							>
								<div className={"pt-10 lg:py-20"}>
									<Display size={"sm"} tag={"h2"} className={"mb-4"}>
										{title}
									</Display>
									<Body size={"md"} className={"lg:mb-10"}>
										{description}
									</Body>
									{filters?.length > 0 && filterTarget && (
										<FilterNavigation
											currentFilter={currentFilter}
											setFilter={setFilter}
											filterCategories={filters}
											filtersToShow={filtersToShow}
										/>
									)}
								</div>
							</Sticky>
						</Col>
						<Col width={60} className='pt-6 pb-10 lg:py-20'>
							<AnimatePresence>
								{filteredProjects.map((item, index) => (
									<ProjectCard
										key={`project-${index}`}
										title={item.title}
										description={item.description}
										url={item.url || null} // If no URL is provided, remove hover effect
										image={item.image}
										categories={showCategoriesOnCard ? item.categories : []}
										trackEvent={item.trackEvent}
									/>
								))}
							</AnimatePresence>
						</Col>
					</Row>
				</Container>
			</section>
			<div id={`sticky-boundary-${id ? id : "bottom"}`} />
		</>
	);
};

export default ProjectFilter;
