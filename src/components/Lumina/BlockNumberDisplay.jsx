"use client";

import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";
import LuminaErrorSVG from "@/macros/SVGs/LuminaErrorSVG";
import LuminaGradientCircleSVG from "@/macros/SVGs/LuminaGradientCircleSVG";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// Approximate headers to sync (30 days worth at 12s block time) - used for percentage calculation
const approxHeadersToSync = (30 * 24 * 60 * 60) / 12;

const BlockNumberDisplay = ({ onAnimationComplete }) => {
	// Core node state
	const [blockNumber, setBlockNumber] = useState(null); // Store actual block number or null
	const [error, setError] = useState(null);
	const nodeRef = useRef(null);
	const initializedRef = useRef(false);
	const eventsRef = useRef(null);

	// UI State (inspired by NodeStatus.js)
	const [displayStatus, setDisplayStatus] = useState("initializing"); // 'initializing', 'connected', 'error'
	// const [syncPercentage, setSyncPercentage] = useState(0); // Percentage calculation kept internally but not displayed
	const [showContent, setShowContent] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const controls = useAnimationControls();

	// Syncing state tracking for refresh message - REMOVED as syncing state is no longer shown
	// const [syncingStartTime, setSyncingStartTime] = useState(null);
	// const [showRefreshMessage, setShowRefreshMessage] = useState(false);

	// --- Helper Functions (from NodeStatus.js, adapted) ---

	// Function to refresh the page (kept in case error state needs it)
	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	// Get appropriate status icon
	const getStatusIcon = () => {
		switch (displayStatus) {
			case "initializing":
				// case "syncing": // Syncing state no longer distinct visually from initializing
				return <LuminaGradientCircleSVG />;
			// return showRefreshMessage ? <LuminaErrorSVG /> : <LuminaGradientCircleSVG />;
			case "error":
				return <LuminaErrorSVG />;
			case "connected":
				return <LuminaCheckmarkSVG />;
			default:
				return <LuminaGradientCircleSVG />; // Default/fallback
		}
	};

	// Get appropriate status text based on state and screen size
	const getStatusText = () => {
		if (displayStatus === "error") return isMobile ? `Error` : `Error: ${error || "Unknown error"}`;
		if (displayStatus === "initializing") return isMobile ? "Initializing" : "Initializing connection";
		// Syncing state removed visually
		// if (displayStatus === "syncing") {
		// 	if (showRefreshMessage) {
		// 		return isMobile ? "Tap to refresh" : "Connection failed - Tap to refresh";
		// 	}
		// 	return isMobile ? "Syncing Node" : "Syncing Light Node";
		// }
		if (displayStatus === "connected") return "Block number";
		return isMobile ? "Initializing" : "Initializing connection"; // Default/fallback
	};

	// Display percentage or block number based on state
	const getDisplayValue = () => {
		// When connected and we have a block number, show the block number
		if (displayStatus === "connected" && blockNumber) {
			return (
				<motion.span
					key='blockNumber'
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className='text-[#BF6FF5] text-[12px] sm:text-base font-medium leading-3 sm:leading-5 tabular-nums'
				>
					{/* Format block number with commas */}
					{parseInt(blockNumber, 10).toLocaleString()}
				</motion.span>
			);
		}

		// Syncing percentage display removed
		// if (displayStatus === "syncing") {
		// 	return (
		// 		<motion.span
		// 			key='percentage'
		// 			initial={{ opacity: 0, y: 10 }}
		// 			animate={{ opacity: 1, y: 0 }}
		// 			exit={{ opacity: 0, y: -10 }}
		// 			transition={{ duration: 0.2 }}
		// 			className='text-[#BF6FF5] text-[12px] sm:text-base font-medium sm:mr-4 leading-3 sm:leading-5 sm:ml-auto tabular-nums'
		// 		>
		// 			{/* Show percentage, capped at 99% visually during sync */}
		// 			{Math.min(Math.floor(syncPercentage), 99)}%
		// 		</motion.span>
		// 	);
		// }

		// Fallback (should not happen normally when not syncing/connected)
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

	// Update animation based on mobile state
	useEffect(() => {
		controls.start({
			width: "fit-content",
			minWidth: isMobile ? "44px" : "324px",
			transition: { duration: 0.6, ease: "easeOut" },
		});
	}, [isMobile, controls]);

	// Track time spent in syncing state for refresh message - REMOVED
	// useEffect(() => {
	// 	let syncingTimer;
	// 	if (displayStatus === "syncing") { ... }
	// }, [displayStatus, syncingStartTime]);

	// Core Node Initialization and Event Handling Effect
	useEffect(() => {
		// Exit early if not browser environment
		if (typeof window === "undefined" || initializedRef.current) {
			return;
		}

		// Flag to prevent double initialization
		initializedRef.current = true;
		let isMounted = true;

		// Dynamically import the lumina-node module only on client-side
		const importAndInitNode = async () => {
			try {
				// Dynamically import Lumina Node only in the browser
				const { Network, NodeConfig, spawnNode } = await import("lumina-node");

				// Helper to update sync progress (internally)
				const updateSyncProgress = async () => {
					if (!nodeRef.current || !isMounted) return;
					try {
						const info = await nodeRef.current.syncerInfo();
						if (!info || !info.subjective_head || !info.stored_headers) {
							console.log("Syncer info not yet available.");
							return;
						}

						// Percentage calculation remains but isn't displayed and doesn't change UI status
						const syncingWindowTail = Number(info.subjective_head) - approxHeadersToSync;
						const normalizedRanges = info.stored_headers.map((range) => ({
							start: Math.max(Number(range.start), syncingWindowTail),
							end: Math.max(Number(range.end), syncingWindowTail),
						}));
						const totalSyncedDuration = normalizedRanges.reduce((acc, range) => acc + (range.end - range.start), 0);
						const percentage = Math.min((totalSyncedDuration * 100) / approxHeadersToSync, 100);
						// setSyncPercentage(percentage); // No longer needed to set state for display
						console.log(`Internal Sync Progress: ${percentage.toFixed(1)}%`); // Log internally if needed
					} catch (e) {
						console.error("Error calculating sync progress:", e);
					}
				};

				// Handler for new head block
				const handleNewHead = async (newBlockHeight) => {
					if (!nodeRef.current || !isMounted) return;
					try {
						const heightStr = String(newBlockHeight);
						setBlockNumber(heightStr);
						// Only change to 'connected' if not already in 'error' state
						if (displayStatus !== "error") {
							setDisplayStatus("connected");
						}
						// We can still update internal progress if needed, but it won't show
						await updateSyncProgress();
					} catch (e) {
						console.error("Error processing new head:", e);
						if (isMounted) {
							setError("Error processing new head: " + e.message);
							setDisplayStatus("error");
						}
					}
				};

				// Start in initializing state
				setDisplayStatus("initializing");
				console.log("Spawning Lumina node...");
				const node = await spawnNode();
				nodeRef.current = node;
				console.log("Node spawned.");

				if (!isMounted) return;

				console.log("Configuring for Mainnet...");
				const config = NodeConfig.default(Network.Mainnet);

				console.log("Setting up event channel...");
				const events = await node.eventsChannel();
				eventsRef.current = events;

				events.onmessage = async (event) => {
					if (!event.data || !isMounted) return;
					try {
						const event_data = event.data.get("event");
						if (!event_data || !event_data.type) return;

						// Update internal sync progress on relevant events (optional)
						if (
							[
								"fetching_head_header_finished",
								"added_header_from_header_sub",
								"fetching_headers_finished",
								"sync_challenge_resolved",
								"syncer_state_update",
							].includes(event_data.type)
						) {
							await updateSyncProgress();
						}

						// Handle specific events for block number (sets state to 'connected')
						switch (event_data.type) {
							case "fetching_head_header_finished":
							case "added_header_from_header_sub":
								const height = event_data.height || event_data.to_height;
								if (height) {
									await handleNewHead(height);
								}
								break;

							case "fetching_headers_finished":
								const to_height = event_data.to_height;
								if (to_height && (!blockNumber || BigInt(to_height) > BigInt(blockNumber))) {
									await handleNewHead(to_height);
								}
								break;

							default:
								break;
						}
					} catch (e) {
						console.error("Error processing node event:", e);
						if (isMounted) {
							setError("Error processing node event: " + e.message);
							setDisplayStatus("error");
						}
					}
				};

				events.onerror = (err) => {
					console.error("Event channel error:", err);
					if (isMounted) {
						const errorMessage = err && err.message ? err.message : "Unknown error";
						setError(`Node event channel error: ${errorMessage}`);
						setDisplayStatus("error");
					}
				};

				console.log("Starting node...");
				await node.start(config);
				console.log("Node started.");
			} catch (err) {
				console.error("Error initializing Lumina Node:", err);
				if (isMounted) {
					setError(`Error initializing node: ${err.message}`);
					setDisplayStatus("error");
				}
			}
		};

		// Only initialize in browser environment
		if (typeof window !== "undefined") {
			importAndInitNode();
		}

		// Cleanup function
		return () => {
			isMounted = false;
			console.log("Stopping Lumina node...");
			if (eventsRef.current) {
				eventsRef.current.close();
				console.log("Event channel closed.");
			}
			if (nodeRef.current) {
				nodeRef.current
					.stop()
					.then(() => console.log("Node stopped."))
					.catch((err) => console.error("Error stopping node:", err));
			} else {
				console.log("Node ref was null, nothing to stop.");
			}
		};
	}, [displayStatus, blockNumber]); // Updated dependencies

	// Handle main error state rendering
	if (displayStatus === "error" && !showContent) {
		// Allow animation to show error within the component
	}

	// Animation complete handler
	const handleAnimationComplete = () => {
		setShowContent(true);
		onAnimationComplete?.(); // Call prop if provided
	};

	// --- JSX Rendering (Simplified) ---
	return (
		<motion.div
			initial={{ width: "44px", minWidth: "44px" }}
			animate={controls}
			onAnimationComplete={handleAnimationComplete}
			className='flex items-center gap-x-2 sm:gap-x-3 h-[44px] max-w-[600px] bg-[#1A191B] rounded-full pl-[10px] pr-4 sm:pr-1 py-0.5 sm:py-1 text-white overflow-hidden'
		>
			{/* Status Icon */}
			{getStatusIcon()}

			{/* Text Content and Value Area */}
			<AnimatePresence>
				{showContent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						className='flex flex-col items-start w-full sm:items-center sm:flex-row'
					>
						{/* Status Text */}
						<AnimatePresence mode='wait'>
							<motion.span
								key={displayStatus} // Key change triggers animation (no longer includes refresh state)
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className={`text-[10px] font-normal leading-4 sm:leading-6 text-white sm:text-base text-nowrap sm:mr-4 ${
									// Refresh logic removed
									displayStatus === "error" ? "cursor-pointer text-red-400 hover:text-red-300" : ""
								}`}
								onClick={displayStatus === "error" ? refreshPage : undefined} // Allow refresh on error
							>
								{getStatusText()}
							</motion.span>
						</AnimatePresence>

						{/* Block Number (Only) */}
						<div className='sm:ml-auto min-w-[40px] flex sm:justify-end'>
							<AnimatePresence mode='wait'>{getDisplayValue()}</AnimatePresence>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Explorer Link (only shown when connected and content is visible) */}
			{displayStatus === "connected" && blockNumber && showContent && (
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

export default BlockNumberDisplay;
