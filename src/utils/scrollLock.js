"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Providing a default value matching the context type
const ScrollPositionContext = createContext(undefined);

export const ScrollPositionProvider = ({ children }) => {
	const pathname = usePathname();
	const scrollY = useRef(0);
	const setScrollY = (position) => {
		scrollY.current = position;
	};
	const [scrollIsLocked, setScrollIsLocked] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	// State for body styles to prevent hydration issues
	const [bodyStyles, setBodyStyles] = useState({});

	// Get the height of each navigation section
	const primaryNavRef = useRef(null);
	const secondaryNavRef = useRef(null);

	const [navHeights, setNavHeights] = useState({
		primary: 0,
		secondary: 0,
		tertiary: 0,
	});

	// Update primary nav height
	useEffect(() => {
		const updatePrimaryHeight = () => {
			setNavHeights((prevHeights) => ({
				...prevHeights,
				primary: primaryNavRef.current?.offsetHeight || 0,
			}));
		};

		updatePrimaryHeight();

		// Listen for both resize and scroll events to catch nav height changes
		window.addEventListener("resize", updatePrimaryHeight);
		window.addEventListener("scroll", updatePrimaryHeight);

		// Use ResizeObserver for more accurate height tracking if available
		let resizeObserver;
		if (primaryNavRef.current && window.ResizeObserver) {
			resizeObserver = new ResizeObserver(updatePrimaryHeight);
			resizeObserver.observe(primaryNavRef.current);
		}

		return () => {
			window.removeEventListener("resize", updatePrimaryHeight);
			window.removeEventListener("scroll", updatePrimaryHeight);
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, [primaryNavRef]);

	// Update secondary nav height
	useEffect(() => {
		const updateSecondaryHeight = () => {
			setNavHeights((prevHeights) => ({
				...prevHeights,
				secondary: secondaryNavRef.current?.offsetHeight || 0,
			}));
		};
		updateSecondaryHeight();
		window.addEventListener("resize", updateSecondaryHeight);
		return () => window.removeEventListener("resize", updateSecondaryHeight);
	}, [secondaryNavRef]);

	// Reset nav heights when the component is unmounted or the page changes
	useEffect(() => {
		const resetNavHeights = () => {
			setNavHeights(() => ({
				primary: primaryNavRef.current?.offsetHeight || 0,
				secondary: secondaryNavRef.current?.offsetHeight || 0,
			}));
		};

		resetNavHeights();
	}, [pathname]);

	// Adjust scroll position to consider sticky nav heights for anchor links on click
	useEffect(() => {
		const handleAnchorLinkClick = (event) => {
			// Skip processing for external links
			if (event.currentTarget.hasAttribute("data-external-link")) {
				return;
			}

			event.preventDefault(); // Prevent default behavior for anchor link clicks

			// Get the href of the currentTarget, which will always be the anchor (`<a>`).
			const targetId = event.currentTarget.getAttribute("href");

			if (targetId && targetId.startsWith("#")) {
				const element = document.querySelector(targetId);
				if (element) {
					const yOffset = -(navHeights.primary + navHeights.secondary); // Offset for sticky navs
					const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
					window.scrollTo({ top: y, behavior: "smooth" });
				}
			}
		};

		// Add click event listener to anchor links
		const anchorLinks = document.querySelectorAll('a[href^="#"]');
		anchorLinks.forEach((link) => {
			link.addEventListener("click", handleAnchorLinkClick);
		});

		// Cleanup event listeners on unmount
		return () => {
			anchorLinks.forEach((link) => {
				link.removeEventListener("click", handleAnchorLinkClick);
			});
		};
	}, [navHeights]);

	// Handle hash links when visiting the site with an anchor link in the URL
	useEffect(() => {
		if (window.location.hash) {
			const handleHashLinkOnLoad = () => {
				const hash = window.location.hash;
				const targetElement = document.querySelector(hash);

				if (targetElement) {
					const yOffset = -(navHeights.primary + navHeights.secondary);
					const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

					// Use a timeout to wait for the rest of the page to load before scrolling
					setTimeout(() => {
						window.scrollTo({ top: y, behavior: "smooth" });
					}, 100);
				}
			};

			handleHashLinkOnLoad();
		}
	}, [pathname, navHeights]);

	// Lock scroll when the menu is open - only runs on client-side
	useEffect(() => {
		// Skip during server-side rendering to prevent hydration issues
		if (typeof window === "undefined") return;

		if (scrollIsLocked) {
			// Save the current scroll position and set lock styles
			const currentY = window.scrollY;
			setScrollY(currentY);
			// Update body styles through state
			setBodyStyles({
				position: "fixed",
				top: `-${currentY}px`,
				width: "100%",
				overflow: "hidden",
				overscrollBehaviorX: "none",
			});
		} else {
			// Reset styles when unlocked
			setBodyStyles({});
			// Restore scroll position if needed
			if (scrollY.current !== 0) {
				window.scrollTo(0, scrollY.current);
			}
		}
	}, [scrollIsLocked]);

	// Apply body styles using an effect that only runs on the client
	useEffect(() => {
		// Skip during server-side rendering
		if (typeof window === "undefined") return;

		// Apply styles directly to body element
		Object.entries(bodyStyles).forEach(([prop, value]) => {
			document.body.style[prop] = value;
		});

		// Clean up function to reset styles when component unmounts
		return () => {
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.body.style.overflow = "";
			document.body.style.overscrollBehaviorX = "";
		};
	}, [bodyStyles]);

	useEffect(() => {
		setMenuIsOpen(false);
	}, [pathname]);

	return (
		<ScrollPositionContext.Provider
			value={{
				scrollY,
				setScrollY,
				scrollIsLocked,
				setScrollIsLocked,
				menuIsOpen,
				setMenuIsOpen,
				primaryNavRef,
				secondaryNavRef,
				navHeights,
			}}
		>
			{children}
		</ScrollPositionContext.Provider>
	);
};

export const useScrollPosition = () => {
	const context = useContext(ScrollPositionContext);
	if (context === undefined) {
		throw new Error("useScrollPosition must be used within a ScrollPositionProvider");
	}
	return context;
};

export default ScrollPositionProvider;
