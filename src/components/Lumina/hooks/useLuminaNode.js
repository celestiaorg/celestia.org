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

	// This is exactly as it appears in the example project
	const onAddedHeaders = useCallback(async () => {
		if (!node) return;
		try {
			const info = await node.syncerInfo();
			const storedRanges = normalizeStoredRanges(info.subjective_head, info.stored_headers);
			const percentage = syncingPercentage(storedRanges);

			// Critical: Update both the ref and state
			statsRef.current = {
				...statsRef.current,
				storedRanges: storedRanges,
				approxSyncingWindowSize: APPROX_HEADERS_TO_SYNC,
				syncedPercentage: percentage,
				networkHeadHeight: info.subjective_head,
				lastEventTime: Date.now(),
			};
			setSyncProgress(percentage);

			// Update block number if we have a network head
			if (info.subjective_head) {
				setBlockNumber(info.subjective_head.toString());
			}

			// If we're fully synced, set status to connected
			if (percentage >= 99.9) {
				setStatus("connected");
			}
		} catch (err) {
			console.error("Error updating headers:", err);
		}
	}, [node]);

	const onNewHead = useCallback(
		async (height) => {
			if (!node) return;
			try {
				const header = await node.getHeaderByHeight(BigInt(height));

				// When we get a new head, update our stored info
				statsRef.current = {
					...statsRef.current,
					networkHeadHeight: height,
					networkHeadHash: header.commit?.block_id?.hash || "",
					lastEventTime: Date.now(),
				};

				setBlockNumber(height.toString());

				// Always update headers after getting a new head
				await onAddedHeaders();
			} catch (err) {
				console.error("Error handling new head:", err);
			}
		},
		[node, onAddedHeaders]
	);

	const handleNodeEvent = useCallback(
		async (event) => {
			if (!event || !event.data) return;

			// Update the last event time whenever we get any event
			statsRef.current.lastEventTime = Date.now();

			const eventData = event.data.get("event");
			switch (eventData.type) {
				// node finished initialization and got initial trusted head
				case "fetching_head_header_finished":
					setStatus("syncing");
					await onAddedHeaders();
					break;

				// new header added from header-sub
				case "added_header_from_header_sub":
					// Set status to connected when we're receiving live headers AND
					// we're mostly caught up
					if (statsRef.current.syncedPercentage >= 95) {
						setStatus("connected");
					}
					await onNewHead(eventData.height);
					break;

				// syncer finished fetching next batch of headers
				case "fetching_headers_finished":
					// last header in batch *may* be a new head
					const to_height = eventData.to_height;
					if (statsRef.current.networkHeadHeight && to_height > statsRef.current.networkHeadHeight) {
						await onNewHead(to_height);
					} else {
						await onAddedHeaders();
					}
					break;

				// When DAS starts, we're likely caught up with headers
				case "sampling_started":
					if (status === "syncing" && statsRef.current.syncedPercentage >= 95) {
						setStatus("connected");
					}
					break;
			}
		},
		[onNewHead, onAddedHeaders, status]
	);

	// Initialize the node when component mounts
	useEffect(() => {
		const initNode = async () => {
			if (!node) return;

			try {
				const config = NodeConfig.default(Network.Mainnet);
				const events = await node.eventsChannel();
				eventsRef.current = events;

				events.onmessage = handleNodeEvent;
				await node.start(config);
			} catch (err) {
				console.error("Error initializing node:", err);
				setError(err.message);
				setStatus("error");
			}
		};

		initNode();

		return () => {
			if (eventsRef.current) {
				eventsRef.current.close();
			}
		};
	}, [node, handleNodeEvent]);

	// Set up polling for periodic updates
	useEffect(() => {
		if (!node) return;

		const pollData = async () => {
			try {
				// Check if connection is stalled
				const timeSinceLastEvent = Date.now() - statsRef.current.lastEventTime;
				if (timeSinceLastEvent > SYNC_POLLING_INTERVAL * 5) {
					console.warn("Connection appears stalled - last event was", Math.floor(timeSinceLastEvent / 1000), "seconds ago");

					// Revert to syncing if we were connected but stalled
					if (status === "connected") {
						setStatus("syncing");
					}
				}

				// Always poll connected peers
				const peers = await node.connectedPeers();
				setConnectedPeers(peers);

				// Critical: Always call onAddedHeaders to refresh sync status
				// This ensures the percentage is constantly updated
				await onAddedHeaders();
			} catch (err) {
				console.error("Error polling data:", err);
			}
		};

		// Poll more frequently (every 1s) during syncing, less often (every 2s) when connected
		const interval = setInterval(pollData, status === "syncing" ? SYNC_POLLING_INTERVAL / 2 : SYNC_POLLING_INTERVAL);

		// Initial poll immediately
		pollData();

		return () => clearInterval(interval);
	}, [node, status, onAddedHeaders]);

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
