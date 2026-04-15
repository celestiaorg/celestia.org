"use client";

import { useState, useEffect } from "react";
import { useFooter } from "@/context/FooterContext";
import UseCasesHero from "@/components/UseCases/UseCasesHero";
import UseCasesContent from "@/components/UseCases/UseCasesContent";
import WhyCelestia from "@/components/UseCases/WhyCelestia";

const HASH_TO_TAB = {
	"agentic-use-cases": "agentic",
	"exchanges-use-cases": "exchanges",
	"experimental-use-cases": "experimental",
	agentic: "agentic",
	exchanges: "exchanges",
	experimental: "experimental",
};

const UseCasesPageClient = () => {
	const [activeTab, setActiveTab] = useState("agentic");
	const { setFooterTheme } = useFooter();

	// Set tab from URL hash on mount + on hash change
	useEffect(() => {
		const applyHash = () => {
			const hash = window.location.hash.replace(/^#/, "");
			const tab = HASH_TO_TAB[hash];
			if (tab) {
				setActiveTab(tab);
				// Wait for tab content to render, then override browser's native
				// hash scroll (which lands on the inner div below the headline)
				setTimeout(() => {
					const el = document.getElementById("use-cases-content");
					if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
				}, 300);
			}
		};
		applyHash();
		window.addEventListener("hashchange", applyHash);
		return () => window.removeEventListener("hashchange", applyHash);
	}, []);

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
