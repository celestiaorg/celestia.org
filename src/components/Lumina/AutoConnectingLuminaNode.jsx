import { useState } from "react";
import { AutoLuminaContextProvider } from "./AutoLuminaContext";
import NodeStatus from "./NodeStatus";

const AutoConnectingLuminaNode = () => {
	const [shouldInitialize, setShouldInitialize] = useState(false);

	return (
		<AutoLuminaContextProvider shouldInitialize={shouldInitialize}>
			<NodeStatus onAnimationComplete={() => setShouldInitialize(true)} />
		</AutoLuminaContextProvider>
	);
};

export default AutoConnectingLuminaNode;
