"use client";

import { motion } from "framer-motion";
import AnimatedHeadline from "@/components/NewHomepage/AnimatedHeadline";
import { fullTeam } from "@/data/about/team";

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const TeamCard = ({ name, role, prev, edu }) => (
	<motion.div
		variants={cardVariants}
		className='group flex overflow-hidden rounded-lg border border-white/[0.07] bg-transparent transition-[background-color,border-color] duration-[350ms] hover:border-white/[0.13] hover:bg-white'
	>
		<div className='flex min-w-0 flex-1 flex-col justify-between gap-2.5 px-[22px] py-5'>
			<div className='flex flex-col gap-1'>
				<h3 className='font-nuberNextWide text-[20px] min-[431px]:text-[21px] md:text-[24px] font-medium leading-[1.25] tracking-[-0.025em] text-[#FDFCFF] transition-colors duration-[350ms] group-hover:text-[#040207]'>
					{name}
				</h3>
				<span className='font-nuberNext text-[16px] leading-[1.4] tracking-[-0.01em] text-white/50 transition-colors duration-[350ms] group-hover:text-[#636A74]'>
					{role}
				</span>
			</div>
			<div className='flex flex-col gap-[3px] border-t border-white/[0.07] pt-2.5 transition-colors duration-[350ms] group-hover:border-black/10'>
				<p className='font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] text-[#C4C8CE] transition-colors duration-[350ms] group-hover:text-[#4A5058]'>
					<span className='mr-[3px] text-[#808890] transition-colors duration-[350ms] group-hover:text-[#040207]'>
						Prev.
					</span>
					{prev}
				</p>
				{edu && (
					<p className='font-nuberNext text-[16px] leading-[1.5] tracking-[-0.01em] text-[#808890] transition-colors duration-[350ms] group-hover:text-[#4A5058]'>
						{edu}
					</p>
				)}
			</div>
		</div>
	</motion.div>
);

/**
 * AboutFullTeam — dark section with an animated headline and the extended
 * team in a 2-column grid (ported from prototype .about-full-team). Cards show
 * a "Prev." line + education and invert dark→light on hover.
 */
const AboutFullTeam = () => {
	return (
		<section data-header-theme='dark' className='bg-[#040207]'>
			{/* Content caps at the prototype's --content-max (1280px + 2×120px gutters) */}
			<div className='mx-auto flex max-w-[1520px] flex-col gap-12 px-6 py-12 min-[600px]:px-[60px] min-[600px]:py-[60px] min-[1200px]:px-[120px] min-[1200px]:py-20'>
				<AnimatedHeadline
					text='Backed by a team of 40+ world-class engineers, researchers, and operators'
					dark
					className='mx-auto max-w-[900px]'
				/>
				<motion.div
					className='grid grid-cols-1 gap-6 md:grid-cols-2'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					variants={staggerContainer}
				>
					{fullTeam.map((member) => (
						<TeamCard key={member.name} {...member} />
					))}
				</motion.div>
				{/* "and more" — prototype .team-and-more */}
				<motion.p
					className='text-center font-nuberNext text-[16px] font-normal leading-[1.5] tracking-[-0.01em] text-white/45'
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					and more
				</motion.p>
			</div>
		</section>
	);
};

export default AboutFullTeam;
