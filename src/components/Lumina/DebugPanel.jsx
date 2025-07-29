"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Tooltip component
const Tooltip = ({ children, text }) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div className='relative inline-block' onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
			{children}
			<AnimatePresence>
				{isVisible && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 5 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 5 }}
						transition={{ duration: 0.15 }}
						className='absolute right-full -top-2 mr-5 z-[10000] bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-gray-600 max-w-xs whitespace-normal'
						style={{ minWidth: "200px" }}
					>
						<div className='absolute top-2.5 -right-1.5 w-3 h-3 bg-gray-900 border-r border-b border-gray-600 transform -rotate-45'></div>
						{text}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const DebugPanel = ({
	status,
	blockNumber,
	syncProgress,
	actualSyncProgress,
	connectedPeers,
	syncInfo,
	networkHead,
	storedRanges,
	lastEventTime,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const formatTime = (timestamp) => {
		if (!timestamp) return "Never";
		const diff = Date.now() - timestamp;
		return diff < 1000 ? "Just now" : `${Math.floor(diff / 1000)}s ago`;
	};

	const formatRanges = (ranges) => {
		if (!ranges || !ranges.length) return "None";
		return ranges.map((r) => `${r.start}-${r.end}`).join(", ");
	};

	return (
		<>
			{/* Debug Toggle Button */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				onClick={() => setIsOpen(!isOpen)}
				className='fixed top-20 sm:top-5 right-4 z-[9999] bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-3 rounded-full shadow-xl transition-all border-2 border-purple-400'
				style={{
					minWidth: "80px",
					fontWeight: "bold",
				}}
			>
				Debug {isOpen ? "×" : "→"}
			</motion.button>

			{/* Debug Panel */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, x: 400 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 400 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className='fixed top-32 sm:top-20 right-4 z-[60] bg-black/90 backdrop-blur-sm text-white text-xs p-4 rounded-lg shadow-2xl w-56 max-w-[calc(100vw-2rem)] border border-gray-700'
					>
						<h3 className='text-sm font-bold mb-3 text-purple-400'>Lumina Node Debug</h3>

						<div className='space-y-2'>
							<div className='flex justify-between'>
								<Tooltip text='Connection status: idle → initializing → syncing → connected'>
									<span className='text-gray-400 cursor-help border-b border-dotted border-gray-500'>Status:</span>
								</Tooltip>
								<span
									className={`font-mono ${
										status === "connected"
											? "text-green-400"
											: status === "syncing"
											? "text-yellow-400"
											: status === "error"
											? "text-red-400"
											: "text-gray-400"
									}`}
								>
									{status}
								</span>
							</div>

							<div className='flex justify-between'>
								<Tooltip text="Your node's current block height. Increases as you sync new blocks.">
									<span className='text-gray-400 cursor-help border-b border-dotted border-gray-500'>Block Height:</span>
								</Tooltip>
								<span className='font-mono text-purple-400'>{blockNumber ? parseInt(blockNumber).toLocaleString() : "None"}</span>
							</div>

							<div className='flex justify-between'>
								<Tooltip text='Latest block on the network. Your height should catch up to this.'>
									<span className='text-gray-400 cursor-help border-b border-dotted border-gray-500'>Network Head:</span>
								</Tooltip>
								<span className='font-mono text-blue-400'>{networkHead ? parseInt(networkHead).toLocaleString() : "Unknown"}</span>
							</div>

							<div className='flex justify-between'>
								<Tooltip text="Actual sync progress. Shows how much recent data you've downloaded.">
									<span className='text-gray-400 cursor-help border-b border-dotted border-gray-500'>Sync Progress:</span>
								</Tooltip>
								<span className='font-mono text-green-400'>{actualSyncProgress.toFixed(2)}%</span>
							</div>

							<div className='flex justify-between'>
								<Tooltip text='Smoothed progress for UI display. May lag slightly behind actual progress.'>
									<span className='text-gray-400 cursor-help border-b border-dotted border-gray-500'>Display Progress:</span>
								</Tooltip>
								<span className='font-mono text-yellow-400'>{syncProgress.toFixed(2)}%</span>
							</div>

							<div className='flex justify-between'>
								<Tooltip text='Connected peer nodes. Should be > 0 for healthy sync.'>
									<span className='text-gray-400 cursor-help border-b border-dotted border-gray-500'>Connected Peers:</span>
								</Tooltip>
								<span className='font-mono text-cyan-400'>{connectedPeers?.length || 0}</span>
							</div>

							<div className='flex justify-between'>
								<Tooltip text='Last sync activity. Should show recent times during active sync.'>
									<span className='text-gray-400 cursor-help border-b border-dotted border-gray-500'>Last Event:</span>
								</Tooltip>
								<span className='font-mono text-orange-400'>{formatTime(lastEventTime)}</span>
							</div>

							{storedRanges && storedRanges.length > 0 && (
								<div className='pt-2 border-t border-gray-700'>
									<Tooltip text='Block ranges stored locally. Shows which blocks your node has saved.'>
										<div className='text-gray-400 mb-1 cursor-help border-b border-dotted border-gray-500 inline-block'>
											Stored Ranges:
										</div>
									</Tooltip>
									<div className='font-mono text-xs text-gray-300 break-all max-h-20 overflow-y-auto'>
										{formatRanges(storedRanges)}
									</div>
								</div>
							)}

							{syncInfo && (
								<div className='pt-2 border-t border-gray-700'>
									<Tooltip text='Total blocks in sync window (~30 days of network history).'>
										<div className='text-gray-400 mb-1 cursor-help border-b border-dotted border-gray-500 inline-block'>
											Sync Window:
										</div>
									</Tooltip>
									<div className='font-mono text-xs text-gray-300'>
										~{Math.floor((30 * 24 * 60 * 60) / 12).toLocaleString()} headers
									</div>
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default DebugPanel;
