"use client";

import { createContext, useContext, useState } from "react";

const BannerContext = createContext();

export function BannerProvider({ children }) {
	const [isBannerVisible, setIsBannerVisible] = useState(true);

	return <BannerContext.Provider value={{ isBannerVisible, setIsBannerVisible }}>{children}</BannerContext.Provider>;
}

export function useBanner() {
	const context = useContext(BannerContext);
	if (!context) {
		throw new Error("useBanner must be used within a BannerProvider");
	}
	return context;
}
