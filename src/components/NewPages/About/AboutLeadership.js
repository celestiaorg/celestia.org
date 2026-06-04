"use client";

import { motion } from "framer-motion";
import { leadership } from "@/data/about/team";

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const LeadershipCard = ({ name, role, bio }) => (
	<motion.div
		variants={cardVariants}
		className='group flex overflow-hidden rounded-lg border border-white/[0.07] bg-transparent transition-[background-color,border-color] duration-[350ms] hover:border-white/[0.13] hover:bg-white'
	>
		<div className='flex min-w-0 flex-1 flex-col justify-between gap-2.5 px-[22px] py-5'>
			<div className='flex flex-col gap-1'>
				<h3 className='font-slussenExtended text-[24px] font-medium leading-[1.25] tracking-[-0.025em] text-[#FDFCFF] transition-colors duration-[350ms] group-hover:text-[#040207]'>
					{name}
				</h3>
				<span className='font-slussen text-[16px] leading-[1.4] tracking-[-0.01em] text-white/50 transition-colors duration-[350ms] group-hover:text-[#5a5a5a]'>
					{role}
				</span>
			</div>
			<div className='border-t border-white/[0.07] pt-2.5 transition-colors duration-[350ms] group-hover:border-black/10'>
				<p className='font-slussen text-[16px] leading-[1.5] tracking-[-0.01em] text-[#B0B7C0] transition-colors duration-[350ms] group-hover:text-[#5a5a5a]'>
					{bio}
				</p>
			</div>
		</div>
	</motion.div>
);

/**
 * AboutLeadership — dark section listing the four leaders in a 2-column grid
 * (ported from prototype .about-leadership). Cards invert dark→light on hover.
 */
const AboutLeadership = () => {
	return (
		<section
			id='leadership'
			data-header-theme='dark'
			className='bg-[#040207]'
		>
			<div className='mx-auto flex max-w-[1520px] flex-col gap-12 px-6 py-12 min-[600px]:px-[60px] min-[600px]:py-[60px] min-[1200px]:px-[120px] min-[1200px]:py-20'>
				<motion.h2
					className='font-slussen text-[24px] font-medium leading-[1.25] tracking-[-0.025em] text-white/45'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					variants={fadeUp}
				>
					Leadership
				</motion.h2>
				<motion.div
					className='grid grid-cols-1 gap-5 md:grid-cols-2'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: "-60px" }}
					variants={staggerContainer}
				>
					{leadership.map((member) => (
						<LeadershipCard key={member.name} {...member} />
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default AboutLeadership;
