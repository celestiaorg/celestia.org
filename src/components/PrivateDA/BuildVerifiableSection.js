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

const BuildVerifiableSection = () => {
	return (
		<section
			data-header-theme='dark'
			className='relative bg-[#17141a] text-white overflow-hidden border-y border-[rgba(226,232,240,0.1)] -mb-[2px] z-10'
		>
			{/* Background image with blend mode */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute inset-0 mix-blend-lighten overflow-hidden'>
					<motion.div
						className='relative w-full h-full'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
					>
						<Image src='/images/app/private-da/build-verifiable.png' alt='' fill className='object-cover' priority />
					</motion.div>
				</div>
				{/* Gradient overlay */}
				<div
					className='absolute inset-0'
					style={{ backgroundImage: "linear-gradient(-40deg, rgba(23, 20, 26, 0) 39%, rgb(23, 20, 26) 68%)" }}
				/>
			</div>

			{/* Content */}
			<div className='relative z-10 mx-4 md:mx-10 lg:mx-auto lg:max-w-[1265px]'>
				<div className='flex flex-col items-center gap-6 pt-24 pb-20 md:pt-28 md:pb-28 lg:pt-[80px] lg:pb-[88px] px-4'>
					{/* Title */}
					<motion.h2
						className='font-untitledSans font-medium text-[32px] md:text-[48px] lg:text-[64px] leading-[1] tracking-[-2px] lg:tracking-[-4px] text-white text-center max-w-[762px]'
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: "-50px" }}
						variants={fadeUpVariants}
					>
						Build verifiable confidential onchain markets
					</motion.h2>

					{/* Buttons */}
					<motion.div
						className='flex flex-col sm:flex-row gap-4 items-center'
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
									delay: 0.15,
									ease: [0.25, 0.4, 0.25, 1],
								},
							},
						}}
					>
						<Button variant='primary' href='#' size='md'>
							Get Started
						</Button>
						<Button variant='subtle' href='#' size='md'>
							Get In Touch <ArrowRightSVG />
						</Button>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default BuildVerifiableSection;
