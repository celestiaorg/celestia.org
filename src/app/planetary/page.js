import { Row, Col } from "@/macros/Grids";
import Container from "@/components/Container/Container";
import Image from "next/image";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/mammoth/seo";

export const metadata = Meta(seo);

export default async function Mammoth() {
	return (
		<div className='bg-black min-h-screen'>
			{/* Hero Section - Just the image */}
			<section className='relative overflow-hidden aspect-square md:aspect-[13/6]'>
				<Image
					src='/images/app/mammoth/mammoth-hero.jpg'
					alt='Mammoth Hero Background'
					width={1920}
					height={1080}
					className='w-full h-full object-cover object-bottom'
					priority
				/>
			</section>

			{/* Main Content Section */}
			<section
				className='pb-24 lg:pb-32'
				style={{
					background: "linear-gradient(to top, #1E014D 0%, #040215 100%)",
				}}
			>
				<Container size={"lg"}>
					<Row>
						<Col width={100}>
							{/* Date and Location Row */}
							<div className='flex flex-row gap-3 sm:gap-10 mb-3 lg:mb-4 justify-center'>
								<div className='flex items-center gap-3 justify-center'>
									<p className='text-white font-medium text-sm sm:text-xl'>NOVEMBER 19TH</p>
								</div>
								<div className='flex items-center gap-3 justify-center'>
									<p className='text-white font-medium text-sm sm:text-xl'>BUENOS AIRES</p>
								</div>
							</div>

							{/* Large Heading */}
							<h1
								className='mb-12 lg:mb-16 uppercase font-druk text-[#8AF4FF] text-[28vw] sm:text-[120px] md:text-[140px] lg:text-[260px] leading-[0.9] text-center'
								style={{ textShadow: "0 0 0px #8AF4FF, 0 0 5px #8AF4FF" }}
							>
								PLANETARY
							</h1>

							{/* Tickets Button */}
							<div className='mb-16 lg:mb-20 flex justify-center'>
								<div className='relative overflow-hidden px-6 py-2 bg-[#9A34C2] text-white font-medium text-xl rounded-[36px] uppercase'>
									<span className='font-druk uppercase text-4xl sm:text-5xl relative z-1 text-[#8AF4FF]'>TICKETS SOON</span>
								</div>
							</div>

							{/* Paragraph Content */}
							<p className='font-normal text-center text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[0px] mb-8 sm:mb-16 text-white'>
								<span className='text-[#CB44FF] font-medium'>Introducing the first edition of Planetary</span> — a Celestia global
								event series celebrating builders and unstoppable apps, now landing in Buenos Aires. Planetary travels to new cities
								around the world, bringing together communities to explore the future of what&apos;s possible onchain with mammoth
								throughput and Celestia underneath.
							</p>
							<p className='font-normal text-center text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[0px] text-white'>
								A recent shift from Modular Summit to Planetary, a refreshed brand that better reflects Celestia&apos;s long-term
								vision. Planetary builds on the strong foundation of past events while evolving into a more intimate, future-focused
								gathering.
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Image Gallery Section */}
			<section
				className='relative'
				style={{
					background: "linear-gradient(to bottom, #1E014D 0%, #040215 100%)",
				}}
			>
				<Container size={"lg"}>
					<Row>
						<Col width={100}>
							<h1 className='mb-8 sm:mb-12 font-youth font-normal text-center text-[32px] leading-[40px] sm:text-[46px] sm:leading-[55px] text-[#8AF4FF]'>
								Last Year Modular Summit, This Year Planetary
							</h1>
						</Col>
					</Row>
				</Container>
				<div className='max-w-[1680px] mx-auto px-2 relative'>
					{/* Gradient overlay */}
					<div
						className='absolute bottom-0 left-0 w-full h-[323px] pointer-events-none z-10'
						style={{
							background:
								"linear-gradient(360deg, #040215 5.42%, rgba(4, 2, 21, 0.9) 20.62%, rgba(4, 2, 21, 0.7) 33.66%, rgba(4, 2, 21, 0) 69.97%)",
						}}
					></div>
					<div className='grid grid-cols-2 md:grid-cols-3 grid-rows-11 gap-3 h-[1200px] w-full'>
						<div className='col-span-1 row-span-4 bg-gray-200 rounded-lg overflow-hidden'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-1.jpg'
								alt='Silhouettes viewing Modular Summit 3.0 map'
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-6 bg-gray-200 rounded-lg overflow-hidden'>
							<div>{/* eslint-disable-next-line @next/next/no-img-element */}</div>
							<img
								src='/images/app/mammoth/image-2.jpg'
								alt='Large conference hall with networking crowd'
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-4 bg-gray-200 rounded-lg overflow-hidden'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-3.jpg'
								alt='Panel discussion with microphone'
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-7 bg-gray-200 rounded-lg overflow-hidden'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-5.jpg'
								alt='Tech conference panel with speakers on stage'
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-3 bg-gray-200 rounded-lg overflow-hidden'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-5.jpg'
								alt='Sovereign Radio podcast recording at Modular Summit'
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-6 sm:row-span-5 bg-gray-200 rounded-lg overflow-hidden'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-6.jpg'
								alt='Development workspace with multiple monitors and code'
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-4 bg-gray-200 rounded-lg overflow-hidden'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-7.jpg'
								alt='Conference stage with camera equipment'
								className='w-full h-full object-cover'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Sign up section */}
			<section className='pt-16 pb-32 lg:pb-48 lg:pt-40 max-w-[1680px] mx-auto px-2 relative overflow-hidden'>
				{/* Background Image */}
				<Image
					src='/images/app/mammoth/mammoth-footer.jpg'
					alt='Mammoth Footer Background'
					fill
					className='object-cover object-top'
					sizes='100vw'
				/>
				{/* Gradient Overlay */}
				<div className='absolute inset-x-0 top-0 h-[100px] bg-gradient-to-t from-transparent to-[#040215]' />

				<div className='flex flex-col sm:flex-row items-center justify-between gap-6 sm:px-20 max-w-[1230px] mx-auto relative z-10'>
					<div>
						<h2 className='font-youth font-normal text-[28px] leading-[36px] flex items-center text-[#8AF4FF] sm:text-[40px] sm:leading-[48px]'>
							Sign up for Planetary
						</h2>
					</div>
					<button className='bg-[#8AF4FF] hover:bg-[#6ee8f5] transition-colors duration-200 flex items-center gap-3 px-8 py-4 rounded-full group'>
						<span className='font-medium text-black'>REGISTER</span>
						<svg
							width='14'
							height='14'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='transition-transform duration-200 group-hover:translate-x-2'
						>
							<path d='M1 1H11M11 1V11M11 1L1 11' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
						</svg>
					</button>
				</div>
			</section>
		</div>
	);
}
