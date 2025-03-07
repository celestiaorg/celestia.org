import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";

// TODO: Add a loading state --> @/components/Lumina/LuminaGradientCircleSVG.js
// TODO: Add a error state --> @/components/Lumina/LuminaErrorSVG.js
// TODO: Add a success state --> @/components/Lumina/LuminaCheckmarkSVG.js

const NodeStatus = ({ status = "Verifying", blockNumber = "3,543,543", loadingPercentage = "", url }) => {
	return (
		<div className='flex items-center justify-between gap-5 w-full max-w-[600px] bg-[#1A191B] rounded-full pl-[9px] pr-1 text-white'>
			<div className='flex items-center gap-3'>
				<LuminaCheckmarkSVG />
				<span className='text-base font-normal leading-5 text-white text-nowrap'>{status} block number</span>
			</div>

			<div className='flex items-center'>
				{blockNumber && <span className='text-[#BF6FF5] text-base font-medium mr-4 leading-5'>{blockNumber?.toLocaleString()}</span>}
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
