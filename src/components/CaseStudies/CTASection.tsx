"use client";

import { motion } from "framer-motion";

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
		<section data-header-theme='light' className='bg-[#FDFCFF] border-t border-black/[0.08] py-20 md:py-[104px]'>
			<div className='mx-auto max-w-[1520px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]'>
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
						className='font-nuberNextWide font-medium text-[24px] md:text-[36px] leading-[1.2] tracking-[-1.5px] text-[#0E1014]'
						variants={fadeUpVariants}
					>
						Start building on Celestia
					</motion.h3>

					<motion.p
						className='font-nuberNext text-[16px] leading-[24px] text-[#4A5058] max-w-[560px]'
						variants={fadeUpVariants}
					>
						Launch your own high-throughput blockchain, or reach out to learn more about what Celestia can do for your product.
					</motion.p>

					<motion.div className='flex gap-4 mt-4' variants={fadeUpVariants}>
						<a
							href='/get-started/'
							className='inline-flex items-center justify-center rounded-full border border-[#0E1014] bg-[#0E1014] px-6 py-2.5 font-nuberNext text-[14px] font-medium text-[#FDFCFF] no-underline transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]'
						>
							Get started
						</a>
						<a
							href='/contact/'
							className='inline-flex items-center justify-center rounded-full border border-black/[0.2] bg-transparent px-6 py-2.5 font-nuberNext text-[14px] font-medium text-[#0E1014] no-underline transition-colors duration-200 hover:border-black/50'
						>
							Contact us
						</a>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default CTASection;
