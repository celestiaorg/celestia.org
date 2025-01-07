"use client";

import { useBanner } from "@/context/BannerContext";
import TertiaryButton from "@/macros/Buttons/TertiaryButton";
import { useScrollPosition } from "@/utils/scrollLock";

export default function Banner() {
	const { isBannerVisible, setIsBannerVisible } = useBanner();
	const { menuIsOpen } = useScrollPosition();

	if (!isBannerVisible || menuIsOpen) return null;

	return (
		<div className='relative'>
			{/* Background color */}
			<div className='absolute inset-0 bg-[#1D013D]' />
			{/* Background image with opacity */}
			<div className="absolute inset-0 bg-[url('/images/components/banner/mamothon-image.jpg')] bg-cover bg-center opacity-30" />
			{/* Content */}
			<div className='relative px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<div className='flex flex-wrap items-center justify-between'>
					<div className='flex items-center flex-1 w-0'>
						<p className='ml-3 font-medium text-white '>
							<span className='md:hidden'>
								<span className='mr-4 text-white'>It&apos;s time to go bigger!</span>
								<br />
								<span className='text-[#D7B9FF] mr-2'>Mammothon global hackathon begins</span>
								<br />
								<span className='mr-2 text-white'>February 1</span>
							</span>
							<span className='hidden md:inline'>
								<span className='mr-4 text-white'>It&apos;s time to go bigger!</span>{" "}
								<span className='text-[#D7B9FF]'>Mammothon global hackathon begins</span>{" "}
								<span className='mr-2 text-white'>February 1</span>
							</span>
						</p>
					</div>
					<div className='flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto'>
						<TertiaryButton href='https://mammothon.celestia.org/' size='md'>
							<div className='flex items-center justify-center w-full gap-2'>
								<span>Visit Mammoth</span>
								<svg
									className='size-2.5 text-black transition-all duration-200 group-hover:text-[#00FFFF]'
									viewBox='0 0 10 10'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M1 1L9 1M9 1V9M9 1L1 9' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' />
								</svg>
							</div>
						</TertiaryButton>
					</div>
					<div className='flex-shrink-0 order-2 sm:order-3 sm:ml-3'>
						<button
							type='button'
							className='flex p-2 -mr-1 transition-all duration-200 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2'
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
