"use client";
import { AutoLuminaContextProvider } from "./AutoLuminaContext";
import NodeStatus from "./NodeStatus";

const DynamicLuminaNode = ({ shouldInitialize, onAnimationComplete }) => {
	return (
		<AutoLuminaContextProvider shouldInitialize={shouldInitialize}>
			<NodeStatus onAnimationComplete={onAnimationComplete} />
		</AutoLuminaContextProvider>
	);
};

export default DynamicLuminaNode;
