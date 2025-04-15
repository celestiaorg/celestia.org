"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Simple loading state display - completely hidden initially
const LoadingDisplay = () => {
	// Completely invisible during initial load
	return null;
};

// Create a new file called 'DynamicBlockNumberDisplay.jsx' with the original functionality
// This allows us to dynamically import it with Next.js
// Dynamically load the block number display component
const DynamicBlockNumberDisplay = dynamic(() => import("./DynamicBlockNumberDisplay"), {
	ssr: false,
	loading: () => <LoadingDisplay />,
});

// Main component that renders either the dynamic block display or nothing during initial load
const LuminaBlockNumber = ({ onAnimationComplete }) => {
	// Track if component is mounted (client-side only)
	const [isMounted, setIsMounted] = useState(false);

	// Only enable dynamic import on client-side
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Return nothing until mounted (completely hidden during initial load)
	if (!isMounted) {
		return null;
	}

	// Render the dynamic component when mounted
	return <DynamicBlockNumberDisplay onAnimationComplete={onAnimationComplete} />;
};

export default LuminaBlockNumber;
