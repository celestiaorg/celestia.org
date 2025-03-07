import { Network, NodeConfig } from "lumina-node";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AutoLuminaContext } from "../AutoLuminaContext";

export const useLuminaNode = () => {
	const node = useContext(AutoLuminaContext);
	const [status, setStatus] = useState("initializing");
	const [blockNumber, setBlockNumber] = useState(null);
	const [error, setError] = useState(null);
	const eventsRef = useRef(null);
	const statsRef = useRef({ networkHeadHeight: "" });

	const onNewHead = useCallback(
		async (height) => {
			try {
				const header = await node.getHeaderByHeight(BigInt(height));
				statsRef.current.networkHeadHeight = height;
				setBlockNumber(height.toString());
			} catch (err) {
				console.error("Error getting header:", err);
			}
		},
		[node]
	);

	const handleNodeEvent = useCallback(
		async (event) => {
			if (!event.data) return;

			const eventData = event.data.get("event");
			switch (eventData.type) {
				case "fetching_head_header_finished":
					setStatus("syncing");
					break;
				case "added_header_from_header_sub":
					setStatus("connected");
					await onNewHead(eventData.height);
					break;
			}
		},
		[onNewHead]
	);

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

	useEffect(() => {
		if (!node || status !== "connected") return;

		const pollHeader = async () => {
			try {
				if (statsRef.current.networkHeadHeight) {
					const header = await node.getHeaderByHeight(BigInt(statsRef.current.networkHeadHeight));
					setBlockNumber(statsRef.current.networkHeadHeight.toString());
				}
			} catch (err) {
				console.error("Error polling header:", err);
			}
		};

		const interval = setInterval(pollHeader, 2000);
		pollHeader();

		return () => clearInterval(interval);
	}, [node, status]);

	return {
		status,
		blockNumber,
		error,
		isConnected: status === "connected",
		isSyncing: status === "syncing",
		isInitializing: status === "initializing",
		hasError: status === "error",
	};
};
