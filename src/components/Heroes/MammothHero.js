"use client";
import Container from "@/components/Container/Container";
import { useBanner } from "@/context/BannerContext";
import { Body, Display } from "@/macros/Copy";
import Image from "next/image";

const MammothHero = ({ title, subtitle }) => {
	const { isBannerVisible, bannerHeight } = useBanner();

	return (
		<section className={`relative flex flex-col border-b border-black overflow-hidden min-h-screen md:min-h-[70vh] lg:min-h-[800px]`}>
			<div className='absolute inset-0 z-0'>
				<Image
					src='/images/app/mammoth/mammoth-hero.jpg'
					alt='Mammoth Hero Background'
					fill
					className='object-cover object-right-bottom   sm:object-center'
					priority
				/>
				{/* Gradient overlay: black → black 50% → transparent */}
				<div
					className='absolute inset-0 sm:hidden'
					style={{
						background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0) 80%)",
					}}
				></div>
			</div>

			<Container size={`lg`} className='relative z-10 flex-1 flex items-end lg:items-center'>
				<div className='flex flex-col w-full'>
					<div className='flex flex-col'>
						<div className={"w-full"}>
							<h1 className='mb-6 font-youth sm:mb-8 text-white text-[18vw] sm:text-5xl md:text-6xl lg:text-[114px]'>{title}</h1>

							{/* Event Details */}
							<div className='flex flex-col sm:flex-row gap-3 sm:gap-10 mb-8 sm:mb-10'>
								<div className='flex items-center gap-3'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 20 21'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										className='flex-shrink-0'
									>
										<path
											d='M6.66667 2.16663V5.49996M13.3333 2.16663V5.49996M2.5 8.83329H17.5M4.16667 3.83329H15.8333C16.7538 3.83329 17.5 4.57948 17.5 5.49996V17.1666C17.5 18.0871 16.7538 18.8333 15.8333 18.8333H4.16667C3.24619 18.8333 2.5 18.0871 2.5 17.1666V5.49996C2.5 4.57948 3.24619 3.83329 4.16667 3.83329Z'
											stroke='white'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									<p className='text-white font-medium text-lg sm:text-xl'>NOVEMBER 19TH</p>
								</div>
								<div className='flex items-center gap-3'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 20 21'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										className='flex-shrink-0'
									>
										<path
											d='M16.6654 8.83329C16.6654 12.9941 12.0495 17.3275 10.4995 18.6658C10.3551 18.7744 10.1794 18.8331 9.9987 18.8331C9.81803 18.8331 9.64226 18.7744 9.49786 18.6658C7.94786 17.3275 3.33203 12.9941 3.33203 8.83329C3.33203 7.06518 4.03441 5.36949 5.28465 4.11925C6.53489 2.86901 8.23059 2.16663 9.9987 2.16663C11.7668 2.16663 13.4625 2.86901 14.7127 4.11925C15.963 5.36949 16.6654 7.06518 16.6654 8.83329Z'
											stroke='white'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M9.9987 11.3333C11.3794 11.3333 12.4987 10.214 12.4987 8.83329C12.4987 7.45258 11.3794 6.33329 9.9987 6.33329C8.61799 6.33329 7.4987 7.45258 7.4987 8.83329C7.4987 10.214 8.61799 11.3333 9.9987 11.3333Z'
											stroke='white'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									<p className='text-white font-medium text-lg sm:text-xl'>BUENOS AIRES</p>
								</div>
							</div>

							{subtitle && (
								<Body size='md' className={"mb-10 text-white"}>
									{subtitle}
								</Body>
							)}
							{/* Custom Tickets Button */}
							<div className='mt-16 mb-20 sm:mt-12 md:mt-16 lg:mt-[198px]'>
								<button className='relative overflow-hidden px-4 sm:px-8 py-3.5 sm:py-5 bg-[#9747FF] hover:bg-purple-700 text-white font-medium text-lg sm:text-xl rounded-[36px] uppercase w-full sm:w-auto group transition-colors duration-200'>
									<span className='relative z-10'>Tickets Soon</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default MammothHero;
