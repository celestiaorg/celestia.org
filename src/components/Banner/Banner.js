"use client";

import { useBanner } from "@/context/BannerContext";
import { useScrollPosition } from "@/utils/scrollLock";
import { useLayoutEffect, useState } from "react";

export default function Banner({ showBanner = true }) {
	const { isBannerVisible, setIsBannerVisible, bannerRef } = useBanner();
	const { menuIsOpen } = useScrollPosition();
	const [isEdenButtonHovered, setIsEdenButtonHovered] = useState(false);

	// Update banner visibility based on prop
	useLayoutEffect(() => {
		setIsBannerVisible(showBanner);
	}, [showBanner, setIsBannerVisible]);

	if (!isBannerVisible || menuIsOpen) {
		return null;
	}

	return (
		<div
			className='relative overflow-hidden'
			ref={bannerRef}
			style={{
				animation: "slideDown 0.7s ease-out forwards",
			}}
		>
			{/* Background color */}
			<div className='absolute inset-0 bg-[#1D013D]' />
			{/* Background image with opacity */}
			<div
				className={`absolute inset-0 bg-[url('/images/components/banner/eden-image-2.jpg')] bg-cover bg-center transition-transform duration-700 ease-out ${
					isEdenButtonHovered ? "scale-110" : "scale-100"
				}`}
			/>
			{/* Content */}
			<div className='relative px-3 py-1 sm:px-6 lg:px-14'>
				<div className='flex flex-col justify-between gap-0 sm:gap-2 md:flex-row'>
					<div className='flex justify-between md:items-center gap-2'>
						<div className='flex items-center'>
							<p className='font-medium text-white text-[18px] sm:text-[18px] leading-5'>Celestia’s DeFi hub, Eden, is live!</p>
						</div>
						<button
							type='button'
							className='flex flex-col justify-center items-center p-1 gap-2 w-8 h-8 transition-all duration-200 transform rounded-[64px] md:hidden focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/20 hover:scale-110'
							style={{
								background: "rgba(0, 0, 0, 0.2)",
								backdropFilter: "blur(10px)",
								flex: "none",
								order: 1,
								flexGrow: 0,
							}}
							onClick={() => setIsBannerVisible(false)}
						>
							<span className='sr-only'>Dismiss</span>
							<svg
								className='w-4 h-4 text-white transition-colors duration-200 hover:text-gray-200'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>
					</div>
					<div className='flex order-3 w-auto gap-4 mr-10 sm:order-2 sm:w-auto'>
						<a
							href='http://eden.celestia.org/'
							className='group relative inline-block'
							onMouseEnter={() => setIsEdenButtonHovered(true)}
							onMouseLeave={() => setIsEdenButtonHovered(false)}
						>
							{/* Backdrop blur layer */}
							<div className='absolute inset-0 backdrop-blur-sm bg-white/10' />
							<div className='absolute inset-1 bg-black group-hover:bg-black/70 transition-all duration-[800ms]' />

							{/* Button content */}
							<div className='relative px-6 py-2.5 rounded-lg'>
								<div className='flex items-center justify-center w-full gap-2'>
									<span className='flex-shrink-0 text-white text-sm font-medium'>Enter Eden</span>
									{/* <svg
										className='flex-shrink-0 size-2.5 text-white'
										viewBox='0 0 10 10'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M1 1L9 1M9 1V9M9 1L1 9' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
									</svg> */}
								</div>
							</div>
						</a>
						<button
							type='button'
							className='absolute flex flex-col justify-center items-center p-1 gap-2 w-8 h-8 transition-all duration-200 transform -translate-y-1/2 rounded-[64px] right-10 top-1/2 max-md:hidden focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/20 hover:scale-110'
							style={{
								background: "rgba(0, 0, 0, 0.2)",
								backdropFilter: "blur(10px)",
								flex: "none",
								order: 1,
								flexGrow: 0,
							}}
							onClick={() => setIsBannerVisible(false)}
						>
							<span className='sr-only'>Dismiss</span>
							<svg
								className='w-4 h-4 text-white transition-colors duration-200 hover:text-gray-200'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
