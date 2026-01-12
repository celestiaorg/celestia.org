"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container/Container";

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

const fadeInVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.4, 0.25, 1],
		},
	},
};

const PrivateAccountSection = () => {
	return (
		<section data-header-theme="light" className="bg-white py-16 md:py-20 lg:py-[104px]">
			<Container size="lg">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
					{/* Text content */}
					<motion.div
						className="flex flex-col gap-6 text-black w-full lg:max-w-[574px] order-2 lg:order-1"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						variants={fadeUpVariants}
					>
						<h2 className="font-untitledSans font-medium text-3xl md:text-4xl lg:text-5xl xl:text-[56px] leading-[1.14] xl:leading-[64px] tracking-[-0.05em]">
							Private account balances when trading with Hibachi
						</h2>
						<p className="font-untitledSans text-base md:text-lg lg:text-xl leading-[1.6] lg:leading-[32px]">
							Private DA allows Hibachi to maintain a private exchange for traders without leaking sensitive information, such as account balances, in the event they need to exit their funds.
						</p>
					</motion.div>

					{/* Image */}
					<motion.div
						className="w-full lg:w-[590px] lg:shrink-0 order-1 lg:order-2"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						variants={fadeInVariants}
					>
						<div className="relative w-full aspect-[590/512] rounded-2xl overflow-hidden bg-black">
							<img
								src="/images/app/private-da/balances-trading.jpg"
								alt="Hibachi trading interface showing private account balances"
								className="absolute inset-0 w-full h-full object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default PrivateAccountSection;
