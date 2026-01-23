"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

const HibachiSection = () => {
	return (
		<section data-header-theme='dark' className='bg-[#17141a] text-white pt-20 md:pt-24 lg:pt-[120px] overflow-hidden'>
			<div className='relative max-w-[1265px] mx-auto px-4 md:px-10'>
				{/* Background image - positioned bottom right (desktop only) */}
				<motion.div
					className='hidden lg:block absolute bottom-0 right-[-350px] w-[800px] xl:w-[800px] h-[650px] pointer-events-none'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-50px" }}
					variants={{
						hidden: { opacity: 0, x: 40 },
						visible: {
							opacity: 1,
							x: 0,
							transition: {
								duration: 0.8,
								delay: 0.2,
								ease: [0.25, 0.4, 0.25, 1],
							},
						},
					}}
				>
					<div className='relative w-full h-full rounded-tl-[32px] overflow-hidden'>
						<Image
							src='/images/app/private-da/hibachi.png'
							alt='Hibachi trading interface showing ETH/USDT perpetual futures'
							fill
							className='object-cover object-left-top'
							priority
						/>
						{/* Right edge fade overlay */}
						<div
							className='hidden lg:block absolute top-0 right-0 w-[160px] h-full'
							style={{ backgroundImage: "linear-gradient(to right, rgba(23, 20, 26, 0) 0%, rgba(23, 20, 26, 1) 100%)" }}
						/>
					</div>
				</motion.div>

				<div className='z-10 pb-10 lg:pb-[180px]'>
					{/* Text content */}
					<div className='flex flex-col gap-6 w-full lg:max-w-[574px]'>
						<motion.h2
							className='font-untitledSans font-medium text-[32px] md:text-[48px] lg:text-[64px] leading-[1] tracking-[-2px] text-white'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-50px" }}
							variants={fadeUpVariants}
						>
							Hibachi: a private perps exchange with public guarantees
						</motion.h2>
						<motion.p
							className='font-untitledSans text-[18px] md:text-[20px] leading-[1.4] text-[#f5edfe]'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-50px" }}
							variants={{
								hidden: { opacity: 0, y: 40 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.7,
										delay: 0.1,
										ease: [0.25, 0.4, 0.25, 1],
									},
								},
							}}
						>
							Hibachi publishes verifiably encrypted exchange state to Celestia, keeping balances and positions confidential while
							making data availability and state commitments publicly verifiable.
						</motion.p>
						<motion.div
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-50px" }}
							variants={{
								hidden: { opacity: 0, y: 40 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.7,
										delay: 0.2,
										ease: [0.25, 0.4, 0.25, 1],
									},
								},
							}}
						>
							<Button variant='subtle' href='#' size='md' className='w-fit'>
								Hibachi Case Study <ArrowRightSVG />
							</Button>
						</motion.div>
					</div>
				</div>

				{/* Mobile image */}
				<motion.div
					className='lg:hidden relative w-full h-[280px] sm:h-[350px] md:h-[400px] rounded-[16px] overflow-hidden'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-50px" }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.7,
								delay: 0.2,
								ease: [0.25, 0.4, 0.25, 1],
							},
						},
					}}
				>
					<Image
						src='/images/app/private-da/hibachi.png'
						alt='Hibachi trading interface showing ETH/USDT perpetual futures'
						fill
						className='object-cover object-left-top'
					/>
				</motion.div>
			</div>
		</section>
	);
};

export default HibachiSection;
