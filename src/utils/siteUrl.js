// Single source of truth for the site's absolute base URL.
//
// Used for canonical/OG/Twitter URLs (Meta) and sitemap entries. It deliberately
// ignores empty or local-development values (e.g. http://localhost:3000) so that
// production and preview deployments can NEVER emit localhost URLs in social-share
// tags or the sitemap, even if NEXT_PUBLIC_SITE_URL is misconfigured. Trailing
// slashes are stripped to avoid double slashes when concatenating paths.
const PRODUCTION_URL = "https://celestia.org";

export function getSiteUrl() {
	const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
	if (!raw || raw.includes("localhost") || raw.includes("127.0.0.1")) {
		return PRODUCTION_URL;
	}
	return raw.replace(/\/+$/, "");
}

export default getSiteUrl;
