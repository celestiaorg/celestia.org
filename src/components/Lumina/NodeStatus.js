import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";
import LuminaErrorSVG from "@/macros/SVGs/LuminaErrorSVG";
import LuminaGradientCircleSVG from "@/macros/SVGs/LuminaGradientCircleSVG";

// TODO: Add a loading state --> @/components/Lumina/LuminaGradientCircleSVG.js
// TODO: Add a error state --> @/components/Lumina/LuminaErrorSVG.js
// TODO: Add a success state --> @/components/Lumina/LuminaCheckmarkSVG.js

const NodeStatus = ({ status = "Verifying", blockNumber = "", loadingPercentage = "", url, error }) => {
	const getStatusIcon = () => {
		switch (status) {
			case "Initializing":
			case "Syncing":
				return <LuminaGradientCircleSVG />;
			case "Error":
				return <LuminaErrorSVG />;
			case "Verifying":
				return <LuminaCheckmarkSVG />;
			default:
				return <LuminaGradientCircleSVG />;
		}
	};

	return (
		<div className='flex items-center justify-between gap-5 w-full max-w-[600px] bg-[#1A191B] rounded-full pl-[9px] pr-1 text-white'>
			<div className='flex items-center gap-3'>
				{getStatusIcon()}
				<span className='text-base font-normal leading-5 text-white text-nowrap'>{error ? `Error: ${error}` : `${status} block number`}</span>
			</div>

			<div className='flex items-center'>
				{blockNumber && <span className='text-[#BF6FF5] text-base font-medium mr-4 leading-5'>{parseInt(blockNumber).toLocaleString()}</span>}
				{loadingPercentage && <span className='text-[#BF6FF5] text-base font-medium mr-4 leading-5'>{loadingPercentage}%</span>}

				{url && (
					<a
						href={url}
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
