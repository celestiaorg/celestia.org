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
					<div className='border-b md:border-b-0 md:border-r border-[#D3CED7] p-12 flex flex-col justify-between min-h-[280px]'>
						<Heading size='md' tag='h3' className='mb-4'>
							Confidential
						</Heading>
						<Body size='md' className='mt-auto'>
							Selectively disclose sensitive data (e.g user info, trading strategies)
						</Body>
					</div>

					<div className='border-b md:border-b-0 md:border-r border-[#D3CED7] p-12 flex flex-col justify-between min-h-[280px]'>
						<Heading size='md' tag='h3' className='mb-4'>
							Verifiable
						</Heading>
						<Body size='md' className='mt-auto'>
							Anchor Point provides verifiable claims on encrypted data without decrypting it.
						</Body>
					</div>

					<div className='p-12 flex flex-col justify-between min-h-[280px]'>
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
							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] border-b border-white/[0.16] py-8 px-6'>
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

							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] border-b border-white/[0.16]	 py-8 px-6'>
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

							<div className='grid grid-cols-1 md:grid-cols-[8fr_4fr] py-8 px-6'>
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

			<section id='how-it-works' className='py-16 lg:py-24 bg-[#F4F4F4]'>
				<Container size='lg'>
					<Row className='mb-10 sm:mb-20'>
						<Col width={100}>
							<Display size='sm' tag='h2' className='text-left md:text-center'>
								How it works
							</Display>
						</Col>
					</Row>
					<Row className='gap-10' align='center'>
						<Col width={50}>
							<Image
								src='/images/app/private-da/how-it-works-image.png'
								width={800}
								height={600}
								alt='Diagram of how private data availability works with Celestia'
								className='block w-full h-auto'
							/>
						</Col>
						<Col width={50}>
							<Heading size='md' tag='h3' className='mb-14 max-md:mt-10'>
								Explanations
							</Heading>
							<div>
								<div className='flex items-start gap-4 border-b border-gray-200 pb-6 mb-6'>
									<div className='flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-black flex-shrink-0'>
										1
									</div>
									<div>
										<Body size='lg' className='mb-2 font-medium !text-xl'>
											App sends input data
										</Body>
										<Body size='md' className='text-gray-600 ml-2'>
											The app submits data to be encrypted to the PDA proxy, using the same API as a regular Celestia node.
										</Body>
									</div>
								</div>

								<div className='flex items-start gap-4 border-b border-gray-200 pb-6 mb-6'>
									<div className='flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-black flex-shrink-0'>
										2
									</div>
									<div>
										<Body size='lg' className='mb-2 font-medium !text-xl'>
											FDA proxy verifiably encrypts the data
										</Body>
										<Body size='md' className='text-gray-600 ml-2'>
											The proxy generates a Verifiable Encryption (VE) of the data and a ZK proof to show it was done correctly.
										</Body>
									</div>
								</div>

								<div className='flex items-start gap-4 border-b border-gray-200 pb-6 mb-6'>
									<div className='flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-black flex-shrink-0'>
										3
									</div>
									<div>
										<Body size='lg' className='mb-2 font-medium !text-xl'>
											FDA proxy forwards to Celestia
										</Body>
										<Body size='md' className='text-gray-600 ml-2'>
											The VE blob is posted to Celestia’s DA layer.
										</Body>
									</div>
								</div>

								<div className='flex items-start gap-4 border-b border-gray-200 pb-6 mb-6'>
									<div className='flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-black flex-shrink-0'>
										4
									</div>
									<div>
										<Body size='lg' className='mb-2 font-medium !text-xl'>
											Anchors to protocols
										</Body>
										<Body size='md' className='text-gray-600 ml-2'>
											VE anchor points can be used to ensure protocols are operating on or require the encrypted data ,enforcing
											trustless but selectively disclosed operations.
										</Body>
									</div>
								</div>

								<div className='flex items-start gap-4 pb-6'>
									<div className='flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-black flex-shrink-0'>
										5
									</div>
									<div>
										<Body size='lg' className='mb-2 font-medium !text-xl'>
											Anyone can verify without decrypting
										</Body>
										<Body size='md' className='text-gray-600 ml-2'>
											Anyone—users, apps, chains—can validate that the encrypted data is consistent and correct without
											accessing the private data unless authorized.
										</Body>
									</div>
								</div>
							</div>
							<div className='flex mt-5'>
								<a
									href='https://docs.celestia.org'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex text-white relative bg-black px-4 py-2 rounded-full after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full'
								>
									<div className='inline-flex items-center justify-between w-full gap-2 group'>
										<span>Link to docs</span>
										<Icon
											Icon={<ArrowLongSVG dark />}
											hover
											HoverIcon={<ArrowLongSVG />}
											className='flex-grow-0'
											direction='up-right'
											border={false}
											size='sm'
											transparentBg
										/>
									</div>
								</a>
							</div>
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
