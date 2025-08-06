import Meta from "@/components/Meta/Meta";
import seo from "@/data/home/seo";
import HomeClient from "@/components/HomeClient";

export const metadata = Meta(seo);

export default function Home() {
	return <HomeClient />;
}
