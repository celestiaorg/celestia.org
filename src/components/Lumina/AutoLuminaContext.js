import { spawnNode } from "lumina-node";
import { createContext, useEffect, useRef, useState } from "react";

export const AutoLuminaContext = createContext(null);

export function AutoLuminaContextProvider({ children, shouldInitialize = true }) {
	const [lumina, setLumina] = useState(null);
	const initialized = useRef(false);
	const initializingRef = useRef(false);
	const [initError, setInitError] = useState(null);

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
				console.log("Lumina node initialized successfully");
			} catch (error) {
				console.error("Failed to initialize Lumina node:", error);
				setInitError(error.message || "Unknown initialization error");
			} finally {
				initializingRef.current = false;
			}
		};

		if (!initialized.current && shouldInitialize) {
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
	}, [shouldInitialize, lumina]);

	return (
		<AutoLuminaContext.Provider value={lumina}>
			{children}
			{initError && (
				<div hidden aria-hidden='true'>
					{/* Error: {initError} - hidden for debugging */}
				</div>
			)}
		</AutoLuminaContext.Provider>
	);
}
