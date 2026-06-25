"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Use dynamic import with ssr: false to prevent server-side rendering
const DynamicLuminaNode = dynamic(() => import("./DynamicLuminaNode"), {
	ssr: false,
});

const AutoConnectingLuminaNode = () => {
	const [shouldInitialize, setShouldInitialize] = useState(false);

	return <DynamicLuminaNode shouldInitialize={shouldInitialize} onAnimationComplete={() => setShouldInitialize(true)} />;
};

export default AutoConnectingLuminaNode;
