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
			className='bg-black-pure border-t border-white/[0.05] px-6 py-16 min-[600px]:px-[60px] md:py-[100px] min-[1200px]:px-[120px] lg:py-[120px]'
		>
			<div className='mx-auto grid w-full max-w-[1280px] grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-20 items-start'>
				<motion.div
					variants={fadeUpVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					custom={0}
				>
					<h2 className='font-slussenExtended font-medium text-[25px] min-[431px]:text-[28px] leading-[1.2] tracking-[-0.025em] md:text-[40px] md:leading-[1.1] md:tracking-[-0.025em] text-white/90 mb-8'>
						Private Markets,
						<br />
						Public Proof
					</h2>
					<Button
						href='/get-started/'
						variant='pill-primary'
						size='pill-md'
						className="mt-5"
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
					<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-white/[0.72] mb-7 m-0'>
						Private Blockspace is built for high-stakes onchain markets where performance and confidentiality
						are mandatory, and independent verification and recovery paths are not negotiable.
					</p>
					<div className='border-l border-white/[0.12] pl-6'>
						<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-white/[0.72] m-0'>
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
