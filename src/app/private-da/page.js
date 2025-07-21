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
				<Image
					src='/images/app/private-da/logo-image.png'
					alt='Use'
					aria-hidden='true'
					width={1500}
					height={1500}
					style={{
						position: "absolute",
						width: "1500px",
						height: "1500px",
						right: "-423px",
						top: "-594px",
						zIndex: -1,
						pointerEvents: "none",
						userSelect: "none",
						opacity: 0.38,
						mixBlendMode: "color-dodge",
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

			<section>
				<Container size='lg'>
					<Row className='mb-12 mt-32'>
						<Col width={100}>
							<Display size='sm' tag='h2'>
								Why it matters
							</Display>
						</Col>
					</Row>
				</Container>
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

			<section id='how-it-works' className='py-16 lg:py-24 bg-[#F4F4F4]'>
				<Container size='lg'>
					<Row className='mb-10 sm:mb-20'>
						<Col width={100}>
							<Display size='sm' tag='h2' className='text-center'>
								How it works
							</Display>
						</Col>
					</Row>
					<Row align='center' className='justify-center'>
						<Col width={100} className='flex justify-center'>
							<Image
								src='/images/app/private-da/protocol-operator-po.png'
								width={800}
								height={600}
								alt='Diagram of how private data availability works with Celestia'
								className='block w-full h-auto max-w-[800px]'
							/>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
