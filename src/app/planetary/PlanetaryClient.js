"use client";
import { Row, Col } from "@/macros/Grids";
import Container from "@/components/Container/Container";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Animation variants
const fadeInUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.21, 1.02, 0.73, 1],
		},
	},
};

const fadeInOnly = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: [0.25, 1, 0.5, 1],
		},
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

const staggerContainerDelayed = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 2.0,
		},
	},
};

const fadeIn = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 1.0,
			ease: [0.25, 1, 0.5, 1],
		},
	},
};

export default function PlanetaryClient() {
	const [stars, setStars] = useState([]);

	useEffect(() => {
		// Generate stars only on client side to avoid hydration issues
		const generateStars = () => {
			const starGroups = [];

			// Regular dim stars
			// Top left sky area (6 stars)
			for (let i = 0; i < 6; i++) {
				starGroups.push({
					id: `top-left-${i}`,
					top: Math.random() * 45,
					left: Math.random() * 35,
					duration: 2 + Math.random() * 3,
					delay: Math.random() * 2,
					isBright: false,
				});
			}

			// Top right sky area (6 stars)
			for (let i = 0; i < 6; i++) {
				starGroups.push({
					id: `top-right-${i}`,
					top: Math.random() * 45,
					left: 65 + Math.random() * 35,
					duration: 2 + Math.random() * 3,
					delay: Math.random() * 2,
					isBright: false,
				});
			}

			// Far left edge sky (4 stars)
			for (let i = 0; i < 4; i++) {
				starGroups.push({
					id: `far-left-${i}`,
					top: Math.random() * 50,
					left: Math.random() * 15,
					duration: 2 + Math.random() * 3,
					delay: Math.random() * 2,
					isBright: false,
				});
			}

			// Far right edge sky (4 stars)
			for (let i = 0; i < 4; i++) {
				starGroups.push({
					id: `far-right-${i}`,
					top: Math.random() * 50,
					left: 85 + Math.random() * 15,
					duration: 2 + Math.random() * 3,
					delay: Math.random() * 2,
					isBright: false,
				});
			}

			// Fixed sparkle positions - 2 on left, 2 on right
			const sparkles = [
				// Left side sparkles
				{
					id: "sparkle-left-1",
					top: 15,
					left: 20,
					duration: 2,
					delay: 0,
					isBright: true,
				},
				{
					id: "sparkle-left-2",
					top: 35,
					left: 8,
					duration: 2.5,
					delay: 1,
					isBright: true,
				},
				// Right side sparkles
				{
					id: "sparkle-right-1",
					top: 25,
					left: 85,
					duration: 1.8,
					delay: 0.5,
					isBright: true,
				},
				{
					id: "sparkle-right-2",
					top: 40,
					left: 92,
					duration: 2.2,
					delay: 1.5,
					isBright: true,
				},
			];

			// Combine regular stars with sparkles
			setStars([...starGroups, ...sparkles]);
		};

		generateStars();
	}, []);

	return (
		<div className='bg-[#040215] min-h-screen'>
			{/* Hero Section - Background with floating mammoth */}
			<section className='relative overflow-hidden aspect-square md:aspect-[13/6]'>
				<motion.div
					className='w-full h-full'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<Image
						src='/images/app/mammoth/mammoth-hero.jpg'
						alt='Mammoth Hero Background'
						width={1920}
						height={1080}
						className='w-full h-full object-cover object-bottom'
						priority
					/>
				</motion.div>

				{/* Blinking Stars - only in sky area, avoiding spaceship center */}
				<div className='absolute inset-0 pointer-events-none'>
					{stars.map((star) => (
						<motion.div
							key={star.id}
							className={`absolute ${star.isBright ? "w-4 h-4" : "w-1 h-1 bg-white rounded-full"}`}
							style={{
								top: `${star.top}%`,
								left: `${star.left}%`,
								transform: star.isBright ? "translate(-50%, -50%)" : "none",
							}}
							animate={{
								opacity: star.isBright ? [0.1, 0.9, 0.1] : [0.1, 0.4, 0.1],
								scale: star.isBright ? [0.4, 1.4, 0.4] : [0.3, 0.8, 0.3],
								rotate: star.isBright ? [0, 180, 0] : 0,
							}}
							transition={{
								duration: star.duration,
								repeat: Infinity,
								delay: star.delay,
								repeatDelay: star.isBright ? 3 + Math.random() * 2 : 0,
								ease: "easeInOut",
							}}
						>
							{star.isBright ? (
								<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
							) : null}
						</motion.div>
					))}
				</div>

				{/* Floating Mammoth Overlay */}
				<motion.div
					className='absolute w-[28vw] sm:w-[18vw]'
					initial={{ opacity: 0, y: 50, bottom: "16%", left: "50%", x: "-50%", rotate: 0 }}
					animate={{
						opacity: 1,
						y: [0, -10, 0],
						rotate: [-2, 3, -2],
					}}
					transition={{
						opacity: {
							duration: 1.8,
							delay: 0.2,
							ease: [0.22, 1, 0.36, 1],
						},
						y: {
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 1.8,
						},
						rotate: {
							duration: 6,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2.2,
						},
					}}
				>
					<div className='relative w-full h-full'>
						<Image
							src='/images/app/mammoth/mammoth.png'
							alt='Floating Mammoth'
							width={400}
							height={400}
							className='w-full h-auto object-contain'
							priority
						/>
					</div>
				</motion.div>
			</section>

			{/* Main Content Section */}
			<section
				className='pb-24 lg:pb-32'
				style={{
					background: "linear-gradient(to top, #1E014D 0%, #05010C 100%)",
				}}
			>
				<Container size={"lg"}>
					<Row>
						<Col width={100}>
							{/* Date and Location Row */}
							<motion.div
								className='flex flex-row gap-3 sm:gap-10 mb-3 lg:mb-4 justify-center'
								initial='hidden'
								animate='visible'
								variants={staggerContainerDelayed}
							>
								<motion.div className='flex items-center gap-3 justify-center' variants={fadeInOnly}>
									<p className='text-white font-medium text-sm sm:text-xl'>NOVEMBER 19TH</p>
								</motion.div>
								<motion.div className='flex items-center gap-3 justify-center' variants={fadeInOnly}>
									<p className='text-white font-medium text-sm sm:text-xl'>BUENOS AIRES</p>
								</motion.div>
							</motion.div>

							{/* Large Heading */}
							<motion.h1
								className='mb-12 lg:mb-16 uppercase font-druk text-[#8AF4FF] text-[28vw] sm:text-[180px] md:text-[200px] lg:text-[260px] leading-[0.9] text-center'
								style={{ textShadow: "0 0 0px #8AF4FF, 0 0 5px #8AF4FF" }}
								initial='hidden'
								animate='visible'
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 1.2,
											delay: 1.2,
											ease: [0.16, 1, 0.3, 1],
										},
									},
								}}
							>
								PLANETARY
							</motion.h1>

							{/* Tickets Button */}
							<motion.div
								className='mb-16 lg:mb-20 flex justify-center'
								initial='hidden'
								animate='visible'
								variants={{
									hidden: { opacity: 0, y: 15 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 1.0,
											delay: 2.6,
											ease: [0.23, 1, 0.32, 1],
										},
									},
								}}
							>
								<div className='relative overflow-hidden px-6 py-2 bg-[#9A34C2] text-white font-medium text-xl rounded-[36px] uppercase'>
									<span className='font-druk uppercase text-4xl sm:text-5xl relative z-1 text-[#8AF4FF]'>TICKETS SOON</span>
								</div>
							</motion.div>

							{/* Paragraph Content */}
							<motion.div
								initial='hidden'
								animate='visible'
								variants={{
									hidden: { opacity: 0 },
									visible: {
										opacity: 1,
										transition: {
											staggerChildren: 0.25,
											delayChildren: 3.2,
										},
									},
								}}
							>
								<motion.p
									className='font-normal text-center text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[0px] mb-8 sm:mb-16 text-white'
									variants={fadeInUp}
								>
									<span className='text-[#CB44FF] font-medium'>Introducing the first edition of Planetary</span> — a Celestia global
									event series celebrating builders and unstoppable apps, now landing in Buenos Aires. Planetary travels to new
									cities around the world, bringing together communities to explore the future of what&apos;s possible onchain with
									mammoth throughput and Celestia underneath.
								</motion.p>
								<motion.p
									className='font-normal text-center text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[0px] text-white'
									variants={fadeInUp}
								>
									A recent shift from Modular Summit to Planetary, a refreshed brand that better reflects Celestia&apos;s long-term
									vision. Planetary builds on the strong foundation of past events while evolving into a more intimate,
									future-focused gathering.
								</motion.p>
							</motion.div>
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
							<motion.h1
								className='mb-8 sm:mb-12 font-youth font-normal text-center text-[32px] leading-[40px] sm:text-[46px] sm:leading-[55px] text-[#8AF4FF]'
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, margin: "-100px" }}
								variants={fadeInUp}
							>
								Last Year Modular Summit, This Year Planetary
							</motion.h1>
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
					<motion.div
						className='grid grid-cols-2 md:grid-cols-3 grid-rows-11 gap-3 h-[1200px] w-full'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-200px" }}
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: {
									staggerChildren: 0.1,
									delayChildren: 0.2,
								},
							},
						}}
					>
						<motion.div
							className='col-span-1 row-span-4 bg-gray-200 rounded-lg overflow-hidden'
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.9 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.6,
										ease: "easeOut",
									},
								},
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-1.jpg'
								alt='Silhouettes viewing Modular Summit 3.0 map'
								className='w-full h-full object-cover'
							/>
						</motion.div>
						<motion.div
							className='col-span-1 row-span-6 bg-gray-200 rounded-lg overflow-hidden'
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.9 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.6,
										ease: "easeOut",
									},
								},
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-2.jpg'
								alt='Large conference hall with networking crowd'
								className='w-full h-full object-cover'
							/>
						</motion.div>
						<motion.div
							className='col-span-1 row-span-4 bg-gray-200 rounded-lg overflow-hidden'
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.9 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.6,
										ease: "easeOut",
									},
								},
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-3.jpg'
								alt='Panel discussion with microphone'
								className='w-full h-full object-cover'
							/>
						</motion.div>
						<motion.div
							className='col-span-1 row-span-7 bg-gray-200 rounded-lg overflow-hidden'
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.9 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.6,
										ease: "easeOut",
									},
								},
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-5.jpg'
								alt='Tech conference panel with speakers on stage'
								className='w-full h-full object-cover'
							/>
						</motion.div>
						<motion.div
							className='col-span-1 row-span-3 bg-gray-200 rounded-lg overflow-hidden'
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.9 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.6,
										ease: "easeOut",
									},
								},
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-5.jpg'
								alt='Sovereign Radio podcast recording at Modular Summit'
								className='w-full h-full object-cover'
							/>
						</motion.div>
						<motion.div
							className='col-span-1 row-span-6 sm:row-span-5 bg-gray-200 rounded-lg overflow-hidden'
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.9 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.6,
										ease: "easeOut",
									},
								},
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-6.jpg'
								alt='Development workspace with multiple monitors and code'
								className='w-full h-full object-cover'
							/>
						</motion.div>
						<motion.div
							className='col-span-1 row-span-4 bg-gray-200 rounded-lg overflow-hidden'
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.9 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.6,
										ease: "easeOut",
									},
								},
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='/images/app/mammoth/image-7.jpg'
								alt='Conference stage with camera equipment'
								className='w-full h-full object-cover'
							/>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Sign up section */}
			<section className='pt-16 pb-32 lg:pb-48 lg:pt-40 max-w-[1680px] mx-auto px-2 relative overflow-hidden'>
				{/* Background Image */}
				<motion.div
					className='absolute inset-0'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-200px" }}
					transition={{ duration: 1.2, ease: "easeOut" }}
				>
					<Image
						src='/images/app/mammoth/mammoth-footer.jpg'
						alt='Mammoth Footer Background'
						fill
						className='object-cover object-top'
						sizes='100vw'
					/>
				</motion.div>

				{/* Footer Stars and Sparkles */}
				<div className='absolute inset-0 pointer-events-none'>
					{/* Dim fading stars */}
					{/* Top left footer stars */}
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "20%", left: "12%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.5, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "35%", left: "18%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 3, repeat: Infinity, delay: 1.2, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "15%", left: "25%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.8, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
					/>

					{/* Top right footer stars */}
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "18%", left: "78%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "32%", left: "85%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.7, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "25%", left: "72%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 3.2, repeat: Infinity, delay: 0.1, ease: "easeInOut" }}
					/>

					{/* Far edge stars */}
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "28%", left: "5%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.4, repeat: Infinity, delay: 1.8, ease: "easeInOut" }}
					/>
					<motion.div
						className='absolute w-1 h-1 bg-white rounded-full'
						style={{ top: "38%", left: "95%" }}
						animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2.9, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
					/>

					{/* Bright sparkles */}
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "25%",
							left: "15%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.4, 1.4, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.2,
							repeat: Infinity,
							delay: 0.5,
							repeatDelay: 3 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "45%",
							left: "8%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.4, 1.4, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							delay: 1.2,
							repeatDelay: 3 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>

					{/* Right sparkles */}
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "30%",
							left: "88%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.4, 1.4, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 1.8,
							repeat: Infinity,
							delay: 0.8,
							repeatDelay: 3 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
					<motion.div
						className='absolute w-4 h-4'
						style={{
							top: "50%",
							left: "92%",
							transform: "translate(-50%, -50%)",
						}}
						animate={{
							opacity: [0.1, 0.9, 0.1],
							scale: [0.4, 1.4, 0.4],
							rotate: [0, 180, 0],
						}}
						transition={{
							duration: 2.4,
							repeat: Infinity,
							delay: 1.8,
							repeatDelay: 3 + Math.random() * 2,
							ease: "easeInOut",
						}}
					>
						<Image src='/images/app/mammoth/sparcle.svg' alt='Sparkle' width={16} height={16} className='w-full h-full' />
					</motion.div>
				</div>

				{/* Gradient Overlay */}
				<div className='absolute inset-x-0 top-0 h-[100px] bg-gradient-to-t from-transparent to-[#040215]' />

				<motion.div
					className='flex flex-col sm:flex-row items-center justify-between gap-6 sm:px-20 max-w-[1230px] mx-auto relative z-10'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
				>
					<motion.div variants={fadeInUp}>
						<h2 className='font-youth font-normal text-[28px] leading-[36px] flex items-center text-[#8AF4FF] sm:text-[40px] sm:leading-[48px]'>
							Sign up for Planetary
						</h2>
					</motion.div>
					<motion.button
						className='bg-[#8AF4FF] hover:bg-[#6ee8f5] transition-colors duration-200 flex items-center gap-3 px-8 py-4 rounded-full group'
						variants={fadeInUp}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
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
					</motion.button>
				</motion.div>
			</section>
		</div>
	);
}
