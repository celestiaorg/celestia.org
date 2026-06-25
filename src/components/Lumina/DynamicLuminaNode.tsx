"use client";
import { AutoLuminaContextProvider } from "./AutoLuminaContext";
import NodeStatus from "./NodeStatus";

interface DynamicLuminaNodeProps {
	shouldInitialize: boolean;
	onAnimationComplete?: () => void;
}

const DynamicLuminaNode = ({ shouldInitialize, onAnimationComplete }: DynamicLuminaNodeProps) => {
	return (
		<AutoLuminaContextProvider shouldInitialize={shouldInitialize}>
			<NodeStatus onAnimationComplete={onAnimationComplete} />
		</AutoLuminaContextProvider>
	);
};

export default DynamicLuminaNode;
