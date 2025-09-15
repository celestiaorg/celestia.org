"use client";
import React, { useState, useEffect } from "react";
import { Body, Label } from "@/macros/Copy";
import { useRouter } from "next/navigation";
import { useScrollPosition } from "@/utils/scrollLock";
import Sticky from "react-stickynode";

const SidebarNavigation = ({ title, anchors }) => {
	const { navHeights } = useScrollPosition();
	const [isDesktop, setIsDesktop] = useState(false);

	const [sectionRefs, setSectionRefs] = useState([]);
	const [activeSection, setActiveSection] = useState(null);
	const [progress, setProgress] = useState(0);
	const router = useRouter();

	useEffect(() => {
		setSectionRefs(
			anchors.sections.map((section) => {
				return document.getElementById(section.id);
			})
		);
	}, [anchors]);

	useEffect(() => {
		const handleScroll = () => {
			// Retrieve the top position of each section relative to the viewport
			const sectionTops = sectionRefs.map((ref) => ref?.getBoundingClientRect().top || 0);

			// Determine the active section based on its position within the viewport
			const activeIndex = sectionTops.findIndex((top) => top > window.innerHeight / 2);

			// Calculate the ID of the active section; if no section qualifies, set to the last section
			const activeId = activeIndex === -1 ? sectionRefs.length - 1 : activeIndex - 1;

			// Update active section and reset progress if a new section is active
			if (activeId !== activeSection) {
				setActiveSection(activeId);
				setProgress(0);
			} else {
				// If the last section is active, calculate progress based on the bottom of the last section
				if (activeId === sectionRefs.length - 1) {
					const lastSectionRef = sectionRefs[sectionRefs.length - 1];
					const sectionHeight = lastSectionRef.offsetHeight;
					const scrolledAmount = window.innerHeight / 2 - sectionTops[sectionRefs.length - 1];
					setProgress((scrolledAmount / sectionHeight) * 100);
				} else {
					// For other sections, calculate progress based on scroll amount within the section
					const currentSectionRef = sectionRefs[activeIndex - 1];
					if (currentSectionRef) {
						const sectionHeight = currentSectionRef.offsetHeight;
						const scrolledAmount = window.innerHeight / 2 - sectionTops[activeIndex - 1];
						setProgress((scrolledAmount / sectionHeight) * 100);
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [anchors, activeSection, sectionRefs, router, navHeights]);

	// Check if the user is on a desktop device
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1024) {
				setIsDesktop(true);
			} else {
				setIsDesktop(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleClick = (event, index) => {
		event.preventDefault();
		const section = sectionRefs[index];
		const offset = 180; // Adjust this value as needed
		const topPosition = section.getBoundingClientRect().top + window.scrollY - offset;

		window.scrollTo({
			top: topPosition,
			behavior: "smooth",
		});
	};

	return (
		<div
			// Adjust the top padding to account for the sticky nav and trick the browser into scrolling to the correct position
			style={{
				marginTop: `-${navHeights.primary + navHeights.secondary}px`,
				paddingTop: `${navHeights.primary + navHeights.secondary}px`,
			}}
		>
			<Sticky enabled={isDesktop} top={navHeights.primary + navHeights.secondary} bottomBoundary={"#tertiaryPageContainer"}>
				<nav className={`pt-2.5 lg:py-20 z-10`}>
					{title && (
						<>
							<Body size={"sm"} className={"mb-4"}>
								On this page
							</Body>
							<Label tag={"h1"} size={"lg"} className={"mb-4"}>
								{title}
							</Label>
						</>
					)}
					<div className='w-full h-1 lg:mb-2 bg-white-weak overflow-hidden hidden lg:block'>
						<div className='h-1 bg-black' style={{ width: `${progress}%` }}></div>
					</div>
					<ol>
						{anchors.sections.map((anchor, index) => {
							return (
								<li key={`sidebar-${anchor.id}`}>
									<a href={`#${anchor.id}`} onClick={(event) => handleClick(event, index)}>
										<Body
											size={"sm"}
											className={`mb-3 transition-colors duration-300 text-black ${
												activeSection === index ? "lg:text-black" : "lg:text-weak"
											}`}
										>
											{anchor.title}
										</Body>
									</a>
								</li>
							);
						})}
					</ol>
				</nav>
			</Sticky>
		</div>
	);
};

export default SidebarNavigation;
