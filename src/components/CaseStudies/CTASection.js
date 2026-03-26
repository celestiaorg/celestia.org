"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
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

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const CTASection = () => {
	return (
		<section data-header-theme='dark' className='bg-[#040207] py-20 md:py-28'>
			<Container size='lg'>
				<motion.div
					className='flex flex-col items-center text-center gap-6 md:gap-8 max-w-[640px] mx-auto'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
				>
					{/* Title */}
					<motion.h2
						className='font-slussenExtended font-medium text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2] tracking-[-1.5px] text-white'
						variants={fadeUpVariants}
					>
						Start building on Celestia
					</motion.h2>

					{/* Description */}
					<motion.p
						className='font-slussen text-[16px] md:text-[18px] leading-[1.6] text-white/50'
						variants={fadeUpVariants}
					>
						Launch your own high-throughput blockchain, or reach out to learn more about what Celestia can do for your product.
					</motion.p>

					{/* Buttons */}
					<motion.div className='flex flex-col sm:flex-row gap-3 mt-2' variants={fadeUpVariants}>
						<Button variant='pill-primary' size='pill-md' href='/build/'>
							Get Started
						</Button>
						<Button variant='pill-outline' size='pill-md' href='/contact/'>
							<span>Contact Us</span>
							<ArrowRightSVG />
						</Button>
					</motion.div>
				</motion.div>
			</Container>
		</section>
	);
};

export default CTASection;
