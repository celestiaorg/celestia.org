import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";
import LuminaErrorSVG from "@/macros/SVGs/LuminaErrorSVG";
import LuminaGradientCircleSVG from "@/macros/SVGs/LuminaGradientCircleSVG";
import { useLuminaNode } from "./hooks/useLuminaNode";

const NodeStatus = () => {
	const { status, blockNumber, error, isConnected } = useLuminaNode();

	const getStatusIcon = () => {
		switch (status) {
			case "initializing":
			case "syncing":
				return <LuminaGradientCircleSVG />;
			case "error":
				return <LuminaErrorSVG />;
			case "connected":
				return <LuminaCheckmarkSVG />;
			default:
				return <LuminaGradientCircleSVG />;
		}
	};

	const getLoadingPercentage = () => {
		if (status === "syncing") return "0";
		return "";
	};

	return (
		<div className='flex items-center justify-between gap-5 w-full max-w-[600px] bg-[#1A191B] rounded-full pl-[9px] pr-1 text-white'>
			<div className='flex items-center gap-3'>
				{getStatusIcon()}
				<span className='text-base font-normal leading-5 text-white text-nowrap'>{error ? `Error: ${error}` : `${status} block number`}</span>
			</div>

			<div className='flex items-center'>
				{blockNumber && <span className='text-[#BF6FF5] text-base font-medium mr-4 leading-5'>{parseInt(blockNumber).toLocaleString()}</span>}
				{getLoadingPercentage() && <span className='text-[#BF6FF5] text-base font-medium mr-4 leading-5'>{getLoadingPercentage()}%</span>}

				{isConnected && blockNumber && (
					<a
						href={`https://celenium.io/block/${blockNumber}`}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center'
						aria-label='View block details'
					>
						<LuminaDiagonalArrowSVG />
					</a>
				)}
			</div>
		</div>
	);
};

export default NodeStatus;
