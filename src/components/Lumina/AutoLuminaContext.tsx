import { spawnNode } from "lumina-node";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { requestPersistentStorage } from "@/utils/persistentStorage";

export const AutoLuminaContext = createContext(null);

export function AutoLuminaContextProvider({ children, shouldInitialize = false }) {
	const [lumina, setLumina] = useState(null);
	const [isNodeStarted, setIsNodeStarted] = useState(false);
	const initialized = useRef(false);
	const initializingRef = useRef(false);
	const [initError, setInitError] = useState(null);
	const [storagePermission, setStoragePermission] = useState(null);

	// Initialize the node only when shouldInitialize is true (lazy initialization)
	const initializeNode = useCallback(async () => {
		// Prevent multiple simultaneous initialization attempts
		if (initializingRef.current || lumina) {
			console.log("Lumina node initialization already in progress or completed, skipping");
			return lumina;
		}

		try {
			initializingRef.current = true;
			setInitError(null);
			console.log("Initializing Lumina node...");

			// Request storage permission first
			console.log("Requesting persistent storage permission...");
			const storageResult = await requestPersistentStorage();
			setStoragePermission(storageResult);

			if (!storageResult.granted) {
				console.warn("Storage permission not granted:", storageResult.message);
				// Continue anyway - user was warned about potential data loss
			}

			// Add delay before spawning node to ensure browser is ready
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Polyfill Storage API if not available to prevent lumina-node errors
			if (typeof navigator !== "undefined" && !navigator.storage) {
				console.log("Storage API not available, adding polyfill for lumina-node compatibility");
				navigator.storage = {
					persist: async () => {
						console.warn("Storage API persist() called but not supported in this browser");
						return false;
					},
					persisted: async () => {
						console.warn("Storage API persisted() called but not supported in this browser");
						return false;
					},
					estimate: async () => {
						console.warn("Storage API estimate() called but not supported in this browser");
						return { usage: 0, quota: 0 };
					},
				};
			}

			let node;
			try {
				node = await spawnNode();
			} catch (spawnError) {
				// Handle specific storage-related errors from lumina-node
				if (spawnError.message && spawnError.message.includes("storage")) {
					console.warn("Storage-related error in lumina-node:", spawnError.message);
					throw new Error("Storage API not supported in this browser. Please use a modern browser with storage support.");
				}
				// Re-throw other errors
				throw spawnError;
			}

			// Quick validation that node was properly initialized
			if (!node) {
				throw new Error("Failed to initialize node - returned null");
			}

			// Wait a bit to ensure WebSocket connections are properly established
			await new Promise((resolve) => setTimeout(resolve, 500));

			setLumina(node);
			console.log("Lumina node initialized successfully (not started)");
			return node;
		} catch (error) {
			console.error("Failed to initialize Lumina node:", error);
			setInitError(error.message || "Unknown initialization error");
			throw error;
		} finally {
			initializingRef.current = false;
		}
	}, [lumina]);

	// Only initialize when shouldInitialize prop is true
	useEffect(() => {
		if (shouldInitialize && !initialized.current && !lumina) {
			initialized.current = true;
			// Delay initialization slightly to ensure component is fully mounted
			setTimeout(() => {
				initializeNode().catch(console.error);
			}, 1000);
		}

		// Cleanup function to prevent memory leaks
		return () => {
			// Only attempt cleanup if we successfully initialized
			if (lumina) {
				console.log("Cleaning up Lumina node...");
				// Any necessary cleanup for the node
			}
		};
	}, [shouldInitialize, lumina, initializeNode]);

	// Start the node sync - initialize if needed
	const startNode = useCallback(async () => {
		try {
			// Initialize node if not already done
			let nodeInstance = lumina;
			if (!nodeInstance) {
				console.log("Node not initialized, initializing now...");
				nodeInstance = await initializeNode();
			}

			if (!nodeInstance || isNodeStarted) {
				console.log("Cannot start node: initialization failed or already started");
				return false;
			}

			console.log("Starting Lumina node sync...");
			setIsNodeStarted(true);
			return true;
		} catch (error) {
			console.error("Failed to start node:", error);
			setIsNodeStarted(false);
			return false;
		}
	}, [lumina, isNodeStarted, initializeNode]);

	// Stop the node sync
	const stopNode = useCallback(async () => {
		if (!lumina || !isNodeStarted) {
			console.log("Cannot stop node: node not initialized or not started");
			return false;
		}

		try {
			console.log("Stopping Lumina node sync...");
			// Note: The lumina-node library doesn't seem to have a stop method
			// So we'll just mark it as stopped and let the hook handle cleanup
			setIsNodeStarted(false);
			return true;
		} catch (error) {
			console.error("Failed to stop node:", error);
			return false;
		}
	}, [lumina, isNodeStarted]);

	const contextValue = {
		node: lumina,
		isNodeStarted,
		startNode,
		stopNode,
		initError,
		storagePermission,
		initializeNode,
	};

	return (
		<AutoLuminaContext.Provider value={contextValue}>
			{children}
			{initError && (
				<div hidden aria-hidden='true'>
					{/* Error: {initError} - hidden for debugging */}
				</div>
			)}
		</AutoLuminaContext.Provider>
	);
}
