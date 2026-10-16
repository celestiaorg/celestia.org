import type { MetadataRoute } from "next";
import { getPostsMetadata } from "@/lib/getPostsMetadata";
import { getSiteUrl } from "@/utils/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
	const paths = [
		"/",
		"/about/",
		"/applications/",
		"/brand/",
		"/build-with-us/",
		"/careers/",
		"/case-studies/",
		"/community/",
		"/contact/",
		"/ecosystem/",
		"/get-started/",
		"/glossary/",
		"/past-events/",
		"/press/",
		"/privacy/",
		"/private-blockspace/",
		"/run-a-light-node/",
		"/tos/",
		"/what-is-celestia/",
		"/what-is-da/",
		"/what-is-tia/",
		"/learn/",
		"/learn/beginners/modular-blockchains-and-first-principles/",
		"/learn/beginners/modular-blockchains-are-user-first/",
		"/learn/beginners/modular-blockchains-for-beginners/",
		"/learn/beginners/the-modular-stack/",
		"/learn/intermediates/benefits-of-modular-blockchains/",
		"/learn/intermediates/modular-and-monolithic-blockchains/",
		"/learn/intermediates/settlement-in-the-modular-stack/",
		"/learn/intermediates/sovereign-rollups-an-introduction/",
		"/learn/intermediates/sovereign-rollups-misconceptions/",
		"/learn/intermediates/the-differences-of-modular-software/",
		"/learn/intermediates/the-modular-stack/",
		...getPostsMetadata("glossary").map(({ slug }) => `/glossary/${slug}/`),
	];

	return paths.map((path) => ({ url: `${getSiteUrl()}${path}` }));
}
