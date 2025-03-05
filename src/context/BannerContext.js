"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const BannerContext = createContext();

export function BannerProvider({ children }) {
	// Toggle this to show/hide the banner
	const SHOW_BANNER = false;

	const [isBannerVisible, setIsBannerVisible] = useState(SHOW_BANNER);
	const [bannerHeight, setBannerHeight] = useState(0);
	const bannerRef = useRef(null);

	useEffect(() => {
		if (!bannerRef.current) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setBannerHeight(entry.borderBoxSize[0].blockSize);
			}
		});

		resizeObserver.observe(bannerRef.current);
		return () => resizeObserver.disconnect();
	}, []);

	return (
		<BannerContext.Provider
			value={{
				isBannerVisible,
				setIsBannerVisible,
				bannerHeight,
				setBannerHeight,
				bannerRef,
			}}
		>
			{children}
		</BannerContext.Provider>
	);
}

export function useBanner() {
	const context = useContext(BannerContext);
	if (!context) {
		throw new Error("useBanner must be used within a BannerProvider");
	}
	return context;
}
