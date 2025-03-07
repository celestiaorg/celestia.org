import { AutoLuminaContextProvider } from "./AutoLuminaContext";
import NodeStatus from "./NodeStatus";

const AutoConnectingLuminaNode = () => {
	return (
		<AutoLuminaContextProvider>
			<NodeStatus />
		</AutoLuminaContextProvider>
	);
};

export default AutoConnectingLuminaNode;
