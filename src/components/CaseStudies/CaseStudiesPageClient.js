"use client";

import { useState } from "react";
import CaseStudiesHero from "./CaseStudiesHero";
import CaseStudiesContent from "./CaseStudiesContent";

const CaseStudiesPageClient = () => {
	const [activeFilter, setActiveFilter] = useState("all");

	return (
		<>
			<CaseStudiesHero activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
			<CaseStudiesContent activeFilter={activeFilter} />
		</>
	);
};

export default CaseStudiesPageClient;
