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

// DEV MODE: Set to true to simulate sync completion for debugging
const DEV_MODE_SIMULATE_SYNC_COMPLETE = false;

// Internal component that uses the Lumina node
const BlockNumberDisplayInternal = ({ onAnimationComplete }) => {
	// Use the hook for live updates
	const {
		status: hookStatus,
		blockNumber: hookBlockNumber,
		error,
		isConnected,
		syncInfo,
		startNode,
		stopNode,
		canStart,
		canStop,
		isIdle,
	} = useLuminaNode();

	// DEV MODE: Override status, blockNumber, and canStop when simulating sync complete
	const status = DEV_MODE_SIMULATE_SYNC_COMPLETE ? "connected" : hookStatus;
	const blockNumber = DEV_MODE_SIMULATE_SYNC_COMPLETE ? "2847392" : hookBlockNumber;
	const canStopOverride = DEV_MODE_SIMULATE_SYNC_COMPLETE ? true : canStop;

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

	// Track when sync completes for button animations
	const [justCompleted, setJustCompleted] = useState(false);
	useEffect(() => {
		if (syncComplete && !justCompleted) {
			setJustCompleted(true);
			// Reset after animation
			const timer = setTimeout(() => setJustCompleted(false), 1000);
			return () => clearTimeout(timer);
		}
	}, [syncComplete, justCompleted]);

	// Calculate sync percentage when syncInfo changes
	useEffect(() => {
		// DEV MODE: Force sync complete
		if (DEV_MODE_SIMULATE_SYNC_COMPLETE) {
			setSyncPercentage(100);
			setSyncComplete(true);
			return;
		}

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
		// Reset all UI state when stopping to return to initial state
		setForceConnected(false);
		setSyncComplete(false);
		setSyncPercentage(0);
		setShowButton(false);
		setJustCompleted(false);

		// Stop the node first (this will reset hook state including blockNumber and status to "idle")
		await stopNode();

		// Reset content state after a small delay to allow width animation to start
		setTimeout(() => {
			setContentReady(false);
			setShowContent(false);
		}, 100);
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
		// Show block number if sync is complete, forced connected, or status is connected with block number (but not if idle)
		if ((syncComplete || forceConnected || status === "connected") && blockNumber && status !== "idle") {
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
				if (status === "idle") return "135px"; // Reduced width for idle state with start button on mobile
				if (status === "syncing") return "140px"; // Tighter width for syncing + stop button on mobile
				if (blockNumber && (syncComplete || forceConnected || status === "connected")) return "150px"; // Width for completed sync with block number on mobile
				return "130px"; // Width without block number on mobile
			} else {
				// On desktop, immediately allocate space for both buttons when sync completes
				if (blockNumber && (syncComplete || forceConnected || status === "connected")) return "360px"; // Extra width for both stop + explorer buttons on desktop
				if (blockNumber) return "360px"; // Width for block number on desktop
				if (status === "idle") return "204px"; // Reduced width for idle state with start button on desktop
				if (status === "syncing") return "380px"; // Increased width for syncing + stop button on desktop
				return "230px"; // Width without block number on desktop
			}
		};

		// Start the width animation - use fixed width instead of fit-content
		controls
			.start({
				width: getTargetWidth(), // Fixed width, no more fit-content
				minWidth: getTargetWidth(),
				transition: {
					duration: isMobile ? 0.4 : 0.5, // Reduced desktop duration for smoother syncing transition
					ease: isMobile ? "easeOut" : [0.25, 0.46, 0.45, 0.94], // Smoother ease for desktop
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
					isMobile ? 50 : 75
				); // Reduced desktop delay for smoother syncing transition
			});
	}, [isMobile, blockNumber, status, syncComplete, forceConnected, controls]);

	// Animation complete handler
	const handleAnimationComplete = () => {
		setShowContent(true);
		onAnimationComplete?.(); // Call prop if provided
	};

	// Determine if we should show start/stop buttons
	const showStartButton = showContent && contentReady && status === "idle";
	const showStopButton = showContent && contentReady && canStopOverride && (status === "syncing" || status === "connected");

	// Set up the button appearance timing
	useEffect(() => {
		// Show explorer button when sync is complete
		// On desktop: show alongside stop button
		// On mobile: only show when stop button is not shown
		const shouldShowExplorer =
			contentReady &&
			blockNumber &&
			(syncComplete || forceConnected || status === "connected") &&
			status !== "idle" &&
			(!isMobile || !showStopButton);

		if (shouldShowExplorer) {
			// Delay showing the button to create a nice sequence after sync completes
			const timer = setTimeout(
				() => {
					setShowButton(true);
				},
				isMobile ? 200 : 300
			);

			return () => clearTimeout(timer);
		} else {
			setShowButton(false);
		}
	}, [contentReady, blockNumber, syncComplete, forceConnected, isMobile, showStopButton]);

	// Determine if we should show the explorer link (only when sync is complete)
	const showExplorerLink = blockNumber && showContent && (syncComplete || forceConnected || status === "connected") && status !== "idle";

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
								duration: isMobile ? 0.3 : 0.35,
								delay: 0.02,
								ease: "easeOut",
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
										duration: isMobile ? 0.2 : 0.3,
										delay: 0.02,
										ease: isMobile ? "easeOut" : "easeOut",
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
								opacity-100
								transition-opacity duration-300
								${blockNumber || status === "syncing" ? "block" : "hidden"} 
							`}
								animate={{
									marginRight:
										showStopButton && showButton && !isMobile
											? "88px" // Both stop and explorer buttons on desktop
											: showStopButton
											? isMobile
												? "32px"
												: "46px"
											: showButton
											? isMobile
												? "32px"
												: "46px"
											: showStartButton
											? isMobile
												? "32px"
												: "50px"
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
					{/* Start Button */}
					<AnimatePresence>
						{showStartButton && (
							<motion.button
								key='start-button'
								initial={{ opacity: 0, scale: 0.9, x: 50 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								exit={{ opacity: 0, scale: 0.9, x: 30 }}
								transition={{
									type: "spring",
									stiffness: 120,
									damping: 20,
									mass: 1,
									duration: 0.5,
									delay: 0.15,
								}}
								onClick={canStart ? handleStart : undefined}
								disabled={!canStart}
								className={`flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[28px] sm:size-[36px] overflow-hidden z-10 ${
									canStart ? "bg-[#0F870229] hover:bg-[#0F87024D] cursor-pointer" : "bg-[#0F870215] cursor-not-allowed opacity-50"
								}`}
								aria-label='Start light node sync'
								style={{
									willChange: "opacity, transform",
									transform: "translateZ(0)",
								}}
							>
								<LuminaStartSVG className='translate-x-0.5 scale-75 sm:scale-100' />
							</motion.button>
						)}
					</AnimatePresence>

					{/* Stop Button */}
					<AnimatePresence>
						{showStopButton && (
							<motion.button
								key='stop-button'
								initial={{ opacity: 0, scale: 0.9, x: 50 }}
								animate={{
									opacity: 1,
									scale: justCompleted ? [1, 1.05, 1] : 1,
									x: showButton && !isMobile ? -4 : 0, // Slide left when explorer button appears on desktop
								}}
								exit={{ opacity: 0, scale: 0.9, x: 30 }}
								transition={{
									type: "spring",
									stiffness: 150,
									damping: 18,
									mass: 1,
									duration: justCompleted ? 0.6 : 0.4,
									delay: 0.02,
								}}
								onClick={canStopOverride ? handleStop : undefined}
								disabled={!canStopOverride}
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
					</AnimatePresence>

					{/* Explorer Link */}
					<AnimatePresence>
						{showButton && (
							<motion.a
								key='explorer-link'
								initial={{ opacity: 0, scale: 0.8, x: 36 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								exit={{ opacity: 0, scale: 0.9, x: 30 }}
								transition={{
									type: "spring",
									stiffness: 120,
									damping: 20,
									mass: 1,
									duration: 0.6,
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
