"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
	},
};

const ArrowRight = () => (
	<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
		<path d='M5 12h14' />
		<path d='M12 5l7 7-7 7' />
	</svg>
);

const CtaSection = () => {
	return (
		<section
			data-header-theme='dark'
			className='bg-black-pure border-t border-white/[0.05] px-6 py-16 min-[600px]:px-[60px] md:py-20 min-[1200px]:px-[120px] lg:py-[104px]'
		>
			<motion.div
				className='flex flex-col items-center text-center gap-5 max-w-[900px] mx-auto'
				variants={fadeUpVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: "-60px" }}
			>
				<h2 className='font-slussenExtended font-medium text-[24px] leading-[1.25] tracking-[-0.025em] md:text-[36px] md:leading-[1.2] md:tracking-[-1.5px] lg:text-[36px] text-white m-0'>
					Build verifiable confidential onchain markets
				</h2>
				<p className='font-slussen text-[16px] leading-6 text-white/[0.72] max-w-[560px] m-0'>
					Launch your own private blockspace, or reach out to learn more about what Celestia can do for your
					product.
				</p>
				<div className='flex flex-wrap items-center justify-center gap-4 mt-4'>
					<Button
						href='https://docs.celestia.org/build/private-blockspace/about/'
						variant='pill-primary'
						size='pill-md'
					>
						Get Started
					</Button>
					<Button href='/contact/' variant='pill-outline' size='pill-md'>
						Get In Touch <ArrowRight />
					</Button>
				</div>
			</motion.div>
		</section>
	);
};

export default CtaSection;
