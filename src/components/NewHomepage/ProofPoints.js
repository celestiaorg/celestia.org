"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

const stats = [
	{
		number: "25+",
		label: "Production chains built and launched by the team.",
	},
	{
		number: "1B+",
		label: "Potential throughput of blockchains built on Celestia.",
	},
	{
		number: "< $0.0001",
		label: "Gas costs.",
	},
];

/**
 * ProofPoints — three headline stats with dividers + a live-data link.
 *
 * Ported from the prototype's `.proof-points` section. Dividers are vertical on
 * desktop and flip to horizontal below 900px (matching the prototype's
 * column reflow). Numerals use Slussen Extended semibold.
 */
const ProofPoints = () => {
	return (
		// Mobile hero coupling (prototype): the full-bleed top border is the line
		// under the in-flow fibre video — the hero's bottom padding puts the gap
		// BETWEEN video and line (a margin here would expose the white body bg),
		// small padding-top keeps the line ATTACHED to the first stat.
		<section data-header-theme="dark" className="bg-[#040207] max-md:border-t max-md:border-white/[0.14]">
			<motion.div
				className="max-w-[1520px] mx-auto flex flex-col items-center gap-12 pt-7 pb-16 px-6 min-[600px]:py-12 min-[600px]:px-[60px] min-[1200px]:py-20 min-[1200px]:px-[120px]"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<div className="flex flex-col items-center justify-center gap-8 w-full min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-12">
					{stats.map((stat, index) => (
						<div key={stat.number} className="contents">
							<div className="flex flex-col items-center gap-3 text-center min-[900px]:flex-1">
								<span className="flex items-center justify-center min-h-[56px] font-slussenExtended font-semibold text-[32px] min-[900px]:text-[56px] leading-none tracking-[-0.02em] text-[#FDFCFF]">
									{stat.number}
								</span>
								<span className="font-slussen font-normal text-[16px] leading-[1.5] tracking-[-0.01em] text-[#B0B7C0] max-w-[280px]">
									{stat.label}
								</span>
							</div>
							{/* Mobile dividers run full-width (prototype .proof-divider) */}
							{index < stats.length - 1 && (
								<div className="flex-shrink-0 bg-white/10 w-full h-px min-[900px]:w-px min-[900px]:h-auto min-[900px]:self-stretch" />
							)}
						</div>
					))}
				</div>

				<Button
					href="https://blockworks.com/analytics/celestia"
					variant="pill-outline"
					size="pill-md"
					className="!text-white border-white/30 hover:border-white/50"
				>
					See live chain data <span aria-hidden="true">↗</span>
				</Button>
			</motion.div>
		</section>
	);
};

export default ProofPoints;
