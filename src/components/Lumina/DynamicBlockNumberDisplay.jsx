"use client";

import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";
import LuminaErrorSVG from "@/macros/SVGs/LuminaErrorSVG";
import LuminaGradientCircleSVG from "@/macros/SVGs/LuminaGradientCircleSVG";
import LuminaStartSVG from "@/macros/SVGs/LuminaStartSVG";
import LuminaStopSVG from "@/macros/SVGs/LuminaStopSVG";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AutoLuminaContextProvider } from "./AutoLuminaContext";
import { useLuminaNode } from "./hooks/useLuminaNode";

// Approximate headers to sync (30 days worth at 12s block time) - used for percentage calculation
const approxHeadersToSync = (30 * 24 * 60 * 60) / 12;

// Internal component that uses the Lumina node
const BlockNumberDisplayInternal = ({ onAnimationComplete }) => {
	// Use the hook for live updates
	const { status, blockNumber, error, isConnected, syncInfo, startNode, stopNode, canStart, canStop, isIdle } = useLuminaNode();

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
			// Only force connected after timeout if we're synced at 100% but still in syncing status
			// This prevents showing block number instead of percentage during active syncing
			if (syncComplete) {
				const timeoutId = setTimeout(() => {
					console.log(`BlockNumberDisplay: Forcing connected state (block number exists, 100% synced, but still in syncing state)`);
					setForceConnected(true);
				}, 10000); // 10 seconds

				return () => clearTimeout(timeoutId);
			}
		}
	}, [blockNumber, status, forceConnected, syncComplete]);

	// Function to refresh the page (kept in case error state needs it)
	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	// Handle start button click
	const handleStart = useCallback(async () => {
		await startNode();
	}, [startNode]);

	// Handle stop button click
	const handleStop = useCallback(async () => {
		await stopNode();
	}, [stopNode]);

	// Get appropriate status icon
	const getStatusIcon = () => {
		// Show checkmark if sync is complete or we have a block number and are forced connected
		if (syncComplete || (blockNumber && forceConnected)) return <LuminaCheckmarkSVG />;

		switch (status) {
			case "idle":
				return null; // No icon when idle - user hasn't started yet
			case "initializing":
			case "syncing":
				return <LuminaGradientCircleSVG />;
			case "error":
				return <LuminaErrorSVG />;
			case "connected":
				return <LuminaCheckmarkSVG />;
			default:
				return null; // No icon for unknown states
		}
	};

	// Get appropriate status text based on state and screen size
	const getStatusText = () => {
		// If sync is complete, always show "Block number"
		if (syncComplete) {
			return "Block number";
		}

		if (forceConnected) return "Block number";

		if (status === "idle") return isMobile ? "Start Light Node" : "Start Light Node";
		if (status === "error") return isMobile ? `Error` : `Error: ${error || "Unknown error"}`;
		if (status === "initializing") return isMobile ? "Initializing" : "Initializing connection";
		if (status === "syncing") return isMobile ? "Syncing" : "Syncing Light Node";
		if (status === "connected") return "Block number";
		return isMobile ? "Start Light Node" : "Start Light Node";
	};

	// Display block number when sync is complete, or percentage during syncing
	const getDisplayValue = () => {
		// Show block number if sync is complete or we're forced to connected state
		if ((syncComplete || forceConnected) && blockNumber) {
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

		// Show sync percentage during syncing state (prioritize showing percentage when syncing and not complete)
		if (status === "syncing" && !syncComplete && !forceConnected) {
			return (
				<motion.span
					key='percentage'
					initial={{ opacity: 0, y: 5, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: -5 }}
					transition={{
						duration: 0.4,
						delay: 0.1,
						ease: [0.16, 1, 0.3, 1],
					}}
					className='text-[#BF6FF5] text-[10px] sm:text-base font-medium leading-3 sm:leading-5 tabular-nums'
					style={{ willChange: "opacity, transform" }}
				>
					{/* Format percentage with max 2 decimal places */}
					{syncPercentage.toFixed(2)}%
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

	// Calculate the appropriate width based on state and screen size
	useEffect(() => {
		const getTargetWidth = () => {
			if (isMobile) {
				if (syncComplete && blockNumber) return "150px"; // Increased width for block number + explorer button on mobile
				if (status === "syncing") return "180px"; // Increased width for percentage + stop button on mobile
				if (status === "idle") return "135px"; // Reduced width for idle state with start button on mobile
				return "130px"; // Width without block number on mobile
			} else {
				if (syncComplete && blockNumber) return "360px"; // Width with block number on desktop
				if (status === "syncing") return "380px"; // Increased width for percentage + stop button on desktop
				if (status === "idle") return "204px"; // Reduced width for idle state with start button on desktop
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
	}, [isMobile, blockNumber, syncComplete, status, syncPercentage, controls]);

	// Animation complete handler
	const handleAnimationComplete = () => {
		setShowContent(true);
		onAnimationComplete?.(); // Call prop if provided
	};

	// Set up the button appearance timing
	useEffect(() => {
		// Show explorer button only after content is ready and sync is complete with a block number
		if (contentReady && blockNumber && (syncComplete || forceConnected)) {
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
	}, [contentReady, blockNumber, syncComplete, forceConnected, isMobile]);

	// Determine if we should show the explorer link
	const showExplorerLink = blockNumber && showContent && (syncComplete || forceConnected);

	// Determine if we should show start/stop buttons
	const showStartButton = showContent && canStart && status === "idle";
	const showStopButton = showContent && canStop && status === "syncing" && (blockNumber || syncPercentage > 0) && !syncComplete;

	// --- JSX Rendering ---
	return (
		<motion.div
			initial={{ width: "40px", minWidth: "40px" }}
			animate={controls}
			onAnimationComplete={handleAnimationComplete}
			className={`flex items-center gap-x-2 sm:gap-x-3 h-[40px] sm:h-[44px] bg-[#1A191B] rounded-full ${
				status === "idle" ? "pl-4 sm:pl-6" : "pl-[10px]"
			} ${
				showStartButton ? "pr-1.5 sm:pr-1.5" : showStopButton ? "pr-1.5 sm:pr-1.5" : "pr-4 sm:pr-[5px]"
			} py-0.5 sm:py-1 text-white overflow-hidden`}
			style={{
				willChange: "width",
				transform: "translateZ(0)",
				WebkitBackfaceVisibility: "hidden",
				MozBackfaceVisibility: "hidden",
				backfaceVisibility: "hidden",
			}}
		>
			{/* Status Icon */}
			{getStatusIcon() && getStatusIcon()}

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
									key={syncComplete ? "complete" : forceConnected ? "connected" : status} // Change key when sync completes
									initial={isMobile ? { opacity: 0, x: -5 } : { opacity: 0, y: 3 }}
									animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: isMobile ? 0.2 : 0.35,
										delay: 0.05,
										ease: isMobile ? "easeOut" : [0.16, 1, 0.3, 1],
									}}
									className={`text-[10px] font-normal leading-4 sm:leading-6 text-white sm:text-base text-nowrap sm:mr-4 ${
										status === "error" ? "cursor-pointer text-red-400 hover:text-red-300" : ""
									}`}
									style={{ willChange: "opacity, transform" }}
									onClick={status === "error" ? refreshPage : undefined} // Allow refresh on error
								>
									{getStatusText()}
								</motion.span>
							</AnimatePresence>

							{/* Block Number or Sync Percentage */}
							<motion.div
								className={`
								sm:ml-auto 
								min-w-[60px] sm:min-w-[100px] 
								flex sm:justify-end
								${blockNumber || status === "syncing" ? "opacity-100" : "opacity-0"}
								transition-opacity duration-300
							`}
								animate={{
									marginRight: showStartButton
										? isMobile
											? "32px"
											: "50px"
										: showStopButton
										? isMobile
											? "32px"
											: "46px"
										: showButton
										? isMobile
											? "32px"
											: "46px"
										: "10px",
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

				{/* Control Buttons - Absolutely positioned */}
				<div className='absolute right-0 top-0 bottom-0 flex items-center'>
					<AnimatePresence mode='wait'>
						{/* Start Button */}
						{showStartButton && (
							<motion.button
								key='start-button'
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
								onClick={handleStart}
								className='flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[28px] sm:size-[36px] bg-[#0F870229] hover:bg-[#0F87024D] overflow-hidden z-10'
								aria-label='Start light node sync'
								style={{
									willChange: "opacity, transform",
									transform: "translateZ(0)",
								}}
							>
								<LuminaStartSVG className='translate-x-0.5 scale-75 sm:scale-100' />
							</motion.button>
						)}

						{/* Stop Button */}
						{showStopButton && (
							<motion.button
								key='stop-button'
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
								onClick={handleStop}
								className='flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[28px] sm:size-[36px] bg-[#F63E5829] hover:bg-[#F63E584D] overflow-hidden z-10'
								aria-label='Stop light node sync'
								style={{
									willChange: "opacity, transform",
									transform: "translateZ(0)",
								}}
							>
								<LuminaStopSVG className='scale-75 sm:scale-100' />
							</motion.button>
						)}

						{/* Explorer Link */}
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
	return (
		<AutoLuminaContextProvider>
			<BlockNumberDisplayInternal onAnimationComplete={onAnimationComplete} />
		</AutoLuminaContextProvider>
	);
};

export default DynamicBlockNumberDisplay;
