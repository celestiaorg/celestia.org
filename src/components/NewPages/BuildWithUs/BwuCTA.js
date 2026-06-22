"use client";

import { motion } from "framer-motion";

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * BwuCTA — final CTA (prototype .cs-ctas, dark variant).
 * Centered title, short description, single white pill button.
 */
const BwuCTA = () => {
	return (
		<section data-header-theme='dark' className='bg-[#040207] py-20 md:py-[104px]'>
			<motion.div
				className='mx-auto flex max-w-[1520px] flex-col items-center gap-5 px-6 text-center min-[600px]:px-[60px] min-[1200px]:px-[120px]'
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: "-100px" }}
				variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
			>
				<motion.h2
					className='font-nuberNextWide text-[24px] font-medium leading-[1.2] tracking-[-0.025em] text-[#FDFCFF] md:text-[36px]'
					variants={fadeUp}
				>
					Let&apos;s design your chain.
				</motion.h2>
				<motion.p
					className='max-w-[560px] font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] text-[#C4C8CE]'
					variants={fadeUp}
				>
					Tell us about your business and what you want to build. We respond as soon as possible.
				</motion.p>
				<motion.div className='mt-4' variants={fadeUp}>
					{/* White primary pill — prototype .btn-primary */}
					<a
						href='/contact/'
						className='inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-nuberNext text-[14px] font-medium text-[#040207] no-underline transition-opacity duration-[250ms] hover:opacity-75 active:scale-[0.98]'
					>
						Talk to our team
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default BwuCTA;
