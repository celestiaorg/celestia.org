"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface BannerContextValue {
	isBannerVisible: boolean;
	setIsBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
	bannerHeight: number;
	setBannerHeight: React.Dispatch<React.SetStateAction<number>>;
	bannerRef: React.RefObject<HTMLDivElement | null>;
}

const BannerContext = createContext<BannerContextValue | undefined>(undefined);

interface BannerProviderProps extends React.PropsWithChildren {
	defaultIsVisible?: boolean;
}

export function BannerProvider({ children, defaultIsVisible = false }: BannerProviderProps) {
	const [isBannerVisible, setIsBannerVisible] = useState(defaultIsVisible);
	const [bannerHeight, setBannerHeight] = useState(0);
	const bannerRef = useRef<HTMLDivElement | null>(null);

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

export function useBanner(): BannerContextValue {
	const context = useContext(BannerContext);
	if (!context) {
		throw new Error("useBanner must be used within a BannerProvider");
	}
	return context;
}
