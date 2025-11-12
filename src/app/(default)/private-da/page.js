import PrimaryHero from "@/components/Heroes/PrimaryHero";
// import Introduction from "@/components/Introduction/Introduction";
import { Display, Body } from "@/macros/Copy";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
// import ListSection from "@/components/List/Layout/ListSection";
// import ListItem from "@/components/List/ListItem";
import { Row, Col } from "@/macros/Grids";
import Image from "next/image";
// import VerticalTitleCard from "@/components/Cards/VerticalTitleCards/VerticalTitleCard";
// import meta from "@/components/Meta/Meta";
import Container from "@/components/Container/Container";
// import { ANALYTICS_EVENTS } from "@/constants/analytics";
// import BorderButton from "@/macros/Buttons/BorderButton";
// import Icon from "@/macros/Icons/Icon";
// import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

// SEO metadata
// const seo = {
// 	title: "Private Data with Celestia",
// 	description: "Learn how Celestia enables private data applications with public verifiability.",
// };
// export const metadata = meta(seo);

// const Step = ({ number, title, children }) => (
// 	<div className='flex items-start gap-4 mb-8'>
// 		<div className='flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-full bg-blue-500 flex-shrink-0'>{number}</div>
// 		<div>
// 			<Heading tag='h3' size='sm' className='mb-2'>
// 				{title}
// 			</Heading>
// 			<Body size='md'>{children}</Body>
// 		</div>
// 	</div>
// );

export default function PrivateDAPage() {
	const WalletIcon = () => (
		<svg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M25.3889 20.0556H25.4067M7.61111 7.61111H28.9444C29.8874 7.61111 30.7918 7.98571 31.4586 8.65251C32.1254 9.31931 32.5 10.2237 32.5 11.1667V28.9444C32.5 29.8874 32.1254 30.7918 31.4586 31.4586C30.7918 32.1254 29.8874 32.5 28.9444 32.5H4.05556C3.11256 32.5 2.20819 32.1254 1.5414 31.4586C0.874602 30.7918 0.5 29.8874 0.5 28.9444V4.05556C0.5 3.11256 0.874602 2.20819 1.5414 1.5414C2.20819 0.874602 3.11256 0.5 4.05556 0.5H28.9444'
				stroke='white'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);

	const BubblesIcon = () => (
		<svg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M8.82 20.98C9.66869 20.98 10.4826 21.3171 11.0827 21.9173C11.6829 22.5174 12.02 23.3313 12.02 24.18M32.5 10.9C32.5 13.9928 29.9928 16.5 26.9 16.5C23.8072 16.5 21.3 13.9928 21.3 10.9C21.3 7.80721 23.8072 5.3 26.9 5.3C29.9928 5.3 32.5 7.80721 32.5 10.9ZM18.1 23.7C18.1 28.5601 14.1601 32.5 9.3 32.5C4.43989 32.5 0.5 28.5601 0.5 23.7C0.5 18.8399 4.43989 14.9 9.3 14.9C14.1601 14.9 18.1 18.8399 18.1 23.7ZM13.3 4.5C13.3 6.70914 11.5091 8.5 9.3 8.5C7.09086 8.5 5.3 6.70914 5.3 4.5C5.3 2.29086 7.09086 0.5 9.3 0.5C11.5091 0.5 13.3 2.29086 13.3 4.5Z'
				stroke='white'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);

	const GlobeIcon = () => (
		<svg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' focusable='false'>
			<path
				d='M22.3976 21.3C21.5079 25.5078 19.466 29.3855 16.5 32.5C12.3916 28.1862 10.1 22.4572 10.1 16.5C10.1 10.5428 12.3916 4.81385 16.5 0.5C13.543 0.500771 10.644 1.32098 8.12495 2.86957C5.60586 4.41816 3.5652 6.63456 2.2295 9.2727C0.893804 11.9109 0.315318 14.8675 0.558267 17.8146C0.801215 20.7616 1.85609 23.5836 3.6058 25.9674C5.3555 28.3512 7.73157 30.2035 10.4703 31.3186C13.2089 32.4338 16.2031 32.7682 19.1203 32.2847C22.0375 31.8012 24.7637 30.5187 26.9962 28.5797C29.2286 26.6406 30.8801 24.1208 31.7672 21.3M0.5 16.5H14.1M29.3 6.9V3.7C29.3 2.85131 28.9629 2.03737 28.3627 1.43726C27.7626 0.837142 26.9487 0.5 26.1 0.5C25.2513 0.5 24.4374 0.837142 23.8373 1.43726C23.2371 2.03737 22.9 2.85131 22.9 3.7V6.9M21.3 6.9H30.9C31.7837 6.9 32.5 7.61635 32.5 8.5V13.3C32.5 14.1837 31.7837 14.9 30.9 14.9H21.3C20.4163 14.9 19.7 14.1837 19.7 13.3V8.5C19.7 7.61635 20.4163 6.9 21.3 6.9Z'
				stroke='white'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);

	return (
		<>
			<PrimaryHero
				headline={`Private DA`}
				subheadline={<span className='max-w-[550px] block'>Confidential and compliance-friendly DeFi.</span>}
				buttons={[
					{
						text: "Start building",
						url: "https://github.com/celestiaorg/pda-proxy",
						iconDirection: "down-right",
					},
				]}
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

			<section className='py-[80px] sm:py-[104px] relative overflow-hidden bg-[#0E0504]' style={{ position: "relative" }}>
				{/* <section className='py-16 lg:py-24 relative overflow-hidden' style={{ position: "relative" }}> */}
				<Image
					src='/images/app/private-da/logo-image-gradient.png'
					className='absolute z-0 left-0 bottom-0 w-auto max-sm:h-[1000px] sm:w-full select-none pointer-events-none'
					alt='Use'
					aria-hidden='true'
					width={1680}
					height={1218}
				/>
				<div className='absolute inset-0 bg-[#111317] opacity-38 -z-[3]'></div>

				<Container size='lg' className='pb-20 px-6 md:px-10 relative z-[1]'>
					<Row>
						<Col width={100}>
							<div>
								<Body className='font-youth font-normal not-italic text-[40px] leading-[56px] tracking-[-0.0425em] text-left'>
									<span
										style={{
											background: "linear-gradient(102.41deg, #BA84FF 6.53%, #FF35CC 90.05%)",
											WebkitBackgroundClip: "text",
											WebkitTextFillColor: "transparent",
											backgroundClip: "text",
											color: "transparent",
										}}
									>
										Celestia’s Private Data Availability service lets applications publish encrypted data to Celestia—while still
										proving that the data is valid, available, and exactly what it claims to be.
									</span>
								</Body>
							</div>
						</Col>
					</Row>
				</Container>

				<Container size='lg' className='relative z-[1] pb-[100px] sm:pb-[120px]'>
					<div className='grid grid-cols-1 md:grid-cols-3 border rounded-[12px] border-[#413B46]'>
						<div className='border-b md:border-b-0 md:border-r border-[#413B46] px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[250px] sm:min-h-[360px]'>
							<WalletIcon />
							<div>
								<h3 className='mb-4 font-youth font-normal not-italic text-[28px] leading-[34px] tracking-[-0.02em] text-white'>
									Confidential
								</h3>
								<Body tag='p' className='mt-auto font-untitledSans font-normal text-[14px] leading-[22px] text-[#D8CCE5]'>
									Selectively disclose sensitive data (e.g. user info, trading strategies)
								</Body>
							</div>
						</div>

						<div className='border-b md:border-b-0 md:border-r border-[#413B46] px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[250px] sm:min-h-[360px]'>
							<WalletIcon />
							<div>
								<h3 className='mb-4 font-youth font-normal not-italic text-[28px] leading-[34px] tracking-[-0.02em] text-white'>
									Verifiable
								</h3>
								<Body tag='p' className='mt-auto font-untitledSans font-normal text-[14px] leading-[22px] text-[#D8CCE5]'>
									Anchor Point provides verifiable claims on encrypted data without decrypting it.
								</Body>
							</div>
						</div>

						<div className='px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[250px] sm:min-h-[360px]'>
							<WalletIcon />
							<div>
								<h3 className='mb-4 font-youth font-normal not-italic text-[28px] leading-[34px] tracking-[-0.02em] text-white'>
									Scalable
								</h3>
								<Body tag='p' className='mt-auto font-untitledSans font-normal text-[14px] leading-[22px] text-[#D8CCE5]'>
									Leverage Celestia&apos;s battle tested high throughput DA layer.
								</Body>
							</div>
						</div>
					</div>
				</Container>

				<Container size='lg' className='relative z-[1]'>
					<Row className='mb-8 sm:mb-12'>
						<Col width={100}>
							<Display size='sm' tag='h2' className='text-white'>
								Use cases
							</Display>
						</Col>
					</Row>
					<div className='grid grid-cols-1 md:grid-cols-3 border-[#D8CCE540] border rounded-[12px]'>
						<div className='border-b md:border-b-0 md:border-r border-[#D8CCE540] px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[250px] sm:min-h-[360px]'>
							<WalletIcon />

							<div>
								<h3 className='mb-4 font-youth font-normal not-italic text-[28px] leading-[34px] tracking-[-0.02em] text-white'>
									Private orderbooks
								</h3>
								<Body tag='p' className='mt-auto font-untitledSans font-normal text-[14px] leading-[22px] text-[#e7def1]'>
									Selectively disclose sensitive data (e.g.user info, trading strategies)
								</Body>
							</div>
						</div>

						<div className='border-b md:border-b-0 md:border-r border-[#D8CCE540] px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[250px] sm:min-h-[360px]'>
							<BubblesIcon />
							<div>
								<h3 className='mb-4 font-youth font-normal not-italic text-[28px] leading-[34px] tracking-[-0.02em] text-white'>
									Verifiable backups
								</h3>
								<Body tag='p' className='mt-auto font-untitledSans font-normal text-[14px] leading-[22px] text-[#e7def1]'>
									Anchor Point provides verifiable claims on encrypted data without decrypting it.
								</Body>
							</div>
						</div>

						<div className='px-6 py-10 sm:p-12 flex flex-col justify-between min-h-[250px] sm:min-h-[360px]'>
							<GlobeIcon />
							<div>
								<h3 className='mb-4 font-youth font-normal not-italic text-[28px] leading-[34px] tracking-[-0.02em] text-white'>
									Confidential voting
								</h3>
								<Body tag='p' className='mt-auto font-untitledSans font-normal text-[14px] leading-[22px] text-[#e7def1]'>
									Leverage Celestia&rsquo;s battle-tested, high-throughput DA layer.
								</Body>
							</div>
						</div>
					</div>
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

			<section className='pt-8 pb-24 lg:pt-5 lg:pb-[104px] bg-[#F4F4F4]'>
				<Container size='lg'>
					<div className='flex flex-col lg:flex-row gap-8 md:gap-16 items-center'>
						<div>
							<h3 className='font-youth font-normal not-italic text-[28px] sm:text-[32px] md:text-[40px] leading-[1.25] md:leading-[56px] tracking-[-0.0625em] text-black md:text-balance max-lg:text-center'>
								Go bigger and build unstoppable apps with full-stack control with Celestia underneath.
							</h3>
						</div>
						<div>
							<PrimaryButton className={"px-8"} size='lg'>
								<div className='flex items-center gap-4'>
									<span>PrimaryButton</span>
									<svg
										width='11'
										height='11'
										viewBox='0 0 11 11'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
										focusable='false'
										className='text-white group-hover:text-black transition-all group-hover:translate-x-3 duration-300'
									>
										<path
											d='M0.5 0.5H10.5M10.5 0.5V10.5M10.5 0.5L0.5 10.5'
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
							</PrimaryButton>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}
