"use client";

import { useState } from "react";
import UseCasesHero from "@/components/UseCases/UseCasesHero";
import UseCasesContent from "@/components/UseCases/UseCasesContent";
import WhyCelestia from "@/components/UseCases/WhyCelestia";

const UseCasesPageClient = () => {
	const [activeTab, setActiveTab] = useState("agentic");

	return (
		<>
			<UseCasesHero activeTab={activeTab} setActiveTab={setActiveTab} />
			<UseCasesContent activeTab={activeTab} setActiveTab={setActiveTab} />
			<WhyCelestia activeTab={activeTab} />
		</>
	);
};

export default UseCasesPageClient;
