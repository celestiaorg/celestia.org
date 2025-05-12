"use client";

import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";
import LuminaErrorSVG from "@/macros/SVGs/LuminaErrorSVG";
import LuminaGradientCircleSVG from "@/macros/SVGs/LuminaGradientCircleSVG";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AutoLuminaContextProvider } from "./AutoLuminaContext";
import { useLuminaNode } from "./hooks/useLuminaNode";

// Approximate headers to sync (30 days worth at 12s block time) - used for percentage calculation
const approxHeadersToSync = (30 * 24 * 60 * 60) / 12;

// Circular Progress Indicator Component
const CircularProgressIndicator = ({ percentage = 0 }) => {
	// SVG parameters
	const size = 26;
	const strokeWidth = 3;
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	// Format percentage to show just whole numbers when syncing
	const displayPercentage = Math.round(percentage);

	return (
		<div className='relative flex items-center justify-center'>
			{/* Background circle */}
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className='rotate-[-90deg]'>
				<circle cx={size / 2} cy={size / 2} r={radius} fill='none' stroke='#2E2C31' strokeWidth={strokeWidth} />
				{/* Progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill='none'
					stroke='#BF6FF5'
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap='round'
				/>
			</svg>

			{/* Percentage text overlay */}
			<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
				<span className='text-[7px] font-medium text-[#BF6FF5]'>{displayPercentage}%</span>
			</div>
		</div>
	);
};

// Internal component that uses the Lumina node
const BlockNumberDisplayInternal = ({ onAnimationComplete }) => {
	// Use the hook for live updates
	const { status, blockNumber, error, isConnected, syncInfo } = useLuminaNode();

	// UI State
	const [showContent, setShowContent] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const controls = useAnimationControls();
	const [forceConnected, setForceConnected] = useState(false);
	const [contentReady, setContentReady] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [syncPercentage, setSyncPercentage] = useState(0);
	const [syncComplete, setSyncComplete] = useState(false);

	// For debugging
	useEffect(() => {
		console.log(`BlockNumberDisplay: status=${status}, blockNumber=${blockNumber}, isConnected=${isConnected}, syncPercentage=${syncPercentage}`);
	}, [status, blockNumber, isConnected, syncPercentage]);

	// Calculate sync percentage when syncInfo changes
	useEffect(() => {
		if (syncInfo && syncInfo.subjective_head && syncInfo.stored_headers) {
			// Calculate sync progress using the method from the example project
			const syncingWindowTail = Number(syncInfo.subjective_head) - approxHeadersToSync;
			const normalizedRanges = syncInfo.stored_headers.map((range) => ({
				start: Math.max(Number(range.start), syncingWindowTail),
				end: Math.max(Number(range.end), syncingWindowTail),
			}));

			const totalSyncedDuration = normalizedRanges.reduce((acc, range) => acc + (range.end - range.start), 0);
			const percentage = Math.min((totalSyncedDuration * 100) / approxHeadersToSync, 100);

			setSyncPercentage(percentage);
			setSyncComplete(percentage >= 100);
		}
	}, [syncInfo]);

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

	// Get appropriate status icon based on sync status
	const getStatusIcon = () => {
		// Show checkmark only when sync is complete
		if (syncComplete) return <LuminaCheckmarkSVG />;

		// Show error icon when there's an error
		if (status === "error") return <LuminaErrorSVG />;

		// During syncing, show the progress indicator
		if (status === "syncing" || status === "connected") return <CircularProgressIndicator percentage={syncPercentage} />;

		// In initializing state, show the gradient circle
		return <LuminaGradientCircleSVG />;
	};

	// Get appropriate status text based on state and screen size
	const getStatusText = () => {
		// If we have a block number, always show "Block number" regardless of sync status
		if (blockNumber) {
			return "Block number";
		}

		if (status === "error") return isMobile ? `Error` : `Error: ${error || "Unknown error"}`;
		if (status === "initializing") return isMobile ? "Initializing" : "Initializing connection";
		if (status === "syncing") return isMobile ? "Syncing" : "Syncing Light Node";
		if (status === "connected") return "Block number";
		return isMobile ? "Initializing" : "Initializing connection";
	};

	// Always display block number if available, or syncing text otherwise
	const getDisplayValue = () => {
		// Show block number as soon as it's available
		if (blockNumber) {
			// Different animation for desktop vs mobile
			if (!isMobile) {
				return (
					<motion.span
						key='blockNumber'
						initial={{ opacity: 0, y: 5, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -5 }}
						transition={{
							duration: 0.4,
							delay: 0.1,
							ease: [0.16, 1, 0.3, 1], // Custom ease that gives a nice spring-like effect
						}}
						className='text-[#BF6FF5] text-[12px] sm:text-base font-medium leading-3 sm:leading-5 tabular-nums'
						style={{ willChange: "opacity, transform" }}
					>
						{/* Format block number with commas */}
						{parseInt(blockNumber, 10).toLocaleString()}
					</motion.span>
				);
			} else {
				// Mobile animation
				return (
					<motion.span
						key='blockNumber'
						initial={{ opacity: 0, x: -5 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
							delay: 0.1,
						}}
						className='text-[#BF6FF5] text-[10px] sm:text-base font-medium leading-3 sm:leading-5 tabular-nums'
						style={{ willChange: "opacity, transform" }}
					>
						{/* Format block number with commas */}
						{parseInt(blockNumber, 10).toLocaleString()}
					</motion.span>
				);
			}
		}

		// If no block number is available, return null - we'll only show status text once
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

	// Calculate the appropriate width based on state and screen size
	useEffect(() => {
		const getTargetWidth = () => {
			if (isMobile) {
				if (blockNumber) return "126px"; // Increased width for block number on mobile
				return "110px"; // Width without block number on mobile
			} else {
				if (blockNumber) return "360px"; // Increased width for block number on desktop
				return "230px"; // Width without block number on desktop
			}
		};

		// Start the width animation - use fixed width instead of fit-content
		controls
			.start({
				width: getTargetWidth(), // Fixed width, no more fit-content
				minWidth: getTargetWidth(),
				transition: {
					duration: isMobile ? 0.4 : 0.6, // Slightly longer for desktop for smoother feel
					ease: isMobile ? "easeOut" : [0.16, 1, 0.3, 1], // Custom ease for desktop
					type: isMobile ? "spring" : "tween", // Spring for mobile, tween for desktop
					stiffness: isMobile ? 300 : 200,
					damping: 25,
				},
			})
			.then(() => {
				// Once width animation is complete, show content
				setTimeout(
					() => {
						setContentReady(true);
					},
					isMobile ? 50 : 100
				); // Longer delay for desktop
			});
	}, [isMobile, blockNumber, controls]);

	// Animation complete handler
	const handleAnimationComplete = () => {
		setShowContent(true);
		onAnimationComplete?.(); // Call prop if provided
	};

	// Set up the button appearance timing
	useEffect(() => {
		// Show button as soon as block number is available
		if (contentReady && blockNumber) {
			// Delay showing the button to create a sequence
			const timer = setTimeout(
				() => {
					setShowButton(true);
				},
				isMobile ? 150 : 250
			);

			return () => clearTimeout(timer);
		} else {
			setShowButton(false);
		}
	}, [contentReady, blockNumber, isMobile]);

	// Determine if we should show the explorer link
	const showExplorerLink = blockNumber && showContent;

	// --- JSX Rendering ---
	return (
		<motion.div
			initial={{ width: "40px", minWidth: "40px" }}
			animate={controls}
			onAnimationComplete={handleAnimationComplete}
			className='flex items-center gap-x-2 sm:gap-x-3 h-[40px] sm:h-[44px] bg-[#1A191B] rounded-full pl-[10px] pr-4 sm:pr-[5px] py-0.5 sm:py-1 text-white overflow-hidden'
			style={{
				willChange: "width",
				transform: "translateZ(0)",
				WebkitBackfaceVisibility: "hidden",
				MozBackfaceVisibility: "hidden",
				backfaceVisibility: "hidden",
			}}
		>
			{/* Status Icon - Shows progress indicator during sync */}
			{getStatusIcon()}

			{/* Main content container with flexible width */}
			<div className='flex-1 flex relative'>
				{/* Text Content and Value Area */}
				<AnimatePresence>
					{showContent && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: contentReady ? 1 : 0 }}
							transition={{
								duration: isMobile ? 0.3 : 0.4,
								delay: 0.05,
								ease: "easeIn",
							}}
							className={`flex flex-col items-start w-full sm:items-center sm:flex-row`}
							style={{
								willChange: "opacity",
							}}
						>
							{/* Status Text */}
							<AnimatePresence mode='wait'>
								<motion.span
									key={blockNumber ? "blockNumber" : status} // Change key when block number available
									initial={isMobile ? { opacity: 0, x: -5 } : { opacity: 0, y: 3 }}
									animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: isMobile ? 0.2 : 0.35,
										delay: 0.05,
										ease: isMobile ? "easeOut" : [0.16, 1, 0.3, 1],
									}}
									className={`text-[10px] font-normal leading-4 sm:leading-5 text-white sm:text-base text-nowrap sm:mr-2 ${
										status === "error" ? "cursor-pointer text-red-400 hover:text-red-300" : ""
									} flex items-center`}
									style={{ willChange: "opacity, transform" }}
									onClick={status === "error" ? refreshPage : undefined} // Allow refresh on error
								>
									{getStatusText()}
								</motion.span>
							</AnimatePresence>

							{/* Block Number or Syncing Text */}
							<motion.div
								className={`
								sm:ml-auto 
								min-w-[60px] sm:min-w-[100px] 
								flex sm:justify-end
								opacity-100
								transition-opacity duration-300
								${blockNumber ? "block" : "hidden"} 
							`}
								animate={{
									marginRight: showButton ? "46px" : "10px",
								}}
								transition={{
									duration: 0.5,
									ease: [0.16, 1, 0.3, 1],
								}}
								style={{ willChange: "opacity, margin" }}
							>
								<AnimatePresence mode='wait'>{getDisplayValue()}</AnimatePresence>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Explorer Link - Absolutely positioned */}
				<div className='absolute right-0 top-0 bottom-0 flex items-center'>
					<AnimatePresence mode='wait'>
						{showButton && (
							<motion.a
								key='explorer-link'
								initial={{ opacity: 0, scale: 0.9, x: 50 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								exit={{ opacity: 0, scale: 0.9, x: 30 }}
								transition={{
									type: "spring",
									stiffness: 100,
									damping: 15,
									mass: 1,
									duration: 0.7,
								}}
								href={`https://celenium.io/block/${blockNumber}`}
								target='_blank'
								rel='noopener noreferrer'
								className='hidden sm:flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[36px] bg-[#2E2C31] hover:bg-[#3E3C41] overflow-hidden z-10'
								aria-label='View block details'
								style={{
									willChange: "opacity, transform",
									transform: "translateZ(0)",
								}}
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
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};

// Wrapper component that provides the context and initializes the node
const DynamicBlockNumberDisplay = ({ onAnimationComplete }) => {
	const [shouldInitialize, setShouldInitialize] = useState(false);

	// Set shouldInitialize to true when the animation completes
	const handleAnimationComplete = () => {
		setShouldInitialize(true);
		onAnimationComplete?.();
	};

	return (
		<AutoLuminaContextProvider shouldInitialize={shouldInitialize}>
			<BlockNumberDisplayInternal onAnimationComplete={handleAnimationComplete} />
		</AutoLuminaContextProvider>
	);
};

export default DynamicBlockNumberDisplay;
