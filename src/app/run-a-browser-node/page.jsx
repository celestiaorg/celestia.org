"use client";

import AutoConnectingLuminaNode, { AutoLuminaContextProvider } from "@/components/Lumina/AutoConnectingLuminaNode";

const BrowserNodePage = () => {
	return (
		<div>
			<AutoLuminaContextProvider>
				<main className='min-h-screen bg-[#0A0A0B] text-white'>
					{/* Header */}
					<header className='w-full px-4 py-6 border-b border-gray-800'>
						<div className='max-w-4xl mx-auto'>
							<h1 className='mb-2 text-2xl font-bold'>Run a Browser Node</h1>
							<p className='text-gray-400'>Run a Celestia light node directly in your browser using Lumina</p>
						</div>
					</header>
					{/* Main content */}
					<div className='max-w-4xl p-4 mx-auto space-y-8'>
						{/* Node Status Section */}
						<section className='space-y-4'>
							<h2 className='text-xl font-semibold'>Node Status</h2>
							<div className='p-4 rounded-lg bg-[#1A191B]'>
								<AutoConnectingLuminaNode />
							</div>
						</section>
						{/* Information Section */}
						<section className='space-y-4'>
							<h2 className='text-xl font-semibold'>About Browser Nodes</h2>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
								<div className='p-4 rounded-lg bg-[#1A191B]'>
									<h3 className='text-lg font-medium mb-2 text-[#BF6FF5]'>What is a Browser Node?</h3>
									<p className='text-gray-400'>
										A browser node allows you to participate in Celestia&apos;s Data Availability Sampling directly from your web
										browser, without installing any software. It uses WebAssembly to run a light node implementation called
										Lumina.
									</p>
								</div>
								<div className='p-4 rounded-lg bg-[#1A191B]'>
									<h3 className='text-lg font-medium mb-2 text-[#BF6FF5]'>Status Indicators</h3>
									<ul className='space-y-2 text-gray-400'>
										<li>• Initializing: Node is starting up</li>
										<li>• Syncing: Fetching headers from the network</li>
										<li>• Verifying: Actively sampling data from blocks</li>
										<li>• Error: Something went wrong (check console)</li>
									</ul>
								</div>
							</div>
						</section>
						{/* Links Section */}
						<section className='space-y-4'>
							<h2 className='text-xl font-semibold'>Useful Links</h2>
							<div className='flex flex-wrap gap-4'>
								<a
									href='https://docs.celestia.org/'
									target='_blank'
									rel='noopener noreferrer'
									className='px-4 py-2 rounded-full bg-[#BF6FF5] hover:bg-[#A346E3] transition-colors'
								>
									Celestia Docs
								</a>
								<a
									href='https://github.com/eigerco/lumina'
									target='_blank'
									rel='noopener noreferrer'
									className='px-4 py-2 rounded-full bg-[#1A191B] hover:bg-[#2E2C31] transition-colors'
								>
									Lumina GitHub
								</a>
								<a
									href='https://celenium.io/'
									target='_blank'
									rel='noopener noreferrer'
									className='px-4 py-2 rounded-full bg-[#1A191B] hover:bg-[#2E2C31] transition-colors'
								>
									Celenium Explorer
								</a>
							</div>
						</section>
					</div>
				</main>
			</AutoLuminaContextProvider>
		</div>
	);
};

export default BrowserNodePage;
