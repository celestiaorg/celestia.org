import IgniteClient from "./IgniteClient";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/ignite/seo";

export const metadata = Meta(seo);

export default async function Ignite() {
	return <IgniteClient />;
}
