"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";

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

const ArrowIcon = ({ className = "" }) => (
	<svg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
		<path d='M0.5 0.5H10.5M10.5 0.5V10.5M10.5 0.5L0.5 10.5' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

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
					<Link
						href='#'
						className='group inline-flex items-center gap-6 lg:gap-8 bg-black text-white px-6 py-4 lg:py-5 rounded-full font-untitledSans font-medium text-sm uppercase tracking-wide no-underline hover:bg-black/90 transition-all duration-300 shrink-0'
					>
						Link example
						<ArrowIcon className='transition-transform duration-300 group-hover:translate-x-1' />
					</Link>
				</motion.div>
			</Container>
		</section>
	);
};

export default GoBiggerSection;
