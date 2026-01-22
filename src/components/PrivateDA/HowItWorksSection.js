"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container/Container";
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

const HowItWorksSection = () => {
	return (
		<section data-header-theme='dark' className='bg-[#17141a] text-white pt-16 pb-4 md:py-20 lg:py-[104px]'>
			<Container size='lg'>
				<div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
					{/* Left side - Comparison table image */}
					<motion.div
						className='w-full lg:w-auto lg:shrink-0 order-2 lg:order-1'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeUpVariants}
					>
						<div className='relative w-full lg:w-[656px] rounded-[16px] overflow-hidden'>
							<Image
								src='/images/app/private-da/table.png'
								alt='Comparison table showing features across Private Markets, Public Markets, and Private Blockspace'
								width={656}
								height={384}
								className='w-full h-auto'
							/>
						</div>
					</motion.div>

					{/* Right side - Content */}
					<div className='flex flex-col gap-8 w-full lg:max-w-[512px] order-1 lg:order-2'>
						<div className='flex flex-col gap-8'>
							{/* Title */}
							<motion.h2
								className='font-untitledSans font-medium text-[40px] md:text-[56px] lg:text-[64px] leading-[1] tracking-[-4px] text-white'
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, margin: "-100px" }}
								variants={fadeUpVariants}
							>
								How it works
							</motion.h2>

							{/* Subtitle */}
							<motion.p
								className='font-untitledSans font-medium text-[20px] md:text-[24px] leading-[1.33] tracking-[-1px] text-white'
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, margin: "-100px" }}
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
								Operators publish verifiably encrypted state to Celestia via the Private Blockspace proxy.
							</motion.p>
						</div>

						{/* Body text */}
						<motion.div
							className='flex flex-col gap-6 font-untitledSans text-[16px] leading-[1.5] text-[#f5edfe]'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-100px" }}
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
							<p>
								The encrypted data is publicly available, and a public commitment anchors it to the protocol&apos;s onchain state,
								allowing anyone to verify availability and consistency without revealing the underlying data.
							</p>
							<p>Disclosure and key management are defined by the operator. For more detail, read the docs here.</p>
						</motion.div>

						{/* CTA Button */}
						<motion.div
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: "-100px" }}
							variants={{
								hidden: { opacity: 0, y: 40 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.7,
										delay: 0.3,
										ease: [0.25, 0.4, 0.25, 1],
									},
								},
							}}
						>
							<Button variant='subtle' href='https://docs.celestia.org' size='md' className='w-fit'>
								Read Docs <ArrowRightSVG />
							</Button>
						</motion.div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default HowItWorksSection;
