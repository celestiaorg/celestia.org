"use client";

import { useState } from "react";
import CaseStudiesHero from "./CaseStudiesHero";
import CaseStudiesContent from "./CaseStudiesContent";
import CTASection from "./CTASection";

const CaseStudiesPageClient = () => {
	const [activeFilter, setActiveFilter] = useState("all");

	return (
		<>
			<CaseStudiesHero activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
			<CaseStudiesContent activeFilter={activeFilter} />
			<CTASection />
		</>
	);
};

export default CaseStudiesPageClient;
