"use client";

import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";
import LuminaErrorSVG from "@/macros/SVGs/LuminaErrorSVG";
import LuminaGradientCircleSVG from "@/macros/SVGs/LuminaGradientCircleSVG";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AutoLuminaContextProvider } from "./AutoLuminaContext";
import { useLuminaNode } from "./hooks/useLuminaNode";

const BlockNumberDisplay = ({ onAnimationComplete }) => {
	// Use the hook for live updates
	const { status, blockNumber, error, isConnected } = useLuminaNode();

	// UI State
	const [showContent, setShowContent] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const controls = useAnimationControls();
	const [forceConnected, setForceConnected] = useState(false);
	const [contentReady, setContentReady] = useState(false);

	// For debugging
	useEffect(() => {
		console.log(`BlockNumberDisplay: status=${status}, blockNumber=${blockNumber}, isConnected=${isConnected}`);
	}, [status, blockNumber, isConnected]);

	// Force connected state after a timeout if we have a block number
	useEffect(() => {
		if (blockNumber && !forceConnected && status === "syncing") {
			const timeoutId = setTimeout(() => {
				console.log(`BlockNumberDisplay: Forcing connected state (block number exists but still in syncing state)`);
				setForceConnected(true);
			}, 10000); // 10 seconds

			return () => clearTimeout(timeoutId);
		}
	}, [blockNumber, status, forceConnected]);

	// Function to refresh the page (kept in case error state needs it)
	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	// Get appropriate status icon
	const getStatusIcon = () => {
		// Always show checkmark if we have a block number
		if (blockNumber) return <LuminaCheckmarkSVG />;

		if (forceConnected) return <LuminaCheckmarkSVG />;

		switch (status) {
			case "initializing":
				return <LuminaGradientCircleSVG />;
			case "error":
				return <LuminaErrorSVG />;
			case "connected":
				return <LuminaCheckmarkSVG />;
			case "syncing":
				return <LuminaGradientCircleSVG />;
			default:
				return <LuminaGradientCircleSVG />;
		}
	};

	// Get appropriate status text based on state and screen size
	const getStatusText = () => {
		// If we have a block number, always show "Block number" regardless of sync status
		if (blockNumber) {
			return "Block number";
		}

		if (forceConnected) return "Block number";

		if (status === "error") return isMobile ? `Error` : `Error: ${error || "Unknown error"}`;
		if (status === "initializing") return isMobile ? "Initializing" : "Initializing connection";
		if (status === "syncing") return isMobile ? "Syncing" : "Syncing Light Node";
		if (status === "connected") return "Block number";
		return isMobile ? "Initializing" : "Initializing connection";
	};

	// Display block number when in syncing or connected state
	const getDisplayValue = () => {
		// Show block number if it exists, whether we're syncing or connected
		if (blockNumber && (isConnected || status === "syncing" || forceConnected)) {
			return (
				<motion.span
					key='blockNumber'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className='text-[#BF6FF5] text-[12px] sm:text-base font-medium leading-3 sm:leading-5 tabular-nums'
				>
					{/* Format block number with commas */}
					{parseInt(blockNumber, 10).toLocaleString()}
				</motion.span>
			);
		}

		// Fallback (should not happen normally)
		return null;
	};

	// --- Effects ---

	// Check for mobile on mount and window resize
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Calculate the appropriate width based on whether we have a block number and screen size
	useEffect(() => {
		const targetWidth = isMobile
			? blockNumber
				? "124px" // Width with block number on mobile
				: "120px" // Width without block number on mobile
			: blockNumber
			? "320px" // Width with block number on desktop
			: "230px"; // Width without block number on desktop

		// Start the width animation - use fixed width instead of fit-content
		controls
			.start({
				width: targetWidth, // Fixed width, no more fit-content
				minWidth: targetWidth,
				transition: { duration: 0.5, ease: "easeInOut" },
			})
			.then(() => {
				// Once width animation is complete, show content
				setContentReady(true);
			});
	}, [isMobile, blockNumber, controls]);

	// Animation complete handler
	const handleAnimationComplete = () => {
		setShowContent(true);
		onAnimationComplete?.(); // Call prop if provided
	};

	// Determine if we should show the explorer link
	const showExplorerLink = blockNumber && showContent && contentReady && (isConnected || status === "syncing" || forceConnected);

	// --- JSX Rendering ---
	return (
		<motion.div
			initial={{ width: "44px", minWidth: "44px" }}
			animate={controls}
			onAnimationComplete={handleAnimationComplete}
			className='flex items-center gap-x-2 sm:gap-x-3 h-[44px] bg-[#1A191B] rounded-full pl-[10px] pr-4 sm:pr-1 py-0.5 sm:py-1 text-white overflow-hidden'
		>
			{/* Status Icon */}
			{getStatusIcon()}

			{/* Text Content and Value Area */}
			<AnimatePresence>
				{showContent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: contentReady ? 1 : 0 }}
						transition={{ duration: 0.3, delay: 0.1 }}
						className='flex flex-col items-start w-full sm:items-center sm:flex-row'
					>
						{/* Status Text */}
						<AnimatePresence mode='wait'>
							<motion.span
								key={blockNumber ? "withBlockNumber" : forceConnected ? "connected" : status} // Change key when block number becomes available
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								className={`text-[10px] font-normal leading-4 sm:leading-6 text-white sm:text-base text-nowrap sm:mr-4 ${
									status === "error" ? "cursor-pointer text-red-400 hover:text-red-300" : ""
								}`}
								onClick={status === "error" ? refreshPage : undefined} // Allow refresh on error
							>
								{getStatusText()}
							</motion.span>
						</AnimatePresence>

						{/* Block Number (Only) */}
						<div
							className={`
							sm:ml-auto 
							min-w-[60px] sm:min-w-[100px] 
							flex sm:justify-end
							${blockNumber ? "opacity-100" : "opacity-0"}
							transition-opacity duration-300
						`}
						>
							<AnimatePresence mode='wait'>{getDisplayValue()}</AnimatePresence>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Explorer Link (shown with block number, regardless of status) */}
			{showExplorerLink && (
				<motion.a
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					href={`https://celenium.io/block/${blockNumber}`}
					target='_blank'
					rel='noopener noreferrer'
					className='hidden sm:flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[36px] bg-[#2E2C31] hover:bg-[#3E3C41] overflow-hidden'
					aria-label='View block details'
				>
					<div className='absolute top-0 left-0 w-full h-full transition-transform'>
						<div className='absolute top-0 left-0 w-full h-full transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full'>
							<div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
								<LuminaDiagonalArrowSVG />
							</div>
							<div className='absolute flex items-center justify-center w-full h-full top-full right-full'>
								<LuminaDiagonalArrowSVG />
							</div>
						</div>
					</div>
				</motion.a>
			)}
		</motion.div>
	);
};

// This is a wrapper component that provides the context and initializes the node
const LuminaBlockNumber = ({ onAnimationComplete }) => {
	const [shouldInitialize, setShouldInitialize] = useState(false);

	// Set shouldInitialize to true when the animation completes
	const handleAnimationComplete = () => {
		setShouldInitialize(true);
		onAnimationComplete?.();
	};

	return (
		<AutoLuminaContextProvider shouldInitialize={shouldInitialize}>
			<BlockNumberDisplay onAnimationComplete={handleAnimationComplete} />
		</AutoLuminaContextProvider>
	);
};

export default LuminaBlockNumber;
