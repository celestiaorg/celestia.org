import { getPostsMetadata, getPostMetadata } from "@/lib/getPostsMetadata";
import Meta from "@/components/Meta/Meta";

// generateMetadata drives the <head> for each glossary slug.
// The layout (glossary/layout.tsx) renders all visible UI; this page returns null.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const metaData = await getPostMetadata("glossary", `${slug}.md`);

	return Meta(metaData);
}

export function generateStaticParams(): { slug: string }[] {
	const glossaryPages = getPostsMetadata("glossary");
	return glossaryPages.map((page) => ({ slug: page.slug }));
}

// The glossary layout provides all visible UI; this page component is intentionally empty.
export default function GlossaryPage() {
	return null;
}
