"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";

// Animation variants
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

const GoBiggerSection = () => {
	return (
		<section data-header-theme='light' className='bg-white pb-16 md:pb-20 lg:pb-[104px]'>
			<Container size='lg'>
				<motion.div
					className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-50px" }}
					variants={fadeUpVariants}
				>
					{/* Text */}
					<p className='font-untitledSans font-medium text-2xl md:text-3xl lg:text-[40px] leading-[1.2] lg:leading-[48px] tracking-[-0.05em] text-black max-w-[920px]'>
						Go bigger and build unstoppable apps with full-stack control with Celestia underneath.
					</p>

					{/* Button */}
					<Button href='#' variant='subtle' theme='light' size='lg' className='shrink-0'>
						Link example
					</Button>
				</motion.div>
			</Container>
		</section>
	);
};

export default GoBiggerSection;
