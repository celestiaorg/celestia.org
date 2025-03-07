import { Network, NodeConfig, spawnNode } from "lumina-node";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import NodeStatus from "./NodeStatus";

export const AutoLuminaContext = createContext(null);

export function AutoLuminaContextProvider({ children }) {
	const [lumina, setLumina] = useState(null);
	const initialized = useRef(false);

	useEffect(() => {
		const init = async () => {
			const node = await spawnNode();
			setLumina(node);
		};
		if (!initialized.current) {
			initialized.current = true;
			init();
		}
	}, []);

	return <AutoLuminaContext.Provider value={lumina}>{children}</AutoLuminaContext.Provider>;
}

const AutoConnectingLuminaNode = () => {
	const node = useContext(AutoLuminaContext);
	const [status, setStatus] = useState("initializing");
	const [blockNumber, setBlockNumber] = useState(null);
	const [error, setError] = useState(null);
	const eventsRef = useRef(null);
	const statsRef = useRef({ networkHeadHeight: "" });

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
	}, [node]);

	const handleNodeEvent = async (event) => {
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
	};

	const onNewHead = async (height) => {
		try {
			const header = await node.getHeaderByHeight(BigInt(height));
			statsRef.current.networkHeadHeight = height;
			setBlockNumber(height.toString());
		} catch (err) {
			console.error("Error getting header:", err);
		}
	};

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

	const getStatusProps = () => {
		switch (status) {
			case "initializing":
				return {
					status: "Initializing",
					loadingPercentage: "",
					blockNumber: "",
				};
			case "syncing":
				return {
					status: "Syncing",
					loadingPercentage: "0",
					blockNumber: "",
				};
			case "connected":
				return {
					status: "Verifying",
					blockNumber: blockNumber,
					url: blockNumber ? `https://celenium.io/block/${blockNumber}` : "",
				};
			case "error":
				return {
					status: "Error",
					blockNumber: "",
					error: error,
				};
			default:
				return {
					status: "Initializing",
					blockNumber: "",
				};
		}
	};

	return <NodeStatus {...getStatusProps()} />;
};

export default AutoConnectingLuminaNode;
