// Shared data types for src/data/ content and SEO objects.

import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

/**
 * SEO metadata shape passed to the Meta() helper.
 * Mirrors the SeoInput interface in src/components/Meta/Meta.ts.
 */
export interface SeoData {
	title?: string;
	description?: string;
	image?: string;
	type?: OpenGraphType;
	publishedTime?: string | null;
	modifiedTime?: string | null;
	author?: string;
	tags?: string[];
	section?: string | null;
	twitterHandle?: string;
	canonical?: string;
	noindex?: boolean;
}
