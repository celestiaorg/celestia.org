"use client";

import { Label } from "@/macros/Copy"; // Using Label for styling consistency
import { Network, NodeConfig, spawnNode } from "lumina-node";
import { useEffect, useRef, useState } from "react";

const BlockNumberDisplay = () => {
	const [blockNumber, setBlockNumber] = useState("Initializing node...");
	const [error, setError] = useState(null);
	const nodeRef = useRef(null);
	const initializedRef = useRef(false);
	const eventsRef = useRef(null);

	useEffect(() => {
		if (initializedRef.current || typeof window === "undefined") {
			return;
		}
		initializedRef.current = true;

		let isMounted = true; // Track component mount status

		const initNode = async () => {
			try {
				console.log("Spawning Lumina node...");
				const node = await spawnNode();
				nodeRef.current = node;
				console.log("Node spawned.");

				if (!isMounted) return; // Check if component is still mounted

				console.log("Configuring for Mainnet...");
				const config = NodeConfig.default(Network.Mainnet);
				// Optional: Add specific bootnodes if needed, otherwise defaults are used
				// config.bootnodes = ["/ip4/..."];

				console.log("Setting up event channel...");
				const events = await node.eventsChannel();
				eventsRef.current = events; // Store events channel in ref

				events.onmessage = (event) => {
					if (!event.data || !isMounted) {
						return;
					}

					try {
						const event_data = event.data.get("event");
						let newHeight = null;

						// console.log("Node event:", event_data.type); // Log event types for debugging

						switch (event_data.type) {
							// Use the latest height available from these events
							case "fetching_head_header_finished":
								newHeight = event_data.to_height?.toString();
								// console.log(`New head header finished: ${newHeight}`);
								break;
							case "added_header_from_header_sub":
								newHeight = event_data.height?.toString();
								// console.log(`Added header from sub: ${newHeight}`);
								break;
							case "fetching_headers_finished":
								// This might contain a new head, check against current state if needed,
								// but added_header_from_header_sub should be more definitive for the head.
								// We can still update if it's higher than the current one.
								const potentialNewHeight = event_data.to_height?.toString();
								// Check if potentialNewHeight is a valid number string before comparing
								const currentBlockNumber = blockNumber;
								const isValidPotentialHeight = potentialNewHeight && !isNaN(parseInt(potentialNewHeight));
								// Check if currentBlockNumber is actually a number before comparison
								const isValidCurrentBlockNumber =
									currentBlockNumber &&
									typeof currentBlockNumber === "string" &&
									!isNaN(parseInt(currentBlockNumber)) &&
									currentBlockNumber !== "Initializing node..." &&
									currentBlockNumber !== "Waiting for block data..." &&
									currentBlockNumber !== "Error";

								if (
									isValidPotentialHeight &&
									(!isValidCurrentBlockNumber || BigInt(potentialNewHeight) > BigInt(currentBlockNumber))
								) {
									newHeight = potentialNewHeight;
									// console.log(`Fetching headers finished, potential new head: ${newHeight}`);
								}
								break;
							default:
								// Other events can be logged or handled if needed
								break;
						}

						if (newHeight) {
							// Update state only if the new height is different to avoid unnecessary re-renders
							setBlockNumber((prevBlockNumber) => {
								if (prevBlockNumber !== newHeight) {
									// console.log(`Updating block number to: ${newHeight}`);
									return newHeight;
								}
								return prevBlockNumber;
							});
						}
					} catch (e) {
						console.error("Error processing node event:", e);
						if (isMounted) {
							setError("Error processing node event.");
						}
					}
				};

				events.onerror = (err) => {
					console.error("Event channel error:", err);
					if (isMounted) {
						setError("Node event channel error.");
					}
				};

				console.log("Starting node...");
				await node.start(config);
				console.log("Node started.");

				// Set status after attempting to start
				setBlockNumber("Waiting for block data...");
			} catch (err) {
				console.error("Error initializing Lumina Node:", err);
				if (isMounted) {
					setError(`Error initializing node: ${err.message}`);
					setBlockNumber("Error");
				}
			}
		};

		initNode();

		// Cleanup function
		return () => {
			isMounted = false; // Set mounted status to false
			console.log("Stopping Lumina node...");
			if (eventsRef.current) {
				eventsRef.current.close(); // Close the event channel
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
	}, []); // Keep dependency array empty to run only once on mount

	if (error) {
		return <Label className='text-red-500'>Error: {error}</Label>;
	}

	// Format the block number only if it's a valid number string
	const displayValue =
		blockNumber && typeof blockNumber === "string" && !isNaN(parseInt(blockNumber)) ? parseInt(blockNumber, 10).toLocaleString() : blockNumber; // Otherwise display the status/error message

	// Simple text rendering
	return (
		<div className='text-center py-2'>
			{" "}
			{/* Added some basic styling */}
			<Label>Current Block Number: {displayValue}</Label>
		</div>
	);
};

export default BlockNumberDisplay;
