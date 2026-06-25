"use client";

import { useState, useEffect } from "react";
import { useFooter } from "@/context/FooterContext";
import ApplicationsHero from "@/components/Applications/ApplicationsHero";
import ApplicationsContent from "@/components/Applications/ApplicationsContent";
import WhyCelestia from "@/components/Applications/WhyCelestia";

// Hash anchors keep the prototype's "-use-cases" ids so existing deep links
// (homepage cards, external refs) continue to work after the route rename.
const HASH_TO_TAB = {
	"agentic-use-cases": "agentic",
	"exchanges-use-cases": "exchanges",
	"experimental-use-cases": "novel",
	agentic: "agentic",
	exchanges: "exchanges",
	experimental: "novel",
	novel: "novel",
};

const ApplicationsPageClient = () => {
	const [activeTab, setActiveTab] = useState("agentic");
	// FooterContext is JS — cast to the actual runtime signature (setState-like).
	const { setFooterTheme } = useFooter() as { setFooterTheme: (theme: string | null) => void };

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
					const el = document.getElementById("applications-content");
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
			<ApplicationsHero activeTab={activeTab} setActiveTab={setActiveTab} />
			<ApplicationsContent activeTab={activeTab} />
			<WhyCelestia activeTab={activeTab} />
		</>
	);
};

export default ApplicationsPageClient;
