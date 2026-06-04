"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import ArrowRightSVG from "@/macros/SVGs/ArrowRightSVG";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
	},
};

const CTASection = () => {
	return (
		<section data-header-theme='dark' className='bg-[#040207] py-24 md:py-[104px]'>
			<Container size='2xl'>
				<motion.div
					className='flex flex-col items-center text-center gap-5'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-100px" }}
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
					}}
				>
					<motion.h3
						className='font-slussenExtended font-medium text-[28px] md:text-[36px] leading-[1.2] tracking-[-1.5px] text-[#FDFCFF]'
						variants={fadeUpVariants}
					>
						Start building on Celestia
					</motion.h3>

					<motion.p
						className='font-slussen text-[16px] leading-[24px] text-[#B0B7C0] max-w-[560px]'
						variants={fadeUpVariants}
					>
						Launch your own high-throughput blockchain, or reach out to learn more about what Celestia can do for your product.
					</motion.p>

					<motion.div className='flex gap-4 mt-4' variants={fadeUpVariants}>
						<Button variant='pill-primary' size='pill-md' href='/get-started/'>
							Get Started
						</Button>
						<Button variant='pill-outline' size='pill-md' href='/contact/'>
							Contact Us
							<ArrowRightSVG className='opacity-50' />
						</Button>
					</motion.div>
				</motion.div>
			</Container>
		</section>
	);
};

export default CTASection;
