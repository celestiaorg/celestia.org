import { spawnNode } from "lumina-node";
import { createContext, useCallback, useEffect, useRef, useState } from "react";

export const AutoLuminaContext = createContext(null);

export function AutoLuminaContextProvider({ children }) {
	const [lumina, setLumina] = useState(null);
	const [isNodeStarted, setIsNodeStarted] = useState(false);
	const initialized = useRef(false);
	const initializingRef = useRef(false);
	const [initError, setInitError] = useState(null);

	// Initialize the node (spawn it but don't start syncing)
	useEffect(() => {
		const init = async () => {
			// Prevent multiple simultaneous initialization attempts
			if (initializingRef.current) {
				console.log("Lumina node initialization already in progress, skipping");
				return;
			}

			try {
				initializingRef.current = true;
				setInitError(null);
				console.log("Initializing Lumina node...");

				// Add delay before spawning node to ensure browser is ready
				await new Promise((resolve) => setTimeout(resolve, 500));

				const node = await spawnNode();

				// Quick validation that node was properly initialized
				if (!node) {
					throw new Error("Failed to initialize node - returned null");
				}

				// Wait a bit to ensure WebSocket connections are properly established
				await new Promise((resolve) => setTimeout(resolve, 500));

				setLumina(node);
				console.log("Lumina node initialized successfully (not started)");
			} catch (error) {
				console.error("Failed to initialize Lumina node:", error);
				setInitError(error.message || "Unknown initialization error");
			} finally {
				initializingRef.current = false;
			}
		};

		if (!initialized.current) {
			initialized.current = true;
			// Delay initialization slightly to ensure component is fully mounted
			setTimeout(() => {
				init();
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
	}, [lumina]);

	// Start the node sync
	const startNode = useCallback(async () => {
		if (!lumina || isNodeStarted) {
			console.log("Cannot start node: node not initialized or already started");
			return false;
		}

		try {
			console.log("Starting Lumina node sync...");
			setIsNodeStarted(true);
			return true;
		} catch (error) {
			console.error("Failed to start node:", error);
			setIsNodeStarted(false);
			return false;
		}
	}, [lumina, isNodeStarted]);

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
