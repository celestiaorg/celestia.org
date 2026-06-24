"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isWebAssemblySupported, getIOSVersion } from "@/utils/iosVersionDetection";

// Simple loading state display - completely hidden initially
const LoadingDisplay = () => {
	// Completely invisible during initial load
	return null;
};

// Dynamically load the block number display component
const DynamicBlockNumberDisplay = dynamic(() => import("./DynamicBlockNumberDisplay"), {
	ssr: false,
	loading: () => <LoadingDisplay />,
});

// Main component that renders either the dynamic block display or nothing during initial load
const LuminaBlockNumber = ({ onAnimationComplete, colorScheme = "default" }) => {
	// Track if component is mounted (client-side only)
	const [isMounted, setIsMounted] = useState(false);
	const [isSupported, setIsSupported] = useState(false);

	// Only enable dynamic import on client-side and check WebAssembly support
	useEffect(() => {
		setIsMounted(true);
		const supported = isWebAssemblySupported();
		setIsSupported(supported);

		// Log version info for debugging
		const version = getIOSVersion();
		console.log(`iOS Version: ${version}, WebAssembly supported: ${supported}`);
	}, []);

	// Return nothing until mounted or if WebAssembly is not supported
	if (!isMounted || !isSupported) {
		return null;
	}

	// Render the dynamic component when mounted and supported
	return <DynamicBlockNumberDisplay onAnimationComplete={onAnimationComplete} colorScheme={colorScheme} />;
};

export default LuminaBlockNumber;
