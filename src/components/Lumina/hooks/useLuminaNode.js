import { Network, NodeConfig } from "lumina-node";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AutoLuminaContext } from "../AutoLuminaContext";

// Predicted amount of headers in syncing window (last 30 days / ~12s block time)
const APPROX_HEADERS_TO_SYNC = (30 * 24 * 60 * 60) / 12;
const SYNC_POLLING_INTERVAL = 2000; // 2 seconds

// Takes network head and ranges of headers node synchronized and calculates ranges
// position inside the syncing window
const normalizeStoredRanges = (networkHead, storedHeaders) => {
	if (!storedHeaders || !storedHeaders.length) return [];

	const syncingWindowTail = Number(networkHead) - APPROX_HEADERS_TO_SYNC;
	// Normalize stored ranges wrt their position in syncing window
	const normalizedRanges = storedHeaders.map((range) => {
		const adjustedStart = Math.max(Number(range.start), syncingWindowTail);
		const adjustedEnd = Math.max(Number(range.end), syncingWindowTail);
		return {
			start: adjustedStart,
			end: adjustedEnd,
		};
	});

	return normalizedRanges;
};

// calculate what percentage of syncing window the stored ranges occupy
const syncingPercentage = (normalizedRanges) => {
	if (!normalizedRanges || !normalizedRanges.length) return 0;
	return (normalizedRanges.reduce((acc, range) => acc + (range.end - range.start), 0) * 100) / APPROX_HEADERS_TO_SYNC;
};

export const useLuminaNode = () => {
	const node = useContext(AutoLuminaContext);
	const [status, setStatus] = useState("initializing");
	const [blockNumber, setBlockNumber] = useState(null);
	const [error, setError] = useState(null);
	const [syncProgress, setSyncProgress] = useState(0);
	const [connectedPeers, setConnectedPeers] = useState([]);
	const eventsRef = useRef(null);
	const nodeStartedRef = useRef(false); // Tracks if node.start() has been successfully called
	const isPollingRef = useRef(false); // Tracks if polling interval is active

	// Create a mutable ref object that persists for the lifetime of the component
	const statsRef = useRef({
		peerId: "",
		storedRanges: [],
		approxSyncingWindowSize: APPROX_HEADERS_TO_SYNC,
		syncedPercentage: 0,
		connectedPeers: [],
		networkHeadHeight: "",
		networkHeadHash: "",
		lastEventTime: Date.now(),
	});

	const onAddedHeaders = useCallback(async () => {
		if (!node || !nodeStartedRef.current) return; // Check if node started
		try {
			const info = await node.syncerInfo();
			const storedRanges = normalizeStoredRanges(info.subjective_head, info.stored_headers);
			const percentage = syncingPercentage(storedRanges);

			// Update the ref state but avoid unnecessary state updates
			statsRef.current = {
				...statsRef.current,
				storedRanges: storedRanges,
				approxSyncingWindowSize: APPROX_HEADERS_TO_SYNC,
				syncedPercentage: percentage,
				networkHeadHeight: info.subjective_head,
				lastEventTime: Date.now(),
			};

			// Only update progress state if it changed significantly
			if (Math.abs(syncProgress - percentage) > 0.5) {
				setSyncProgress(percentage);
			}

			if (info.subjective_head) {
				setBlockNumber(info.subjective_head.toString());
			}

			// Only change to connected status if we're syncing and reached threshold
			if (percentage >= 99.9 && status === "syncing") {
				console.log("Sync complete, setting status to connected");
				setStatus("connected");
			}
		} catch (err) {
			// Only log errors if the node should be ready (i.e., started)
			if (nodeStartedRef.current) {
				console.error("Error updating headers:", err);
			}
		}
	}, [node, status, syncProgress]);

	const onNewHead = useCallback(
		async (height) => {
			if (!node || !nodeStartedRef.current) return; // Check if node started
			try {
				const header = await node.getHeaderByHeight(BigInt(height));

				statsRef.current = {
					...statsRef.current,
					networkHeadHeight: height,
					networkHeadHash: header.commit?.block_id?.hash || "",
					lastEventTime: Date.now(),
				};

				setBlockNumber(height.toString());
				await onAddedHeaders();
			} catch (err) {
				if (nodeStartedRef.current) {
					console.error("Error handling new head:", err);
				}
			}
		},
		[node, onAddedHeaders]
	);

	const handleNodeEvent = useCallback(
		async (event) => {
			if (!event || !event.data) return;

			statsRef.current.lastEventTime = Date.now();

			const eventData = event.data.get("event");
			switch (eventData.type) {
				case "fetching_head_header_finished":
					console.log("Event: fetching_head_header_finished");
					// Only update status if not already syncing or connected
					if (status !== "syncing" && status !== "connected") {
						setStatus("syncing");
					}
					await onAddedHeaders();
					break;
				case "added_header_from_header_sub":
					console.log("Event: added_header_from_header_sub");
					// Only move to connected state if we're currently syncing
					if (statsRef.current.syncedPercentage >= 95 && status === "syncing") {
						setStatus("connected");
					}
					await onNewHead(eventData.height);
					break;
				case "fetching_headers_finished":
					console.log("Event: fetching_headers_finished");
					const to_height = eventData.to_height;
					if (statsRef.current.networkHeadHeight && to_height > statsRef.current.networkHeadHeight) {
						await onNewHead(to_height);
					} else {
						await onAddedHeaders();
					}
					break;
				case "sampling_started":
					console.log("Event: sampling_started");
					// Only move to connected state if we're currently syncing
					if (status === "syncing" && statsRef.current.syncedPercentage >= 95) {
						setStatus("connected");
					}
					break;
			}
		},
		[onNewHead, onAddedHeaders, status]
	);

	// Effect for initializing the node and setting up event listeners
	useEffect(() => {
		// Only run if node instance exists and hasn't been started yet
		if (!node || nodeStartedRef.current) {
			return;
		}

		const initAndStartNode = async () => {
			try {
				// Check again if maybe another effect instance started it
				if (nodeStartedRef.current) return;

				console.log("Initializing Lumina node...");
				setStatus("initializing");

				// Using the default Mainnet configuration - this has proven reliable
				const config = NodeConfig.default(Network.Mainnet);
				console.log("Using Mainnet configuration");

				// Set up event channel before starting the node
				const events = await node.eventsChannel();
				eventsRef.current = events;
				events.onmessage = handleNodeEvent;
				console.log("Event channel established");

				// Delay before starting to allow the WebAssembly/worker environment to initialize
				await new Promise((resolve) => setTimeout(resolve, 3000));

				try {
					// Start the node with the configuration
					await node.start(config);

					// Mark as started *after* successful call
					nodeStartedRef.current = true;
					console.log("Lumina node started successfully");
					setStatus("syncing"); // Assume syncing initially after start
				} catch (startError) {
					console.error("Error starting node:", startError);
					// If it's already started, that's actually okay
					if (startError.message.includes("already started")) {
						nodeStartedRef.current = true;
						console.log("Node was already started (caught during start)");
						setStatus("syncing");
					} else {
						setError(startError.message);
						setStatus("error");
						throw startError; // Re-throw to be caught by outer try/catch
					}
				}
			} catch (err) {
				console.error("Error during node initialization:", err);
				if (!err.message.includes("already started")) {
					// Avoid error if race condition occurred
					setError(err.message);
					setStatus("error");
				} else {
					// If it was already started by a concurrent effect run
					nodeStartedRef.current = true;
					console.log("Node was already started (detected in catch)");
					// Ensure event listener is attached if this instance didn't do it
					if (!eventsRef.current) {
						try {
							const events = await node.eventsChannel();
							eventsRef.current = events;
							events.onmessage = handleNodeEvent;
						} catch (eventErr) {
							console.error("Error attaching event listener:", eventErr);
						}
					}
				}
			}
		};

		// Introducing a delay before initialization helps prevent race conditions
		const timerId = setTimeout(initAndStartNode, 1000);

		// Cleanup function for the effect
		return () => {
			clearTimeout(timerId);
			if (eventsRef.current) {
				console.log("Closing event channel");
				eventsRef.current.close();
				eventsRef.current = null;
			}
			// We don't stop the node itself here, as it's managed by the context provider
		};
	}, [node, handleNodeEvent]); // Rerun only if node instance changes

	// Effect for polling data
	useEffect(() => {
		// Only set up polling once, when the component mounts and node is ready
		if (!node || !nodeStartedRef.current || isPollingRef.current) {
			return;
		}

		// Mark as polling so this effect only runs once
		isPollingRef.current = true;
		console.log("Starting polling");

		const pollIntervalId = setInterval(async () => {
			if (!nodeStartedRef.current) return; // Exit if node stopped

			try {
				// Check for stalled connection
				const timeSinceLastEvent = Date.now() - statsRef.current.lastEventTime;
				if (timeSinceLastEvent > SYNC_POLLING_INTERVAL * 10) {
					console.warn(`Connection potentially stalled - last event ${Math.floor(timeSinceLastEvent / 1000)}s ago`);
					// Only change status if we were connected
					if (status === "connected") {
						console.log("Stalled while connected, reverting status to syncing");
						setStatus("syncing");
					}
				}

				// Poll connected peers
				try {
					const peers = await node.connectedPeers();

					// Only update if the peer count has changed
					const peerCount = peers?.length || 0;
					const currentPeerCount = connectedPeers?.length || 0;

					// Important indicator: if peer count changes, log it
					if (peerCount > 0 && peerCount !== currentPeerCount) {
						console.log(`Connected to ${peerCount} peer(s)`);
						setConnectedPeers(peers);
					}
				} catch (peerErr) {
					console.warn("Error polling peers:", peerErr);
				}

				// Refresh sync status
				try {
					await onAddedHeaders();
				} catch (syncErr) {
					console.warn("Error updating sync status:", syncErr);
				}
			} catch (err) {
				console.error("Error during polling:", err);
			}
		}, SYNC_POLLING_INTERVAL);

		// Initial poll
		(async () => {
			try {
				await onAddedHeaders();
			} catch (err) {
				console.warn("Error in initial poll:", err);
			}
		})();

		// Cleanup function for the polling effect - only runs on unmount
		return () => {
			console.log("Stopping polling");
			clearInterval(pollIntervalId);
			isPollingRef.current = false;
		};
	}, [node]); // Only depend on node to avoid re-running this effect

	return {
		status,
		blockNumber,
		error,
		syncProgress,
		connectedPeers,
		isConnected: status === "connected",
		isSyncing: status === "syncing",
		isInitializing: status === "initializing",
		hasError: status === "error",
	};
};
