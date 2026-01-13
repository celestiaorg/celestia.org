"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useHeaderTheme - Detects whether the header is over a dark or light background
 *
 * This hook uses IntersectionObserver to efficiently track which sections
 * are currently under the header, and returns the appropriate theme.
 *
 * Sections should be marked with data-header-theme="dark" or data-header-theme="light"
 *
 * @returns {{ theme: 'dark' | 'light' }} - Current theme based on underlying section
 */
export const useHeaderTheme = () => {
	const [theme, setTheme] = useState("dark"); // Default to dark (white header text)
	const intersectingElementsRef = useRef(new Map());
	const observerRef = useRef(null);

	// Calculate which section is topmost (closest to header)
	const calculateActiveTheme = useCallback(() => {
		const intersectingElements = intersectingElementsRef.current;

		if (intersectingElements.size === 0) {
			return "dark"; // Default theme when no sections are intersecting
		}

		// Find the topmost intersecting section
		let topmostElement = null;
		let topmostTop = Infinity;

		intersectingElements.forEach((sectionTheme, element) => {
			const rect = element.getBoundingClientRect();
			if (rect.top < topmostTop) {
				topmostTop = rect.top;
				topmostElement = { element, theme: sectionTheme };
			}
		});

		return topmostElement?.theme || "dark";
	}, []);

	// Handle intersection changes
	const handleIntersection = useCallback((entries) => {
		entries.forEach((entry) => {
			const element = entry.target;
			const sectionTheme = element.getAttribute("data-header-theme");

			if (entry.isIntersecting && sectionTheme) {
				intersectingElementsRef.current.set(element, sectionTheme);
			} else {
				intersectingElementsRef.current.delete(element);
			}
		});

		const newTheme = calculateActiveTheme();
		setTheme((prevTheme) => (prevTheme !== newTheme ? newTheme : prevTheme));
	}, [calculateActiveTheme]);

	useEffect(() => {
		// Create IntersectionObserver with thin detection zone at header position
		// -32px top: delays detection until section is ~32px past viewport top (middle of ~64px header)
		// -93% bottom: creates a thin observation zone at the top of viewport
		observerRef.current = new IntersectionObserver(handleIntersection, {
			rootMargin: "-32px 0px -93% 0px",
			threshold: 0,
		});

		// Observe all sections with data-header-theme attribute
		const observeSections = () => {
			const sections = document.querySelectorAll("[data-header-theme]");
			sections.forEach((section) => {
				observerRef.current?.observe(section);
			});
		};

		// Initial observation
		observeSections();

		// MutationObserver to handle dynamically added sections
		const mutationObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						// Check if the added node has the attribute
						if (node.hasAttribute && node.hasAttribute("data-header-theme")) {
							observerRef.current?.observe(node);
						}
						// Check descendants
						if (node.querySelectorAll) {
							const descendants = node.querySelectorAll("[data-header-theme]");
							descendants.forEach((descendant) => {
								observerRef.current?.observe(descendant);
							});
						}
					}
				});
			});
		});

		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => {
			observerRef.current?.disconnect();
			mutationObserver.disconnect();
			intersectingElementsRef.current.clear();
		};
	}, [handleIntersection]);

	return { theme };
};

export default useHeaderTheme;
