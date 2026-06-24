import Meta from "@/components/Meta/Meta";
import seo from "@/data/glossary/seo";

export const metadata = Meta(seo);

// Page renders nothing — the glossary UI (hero + accordion) is provided by
// glossary/layout.tsx. A page.tsx is still required for the route to exist.
export default function Glossary() {
	return null;
}
