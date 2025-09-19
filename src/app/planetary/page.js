import { Row, Col } from "@/macros/Grids";
import Container from "@/components/Container/Container";
import Image from "next/image";
import PlanetaryClient from "./PlanetaryClient";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/mammoth/seo";

export const metadata = Meta(seo);

export default async function Mammoth() {
	return <PlanetaryClient />;
}
