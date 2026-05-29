"use client";

import { motion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

const investors = [
	{ src: "/images/app/homepage/raise-logo-1.png", alt: "Binance Labs" },
	{ src: "/images/app/homepage/raise-logo-2.png", alt: "Maven 11" },
	{ src: "/images/app/homepage/raise-logo-3.png", alt: "Bain Capital Crypto" },
	{ src: "/images/app/homepage/raise-logo-4.png", alt: "Coinbase Ventures" },
	{ src: "/images/app/homepage/raise-logo-5.png", alt: "Placeholder" },
];

/**
 * InvestorsSection — "Backed by the Best" ($155M raise + investor logos).
 *
 * Ported from the prototype's .investors-section: clean light layout, no card,
 * with the headline / $155M+copy / logos / "and more" stacked and centered.
 */
const InvestorsSection = () => {
	return (
		<section
			data-header-theme="light"
			className="relative z-[2] bg-[#FDFCFF] max-w-[1680px] mx-auto flex flex-col items-center gap-12 py-12 px-6 min-[600px]:py-[60px] min-[600px]:px-[60px] min-[1200px]:py-20 min-[1200px]:px-[120px]"
		>
			<AnimatedHeadline text="Backed by the Best" />

			<div className="w-full flex flex-col items-center">
				{/* $155M + copy */}
				<motion.div
					className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					variants={fadeUp}
				>
					<span className="font-slussenExpanded font-semibold text-[56px] sm:text-[72px] xl:text-[94px] leading-none tracking-[0.02em] text-[#1a1a1a] whitespace-nowrap">
						$155M
					</span>
					<span className="font-slussenExtended font-medium text-[26px] sm:text-[32px] xl:text-[44px] leading-[1.15] text-[#1a1a1a]">
						+
					</span>
					<span className="font-slussenExtended font-medium text-[26px] sm:text-[32px] xl:text-[44px] leading-[1.15] tracking-[-0.01em] text-[#1a1a1a] text-center sm:text-left">
						Raised from leading
						<br className="hidden sm:block" /> blockchain investment firms.
					</span>
				</motion.div>

				{/* Investor logos */}
				<motion.div
					className="w-full"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					variants={fadeUp}
				>
					<div className="flex flex-wrap items-center justify-center md:justify-between gap-x-10 gap-y-6 pt-10 pb-6">
						{investors.map((investor, i) => (
							<img
								key={i}
								src={investor.src}
								alt={investor.alt}
								className="object-contain h-5 sm:h-7 xl:h-8 w-auto max-w-full"
								style={{ filter: "brightness(0) saturate(100%)" }}
							/>
						))}
					</div>
					<div className="text-center font-slussen text-[16px] font-normal text-black/40">
						and more
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default InvestorsSection;
