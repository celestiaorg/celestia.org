"use client";

export function usePlausible() {
	const trackEvent = (eventName, props = {}) => {
		if (typeof window !== "undefined" && window.plausible) {
			window.plausible(eventName, { props });
		}
	};

	return trackEvent;
}
