"use client";

import { useState, useEffect } from "react";
import { useFooter } from "@/context/FooterContext";
import UseCasesHero from "@/components/UseCases/UseCasesHero";
import UseCasesContent from "@/components/UseCases/UseCasesContent";
import WhyCelestia from "@/components/UseCases/WhyCelestia";

const UseCasesPageClient = () => {
	const [activeTab, setActiveTab] = useState("agentic");
	const { setFooterTheme } = useFooter();

	// Sync footer theme with active tab
	useEffect(() => {
		setFooterTheme(activeTab);
		return () => setFooterTheme(null);
	}, [activeTab, setFooterTheme]);

	return (
		<>
			<UseCasesHero activeTab={activeTab} setActiveTab={setActiveTab} />
			<UseCasesContent activeTab={activeTab} />
			<WhyCelestia activeTab={activeTab} />
		</>
	);
};

export default UseCasesPageClient;
