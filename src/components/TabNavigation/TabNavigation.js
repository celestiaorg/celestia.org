"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useScrollPosition } from "@/utils/scrollLock";
import Sticky from "react-stickynode";

const TabNavigation = ({ navigation }) => {
	const pathname = usePathname();
	const { navHeights, secondaryNavRef } = useScrollPosition();
	const [currentTab, setCurrentTab] = useState(0);
	const [showLeftGradient, setShowLeftGradient] = useState(false);
	const [showRightGradient, setShowRightGradient] = useState(false);
	const navRef = useRef(null);

	useEffect(() => {
		const tab = Object.keys(navigation).find((tab) => navigation[tab].replace(/\/$/, "") === pathname);

		setCurrentTab(tab);
	}, [pathname, navigation]);

	// useEffect(() => {
	//   const handleScroll = () => {
	//     if (
	//       window.scrollY >=
	//       placeholderRef.current?.offsetTop - navHeights.primary
	//     ) {
	//       if (!isSticky) {
	//         setIsSticky(true);
	//       }
	//     } else {
	//       if (isSticky) {
	//         setIsSticky(false);
	//       }
	//     }
	//   };

	//   handleScroll();
	//   window.addEventListener("scroll", handleScroll);

	//   return () => {
	//     window.removeEventListener("scroll", handleScroll);
	//   };
	// }, [navHeights, isSticky, secondaryNavRef]);

	useEffect(() => {
		// Scroll the active tab into view
		const activeTab = document.querySelector(".active-tab");
		if (activeTab && navRef.current) {
			const navOffset = 8;
			navRef.current.scroll({
				left: activeTab.offsetLeft - navOffset,
				behavior: "smooth",
			});
		}
	}, [currentTab]);

	const handleNavScroll = () => {
		if (navRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
			setShowLeftGradient(scrollLeft > 0);
			setShowRightGradient(scrollLeft + clientWidth < scrollWidth);
		}
	};

	useEffect(() => {
		handleNavScroll();
		const navElement = navRef.current;
		if (navElement) {
			navElement.addEventListener("scroll", handleNavScroll);
		}
		return () => {
			if (navElement) {
				navElement.removeEventListener("scroll", handleNavScroll);
			}
		};
	}, []);

	return (
		<>
			{/* Replace the nav when stick with an empty block to prevent vertical jump */}
			{/* <div
        ref={placeholderRef}
        className="block w-full"
        style={{ height: isSticky ? `${navHeights.secondary}px` : 0 }}
      /> */}
			<Sticky enabled top={navHeights.primary} bottomBoundary={"#learn-bottom"} className='z-30 relative'>
				<nav
					className={`w-full border-b border-black bg-white-weak z-30
      
        `}
					// ${isSticky ? "fixed" : "relative"}
					// style={{ top: isSticky ? `${navHeights.primary}px` : "auto" }}
					ref={secondaryNavRef}
				>
					<Container size={"lg"} className='overflow-visible' padding={false}>
						<div className='relative'>
							{/* Left Gradient */}
							{showLeftGradient && (
								<div className='absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white-weak to-transparent pointer-events-none z-10' />
							)}
							{/* Right Gradient */}
							{showRightGradient && (
								<div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white-weak to-transparent pointer-events-none z-10' />
							)}
							<div ref={navRef} className='flex overflow-x-scroll w-auto mx-auto gap-2 p-4 no-scrollbar'>
								{Object.keys(navigation).map((tab, index) => (
									<div className={"overflow-hidden table shrink-0 rounded-full"} key={`tab-${index}`}>
										{currentTab === tab ? (
											<PrimaryButton className={"relative whitespace-nowrap active-tab"} hover={false}>
												{tab}
											</PrimaryButton>
										) : (
											<PrimaryButton
												href={navigation[tab]}
												lightMode
												className={"relative whitespace-nowrap"}
												// onClick={() => {
												//   // setCurrentTab(tab);
												//   window.scrollTo({ top: 0 });
												// }}
											>
												{tab}
											</PrimaryButton>
										)}
									</div>
								))}
							</div>
						</div>
					</Container>
				</nav>
			</Sticky>
		</>
	);
};

export default TabNavigation;
