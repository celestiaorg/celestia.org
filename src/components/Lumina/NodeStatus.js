"use client";
import LuminaCheckmarkSVG from "@/macros/SVGs/LuminaCheckmarkSVG";
import LuminaDiagonalArrowSVG from "@/macros/SVGs/LuminaDiagonalArrowSVG";
import LuminaErrorSVG from "@/macros/SVGs/LuminaErrorSVG";
import LuminaGradientCircleSVG from "@/macros/SVGs/LuminaGradientCircleSVG";
import { useEffect, useState } from "react";
import { useLuminaNode } from "./hooks/useLuminaNode";

const NodeStatus = () => {
	const { status, blockNumber, error, isConnected } = useLuminaNode();
	const [fakeProgress, setFakeProgress] = useState(0);

	useEffect(() => {
		let intervalId;

		if (status === "syncing") {
			// Reset progress when syncing starts
			setFakeProgress(0);

			// Increment progress every 100ms
			intervalId = setInterval(() => {
				setFakeProgress((prev) => {
					// Slowly increase up to 99%
					if (prev < 99) {
						// Faster at start, slower as it progresses
						const increment = Math.max(1, Math.floor((100 - prev) / 20));
						return Math.min(99, prev + increment);
					}
					return prev;
				});
			}, 100);
		} else if (status === "connected") {
			// Jump to 100% when connected
			setFakeProgress(100);
		} else {
			// Reset progress for other states
			setFakeProgress(0);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [status]);

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

	const getStatusText = () => {
		if (error) return `Error: ${error}`;
		if (status === "initializing") return "Initializing connection";
		if (status === "syncing") return "Synchronising Light Node";
		if (status === "connected") return "Verifying block number";
		return "Initializing connection";
	};

	const getLoadingPercentage = () => {
		if (status === "syncing" || status === "connected") {
			return `${fakeProgress}`;
		}
		return "0";
	};

	return (
		<div className='flex items-center justify-between gap-5 h-[44px] w-fit max-w-[600px] bg-[#1A191B] rounded-full pl-[9px] pr-1 py-1 text-white'>
			<div className='flex items-center gap-3'>
				{getStatusIcon()}
				<span className='text-base font-normal leading-6 text-white text-nowrap'>{getStatusText()}</span>
			</div>

			<div className='flex items-center'>
				{blockNumber && <span className='text-[#BF6FF5] text-base font-medium mr-4 leading-5'>{parseInt(blockNumber).toLocaleString()}</span>}
				{!blockNumber && <span className='text-[#BF6FF5] text-base font-medium mr-4 leading-5'>{getLoadingPercentage()}%</span>}

				{isConnected && blockNumber && (
					<a
						href={`https://celenium.io/block/${blockNumber}`}
						target='_blank'
						rel='noopener noreferrer'
						className='group relative flex items-center justify-center rounded-full transform transition-colors duration-200 size-[36px] bg-[#2E2C31] hover:bg-[#3E3C41] overflow-hidden'
						aria-label='View block details'
					>
						<div className='absolute top-0 left-0 w-full h-full transition-transform'>
							<div className='absolute top-0 left-0 w-full h-full transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full'>
								<div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
									<LuminaDiagonalArrowSVG />
								</div>
								<div className='absolute flex items-center justify-center w-full h-full top-full right-full'>
									<LuminaDiagonalArrowSVG />
								</div>
							</div>
						</div>
					</a>
				)}
			</div>
		</div>
	);
};

export default NodeStatus;
