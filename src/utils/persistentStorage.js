/**
 * Persistent Storage Utility for Celestia Light Node
 * Handles storage permissions and provides graceful fallbacks
 */

/**
 * Check if persistent storage API is supported
 */
export const isPersistentStorageSupported = () => {
	try {
		return typeof navigator !== "undefined" && "storage" in navigator && navigator.storage !== null && "persist" in navigator.storage;
	} catch (error) {
		console.warn("Error checking storage API support:", error);
		return false;
	}
};

/**
 * Check if persistent storage is already granted
 */
export const isPersistentStorageGranted = async () => {
	if (!isPersistentStorageSupported()) {
		return false;
	}

	try {
		return await navigator.storage.persisted();
	} catch (error) {
		console.warn("Error checking persistent storage status:", error);
		return false;
	}
};

/**
 * Request persistent storage permission with user context
 * Only call this when user explicitly starts the light node
 */
export const requestPersistentStorage = async () => {
	if (!isPersistentStorageSupported()) {
		console.warn("Persistent storage not supported in this browser");
		return {
			granted: false,
			reason: "not_supported",
			message: "Persistent storage is not supported in this browser. Sync data may be lost when storage is full.",
		};
	}

	try {
		// Check if already granted
		const alreadyGranted = await navigator.storage.persisted();
		if (alreadyGranted) {
			console.log("Persistent storage already granted");
			return {
				granted: true,
				reason: "already_granted",
				message: "Persistent storage is already enabled.",
			};
		}

		// Request permission
		console.log("Requesting persistent storage permission...");
		const granted = await navigator.storage.persist();

		if (granted) {
			console.log("Persistent storage permission granted");
			return {
				granted: true,
				reason: "user_granted",
				message: "Persistent storage enabled. Your sync data will be protected.",
			};
		} else {
			console.warn("Persistent storage permission denied");
			return {
				granted: false,
				reason: "user_denied",
				message:
					"Persistent storage denied. Sync data may be lost when browser storage is full. You can continue, but may need to re-sync if data is cleared.",
			};
		}
	} catch (error) {
		console.error("Error requesting persistent storage:", error);
		return {
			granted: false,
			reason: "error",
			message: `Error requesting storage permission: ${error.message}. Continuing without persistent storage.`,
		};
	}
};

/**
 * Get estimated storage usage and quota
 */
export const getStorageEstimate = async () => {
	if (typeof navigator === "undefined" || !("storage" in navigator) || !navigator.storage || !("estimate" in navigator.storage)) {
		return null;
	}

	try {
		const estimate = await navigator.storage.estimate();
		return {
			usage: estimate.usage || 0,
			quota: estimate.quota || 0,
			usageInMB: Math.round((estimate.usage || 0) / (1024 * 1024)),
			quotaInMB: Math.round((estimate.quota || 0) / (1024 * 1024)),
			usagePercentage: estimate.quota ? Math.round(((estimate.usage || 0) / estimate.quota) * 100) : 0,
		};
	} catch (error) {
		console.warn("Error getting storage estimate:", error);
		return null;
	}
};

/**
 * Storage requirements for Celestia Light Node
 */
export const CELESTIA_STORAGE_REQUIREMENTS = {
	// Minimum recommended storage for light node (in MB)
	minimumMB: 100 * 1024, // 100GB
	// Typical storage usage for testnet (in MB)
	testnetTypicalMB: 6 * 1024, // 6GB
	// Description for user
	description:
		"Celestia Light Node requires persistent storage for blockchain sync data. This ensures your sync progress is not lost when browser storage is under pressure.",
};

/**
 * Check if there's enough storage space available
 */
export const checkStorageSpace = async () => {
	const estimate = await getStorageEstimate();
	if (!estimate) {
		return {
			hasEnoughSpace: null,
			message: "Unable to check storage space",
		};
	}

	const availableSpaceMB = estimate.quotaInMB - estimate.usageInMB;
	const hasEnoughSpace = availableSpaceMB >= CELESTIA_STORAGE_REQUIREMENTS.testnetTypicalMB;

	return {
		hasEnoughSpace,
		availableSpaceMB,
		usedSpaceMB: estimate.usageInMB,
		totalSpaceMB: estimate.quotaInMB,
		message: hasEnoughSpace
			? `Available storage: ${availableSpaceMB}MB (sufficient for light node)`
			: `Warning: Only ${availableSpaceMB}MB available. Light node may need ${CELESTIA_STORAGE_REQUIREMENTS.testnetTypicalMB}MB or more.`,
	};
};
