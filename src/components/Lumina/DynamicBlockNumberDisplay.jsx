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
import DebugPanel from "./DebugPanel";

// DEV MODE: Set to true to simulate sync completion for debugging
const DEV_MODE_SIMULATE_SYNC_COMPLETE = false;

// Component for status icons with consistent sizing
const StatusIcon = ({ type, blockNumber, className = "" }) => {
	const baseClasses = "flex-shrink-0 flex items-center justify-center size-[28px] sm:size-[36px]";

	switch (type) {
		case "loading":
			return (
				<div className={`${baseClasses} ${className}`}>
					<LuminaGradientCircleSVG />
				</div>
			);
		case "success":
			return (
				<div className={`${baseClasses} ${className}`}>
					<LuminaCheckmarkSVG />
				</div>
			);
		case "explorer":
			return (
				<a
					href={blockNumber ? `https://celenium.io/block/${blockNumber}` : "#"}
					target='_blank'
					rel='noopener noreferrer'
					className={`${baseClasses} group rounded-full transform transition-colors duration-200 bg-[#2E2C31] hover:bg-[#3E3C41] overflow-hidden ${className}`}
					aria-label='View block details'
					style={{
						willChange: "transform",
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
				</a>
			);
		case "error":
			return (
				<div className={`${baseClasses} ${className}`}>
					<LuminaErrorSVG />
				</div>
			);
		default:
			return null;
	}
};

// Component for control buttons
const ControlButton = ({ type, onClick, disabled, className = "" }) => {
	const baseClasses =
		"flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[28px] sm:size-[36px] overflow-hidden z-10";

	if (type === "start") {
		return (
			<motion.button
				key='start-button'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{
					type: "spring",
					stiffness: 120,
					damping: 20,
					mass: 1,
					duration: 0.3,
					delay: 0.35, // Wait for stop button to finish exiting (0.2 duration + 0.15 buffer = 0.35)
				}}
				onClick={onClick}
				disabled={disabled}
				className={`${baseClasses} ${
					!disabled ? "bg-[#0F870229] hover:bg-[#0F87024D] cursor-pointer" : "bg-[#0F870215] cursor-not-allowed opacity-50"
				} ${className}`}
				aria-label='Start light node sync'
				style={{
					willChange: "opacity, transform",
					transform: "translateZ(0)",
				}}
			>
				<LuminaStartSVG className='translate-x-0.5 scale-75 sm:scale-100' />
			</motion.button>
		);
	}

	if (type === "stop") {
		return (
			<motion.button
				key='stop-button'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{
					type: "spring",
					stiffness: 150,
					damping: 18,
					mass: 1,
					duration: 0.2,
					delay: 0.45, // Wait for start button to finish (0.3 duration + 0.15 delay = 0.45)
				}}
				layout={false} // Prevent layout animations that could cause jumps
				onClick={onClick}
				disabled={disabled}
				className={`${baseClasses} bg-[#F63E5829] hover:bg-[#F63E584D] ${className}`}
				aria-label='Stop light node sync'
				style={{
					willChange: "opacity, transform",
					transform: "translateZ(0)",
				}}
			>
				<LuminaStopSVG className='scale-75 sm:scale-100' />
			</motion.button>
		);
	}

	return null;
};

// Main content area component
const ContentArea = ({ uiState, blockNumber, error, onErrorClick, isMobile }) => {
	const getStatusText = () => {
		if (error) return isMobile ? `Error` : `Error: ${error}`;

		switch (uiState) {
			case "idle":
				return isMobile ? "Start Light Node" : "Start Light Node";
			case "initializing":
				return isMobile ? "Initializing" : "Initializing connection";
			case "block-number":
				return "Block Number";
			case "verifying":
				return "Verifying";
			default:
				return isMobile ? "Start Light Node" : "Start Light Node";
		}
	};

	const showBlockNumber = blockNumber && (uiState === "block-number" || uiState === "verifying");

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: isMobile ? 0.3 : 0.35,
				delay: 0.02,
				ease: "easeOut",
			}}
			className='flex flex-col items-start justify-center w-full sm:items-center sm:flex-row'
			style={{ willChange: "opacity" }}
		>
			{/* Status Text */}
			<div className='relative'>
				<AnimatePresence mode='popLayout'>
					<motion.span
						key={uiState}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: isMobile ? 0.2 : 0.3,
							ease: "easeOut",
						}}
						className={`absolute top-1/2 -translate-y-1/2 left-0 text-[10px] font-normal leading-0 sm:leading-6 text-white sm:text-base text-nowrap sm:mr-4 ${
							error ? "cursor-pointer text-red-400 hover:text-red-300" : ""
						}`}
						style={{ willChange: "opacity" }}
						onClick={error ? onErrorClick : undefined}
					>
						{getStatusText()}
					</motion.span>
				</AnimatePresence>
			</div>

			{/* Block Number Display */}
			<div className='flex-1 flex justify-end items-center sm:mr-[60px]'>
				<AnimatePresence>
					{showBlockNumber && (
						<motion.div
							key='block-number-container'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: "easeOut",
							}}
							style={{ willChange: "opacity" }}
							className='h-4 sm:h-fit'
						>
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{
									duration: 0.3,
									delay: 0.1,
								}}
								className='text-[#BF6FF5] text-[10px] sm:text-base font-medium leading-3 sm:leading-5 tabular-nums whitespace-nowrap'
								style={{ willChange: "opacity" }}
							>
								{parseInt(blockNumber, 10).toLocaleString()}
							</motion.span>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

// Width calculator utility
const calculateWidth = (uiState, isMobile, hasBlockNumber) => {
	if (isMobile) {
		switch (uiState) {
			case "idle":
				return "135px";
			case "initializing":
				return "135px";
			case "block-number":
				return hasBlockNumber ? "148px" : "118px";
			case "verifying":
				return hasBlockNumber ? "140px" : "110px";
			default:
				return "130px";
		}
	} else {
		switch (uiState) {
			case "idle":
				return "204px";
			case "initializing":
				return "280px";
			case "block-number":
				return hasBlockNumber ? "330px" : "260px";
			case "verifying":
				return hasBlockNumber ? "290px" : "220px";
			default:
				return "230px";
		}
	}
};

// Internal component that uses the Lumina node
const BlockNumberDisplayInternal = ({ onAnimationComplete }) => {
	// Use the hook for live updates
	const {
		status: hookStatus,
		blockNumber: hookBlockNumber,
		error,
		startNode,
		stopNode,
		canStart,
		canStop,
		syncProgress,
		actualSyncProgress,
		connectedPeers,
		syncInfo,
		networkHead,
		storedRanges,
		lastEventTime,
	} = useLuminaNode();

	// DEV MODE: Override status and blockNumber
	const status = DEV_MODE_SIMULATE_SYNC_COMPLETE ? "connected" : hookStatus;
	const blockNumber = DEV_MODE_SIMULATE_SYNC_COMPLETE ? "2847392" : hookBlockNumber;

	// UI State management
	const [uiState, setUiState] = useState("idle");
	const [showContent, setShowContent] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [stopButtonVisible, setStopButtonVisible] = useState(false);
	const controls = useAnimationControls();

	// Check for mobile on mount and window resize
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Track if we're manually stopping to prevent intermediate state flashes
	const [isStopping, setIsStopping] = useState(false);

	// Manage UI state transitions
	useEffect(() => {
		// Skip all transitions if we're stopping
		if (isStopping) {
			return;
		}

		if (status === "idle") {
			setUiState("idle");
			setStopButtonVisible(false);
		} else if (status === "initializing") {
			setUiState("initializing");
			setStopButtonVisible(true);
		} else if (status === "syncing" && blockNumber && uiState !== "verifying") {
			setUiState("block-number");
			setStopButtonVisible(true);
			// Transition to verifying after showing block number
			const timer = setTimeout(() => {
				setUiState("verifying");
				// Keep stop button visible
			}, 2000);
			return () => clearTimeout(timer);
		} else if (status === "connected" && blockNumber) {
			if (uiState !== "verifying") {
				setUiState("verifying");
			}
			setStopButtonVisible(true);
		}
	}, [status, blockNumber, uiState, isStopping]);

	// Calculate target width based on current state
	const targetWidth = calculateWidth(uiState, isMobile, !!blockNumber);

	// Animate width changes
	useEffect(() => {
		controls
			.start({
				width: "auto",
				minWidth: targetWidth,
				transition: {
					duration: isMobile ? 0.4 : 0.5,
					ease: isMobile ? "easeOut" : [0.25, 0.46, 0.45, 0.94],
					type: isMobile ? "spring" : "tween",
					stiffness: isMobile ? 300 : 200,
					damping: 25,
				},
			})
			.then(() => {
				setTimeout(
					() => {
						setShowContent(true);
						onAnimationComplete?.();
					},
					isMobile ? 50 : 75
				);
			});
	}, [targetWidth, controls, isMobile, onAnimationComplete]);

	// Event handlers
	const handleStart = useCallback(async () => {
		await startNode();
	}, [startNode]);

	const handleStop = useCallback(async () => {
		// Block all state transitions first
		setIsStopping(true);

		// Then immediately set final state
		setUiState("idle");
		setStopButtonVisible(false);
		setShowContent(false);

		// Stop the node
		await stopNode();

		// Reset stopping flag after a brief delay
		setTimeout(() => {
			setIsStopping(false);
		}, 100);
	}, [stopNode]);

	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	// Determine what to show
	const getStatusIcon = () => {
		if (status === "error") return <StatusIcon type='error' />;

		switch (uiState) {
			case "idle":
				return null;
			case "initializing":
				return <StatusIcon type='loading' />;
			case "block-number":
				return <StatusIcon type='success' />;
			case "verifying":
				return <StatusIcon type='explorer' blockNumber={blockNumber} />;
			default:
				return <StatusIcon type='loading' />;
		}
	};

	const showStartButton = showContent && uiState === "idle";
	const showStopButton = showContent && canStop && stopButtonVisible;

	return (
		<>
			<motion.div
				initial={{ width: "40px", minWidth: "40px" }}
				animate={controls}
				className={`relative flex items-center gap-x-2 sm:gap-x-3 h-[40px] sm:h-[44px] bg-[#1A191B] rounded-full ${
					uiState === "idle" ? "pl-4 sm:pl-6" : "pl-1.5 sm:pl-1.5"
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
				<AnimatePresence mode='wait'>{getStatusIcon()}</AnimatePresence>

				{/* Main content container */}
				<div className='flex-1 flex relative'>
					<AnimatePresence>
						{showContent && (
							<ContentArea uiState={uiState} blockNumber={blockNumber} error={error} onErrorClick={refreshPage} isMobile={isMobile} />
						)}
					</AnimatePresence>
				</div>

				{/* Control Buttons - Absolutely positioned to banner edges */}
				<AnimatePresence mode='wait'>
					{showStartButton && (
						<div className='absolute right-1.5 sm:right-1.5 top-1/2 -translate-y-1/2'>
							<ControlButton type='start' onClick={canStart ? handleStart : undefined} disabled={!canStart} />
						</div>
					)}
					{showStopButton && (
						<div className='absolute right-1.5 sm:right-1.5 top-1/2 -translate-y-1/2'>
							<ControlButton type='stop' onClick={handleStop} disabled={false} />
						</div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* Debug Panel - Only show in development */}
			{process.env.NODE_ENV === "development" && (
				<DebugPanel
					status={status}
					blockNumber={blockNumber}
					syncProgress={syncProgress}
					actualSyncProgress={actualSyncProgress}
					connectedPeers={connectedPeers}
					syncInfo={syncInfo}
					networkHead={networkHead}
					storedRanges={storedRanges}
					lastEventTime={lastEventTime}
				/>
			)}
		</>
	);
};

// Wrapper component that provides the context
const DynamicBlockNumberDisplay = ({ onAnimationComplete }) => {
	return (
		<AutoLuminaContextProvider>
			<BlockNumberDisplayInternal onAnimationComplete={onAnimationComplete} />
		</AutoLuminaContextProvider>
	);
};

export default DynamicBlockNumberDisplay;
