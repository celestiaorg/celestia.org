"use client";
import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";
import LuminaErrorSVG from "@/macros/SVGs/LuminaErrorSVG";
import LuminaGradientCircleSVG from "@/macros/SVGs/LuminaGradientCircleSVG";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useLuminaNode } from "./hooks/useLuminaNode";

const NodeStatus = ({ onAnimationComplete }) => {
	const { status, blockNumber, error, isConnected } = useLuminaNode();
	const [fakeProgress, setFakeProgress] = useState(0);
	const [showContent, setShowContent] = useState(false);
	const [prevStatus, setPrevStatus] = useState(null);
	const [prevBlockNumber, setPrevBlockNumber] = useState(null);
	const [isMobile, setIsMobile] = useState(false);
	const controls = useAnimationControls();

	// Track syncing state duration
	const [syncingStartTime, setSyncingStartTime] = useState(null);
	const [showRefreshMessage, setShowRefreshMessage] = useState(false);

	// Function to refresh the page
	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	// Check for mobile on mount and window resize
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
		};

		// Initial check
		checkMobile();

		// Add resize listener
		window.addEventListener("resize", checkMobile);

		// Cleanup
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Update animation based on mobile state
	useEffect(() => {
		controls.start({
			width: "fit-content",
			minWidth: isMobile ? "44px" : "324px",
			transition: { duration: 0.6, ease: "easeOut" },
		});
	}, [isMobile, controls]);

	useEffect(() => {
		if (status !== prevStatus) {
			setPrevStatus(status);
		}
	}, [status, prevStatus]);

	useEffect(() => {
		if (blockNumber !== prevBlockNumber) {
			setPrevBlockNumber(blockNumber);
		}
	}, [blockNumber, prevBlockNumber]);

	// Track time spent in syncing state
	useEffect(() => {
		let syncingTimer;
		let hidePercentageTimer;

		if (status === "syncing") {
			// If we just entered syncing state
			if (!syncingStartTime) {
				setSyncingStartTime(Date.now());
			}

			// First hide percentage after 29.5 seconds
			hidePercentageTimer = setTimeout(() => {
				setFakeProgress(null);
			}, 29500);

			// Then show refresh message after 20 seconds
			syncingTimer = setTimeout(() => {
				const timeInSyncing = Date.now() - syncingStartTime;
				if (timeInSyncing > 30000) {
					// 30 seconds
					setShowRefreshMessage(true);
				}
			}, 30000);
		} else {
			// Reset syncing timer when we leave syncing state
			setSyncingStartTime(null);
			setShowRefreshMessage(false);
			// Reset fake progress to show percentage again
			setFakeProgress(0);
		}

		return () => {
			if (syncingTimer) clearTimeout(syncingTimer);
			if (hidePercentageTimer) clearTimeout(hidePercentageTimer);
		};
	}, [status, syncingStartTime]);

	useEffect(() => {
		let intervalId;

		if (status === "syncing" && fakeProgress !== null) {
			// Reset progress when syncing starts
			if (fakeProgress === 0) {
				setFakeProgress(0);
			}

			// Increment progress every 100ms
			intervalId = setInterval(() => {
				setFakeProgress((prev) => {
					// If null, don't update
					if (prev === null) return null;

					// Slowly increase up to 99%
					if (prev < 99) {
						// Faster at start, slower as it progresses
						const increment = Math.max(1, Math.floor((100 - prev) / 20));
						return Math.min(99, prev + increment);
					}
					return prev;
				});
			}, 100);
		} else if (status === "connected") {
			// Jump to 100% when connected
			setFakeProgress(100);
			// Reset refresh message when connected
			setShowRefreshMessage(false);
		} else if (status !== "syncing") {
			// Reset progress for other states
			setFakeProgress(0);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [status, fakeProgress]);

	const handleAnimationComplete = () => {
		setShowContent(true);
		onAnimationComplete?.();
	};

	const getStatusIcon = () => {
		switch (status) {
			case "initializing":
				return <LuminaGradientCircleSVG />;
			case "syncing":
				return showRefreshMessage ? <LuminaErrorSVG /> : <LuminaGradientCircleSVG />;
			case "error":
				return <LuminaErrorSVG />;
			case "connected":
				return <LuminaCheckmarkSVG />;
			default:
				return <LuminaGradientCircleSVG />;
		}
	};

	const getStatusText = () => {
		if (error) return isMobile ? `Error` : `Error: ${error}`;
		if (status === "initializing") return isMobile ? "Initializing" : "Initializing connection";
		if (status === "syncing") {
			if (showRefreshMessage) {
				return isMobile ? "Tap to refresh" : "Connection failed - Tap to refresh";
			}
			return isMobile ? "Syncing Node" : "Syncing Light Node";
		}
		if (status === "connected") return "Block number";
		return isMobile ? "Initializing" : "Initializing connection";
	};

	const getLoadingPercentage = () => {
		if (fakeProgress === null) {
			return null; // Hide percentage when preparing to show stuck message
		}
		if (status === "syncing" || status === "connected") {
			return `${fakeProgress}`;
		}
		return "0";
	};

	return (
		<motion.div
			initial={{ width: "44px", minWidth: "44px" }}
			animate={controls}
			onAnimationComplete={handleAnimationComplete}
			className='flex items-center gap-x-2 sm:gap-x-3 h-[44px] max-w-[600px] bg-[#1A191B] rounded-full pl-[10px] pr-4 sm:pr-1 py-0.5 sm:py-1 text-white overflow-hidden'
		>
			{getStatusIcon()}
			<AnimatePresence>
				{showContent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						className='flex flex-col items-start w-full sm:items-center sm:flex-row'
					>
						<AnimatePresence mode='wait'>
							<motion.span
								key={status + (showRefreshMessage ? "-refresh" : "")}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className={`text-[10px] font-normal leading-4 sm:leading-6 text-white sm:text-base text-nowrap sm:mr-4 ${
									showRefreshMessage ? "cursor-pointer text-red-400 hover:text-red-300" : ""
								}`}
								onClick={showRefreshMessage ? refreshPage : undefined}
							>
								{getStatusText()}
							</motion.span>
						</AnimatePresence>
						<div className='sm:ml-auto min-w-[40px] flex sm:justify-end'>
							<AnimatePresence mode='wait'>
								{blockNumber ? (
									<motion.span
										key='blockNumber'
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
										className='text-[#BF6FF5] text-[12px] sm:text-base font-medium leading-3 sm:leading-5 tabular-nums'
									>
										{parseInt(blockNumber).toLocaleString()}
									</motion.span>
								) : getLoadingPercentage() ? (
									<motion.span
										key='percentage'
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
										className='text-[#BF6FF5] text-[12px] sm:text-base font-medium sm:mr-4 leading-3 sm:leading-5 sm:ml-auto tabular-nums'
									>
										{getLoadingPercentage()}%
									</motion.span>
								) : null}
							</AnimatePresence>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			{isConnected && blockNumber && showContent && (
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

export default NodeStatus;
