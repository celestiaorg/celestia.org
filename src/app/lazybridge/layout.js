import LoadingScreen from "@/components/Loading/LoadingScreen";
import Nav from "@/components/Nav/Nav";
import { Suspense } from "react";

export const metadata = {
	title: "LazyBridge | Celestia",
	description:
		"LazyBridge: A unified blockchain solution enabling seamless cross-chain transactions, developer flexibility, and instant access to multi-chain assets and users.",
};

const LazyBridgeLayout = ({ children }) => {
	return (
		<>
			<Nav dark={true} />
			<main id={"main-content"}>
				<Suspense fallback={<LoadingScreen />}>{children}</Suspense>
			</main>
		</>
	);
};

export default LazyBridgeLayout;
