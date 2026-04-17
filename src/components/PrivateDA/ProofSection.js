"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] },
	}),
};

const ProofSection = () => {
	return (
		<section
			data-header-theme='dark'
			className='bg-black-pure border-t border-white/[0.05] px-5 py-16 md:px-12 md:py-[100px] lg:px-[86px] lg:py-[120px]'
		>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 md:gap-16 lg:gap-20 items-start'>
				<motion.div
					variants={fadeUpVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					custom={0}
				>
					<h2 className='font-slussenExtended font-medium text-[38px] leading-[1.1] tracking-[-2px] md:text-[52px] md:tracking-[-3px] text-white/90 mb-6 md:mb-8'>
						Private markets,
						<br />
						public proof
					</h2>
					<Button
						href='https://docs.celestia.org/build/private-blockspace/about/'
						variant='pill-primary'
						size='pill-md'
					>
						Get Started
					</Button>
				</motion.div>

				<motion.div
					variants={fadeUpVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					custom={0.12}
				>
					<p className='font-slussenExtended font-normal text-[20px] leading-[1.6] tracking-[-0.5px] text-white/85 mb-7 m-0'>
						Private Blockspace is built for high-stakes onchain markets where performance and confidentiality
						are mandatory, and independent verification and recovery paths are not negotiable.
					</p>
					<div className='border-l border-white/[0.12] pl-6'>
						<p className='font-slussenMono text-[15px] leading-[1.75] text-white/75 m-0'>
							This could apply to private exchanges and orderbooks, institutional financial rails, and
							trustless data marketplaces — use cases where positions, holdings, or proprietary data must
							remain private, yet the integrity and availability of that private state must be publicly
							verifiable.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ProofSection;
