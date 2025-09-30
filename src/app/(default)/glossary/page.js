import Meta from "@/components/Meta/Meta";
import seo from "@/data/glossary/seo";

export const metadata = Meta(seo);

export default async function Glossary({ children }) {
	return children;
}
