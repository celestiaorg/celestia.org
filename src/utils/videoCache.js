// Simple global video cache that fetches each URL once and returns a blob URL
// Works across component re-renders and duplicated elements

const globalCache = typeof window !== "undefined" ? (window.__videoCache ||= {}) : {};

export async function getCachedVideoBlobUrl(originalUrl) {
	if (typeof window === "undefined") return originalUrl;
	if (!originalUrl) return originalUrl;

	// Return existing in-flight promise or resolved blob URL
	if (globalCache[originalUrl]) return await globalCache[originalUrl];

	globalCache[originalUrl] = (async () => {
		try {
			// Use fetch with Range disabled to force a single download; allow server 206
			const res = await fetch(originalUrl, { cache: "force-cache" });
			if (!res.ok) throw new Error(`Failed to fetch video: ${originalUrl}`);
			const blob = await res.blob();
			const blobUrl = URL.createObjectURL(blob);
			return blobUrl;
		} catch {
			// On failure, fall back to original URL
			return originalUrl;
		}
	})();

	return await globalCache[originalUrl];
}

export function revokeCachedVideoBlobUrl(originalUrl) {
	if (typeof window === "undefined") return;
	const entry = globalCache[originalUrl];
	// We only revoke if the entry resolved to a blob URL string
	Promise.resolve(entry).then((val) => {
		if (typeof val === "string" && val.startsWith("blob:")) {
			try {
				URL.revokeObjectURL(val);
			} catch {}
		}
	});
	delete globalCache[originalUrl];
}

export function warmVideoCache(urls) {
	if (!Array.isArray(urls)) return;
	for (const url of urls) {
		void getCachedVideoBlobUrl(url);
	}
}

// Helper to determine if current viewport is mobile
export function isMobileViewport() {
	if (typeof window === "undefined") return false;
	return window.innerWidth < 768;
}

// Warm cache for videos based on viewport size
export function warmVideosCacheByViewport(items) {
	if (typeof window === "undefined" || !Array.isArray(items)) return;

	const isMobile = isMobileViewport();
	const urls = items
		.filter((item) => item.videoUrl || item.mobileVideoUrl)
		.map((item) => {
			// Select appropriate video for viewport
			if (isMobile && item.mobileVideoUrl) {
				return item.mobileVideoUrl;
			}
			return item.videoUrl;
		})
		.filter(Boolean);

	warmVideoCache(urls);
}

// Temporary function to clear cache for testing
export function clearVideoCache() {
	if (typeof window === "undefined") return;
	// Revoke all blob URLs to free memory
	Object.values(globalCache).forEach((entry) => {
		Promise.resolve(entry).then((val) => {
			if (typeof val === "string" && val.startsWith("blob:")) {
				try {
					URL.revokeObjectURL(val);
				} catch {}
			}
		});
	});
	// Clear the cache
	Object.keys(globalCache).forEach((key) => delete globalCache[key]);
	console.log("Video cache cleared!");
}
