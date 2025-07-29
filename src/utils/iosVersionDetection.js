/**
 * Detects iOS version and determines if WebAssembly is fully supported
 * Returns true if iOS 16+ or not iOS, false if iOS < 16
 */
export const isWebAssemblySupported = () => {
	// Check if we're in a browser environment
	if (typeof window === "undefined") {
		return true; // SSR - assume supported
	}

	// Check if WebAssembly is available at all
	if (typeof WebAssembly === "undefined") {
		return false;
	}

	// Detect iOS version
	const userAgent = window.navigator.userAgent;

	// Check if it's iOS (iPhone, iPad, iPod)
	const isIOS = /iPad|iPhone|iPod/.test(userAgent);

	if (!isIOS) {
		// Not iOS - assume WebAssembly is supported on other modern browsers
		return true;
	}

	// Extract iOS version for iOS devices
	const iosVersionMatch = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);

	if (!iosVersionMatch) {
		// Couldn't parse iOS version - assume not supported for safety
		return false;
	}

	const majorVersion = parseInt(iosVersionMatch[1], 10);

	// iOS 16+ has full WebAssembly support
	return majorVersion >= 16;
};

/**
 * Gets the detected iOS version for debugging purposes
 */
export const getIOSVersion = () => {
	if (typeof window === "undefined") {
		return "SSR";
	}

	const userAgent = window.navigator.userAgent;
	const isIOS = /iPad|iPhone|iPod/.test(userAgent);

	if (!isIOS) {
		return "Not iOS";
	}

	const iosVersionMatch = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);

	if (!iosVersionMatch) {
		return "Unknown iOS";
	}

	const major = iosVersionMatch[1];
	const minor = iosVersionMatch[2];
	const patch = iosVersionMatch[3] || "0";

	return `iOS ${major}.${minor}.${patch}`;
};
