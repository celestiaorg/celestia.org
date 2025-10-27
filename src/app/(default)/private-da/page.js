import PrimaryHero from "@/components/Heroes/PrimaryHero";
import Introduction from "@/components/Introduction/Introduction";
import { Heading, Display, Body } from "@/macros/Copy";
import ListSection from "@/components/List/Layout/ListSection";
import ListItem from "@/components/List/ListItem";
import { Row, Col } from "@/macros/Grids";
import Image from "next/image";
import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";
import meta from "@/components/Meta/Meta";
import Container from "@/components/Container/Container";
import { ANALYTICS_EVENTS } from "@/constants/analytics";
import BorderButton from "@/macros/Buttons/BorderButton";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

// SEO metadata
// const seo = {
// 	title: "Private Data with Celestia",
// 	description: "Learn how Celestia enables private data applications with public verifiability.",
// };
// export const metadata = meta(seo);

const Step = ({ number, title, children }) => (
	<div className='flex items-start gap-4 mb-8'>
		<div className='flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-full bg-blue-500 flex-shrink-0'>{number}</div>
		<div>
			<Heading tag='h3' size='sm' className='mb-2'>
				{title}
			</Heading>
			<Body size='md'>{children}</Body>
		</div>
	</div>
);

export default function PrivateDAPage() {
	return (
		<>
			<PrimaryHero
				headline={`Verifiable encryption`}
				subheadline={<span className='max-w-[550px] block'>Post privately. Prove publicly.</span>}
				buttons={[]}
				videos={{
					src: {
						xl: "/videos/hero/ecosystem-desktop_xl.mp4",
						lg: "/videos/hero/ecosystem-desktop_lg.mp4",
						sm: "/videos/hero/ecosystem-mobile_sm.mp4",
					},
					poster: {
						lg: "/videos/hero/ecosystem-desktop_xl_poster.jpg",
						sm: "/videos/hero/ecosystem-mobile_sm_poster.jpg",
					},
				}}
				fadedVideo={true}
			/>

			<section className='py-[120px]'>
				<Container size='lg'>
					<Row>
						<Col width={100}>
							<div>
								<Body className='!leading-relaxed !text-xl sm:!text-2xl 2xl:!text-[32px]'>
									<span className='font-medium text-[#9747FF]'>Celestia’s Private Data Availability</span> service lets applications
									publish encrypted data to Celestia—while still proving that the data is valid, available, and exactly what it
									claims to be.
								</Body>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section>
				<div className='grid grid-cols-1 md:grid-cols-3 border-y 2xl:border border-[#D3CED7] max-w-[1600px] mx-auto'>
					<div className='border-b md:border-b-0 md:border-r border-[#D3CED7] px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[210px] sm:min-h-[280px]'>
						<Heading size='md' tag='h3' className='mb-4'>
							Confidential
						</Heading>
						<Body size='md' className='mt-auto'>
							Selectively disclose sensitive data (e.g user info, trading strategies)
						</Body>
					</div>

					<div className='border-b md:border-b-0 md:border-r border-[#D3CED7] px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[210px] sm:min-h-[280px]'>
						<Heading size='md' tag='h3' className='mb-4'>
							Verifiable
						</Heading>
						<Body size='md' className='mt-auto'>
							Anchor Point provides verifiable claims on encrypted data without decrypting it.
						</Body>
					</div>

					<div className='px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[210px] sm:min-h-[280px]'>
						<Heading size='md' tag='h3' className='mb-4'>
							Scalable
						</Heading>
						<Body size='md' className='mt-auto'>
							Leverage Celestia&apos;s battle tested high throughput DA layer.
						</Body>
					</div>
				</div>
			</section>

			<section className='py-16 lg:py-24 relative overflow-hidden' style={{ position: "relative" }}>
				<Image
					src='/images/app/private-da/logo-image-gradient.png'
					alt='Use'
					aria-hidden='true'
					width={1766}
					height={1766}
					style={{
						position: "absolute",
						width: "1766px",
						height: "1766px",
						left: "-85px",
						top: "-101px",
						zIndex: -2,
						pointerEvents: "none",
						userSelect: "none",
					}}
				/>
				<div className='absolute inset-0 bg-[#111317] opacity-38 -z-[3]'></div>
				<Container size='lg' style={{ zIndex: 2, position: "relative" }}>
					<Row className='mb-12'>
						<Col width={100}>
							<Display size='sm' tag='h2' className='text-white'>
								Use cases
							</Display>
						</Col>
					</Row>
					<Row>
						<Col width={100}>
							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] border-b border-white/[0.16] py-8 sm:px-6'>
								<div>
									<Heading size='sm' tag='h3' className='max-w-[512px] mb-4 md:mb-0 text-white'>
										Private orderbooks
									</Heading>
								</div>
								<div>
									<Body size='md' className='max-w-[400px] text-white'>
										Selectively disclose sensitive data (e.g.user info, trading strategies)
									</Body>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] border-b border-white/[0.16] py-8 sm:px-6'>
								<div>
									<Heading size='sm' tag='h3' className='max-w-[512px] mb-4 md:mb-0 text-white'>
										Verifiable backups
									</Heading>
								</div>
								<div>
									<Body size='md' className='max-w-[400px] text-white'>
										Anchor Point provides verifiable claims on encrypted data without decrypting it.
									</Body>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] py-8 sm:px-6'>
								<div>
									<Heading size='sm' tag='h3' className='max-w-[512px] mb-4 md:mb-0 text-white'>
										Confidential voting
									</Heading>
								</div>
								<div>
									<Body size='md' className='max-w-[400px] text-white'>
										Leverage Celestia&apos;s battle tested high throughput DA layer.
									</Body>
								</div>
							</div>

							{/* <div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] border-b border-gray-200 py-8 px-6'>
								<div>
									<Heading size='sm' tag='h3' className='max-w-[512px] mb-4 md:mb-0'>
										Obfuscated computation
									</Heading>
								</div>
								<div>
									<Body size='md' className='text-gray-600 max-w-[400px]'>
										Leverage Celestia&apos;s battle tested high throughput DA layer.
									</Body>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] border-b border-gray-200 py-8 px-6'>
								<div>
									<Heading size='sm' tag='h3' className='max-w-[512px] mb-4 md:mb-0'>
										Private mempools
									</Heading>
								</div>
								<div>
									<Body size='md' className='text-gray-600 max-w-[400px]'>
										Leverage Celestia&apos;s battle tested high throughput DA layer.
									</Body>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] border-b border-gray-200 py-8 px-6'>
								<div>
									<Heading size='sm' tag='h3' className='max-w-[512px] mb-4 md:mb-0'>
										Decentralized, Guaranteed Encrypted Message Delivery
									</Heading>
								</div>
								<div>
									<Body size='md' className='text-gray-600 max-w-[400px]'>
										Leverage Celestia&apos;s battle tested high throughput DA layer.
									</Body>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] py-8 px-6'>
								<div>
									<Heading size='sm' tag='h3' className='max-w-[512px] mb-4 md:mb-0'>
										Decentralized Auditing, Arbitration, and Adjudication with Complete Data
									</Heading>
								</div>
								<div>
									<Body size='md' className='text-gray-600 max-w-[400px]'>
										Leverage Celestia&apos;s battle tested high throughput DA layer.
									</Body>
								</div>
							</div> */}
						</Col>
					</Row>
				</Container>
			</section>

			<section id='how-it-works' className='pt-20 pb-12 lg:py-24 bg-[#F4F4F4]'>
				<Container size='lg'>
					<Row className='flex flex-col lg:flex-row items-center justify-between gap-12'>
						<Col width={50} className='pr-8'>
							<h2 className='font-youth text-[32px] sm:text-[42px] lg:text-[54px] leading-[1.073171] mb-6'>
								Private account balances when trading with Hibachi
							</h2>
							<p className='text-lg sm:text-xl leading-7 sm:leading-8 lg:max-w-[509px]'>
								Private DA allows Hibachi to maintain a private exchange for traders without leaking sensitive information, such as
								account balances, in the event they need to exit their funds.
							</p>
						</Col>
						<Col width={50} className='lg:max-w-[512px]'>
							<Image
								src='/images/app/private-da/private_account.png'
								alt='Private account balances when trading with Hibachi'
								width={1176}
								height={660}
								className='rounded-lg'
							/>
						</Col>
					</Row>
				</Container>
			</section>

			<section className='pt-5 pb-16 lg:pt-5 lg:pb-24 bg-[#F4F4F4]'>
				<Container size='lg'>
					<Row>
						<Col width={100}>
							<div className='relative w-full' style={{ paddingBottom: "56.25%" }}>
								<iframe
									className='absolute top-0 left-0 w-full h-full rounded-2xl'
									src='https://www.youtube.com/embed/dQw4w9WgXcQ'
									title='Private Data Availability Demo'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
