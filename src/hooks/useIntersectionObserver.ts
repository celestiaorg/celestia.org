import { useEffect, useState, useRef, RefObject } from "react";

interface UseIntersectionObserverOptions {
	rootMargin?: string;
	threshold?: number;
	triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn<T extends HTMLElement = HTMLElement> {
	ref: RefObject<T | null>;
	isIntersecting: boolean;
}

/**
 * Custom hook for intersection observer functionality
 *
 * @param options - Intersection observer options
 * @param options.rootMargin - Margin around the root (default: "50px")
 * @param options.threshold - Threshold for intersection (default: 0.1)
 * @param options.triggerOnce - Whether to stop observing after first intersection (default: true)
 * @returns Object with ref and isIntersecting state
 *
 * @example
 * ```tsx
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   rootMargin: "100px",
 *   threshold: 0.5,
 *   triggerOnce: false
 * });
 *
 * return <div ref={ref}>Content that triggers when {isIntersecting ? "visible" : "hidden"}</div>;
 * ```
 */
export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>({
	rootMargin = "50px",
	threshold = 0.1,
	triggerOnce = true,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn<T> => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const ref = useRef<T>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsIntersecting(true);
						if (triggerOnce) {
							observer.unobserve(entry.target);
						}
					} else if (!triggerOnce) {
						setIsIntersecting(false);
					}
				});
			},
			{
				rootMargin,
				threshold,
			}
		);

		observer.observe(element);

		return () => {
			if (element) {
				observer.unobserve(element);
			}
		};
	}, [rootMargin, threshold, triggerOnce]);

	return { ref, isIntersecting };
};
