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

const PrivateMarketsSection = () => {
	return (
		<section data-header-theme='dark' className='bg-[#17141a] text-white pt-12 md:pt-16 lg:pt-[64px]'>
			{/* Title */}
			<motion.h2
				className='font-untitledSans text-center max-sm:text-pretty font-medium text-[32px] md:text-[48px] lg:text-[64px] leading-[1] tracking-[-2px] text-white mb-8 md:mb-16 lg:mb-[64px]'
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeUpVariants}
			>
				Private markets, public proof
			</motion.h2>

			{/* Content with background image */}
			<div className='relative overflow-hidden'>
				{/* Background image - anchored to bottom */}
				<motion.div
					className='absolute bottom-0 left-0 -right-72 lg:-left-10 xl:left-10 lg:right-20 xl:-right-10 pointer-events-none h-[500px] md:h-[600px] lg:h-[640px]'
					initial={{ opacity: 0, y: 60 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
				>
					<Image src='/images/app/private-da/private-market.png' alt='' fill className='object-contain object-bottom' priority />
				</motion.div>

				<Container size='lg'>
					<div className='relative pt-8 md:pt-12 lg:pt-[48px] pb-[400px] md:pb-[500px] lg:pb-[80px]'>
						<div className='flex flex-col gap-8 md:gap-24 lg:gap-0'>
							{/* Left column - Main quote (top-left positioned) */}
							<motion.div
								className='lg:max-w-[636px]'
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
											delay: 0.15,
											ease: [0.25, 0.4, 0.25, 1],
										},
									},
								}}
							>
								<p className='font-untitledSans text-center sm:text-left font-medium text-[24px] md:text-[28px] lg:text-[32px] leading-[1.25] tracking-[-1px] text-white'>
									Private Blockspace is built for high-stakes onchain markets where performance and confidentiality are mandatory,
									and independent verification and recovery paths are not essential.
								</p>
							</motion.div>

							{/* Right column - Description and CTA (bottom-right positioned) */}
							<motion.div
								className='lg:ml-auto lg:max-w-[400px] lg:mt-[200px] text-center sm:text-left'
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
								<p className='font-untitledSans text-[18px] md:text-[20px] leading-[1.4] text-[#f5edfe] mb-8'>
									This applies to private exchanges and orderbooks, institutional financial rails, and trustless data
									marketplaces—use cases where positions, holdings, or proprietary data must remain private, yet the integrity and
									availability of that private state must be publicly verifiable.
								</p>
								<Button variant='subtle' href='/private-blockspace/' size='md'>
									Get Started <ArrowRightSVG />
								</Button>
							</motion.div>
						</div>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default PrivateMarketsSection;
