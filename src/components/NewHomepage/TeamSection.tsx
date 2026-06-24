"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};

const team = [
	{
		name: "Mustafa Al-Bassam",
		role: "Chairman & CEO, Celestia Foundation",
		bio: "Co-authored blockchain scaling research with Vitalik Buterin and founded Chainspace, which was acquired by Facebook.",
	},
	{
		name: "Nick White",
		role: "Co-founder & CEO, Celestia Labs",
		bio: "Founded Harmony Protocol following a career in AI.",
	},
	{
		name: "Preston Evans",
		role: "Chief Solutions Architect, Celestia Labs",
		bio: "Built the Sovereign SDK, the highest-performance blockchain framework in production.",
	},
	{
		name: "Ismail Khoffi",
		role: "CTO, Celestia Labs",
		bio: "Worked at EPFL's Decentralized and Distributed Systems Laboratory and contributed to Tendermint (now CometBFT), one of the first Proof-of-Stake stacks underpinning 200+ production blockchains.",
	},
];

interface TeamCardProps {
	name: string;
	role: string;
	bio: string;
}

const TeamCard = ({ name, role, bio }: TeamCardProps) => (
	<motion.div
		variants={cardVariants}
		className="group flex bg-transparent border border-white/[0.07] rounded-lg overflow-hidden transition-[background-color,border-color] duration-[350ms] hover:bg-white hover:border-white/[0.13]"
	>
		<div className="flex flex-col justify-between gap-2.5 flex-1 min-w-0 py-5 px-[22px]">
			<div className="flex flex-col gap-1">
				<h3 className="font-nuberNextWide font-medium text-[20px] min-[431px]:text-[21px] md:text-[24px] leading-[1.25] tracking-[-0.025em] text-[#FDFCFF] transition-colors duration-[350ms] group-hover:text-[#040207]">
					{name}
				</h3>
				<span className="font-nuberNext text-[16px] leading-[1.4] tracking-[-0.01em] text-white/50 transition-colors duration-[350ms] group-hover:text-[#5a5a5a]">
					{role}
				</span>
			</div>
			<div className="border-t border-white/[0.07] pt-2.5 transition-colors duration-[350ms] group-hover:border-black/10">
				<p className="font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] text-[#B0B7C0] transition-colors duration-[350ms] group-hover:text-[#5a5a5a]">
					{bio}
				</p>
			</div>
		</div>
	</motion.div>
);

/**
 * TeamSection — "The team that built the frameworks behind 100+ production
 * chains." Ported from the prototype's .home-team section: a 2-column grid of
 * text-only member cards (dark→light on hover) and a "Meet the full team" CTA.
 */
const TeamSection = () => {
	return (
		<section data-header-theme="dark" className="relative z-[2] bg-[#040207]">
			<div className="max-w-[1520px] mx-auto flex flex-col items-center gap-12 py-16 px-6 min-[600px]:py-[60px] min-[600px]:px-[60px] min-[1200px]:py-20 min-[1200px]:px-[120px]">
			<motion.h2
				className="font-nuberNextWide font-medium text-[25px] min-[431px]:text-[28px] md:text-[32px] min-[900px]:text-[36px] min-[1200px]:text-[40px] leading-[1.2] min-[600px]:leading-[1.25] tracking-[-0.025em] text-[#FDFCFF] text-center max-w-[900px]"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				variants={fadeUp}
			>
				The team that built the frameworks behind 100+ production chains.
			</motion.h2>

			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 w-full"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				variants={staggerContainer}
			>
				{team.map((member) => (
					<TeamCard key={member.name} {...member} />
				))}
			</motion.div>

			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				variants={fadeUp}
			>
				<Button href="/about/" variant="pill-primary" size="pill-md">
					Meet the full team <span aria-hidden="true">→</span>
				</Button>
			</motion.div>
			</div>
		</section>
	);
};

export default TeamSection;
