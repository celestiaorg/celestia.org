"use client";

import { useBanner } from "@/context/BannerContext";
import TertiaryButton from "@/macros/Buttons/TertiaryButton";
import { useScrollPosition } from "@/utils/scrollLock";

export default function Banner() {
	const { isBannerVisible, setIsBannerVisible, bannerRef } = useBanner();
	const { menuIsOpen } = useScrollPosition();

	if (!isBannerVisible || menuIsOpen) {
		return null;
	}

	return (
		<div className='relative' ref={bannerRef}>
			{/* Background color */}
			<div className='absolute inset-0 bg-[#1D013D]' />
			{/* Background image with opacity */}
			<div className="absolute inset-0 bg-[url('/images/components/banner/mamothon-image.jpg')] bg-cover bg-center" />
			{/* Content */}
			<div className='relative px-3 py-3 sm:px-6 lg:px-8'>
				<div className='flex flex-col justify-center gap-3 md:flex-row'>
					<div className='flex justify-between md:items-center'>
						<div className='flex items-center'>
							<p className='font-medium text-white'>
								<span className='sm:hidden'>
									<span className='mr-4 text-white text-[15px]'>Time to go bigger!</span>
									<br />
									<span className='text-white mr-2 text-[15px]'>Mammothon global hackathon ends Feb 28</span>
								</span>
								<span className='hidden sm:inline'>
									<span className='text-white'>Time to go bigger!</span>{" "}
									<span className='text-white'>Mammothon global hackathon ends</span>{" "}
									<span className='text-white'>February 28</span>
								</span>
							</p>
						</div>
						<button
							type='button'
							className='flex p-2 -mt-1 -mr-1 transition-all duration-200 rounded-md h-fit md:hidden hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2'
							onClick={() => setIsBannerVisible(false)}
						>
							<span className='sr-only'>Dismiss</span>
							<svg
								className='w-6 h-6 text-white'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>
					</div>
					<div className='flex order-3 w-auto gap-4 mt-2 sm:order-2 sm:mt-0 sm:w-auto'>
						<TertiaryButton href='https://mammothon.celestia.org/' size='md'>
							<div className='flex items-center justify-center w-full gap-2'>
								<span className='flex-shrink-0'>Register Now</span>
								<svg
									className='flex-shrink-0 size-2.5 text-black transition-all duration-200 group-hover:text-[#00FFFF]'
									viewBox='0 0 10 10'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M1 1L9 1M9 1V9M9 1L1 9' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
								</svg>
							</div>
						</TertiaryButton>
						<button
							type='button'
							className='absolute flex p-2 -mr-1 transition-all duration-200 transform -translate-y-1/2 rounded-md right-6 top-1/2 h-fit max-md:hidden hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2'
							onClick={() => setIsBannerVisible(false)}
						>
							<span className='sr-only'>Dismiss</span>
							<svg
								className='w-6 h-6 text-white'
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
