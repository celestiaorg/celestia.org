import MammothHero from "@/components/Heroes/MammothHero";
import { Row, Col } from "@/macros/Grids";
import Container from "@/components/Container/Container";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/mammoth/seo";

export const metadata = Meta(seo);

export default async function Mammoth() {
	return (
		<>
			<MammothHero title={"Planetary"} />
			<section className='pt-20 lg:pt-24 pb-24 lg:pb-32'>
				<Container size={"lg"}>
					<Row>
						<Col width={100}>
							<p className='font-normal text-[24px] leading-[36px] lg:text-[32px] lg:leading-[48px] tracking-[0px] mb-8 sm:mb-16'>
								<span className='text-[#9746FF] font-medium'>Introducing the next edition of Mammoth</span> — a Celestia global event
								series celebrating builders and unstoppable apps, now landing in Buenos Aires. Mammoth travels to new cities around
								the world, bringing together communities to explore the future of what&apos;s possible onchain with mammoth throughput
								and Celestia underneath.
							</p>
							<p className='font-normal text-[24px] leading-[36px] lg:text-[32px] lg:leading-[48px] tracking-[0px]'>
								As part of the Devconnect week, Mammoth continues its journey in Buenos Aires — showcasing teams, their stories, and
								the breakthroughs unlocked by modular infrastructure.
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			<section className='relative'>
				<Container size={"lg"}>
					<Row>
						<Col width={100}>
							<h1 className='mb-8 sm:mb-12 font-youth font-normal text-[32px] leading-[40px] sm:text-[46px] sm:leading-[55px] text-[#17141A]'>
								Last Year Modular Summit, This Year Mammoth
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
								"linear-gradient(360deg, #17141A 5.42%, rgba(23, 20, 26, 0.9) 20.62%, rgba(23, 20, 26, 0.7) 33.66%, rgba(23, 20, 26, 0) 69.97%)",
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

				{/* View Full Gallery Button - Floating above grid and gradient */}
				<div className='absolute bottom-20 left-0 right-0 z-20 w-full max-w-[1680px] mx-auto flex justify-center'>
					<button className='bg-[#9747FF] hover:bg-[#8a3ee8] transition-colors duration-200 flex items-center gap-3 px-6 py-4 rounded-3xl'>
						<span className='font-medium text-xs text-white uppercase tracking-wider'>View Full Gallery of events</span>
					</button>
				</div>
			</section>

			{/* Sign up section */}
			<section className='bg-[#17141A] pt-16 pb-32 lg:pb-32 lg:pt-24 max-w-[1680px] mx-auto px-2 relative'>
				<div className='flex flex-col sm:flex-row items-center justify-between gap-6 sm:px-20 max-w-[1230px] mx-auto'>
					<div className='text-white'>
						<h2 className='font-youth font-normal text-[28px] leading-[36px] flex items-center text-white sm:text-[40px] sm:leading-[48px]'>
							Sign up for Planatery
						</h2>
					</div>
					<button className='bg-white hover:bg-gray-200 transition-colors duration-200 flex items-center gap-3 px-8 py-4 rounded-full group'>
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
		</>
	);
}
